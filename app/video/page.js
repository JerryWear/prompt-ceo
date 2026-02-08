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

  // Optional: enforce token intended for this app
  if (payload.app && payload.app !== "video") redirect("/");

  return (
    <ClientShell
      membership={{
        customerId: payload.sub,
      }}
    />
  );
}
