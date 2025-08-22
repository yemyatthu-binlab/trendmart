// /app/admin/orders/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  FileText,
} from "lucide-react";
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";
import { useQuery } from "@apollo/client";
import { GetOrdersList } from "@/graphql/queries/order";

const ITEMS_PER_PAGE = 10;

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
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

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, loading, error } = useQuery(GetOrdersList, {
    variables: { skip, take: ITEMS_PER_PAGE },
    fetchPolicy: "cache-and-network",
  });

  if (error) return <p>Error fetching orders: {error.message}</p>;

  const response = data?.getOrders;
  const orders = response?.orders || [];
  const totalCount = response?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto sm:py-8">
      <Sidebar />
      <div className="mx-5 sm:ml-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Browse and manage customer orders.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>A list of all recent orders.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && !data ? (
              <p>Loading orders...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="block w-full h-full px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            #{order.id}
                          </Link>
                        </TableCell>
                        <TableCell>{order.user.fullName}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(order.orderStatus)}
                          >
                            {order.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(order.orderTotal)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/orders/${order.id}`}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
          {totalPages > 1 && (
            <CardFooter>
              <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                <div>
                  Showing <strong>{skip + 1}</strong>-
                  <strong>{Math.min(skip + ITEMS_PER_PAGE, totalCount)}</strong>{" "}
                  of <strong>{totalCount}</strong> orders
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
