import { MongoClient } from "mongodb";

// Type for the MongoDB URI
const uri: string = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Ensure we only have one instance in a Node.js environment
declare global {
  var __dbClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the instance
  if (!global.__dbClientPromise) {
    const client = new MongoClient(uri);
    global.__dbClientPromise = client.connect();
  }
  clientPromise = global.__dbClientPromise;
} else {
  // In production, create a new instance
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
