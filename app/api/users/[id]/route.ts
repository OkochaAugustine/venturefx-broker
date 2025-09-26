import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ---------------- GET ----------------
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // ✅ no await
    console.log("🔍 GET fetching user with ID:", id);

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("venturefx");

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.error("❌ GET /api/users/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

// ---------------- PUT ----------------
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // ✅ no await
    const body = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("venturefx");

    const updateData: Record<string, any> = {};
    if (body.balance !== undefined) updateData.balance = body.balance;
    if (body.activeDeposit !== undefined) updateData.activeDeposit = body.activeDeposit;
    if (body.earnedProfit !== undefined) updateData.earnedProfit = body.earnedProfit;

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log("✅ PUT updated user:", id, result);

    return NextResponse.json(
      { success: true, updated: result.modifiedCount > 0 },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ PUT /api/users/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
