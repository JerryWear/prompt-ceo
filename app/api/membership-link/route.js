import { NextResponse } from "next/server";
import { signMembershipToken } from "../../../lib/membershipLink";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = new Set([
  "https://atozbodydesign.com",
  "https://www.atozbodydesign.com",
]);

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://atozbodydesign.com";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "";
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req) {
  const origin = req.headers.get("origin") || "";
  const headers = corsHeaders(origin);

  try {
    const body = await req.json();
    const customerId = body?.customerId;
    const app = String(body?.app || "").toLowerCase().trim(); // "photo" or "video"

    if (!customerId) {
      return NextResponse.json({ ok: false, error: "Missing customerId" }, { status: 400, headers });
    }
    if (app !== "photo" && app !== "video") {
      return NextResponse.json({ ok: false, error: "Bad app" }, { status: 400, headers });
    }

    const secret = process.env.MEMBERSHIP_LINK_SECRET;
    if (!secret) {
      return NextResponse.json({ ok: false, error: "Missing MEMBERSHIP_LINK_SECRET" }, { status: 500, headers });
    }

    // Signed token identifies the user + app, but DOES NOT enforce tiers
    const token = signMembershipToken(
      { sub: String(customerId), app },
      secret
    );

    const base = (process.env.APP_URL || "https://prompt-ceo.vercel.app").replace(/\/$/, "");
    const path = app === "video" ? "/video" : "/prompt-v2";
    const url = `${base}${path}?ml=${encodeURIComponent(token)}`;

    return NextResponse.json({ ok: true, url }, { status: 200, headers });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400, headers });
  }
}
