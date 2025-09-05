// app/api/login/route.ts
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("venturefx")
    const usersCollection = db.collection("users")

    const normalizedEmail = email.trim().toLowerCase()
    const user = await usersCollection.findOne({ email: normalizedEmail })
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password." }, { status: 401 })
    }

    // ✅ Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret)

    // ✅ Store JWT in HttpOnly cookie
    const response = NextResponse.json(
      { message: "Login successful!" },
      { status: 200 }
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


