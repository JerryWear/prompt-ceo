import ClientShell from "./ClientShell";
import { verifyMembershipToken } from "@/lib/membershipLink";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Page({ searchParams }) {
  const token = searchParams?.ml;
  const secret = process.env.MEMBERSHIP_LINK_SECRET;

  if (!token) redirect("/");

  let payload = null;
  try {
    payload = verifyMembershipToken(token, secret);
  } catch {
    redirect("/");
  }

  if (!payload) redirect("/");

  const appsRaw = payload.apps;
  const apps = Array.isArray(appsRaw)
    ? appsRaw
    : typeof appsRaw === "string"
      ? [appsRaw]
      : [];

  const canUsePhoto = apps.includes("photo") || apps.includes("prompt-v2");
  if (!canUsePhoto) redirect("/");

  return (
    <ClientShell
      membership={{
        tier: payload.tier,
        customerId: payload.sub,
      }}
    />
  );
}
