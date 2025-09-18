import jwt from "jsonwebtoken";
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

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
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
