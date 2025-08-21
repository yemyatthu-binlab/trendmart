// src/components/modals/ManageSizesModal.tsx

"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { useQuery } from "@apollo/client";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Size,
  useAssignSizesToSubCategoryMutation,
  useCreateSizeMutation,
  useRemoveSizeFromSubCategoryMutation,
} from "@/graphql/generated";
import {
  GET_CATEGORIES_FOR_MANAGEMENT,
  GET_UNASSIGNED_SIZES_FOR_CATEGORY,
} from "@/graphql/queries/category";
import { SubCategory } from "@/app/(admin)/admin/categories/page";

const newSizeSchema = z.object({
  value: z.string().min(1, "Size value cannot be empty."),
});

interface ManageSizesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subCategory: SubCategory | null;
}

export function ManageSizesModal({
  open,
  onOpenChange,
  subCategory,
}: ManageSizesModalProps) {
  const [selectedSizeIds, setSelectedSizeIds] = useState<Set<number>>(
    new Set()
  );
  // NEW: Internal state to manage the displayed sizes for instant UI updates.
  const [internalSizes, setInternalSizes] = useState<Size[]>([]);

  // NEW: Effect to sync internal state when the modal is opened or the subCategory prop changes.
  useEffect(() => {
    if (subCategory?.sizes) {
      // Sort sizes alphabetically for consistent display
      const sortedSizes = [...subCategory.sizes].sort((a, b) =>
        a.value.localeCompare(b.value)
      );
      setInternalSizes(sortedSizes);
    }
  }, [subCategory, open]);

  const { data: unassignedData, loading: unassignedLoading } = useQuery(
    GET_UNASSIGNED_SIZES_FOR_CATEGORY,
    {
      variables: subCategory ? { subCategoryId: subCategory.id } : undefined,
      skip: !subCategory,
    }
  );

  const [removeSize] = useRemoveSizeFromSubCategoryMutation({
    onError: (error) => toast.error(`Removal failed: ${error.message}`),
    // CHANGED: Update the internal state on success for an immediate UI change.
    update: (_, __, { variables }) => {
      setInternalSizes((prevSizes) =>
        prevSizes.filter((size) => size.id !== variables?.sizeId)
      );
      toast.success("Size removed.");
    },
    // Keep refetch queries to ensure the parent component is updated upon closing.
    refetchQueries: [
      GET_CATEGORIES_FOR_MANAGEMENT,
      GET_UNASSIGNED_SIZES_FOR_CATEGORY,
    ],
  });

  const [assignSizes] = useAssignSizesToSubCategoryMutation({
    // CHANGED: Update internal state on completion.
    onCompleted: (_, { variables }) => {
      const assignedIds = new Set(variables.sizeIds);
      const newlyAssignedSizes =
        unassignedData?.getUnassignedSizesForCategory.filter((size: Size) =>
          assignedIds.has(parseInt(size.id))
        ) || [];

      setInternalSizes((prevSizes) =>
        [...prevSizes, ...newlyAssignedSizes].sort((a, b) =>
          a.value.localeCompare(b.value)
        )
      );

      toast.success("Sizes assigned successfully!");
      setSelectedSizeIds(new Set());
    },
    onError: (error) => toast.error(`Assignment failed: ${error.message}`),
    refetchQueries: [
      GET_CATEGORIES_FOR_MANAGEMENT,
      GET_UNASSIGNED_SIZES_FOR_CATEGORY,
    ],
  });

  const [createSize] = useCreateSizeMutation({
    onCompleted: (data) => {
      const newSize = data.createSize;
      toast.success(`Size "${newSize.value}" created.`);

      // CHANGED: Add the newly created size to the internal state immediately.
      setInternalSizes((prevSizes) =>
        [...prevSizes, newSize].sort((a, b) => a.value.localeCompare(b.value))
      );

      // Then, call the assign mutation to link it in the backend.
      assignSizes({
        variables: {
          subCategoryId: subCategory!.id,
          sizeIds: [parseInt(newSize.id)],
        },
      });
      form.reset();
    },
    onError: (error) => toast.error(`Creation failed: ${error.message}`),
    // No need to refetch categories here, as `assignSizes` will do it.
    refetchQueries: [GET_UNASSIGNED_SIZES_FOR_CATEGORY],
  });

  const form = useForm<z.infer<typeof newSizeSchema>>({
    resolver: zodResolver(newSizeSchema),
    defaultValues: { value: "" },
  });

  if (!subCategory) return null;

  const handleRemoveSize = (sizeId: string) => {
    removeSize({ variables: { subCategoryId: subCategory.id, sizeId } });
  };

  const toggleSelection = (sizeId: number) => {
    const newSelection = new Set(selectedSizeIds);
    if (newSelection.has(sizeId)) newSelection.delete(sizeId);
    else newSelection.add(sizeId);
    setSelectedSizeIds(newSelection);
  };

  const handleAssignSelected = () => {
    if (selectedSizeIds.size === 0) return;
    assignSizes({
      variables: {
        subCategoryId: subCategory.id,
        sizeIds: Array.from(selectedSizeIds),
      },
    });
  };

  const handleCreateNewSize = (values: z.infer<typeof newSizeSchema>) => {
    createSize({ variables: { value: values.value } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Manage Sizes for &quot;{subCategory.name}&quot;
          </DialogTitle>
          <DialogDescription>
            Add, create, or remove sizes for this sub-category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Associated Sizes</h4>
          <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
            {/* CHANGED: Render from internalSizes state instead of subCategory.sizes prop. */}
            {internalSizes.length > 0 ? (
              internalSizes.map((size) => (
                <div
                  key={size.id}
                  className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  <span>{size.value}</span>
                  <button
                    onClick={() => handleRemoveSize(size.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground px-2">
                No sizes linked.
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* ... The rest of your JSX remains the same ... */}

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Add Existing Sizes</h4>
          <ScrollArea className="h-32 border rounded-md p-2">
            {unassignedLoading ? (
              <p className="text-xs text-muted-foreground">Loading sizes...</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {unassignedData?.getUnassignedSizesForCategory.map(
                  (size: Size) => (
                    <button
                      key={size.id}
                      onClick={() => toggleSelection(parseInt(size.id))}
                      className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                        selectedSizeIds.has(parseInt(size.id))
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent hover:bg-accent"
                      }`}
                    >
                      {size.value}
                    </button>
                  )
                )}
                {unassignedData?.getUnassignedSizesForCategory.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No unassigned sizes available.
                  </p>
                )}
              </div>
            )}
          </ScrollArea>
          <Button
            size="sm"
            onClick={handleAssignSelected}
            disabled={selectedSizeIds.size === 0}
          >
            <Plus className="h-4 w-4 mr-2" /> Assign Selected (
            {selectedSizeIds.size})
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Create & Assign New Size</h4>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateNewSize)}
              className="flex items-start gap-2"
            >
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="e.g. XXL" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button type="submit">Create & Assign</Button>
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
