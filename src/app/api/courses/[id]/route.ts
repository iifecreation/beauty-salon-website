import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing course id" }, { status: 400 });
  }
  try {
    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: "Invalid course id" }, { status: 400 });
  }
}
