// app/api/verify/route.ts
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("venturefx")
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    await usersCollection.updateOne(
      { email: email.toLowerCase() },
      { $set: { verified: true } }
    )

    return NextResponse.json(
      { message: "User marked as verified successfully!" },
      { status: 200 }
    )
  } catch (err) {
    console.error("Verification error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
