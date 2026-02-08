// app/api/membership-link/route.js
import { NextResponse } from "next/server";
import {
  tierFromTags,
  appsForTier,
  signMembershipToken,
} from "../../../../lib/membershipLink";

export const runtime = "nodejs";

// Map logical app names -> your real routes
const APP_PATH = {
  photo: "/prompt-v2",
  video: "/video",
};

export async function POST(req) {
  try {
    const secret = process.env.MEMBERSHIP_LINK_SECRET;
    const appUrl = process.env.APP_URL; // e.g. https://prompt-ceo.vercel.app

    if (!secret) {
      return NextResponse.json(
        { error: "Missing MEMBERSHIP_LINK_SECRET" },
        { status: 500 }
      );
    }
    if (!appUrl) {
      return NextResponse.json(
        { error: "Missing APP_URL (absolute base URL of your Vercel app)" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const customerId = body?.customerId;
    const tags = body?.tags || [];
    const app = String(body?.app || "").toLowerCase(); // "photo" | "video"

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }
    if (!Array.isArray(tags)) {
      return NextResponse.json({ error: "tags must be an array" }, { status: 400 });
    }
    if (app !== "photo" && app !== "video") {
      return NextResponse.json(
        { error: "app must be 'photo' or 'video'" },
        { status: 400 }
      );
    }

    const tier = tierFromTags(tags);
    if (!tier) {
      return NextResponse.json(
        { error: "No membership tag found (member_basic, member_pro, member_elite)" },
        { status: 403 }
      );
    }

    const allowedApps = appsForTier(tier);
    if (!allowedApps.includes(app)) {
      return NextResponse.json(
        { error: `Tier ${tier} does not include ${app}` },
        { status: 403 }
      );
    }

    const token = signMembershipToken({
      secret,
      customerId: String(customerId),
      tier,
      apps: allowedApps,
      expiresInSeconds: 60 * 30, // 30 min
    });

    const path = APP_PATH[app];
    const url = `${appUrl}${path}?ml=${encodeURIComponent(token)}`;

    return NextResponse.json({
      ok: true,
      tier,
      allowedApps,
      url,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}
