"use client";

import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Color,
  useCreateColorMutation,
  useUpdateColorMutation,
} from "@/graphql/generated";

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
import { GET_COLORS_FOR_MANAGEMENT } from "@/graphql/queries/category";

const colorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  hexCode: z
    .string()
    .regex(
      /^#([0-9a-f]{3}){1,2}$/i,
      "Must be a valid hex code (e.g., #RRGGBB)."
    ),
});

interface AddEditColorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colorToEdit?: Color | null;
}

export function AddEditColorModal({
  open,
  onOpenChange,
  colorToEdit,
}: AddEditColorModalProps) {
  const isEditMode = !!colorToEdit;

  const [createColor, { loading: createLoading }] = useCreateColorMutation({
    onCompleted: () => {
      toast.success("Color added successfully!");
      onOpenChange(false);
    },
    onError: (error) => toast.error(`Failed to add color: ${error.message}`),
    refetchQueries: [{ query: GET_COLORS_FOR_MANAGEMENT }],
  });

  const [updateColor, { loading: updateLoading }] = useUpdateColorMutation({
    onCompleted: () => {
      toast.success("Color updated successfully!");
      onOpenChange(false);
    },
    onError: (error) => toast.error(`Failed to update color: ${error.message}`),
  });

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: { name: "", hexCode: "#" },
  });

  useEffect(() => {
    if (isEditMode) {
      form.reset({
        name: colorToEdit.name,
        hexCode: colorToEdit.hexCode || "#",
      });
    } else {
      form.reset({ name: "", hexCode: "#" });
    }
  }, [colorToEdit, open, form, isEditMode]);

  const onSubmit = async (values: z.infer<typeof colorSchema>) => {
    if (isEditMode) {
      updateColor({ variables: { id: colorToEdit.id, ...values } });
    } else {
      createColor({ variables: values });
    }
  };

  const isLoading = createLoading || updateLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Color" : "Add New Color"}
          </DialogTitle>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : isEditMode
                ? "Save Changes"
                : "Add Color"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
