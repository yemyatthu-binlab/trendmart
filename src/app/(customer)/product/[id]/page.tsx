// app/(customer)/product/[id]/page.tsx
"use client";

import { useState, useEffect, MouseEvent, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // Import useRouter

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"; // Import ArrowLeft
import { toast } from "sonner";
import clsx from "clsx";
import {
  GetProductByIdQuery,
  useGetProductByIdQuery,
} from "@/graphql/generated";
import { formatPrice } from "@/lib/utils";

// Types for better type safety
type ProductVariant = GetProductByIdQuery["getProductById"]["variants"][0];
type ProductColor = ProductVariant["color"];
type ProductSize = ProductVariant["size"];

// A utility type to group variants by color
interface ColorGroup {
  color: ProductColor;
  variants: ProductVariant[];
}

// ============================================================================
// NEW COMPONENT: ImageMagnifier
// ============================================================================
const ImageMagnifier = ({
  src,
  alt,
  zoomLevel = 2.5,
  lensSize = 200,
}: {
  src: string;
  alt: string;
  zoomLevel?: number;
  lensSize?: number;
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Measure the container when the component mounts or the image changes
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, [src]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({ x, y });
  };

  const halfLensSize = lensSize / 2;

  // =================================================================
  //  THE FIX: Constrain the lens's position to stay within the box
  // =================================================================
  const lensLeft = Math.min(
    Math.max(position.x - halfLensSize, 0),
    containerSize.width - lensSize
  );
  const lensTop = Math.min(
    Math.max(position.y - halfLensSize, 0),
    containerSize.height - lensSize
  );

  // The background position is still based on the raw cursor position
  // This allows the background to "pan" inside the lens at the edges
  const backgroundPosX = `-${position.x * zoomLevel - halfLensSize}px`;
  const backgroundPosY = `-${position.y * zoomLevel - halfLensSize}px`;

  // Calculate background size in pixels for accuracy
  const backgroundSizeX = containerSize.width * zoomLevel;
  const backgroundSizeY = containerSize.height * zoomLevel;

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] md:aspect-[3/4] rounded-lg overflow-hidden border group cursor-crosshair"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />

      {/* Magnifying Lens */}
      {showMagnifier && containerSize.width > 0 && (
        <div
          className="absolute pointer-events-none border-2 border-primary bg-white/20 backdrop-blur-sm rounded-full"
          style={{
            // Use the CONSTRAINED values for the lens's visible position
            top: `${lensTop}px`,
            left: `${lensLeft}px`,
            // Set the lens size
            height: `${lensSize}px`,
            width: `${lensSize}px`,
            // Zoomed image properties
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            // Use the calculated pixel-based values
            backgroundSize: `${backgroundSizeX}px ${backgroundSizeY}px`,
            backgroundPosition: `${backgroundPosX} ${backgroundPosY}`,
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// Main Product Detail Component (with updates)
// ============================================================================
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter(); // Initialize router for back navigation

  const { data, loading, error } = useGetProductByIdQuery({
    variables: { id },
  });

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  // Group variants by color to render color swatches
  const colorGroups: ColorGroup[] =
    data?.getProductById?.variants.reduce((acc, variant) => {
      const existingGroup = acc.find(
        (group) => group.color.id === variant.color.id
      );
      if (existingGroup) {
        existingGroup.variants.push(variant);
      } else {
        acc.push({ color: variant.color, variants: [variant] });
      }
      return acc;
    }, [] as ColorGroup[]) || [];

  // Get all unique sizes for the currently selected color
  const sizesForSelectedColor =
    selectedVariant &&
    colorGroups
      .find((group) => group.color.id === selectedVariant.color.id)
      ?.variants.map((v) => v.size)
      .sort((a, b) => a.value.localeCompare(b.value));

  // Initialize selected variant when data is loaded
  useEffect(() => {
    if (data?.getProductById?.variants.length) {
      const initialVariant = data.getProductById.variants.find((v) =>
        v.images.some((img) => img.isPrimary)
      );
      setSelectedVariant(initialVariant || data.getProductById.variants[0]);
    }
  }, [data]);

  // Handle color selection
  const handleColorSelect = (color: ProductColor) => {
    const newVariant = colorGroups
      .find((group) => group.color.id === color.id)
      ?.variants.find((v) => v.stock > 0);

    if (newVariant) {
      setSelectedVariant(newVariant);
    } else {
      toast.error("This color is out of stock.");
    }
  };

  // Handle size selection
  const handleSizeSelect = (size: ProductSize) => {
    const newVariant = colorGroups
      .find((group) => group.color.id === selectedVariant?.color.id)
      ?.variants.find((v) => v.size.id === size.id);

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (error || !data?.getProductById) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">Product Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const product = data.getProductById;
  const primaryImage = selectedVariant?.images.find((img) => img.isPrimary);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* ============================================== */}
      {/* NEW FEATURE: BACK BUTTON                     */}
      {/* ============================================== */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* ============================================== */}
        {/* NEW FEATURE: IMAGE MAGNIFIER                 */}
        {/* ============================================== */}
        {primaryImage ? (
          <ImageMagnifier
            src={primaryImage.imageUrl}
            alt={primaryImage.altText || product.name}
          />
        ) : (
          <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center text-muted-foreground rounded-lg">
            No Image
          </div>
        )}

        {/* Product Details (no changes here) */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-xl md:text-2xl font-semibold text-primary/80">
            {formatPrice(selectedVariant?.price || 0)}
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground">
              COLOR:{" "}
              <span className="text-foreground">
                {selectedVariant?.color.name}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {colorGroups.map((group) => {
                const isSelected = group.color.id === selectedVariant?.color.id;
                const isDisabled = !group.variants.some((v) => v.stock > 0);
                return (
                  <Button
                    key={group.color.id}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleColorSelect(group.color)}
                    disabled={isDisabled}
                    className={clsx(
                      "w-10 h-10 rounded-full border-2 transition-transform hover:scale-105",
                      isSelected
                        ? "border-primary"
                        : "border-muted-foreground/30",
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "border-muted-foreground/30"
                    )}
                    style={{ backgroundColor: group.color.hexCode }}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              SIZE:
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizesForSelectedColor?.map((size) => {
                const variant = colorGroups
                  .find((g) => g.color.id === selectedVariant?.color.id)
                  ?.variants.find((v) => v.size.id === size.id);
                const isSelected = size.id === selectedVariant?.size.id;
                const isDisabled = (variant?.stock || 0) === 0;
                return (
                  <Button
                    key={size.id}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleSizeSelect(size)}
                    disabled={isDisabled}
                    className={clsx(
                      "px-4 py-2 min-w-12 h-10 rounded-md transition-colors",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {size.value}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button
              size="lg"
              className="flex-1 rounded-full font-semibold"
              disabled={
                !selectedVariant ||
                (selectedVariant && selectedVariant.stock === 0)
              }
              onClick={() =>
                toast.success(
                  `Added ${product.name} to cart. (Variant ID: ${selectedVariant.id})`
                )
              }
            >
              <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-4"
              aria-label="Add to Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="mt-4 text-muted-foreground">
              {product.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Skeleton Loader for Product Detail Page (no changes)
// ============================================================================
const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
      <div className="aspect-[3/4] md:aspect-[3/4] rounded-lg bg-muted border" />
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2 mt-6">
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-full" />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-12 h-10 rounded-md" />
            ))}
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-12 flex-1 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
        <div className="pt-8 border-t border-border">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-20 w-full mt-4" />
        </div>
      </div>
    </div>
  );
};
