export const metadata = {
  title: 'Data Deletion — PromptCEO',
  description: 'How to request deletion of your PromptCEO data',
}

export default function DataDeletionPage() {
  return (
    <div style={{
      maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#e8e4dc', background: '#040404', minHeight: '100vh',
      lineHeight: 1.7, fontSize: 15,
    }}>
      <div style={{ marginBottom: 48 }}>
        <a href="/" style={{ color: '#c8a84b', textDecoration: 'none', fontSize: 13, letterSpacing: 1 }}>← PROMPT CEO</a>
      </div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e8e4dc', marginBottom: 8 }}>Data Deletion</h1>
      <p style={{ color: '#6e6a66', marginBottom: 48, fontSize: 13 }}>Last updated: May 2026</p>

      <Section title="How to Delete Your Data">
        You have the right to request deletion of your personal data held by PromptCEO at any time. This includes data collected through our Service, as well as any data obtained through connected social media accounts such as Instagram and TikTok.
      </Section>

      <Section title="What Gets Deleted">
        When you request full account deletion, we permanently remove:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>Your account credentials and profile information</li>
          <li>All generated content, prompts, and project data</li>
          <li>Your Instagram and TikTok access tokens and connection data</li>
          <li>Your subscription and payment history (billing records are retained for legal compliance for 7 years)</li>
          <li>All usage logs associated with your account</li>
          <li>Any scheduled or published post records</li>
        </ul>
        Deletion is permanent and cannot be undone. We complete deletion within <strong style={{ color: '#e8e4dc' }}>30 days</strong> of receiving your request.
      </Section>

      <Section title="How to Submit a Deletion Request">
        You can request deletion of your data using any of the following methods:

        <div style={{
          background: '#0d0d0d', border: '1px solid #2a2622', borderRadius: 8,
          padding: '24px 28px', marginTop: 16, marginBottom: 16,
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#c8a84b', fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 6 }}>OPTION 1 — EMAIL REQUEST</div>
            <div>Send an email to <a href="mailto:support@promptceo.io" style={{ color: '#c8a84b' }}>support@promptceo.io</a> with the subject line <strong style={{ color: '#e8e4dc' }}>"Data Deletion Request"</strong>. Include the email address associated with your account. We will confirm receipt within 5 business days and complete deletion within 30 days.</div>
          </div>
          <div>
            <div style={{ color: '#c8a84b', fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 6 }}>OPTION 2 — ACCOUNT SETTINGS</div>
            <div>If you have an active account, you can delete it directly from your account settings page. Log in, navigate to Settings → Account → Delete Account. This will immediately begin the deletion process.</div>
          </div>
        </div>
      </Section>

      <Section title="Disconnecting Social Media Without Full Deletion">
        If you only want to remove your Instagram or TikTok connection (without deleting your entire account), you can do so without submitting a deletion request:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li><strong style={{ color: '#e8e4dc' }}>From PromptCEO:</strong> Go to Settings → Integrations → Disconnect [platform]</li>
          <li><strong style={{ color: '#e8e4dc' }}>From Instagram:</strong> Go to Instagram Settings → Security → Apps and Websites → Remove PromptCEO</li>
          <li><strong style={{ color: '#e8e4dc' }}>From TikTok:</strong> Go to TikTok Settings → Security → Authorised Apps → Revoke PromptCEO</li>
        </ul>
        Disconnecting revokes our API access immediately and we delete the stored tokens within 30 days.
      </Section>

      <Section title="Meta / Facebook Data">
        If you connected your Instagram account through Meta's login flow, you can also use Meta's own data deletion tools:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>Visit your <a href="https://www.facebook.com/settings?tab=applications" style={{ color: '#c8a84b' }} target="_blank" rel="noopener noreferrer">Facebook App Settings</a> to remove PromptCEO</li>
          <li>Removing the app from your Facebook/Meta settings will revoke our access token</li>
          <li>To also delete the data we've stored on our servers, please send us an email at <a href="mailto:support@promptceo.io" style={{ color: '#c8a84b' }}>support@promptceo.io</a></li>
        </ul>
      </Section>

      <Section title="Contact">
        For any questions about data deletion or to submit a request:
        <div style={{ marginTop: 8 }}>
          <strong style={{ color: '#e8e4dc' }}>PromptCEO</strong><br />
          <a href="mailto:support@promptceo.io" style={{ color: '#c8a84b' }}>support@promptceo.io</a><br />
          <a href="https://promptceo.io" style={{ color: '#c8a84b' }}>https://promptceo.io</a>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e8e4dc', marginBottom: 12 }}>{title}</h2>
      <div style={{ color: '#b0aba4', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
