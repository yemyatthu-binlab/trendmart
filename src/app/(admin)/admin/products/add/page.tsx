"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/organisms/products/ProductForm/ProductForm";
import { useGetProductFormDataQuery } from "@/graphql/generated";

type Size = { id: string; value: string };
type Color = { id: string; name: string; hexCode?: string | null };
type Category = { id: string; name: string };

export default function AddProductPage() {
  const { data, loading, error } = useGetProductFormDataQuery();

  if (loading) return <p>Loading form data...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const sizes: Size[] = data?.getSizes || [];
  const colors: Color[] = data?.getColors || [];
  const categories: Category[] = data?.getCategories || [];
  const subCategories: Category[] = data?.getMainSubCategories || [];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-4">Add New Product</h1>
      </div>
      <ProductForm
        categories={categories}
        sizes={sizes}
        colors={colors}
        subCategories={subCategories}
      />
    </div>
  );
}
