import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { withAdmin } from "@/lib/handlers";

export const runtime = "nodejs";

const handler = withAdmin(async ({ req }: { req: NextRequest }) => {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  // GET all bookings or single booking by id
  if (req.method === "GET") {
    if (id) {
      const booking = await Booking.findById(id);
      if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(booking);
    }
    const list = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
});

export { handler as GET };
