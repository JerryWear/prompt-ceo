import dynamic from "next/dynamic";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// IMPORTANT: dynamic client-only import
const PromptV2Page = dynamic(() => import("./page.client"), {
  ssr: false,
});

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  if (!token) redirect("/");

  let payload;
  try {
    payload = verifyMembershipToken(token, secret);
  } catch {
    redirect("/");
  }

  if (!payload) redirect("/");

  const apps = Array.isArray(payload.apps)
    ? payload.apps
    : [payload.apps];

  if (!apps.includes("photo") && !apps.includes("prompt-v2")) {
    redirect("/");
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
