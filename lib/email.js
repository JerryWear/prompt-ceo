// Email utility using Resend
// Add RESEND_API_KEY to .env.local and Vercel environment variables

const FROM = 'Prompt CEO <hello@promptceo.io>'

async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — email not sent')
    return { ok: false }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    })
    const data = await res.json()
    if (!res.ok) console.error('Resend error:', data)
    return { ok: res.ok, data }
  } catch (err) {
    console.error('Email send error:', err)
    return { ok: false }
  }
}

// ── Email templates ────────────────────────────────────────────

function baseTemplate(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #040404; color: #e8e4dc; font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .brand { font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #c8a84b; margin-bottom: 32px; }
    .card { background: #111111; border: 1px solid #1a1a1a; border-radius: 10px; padding: 32px; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 800; color: #e8e4dc; margin: 0 0 16px; letter-spacing: -0.5px; line-height: 1.2; }
    p { font-size: 14px; color: #8a8680; line-height: 1.75; margin: 0 0 16px; }
    .btn { display: inline-block; padding: 12px 28px; border-radius: 6px; background: #c8a84b; color: #000; font-size: 14px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px; margin-top: 8px; }
    .btn-outline { display: inline-block; padding: 12px 28px; border-radius: 6px; border: 1px solid #7a6428; background: #c8a84b18; color: #c8a84b; font-size: 14px; font-weight: 700; text-decoration: none; }
    .divider { height: 1px; background: #1a1a1a; margin: 24px 0; }
    .small { font-size: 12px; color: #4a4845; }
    .highlight { color: #c8a84b; font-weight: 700; }
    .green { color: #4a9a6a; font-weight: 700; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">PROMPT CEO</div>
    ${content}
    <div class="small" style="margin-top: 32px;">
      You're receiving this email from Prompt CEO · <a href="https://promptceo.io" style="color: #4a4845;">promptceo.io</a>
    </div>
  </div>
</body>
</html>`
}

// ── Welcome email ──────────────────────────────────────────────
export async function sendWelcomeEmail(to) {
  return sendEmail({
    to,
    subject: 'Welcome to Prompt CEO',
    html: baseTemplate(`
      <div class="card">
        <h1>Welcome to Prompt CEO.</h1>
        <p>You now have access to the most complete AI creative operating system for creators and brands.</p>
        <p>Here's what's waiting for you:</p>
        <p>
          <span class="highlight">🎬 Director's Studio</span> — Generate cinematic scenes in 20+ worlds with 11 director styles.<br><br>
          <span class="highlight">📣 Ad Studio</span> — Angles, hooks, captions, images, video, UGC, campaigns — all connected.<br><br>
          <span class="highlight">🎵 Music Intelligence</span> — 400+ tracks matched to your campaign automatically.
        </p>
        <a href="https://promptceo.io/prompt-engine-v3" class="btn">Open the App →</a>
      </div>
      <div class="card">
        <p class="small">New to the app? Start here:</p>
        <p><a href="https://promptceo.io/tutorials" style="color: #c8a84b;">Step-by-step tutorials →</a></p>
        <p><a href="https://promptceo.io/pricing" style="color: #8a8680;">View pricing plans →</a></p>
      </div>
    `),
  })
}

// ── Subscription confirmation ──────────────────────────────────
export async function sendSubscriptionEmail(to, tier, tierLabel) {
  const tierColors = { creator: '#4a8ab4', studio_pro: '#4a9a6a', pro: '#c8a84b', agency: '#9b6fd4' }
  const color = tierColors[tier] || '#c8a84b'
  return sendEmail({
    to,
    subject: `You're on ${tierLabel} — Prompt CEO`,
    html: baseTemplate(`
      <div class="card">
        <h1>You're on <span style="color: ${color};">${tierLabel}</span>.</h1>
        <p>Your subscription is active. Everything is unlocked and ready to use.</p>
        <a href="https://promptceo.io/prompt-engine-v3" class="btn">Open the App →</a>
      </div>
      <div class="card">
        <p class="small">Manage your subscription anytime:</p>
        <p><a href="https://promptceo.io/account" style="color: #c8a84b;">My Account →</a></p>
      </div>
    `),
  })
}

// ── Affiliate application received ────────────────────────────
export async function sendAffiliateApplicationEmail(to, name) {
  return sendEmail({
    to,
    subject: 'Partner application received — Prompt CEO',
    html: baseTemplate(`
      <div class="card">
        <h1>Application received, ${name}.</h1>
        <p>We review every application personally. If you're a good fit, you'll hear back within <span class="highlight">48 hours</span> with your referral link and dashboard access.</p>
        <p>In the meantime, try the app yourself — the best partners are the ones who actually use it.</p>
        <a href="https://promptceo.io/prompt-engine-v3" class="btn">Try the App →</a>
      </div>
      <div class="card">
        <p class="small">Questions? Reply to this email or contact <a href="mailto:partners@promptceo.io" style="color: #c8a84b;">partners@promptceo.io</a></p>
      </div>
    `),
  })
}

// ── Affiliate approved ─────────────────────────────────────────
export async function sendAffiliateApprovedEmail(to, name, referralLink, commissionRate) {
  return sendEmail({
    to,
    subject: "You're approved — your Prompt CEO referral link is ready",
    html: baseTemplate(`
      <div class="card">
        <h1>You're in, ${name}. 🎉</h1>
        <p>Your application has been approved. Here's your referral link:</p>
        <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 6px; padding: 14px 18px; margin: 16px 0; font-family: monospace; font-size: 13px; color: #c8a84b; word-break: break-all;">
          ${referralLink}
        </div>
        <p>Share this link. Every subscriber who signs up through it earns you <span class="highlight">${commissionRate}% every month — forever.</span></p>
        <a href="https://promptceo.io/affiliate/dashboard" class="btn">View Your Dashboard →</a>
      </div>
      <div class="card">
        <p><span class="highlight">How commissions work:</span></p>
        <p>Partner (30%) → Pro Partner (35% after 10 referrals) → Elite Partner (40% after 50 referrals)</p>
        <p>Payouts are processed monthly via Stripe. Questions? <a href="mailto:partners@promptceo.io" style="color: #c8a84b;">partners@promptceo.io</a></p>
      </div>
    `),
  })
}

// ── Affiliate rejection ────────────────────────────────────────
export async function sendAffiliateRejectedEmail(to, name) {
  return sendEmail({
    to,
    subject: 'Your Prompt CEO partner application',
    html: baseTemplate(`
      <div class="card">
        <h1>Thanks for applying, ${name}.</h1>
        <p>After reviewing your application, we don't think it's the right fit at this time. This is usually about audience alignment rather than anything personal.</p>
        <p>You're still welcome to use the app — and if your situation changes, feel free to apply again.</p>
        <a href="https://promptceo.io" class="btn-outline">Back to Prompt CEO →</a>
      </div>
    `),
  })
}

export async function sendAdminAffiliateAlert(applicantName, applicantEmail, platform, audience, message) {
  return sendEmail({
    to: 'zirunas.michailovas@gmail.com',
    subject: `New partner application: ${applicantName}`,
    html: baseTemplate(`
      <div class="card">
        <h1>New Partner Application</h1>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:8px 0;color:#8a8680;font-size:12px;width:120px;">Name</td><td style="padding:8px 0;font-size:14px;color:#e8e4dc;">${applicantName}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8680;font-size:12px;">Email</td><td style="padding:8px 0;font-size:14px;color:#e8e4dc;">${applicantEmail}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8680;font-size:12px;">Platform</td><td style="padding:8px 0;font-size:14px;color:#e8e4dc;">${platform}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8680;font-size:12px;">Audience</td><td style="padding:8px 0;font-size:14px;color:#e8e4dc;">${audience || '—'}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;color:#8a8680;font-size:12px;vertical-align:top;">Message</td><td style="padding:8px 0;font-size:13px;color:#b0aba4;line-height:1.6;">${message}</td></tr>` : ''}
        </table>
        <a href="https://promptceo.io/account" class="btn">Review Application →</a>
      </div>
    `),
  })
}
