import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    // Basic server-side validation
    if (!data.name || !data.email || !data.service || !data.bookingDate) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    // Optionally: check for duplicate booking, etc.
    const booking = await Booking.create({
      ...data,
      status: "Pending"
    });

    // Send confirmation email to user
    try {
      await sendConfirmationEmail({
        to: data.email,
        name: data.name,
        inquiryType: 'service',
        serviceType: data.service,
        message: `You have successfully booked the service: ${data.service} on ${data.bookingDate}.\n\nThank you for choosing Beauty Best!`,
      });
    } catch (e) {
      // Optionally log email error, but don't block booking
      console.error('Failed to send booking confirmation email:', e);
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data or server error." }, { status: 400 });
  }
}
