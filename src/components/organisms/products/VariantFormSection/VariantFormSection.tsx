"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import { ProductFormValues } from "@/lib/validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface VariantFormSectionProps {
  form: UseFormReturn<ProductFormValues>;
  variantIndex: number;
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string }[];
  onRemove: () => void;
}

export function VariantFormSection({
  form,
  variantIndex,
  sizes,
  colors,
  onRemove,
}: VariantFormSectionProps) {
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
    update: updateImage,
  } = useFieldArray({
    control: form.control,
    name: `variants.${variantIndex}.images`,
  });

  const setPrimaryImage = (primaryIndex: number) => {
    imageFields.forEach((field, index) => {
      updateImage(index, { ...field, isPrimary: index === primaryIndex });
    });
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Variant {variantIndex + 1}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`variants.${variantIndex}.sizeId`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizes.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`variants.${variantIndex}.colorId`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`variants.${variantIndex}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="99.99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`variants.${variantIndex}.stock`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image Section */}
        <div>
          <Label className="text-md font-medium">Variant Images</Label>
          <div className="space-y-4 mt-2">
            {imageFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2 p-2 border rounded-lg"
              >
                <FormField
                  control={form.control}
                  name={`variants.${variantIndex}.images.${index}.isPrimary`}
                  render={({ field: radioField }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="radio"
                          name={`primaryImage-${variantIndex}`}
                          checked={radioField.value}
                          onChange={() => setPrimaryImage(index)}
                          className="form-radio h-5 w-5 text-black focus:ring-black"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-grow space-y-2">
                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.images.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* NOTE: In a real app, this would be a file upload component that uploads to a service like S3 and returns the URL. */}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() =>
              appendImage({ imageUrl: "", altText: "", isPrimary: false })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
