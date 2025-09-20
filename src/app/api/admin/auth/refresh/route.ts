import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken, signToken } from "@/lib/security";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";


export async function POST() {
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Missing refresh token" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await User.findById(payload.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newAccessToken = signToken({ id: user._id, role: user.role });

  return NextResponse.json({ accessToken: newAccessToken });
}
