"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

import {
  useGetProductFormDataQuery,
  useGetProductByIdQuery,
} from "@/graphql/generated";
import { Button } from "@/components/ui/button";
import {
  InitialProductData,
  ProductForm,
} from "@/components/organisms/products/ProductForm/ProductForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProductPage() {
  const params = useParams();
  const { id } = params;

  // Fetch both form data (categories, etc.) and the specific product data
  const {
    data: formData,
    loading: formLoading,
    error: formError,
  } = useGetProductFormDataQuery();
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useGetProductByIdQuery({
    variables: { id: id as string },
    skip: !id, // Don't run query if id is not available
  });

  const loading = formLoading || productLoading;
  const error = formError || productError;

  if (loading) return <ProductFormSkeleton />;
  if (error) return <p>Error loading data: {error.message}</p>;
  if (!productData?.getProductById) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/admin/products`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-4">Edit Product</h1>
      </div>
      <ProductForm
        initialData={productData.getProductById as InitialProductData}
        categories={formData?.getCategories || []}
        subCategories={formData?.getMainSubCategories || []}
        sizes={formData?.getSizes || []}
        colors={formData?.getColors || []}
      />
    </div>
  );
}

// Optional: A skeleton component for loading state
function ProductFormSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-9 w-48 ml-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 p-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="space-y-4 mt-8 lg:mt-0">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
