import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { withAdmin } from "@/lib/handlers";

export const runtime = "nodejs";

const handler = withAdmin(async ({ req }: { req: NextRequest }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  // GET all students or single student by id
  if (req.method === "GET") {
    if (id) {
      const student = await Student.findById(id);
      if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(student);
    }
    const list = await Student.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET };
