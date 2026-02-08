// lib/membershipLink.js
import crypto from "crypto";

function base64urlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecodeToString(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, "base64").toString("utf8");
}

function hmacSHA256Base64url(secret, dataB64url) {
  const sig = crypto.createHmac("sha256", secret).update(dataB64url).digest();
  return base64urlEncode(sig);
}

function timingSafeEqualStr(a, b) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function tierFromTags(tags = []) {
  const set = new Set((tags || []).map((t) => String(t).toLowerCase().trim()));
  if (set.has("member_elite")) return "ELITE";
  if (set.has("member_pro")) return "PRO";
  if (set.has("member_basic")) return "BASIC";
  return null;
}

export function appsForTier(tier) {
  switch (tier) {
    case "BASIC":
      return ["photo"]; // prompt-v2
    case "PRO":
      return ["photo", "video"];
    case "ELITE":
      return ["photo", "video"];
    default:
      return [];
  }
}

export function signMembershipToken({
  secret,
  customerId,
  tier,
  apps,
  expiresInSeconds = 60 * 30,
}) {
  if (!secret) throw new Error("Missing MEMBERSHIP_LINK_SECRET");
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    v: 1,
    sub: String(customerId || ""),
    tier,
    apps,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64urlEncode(payloadJson);
  const sigB64 = hmacSHA256Base64url(secret, payloadB64);
  return `${payloadB64}.${sigB64}`;
}

export function verifyMembershipToken(token, secret) {
  try {
    if (!secret) return null;
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payloadB64, sigB64] = parts;

    const expectedSig = hmacSHA256Base64url(secret, payloadB64);
    if (!timingSafeEqualStr(sigB64, expectedSig)) return null;

    const payloadStr = base64urlDecodeToString(payloadB64);
    const payload = JSON.parse(payloadStr);

    const now = Math.floor(Date.now() / 1000);
    if (!payload?.exp || now > payload.exp) return null;

    if (payload.v !== 1) return null;
    if (!Array.isArray(payload.apps)) return null;

    return payload;
  } catch {
    return null;
  }
}
