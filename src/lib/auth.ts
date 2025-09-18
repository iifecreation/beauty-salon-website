// lib/auth.ts
import { NextResponse } from "next/server";
import dbConnect from "./mongodb";
import User from "@/models/User";
import { verifyToken } from "./security";

export async function getTokenFromHeader(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const parts = auth.split(" ");
  if (parts.length !== 2) return null;
  const scheme = parts[0].toLowerCase();
  if (scheme !== "bearer") return null;
  return parts[1];
}

export async function requireAdmin(req: Request) {
  const token = await getTokenFromHeader(req);
  if (!token) return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const payload = verifyToken(token as string) as any;
  if (!payload?.id) return { ok: false, res: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };

  await dbConnect();
  const user = await User.findById(payload.id).select("-password").lean();
  if (!user) return { ok: false, res: NextResponse.json({ error: "User not found" }, { status: 401 }) };
  if (user.role !== "admin") return { ok: false, res: NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 }) };

  return { ok: true, user };
}
