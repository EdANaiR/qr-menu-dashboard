import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");

  // Staff sayfasına erişim kontrolü
  if (request.nextUrl.pathname.startsWith("/staff")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Login sayfasına zaten giriş yapmış kullanıcı kontrolü
  if (request.nextUrl.pathname === "/login") {
    if (authToken) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff/:path*", "/login"],
};
