import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPassword, signToken, sanitizeBody, cleanString } from "@/lib/security";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const data = sanitizeBody(parsed.data);
  const email = cleanString(data.email);

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const good = await verifyPassword(data.password, user.password);
  if (!good) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id, role: user.role });

  // Option A: return token in JSON (client stores securely)
  // Option B (recommended for web apps): set HttpOnly cookie with token (you can implement that here)
  return NextResponse.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}
