"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { PlusCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useMemo, useState, useEffect } from "react"; // ✨ Import useEffect

import { productFormSchema, type ProductFormValues } from "@/lib/validator";
import { CREATE_PRODUCT } from "@/graphql/mutation/product";
import { Category } from "@/graphql/generated";

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

interface AddProductFormProps {
  categories: { id: string; name: string }[];
  subCategories: { id: string; name: string }[];
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string; hexCode?: string | null }[];
}

export function AddProductForm({
  categories,
  subCategories,
  sizes,
  colors,
}: AddProductFormProps) {
  const router = useRouter();
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);
  const [selectedMainCategory, setSelectedMainCategory] = useState<Pick<
    Category,
    "id" | "name"
  > | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Pick<
    Category,
    "id" | "name"
  > | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
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
          discountPercentage: undefined,
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
    if (categories.length > 0 && !selectedMainCategory) {
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
    const subCategoryType = selectedSubCategory.name
      .split(" ")[1]
      ?.toUpperCase();
    if (!subCategoryType) return [];
    return sizes.filter((size) => size.value.startsWith(subCategoryType));
  }, [selectedSubCategory, sizes]);

  useEffect(() => {
    const firstVariant = form.getValues("variants.0");
    if (firstVariant) {
      if (availableSizes.length > 0 && firstVariant.sizeId === 0) {
        form.setValue("variants.0.sizeId", Number(availableSizes[0].id));
      }
      if (colors.length > 0 && firstVariant.colorId === 0) {
        form.setValue("variants.0.colorId", Number(colors[0].id));
      }
    }
  }, [availableSizes, colors, form]);

  const handleMainCategoryChange = (id: string) => {
    const category = categories.find((c) => c.id === id) || null;
    setSelectedMainCategory(category);
    setSelectedSubCategory(null); // Reset sub-category
    form.resetField("categoryIds"); // Clear previous selections
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
    if (currentVariants.length > 1) {
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
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    const inputForGraphQL = {
      ...values,
      categoryIds: values.categoryIds.map((id) => Number(id)),
      variants: values.variants.map((variant) => ({
        ...variant,
        sizeId: Number(variant.sizeId),
        colorId: Number(variant.colorId),
        price: Math.round(variant.price * 100),
        images: variant.images.map((img) => ({
          imageUrl: img.imageUrl,
          altText: img.altText,
          isPrimary: img.isPrimary,
        })),
      })),
    };

    try {
      await createProduct({ variables: { input: inputForGraphQL } });
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (error: any) {
      toast.error(`Failed to create product: ${error.message}`);
    }
  };

  return (
    <>
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Provide the main details for your product.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Classic T-Shirt" {...field} />
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

          <div>
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
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
              className="mt-4"
              onClick={() => {
                // ✨ Add new variants with default size/color pre-selected
                const defaultSizeId =
                  availableSizes.length > 0 ? Number(availableSizes[0].id) : 0;
                const defaultColorId =
                  colors.length > 0 ? Number(colors[0].id) : 0;

                appendVariant({
                  sizeId: defaultSizeId,
                  colorId: defaultColorId,
                  price: 0,
                  stock: 0,
                  sku: "",
                  discountPercentage: undefined,
                  images: [{ imageUrl: "", altText: "", isPrimary: true }],
                });
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Another Variant
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white hover:bg-gray-800 w-40"
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
