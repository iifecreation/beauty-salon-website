
import { NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import { sendConfirmationEmail } from '@/lib/email';

// ✅ Zod schema
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.enum(['service', 'training'], 'Must be either service or training'),
  serviceType: z.string().optional(),
});


export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    // ✅ Validate input safely
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message);
      return NextResponse.json({ success: false, error: errorMessages }, { status: 400 });
    }

    // ✅ Data is valid
    const contact = await Contact.create(result.data);

    // ✅ Send confirmation email
    await sendConfirmationEmail({
      to: result.data.email,
      name: result.data.name,
      inquiryType: result.data.inquiryType,
      serviceType: result.data.serviceType,
      message: result.data.message,
    });

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error('❌ Contact API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// Optional: Block GET requests
export function GET() {
  return NextResponse.json(
    { success: false, error: 'GET method not allowed on this endpoint.' },
    { status: 405 }
  );
}
