import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // ==============================
  // 1. ROOT ROUTE HANDLING (/)
  // ==============================
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // ==============================
  // 2. LOGIN / REGISTER BLOCK IF LOGGED IN
  // ==============================
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // ==============================
  // 3. PROTECT ALL MAIN ROUTES
  // ==============================
  const protectedRoutes = ["/home", "/interview", "/report", "/profile"];

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// ==============================
// Apply middleware to all routes
// ==============================
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};