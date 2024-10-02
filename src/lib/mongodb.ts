import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_URL || "";
let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase(): Promise<MongoClient> {
  if (!client) {
    client = await clientPromise;
  }

  // Return the MongoClient instance instead of the database
  return client;
}
