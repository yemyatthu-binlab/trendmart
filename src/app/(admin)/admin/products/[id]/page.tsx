// app/admin/products/[id]/page.tsx (Updated)
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";

import { useGetProductByIdQuery } from "@/graphql/generated";
import { Button } from "@/components/ui/button";
import "@/styles/prose-style.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils"; // Assuming you have a price formatter

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, loading, error } = useGetProductByIdQuery({
    variables: { id: id as string },
    skip: !id,
  });

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.getProductById) return <p>Product not found</p>;

  const product = data.getProductById;
  const mainCategory =
    product?.categories?.find((c) => !c.name.includes(" ")) || undefined;
  const subCategory =
    product?.categories?.find((c) => c.name.includes(" ")) || undefined;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Products</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {product.name}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button asChild>
            <Link href={`/admin/products/edit/${product.id}`}>
              <Edit className="mr-2 h-4 w-4" /> Edit Product
            </Link>
          </Button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 1. UPDATED GRID LAYOUT to md:grid-cols-2 for a 50/50 split          */}
      {/* =================================================================== */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        {/* Left Column for Details */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {mainCategory && (
                    <Badge variant="secondary">{mainCategory?.name}</Badge>
                  )}
                  {subCategory && (
                    <Badge variant="outline">
                      {subCategory.name
                        .replace(mainCategory?.name || "", "")
                        .trim()}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {/* =================================================================== */}
              {/* 2. RENDER RICH TEXT with scrollable table support                 */}
              {/* This relies on `prose-styles.css` being imported in layout.tsx  */}
              {/* =================================================================== */}
              <div className="prose-wrapper">
                <div
                  className="prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.description || "<p>No description provided.</p>",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column for Variants */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Variants ({product?.variants?.length ?? 0})</CardTitle>
              <CardDescription>
                All available variations of this product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(product?.variants ?? []).map((variant) => {
                  const primaryImage =
                    variant?.images?.find((img) => img.isPrimary) ||
                    variant?.images?.[0];
                  return (
                    <div
                      key={variant?.id}
                      className="grid grid-cols-4 items-start gap-4 p-4 border rounded-lg"
                    >
                      {primaryImage && variant && (
                        <div className="col-span-1">
                          <div className="aspect-square relative rounded-md overflow-hidden">
                            <Image
                              src={primaryImage.imageUrl}
                              alt={primaryImage.altText || variant.color.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                      <div className="col-span-3 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">
                              {variant?.color.name} - {variant?.size.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SKU: {variant?.sku}
                            </p>
                          </div>
                          <Badge
                            variant={
                              (variant?.stock ?? 0) > 0
                                ? "default"
                                : "destructive"
                            }
                          >
                            {(variant?.stock ?? 0) > 0
                              ? `${variant?.stock ?? 0} in Stock`
                              : "Out of Stock"}
                          </Badge>
                        </div>
                        <p className="text-lg font-semibold">
                          {formatPrice(variant?.price || 0)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

// ===================================================================
// 3. UPDATED SKELETON to match the new 50/50 layout
// ===================================================================
function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-9 w-64 ml-4" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
        </div>
        {/* Right Column Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      </div>
    </div>
  );
}
