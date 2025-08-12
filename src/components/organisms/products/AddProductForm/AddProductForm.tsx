"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { PlusCircle, Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";

import { productFormSchema, type ProductFormValues } from "@/lib/validator";
import { CREATE_PRODUCT } from "@/graphql/mutation/product";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// Props definition for type safety
interface AddProductFormProps {
  categories: { id: string; name: string }[];
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string }[];
}

export function AddProductForm({
  categories,
  sizes,
  colors,
}: AddProductFormProps) {
  const router = useRouter();
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      categoryIds: [],
      variants: [
        {
          price: 0,
          stock: 0,
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

  const onSubmit = async (values: ProductFormValues) => {
    // NOTE: Your GraphQL schema expects Int for IDs and price in cents.
    // We handle the conversion here before sending the data.
    const inputForGraphQL = {
      ...values,
      categoryIds: values.categoryIds.map((id) => Number(id)),
      variants: values.variants.map((variant) => ({
        ...variant,
        sizeId: Number(variant.sizeId),
        colorId: Number(variant.colorId),
        // Convert price from dollars/euros to cents
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
    } catch {
      toast.error("Failed to create product");
    }
  };

  return (
    <>
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Details Card */}
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
              <FormField
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <Select onValueChange={(value) => field.onChange([value])}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Variants Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <div className="space-y-6">
              {variantFields.map((field, index) => (
                <VariantFormSection
                  key={field.id}
                  form={form}
                  variantIndex={index}
                  sizes={sizes}
                  colors={colors}
                  onRemove={() => removeVariant(index)}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() =>
                appendVariant({
                  price: 0,
                  stock: 0,
                  images: [{ imageUrl: "", altText: "", isPrimary: true }],
                })
              }
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
