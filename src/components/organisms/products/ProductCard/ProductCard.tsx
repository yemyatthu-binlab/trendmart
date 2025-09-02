// components/products/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListPublicProductsQuery } from "@/graphql/generated";
import { formatPrice } from "@/lib/utils";

// Get the type for a single product from the generated types
type Product = NonNullable<
  ListPublicProductsQuery["listPublicProducts"]
>["products"][number];

interface ProductCardProps {
  product: Product;
}



export function ProductCard({ product }: ProductCardProps) {
  // Find the variant with the lowest price to display
  const displayVariant = product.variants?.reduce((lowest, current) => {
    return (current?.price ?? Infinity) < (lowest?.price ?? Infinity) ? current : lowest;
  }, product.variants[0]);

  const primaryImage = displayVariant?.images?.[0]?.imageUrl;

  return (
    <Link href={`/product/${product.id}`} className="group outline-none">
      <Card className="h-full w-full overflow-hidden rounded-lg border-2 border-transparent transition-all group-hover:border-gray-50 group-focus-visible:border-primary">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary">
                <span className="text-sm text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <Badge variant="outline">{product.categories && product.categories[0]?.name}</Badge>
          <h3 className="font-semibold text-lg leading-tight">
            {product.name}
          </h3>
          <p className="font-bold text-xl text-primary">
            {displayVariant ? formatPrice(displayVariant.price) : "N/A"}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
