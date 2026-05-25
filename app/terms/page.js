export const metadata = {
  title: 'Terms of Service — PromptCEO',
  description: 'Terms of Service for PromptCEO',
}

export default function TermsPage() {
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

      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e8e4dc', marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: '#6e6a66', marginBottom: 48, fontSize: 13 }}>Last updated: May 2026</p>

      <Section title="1. Acceptance of Terms">
        By accessing or using PromptCEO ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users, including visitors, registered users, and paying subscribers.
      </Section>

      <Section title="2. Description of Service">
        PromptCEO is an AI-powered content creation platform that enables users to generate image prompts, video prompts, advertising copy, captions, and related creative content. The Service includes Studio, Ad Studio, and associated tools. PromptCEO uses third-party AI APIs to generate content and integrates with social media platforms including Instagram and TikTok for content publishing.
      </Section>

      <Section title="3. Account Registration">
        You must create an account to use the Service. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You must be at least 18 years of age to use this Service.
      </Section>

      <Section title="4. Subscription and Payment">
        PromptCEO offers paid subscription plans. By subscribing, you agree to pay the applicable fees as described at the time of purchase. Subscriptions automatically renew unless cancelled before the renewal date. All fees are non-refundable except where required by law. We reserve the right to change pricing with reasonable notice.
      </Section>

      <Section title="5. Acceptable Use">
        You agree not to use the Service to:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>Generate content that violates any applicable law or regulation</li>
          <li>Create, distribute, or promote content that is illegal, harmful, threatening, abusive, harassing, defamatory, or obscene</li>
          <li>Generate content involving minors in any sexual or inappropriate context</li>
          <li>Infringe on the intellectual property rights of others</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
          <li>Attempt to gain unauthorised access to any part of the Service</li>
          <li>Use the Service for spam, phishing, or other deceptive practices</li>
          <li>Scrape, crawl, or otherwise extract data from the Service in an automated manner without our written permission</li>
          <li>Violate the terms of service of any third-party platforms connected to the Service, including Meta and TikTok</li>
        </ul>
      </Section>

      <Section title="6. Social Media Integration">
        PromptCEO allows users to connect their Instagram and TikTok accounts for direct content publishing. By connecting your social media accounts:
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>You authorise PromptCEO to publish content on your behalf to the connected accounts</li>
          <li>You confirm you own or have the right to publish the content being posted</li>
          <li>You agree to comply with the terms and community guidelines of the respective platforms (Meta/Instagram and TikTok)</li>
          <li>You understand that PromptCEO is not responsible for content that violates platform policies</li>
          <li>You can revoke access at any time by disconnecting your accounts from within the Service or directly from the platform's settings</li>
        </ul>
        PromptCEO uses the Instagram Graph API and TikTok Content Posting API solely to publish content you explicitly authorise. We do not read your private messages, access your followers' data, or use your account for any purpose beyond publishing the content you create within PromptCEO.
      </Section>

      <Section title="7. Intellectual Property">
        You retain ownership of the content you create using PromptCEO. By using the Service, you grant PromptCEO a limited, non-exclusive licence to process and transmit your content solely as necessary to provide the Service. The PromptCEO platform, including its code, design, branding, and AI systems, remains the exclusive property of PromptCEO. You may not reproduce, distribute, or create derivative works of the platform itself.
      </Section>

      <Section title="8. AI-Generated Content">
        Content generated by PromptCEO is produced using third-party AI models. We do not guarantee the accuracy, quality, or appropriateness of AI-generated content. You are solely responsible for reviewing, editing, and ensuring that any content you publish complies with applicable laws and platform policies. PromptCEO is not liable for any consequences arising from the use or publication of AI-generated content.
      </Section>

      <Section title="9. Privacy">
        Your use of the Service is subject to our Privacy Policy, which is incorporated into these Terms by reference. Please review our <a href="/privacy" style={{ color: '#c8a84b' }}>Privacy Policy</a> to understand our practices.
      </Section>

      <Section title="10. Termination">
        We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in conduct that we determine, in our sole discretion, is harmful to the Service, other users, or third parties. You may terminate your account at any time by contacting us. Upon termination, your right to use the Service ceases immediately.
      </Section>

      <Section title="11. Disclaimers">
        The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. PromptCEO does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy or completeness of any content generated by the Service.
      </Section>

      <Section title="12. Limitation of Liability">
        To the maximum extent permitted by law, PromptCEO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability to you for any claim arising from these Terms or your use of the Service shall not exceed the amount you paid to PromptCEO in the three months preceding the claim.
      </Section>

      <Section title="13. Changes to Terms">
        We may update these Terms from time to time. We will notify users of significant changes by email or by posting a notice on the Service. Your continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.
      </Section>

      <Section title="14. Governing Law">
        These Terms are governed by and construed in accordance with applicable laws. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the relevant courts.
      </Section>

      <Section title="15. Contact">
        If you have any questions about these Terms, please contact us at:
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
