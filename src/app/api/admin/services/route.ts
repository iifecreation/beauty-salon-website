import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { withAdmin } from "@/lib/handlers";
import { NextResponse } from "next/server";
import { serviceSchema } from "@/lib/schemas";

const handler = withAdmin(async ({ req }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (req.method === "GET") {
    if (id) {
      const service = await Service.findById(id);
      if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(service);
    }
    const list = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const newService = await Service.create(parsed.data);
    return NextResponse.json(newService, { status: 201 });
  }

  if (req.method === "PUT") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    const parsed = serviceSchema.partial().safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const updated = await Service.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  }

  if (req.method === "DELETE") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
