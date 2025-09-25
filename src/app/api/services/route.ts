import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
	await dbConnect();
	const { searchParams } = new URL(req.url);
	const limitParam = searchParams.get("limit");
	let query = Service.find({}).sort({ createdAt: -1 });
	if (limitParam) {
		const limit = parseInt(limitParam, 10);
		if (!isNaN(limit) && limit > 0) {
			query = query.limit(limit);
		}
	}
	const services = await query;
	return NextResponse.json(services);
}
