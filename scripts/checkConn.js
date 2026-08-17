const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Please set MONGODB_URI environment variable before running this script.");
  process.exit(1);
}

async function run() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const res = await client.db(process.env.MONGODB_DB || undefined).admin().ping();
    console.log("Ping result:", res);
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
}

run();
