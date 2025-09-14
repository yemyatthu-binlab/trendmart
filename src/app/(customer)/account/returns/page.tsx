// app/account/returns/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetMyReturnRequestsQuery } from "@/graphql/generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  ServerCrash,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";

// --- Helper Functions ---
const formatDate = (isoString: string) =>
  new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getStatusVariant = (status: string) => {
  switch (status) {
    case "APPROVED":
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

// --- Status-specific Message Component ---
const StatusMessage = ({ status }: { status: string }) => {
  if (status === "REJECTED") {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Request Rejected</AlertTitle>
        <AlertDescription className="text-xs">
          Unfortunately, this return request did not meet our policy. If you
          have questions, please contact us at <strong>09958453693</strong>.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "APPROVED" || status === "REFUNDED") {
    return (
      <Alert variant="default" className="mt-4">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Request Approved</AlertTitle>
        <AlertDescription className="text-xs">
          Your refund is being processed. We will contact you shortly with more
          details.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "REQUESTED") {
    return (
      <Alert className="mt-4">
        <Clock className="h-4 w-4" />
        <AlertTitle>Under Review</AlertTitle>
        <AlertDescription className="text-xs">
          We have received your request and our team is currently reviewing it.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

// --- Main Page Component ---
export default function MyReturnsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/account";

  const { data, loading, error } = useGetMyReturnRequestsQuery({
    variables: { skip: 0, take: 20 },
    fetchPolicy: "cache-and-network",
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
        <ServerCrash className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-xl font-semibold">Failed to load requests</h2>
        <p className="mt-2 text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const requests = data?.getMyReturnRequests?.returnRequests || [];

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Go Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>My Damage & Return Requests</CardTitle>
          <CardDescription>
            Here is a list of your recent return requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Requests Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven&apos;t made any return requests yet.
              </p>
              <Button asChild className="mt-4">
                <Link href="/account/orders">View Your Orders</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {requests.map((req: any) => (
                <Card key={req.id} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-base">
                        Request ID: #{req.id}
                      </CardTitle>
                      <CardDescription>
                        Date: {formatDate(req.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusVariant(req.status)}>
                      {req.status.replace("_", " ")}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 text-sm">
                    {/* Item Details */}
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={
                            req.orderItem.productVariant.images[0]?.imageUrl ||
                            "/placeholder.svg"
                          }
                          alt={req.orderItem.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-foreground">
                          {req.orderItem.product.name}
                        </p>
                        <p className="text-muted-foreground">
                          {req.orderItem.productVariant.color.name} /{" "}
                          {req.orderItem.productVariant.size.value}
                        </p>
                        <p className="mt-2">
                          <span className="font-medium text-foreground">
                            Reason:
                          </span>{" "}
                          <span className="capitalize text-muted-foreground">
                            {req.reason.toLowerCase()}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Description & User Images */}
                    {req.description && (
                      <p className="mt-4 border-l-4 pl-4 italic text-muted-foreground">
                        {req.description}
                      </p>
                    )}
                    {req.images && req.images.length > 0 && (
                      <div className="mt-4">
                        <p className="font-semibold mb-2">
                          Your Submitted Images:
                        </p>
                        <div className="flex gap-2">
                          {req.images.map((img: any) => (
                            <div
                              key={img.id}
                              className="relative h-16 w-16 rounded border"
                            >
                              <Image
                                src={img.imageUrl}
                                alt="User submitted damage"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status Message */}
                    <StatusMessage status={req.status} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
