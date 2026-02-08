// app/prompt-v2/page.js
import PromptV2Page from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  if (!token) redirect("/");

  const payload = verifyMembershipToken(token, secret);
  if (!payload) redirect("/");

  // Make apps check bulletproof (array OR string OR missing)
  const appsRaw = payload.apps;
  const apps = Array.isArray(appsRaw)
    ? appsRaw
    : typeof appsRaw === "string"
      ? [appsRaw]
      : [];

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
