import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "./auth";
import { sanitizeBody, checkRateLimit } from "./security";

export function withAdmin(handler: (args: { req: NextRequest; user: any }) => Promise<Response | NextResponse>) {
  return async function (req: NextRequest) {
    // Rate limit
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.res as NextResponse;

    // 🛑 Skip JSON parsing for multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    if (["POST", "PUT", "PATCH"].includes(req.method) && !contentType.includes("multipart/form-data")) {
      try {
        const body = await req.json();
        const sanitizedBody = sanitizeBody(body);
        const sanitizedReq = new NextRequest(req.url, {
          method: req.method,
          headers: req.headers,
          body: JSON.stringify(sanitizedBody),
        });
        return (await handler({ req: sanitizedReq, user: auth.user })) || NextResponse.json({}, { status: 204 });
      } catch (err) {
        // Ignore if body cannot be parsed
      }
    }

    return (await handler({ req, user: auth.user })) || NextResponse.json({}, { status: 204 });
  };
}
