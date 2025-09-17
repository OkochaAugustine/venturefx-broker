import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
  try {
    const { paymentId, admin } = await req.json()
    const client = await clientPromise
    const db = client.db("venturefx")

    // 1. Find the payment
    const payment = await db.collection("payments").findOne({ _id: new ObjectId(paymentId) })
    if (!payment) {
      return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 })
    }

    if (payment.status === "validated") {
      return NextResponse.json({ success: false, error: "Already validated" }, { status: 400 })
    }

    // 2. Update the payment record
    await db.collection("payments").updateOne(
      { _id: new ObjectId(paymentId) },
      {
        $set: {
          status: "validated",
          validatedBy: {
            name: admin.name,
            email: admin.email,
          },
          validatedAt: new Date(),
        },
      }
    )

    // 3. Update the user balance
    await db.collection("users").updateOne(
      { _id: new ObjectId(payment.userId) },  // 👈 make sure userId is stored as ObjectId
      {
        $inc: { balance: payment.amount, activeDeposit: payment.amount },
      }
    )

    return NextResponse.json({ success: true, message: "Payment validated and user balance updated" })
  } catch (error: any) {
    console.error("Validation error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
