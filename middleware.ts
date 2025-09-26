// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value; // 👈 use admin-token, not user token

  // Protect all /dashboard/admin routes
  if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (!token) {
      // No admin token → redirect to admin login
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== "admin") {
        // Logged in, but not an admin
        return NextResponse.redirect(new URL("/admin-login", req.url));
      }

      // ✅ Admin token valid
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin", "/dashboard/admin/:path*"],
};
