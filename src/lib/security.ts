import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import validator from "validator";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1d";
if (!JWT_SECRET) throw new Error("JWT_SECRET is required");

// Hash password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export type TokenPayload = JwtPayload & { id?: string; role?: string };

export function signToken(payload: unknown) {
  // jwt.sign typing can be strict about the payload/secret types; cast to any to keep runtime behavior.
  return jwt.sign(payload as any, JWT_SECRET as any, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // jwt.verify can return a string or an object (JwtPayload). We only support object payloads here.
    if (typeof decoded === "string") return null;
    return decoded as TokenPayload;
  } catch (err) {
    return null;
  }
}

// sanitize input (remove $ and . keys)
export function sanitizeBody<T extends object>(body: T): T {
  return sanitize(body) as T;
}

// sanitize plain strings
export function cleanString(s?: string) {
  if (!s) return "";
  let out = validator.stripLow(String(s), true);
  out = validator.escape(out);
  return out;
}

/* SIMPLE in-memory rate limiter (per IP). Replace with Redis-backed limiter in prod. */
const RATE_LIMIT = { windowMs: 60_000, max: 60 }; // 60 req per minute
const ipMap = new Map<string, { count: number; ts: number }>();
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipMap.get(ip);
  if (!rec || now - rec.ts > RATE_LIMIT.windowMs) {
    ipMap.set(ip, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= RATE_LIMIT.max) return false;
  rec.count += 1;
  return true;
}
