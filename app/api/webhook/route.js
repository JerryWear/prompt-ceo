import Stripe from "stripe";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing stripe-signature", { status: 400 });

  const body = await req.text();

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

  try {
    // ✅ Only ONE DB write for now (simple + stable)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const email =
        session.customer_details?.email || session.customer_email || null;

      if (!email) {
        console.warn("No email on checkout session");
      } else {
        await prisma.user.upsert({
          where: { email },
          create: {
            email,
            subscriptionStatus: "active",
          },
          update: {
            subscriptionStatus: "active",
          },
        });

        console.log("✅ User activated:", email);
      }
    } else {
      console.log("Unhandled event type:", event.type);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response("Server error", { status: 500 });
  }
}

// ✅ Prevent “405 Method Not Allowed” when something hits the URL with GET/HEAD
export function GET() {
  return new Response("Webhook is live.", { status: 200 });
}

export function HEAD() {
  return new Response(null, { status: 200 });
}
