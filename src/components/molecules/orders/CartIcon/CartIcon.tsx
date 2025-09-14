// components/layout/CartIcon.tsx

"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export function CartIcon() {
  const { user, isAuthenticated } = useAuthStore();
  const getCartItemCount = useCartStore((state) => state.getCartItemCount);
  
  // Use local state to prevent Next.js hydration mismatch errors
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // This effect runs on the client and safely gets the count from localStorage
    if (isAuthenticated && user?.id) {
      setItemCount(getCartItemCount(user.id));
    } else {
      setItemCount(0);
    }

    // Subscribe to store changes to keep the count updated in real-time
    const unsubscribe = useCartStore.subscribe(
      (state) => (user?.id ? state.carts[user.id] : undefined),
      (userCart) => {
        const newCount = (userCart || []).reduce(
          (total, item) => total + item.quantity, 0
        );
        setItemCount(newCount);
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [isAuthenticated, user, getCartItemCount]);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {isAuthenticated && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}