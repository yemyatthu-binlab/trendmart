import { z } from "zod";

const imageSchema = z.object({
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  altText: z.string().optional(),
  isPrimary: z.boolean(),
});

const variantSchema = z.object({
  sizeId: z.coerce.number().min(1, "Size is required."),
  colorId: z.coerce.number().min(1, "Color is required."),
  sku: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number."),
  stock: z.coerce.number().min(0, "Stock cannot be negative."),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  images: z
    .array(imageSchema)
    .min(1, "Each variant must have at least one image.")
    // Ensure only one image is primary
    .refine((images) => images.filter((img) => img.isPrimary).length === 1, {
      message: "Each variant must have exactly one primary image.",
    }),
});

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().optional(),
  categoryIds: z
    .array(z.coerce.number())
    .min(1, "Please select at least one category."),
  variants: z
    .array(variantSchema)
    .min(1, "Product must have at least one variant."),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
