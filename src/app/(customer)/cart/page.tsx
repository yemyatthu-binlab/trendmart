// app/(customer)/cart/page.tsx

"use client";

import { useCartStore, CartItem } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { getCart, updateQuantity, removeFromCart } = useCartStore();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setCartItems(getCart(user.id));
    }
    const unsubscribe = useCartStore.subscribe(
      (state) => (user?.id ? state.carts[user.id] : []),
      (newCart) => setCartItems(newCart || [])
    );
    return () => unsubscribe();
  }, [isAuthenticated, user, getCart]);

  if (!isAuthenticated) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>
        <p className="text-muted-foreground mb-6">
          You need to be logged in to view your cart.
        </p>
        <Button onClick={() => router.push("/login")}>Go to Login</Button>
      </div>
    );
  }

  const handleQuantityChange = (variantId: string, newQuantity: number) => {
    if (user?.id) {
      if (isNaN(newQuantity) || newQuantity < 0) return;
      if (newQuantity === 0) {
        removeFromCart(user.id, variantId);
      } else {
        updateQuantity(user.id, variantId, newQuantity);
      }
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Continue Shopping
      </Button>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.productId}`}>
                      <h3 className="font-semibold hover:underline">
                        {item.productName}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <p className="font-medium text-sm">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleQuantityChange(item.variantId, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      className="h-8 w-12 text-center"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.variantId,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleQuantityChange(item.variantId, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        user?.id && removeFromCart(user.id, item.variantId)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1 sticky top-24 border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Button asChild size="lg" className="w-full mt-6">
              <Link href="/cart/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
