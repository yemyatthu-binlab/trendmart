"use client";

import { useState } from "react";
import {
  Trash2,
  PlusCircle,
  AlertCircle,
  Palette,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";
import {
  useGetCategoriesForManagementQuery,
  useGetColorsForManagementQuery,
  useDeleteCategoryMutation,
  useDeleteColorMutation,
} from "@/graphql/generated";

// Placeholder types for data - generated types are better
type Category = {
  id: string;
  name: string;
  isDeletable: boolean;
  children: SubCategory[];
};
type SubCategory = {
  id: string;
  name: string;
  sizes: Size[];
};
type Size = { id: string; value: string };
type Color = { id: string; name: string; hexCode?: string | null };

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("categories");

  // --- Category Data ---
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesForManagementQuery();

  const [deleteCategory] = useDeleteCategoryMutation({
    refetchQueries: ["GetCategoriesForManagement"],
    onCompleted: () => toast.success("Category deleted successfully."),
    onError: (error) => toast.error(error.message),
  });

  // --- Color Data ---
  const {
    data: colorsData,
    loading: colorsLoading,
    error: colorsError,
  } = useGetColorsForManagementQuery();

  const [deleteColor] = useDeleteColorMutation({
    refetchQueries: ["GetColorsForManagement"],
    onCompleted: () => toast.success("Color deleted successfully."),
    onError: (error) => toast.error(error.message),
  });

  const handleDeleteCategory = (category: Category) => {
    if (!category.isDeletable) {
      toast.error("This category cannot be deleted.");
      return;
    }
    deleteCategory({ variables: { id: category.id } });
  };

  const handleDeleteColor = (colorId: string) => {
    deleteColor({ variables: { id: colorId } });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="container mx-auto sm:py-8">
        <Sidebar />
        <div className="mx-5 sm:ml-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Attributes</h1>
              <p className="text-muted-foreground">
                Manage categories, sizes, and colors.
              </p>
            </div>
            {/* Add universal "Add New" button here if desired */}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="categories"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="categories">
                <LayoutGrid className="mr-2 h-4 w-4" /> Categories & Sizes
              </TabsTrigger>
              <TabsTrigger value="colors">
                <Palette className="mr-2 h-4 w-4" /> Colors
              </TabsTrigger>
            </TabsList>

            {/* CATEGORIES TAB CONTENT */}
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Category Management</CardTitle>
                  <CardDescription>
                    View and manage main categories, sub-categories, and their
                    linked sizes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {categoriesLoading && <p>Loading categories...</p>}
                  {categoriesError && <p>Error: {categoriesError.message}</p>}
                  {categoriesData?.getCategoriesForManagement.map(
                    (category) => (
                      <div
                        key={category.id}
                        className="mb-8 p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-semibold">
                            {category.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <PlusCircle className="mr-2 h-4 w-4" /> Add
                              Sub-Category
                            </Button>
                            {category.isDeletable && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={!category.isDeletable}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the{" "}
                                      <strong>{category.name}</strong> category
                                      and ALL its sub-categories. This action
                                      cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteCategory(category)
                                      }
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>

                        {/* Sub-Category Table */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">
                                Sub-Category
                              </TableHead>
                              <TableHead>Associated Sizes</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(category?.children?.length ?? 0) > 0 ? (
                              category.children?.map((sub) => (
                                <TableRow key={sub.id}>
                                  <TableCell className="font-medium">
                                    {sub.name}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {(sub.sizes ?? []).map((size) => (
                                        <span
                                          key={size.id}
                                          className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                                        >
                                          {size.value}
                                        </span>
                                      ))}
                                      {(sub.sizes?.length ?? 0) === 0 && (
                                        <span className="text-xs text-muted-foreground">
                                          No sizes linked
                                        </span>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                      Edit Sizes
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  className="text-center h-24"
                                >
                                  No sub-categories found.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* COLORS TAB CONTENT */}
            <TabsContent value="colors">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Color Management</CardTitle>
                      <CardDescription>
                        Add or remove colors available for products.
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Color
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {colorsLoading && <p>Loading colors...</p>}
                  {colorsError && <p>Error: {colorsError.message}</p>}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Preview</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Hex Code</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {colorsData?.getColorsForManagement.map((color) => (
                        <TableRow key={color.id}>
                          <TableCell>
                            <div
                              className="h-6 w-6 rounded-full border"
                              style={{
                                backgroundColor: color.hexCode || "#ffffff",
                              }}
                            ></div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {color.name}
                          </TableCell>
                          <TableCell className="font-mono">
                            {color.hexCode}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete &quot;{color.name}&quot;?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. If the color
                                    is in use by a product, deletion will fail.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteColor(color.id)}
                                  >
                                    Delete Color
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
