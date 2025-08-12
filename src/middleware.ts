// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for the admin authentication cookie
  const isAdminAuthenticated = request.cookies.has("admin-auth-token");
  // Check for customer token (you could also use a cookie for this for SSR)
  const isCustomerAuthenticated = request.cookies.has("customer-auth-token"); // Or check another source

  // Admin route protection logic
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect authenticated admin from login page to dashboard
  if (pathname === "/admin/login" && isAdminAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Customer protected routes (example: /profile)
  const customerProtectedRoutes = ["/profile", "/orders"];
  if (customerProtectedRoutes.some((p) => pathname.startsWith(p))) {
    // For customer auth, you'd likely check a JWT from a cookie or rely on client-side checks.
    // This is a simplified example checking for a cookie.
    if (!isCustomerAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*"],
};
