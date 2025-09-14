// /app/admin/returns/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PackageOpen,
} from "lucide-react";
import { gql, useQuery } from "@apollo/client";

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

const ITEMS_PER_PAGE = 10;

// GraphQL query to fetch return requests
const GET_RETURN_REQUESTS = gql`
  query GetReturnRequests($skip: Int, $take: Int) {
    getReturnRequests(skip: $skip, take: $take) {
      returnRequests {
        id
        status
        createdAt
        orderItem {
          id
          product {
            name
          }
          order {
            id
            user {
              fullName
            }
          }
        }
      }
      totalCount
    }
  }
`;

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
    case "APPROVED":
    case "RETURNED":
    case "REFUNDED":
      return "default";
    case "REQUESTED":
      return "secondary";
    case "REJECTED":
      return "destructive";
    default:
      return "outline";
  }
};

export default function ReturnsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, loading, error } = useQuery(GET_RETURN_REQUESTS, {
    variables: { skip, take: ITEMS_PER_PAGE },
    fetchPolicy: "cache-and-network",
  });

  if (error) return <p>Error fetching return requests: {error.message}</p>;

  const response = data?.getReturnRequests;
  const returnRequests = response?.returnRequests || [];
  const totalCount = response?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto sm:py-8">
      <Sidebar />
      <div className="mx-5 sm:ml-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Damage & Returns</h1>
          <p className="text-muted-foreground">
            Review and manage customer return requests.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Return Requests</CardTitle>
            <CardDescription>
              A list of all recent return requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && !data ? (
              <p>Loading requests...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnRequests.length > 0 ? (
                    returnRequests.map((req: any) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/admin/returns/${req.id}`}
                            className="hover:underline"
                          >
                            #R{req.id}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/admin/orders/${req.orderItem.order.id}`}
                            className="hover:underline"
                          >
                            #{req.orderItem.order.id}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {req.orderItem.order.user.fullName}
                        </TableCell>
                        <TableCell>{req.orderItem.product.name}</TableCell>
                        <TableCell>{formatDate(req.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(req.status)}>
                            {req.status}
                          </Badge>
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
                                <Link href={`/admin/returns/${req.id}`}>
                                  <PackageOpen className="mr-2 h-4 w-4" />
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
                        No return requests found.
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
                  of <strong>{totalCount}</strong> requests
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
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
