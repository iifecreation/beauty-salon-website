// app/api/courses/route.ts
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { withAdmin } from "@/lib/handlers";
import { NextResponse } from "next/server";
import { courseSchema } from "@/lib/schemas";

const handler = withAdmin(async ({ req }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (req.method === "GET") {
    if (id) {
      const course = await Course.findById(id);
      if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(course);
    }
    const list = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const parsed = courseSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const newCourse = await Course.create(parsed.data);
    return NextResponse.json(newCourse, { status: 201 });
  }

  if (req.method === "PUT") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    const parsed = courseSchema.partial().safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const updated = await Course.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  }

  if (req.method === "DELETE") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await Course.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
