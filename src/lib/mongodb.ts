import mongoose from "mongoose";
import { seedDefaultAdmin } from "./seedAdmin";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "makeup_app", // database name
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  // await seedDefaultAdmin();
  return cached.conn;
}

export default dbConnect;


// 1aCEiuhPENyOIlBO 
// ifenowoifesegun