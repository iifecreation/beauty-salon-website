// app/api/payments/route.ts
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { withAdmin } from "@/lib/handlers";
import { paymentSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

const handler = withAdmin(async ({ req }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || process.env.ADMIN_DEFAULT_PAGE_SIZE || 50);

  if (req.method === "GET") {
    if (id) {
      const pay = await Payment.findById(id).populate("userId");
      if (!pay) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(pay);
    }
    const skip = (page - 1) * limit;
    const payments = await Payment.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Payment.countDocuments();
    return NextResponse.json({ data: payments, page, limit, total });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const parsed = paymentSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

    const created = await Payment.create(parsed.data);
    return NextResponse.json(created, { status: 201 });
  }

  if (req.method === "PUT") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    // allow only status updates via PUT for safety
    const { status } = body;
    if (!["Pending", "Success", "Failed", "Refunded"].includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    const updated = await Payment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  }

  if (req.method === "DELETE") {
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await Payment.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
