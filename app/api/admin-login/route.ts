// app/api/admin-login/route.ts
import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

export async function POST(req: Request) {
  try {
    // DEBUG: log the raw request body
    const bodyText = await req.text()
    console.log("Raw request body:", bodyText)

    let data
    try {
      data = JSON.parse(bodyText)
    } catch (parseErr) {
      console.error("Failed to parse JSON:", parseErr)
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
    }

    const { email, password } = data

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("venturefx")
    const adminsCollection = db.collection("admins")

    const admin = await adminsCollection.findOne({ email: email.trim().toLowerCase() })
    if (!admin) {
      return NextResponse.json({ message: "Admin not found." }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 })
    }

    const token = await new SignJWT({ adminId: admin._id.toString() })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || "secret"))

    return NextResponse.json({
      message: "Login successful",
      adminId: admin._id,
      fullname: admin.fullname,
      token,
    })
  } catch (err) {
    console.error("Admin login error:", err)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
