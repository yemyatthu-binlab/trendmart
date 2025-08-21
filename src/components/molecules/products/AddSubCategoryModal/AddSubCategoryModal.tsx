"use client";

import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

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
import { useCreateCategoryMutation } from "@/graphql/generated";
import { GET_CATEGORIES_FOR_MANAGEMENT } from "@/graphql/queries/category";

const subCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

interface AddSubCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentId: number;
  parentName: string;
}

export function AddSubCategoryModal({
  open,
  onOpenChange,
  parentId,
  parentName,
}: AddSubCategoryModalProps) {
  const [createSubCategory, { loading }] = useCreateCategoryMutation({
    onCompleted: () => {
      toast.success("Sub-category added successfully!");
      onOpenChange(false);
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
    refetchQueries: [{ query: GET_CATEGORIES_FOR_MANAGEMENT }],
  });

  const form = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    form.reset();
  }, [open, form]);

  const onSubmit = async (values: z.infer<typeof subCategorySchema>) => {
    createSubCategory({ variables: { ...values, parentId } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sub-Category to &quot;{parentName}&quot;</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. T-Shirts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Sub-Category"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
