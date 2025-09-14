import type { ReactNode } from "react";

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
