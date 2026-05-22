'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b12',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a12',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd412',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab412',
  tension:   '#b4944a',
}

const CASE_STUDIES = [
  {
    id:       'dtc-skincare',
    label:    'DTC Brand',
    industry: 'Skincare / Beauty',
    color:    C.gold,
    headline: 'From 1.1x to 3.4x ROAS in 6 weeks',
    subhead:  'A DTC skincare brand replaced their entire creative workflow with Prompt CEO — and tripled their ad return.',
    metrics: [
      { n: '3.4×',  label: 'ROAS (up from 1.1×)' },
      { n: '4.2%',  label: 'CTR (up from 1.3%)'  },
      { n: '£180k', label: 'Revenue in launch month' },
      { n: '6',     label: 'Weeks to results'     },
    ],
    situation: 'A UK skincare brand was spending £8,000/month on Meta with a 1.1x ROAS — basically breaking even. They were using 4 different tools (Jasper for copy, Canva for images, Klaviyo templates for emails, and a freelancer for hooks) and still not producing enough creative to test properly.',
    solution: [
      'Used VoC (Testimonial Mining) to mine 40 customer reviews — extracted 12 hooks in customers\' own words',
      'Ran those hooks through Hook Scorer before spending — identified 3 with predicted CTR above 3.5%',
      'Generated full campaign: landing page, email sequence, SMS, retargeting pack — all in one session',
      'Built a complete Offer Stack using Offer Builder — price anchoring, 3 bonuses, 60-day guarantee',
      'Launched Meta campaign using the Launch Package — naming conventions, UTMs, targeting pre-built',
    ],
    result: 'In week 2, the VoC-derived hook — "I\'ve tried everything for my skin. Nothing worked until this." — hit 4.8% CTR cold. ROAS climbed to 3.4x by week 6. The email sequence added £34,000 in backend revenue the ad numbers don\'t capture.',
    featuresUsed: ['Voice of Customer', 'Hook Scorer', 'Landing Page', 'Offer Builder', 'Email Sequence', 'SMS', 'Retargeting', 'Launch Package'],
  },
  {
    id:       'media-buyer',
    label:    'Media Buyer',
    industry: 'Performance Marketing',
    color:    C.blue,
    headline: 'CTR from 1.2% to 3.8% — without changing the product',
    subhead:  'A media buyer managing £200k/month in ad spend used Prompt CEO\'s Hook Scorer to stop guessing and start knowing.',
    metrics: [
      { n: '3.8%',  label: 'Average CTR (was 1.2%)' },
      { n: '£40k',  label: 'Monthly spend saved (wasted creative)' },
      { n: '2.1×',  label: 'Average ROAS improvement across accounts' },
      { n: '11',    label: 'Accounts managed with one tool' },
    ],
    situation: 'A performance marketer managing 11 client accounts was spending 30+ hours per week writing and testing hooks. Most hooks failed. The cost of discovering a winner was eating into client budgets. He needed a way to predict performance before spending.',
    solution: [
      'Integrated Hook Scorer into his pre-launch review process — every hook gets scored before any budget is allocated',
      'Used Ad Account Audit to paste each client\'s Meta data — got critical issues and creative tests instantly',
      'Set up Client Workspace with all 11 client brands — loads any client in one click',
      'Used Trend Intelligence weekly — know what hook formats are winning before competitors discover them',
      'Generated Retargeting Packs for all warm audience stages across every client account',
    ],
    result: 'Average CTR across his book of business moved from 1.2% to 3.8% in 8 weeks. He stopped wasting budget on hooks that were going to fail. The Ad Account Audit alone surfaced £40k/month in wasted creative budget across his accounts.',
    featuresUsed: ['Hook Scorer', 'Ad Account Audit', 'Client Workspace', 'Trend Intelligence', 'Retargeting Packs', 'Campaign Naming Convention'],
  },
  {
    id:       'creator',
    label:    'Creator',
    industry: 'Lifestyle / Fashion',
    color:    C.violet,
    headline: 'From 190k to 380k followers — 4× content output, same effort',
    subhead:  'A lifestyle creator used Prompt CEO to generate a month of content in a single afternoon — then did it again every month.',
    metrics: [
      { n: '380k',  label: 'Followers (up from 190k)' },
      { n: '4×',    label: 'Content output increase'  },
      { n: '1',     label: 'Session to plan a month'  },
      { n: '£12k',  label: 'Brand deal value increase' },
    ],
    situation: 'A UK lifestyle creator with 190k Instagram followers was producing 8-10 posts per month — limited by the time it took to ideate, write hooks, and brief photographers. She was losing brand deals to creators with more consistent output.',
    solution: [
      'Used Director\'s Studio to generate 30 cinematic scene prompts — Tokyo, Capri, London — in one afternoon',
      'Generated image ads from prompts directly inside the app — no external tools',
      'Used Story Worlds (After Dark, Boudoir, Power CEO) to create thematic content series',
      'Generated a 30-day content calendar aligned to her personal brand arc',
      'Built her Brand DNA profile — visual mood, tone, forbidden elements — so every generation stays consistent',
    ],
    result: 'She went from 190k to 380k in 4 months. Monthly content planning now takes one 2-hour session. Brand deals increased because she could show a consistent cinematic aesthetic across 30+ posts. The Director\'s Studio content looks unlike anything else in her niche.',
    featuresUsed: ['Director\'s Studio', 'Story Worlds', 'Image Generation', 'Content Calendar', 'Brand DNA Lock', 'Campaign Sequencer'],
  },
  {
    id:       'agency',
    label:    'Creative Agency',
    industry: 'Marketing Agency',
    color:    C.green,
    headline: '8 clients. One tool. 60% less delivery time.',
    subhead:  'A boutique creative agency replaced their entire tool stack with Prompt CEO — and took on 3 new clients with the same team.',
    metrics: [
      { n: '60%',   label: 'Reduction in delivery time' },
      { n: '8',     label: 'Clients managed in one workspace' },
      { n: '3',     label: 'New clients taken on (same team)' },
      { n: '£6k',   label: 'Monthly tool spend eliminated' },
    ],
    situation: 'A 4-person creative agency was managing 5 clients using Jasper, AdCreative.ai, a video freelancer, Klaviyo, and a project management tool. Switching context between clients was costing 15+ hours per week. Delivering a full campaign package took 3-4 days.',
    solution: [
      'Set up Client Workspace for all 8 clients — each brand saved with voice, product, audience, forbidden elements',
      'Used Brand DNA Lock per client — every generation stays visually and tonally consistent',
      'Full campaign delivery (hooks + landing page + emails + SMS + retargeting) now generated in under 2 hours',
      'Export Package copies all outputs as a formatted delivery document — sent to clients immediately',
      'Influencer Briefs generated for every UGC campaign — no more manual brief writing',
    ],
    result: 'Delivery time dropped from 3-4 days to under 4 hours per client campaign. They took on 3 new clients without adding headcount. Monthly tool spend dropped from £6,000 to one Prompt CEO Agency plan. Client retention improved because output quality and consistency went up.',
    featuresUsed: ['Client Workspace', 'Brand DNA Lock', 'Export Package', 'Landing Page', 'Email Sequence', 'SMS', 'Influencer Brief', 'Retargeting'],
  },
  {
    id:       'launch',
    label:    'Product Launch',
    industry: 'Fitness / Supplements',
    color:    C.tension,
    headline: '$240k launch revenue. Built entirely in Prompt CEO.',
    subhead:  'A fitness supplement brand used Prompt CEO to plan, write, and launch their entire product campaign — from a single brief.',
    metrics: [
      { n: '$240k', label: 'Launch month revenue'       },
      { n: '5.1×',  label: 'Launch campaign ROAS'       },
      { n: '38%',   label: 'Email open rate (sequence)' },
      { n: '1',     label: 'Brief to generate everything' },
    ],
    situation: 'A fitness supplement startup had a product ready to launch with a $15,000 ad budget and no creative team. They had a copywriter but no media buyer, no email specialist, and no video producer. Everything had to be built from scratch in 2 weeks.',
    solution: [
      'Entered product brief once — generated 50+ hooks, 10 angles, full captions in one session',
      'Used Offer Builder to structure the launch offer — price anchor at $197, launch price $97, 3 bonuses, 90-day guarantee',
      'Built complete Landing Page — hero, benefits, testimonials, FAQ, final CTA in brand voice',
      'Generated 7-email launch sequence — tease → announce → proof → urgency → last call → post-purchase → upsell',
      'SMS launch sequence timed to email sequence — added 12% additional revenue',
      'Video Storyboard with Runway prompts — generated 3 video ads without a film crew',
      'Launch Package formatted everything for Meta — campaign structure, UTMs, targeting, assets checklist ready',
    ],
    result: '$240k in the first month. 5.1x ROAS on a $15k ad budget. Email sequence hit 38% open rate. The SMS sequence added $28k that the ad numbers don\'t show. They used one tool for everything — no agency, no freelancers, no tool switching.',
    featuresUsed: ['Offer Builder', 'Landing Page', 'Email Sequence', 'SMS', 'Video Storyboard', 'Launch Package', 'Hooks', 'Captions', 'Campaign Sequencer'],
  },
]

