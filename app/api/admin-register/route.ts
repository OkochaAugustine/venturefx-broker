// app/api/admin-register/route.ts
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

const ALLOWED_EMAILS = ["admin1@venturefx.com", "admin2@venturefx.com"] // ✅ Only these emails allowed

export async function POST(req: Request) {
  try {
    const { email, password, fullname } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Check if email is allowed
    if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
      return NextResponse.json(
        { message: "This email is not allowed to register as admin." },
        { status: 403 }
      )
    }

    const client = await clientPromise
    const db = client.db("venturefx")
    const adminsCollection = db.collection("admins")

    // Check if admin already exists
    const existing = await adminsCollection.findOne({ email: normalizedEmail })
    if (existing) {
      return NextResponse.json({ message: "Admin already exists." }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save new admin
    await adminsCollection.insertOne({
      email: normalizedEmail,
      password: hashedPassword,
      fullname: fullname || "",
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "Admin registered successfully!" }, { status: 201 })
  } catch (error) {
    console.error("Admin register error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
