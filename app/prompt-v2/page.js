// app/prompt-v2/page.js
import PromptV2Page from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const tokenFromQuery = searchParams?.ml;
  const tokenFromCookie = cookies().get("ml")?.value;

  const token = tokenFromQuery || tokenFromCookie;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  if (!token) {
    redirect("/?mh=1&reason=no_token");
  }

  const payload = verifyMembershipToken(token, secret);

  if (!payload) {
    redirect("/?mh=1&reason=bad_token");
  }

  const appsRaw = payload.apps;
  const apps = Array.isArray(appsRaw)
    ? appsRaw
    : typeof appsRaw === "string"
      ? [appsRaw]
      : [];

  const canUsePhoto = apps.includes("photo") || apps.includes("prompt-v2");

  if (!canUsePhoto) {
    redirect("/?mh=1&reason=no_photo_access");
  }

  return (
    <PromptV2Page
      membership={{
        tier: payload.tier,
        customerId: payload.sub,
      }}
    />
  );
}
