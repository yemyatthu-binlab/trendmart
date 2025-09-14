// store/cart.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

export type CartItem = {
  productId: string;
  productName: string;
  variantId: string;
  color: string;
  size: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

// The state will be an object where keys are user IDs
type CartStateShape = {
  [userId: string]: CartItem[];
};

type CartState = {
  carts: CartStateShape;
  addToCart: (userId: string, item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (userId: string, variantId: string) => void;
  updateQuantity: (
    userId: string,
    variantId: string,
    newQuantity: number
  ) => void;
  clearCart: (userId: string) => void;
  getCart: (userId: string) => CartItem[];
  getCartItemCount: (userId: string) => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carts: {},

      getCart: (userId: string) => {
        return get().carts[userId] || [];
      },

      getCartItemCount: (userId: string) => {
        const userCart = get().carts[userId] || [];
        return userCart.reduce((total, item) => total + item.quantity, 0);
      },

      addToCart: (userId, newItem) => {
        if (!userId) {
          toast.error("You must be logged in to add items to the cart.");
          return;
        }
        set((state) => {
          const userCart = state.carts[userId] ? [...state.carts[userId]] : [];
          const existingItemIndex = userCart.findIndex(
            (item) => item.variantId === newItem.variantId
          );

          if (existingItemIndex > -1) {
            // Item exists, increment quantity
            userCart[existingItemIndex].quantity += 1;
            toast.success(`${newItem.productName} quantity updated in cart.`);
          } else {
            // Item doesn't exist, add it with quantity 1
            userCart.push({ ...newItem, quantity: 1 });
            toast.success(`${newItem.productName} added to cart!`);
          }

          return {
            carts: {
              ...state.carts,
              [userId]: userCart,
            },
          };
        });
      },

      updateQuantity: (userId, variantId, newQuantity) => {
        if (!userId) return;
        set((state) => {
          const userCart = state.carts[userId] ? [...state.carts[userId]] : [];
          const itemIndex = userCart.findIndex(
            (item) => item.variantId === variantId
          );

          if (itemIndex > -1) {
            if (newQuantity > 0) {
              userCart[itemIndex].quantity = newQuantity;
            } else {
              // If quantity is 0 or less, remove the item
              userCart.splice(itemIndex, 1);
            }
          }

          return {
            carts: {
              ...state.carts,
              [userId]: userCart,
            },
          };
        });
      },

      removeFromCart: (userId, variantId) => {
        if (!userId) return;
        set((state) => {
          const userCart = state.carts[userId] ? [...state.carts[userId]] : [];
          const updatedCart = userCart.filter(
            (item) => item.variantId !== variantId
          );
          toast.info("Item removed from cart.");

          return {
            carts: {
              ...state.carts,
              [userId]: updatedCart,
            },
          };
        });
      },

      clearCart: (userId) => {
        if (!userId) return;
        set((state) => {
          const newCarts = { ...state.carts };
          delete newCarts[userId]; // Remove the user's cart object
          return { carts: newCarts };
        });
      },
    }),
    {
      name: "e-commerce-cart-storage", // A unique name for the localStorage item
      storage: createJSONStorage(() => localStorage),
    }
  )
);
