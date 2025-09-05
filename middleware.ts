// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")?.value

    if (!token) {
      // No token → redirect to login
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
      // ✅ Verify token with jose
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (err) {
      console.error("JWT verification failed:", err)
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

// ✅ Configure matcher for dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
}
