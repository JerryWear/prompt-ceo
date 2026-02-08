// app/prompt-v2/page.js
import PromptV2Page from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  // Must arrive with a token
  if (!token) redirect("/");

  const payload = verifyMembershipToken(token, secret);

  // Token must verify
  if (!payload) redirect("/");

  // Accept both naming schemes: "photo" (old) and "prompt-v2" (new)
  const apps = payload.apps || [];
  const canUsePhoto = apps.includes("photo") || apps.includes("prompt-v2");

  if (!canUsePhoto) redirect("/");

  return (
    <PromptV2Page
      membership={{
        tier: payload.tier,
        customerId: payload.sub,
      }}
    />
  );
}
