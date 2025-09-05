// app/api/register/route.ts
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"   // ✅ fixed import
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, fullname, email, phone, password, country, referralId } = body

    // ✅ Normalize inputs
    const normalizedEmail = email?.trim().toLowerCase()
    const normalizedUsername = username?.trim().toLowerCase()

    if (!normalizedUsername || !fullname || !normalizedEmail || !phone || !password || !country) {
      return NextResponse.json(
        { message: "All required fields must be filled." },
        { status: 400 }
      )
    }

    // ✅ Connect to DB
    const client = await clientPromise
    const db = client.db("venturefx") // this must match your Compass DB
    const usersCollection = db.collection("users")

    // ✅ Check if user exists (by email or username)
    const exists = await usersCollection.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    })

    if (exists) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      )
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Save new user
    const newUser = {
      username: normalizedUsername,
      fullname,
      email: normalizedEmail,
      phone: phone.trim(),
      password: hashedPassword,
      country,
      referralId,
      verified: true, // auto-verified
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)

    return NextResponse.json(
      {
        message: "Registration successful! Your account is now active.",
        user: {
          username: newUser.username,
          fullname: newUser.fullname,
          email: newUser.email,
          phone: newUser.phone,
          country: newUser.country,
          referralId: newUser.referralId,
          verified: newUser.verified,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

