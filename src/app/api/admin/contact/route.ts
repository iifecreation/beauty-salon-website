
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { withAdmin } from "@/lib/handlers";

export const runtime = "nodejs";

const handler = withAdmin(async ({ req }) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  await dbConnect();
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  return NextResponse.json(contacts);
});

export { handler as GET };
