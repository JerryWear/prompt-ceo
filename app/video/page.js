// app/video/page.js
import { redirect } from "next/navigation";
import { verifyMembershipToken } from "../../lib/membershipLink";
import VideoPromptBuilder from "./page.client";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  const payload = verifyMembershipToken(token, secret);

  // Must have valid token + video access
  if (!payload || !payload.apps?.includes("video")) {
    redirect("/");
  }

  return (
    <VideoPromptBuilder
      membership={{ tier: payload.tier, customerId: payload.sub }}
    />
  );
}
