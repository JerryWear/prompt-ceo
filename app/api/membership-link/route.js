// app/api/membership-link/route.js
import { NextResponse } from "next/server";
import {
  tierFromTags,
  appsForTier,
  signMembershipToken,
} from "../../../lib/membershipLink";

export const runtime = "nodejs";

// ✅ CHANGE THIS to your Shopify domain (important)
const ALLOWED_ORIGIN = "https://atozbodydesign.com";

function corsHeaders(origin) {
  const allowOrigin = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// Preflight
export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "";
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req) {
  const origin = req.headers.get("origin") || "";

  try {
    const { customerId, tags = [], app } = await req.json();

    const tier = tierFromTags(tags);
    const allowedApps = appsForTier(tier);

    const ok = Boolean(tier) && allowedApps.includes(app);

    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Access denied" },
        { status: 403, headers: corsHeaders(origin) }
      );
    }

    const token = signMembershipToken(
      {
        sub: String(customerId),
        tier,
        apps: allowedApps,
      },
      process.env.MEMBERSHIP_LINK_SECRET
    );

    const base = (process.env.APP_URL || "https://prompt-ceo.vercel.app").replace(/\/$/, "");
    const path = app === "video" ? "/video" : "/prompt-v2";
    const url = `${base}${path}?ml=${token}`;

    return NextResponse.json(
      { ok: true, tier, allowedApps, url },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400, headers: corsHeaders(origin) }
    );
  }
}
