import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { sendConfirmationEmail } from "@/lib/email";

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

    // Send confirmation email to student
    try {
      await sendConfirmationEmail({
        to: data.email,
        name: data.name,
        inquiryType: 'training',
        serviceType: data.enrolledCourses && data.enrolledCourses.length > 0 ? data.enrolledCourses.join(', ') : undefined,
        message: `You have successfully registered for the course${data.enrolledCourses && data.enrolledCourses.length > 0 ? `: ${data.enrolledCourses.join(', ')}` : ''} in ${data.preferredMode} mode.\n\nThank you for choosing Beauty Kept!`,
      });
    } catch (e) {
      // Optionally log email error, but don't block registration
      console.error('Failed to send student registration confirmation email:', e);
    }

    return NextResponse.json({ success: true, student });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data or server error." }, { status: 400 });
  }
}
