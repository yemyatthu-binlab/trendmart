"use client";

import { useState, useEffect, MouseEvent, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import clsx from "clsx";
import {
  GetProductByIdQuery,
  useGetProductByIdQuery,
} from "@/graphql/generated";
import { formatPrice } from "@/lib/utils";
import "@/styles/prose-style.css";
import { ProductReviews } from "@/components/organisms/products/ProductReview/ProductReview";
// NEW: Import your authentication store
import { useAuthStore } from "@/store/auth";
import { set } from "zod";

// Types and ImageMagnifier component remain unchanged
type ProductVariant = GetProductByIdQuery["getProductById"]["variants"][0];
type ProductColor = ProductVariant["color"];
type ProductSize = ProductVariant["size"];

interface ColorGroup {
  color: ProductColor;
  variants: ProductVariant[];
}

// ============================================================================
// ImageMagnifier Component (NO CHANGES)
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

  const lensLeft = Math.min(
    Math.max(position.x - halfLensSize, 0),
    containerSize.width - lensSize
  );
  const lensTop = Math.min(
    Math.max(position.y - halfLensSize, 0),
    containerSize.height - lensSize
  );

  const backgroundPosX = `-${position.x * zoomLevel - halfLensSize}px`;
  const backgroundPosY = `-${position.y * zoomLevel - halfLensSize}px`;

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

      {showMagnifier && containerSize.width > 0 && (
        <div
          className="absolute pointer-events-none border-2 border-primary bg-white/20 backdrop-blur-sm rounded-full"
          style={{
            top: `${lensTop}px`,
            left: `${lensLeft}px`,
            height: `${lensSize}px`,
            width: `${lensSize}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${backgroundSizeX}px ${backgroundSizeY}px`,
            backgroundPosition: `${backgroundPosX} ${backgroundPosY}`,
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// Main Product Detail Component (UPDATED)
// ============================================================================
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  // NEW: Get authentication status from the store
  const { isAuthenticated } = useAuthStore();

  const { data, loading, error } = useGetProductByIdQuery({
    variables: { id },
  });

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  // NEW: State for quantity
  const [quantity, setQuantity] = useState(1);

  const colorGroups: ColorGroup[] =
    data?.getProductById?.variants?.reduce((acc, variant) => {
      const existingGroup = acc.find(
        (group) => group.color.id === variant?.color.id
      );
      if (existingGroup) {
        existingGroup.variants.push(variant);
      } else {
        acc.push({ color: variant?.color, variants: [variant] });
      }
      return acc;
    }, [] as ColorGroup[]) || [];

  const sizesForSelectedColor =
    selectedVariant &&
    colorGroups
      .find((group) => group.color.id === selectedVariant.color.id)
      ?.variants.map((v) => v.size)
      .sort((a, b) => a.value.localeCompare(b.value));

  useEffect(() => {
    if (data?.getProductById?.variants?.length) {
      const initialVariant = data.getProductById.variants.find((v) =>
        v?.images?.some((img) => img.isPrimary)
      );
      setSelectedVariant(initialVariant || data.getProductById.variants[0]);
    }
  }, [data]);

  // NEW: Reset quantity to 1 when variant changes to prevent ordering more than available stock
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

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

  const handlePurchase = () => {
    if (!selectedVariant) {
      console.error("No variant selected!");
      return;
    }
    // 2. Navigate to the checkout page with query params
    router.push(
      `/product/checkout?variantId=${selectedVariant.id}&productId=${product.id}&quantity=${quantity}`
    );
  };

  const handleSizeSelect = (size: ProductSize) => {
    const newVariant = colorGroups
      .find((group) => group.color.id === selectedVariant?.color.id)
      ?.variants.find((v) => v.size.id === size.id);

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  // NEW: Handlers for quantity change
  const handleIncrement = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
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
          The product you&#39;re looking for doesn&#39;t exist.
        </p>
      </div>
    );
  }

  const product = data.getProductById;
  const primaryImage = selectedVariant?.images.find((img) => img.isPrimary);

  // NEW: Derived state for easier use in the component
  const isOutOfStock = !selectedVariant || selectedVariant.stock === 0;
  const subtotal = (selectedVariant?.price || 0) * quantity;
  const isPurchaseDisabled = !isAuthenticated || isOutOfStock;

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-xl md:text-2xl font-semibold text-primary/80">
              {formatPrice(selectedVariant?.price || 0)}
            </p>

            {/* NEW: Availability Section */}
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">
                Availability:{" "}
                <span
                  className={clsx(
                    "font-semibold",
                    !isOutOfStock ? "text-green-600" : "text-red-600"
                  )}
                >
                  {!isOutOfStock
                    ? `In Stock (${selectedVariant.stock} available)`
                    : "Out of Stock"}
                </span>
              </p>
            </div>

            {/* Color Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground">
                COLOR:{" "}
                <span className="text-foreground">
                  {selectedVariant?.color.name}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorGroups.map((group) => {
                  const isSelected =
                    group.color.id === selectedVariant?.color.id;
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
                      style={{
                        backgroundColor: group.color.hexCode,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-muted-foreground">
                SIZE:
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizesForSelectedColor?.map((size: ProductSize) => {
                  const variant = colorGroups
                    .find(
                      (g: ColorGroup) =>
                        g.color.id === selectedVariant?.color.id
                    )
                    ?.variants.find(
                      (v: ProductVariant) => v.size.id === size.id
                    );

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

            {/* NEW: Quantity Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                QUANTITY
              </h3>
              <div className="flex items-center border border-input rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none"
                  onClick={handleIncrement}
                  disabled={quantity >= (selectedVariant?.stock || 0)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* NEW: Subtotal Display */}
            <div className="mt-8 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* NEW: Updated action buttons with auth check and new Purchase button */}
            <div className="mt-8 space-y-4 flex-row">
              {!isAuthenticated && (
                <div className="text-sm text-center text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
                  Please log in to purchase or add items to your cart.
                </div>
              )}
              <div className="flex flex-row flex-1 items-center">
                <Button
                  size="lg"
                  className="flex-1 rounded-full mr-4 font-bold text-lg py-7 bg-black from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-primary/40 transition-shadow"
                  disabled={isPurchaseDisabled}
                  onClick={handlePurchase}
                >
                  <CreditCard className="w-6 h-6 mr-3" /> Purchase Now
                </Button>

                <div className="flex flex-row gap-4 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-4"
                    aria-label="Add to Cart"
                    disabled={!isAuthenticated}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-4"
                    aria-label="Add to Wishlist"
                    disabled={!isAuthenticated}
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs Section (Unchanged) */}
            <div className="mt-12">
              <Tabs defaultValue="reviews" className="w-full">
                <TabsList>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="shipping">Damage & Return</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <div className="prose-wrapper">
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.description ||
                          "<p>No description provided.</p>",
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <ProductReviews />
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Our Policy</h3>
                    <p>
                      Details about the damage and return policy will be updated
                      here soon. Please contact customer support for any
                      immediate questions.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Skeleton Loader (NO CHANGES)
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
          <Skeleton className="h-10 w-[400px]" />
          <Skeleton className="h-40 w-full mt-6" />
        </div>
      </div>
    </div>
  );
};
