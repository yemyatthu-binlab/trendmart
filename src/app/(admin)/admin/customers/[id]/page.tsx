"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Home,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GET_CUSTOMER_BY_ID_QUERY } from "@/graphql/queries/customer";

// Define TypeScript types based on your GraphQL schema
interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean | null;
}

interface CustomerDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
  addresses: Address[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, loading, error } = useQuery(GET_CUSTOMER_BY_ID_QUERY, {
    variables: { id },
    skip: !id, // Don't run the query if there's no ID
  });

  const customer: CustomerDetails | null = data?.getCustomerById;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not fetch customer details: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Customer not found.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/customers">Back to Customers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <Button asChild variant="outline" size="sm">
        <Link href="/admin/customers">← Back to Customers</Link>
      </Button>
      {/* Customer Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="h-7 w-7" />
            <span>{customer.fullName}</span>
          </CardTitle>
          <CardDescription>
            Customer since{" "}
            {new Date(customer.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              {customer.phoneNumber || "Not provided"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              Last updated: {new Date(customer.updatedAt).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Addresses Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Home className="h-7 w-7" />
            <span>Addresses</span>
          </CardTitle>
          <CardDescription>
            {customer.addresses.length > 0
              ? `This customer has ${customer.addresses.length} saved address(es).`
              : "This customer has not saved any addresses yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {customer.addresses.length > 0 ? (
            customer.addresses.map((address) => (
              <div key={address.id} className="p-4 border rounded-lg relative">
                {address.isDefault && (
                  <Badge className="absolute top-4 right-4 flex items-center gap-1">
                    <Star className="h-3 w-3" /> Default
                  </Badge>
                )}
                <p className="font-semibold">{address.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {address.addressLine1}
                </p>
                {address.addressLine2 && (
                  <p className="text-sm text-muted-foreground">
                    {address.addressLine2}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {address.city}, {address.postalCode}
                </p>
                <Separator className="my-2" />
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{address.phoneNumber}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                No addresses
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No saved addresses found for this customer.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
