import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ✅ IMPORTANT: do NOT throw at import-time
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null; // don't crash build
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

export async function POST(req) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  // ...your checkout logic here (create session etc)
  return NextResponse.json({ ok: true });
}

export function GET() {
  return new Response("Checkout route alive", { status: 200 });
}
