"use client";

import { useQuery } from "@apollo/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GET_PRODUCTS_LIST } from "@/graphql/queries/product";
import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";

// Define a type for our product data for type safety
type ProductListItem = {
  id: string;
  name: string;
  createdAt: string;
  categories: { name: string }[];
  variants: any[];
};

export default function ProductsPage() {
  const { data, loading, error } = useQuery(GET_PRODUCTS_LIST);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  const products: ProductListItem[] = data?.getProducts || [];

  return (
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        {product.categories.map((c) => c.name).join(", ")}
                      </TableCell>
                      <TableCell>{product.variants.length}</TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
