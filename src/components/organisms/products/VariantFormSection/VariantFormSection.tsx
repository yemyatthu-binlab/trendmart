"use client";

import { useState } from "react";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { Trash2, Pipette, PlusCircle } from "lucide-react";
import { toast } from "sonner";

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
import { AddColorModal } from "@/components/molecules/products/AddColorModal/AddColorModal";
import { ImageUploader } from "@/components/atoms/common/ImageUploader/ImageUploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface VariantFormSectionProps {
  form: UseFormReturn<ProductFormValues>;
  variantIndex: number;
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string; hexCode?: string | null }[];
  onRemove: () => void;
}

export function VariantFormSection({
  form,
  variantIndex,
  sizes,
  colors,
  onRemove,
}: VariantFormSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialHex, setInitialHex] = useState<string | undefined>(undefined);

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
    update: updateImage,
  } = useFieldArray({
    control: form.control,
    name: `variants.${variantIndex}.images`,
  });

  const variant = useWatch({
    control: form.control,
    name: `variants.${variantIndex}`,
  });

  const variantTitle = (() => {
    const selectedSize = sizes.find((s) => Number(s.id) == variant.sizeId);
    const selectedColor = colors.find((c) => Number(c.id) === variant.colorId);

    const sizeDisplay = selectedSize?.value.split("_")[1] || "";
    const colorDisplay = selectedColor?.name || "";

    if (sizeDisplay && colorDisplay) {
      return `Variant ${variantIndex + 1} (${colorDisplay} - ${sizeDisplay})`;
    }
    if (sizeDisplay || colorDisplay) {
      return `Variant ${variantIndex + 1} (${colorDisplay}${sizeDisplay})`;
    }
    return `Variant ${variantIndex + 1}`;
  })();

  const setPrimaryImage = (primaryIndex: number) => {
    imageFields.forEach((field, index) => {
      updateImage(index, { ...field, isPrimary: index === primaryIndex });
    });
  };

  const openColorInspector = async () => {
    if (!("EyeDropper" in window)) {
      toast.error("Your browser doesn't support the color inspector tool.");
      return;
    }
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      setInitialHex(sRGBHex);
      setIsModalOpen(true);
    } catch {
      console.log("Color selection cancelled.");
    }
  };

  const openAddColorModal = () => {
    setInitialHex(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      <AddColorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialHexCode={initialHex}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between -mt-1">
          <CardTitle className="text-md">{variantTitle}</CardTitle>
          {variantIndex > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`variants.${variantIndex}.sizeId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-[60px]">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.value.split("_")[1]}
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
                  <div className="flex items-center gap-2">
                    <ScrollArea className="flex-grow whitespace-nowrap w-[80px] rounded-md border">
                      <div className="flex w-max space-x-3 p-2 pb-3">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => field.onChange(Number(color.id))}
                            className={`w-6 h-6 rounded-full border transition-all ${
                              field.value === Number(color.id)
                                ? "ring-2 ring-offset-2 ring-foreground"
                                : "border-muted-foreground"
                            }`}
                            style={{
                              backgroundColor: color.hexCode ?? undefined,
                            }}
                            title={color.name}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={openColorInspector}
                    >
                      <Pipette className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={openAddColorModal}
                      title="Add New Color"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
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
                      placeholder="0"
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
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Variant Images</Label>

            <RadioGroup
              onValueChange={(value) => setPrimaryImage(Number(value))}
              className="mt-2 space-y-3"
            >
              {imageFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-4">
                  <RadioGroupItem
                    value={String(index)}
                    id={`primary-${variantIndex}-${index}`}
                  />
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name={`variants.${variantIndex}.images.${index}.imageUrl`}
                      render={({ field: imageField }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUploader
                              currentImageUrl={imageField.value}
                              onUploadSuccess={(url) =>
                                imageField.onChange(url)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {imageFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </RadioGroup>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() =>
                appendImage({ imageUrl: "", altText: "", isPrimary: false })
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
