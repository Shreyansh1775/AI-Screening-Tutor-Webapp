import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // protect interview + report pages
  if (
    (request.nextUrl.pathname.startsWith("/interview") ||
      request.nextUrl.pathname.startsWith("/report")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/interview/:path*", "/report/:path*"],
};