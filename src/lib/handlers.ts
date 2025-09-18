// lib/handlers.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "./auth";
import { sanitizeBody, checkRateLimit } from "./security";

export function withAdmin(handler: (args: { req: Request; user: any }) => Promise<Response | NextResponse>) {
  return async function (req: Request) {
    // Rate limit
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.res as NextResponse;

    // sanitize json body if present
    let sanitizedBody: any = undefined;
    try {
      if (["POST", "PUT", "PATCH"].includes(req.method)) {
        const body = await req.json();
        sanitizedBody = sanitizeBody(body);
        // re-create a Request with sanitized body so handler can still parse if desired
        const sanitizedReq = new Request(req.url, { method: req.method, headers: req.headers, body: JSON.stringify(sanitizedBody) });
        return (await handler({ req: sanitizedReq, user: auth.user })) || NextResponse.json({}, { status: 204 });
      }
    } catch (err) {
      // no body
    }

    return (await handler({ req, user: auth.user })) || NextResponse.json({}, { status: 204 });
  };
}
