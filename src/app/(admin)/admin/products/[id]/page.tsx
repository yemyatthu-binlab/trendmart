"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";

import { useGetProductByIdQuery } from "@/graphql/generated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold ml-4">{product.name}</h1>
        </div>
        <Button asChild>
          <Link href={`/admin/products/edit/${product.id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column for Details */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
              <Separator className="my-4" />
              <div className="space-y-2">
                <h3 className="font-semibold">Categories</h3>
                <div className="flex gap-2">
                  {mainCategory && (
                    <Badge variant="secondary">
                      {mainCategory?.name || ""}
                    </Badge>
                  )}
                  {subCategory && (
                    <Badge variant="secondary">
                      {subCategory.name
                        .replace(mainCategory?.name || "", "")
                        .trim()}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">
            Variants ({product?.variants?.length ?? 0})
          </h2>
          {(product?.variants ?? []).map((variant) => {
            const primaryImage =
              variant?.images?.find((img) => img.isPrimary) ||
              variant?.images?.[0];
            return (
              <Card key={variant?.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        {variant?.color.name} -{" "}
                        {variant?.size.value.split("_")[1]}
                      </CardTitle>
                      <CardDescription>SKU: {variant?.sku}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        typeof variant?.stock === "number" && variant.stock > 0
                          ? "default"
                          : "destructive"
                      }
                    >
                      {typeof variant?.stock === "number" && variant.stock > 0
                        ? `${variant.stock} in Stock`
                        : "Out of Stock"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {primaryImage && (
                    <div className="sm:col-span-1">
                      <div className="aspect-square relative rounded-lg overflow-hidden border">
                        <Image
                          src={primaryImage.imageUrl}
                          alt={
                            primaryImage.altText || variant?.color?.name || ""
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="sm:col-span-2 space-y-3">
                    <div className="text-2xl font-bold">
                      {variant?.price} MMK
                    </div>
                    <div>
                      <strong>Color:</strong>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="h-6 w-6 rounded-full border"
                          style={{
                            backgroundColor:
                              variant?.color.hexCode || "transparent",
                          }}
                        ></span>
                        <span>{variant?.color.name}</span>
                      </div>
                    </div>
                    <div>
                      <strong>Size:</strong> {variant?.size.value.split("_")[1]}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Optional: A skeleton for the detail page
function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-9 w-64 ml-4" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      </div>
    </div>
  );
}
