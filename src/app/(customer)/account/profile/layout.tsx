// src/app/account/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, User, LogOut, Home, Undo2, DollarSign } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Your utility for merging class names

const navItems = [
  { href: "/refund", label: "Refund", icon: DollarSign },
  { href: "/account/orders", label: "My Orders", icon: Package },
  // Add more links like "/account/settings" here in the future
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:col-span-1">
          <div className="p-4 rounded-lg border bg-card text-card-foreground">
            <div className="flex flex-col items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-3">
                <p className="text-white text-2xl font-bold">
                  {user?.fullName.charAt(0).toUpperCase()}
                </p>
              </div>
              <h2 className="font-semibold text-lg">{user?.fullName}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const hrefWithFrom =
                  item.href === "/account/orders"
                    ? `${item.href}?from=${encodeURIComponent(pathname)}`
                    : item.href;

                return (
                  <Link
                    key={item.href}
                    href={hrefWithFrom}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center gap-3 justify-start px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}
