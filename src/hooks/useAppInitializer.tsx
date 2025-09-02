"use client";

import { useEffect } from "react";
import { useGetMeQuery, User } from "@/graphql/generated";
import { useAuthStore } from "@/store/auth";

export const useAppInitializer = () => {
  const { setUser, logout } = useAuthStore();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const { data, error, loading } = useGetMeQuery({
    skip: !token,
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error || (data && !data.me)) {
      // If there's an error (e.g., token invalid) or data comes back empty,
      // perform a clean logout.
      logout();
    } else if (data?.me) {
      // If the query is successful and returns a user, set it in the store.
      setUser(data?.me as User);
    } else if (!token) {
      // If there was no token to begin with, just stop loading.
      setUser(null);
    }
  }, [data, error, loading, setUser, logout, token]);

  return { loading, data };
};
