// app/prompt-v2/page.js
import PromptV2Page from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function getMlFromHeaders() {
  try {
    const h = headers();
    // In Next.js, this header usually contains the full path + query
    const rawUrl = h.get("x-url") || h.get("referer") || "";
    if (!rawUrl) return null;

    const u = new URL(rawUrl, "https://prompt-ceo.vercel.app");
    return u.searchParams.get("ml");
  } catch {
    return null;
  }
}

export default async function Page({ searchParams }) {
  const token =
    searchParams?.ml ||
    getMlFromHeaders();

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
