import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("venturefx")

    const { balance, paymentStatus } = await req.json()

    const updateData: any = {}
    if (balance !== undefined) updateData.balance = balance
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus

    await db.collection("users").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    )

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 })
  }
}
