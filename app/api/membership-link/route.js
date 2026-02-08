// app/api/membership-link/route.js
import { NextResponse } from "next/server";
import { tierFromTags, appsForTier, signMembershipToken } from "../../../lib/membershipLink";

export const runtime = "nodejs";

// ✅ Shopify domains allowed to call this API
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

// Normalize app values coming from Shopify UI into what our backend expects
function normalizeApp(app) {
  const a = String(app || "").toLowerCase().trim();

  // Shopify can send "photo"
  if (a === "photo") return "prompt-v2";

  // Accept common aliases
  if (a === "prompt") return "prompt-v2";
  if (a === "prompt-v2") return "prompt-v2";

  // Video is already "video"
  if (a === "video") return "video";

  // Unknown stays unknown (will fail check)
  return a;
}

// Preflight
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
    const tags = body?.tags || body?.customerTags || [];
    const appRaw = body?.app;

    const app = normalizeApp(appRaw);

    const tier = tierFromTags(tags);
    const allowedApps = appsForTier(tier);

    // Normalize requested app
const normalizedApp =
  app === "photo" || app === "prompt-v2"
    ? "photo"
    : app;

// Normalize allowed apps
const allowedAppsNormalized = Array.isArray(allowedApps)
  ? allowedApps.map(a =>
      a === "prompt-v2" ? "photo" : a
    )
  : [];

// Final permission check
const ok =
  Boolean(tier) &&
  allowedAppsNormalized.includes(normalizedApp);

    if (!ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Access denied",
          debug: {
            origin,
            tier,
            appRaw,
            app,
            allowedApps,
          },
        },
        { status: 403, headers }
      );
    }

    const secret = process.env.MEMBERSHIP_LINK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "Server misconfigured: missing MEMBERSHIP_LINK_SECRET" },
        { status: 500, headers }
      );
    }

    const token = signMembershipToken(
      {
        sub: String(customerId || ""),
        tier,
        apps: allowedApps,
      },
      secret
    );

    const base = (process.env.APP_URL || "https://prompt-ceo.vercel.app").replace(/\/$/, "");
    const path = app === "video" ? "/video" : "/prompt-v2";
    const url = `${base}${path}?ml=${encodeURIComponent(token)}`;

    return NextResponse.json(
      { ok: true, tier, allowedApps: allowedAppsNormalized, url },
      { status: 200, headers }
    );
  } catch (e) {
    console.error("[membership-link] Bad request:", e);
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400, headers }
    );
  }
}
