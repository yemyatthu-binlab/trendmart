"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CREATE_COLOR } from "@/graphql/mutation/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { GET_COLORS } from "@/graphql/queries/product";
import { GetColorsQuery } from "@/graphql/generated";

const colorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  hexCode: z
    .string()
    .regex(
      /^#([0-9a-f]{3}){1,2}$/i,
      "Must be a valid hex code (e.g., #RRGGBB)."
    ),
});

export function AddColorModal() {
  const [open, setOpen] = useState(false);
  const [createColor, { loading }] = useMutation(CREATE_COLOR, {
    // This is the magic part: update the cache on success
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
    defaultValues: { name: "", hexCode: "#" },
  });

  const onSubmit = async (values: z.infer<typeof colorSchema>) => {
    try {
      await createColor({ variables: values });
      toast.success("Color added successfully!");
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(`Failed to add color: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
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
