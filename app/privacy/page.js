export const metadata = {
  title: 'Privacy Policy — PromptCEO',
  description: 'Privacy Policy for PromptCEO',
}

export default function PrivacyPage() {
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

      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e8e4dc', marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#6e6a66', marginBottom: 48, fontSize: 13 }}>Last updated: May 2026</p>

      <Section title="1. Introduction">
        PromptCEO ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service at promptceo.io. Please read this policy carefully. By using the Service, you agree to the practices described here.
      </Section>

      <Section title="2. Information We Collect">
        <strong style={{ color: '#e8e4dc' }}>Information you provide directly:</strong>
        <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 16 }}>
          <li>Account registration data: email address and password</li>
          <li>Profile information you choose to add</li>
          <li>Content you create using the Service (prompts, captions, campaign data)</li>
          <li>Payment information (processed by our payment provider — we do not store card details)</li>
          <li>Communications you send to us</li>
        </ul>
        <strong style={{ color: '#e8e4dc' }}>Information collected automatically:</strong>
        <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 16 }}>
          <li>Usage data: features used, pages visited, actions taken within the Service</li>
          <li>Device and browser information</li>
          <li>IP address and approximate location</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        <strong style={{ color: '#e8e4dc' }}>Information from connected social media accounts:</strong>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>When you connect your Instagram account: your Instagram username and User ID</li>
          <li>When you connect your TikTok account: your TikTok display name and Open ID</li>
          <li>OAuth access tokens required to publish content on your behalf</li>
          <li>We do NOT access your followers, direct messages, private posts, or contacts</li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        We use the information we collect to:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>Provide, operate, and maintain the Service</li>
          <li>Process your subscription and payments</li>
          <li>Publish content to your connected social media accounts at your explicit direction</li>
          <li>Send transactional emails (account confirmations, receipts, important service notices)</li>
          <li>Respond to your support requests and inquiries</li>
          <li>Improve and develop the Service based on usage patterns</li>
          <li>Comply with legal obligations</li>
          <li>Detect and prevent fraud or abuse</li>
        </ul>
        We do not sell your personal information to third parties. We do not use your social media account data for advertising, analytics resale, or any purpose beyond publishing the content you explicitly create and schedule within PromptCEO.
      </Section>

      <Section title="4. Social Media Integrations">
        <strong style={{ color: '#e8e4dc' }}>Instagram / Meta:</strong> When you connect your Instagram account, PromptCEO uses the Instagram Graph API to publish photos, videos, reels, and stories that you create and schedule within the Service. We request only the minimum permissions required: <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>instagram_basic</code>, <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>instagram_content_publish</code>, <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>pages_show_list</code>, and <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>pages_read_engagement</code>. We store your Instagram username, User ID, and access token solely to authenticate publishing requests. We do not read your inbox, access your followers' data, or analyse your existing posts.
        <br /><br />
        <strong style={{ color: '#e8e4dc' }}>TikTok:</strong> When you connect your TikTok account, PromptCEO uses the TikTok Content Posting API to upload videos you create within the Service. We request <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>user.info.basic</code>, <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>video.upload</code>, and <code style={{ background: '#111', padding: '2px 6px', borderRadius: 3, fontSize: 13 }}>video.publish</code> scopes. We store your display name, Open ID, and access token for the same purpose.
        <br /><br />
        You can disconnect either account at any time from your settings within PromptCEO or directly from the platform's own security settings. Disconnecting revokes our access and we will delete your stored tokens within 30 days.
      </Section>

      <Section title="5. Data Sharing and Disclosure">
        We share your information only in the following circumstances:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li><strong style={{ color: '#e8e4dc' }}>Service providers:</strong> Third-party vendors who help us operate the Service (cloud hosting, payment processing, email delivery). These providers access only the data necessary to perform their services and are bound by confidentiality obligations.</li>
          <li><strong style={{ color: '#e8e4dc' }}>AI API providers:</strong> Content you generate is processed by third-party AI APIs (such as OpenAI). Please review their respective privacy policies.</li>
          <li><strong style={{ color: '#e8e4dc' }}>Legal requirements:</strong> When required by law, court order, or governmental authority.</li>
          <li><strong style={{ color: '#e8e4dc' }}>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate confidentiality protections.</li>
          <li><strong style={{ color: '#e8e4dc' }}>With your consent:</strong> For any other purpose with your explicit consent.</li>
        </ul>
      </Section>

      <Section title="6. Data Retention">
        We retain your account data for as long as your account is active. Generated content and project data are retained for the duration of your subscription plus 90 days after account termination, after which they are deleted from our systems. Social media access tokens are deleted immediately upon disconnection or within 30 days of account deletion, whichever comes first.
      </Section>

      <Section title="7. Your Rights and Choices">
        Depending on your location, you may have the following rights regarding your personal data:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li><strong style={{ color: '#e8e4dc' }}>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong style={{ color: '#e8e4dc' }}>Correction:</strong> Request correction of inaccurate data</li>
          <li><strong style={{ color: '#e8e4dc' }}>Deletion:</strong> Request deletion of your personal data — see our <a href="/data-deletion" style={{ color: '#c8a84b' }}>Data Deletion page</a></li>
          <li><strong style={{ color: '#e8e4dc' }}>Portability:</strong> Request a machine-readable export of your data</li>
          <li><strong style={{ color: '#e8e4dc' }}>Objection:</strong> Object to certain types of processing</li>
          <li><strong style={{ color: '#e8e4dc' }}>Withdraw consent:</strong> Withdraw consent where processing is based on consent</li>
        </ul>
        To exercise any of these rights, contact us at <a href="mailto:support@promptceo.io" style={{ color: '#c8a84b' }}>support@promptceo.io</a>.
      </Section>

      <Section title="8. Cookies">
        PromptCEO uses cookies and similar technologies to maintain your session, remember your preferences, and understand how the Service is used. You can control cookies through your browser settings, though disabling certain cookies may affect Service functionality. We use session cookies (deleted when you close the browser) and persistent cookies (remain until expiry or deletion) for authentication and preference storage.
      </Section>

      <Section title="9. Security">
        We implement industry-standard technical and organisational measures to protect your information, including encryption in transit (TLS/HTTPS), encrypted storage of sensitive tokens, and access controls limiting who can access user data. No method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
      </Section>

      <Section title="10. Children's Privacy">
        The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us and we will take steps to delete such information.
      </Section>

      <Section title="11. Third-Party Links">
        The Service may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party services you access.
      </Section>

      <Section title="12. Changes to This Policy">
        We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice within the Service. Your continued use of the Service after changes are posted constitutes your acceptance of the updated Policy.
      </Section>

      <Section title="13. Contact Us">
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
