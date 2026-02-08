// lib/membershipLink.js
import crypto from "crypto";

export function tierFromTags(tags = []) {
  const set = new Set((tags || []).map((t) => String(t).toLowerCase()));
  if (set.has("member_elite")) return "ELITE";
  if (set.has("member_pro")) return "PRO";
  if (set.has("member_basic")) return "BASIC";
  return null;
}

export function appsForTier(tier) {
  if (tier === "ELITE") return ["photo", "video"];
  if (tier === "PRO") return ["photo", "video"];
  if (tier === "BASIC") return ["photo"];
  return [];
}

function base64url(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function signMembershipToken(payload, secret) {
  if (!secret) throw new Error("MEMBERSHIP_LINK_SECRET is missing");

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 30 * 60; // 30 minutes

  const body = {
    v: 1,
    ...payload,
    iat: now,
    exp,
  };

  const header = { alg: "HS256", typ: "JWT" };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(body));
  const data = `${encodedHeader}.${encodedPayload}`;

  const sig = crypto.createHmac("sha256", secret).update(data).digest();
  const encodedSig = base64url(sig);

  return `${data}.${encodedSig}`;
}

export function verifyMembershipToken(token, secret) {
  if (!token) return { ok: false, reason: "missing" };
  if (!secret) return { ok: false, reason: "missing_secret" };

  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "malformed" };

  const [h, p, s] = parts;
  const data = `${h}.${p}`;
  const expected = base64url(crypto.createHmac("sha256", secret).update(data).digest());

  if (s !== expected) return { ok: false, reason: "bad_signature" };

  const payloadJson = Buffer.from(p.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  const payload = JSON.parse(payloadJson);

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp) return { ok: false, reason: "expired" };

  return { ok: true, payload };
}
