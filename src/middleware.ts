import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminAuthenticated = request.cookies.has("admin-auth-token");
  const isCustomerAuthenticated = request.cookies.has("customer-auth-token");

  // Admin route protection
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect logged-in admin from login page
  if (pathname === "/admin/login" && isAdminAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Customer protected routes (e.g., profile, order history)
  const customerProtectedRoutes = ["/profile", "/orders"];
  if (customerProtectedRoutes.some((p) => pathname.startsWith(p))) {
    if (!isCustomerAuthenticated) {
      // Redirect to the home page to open the login modal
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*"],
};
