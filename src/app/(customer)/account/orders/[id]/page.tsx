"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ServerCrash, AlertCircle } from "lucide-react";
import { useGetMyOrderByIdQuery } from "@/graphql/generated";

// Re-use helpers from the list page
const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const formatCurrency = (amount: number) => `Ks ${amount.toLocaleString()}`;
const getStatusVariant = (status: string) => {
  // ... same as above
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const { data, loading, error } = useGetMyOrderByIdQuery({
    variables: { id: orderId },
    skip: !orderId, // Don't run query if ID is not available yet
  });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-xl font-semibold">Order Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          We couldn't find this order, or you may not have permission to view
          it.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
      </div>
    );
  }

  const order = data?.getMyOrderById;

  if (!order) {
    return null; // or a dedicated "not found" component
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Orders
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column: Order Items */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={
                          item.productVariant.images[0]?.imageUrl ||
                          "/placeholder.svg"
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.productVariant.color.name} /{" "}
                        {item.productVariant.size.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-medium">
                      {formatCurrency(item.priceAtPurchase * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-2 text-right">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.orderTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(order.orderTotal)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Summary & Address */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <strong>#{order.id}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <strong>{formatDate(order.createdAt)}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Order Status:</span>
                <Badge variant={getStatusVariant(order.orderStatus)}>
                  {order.orderStatus.replace("_", " ")}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Status:</span>
                <Badge
                  variant={getStatusVariant(
                    order.payment?.paymentStatus || "PENDING"
                  )}
                >
                  {["SHIPPED", "DELIVERED", "PROCESSING"].includes(
                    order.orderStatus
                  )
                    ? "COMPLETED"
                    : order.payment?.paymentStatus.replace("_", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p className="text-muted-foreground">
                {order.shippingAddress.addressLine1}
              </p>
              <p className="text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p className="text-muted-foreground">
                {order.shippingAddress.phoneNumber}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
