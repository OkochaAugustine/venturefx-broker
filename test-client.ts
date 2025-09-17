// test-client.ts
// ✅ Test MongoDB connection using CommonJS for ts-node

const clientPromise = require("./lib/mongodb").default;

async function testMongoClient() {
  try {
    // Wait for MongoClient from lib/mongodb
    const client = await clientPromise;
    console.log("✅ MongoClient is ready!");

    // Access the database
    const db = client.db("venturefx");

    // List all collections
    const collections = await db.collections();
    console.log("Collections:");
    collections.forEach((c: { collectionName: string }) => console.log("-", c.collectionName));

    // Close the client
    await client.close();
    process.exit(0);
  } catch (err: any) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

// Run the test
testMongoClient();


