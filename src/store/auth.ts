import { create } from "zustand";
import { apolloClient } from "@/lib/apolloClient";
import { User } from "@/graphql/generated";
import { useCartStore } from "./cart";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // <-- Add this
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
};

const setCustomerCookie = (token: string) => {
  document.cookie = `customer-auth-token=${token}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; secure; samesite=strict`;
};

const clearAuthCredentials = () => {
  localStorage.removeItem("authToken");
  document.cookie =
    "customer-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // <-- Start as true, since we need to verify auth on load
  login: (token, user) => {
    localStorage.setItem("authToken", token);
    setCustomerCookie(token);
    set({ user, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    const userId = get().user?.id;
    if (userId) {
      useCartStore.getState().clearCart(userId);
    }
    clearAuthCredentials();
    apolloClient.resetStore();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  setUser: (user) => {
    // This will be our main function for initialization
    set({ user, isAuthenticated: !!user, isLoading: false });
  },
}));