export default function CaseStudiesPage() {
  const router = useRouter()
  const [active, setActive] = useState('dtc-skincare')
  const cs = CASE_STUDIES.find(c => c.id === active) || CASE_STUDIES[0]

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ display: 'flex', gap: 20 }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/about')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>About</button>
          <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Try Free</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 60, textAlign: 'center', padding: '120px 24px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${C.gold}08 0%, transparent 60%)` }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>Case Studies</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 20px' }}>
            Real results.<br />
            <span style={{ color: C.gold }}>Real numbers.</span>
          </h1>
          <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.75, maxWidth: 500, margin: '0 auto' }}>
            How brands, creators, media buyers, and agencies are using Prompt CEO to generate more, spend less, and convert better.
          </p>
        </div>
      </section>

      {/* CASE STUDY SELECTOR */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {CASE_STUDIES.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              style={{ padding: '8px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${active === c.id ? c.color : C.hairline}`,
                background: active === c.id ? c.color + '15' : 'transparent',
                color: active === c.id ? c.color : C.secondary,
              }}>
              {c.label} — {c.industry}
            </button>
          ))}
        </div>

        {/* Active case study */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: cs.color, marginBottom: 12 }}>{cs.industry}</div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px', lineHeight: 1.1 }}>{cs.headline}</h2>
              <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, margin: 0 }}>{cs.subhead}</p>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {cs.metrics.map((m, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: 8, border: `1px solid ${cs.color}33`, background: cs.color + '08', textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: cs.color, lineHeight: 1, letterSpacing: -1 }}>{m.n}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 6, lineHeight: 1.4 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Situation */}
            <div style={{ padding: '20px 24px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>The Situation</div>
              <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, margin: 0 }}>{cs.situation}</p>
            </div>

            {/* What they did */}
            <div style={{ padding: '20px 24px', borderRadius: 8, border: `1px solid ${cs.color}33`, background: cs.color + '06' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: cs.color, marginBottom: 14 }}>What They Did</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cs.solution.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: cs.color + '22', border: `1px solid ${cs.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: cs.color, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: C.primary, lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result */}
            <div style={{ padding: '20px 24px', borderRadius: 8, border: `1px solid ${C.greenDim}`, background: C.greenGlow }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.green, marginBottom: 10 }}>The Result</div>
              <p style={{ fontSize: 14, color: C.primary, lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>{cs.result}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 72 }}>

            {/* Features used */}
            <div style={{ padding: '20px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 14 }}>Features Used</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cs.featuresUsed.map((f, i) => (
                  <span key={i} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: cs.color + '15', border: `1px solid ${cs.color}33`, color: cs.color }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ padding: '24px', borderRadius: 10, border: `1px solid ${C.goldDim}`, background: C.goldGlow, textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.primary, marginBottom: 8, lineHeight: 1.3 }}>Get these results for your brand</div>
              <p style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, marginBottom: 16 }}>7-day free trial. No credit card required.</p>
              <button onClick={() => router.push('/prompt-engine-v3/login')}
                style={{ width: '100%', padding: '12px 0', borderRadius: 6, fontSize: 13, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000' }}>
                Start Free Trial
              </button>
            </div>

            {/* Other case studies */}
            <div style={{ padding: '16px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Other Case Studies</div>
              {CASE_STUDIES.filter(c => c.id !== active).map(c => (
                <button key={c.id} onClick={() => setActive(c.id)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, marginBottom: 4, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'transparent', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = C.raised}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.label}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{c.headline}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 80px) 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 16px' }}>
            Your campaign is next.<br />
            <span style={{ color: C.gold }}>Start today.</span>
          </h2>
          <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, marginBottom: 32 }}>7-day free trial. No credit card. Cancel anytime.</p>
          <button onClick={() => router.push('/prompt-engine-v3/login')}
            style={{ padding: '15px 40px', borderRadius: 6, fontSize: 15, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000' }}>
            Start Free Trial
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>
    </div>
  )
}
