import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  const body = await req.text(); // raw body (required)

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Handle events
  switch (event.type) {
    case "checkout.session.completed":
      console.log("✅ Checkout completed");
      break;

    case "customer.subscription.created":
      console.log("✅ Subscription created");
      break;

    case "customer.subscription.updated":
      console.log("🔁 Subscription updated");
      break;

    case "customer.subscription.deleted":
      console.log("❌ Subscription cancelled");
      break;

    case "invoice.paid":
      console.log("✅ Invoice paid");
      break;

    case "invoice.payment_failed":
      console.log("⚠️ Invoice payment failed");
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response("OK", { status: 200 });
}

// ✅ This removes the “sometimes 405” problem (GET/HEAD checks)
export function GET() {
  return new Response("Webhook is live.", { status: 200 });
}

export function HEAD() {
  return new Response(null, { status: 200 });
}
