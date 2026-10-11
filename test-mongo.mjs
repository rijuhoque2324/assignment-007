
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  console.log("MongoDB Connected Successfully!");
} catch (error) {
  console.error("MongoDB Error:", error);
} finally {
  await client.close();
}
