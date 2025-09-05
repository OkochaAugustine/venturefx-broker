// lib/mongodb.ts
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ Please add MONGODB_URI to your .env.local file")
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// ✅ Ensure we reuse client across hot reloads in dev
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  // In production always create a new client
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise


