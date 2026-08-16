import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  // Defer throwing until runtime calls; in some environments env may be set later
  console.warn("MONGODB_URI not set");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  clientPromise = Promise.reject(new Error("MONGODB_URI is not defined"));
} else {
  client = new MongoClient(uri);
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
  }
}

export async function getDb() {
  const c = await clientPromise;
  const dbName = process.env.MONGODB_DB || undefined;
  return dbName ? c.db(dbName) : c.db();
}
