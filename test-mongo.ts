// test-mongo.ts
// @ts-ignore (to silence TS complaining about require)
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://okochaaugustine158_db_user:kweFgRk8HCi8Vdwg@cluster0.v7onr8l.mongodb.net/venturefx?retryWrites=true&w=majority&authSource=admin";

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ MongoDB connection successful!");

    const db = client.db("venturefx");
    const collections = await db.collections();

    console.log(
      "Collections:",
      collections.map((col:any) => col.collectionName)
    );

    await client.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

testConnection();

