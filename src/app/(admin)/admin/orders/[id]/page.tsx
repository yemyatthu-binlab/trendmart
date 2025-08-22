// /app/admin/orders/[id]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, User, MapPin, CreditCard } from "lucide-react";

import { useGetOrderByIdQuery } from "@/graphql/generated";
import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Re-use helpers from the list page
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const getStatusBadgeVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "DELIVERED":
      return "default";
    case "COMPLETED":
      return "default";
    case "SHIPPED":
      return "secondary";
    case "PROCESSING":
      return "outline";
    case "PENDING_PAYMENT":
      return "outline";
    case "PENDING":
      return "outline";
    case "CANCELLED":
      return "destructive";
    case "FAILED":
      return "destructive";
    default:
      return "secondary";
  }
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const { data, loading, error } = useGetOrderByIdQuery({
    variables: { id: orderId },
    skip: !orderId,
  });

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getOrderById) return <p>Order not found.</p>;

  const { getOrderById: order } = data;

  return (
    <div className="container mx-auto sm:py-8">
      <Sidebar />
      <div className="mx-5 sm:ml-10">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <Image
                              src={
                                item.productVariant.images?.[0]?.imageUrl ||
                                "/placeholder.svg"
                              }
                              alt={`${item.productVariant.size.value} / ${item.productVariant.color.name}`}
                              width={64}
                              height={64}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <p className="font-medium">
                                {/* Replace with actual product name if available, otherwise fallback */}
                                {"product" in item.productVariant && (item.productVariant as any).product?.name
                                  ? (item.productVariant as any).product.name
                                  : "Product Name"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.productVariant.size.value} /{" "}
                                {item.productVariant.color.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>x{item.quantity}</TableCell>
                        <TableCell>
                          {formatCurrency(item.priceAtPurchase)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.priceAtPurchase * item.quantity)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Summary</CardTitle>
                <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                  {order.orderStatus}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.orderTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(order.orderTotal)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Shipping Card */}
            <Card>
              <CardHeader>
                <CardTitle>Customer & Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p>{order.user.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.user.email}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p>{order.shippingAddress.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.addressLine1}
                      {order.shippingAddress.addressLine2 &&
                        `, ${order.shippingAddress.addressLine2}`}
                      <br />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Card */}
            {order.payment && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {order.payment.paymentMethod.replace("_", " ")}
                    </span>
                    <Badge
                      variant={getStatusBadgeVariant(
                        order.payment.paymentStatus
                      )}
                    >
                      {order.payment.paymentStatus}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Amount Paid</span>
                    <span>{formatCurrency(order.payment.amount)}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
