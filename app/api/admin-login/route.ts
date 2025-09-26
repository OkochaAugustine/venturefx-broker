import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("venturefx");
    const adminsCollection = db.collection("admins");

    const admin = await adminsCollection.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin) {
      return NextResponse.json({ message: "Admin not found." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // ✅ Ensure JWT_SECRET exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET is not set in environment variables.");
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }

    // ✅ Generate JWT
    const token = await new SignJWT({
      adminId: admin._id.toString(),
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    // ✅ Build response & set cookie
    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      adminId: admin._id.toString(),
      fullname: admin.fullname || "",
    });

    res.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: true,          // Always enforce HTTPS cookies
      sameSite: "strict",    // Better CSRF protection
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("❌ Admin login error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
