// app/prompt-v2/page.js
import { redirect } from "next/navigation";
import PromptV2Page from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  const payload = verifyMembershipToken(token, secret);

  // Photo app = "photo" permission
  if (!payload || !payload.apps?.includes("photo")) {
    redirect("/");
  }

  // Pass info to client if you want (optional)
  return <PromptV2Page membership={{ tier: payload.tier, customerId: payload.sub }} />;
}
