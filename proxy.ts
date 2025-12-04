import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Disable access to portfolio and admin pages
  if (pathname.startsWith("/portfolio") || pathname.startsWith("/admin")) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/portfolio/:path*", "/admin/:path*"],
}
