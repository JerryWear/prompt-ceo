import VideoPromptBuilder from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  if (!token) redirect("/");

  const payload = verifyMembershipToken(token, secret);

  if (!payload) redirect("/");
  if (!payload.apps?.includes("video")) redirect("/");

  return (
    <VideoPromptBuilder
      membership={{
        tier: payload.tier,
        customerId: payload.sub,
      }}
    />
  );
}
