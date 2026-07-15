import { createHmac, scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "agrinova-dev-secret-change-me";
const USER_COOKIE = "an_session";
const ADMIN_COOKIE = "an_admin";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = scryptSync(password, salt, 64);
  return timingSafeEqual(Buffer.from(hash, "hex"), test);
}

interface SessionPayload {
  uid: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}

function sign(data: string) {
  return createHmac("sha256", SECRET).update(data).digest("hex");
}

export function createToken(payload: Omit<SessionPayload, "exp">, days = 7) {
  const body: SessionPayload = { ...payload, exp: Date.now() + days * 86400000 };
  const data = Buffer.from(JSON.stringify(body)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function readToken(token?: string): SessionPayload | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig || sign(data) !== sig) return null;
  try {
    const body = JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
    if (body.exp < Date.now()) return null;
    return body;
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return readToken(store.get(USER_COOKIE)?.value);
}

export async function getAdminSession() {
  const store = await cookies();
  const s = readToken(store.get(ADMIN_COOKIE)?.value);
  return s && s.role === "admin" ? s : null;
}

export { USER_COOKIE, ADMIN_COOKIE };
