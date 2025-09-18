import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { withAdmin } from "@/lib/handlers";
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/schemas";

const handler = withAdmin(async ({ req }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (req.method === "GET") {
    if (id) {
      const product = await Product.findById(id);
      if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(product);
    }
    const list = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const newProduct = await Product.create(parsed.data);
    return NextResponse.json(newProduct, { status: 201 });
  }

  if (req.method === "PUT") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    const parsed = productSchema.partial().safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const updated = await Product.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  }

  if (req.method === "DELETE") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
