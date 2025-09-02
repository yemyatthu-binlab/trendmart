"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";
import { useApolloClient } from "@apollo/client";

export default function OrderSuccessPage() {
  const client = useApolloClient();

  const handleViewOrders = async () => {
    await client.refetchQueries({
      include: ["GetMyOrdersList"],
    });
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border bg-card p-8 text-center shadow-sm md:p-12 max-w-lg mx-auto">
        <div className="text-green-500">
          <CheckCircle className="h-20 w-20" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-card-foreground">
            Thank You for Your Order!
          </h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully. We have sent a confirmation
            email to the shop administrator and will process your order soon. It
            usually take at most one day to proceed the order. In case if it
            takes longer than that, feel free to contact us at{" "}
            <a href="tel:09958453693" className="font-bold hover:underline">
              09958453693
            </a>
            . You can also track your order status in your account.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" onClick={handleViewOrders}>
            <Link href="/account/orders">
              <Package className="mr-2 h-5 w-5" />
              View My Orders
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
