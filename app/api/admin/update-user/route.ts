import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, balance, earnedProfit, activeDeposit } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("venturefx");

    const updateData: any = {};
    if (balance !== undefined) updateData.balance = balance;
    if (earnedProfit !== undefined) updateData.earnedProfit = earnedProfit;
    if (activeDeposit !== undefined) updateData.activeDeposit = activeDeposit;

    const result = await db.collection("users").updateOne(
      { email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User updated", updateData },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ POST /api/admin/update-user error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

