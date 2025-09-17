import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
  try {
    const { userId, amount, currency, adminId } = await req.json()
    const client = await clientPromise
    const db = client.db("venturefx")

    // ✅ Update user's balance
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { balance: amount } }
    )

    // ✅ Insert into payments history
    await db.collection("payments").insertOne({
      userId: new ObjectId(userId),
      amount,
      currency,
      status: "validated",
      createdAt: new Date(),
      validatedBy: adminId || "manual",
      validatedAt: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
