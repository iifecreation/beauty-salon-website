import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
	await dbConnect();
	const { searchParams } = new URL(req.url);
	const limitParam = searchParams.get("limit");
	let query = Course.find({ status: "active" }).sort({ createdAt: -1 });
	if (limitParam) {
		const limit = parseInt(limitParam, 10);
		if (!isNaN(limit) && limit > 0) {
			query = query.limit(limit);
		}
	}
	const courses = await query;
	return NextResponse.json(courses);
}
