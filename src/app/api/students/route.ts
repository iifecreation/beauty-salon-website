import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    // Basic server-side validation
    if (!data.name || !data.email || !data.preferredMode) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    // Check for duplicate email
    const existing = await Student.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json({ error: "A student with this email already exists." }, { status: 409 });
    }
    const student = await Student.create(data);
    return NextResponse.json({ success: true, student });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data or server error." }, { status: 400 });
  }
}
