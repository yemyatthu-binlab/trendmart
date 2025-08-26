"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ClipboardPaste, PlusCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useMemo, useState, useEffect } from "react";

import { productFormSchema, type ProductFormValues } from "@/lib/validator";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@/graphql/mutation/product";
import { Product } from "@/graphql/generated";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VariantFormSection } from "../VariantFormSection/VariantFormSection";

export type InitialProductData = Pick<
  Product,
  "id" | "name" | "description" | "categories"
> & {
  variants: Array<{
    id: string;
    sku: string | null;
    price: number;
    stock: number;
    size: { id: string; value: string };
    color: { id: string };
    images: Array<{
      id: string;
      imageUrl: string;
      altText: string | null;
      isPrimary: boolean;
    }>;
  }>;
};

interface ProductFormProps {
  initialData?: InitialProductData | null;
  categories: { id: string; name: string }[];
  subCategories: { id: string; name: string; sizes?: any[] }[];
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string; hexCode?: string | null }[];
}

type VariantData = ProductFormValues["variants"][0];

export function ProductForm({
  initialData,
  categories,
  subCategories,
  sizes,
  colors,
}: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;
  const [copiedVariant, setCopiedVariant] = useState<VariantData | null>(null);

  const [createProduct, { loading: createLoading }] =
    useMutation(CREATE_PRODUCT);
  const [updateProduct, { loading: updateLoading }] =
    useMutation(UPDATE_PRODUCT);
  const loading = createLoading || updateLoading;

  const [selectedMainCategory, setSelectedMainCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    id: string;
    name: string;
    sizes?: { id: string; value: string }[];
  } | null>(null);

  const isSizeDisabled = !selectedMainCategory || !selectedSubCategory;

  const transformInitialData = (
    data: InitialProductData
  ): ProductFormValues => ({
    name: data.name,
    description: data.description || "",
    categoryIds: data?.categories?.map((c) => Number(c.id)) || [],
    variants: data.variants.map((v) => ({
      id: Number(v.id),
      sizeId: Number(v.size.id),
      colorId: Number(v.color.id),
      price: v.price,
      stock: v.stock,
      sku: v.sku || "",
      images: v.images.map((img) => ({
        id: Number(img.id),
        imageUrl: img.imageUrl,
        altText: img.altText || "",
        isPrimary: img.isPrimary,
      })),
    })),
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: initialData
      ? transformInitialData(initialData)
      : {
          name: "",
          description: "",
          categoryIds: [],
          variants: [
            {
              sizeId: 0,
              colorId: 0,
              price: 0,
              stock: 0,
              sku: "",
              images: [{ imageUrl: "", altText: "", isPrimary: true }],
            },
          ],
        },
  });

  const handleCopyVariant = (index: number) => {
    const variantToCopy = form.getValues(`variants.${index}`);
    const { id, ...variantData } = variantToCopy as any;
    const sanitizedImages = variantData.images.map((img: any) => {
      const { id, ...imageData } = img;
      return imageData;
    });
    const sanitizedVariant = {
      ...variantData,
      images: sanitizedImages,
      sku: "",
    };

    setCopiedVariant(sanitizedVariant);
    toast.success("Variant copied!");
  };

  const handlePasteVariant = () => {
    if (copiedVariant) {
      appendVariant(copiedVariant);
      toast.success("Variant pasted!");
    } else {
      toast.info("Nothing to paste. Copy a variant first.");
    }
  };

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Set initial categories when in edit mode
  useEffect(() => {
    console.log("initialData", initialData);
    if (isEditMode && initialData && initialData.categories?.length) {
      // Find main category (assuming it's the first one)
      const mainCategoryId = initialData.categories[0].id;
      const mainCat = categories.find((c) => c.id === mainCategoryId);
      console.log("mainCat", mainCat);

      if (mainCat) {
        setSelectedMainCategory(mainCat);

        // Find sub-category if exists (assuming it's the second one)
        if (initialData.categories.length > 1) {
          const subCategoryId = initialData.categories[1].id;
          const subCat = subCategories.find((sc) => sc.id === subCategoryId);
          if (subCat) {
            setSelectedSubCategory(subCat);
          }
        }
      }
    }
  }, [isEditMode, initialData, categories, subCategories]);

  const availableSubCategories = useMemo(() => {
    if (!selectedMainCategory) return [];
    return subCategories
      .filter((sub) => sub.name.startsWith(selectedMainCategory.name))
      .map((sub) => ({
        ...sub,
        displayName: sub.name.replace(selectedMainCategory.name, "").trim(),
      }));
  }, [selectedMainCategory, subCategories]);

  const availableSizes = useMemo(() => {
    if (!selectedSubCategory) return sizes;

    // Check if the subCategory has sizes property
    if (selectedSubCategory.sizes && Array.isArray(selectedSubCategory.sizes)) {
      return selectedSubCategory.sizes;
    }

    // Fallback to the sizes prop
    return sizes;
  }, [selectedSubCategory, sizes]);

  const handleMainCategoryChange = (id: string) => {
    if (!id) return;
    const category = categories.find((c) => c.id === id) || null;
    setSelectedMainCategory(category);
    setSelectedSubCategory(null);

    const currentCategoryIds = form.getValues("categoryIds");
    const newCategoryIds = category ? [Number(category.id)] : [];

    form.setValue("categoryIds", newCategoryIds);
  };

  const handleSubCategoryChange = (id: string) => {
    if (!id) return;
    const subCategory = availableSubCategories.find((c) => c.id === id) || null;
    setSelectedSubCategory(subCategory);

    if (selectedMainCategory && subCategory) {
      form.setValue("categoryIds", [
        Number(selectedMainCategory.id),
        Number(subCategory.id),
      ]);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const inputForGraphQL = {
        ...values,
        variants: values.variants.map((variant) => ({
          ...variant,
          price: Math.round(variant.price),
          ...(isEditMode && "id" in variant ? { id: (variant as any).id } : {}),
          images: variant.images.map((img) => ({
            ...img,
            ...(isEditMode && "id" in img ? { id: (img as any).id } : {}),
          })),
        })),
      };

      if (isEditMode) {
        await updateProduct({
          variables: { id: initialData.id, input: inputForGraphQL },
        });
        toast.success("Product updated successfully!");
        router.push(`/admin/products`);
      } else {
        await createProduct({ variables: { input: inputForGraphQL } });
        toast.success("Product created successfully!");
        router.push("/admin/products");
      }
    } catch (error: any) {
      toast.error(`Failed to save product: ${error.message}`);
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="sm:p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isEditMode ? "Edit Product" : "Product Details"}
                    </CardTitle>
                    <CardDescription>
                      {isEditMode
                        ? "Update the details for your product."
                        : "Provide the main details for your product."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Classic T-Shirt"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the product..."
                              {...field}
                              className="min-h-[175px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Main Category</FormLabel>
                        <Select
                          onValueChange={handleMainCategoryChange}
                          value={selectedMainCategory?.id || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a main category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                      <FormItem>
                        <FormLabel>Sub Category</FormLabel>
                        <Select
                          onValueChange={handleSubCategoryChange}
                          disabled={!selectedMainCategory}
                          value={selectedSubCategory?.id || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sub-category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableSubCategories.map((sub) => (
                              <SelectItem key={sub.id} value={sub.id}>
                                {sub.displayName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 mt-8 lg:mt-0">
                <div className="space-y-6">
                  {variantFields.map((field, index) => (
                    <VariantFormSection
                      key={field.id}
                      form={form}
                      variantIndex={index}
                      sizes={availableSizes}
                      colors={colors}
                      onRemove={() => removeVariant(index)}
                      onCopy={() => handleCopyVariant(index)}
                      isEditMode={isEditMode}
                      isSizeDisabled={isSizeDisabled}
                    />
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="variants"
                  render={({ fieldState }) => (
                    <FormItem>
                      <p className="text-sm font-medium text-destructive mt-2">
                        {fieldState?.error?.message}
                      </p>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-dashed h-[55px]"
                    onClick={() => {
                      const defaultSizeId =
                        availableSizes.length > 0
                          ? Number(availableSizes[0].id)
                          : 0;
                      const defaultColorId =
                        colors.length > 0 ? Number(colors[0].id) : 0;

                      appendVariant({
                        sizeId: defaultSizeId,
                        colorId: defaultColorId,
                        price: 0,
                        stock: 0,
                        sku: "",
                        images: [
                          { imageUrl: "", altText: "", isPrimary: true },
                        ],
                      });
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Variant
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-[55px] w-[55px] flex-shrink-0"
                    onClick={handlePasteVariant}
                    disabled={!copiedVariant}
                    title="Paste Variant"
                  >
                    <ClipboardPaste className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Save Changes"
                  : "Save Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
