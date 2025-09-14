// src/app/account/page.tsx
"use client";

import Link from "next/link";
import {
  useGetMeQuery,
  useGetMyOrdersListQuery,
  GetMeQuery,
} from "@/graphql/generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pencil,
  PlusCircle,
  MapPin,
  FileText,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Re-using helpers from your orders page
const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const formatCurrency = (amount: number) => `Ks ${amount.toLocaleString()}`;
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
    default:
      return "outline";
  }
};

type User = GetMeQuery["me"];

// --- Sub-Components for clarity ---

const ProfileDetailsCard = ({ user }: { user: User }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Your personal information.</CardDescription>
      </div>
      {/* <Button variant="outline" size="icon">
        <Pencil className="h-4 w-4" />
      </Button> */}
    </CardHeader>
    <CardContent className="space-y-2">
      <p>
        <strong>Full Name:</strong> {user?.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </CardContent>
  </Card>
);

const AddressSectionCard = ({
  addresses,
}: {
  addresses: User["addresses"];
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>My Addresses</CardTitle>
        <CardDescription>Your saved shipping addresses.</CardDescription>
      </div>
      {/* <Button variant="outline">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add New
      </Button> */}
    </CardHeader>
    <CardContent>
      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-4 border rounded-lg relative space-y-1"
            >
              {addr.isDefault && (
                <Badge className="absolute top-2 right-2">Default</Badge>
              )}
              <p className="font-semibold">{addr.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {addr.addressLine1}
              </p>
              <p className="text-sm text-muted-foreground">
                {addr.city}, {addr.postalCode}
              </p>
              <p className="text-sm text-muted-foreground">
                {addr.phoneNumber}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 flex flex-col items-center">
          <MapPin className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-medium">No addresses found</h3>
          <p className="text-sm text-muted-foreground">
            Add a new address for faster checkout.
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

const RecentOrdersCard = ({ orders }: { orders: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Orders</CardTitle>
      <CardDescription>Here are your last few orders.</CardDescription>
    </CardHeader>
    <CardContent>
      {orders && orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.orderStatus)}>
                    {order.orderStatus.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(order.orderTotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 flex flex-col items-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-medium">You haven't placed any orders yet.</h3>
          <Button asChild className="mt-4">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </CardContent>
    {orders && orders.length > 0 && (
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline">
          <Link href="/account/orders">
            View All Orders <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    )}
  </Card>
);

// --- Main Page Component ---

export default function AccountDashboardPage() {
  // Fetch user profile data
  const { data: meData, loading: meLoading } = useGetMeQuery();
  const router = useRouter();
  // Fetch only the 3 most recent orders for the dashboard
  const { data: ordersData, loading: ordersLoading } = useGetMyOrdersListQuery({
    variables: { skip: 0, take: 3 },
    fetchPolicy: "cache-and-network",
  });

  const user = meData?.me;
  const addresses = meData?.me?.addresses || [];
  const recentOrders = ordersData?.getMyOrders?.orders || [];

  // Loading state skeleton
  if ((meLoading && !meData) || (ordersLoading && !ordersData)) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Go Back
      </Button>

      <h1 className="text-3xl font-bold tracking-tight">Account Dashboard</h1>

      {user && <ProfileDetailsCard user={user} />}

      <AddressSectionCard addresses={addresses} />

      <RecentOrdersCard orders={recentOrders} />
    </div>
  );
}
