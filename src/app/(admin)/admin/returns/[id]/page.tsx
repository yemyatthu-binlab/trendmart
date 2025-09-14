// /app/admin/returns/[id]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, User, Package } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast } from "sonner";

import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

// GraphQL query and mutation
const GET_RETURN_REQUEST_BY_ID = gql`
  query GetReturnRequestById($id: ID!) {
    getReturnRequestById(id: $id) {
      id
      reason
      status
      description
      createdAt
      images {
        imageUrl
      }
      orderItem {
        id
        quantity
        priceAtPurchase
        product {
          name
        }
        productVariant {
          images {
            imageUrl
          }
          size {
            value
          }
          color {
            name
          }
        }
        order {
          id
          user {
            fullName
            email
          }
        }
      }
    }
  }
`;

const UPDATE_RETURN_STATUS = gql`
  mutation UpdateReturnRequestStatus(
    $returnRequestId: ID!
    $status: ReturnStatus!
  ) {
    updateReturnRequestStatus(
      returnRequestId: $returnRequestId
      status: $status
    ) {
      id
      status
    }
  }
`;

// Helper functions (can be moved to a utils file)
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount
  );
const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
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

export default function ReturnDetailPage() {
  const params = useParams();
  const requestId = params.id as string;

  const { data, loading, error, refetch } = useQuery(GET_RETURN_REQUEST_BY_ID, {
    variables: { id: requestId },
    skip: !requestId,
  });

  const [updateStatus, { loading: updatingStatus }] = useMutation(
    UPDATE_RETURN_STATUS,
    {
      onCompleted: (data) => {
        toast.success(
          `Request status updated to ${data.updateReturnRequestStatus.status}`
        );
        refetch();
      },
      onError: (error) => {
        toast.error(`Failed to update status: ${error.message}`);
      },
    }
  );

  const handleUpdateStatus = (status: "APPROVED" | "REJECTED") => {
    updateStatus({ variables: { returnRequestId: requestId, status } });
  };

  if (loading) return <p>Loading return request details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getReturnRequestById)
    return <p>Return request not found.</p>;

  const { getReturnRequestById: request } = data;
  const { orderItem } = request;

  return (
    <>
      <Toaster richColors />
      <div className="container mx-auto sm:py-8">
        <Sidebar />
        <div className="mx-5 sm:ml-10">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/returns">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                Return Request #R{request.id}
              </h1>
              <p className="text-muted-foreground">
                Submitted on {formatDate(request.createdAt)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Item to be Returned */}
              <Card>
                <CardHeader>
                  <CardTitle>Item to be Returned</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                  <Image
                    src={
                      orderItem.productVariant.images?.[0]?.imageUrl ||
                      "/placeholder.svg"
                    }
                    alt={orderItem.product.name}
                    width={128}
                    height={128}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {orderItem.product.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {orderItem.productVariant.size.value} /{" "}
                      {orderItem.productVariant.color.name}
                    </p>
                    <p>Quantity: {orderItem.quantity}</p>
                    <p>
                      Price at Purchase:{" "}
                      {formatCurrency(orderItem.priceAtPurchase)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      asChild
                    >
                      <Link href={`/admin/orders/${orderItem.order.id}`}>
                        View Original Order
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Uploaded Images */}
              {request.images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Uploaded Images</CardTitle>
                    <CardDescription>
                      Images provided for the return reason.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4">
                    {request.images.map((img: any, index: number) => (
                      <Zoom key={index}>
                        <Image
                          src={img.imageUrl}
                          alt={`Return image ${index + 1}`}
                          width={150}
                          height={150}
                          className="rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </Zoom>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {/* Return Details & Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={getStatusBadgeVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reason</span>
                    <span className="font-medium">
                      {request.reason.replace("_", " ")}
                    </span>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">
                      Customer&apos;s Description:
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-slate-50 rounded-md">
                      {request.description || "No description provided."}
                    </p>
                  </div>

                  {/* ADMIN ACTIONS */}
                  {request.status === "REQUESTED" && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => handleUpdateStatus("APPROVED")}
                          disabled={updatingStatus}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleUpdateStatus("REJECTED")}
                          disabled={updatingStatus}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">
                      {orderItem.order.user.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {orderItem.order.user.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
