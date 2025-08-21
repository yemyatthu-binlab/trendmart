"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { PlusCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useMemo, useState, useEffect } from "react";

import { productFormSchema, type ProductFormValues } from "@/lib/validator";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@/graphql/mutation/product";
import { Category, Product } from "@/graphql/generated"; // Assuming 'Product' is in your generated types

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
    size: { id: string };
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
  subCategories: { id: string; name: string }[];
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string; hexCode?: string | null }[];
}

export function ProductForm({
  initialData,
  categories,
  subCategories,
  colors,
}: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [createProduct, { loading: createLoading }] =
    useMutation(CREATE_PRODUCT);
  const [updateProduct, { loading: updateLoading }] =
    useMutation(UPDATE_PRODUCT);
  const loading = createLoading || updateLoading;

  const [selectedMainCategory, setSelectedMainCategory] = useState<Pick<
    Category,
    "id" | "name"
  > | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Pick<
    Category,
    "id" | "name"
  > | null>(null);

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

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      const mainCat = categories.find((c) =>
        initialData?.categories?.some((ic) => ic.name === c.name)
      );
      if (mainCat) {
        setSelectedMainCategory(mainCat);
        const subCatRaw = subCategories.find((sc) =>
          initialData?.categories?.some(
            (ic) => ic.id === sc.id && ic.name !== mainCat.name
          )
        );
        if (subCatRaw) {
          // Add displayName to match the structure of availableSubCategories
          const subCat = {
            ...subCatRaw,
            displayName: subCatRaw.name.replace(mainCat.name, "").trim(),
          };
          setSelectedSubCategory(subCat);
        }
      }
    } else if (categories.length > 0 && !selectedMainCategory) {
      handleMainCategoryChange(categories[0].id);
    }
  }, [categories, selectedMainCategory]);

  const availableSubCategories = useMemo(() => {
    if (!selectedMainCategory) return [];
    return subCategories
      .filter((sub) => sub.name.startsWith(selectedMainCategory.name))
      .map((sub) => ({
        ...sub,
        displayName: sub.name.replace(selectedMainCategory.name, "").trim(),
      }));
  }, [selectedMainCategory, subCategories]);

  useEffect(() => {
    if (availableSubCategories.length > 0 && !selectedSubCategory) {
      handleSubCategoryChange(availableSubCategories[0].id);
    }
  }, [availableSubCategories, selectedSubCategory]);

  const availableSizes = useMemo(() => {
    if (!selectedSubCategory) return [];
    const fullSubCategoryData = subCategories.find(
      (sc) => sc.id === selectedSubCategory.id
    );

    // If sizes property exists, return it; otherwise, return an empty array
    return (fullSubCategoryData && 'sizes' in fullSubCategoryData && Array.isArray((fullSubCategoryData as any).sizes))
      ? (fullSubCategoryData as any).sizes
      : [];
  }, [selectedSubCategory, subCategories]);

  useEffect(() => {
    const variants = form.getValues("variants");
    if (
      variants.length === 1 &&
      variants[0].sizeId === 0 &&
      variants[0].colorId === 0
    ) {
      if (availableSizes.length > 0) {
        form.setValue("variants.0.sizeId", Number(availableSizes[0].id));
      }
      if (colors.length > 0) {
        form.setValue("variants.0.colorId", Number(colors[0].id));
      }
    }
  }, [availableSizes, colors, form]);

  const handleMainCategoryChange = (id: string) => {
    const category = categories.find((c) => c.id === id) || null;
    setSelectedMainCategory(category);
    setSelectedSubCategory(null);
    form.resetField("categoryIds");
    form.setValue("categoryIds", category ? [Number(category.id)] : []);
  };

  const handleSubCategoryChange = (id: string) => {
    const subCategory = availableSubCategories.find((c) => c.id === id) || null;
    setSelectedSubCategory(subCategory);
    if (selectedMainCategory && subCategory) {
      form.setValue("categoryIds", [
        Number(selectedMainCategory.id),
        Number(subCategory.id),
      ]);
    }
    const currentVariants = form.getValues("variants");
    if (currentVariants.some((v) => v.sizeId > 0)) {
      toast.info(
        "Sub-category changed. Please re-select the size for each variant."
      );
    }
    const updatedVariants = currentVariants.map((variant) => ({
      ...variant,
      sizeId: 0,
    }));
    form.setValue("variants", updatedVariants, { shouldValidate: true });
  };

  const onSubmit = async (values: ProductFormValues) => {
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

    try {
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
                          value={selectedMainCategory?.id}
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
                          value={selectedSubCategory?.id}
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
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed h-[55px]"
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
                      images: [{ imageUrl: "", altText: "", isPrimary: true }],
                    });
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Another Variant
                </Button>
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
