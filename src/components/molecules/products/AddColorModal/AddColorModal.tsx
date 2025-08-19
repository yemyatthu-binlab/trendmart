"use client";

import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CREATE_COLOR } from "@/graphql/mutation/product";
import { GET_COLORS } from "@/graphql/queries/product";
import { GetColorsQuery } from "@/graphql/generated";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const colorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  hexCode: z
    .string()
    .regex(
      /^#([0-9a-f]{3}){1,2}$/i,
      "Must be a valid hex code (e.g., #RRGGBB)."
    ),
});

interface AddColorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialHexCode?: string;
}

export function AddColorModal({
  open,
  onOpenChange,
  initialHexCode = "#",
}: AddColorModalProps) {
  const [createColor, { loading }] = useMutation(CREATE_COLOR, {
    update(cache, { data: { createColor: newColor } }) {
      const existingData = cache.readQuery<GetColorsQuery>({
        query: GET_COLORS,
      });
      if (existingData?.getColors) {
        cache.writeQuery({
          query: GET_COLORS,
          data: {
            getColors: [newColor, ...existingData.getColors],
          },
        });
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(colorSchema),
    defaultValues: { name: "", hexCode: initialHexCode },
  });

  useEffect(() => {
    if (initialHexCode) {
      form.setValue("hexCode", initialHexCode);
      form.setFocus("name"); 
    }
  }, [initialHexCode, form]);

  const onSubmit = async (values: z.infer<typeof colorSchema>) => {
    try {
      await createColor({ variables: values });
      toast.success("Color added successfully!");
      form.reset({ name: "", hexCode: "#" });
      onOpenChange(false);
    } catch (error: any) {
      toast.error(`Failed to add color: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Color</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Forest Green" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hexCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hex Code</FormLabel>
                  <FormControl>
                    <Input placeholder="#228B22" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Color"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
