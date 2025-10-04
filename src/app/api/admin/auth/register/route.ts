
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, sanitizeBody, cleanString } from "@/lib/security";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

export async function POST(req: Request) {
  // simple rate limiting could be checked here
  await dbConnect();
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const data = sanitizeBody(parsed.data);
  const email = cleanString(data.email);

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const hashed = await hashPassword(data.password);
  const user = await User.create({ email, password: hashed, name: data.name, role: "admin" });

  return NextResponse.json({ id: user._id, email: user.email, name: user.name }, { status: 201 });
}
