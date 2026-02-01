import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // ✅ Handle events you selected in Stripe
  if (event.type === "checkout.session.completed") {
    // const session = event.data.object;
    // TODO: mark user as active / store customer id etc.
  }

  if (event.type === "customer.subscription.created") {
    // const sub = event.data.object;
  }

  if (event.type === "customer.subscription.deleted") {
    // const sub = event.data.object;
  }

  // Stripe requires a 2xx response to stop retries
  return NextResponse.json({ received: true });
}
