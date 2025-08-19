"use client";

import { ApolloProvider as Provider } from "@apollo/client";
import { apolloClient } from "@/lib/apolloClient";

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={apolloClient}>{children}</Provider>;
}
