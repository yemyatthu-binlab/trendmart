"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";
import {
  useGetProductsListQuery,
  useDeleteProductMutation,
  GetProductsListDocument,
  GetProductsListQuery,
  GetProductsListQueryVariables,
} from "@/graphql/generated";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, loading, error } = useGetProductsListQuery({
    variables: { skip, take: ITEMS_PER_PAGE },
    fetchPolicy: "cache-and-network",
  });

  const [deleteProduct, { loading: deleteLoading }] = useDeleteProductMutation({
    update(cache, { data }) {
      if (!data || !data.deleteProduct) {
        return;
      }

      const { deleteProduct: deletedProduct } = data;

      const existingProductsData = cache.readQuery<
        GetProductsListQuery,
        GetProductsListQueryVariables
      >({
        query: GetProductsListDocument,
        variables: { skip, take: ITEMS_PER_PAGE },
      });

      if (existingProductsData?.getProducts?.products) {
        const updatedProducts =
          existingProductsData.getProducts.products.filter(
            (product) => product.id !== deletedProduct.id
          );

        cache.writeQuery<GetProductsListQuery, GetProductsListQueryVariables>({
          query: GetProductsListDocument,
          variables: { skip, take: ITEMS_PER_PAGE },
          data: {
            getProducts: {
              __typename: "ProductListResponse",
              products: updatedProducts,
              totalCount: existingProductsData.getProducts.totalCount - 1,
            },
          },
        });
      }
    },
  });

  const handleDeleteClick = (productId: string) => {
    handleConfirmDelete(productId);
  };

  const handleConfirmDelete = async (productId: string) => {
    if (productId) {
      try {
        await deleteProduct({
          variables: { deleteProductId: productId },
        });
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  if (error) return <p>Error fetching products: {error.message}</p>;

  const response = data?.getProducts;
  const products = response?.products || [];
  const totalCount = response?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <div className="container mx-auto sm:py-8">
        <Sidebar />
        <div className="mx-5 sm:ml-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage all your products.</p>
            </div>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/admin/products/add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product List</CardTitle>
              <CardDescription>
                A list of all products in your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && !data ? (
                <p>Loading products...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Variants</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product?.id}>
                          <TableCell className="font-medium">
                            {product?.name}
                          </TableCell>
                          <TableCell>
                            {product?.categories?.map((c) => c.name).join(", ")}
                          </TableCell>
                          <TableCell>{product?.variants?.length}</TableCell>
                          <TableCell>
                            {new Date(
                              product?.createdAt || ""
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[160px]"
                              >
                                <DropdownMenuItem
                                  asChild
                                  className="py-4 pl-3 pr-6"
                                >
                                  <Link
                                    href={`/admin/products/edit/${product?.id}`}
                                  >
                                    <Pencil className="mr-2 h-6 w-6" />
                                    <span>Edit</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => {
                                    handleDeleteClick(product?.id || "");
                                  }}
                                  className="text-red-600 focus:text-red-600 py-4 pl-3 pr-6 hover:bg-red-50 focus:bg-red-50"
                                >
                                  <Trash2 className="mr-2 h-6 w-6 text-red-600" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            {totalPages > 1 && (
              <CardFooter>
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                  <div>
                    Showing <strong>{skip + 1}</strong>-
                    <strong>
                      {Math.min(skip + ITEMS_PER_PAGE, totalCount)}
                    </strong>{" "}
                    of <strong>{totalCount}</strong> products
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
