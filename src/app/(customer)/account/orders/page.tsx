"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Loader2, ServerCrash } from "lucide-react";
import { useGetMyOrdersListQuery } from "@/graphql/generated";
import { useRouter, useSearchParams } from "next/navigation";

// Helper to format date and currency
const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const formatCurrency = (amount: number) => `Ks ${amount.toLocaleString()}`;

// Helper for status badge styling
const getStatusVariant = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "success";
    case "SHIPPED":
      return "default";
    case "PROCESSING":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    case "PENDING_PAYMENT":
    default:
      return "outline";
  }
};

export default function MyOrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const { data, loading, error } = useGetMyOrdersListQuery({
    variables: { skip: 0, take: 20 },
    fetchPolicy: "cache-and-network",
  });

  if (!data && loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-[60vh] items-center justify-center text-center">
        <ServerCrash className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-xl font-semibold">Failed to load orders</h2>
        <p className="mt-2 text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const orders = data?.getMyOrders?.orders || [];

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push(from)}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Go Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Here is a list of your recent orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Orders Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven&apos;t placed any orders yet.
              </p>
              <Button asChild className="mt-4">
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.orderStatus)}>
                        {order.orderStatus.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order.orderTotal)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/account/orders/${order.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
