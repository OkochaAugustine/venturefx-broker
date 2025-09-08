// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// ✅ Only connect if URI exists
if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
      client = new MongoClient(uri, options)
      ;(global as any)._mongoClientPromise = client.connect()
    }
    clientPromise = (global as any)._mongoClientPromise
  } else {
    clientPromise = new MongoClient(uri, options).connect()
  }
} else {
  clientPromise = Promise.reject("⚠️ No MONGODB_URI set")
}

export default clientPromise


