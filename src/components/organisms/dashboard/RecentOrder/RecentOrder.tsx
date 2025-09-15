// Make sure this is a client component to use hooks
"use client";

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
// Import your GraphQL query
import { GetOrdersList } from "@/graphql/queries/order";

// --- Helper Functions (copied from your admin/orders page for consistency) ---

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

// Helper for status badges
const getStatusBadgeVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "DELIVERED":
      return "default";
    case "SHIPPED":
      return "secondary";
    case "PROCESSING":
      return "outline";
    case "CANCELLED":
      return "destructive";
    default:
      return "secondary";
  }
};

export function RecentOrders() {
  // Fetch the 5 most recent orders
  const { data, loading, error } = useQuery(GetOrdersList, {
    variables: { skip: 0, take: 5 },
    fetchPolicy: "cache-and-network",
  });

  const orders = data?.getOrders?.orders || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          An overview of your 5 most recent sales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Handle Loading and Error States */}
        {loading && (
          <p className="text-sm text-muted-foreground">
            Loading recent orders...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500">Error fetching orders.</p>
        )}

        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map(
                  (
                    order: any // Use 'any' or define a proper type
                  ) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.user.fullName}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(order.orderStatus)}
                        >
                          {/* Capitalize first letter for better display if needed */}
                          {order.orderStatus.charAt(0).toUpperCase() +
                            order.orderStatus.slice(1).toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(order.orderTotal)}
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No recent orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
