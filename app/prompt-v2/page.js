// app/prompt-v2/page.js
import PromptV2Page from "./page.client";
import { verifyMembershipToken } from "@/lib/membershipLink";

export const dynamic = "force-dynamic";

export default async function Page(props) {
  // In some Next versions, search params can be props.searchParams OR props?.searchParams
  const searchParams = props?.searchParams || {};
  const token = searchParams?.ml;

  const secret = process.env.MEMBERSHIP_LINK_SECRET;
  const payload = verifyMembershipToken(token, secret);

  // TEMP DEBUG (no secrets leaked)
  if (!token) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <h2>DEBUG: Missing token</h2>
        <p>No <code>?ml=</code> token found in URL.</p>
      </div>
    );
  }

  if (!payload) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <h2>DEBUG: Invalid token</h2>
        <p>Token present but verification failed.</p>
        <p>Token length: {String(token).length}</p>
      </div>
    );
  }

  if (!payload.apps?.includes("photo")) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <h2>DEBUG: No photo access</h2>
        <p>Apps in token: {JSON.stringify(payload.apps)}</p>
        <p>Tier: {payload.tier}</p>
      </div>
    );
  }

  return <PromptV2Page membership={{ tier: payload.tier, customerId: payload.sub }} />;
}
