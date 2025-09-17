import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ---------------- GET ----------------
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 params is a Promise
) {
  try {
    const { id } = await context.params; // 👈 await it
    console.log("🔍 GET fetching user with ID:", id);

    if (!id || !ObjectId.isValid(id)) {
      console.error("❌ GET: Invalid or missing ID");
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
  } catch (err) {
    console.error("❌ GET /api/users/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ---------------- PUT ----------------
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 await it
    const body = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      console.error("❌ PUT: Invalid or missing ID");
      return NextResponse.json(
        { success: false, message: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("venturefx");

    const updateData: any = {};
    if (body.balance !== undefined) updateData.balance = body.balance;
    if (body.activeDeposit !== undefined) updateData.activeDeposit = body.activeDeposit;
    if (body.earnedProfit !== undefined) updateData.earnedProfit = body.earnedProfit;

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    console.log("✅ PUT updated user:", id, result);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ PUT /api/users/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

