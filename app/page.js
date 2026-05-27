'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase/client'

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

// ── Live output showcase — what the app actually generates ───
const SHOWCASE_CARDS = [
  {
    id: 'life_engine', label: 'Life Engine™', group: 'Life → Perfect Day',
    color: '#c8a84b', badge: '14 scenes · 15 worlds', badgeColor: '#4a9a6a',
    output: '"06:30 — Maldives villa. Soft light through linen curtains. Creator wakes slowly, city horizon below. Hook: This is what the day looks like when everything is aligned."',
    subtext: 'Perfect Day arc — morning to midnight, 14 cinematic moments',
    detail: 'Life Engine generates a full-day content structure — Perfect Day, Creator Day, Travel World, Fitness Day, or Ad Campaign Day. Every moment has a hook, caption, image prompt, video prompt, wardrobe, lighting, and camera direction. 15 worlds from Monaco to Maldives.',
    cta: 'Build your perfect day →',
  },
  {
    id: 'ai_director', label: 'AI Director™', group: 'Create → Director',
    color: '#c8a84b', badge: 'Natural language command', badgeColor: '#c8a84b',
    output: '"Create a 30-day cinematic luxury hoodie campaign for TikTok using my creator identity in Monaco." → Routing to Life Campaign Engine…',
    subtext: 'Type what you want — the Director routes to the right engine',
    detail: 'AI Director understands natural language creative intent. Tell it what you want to build, for what platform, in what world. It collects what it needs, then routes to Perfect Day, Full Campaign, Ad Studio, or Life Engine — automatically.',
    cta: 'Try the Director →',
  },
  {
    id: 'campaign_engine', label: 'Life Campaign Engine™', group: 'Campaigns → Full Campaign',
    color: '#9b6fd4', badge: '30 days · 5 phases', badgeColor: '#9b6fd4',
    output: '"Day 1 — Awareness. 07:00. Monaco harbour. Hook: This is the morning that changed everything for me → Image prompt: [identity] waking in overwater suite, turquoise lagoon, soft tropical light…"',
    subtext: '30-day posting schedule built from the same daily timeline as your Perfect Day',
    detail: 'The Life Campaign Engine turns a full-day arc into a 30-day ad campaign. Same world. Same character. Same timeline. But every scene is engineered to move a viewer from cold awareness to conversion. 5 phases: Awareness → Connection → Desire → Conversion → Retargeting.',
    cta: 'Run a full campaign →',
  },
  {
    id: 'identity', label: 'Identity System™', group: 'Studio → Identity',
    color: '#4a8ab4', badge: 'One scan · all content', badgeColor: '#4a8ab4',
    output: '"Creator: mixed-race woman, deep brown eyes, dark wavy hair, athletic build, approximately 26. Applied to: 14 Perfect Day scenes, 30 campaign posts, 12 video scenes."',
    subtext: 'Scan once — your identity flows into every image, every prompt, every campaign',
    detail: 'Upload one photo. The Identity System scans and extracts your physical traits. From that point, every image prompt, every video direction, every campaign scene is generated with consistent character description — automatically. No re-entering. No inconsistency.',
    cta: 'Set up your identity →',
  },
  {
    id: 'full_day_video', label: 'Full Day Video™', group: 'Life → Day Video',
    color: '#c87a4a', badge: '12 cinematic scenes', badgeColor: '#c87a4a',
    output: '"Scene 03 | 08:00 | Morning Routine. Camera: mirror POV, slow push in on face. Lens: 35mm f/2.0. Lighting: soft Maldives morning. Wardrobe: white linen robe. Emotion: privileged morning."',
    subtext: 'Full cinematic production direction — camera, lens, lighting, wardrobe, emotion per scene',
    detail: 'Full Day Video generates a complete cinematic production plan for a day. 12 scenes with exact camera movement, lens choice, lighting note, wardrobe, emotional direction, video AI prompt, short-form clip cut, and caption hook. Ready for Kling, Runway, or a real crew.',
    cta: 'Direct your day →',
  },
  {
    id: 'hook', label: 'Hook System', group: 'Campaigns → Hooks',
    color: '#c8a84b', badge: '5 types · CTR scored', badgeColor: '#4a9a6a',
    output: '"I\'ve tried every skincare brand. Nothing worked until this." — Pain hook. CTR: 4.8% predicted.',
    subtext: 'Hooks generated across 5 emotional types, scored before you spend',
    detail: 'The Ad Studio generates hooks across Pain, Desire, Curiosity, Luxury, and Direct Offer types. Each hook is CTR-scored using your brief and platform. Winners go to your Swipe File. Used as the foundation of your 30-day campaign.',
    cta: 'Generate hooks →',
  },
  {
    id: 'video', label: 'Video System', group: 'Production → Video',
    color: '#9b6fd4', badge: 'Kling · Runway · Luma', badgeColor: '#9b6fd4',
    output: '"Slow push in on creator at marble kitchen counter. Monaco harbour visible through floor-to-ceiling glass. 85mm f/1.4. Morning golden light. 8-12 seconds. Emotion: privileged calm."',
    subtext: 'AI video prompts built from the same life engine as your images',
    detail: 'Every scene from Life Engine, Perfect Day, and Full Campaign includes a ready-to-use video prompt for Kling, Runway, or Luma. Camera move, lens, lighting, duration, and emotional direction are all specified. One click generates the video directly from Studio.',
    cta: 'Generate video →',
  },
]

// ── Feature categories — the full marketing OS ──────────────
const FEATURE_GROUPS = [
  {
    id: 'orchestration', icon: '✦', label: 'AI Director', color: C.gold,
    tagline: 'Natural language command',
    features: ['AI Director™ — type what you want to build', 'Routes to correct engine automatically', 'Collects intent through conversation', 'Remembers your world and identity'],
  },
  {
    id: 'life', icon: '☀', label: 'Life Engine', color: C.tension,
    tagline: 'Full-day cinematic content',
    features: ['Perfect Day™ — 14 moments morning to midnight', 'Creator Day, Travel World, Fitness Day', 'Ad Campaign Day — same timeline, commercial goal', 'Full Day Video™ — cinematic production direction'],
  },
  {
    id: 'campaign', icon: '◈', label: 'Campaign Engine', color: C.violet,
    tagline: '30-day life campaign',
    features: ['Life Campaign Engine™ — full 30-day schedule', '5 phases: Awareness → Retargeting', 'Platform versions: Instagram, TikTok, YouTube', '5 retargeting angles per campaign'],
  },
  {
    id: 'creative', icon: '▣', label: 'Ad Studio', color: '#c87a4a',
    tagline: 'Hooks, copy, and creative',
    features: ['Hooks across 5 emotional types, CTR-scored', 'Angles, captions, video scripts', 'Image generation with identity', 'Full funnel copy — landing page to retargeting'],
  },
  {
    id: 'identity', icon: '◧', label: 'Studio Identity', color: C.blue,
    tagline: 'One character. All content.',
    features: ['Identity scan — one photo, consistent character', '15 cinematic worlds — Monaco to Maldives', '11 director styles — Kubrick to Malick', 'Character flows into every scene and campaign'],
  },
  {
    id: 'intelligence', icon: '◎', label: 'Intelligence', color: C.green,
    tagline: 'Memory and performance',
    features: ['Performance Memory — what works for your brand', 'World Memory — best worlds for your audience', 'Campaign Brain — hook types and patterns', 'Project Brain — full creative history'],
  },
]

// ── What one brief generates ─────────────────────────────────
const OUTPUT_COUNT = [
  { n: '14',   label: 'Moments per Perfect Day',      color: C.gold   },
  { n: '30',   label: 'Days per Life Campaign',        color: C.violet },
  { n: '15',   label: 'Cinematic worlds',              color: C.blue   },
  { n: '1',    label: 'Identity — all content',        color: C.green  },
]

// ── Who it's for ─────────────────────────────────────────────
const AUDIENCES = [
  {
    icon: '📱', label: 'Creators & Influencers', color: C.gold,
    desc: 'Generate your Perfect Day, Creator Day, or Travel World content with your identity across 15 cinematic worlds. Full posting schedule, hooks, captions, image and video prompts — all connected.',
    proof: 'Perfect Day — 14 scenes, 14 hooks, 14 image prompts, 1 session',
  },
  {
    icon: '🏢', label: 'Brands & DTC', color: C.violet,
    desc: 'Enter your product once. The Life Campaign Engine builds a full 30-day ad story using the same timeline as a Perfect Day — Awareness through Retargeting — with your world, your identity, your voice.',
    proof: 'Full 30-day campaign from one product name and one world',
  },
  {
    icon: '⚡', label: 'Media Buyers', color: C.blue,
    desc: 'Score hooks before you spend, run full campaign orchestration from AI Director, and get 5 unique retargeting angles built from the same life arc as your cold campaign.',
    proof: 'Life Campaign Engine — 30-day schedule + 5 retargeting angles auto-built',
  },
  {
    icon: '🎯', label: 'Agencies', color: C.green,
    desc: 'Manage multiple client brands in one workspace. Run Life Campaign Orchestration Engine per client. AI Director handles briefing. Every output connected to one project.',
    proof: 'Full campaign package per client — from AI Director command to export',
  },
]

// ── Tools this replaces ───────────────────────────────────────
const REPLACES = [
  { tool: 'Jasper / Copy.ai',     use: 'Ad copy & hooks',       price: '$49+/mo' },
  { tool: 'Foreplay',             use: 'Competitor research',   price: '$49+/mo' },
  { tool: 'Klaviyo templates',    use: 'Email sequences',       price: 'Manual'  },
  { tool: 'Canva + ChatGPT',      use: 'Briefs & scripts',      price: '$20+/mo' },
  { tool: 'Postscript / Attentive', use: 'SMS copy',            price: '$100+/mo'},
  { tool: 'TubeBuddy',            use: 'Product descriptions',  price: '$20+/mo' },
]

// ── Hero ticker outputs ───────────────────────────────────────
const HERO_TICKER = [
  { type: 'Perfect Day',     color: '#c8a84b', text: '"06:30 — Maldives villa. Creator wakes slowly. Soft linen. Turquoise lagoon below. Hook: This is what the day looks like when everything is aligned."', badge: '14 scenes generated' },
  { type: 'AI Director',     color: '#c8a84b', text: '"Create a 30-day luxury campaign for my black hoodie on TikTok." → Routing to Life Campaign Engine in Monaco world…',                                   badge: 'Natural language' },
  { type: 'Life Campaign',   color: '#9b6fd4', text: '"Day 1. 07:00. Awareness phase. Hook: This is the morning that changed everything for me → image + video prompt ready."',                              badge: '30-day schedule' },
  { type: 'Identity',        color: '#4a8ab4', text: '"Creator appearance: mixed-race, dark wavy hair, athletic, ~26. Applied to 14 Perfect Day scenes, 30 campaign posts, 12 video directions."',           badge: 'One scan · all content' },
  { type: 'Full Day Video',  color: '#c87a4a', text: '"Scene 03. Mirror POV. 35mm f/2.0. Soft Bali morning. White linen robe. Slow push in. Emotion: privileged calm. 8-12 seconds."',                      badge: '12 cinematic scenes' },
  { type: 'Ad Campaign',     color: '#9b6fd4', text: '"Retargeting angle 2: \'It\'s too expensive.\' I used to think that too. I calculated what I was spending on things that didn\'t work."',             badge: '5 retargeting angles' },
  { type: 'Hook System',     color: '#c8a84b', text: '"I\'ve tried every skincare brand. Nothing worked until this." — Pain hook. 4.8% CTR predicted.',                                                       badge: 'CTR scored before you spend' },
]

// ── Feature carousel slides ───────────────────────────────────
const FEATURE_SLIDES = [
  {
    id: 'orchestration',
    badge: 'AI Creative Operating System',
    color: '#c8a84b',
    headline: 'One command.\nFull campaign.\nAll connected.',
    sub: 'Tell the AI Director what you want to build. It routes to the right engine — Perfect Day, Full Campaign, Ad Studio, or Life Engine — and generates everything: scenes, hooks, captions, image prompts, video direction, posting schedule.',
    bullets: ['AI Director — natural language creative command', 'Life Engine — 15 worlds × 5 day types', 'Campaign Orchestration — same timeline for life and ads', 'Identity System — one photo, consistent across all content'],
    anchor: 'section-outputs',
    cta: 'See all systems ↓',
  },
  {
    id: 'life-engine',
    badge: 'Life Campaign Orchestration Engine™',
    color: '#c8a84b',
    headline: 'Perfect Day.\nFull Campaign.\nSame brain.',
    sub: "Perfect Day shows a full believable life. Full Campaign uses that same life to sell something. Same timeline. Same world. Same character. Same emotional progression. Different commercial goal. That's the key.",
    bullets: ['14-block universal day skeleton — wake up to bedtime', '15 cinematic worlds from Monaco to Maldives', 'Campaign mode: product woven through the full arc', '30-day schedule + 5 retargeting angles auto-built'],
    anchor: 'section-life',
    cta: 'See the Life Engine ↓',
  },
  {
    id: 'identity',
    badge: "Studio Identity System™",
    color: '#4a8ab4',
    headline: 'One photo.\nEvery scene.\nConsistent.',
    sub: 'Scan your identity once. Your physical traits flow into every image prompt, every video direction, every campaign scene — automatically. 14 Perfect Day moments. 30 campaign posts. 12 video scenes. All consistent. All you.',
    bullets: ['One scan — extracts ethnicity, hair, build, age, features', 'Identity flows into image prompts and video prompts', '15 worlds you can place your identity in', 'Character persistence across all content types'],
    anchor: 'section-identity',
    cta: 'Set up your identity ↓',
  },
  {
    id: 'ad-studio',
    badge: 'Ad Studio™',
    color: '#9b6fd4',
    headline: 'Hooks.\nCopy.\nImages.\nVideo.',
    sub: 'Ad Studio generates your full creative stack — hooks across 5 emotional types, CTR-scored before you spend. Angles, captions, video scripts, image prompts, and a 30-day campaign schedule. All in one connected system.',
    bullets: ['50+ hooks, 5 emotional types, CTR-scored', 'Full funnel copy — landing page to retargeting', 'Image generation with identity + cinematic worlds', 'Video storyboards with Runway + Kling prompts'],
    anchor: 'section-adstudio',
    cta: 'See Ad Studio ↓',
  },
  {
    id: 'affiliate',
    badge: 'Partner Program',
    color: '#4a8ab4',
    headline: 'Earn 30%\nrecurring on\nevery referral.',
    sub: 'Share your link. Every subscription you refer pays you 30% every single month — for as long as they stay. Real-time dashboard, monthly Stripe payouts, no complicated tiers.',
    bullets: ['30% recurring commission — no cap', 'Real-time dashboard + payout countdown', 'Ready-made share content included', 'Monthly payouts via Stripe'],
    anchor: 'section-affiliate',
    cta: 'Join the program ↓',
  },
  {
    id: 'updates',
    badge: 'Always Evolving',
    color: '#4a9a6a',
    headline: 'New systems\nand worlds\nevery week.',
    sub: "This isn't a tool that launched and stopped. New story worlds, AI upgrades, campaign orchestration tools, and Life Engine day types ship constantly. You're always on the latest version — no installs, no updates.",
    bullets: ['New cinematic worlds added regularly', 'New AI orchestration systems weekly', 'Feature requests from users actually ship', 'Every update live instantly — nothing to install'],
    anchor: 'section-updates',
    cta: "See what's new ↓",
  },
]

// ── Testimonials ──────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "I built my entire launch — landing page, email sequence, SMS, UGC brief, offer stack, and retargeting creatives — in one session. Nothing else I've used does this.",
    name:  'Alex R.',
    role:  'DTC Brand Founder',
    color: C.gold,
  },
  {
    quote: "The Hook Scorer alone is worth it. I stopped guessing and started knowing which hooks would convert before spending a dollar. My CTR went up 40% in 3 weeks.",
    name:  'Marcus T.',
    role:  'Media Buyer · $200k/month ad spend',
    color: C.blue,
  },
  {
    quote: "I manage 6 client brands. The client workspace and delivery package feature saves me 8 hours a week. And the cinematic studio content still makes my clients think I have a film crew.",
    name:  'Priya L.',
    role:  'Creative Agency · 6 Clients',
    color: C.violet,
  },
]

export default function HomePage() {
  const router    = useRouter()
  const supabase  = createClient()
  const [user,           setUser]           = useState(undefined)
  const [activeGroup,    setActiveGroup]    = useState('creative')
  const [activeAudience, setActiveAudience] = useState(0)
  const [activeCard,     setActiveCard]     = useState(null)
  const [showcaseHover,  setShowcaseHover]  = useState(null)
  const [slideIndex,     setSlideIndex]     = useState(0)
  const [tickerIndex,    setTickerIndex]    = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveAudience(i => (i + 1) % AUDIENCES.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % FEATURE_SLIDES.length), 7000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTickerIndex(i => (i + 1) % HERO_TICKER.length), 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      localStorage.setItem('ref_code', ref)
      fetch('/api/affiliate/track', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: ref, eventType: 'click' }),
      }).catch(() => {})
    }
  }, [])

  const goToApp     = () => router.push('/prompt-engine-v3')
  const goToLogin   = () => router.push('/prompt-engine-v3/login')
  const goToPricing = () => router.push('/pricing')

  const currentGroup = FEATURE_GROUPS.find(g => g.id === activeGroup) || FEATURE_GROUPS[0]
  const currentAud   = AUDIENCES[activeAudience]

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>PROMPT CEO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={goToPricing}                               style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/case-studies')}        style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Case Studies</button>
          <button onClick={() => router.push('/partner')}             style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}               style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>About</button>
          {user ? (
            <>
              <button onClick={() => router.push('/account')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>My Account</button>
              <button onClick={goToApp} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Open App</button>
            </>
          ) : (
            <>
              <button onClick={goToLogin} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Sign In</button>
              <button onClick={goToLogin} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Start Free Trial</button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 50% 20%, ${C.gold}09 0%, transparent 65%)` }} />

        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 32 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>Complete Marketing Operating System</span>
          </div>

          <style>{`
            @keyframes tickerFade {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .ticker-card { animation: tickerFade 0.45s ease forwards; }
          `}</style>

          <h1 style={{ fontSize: 'clamp(38px, 7.5vw, 78px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, margin: '0 0 36px', color: C.primary }}>
            One brief.<br />
            <span style={{ color: C.gold }}>Your entire marketing stack.</span>
          </h1>

          {/* ── Live output ticker ── */}
          {(() => {
            const item = HERO_TICKER[tickerIndex]
            return (
              <div key={tickerIndex} className="ticker-card" style={{ maxWidth: 680, margin: '0 auto 36px', borderRadius: 12, border: `1px solid ${item.color}44`, background: item.color + '08', padding: '18px 22px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: item.color, background: item.color + '18', border: `1px solid ${item.color}33`, padding: '3px 9px', borderRadius: 999 }}>{item.type}</span>
                  <span style={{ fontSize: 9, color: C.muted, letterSpacing: 0.5 }}>· AI generated</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a9a6a', display: 'inline-block', boxShadow: '0 0 6px #4a9a6a' }} />
                    <span style={{ fontSize: 9, color: '#4a9a6a', fontWeight: 700 }}>LIVE</span>
                  </span>
                </div>
                <div style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', color: C.primary, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 10 }}>
                  {item.text}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.badge}</div>
              </div>
            )
          })()}

          <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: C.secondary, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 16px' }}>
            Enter your product once. Walk out with your entire marketing stack — hooks, landing pages, email sequences, SMS campaigns, retargeting creatives, and more. All connected. All in your brand voice.
          </p>

          <p style={{ fontSize: 13, color: C.muted, marginBottom: 40 }}>
            Plus the world's most advanced cinematic prompt engine — 20 worlds, 12-layer AI, 11 director styles.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <button onClick={goToLogin} style={{ padding: '15px 36px', borderRadius: 6, fontSize: 15, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000', letterSpacing: 0.3 }}>
              Start Free — No Card Needed
            </button>
            <button onClick={goToPricing} style={{ padding: '15px 28px', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}>
              See Pricing →
            </button>
          </div>

          {/* ── Social proof numbers ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, maxWidth: 560, margin: '0 auto 28px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, overflow: 'hidden' }}>
            {[
              { n: '2,400+',  label: 'marketers',         color: C.gold   },
              { n: '180k+',   label: 'outputs generated', color: C.violet },
              { n: '$300+',   label: 'worth of tools replaced', color: C.green },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '14px 8px', textAlign: 'center', borderRight: i < 2 ? `1px solid ${C.hairline}` : 'none' }}>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: s.color, letterSpacing: -0.5, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: C.muted }}>✓ 7-day free trial</div>
            <div style={{ fontSize: 12, color: C.muted }}>✓ No credit card required</div>
            <div style={{ fontSize: 12, color: C.muted }}>✓ Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* ── FEATURE CAROUSEL ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px', background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>What's Inside</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 8px' }}>
              Everything you need to market at scale.
            </h2>
            <p style={{ fontSize: 14, color: C.secondary }}>
              Click any module below to see exactly what it does.
            </p>
          </div>

          {/* Pill nav */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {FEATURE_SLIDES.map((slide, i) => (
              <button key={slide.id} onClick={() => setSlideIndex(i)} style={{
                padding: '6px 16px', borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                border: `1px solid ${slideIndex === i ? slide.color : C.hairline}`,
                background: slideIndex === i ? slide.color + '18' : 'transparent',
                color: slideIndex === i ? slide.color : C.muted,
                transition: 'all 0.15s',
              }}>
                {slide.badge}
              </button>
            ))}
          </div>

          {/* Active slide */}
          {(() => {
            const slide = FEATURE_SLIDES[slideIndex]
            const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

            const VISUALS = {
              'marketing-os': (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    { label: 'Hooks',         value: '50+ across 5 types',   badge: '4.8% CTR',    color: '#c8a84b' },
                    { label: 'Email sequence', value: '5 emails, launch flow', badge: 'voice-matched', color: '#9b6fd4' },
                    { label: 'Landing page',  value: 'Hero + FAQ + CTA',      badge: 'complete',    color: '#4a9a6a' },
                    { label: 'Retargeting',   value: '6 audience segments',   badge: 'warm traffic', color: '#4a8ab4' },
                    { label: 'SMS campaign',  value: '3-step sequence',       badge: '142 chars',   color: '#b4944a' },
                  ].map((row, i) => (
                    <div key={i} style={{ padding: '10px 14px', borderRadius: 8, background: C.surface, border: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: row.color }}>{row.label}</span>
                        <span style={{ fontSize: 10, color: C.muted, marginLeft: 8 }}>{row.value}</span>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: row.color, background: row.color + '18', padding: '2px 8px', borderRadius: 999, border: `1px solid ${row.color}33`, whiteSpace: 'nowrap' }}>{row.badge}</span>
                    </div>
                  ))}
                </div>
              ),
              'ad-studio': (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { label: 'Lifestyle · Tokyo',  color: '#9b6fd4' },
                      { label: 'Editorial · Capri',  color: '#c8a84b' },
                      { label: 'Minimal · Clean',    color: '#4a8ab4' },
                      { label: 'UGC · Natural',      color: '#4a9a6a' },
                    ].map((card, i) => (
                      <div key={i} style={{ padding: '32px 12px', borderRadius: 8, border: `1px solid ${card.color}33`, background: card.color + '08', textAlign: 'center' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: card.color }}>{card.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: 8, background: C.surface, border: `1px solid #c8a84b44`, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16, color: '#c8a84b' }}>♪</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>Diamond</div>
                      <div style={{ fontSize: 9, color: C.muted }}>High energy · 128 BPM · Drop at 0:32</div>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#4a9a6a', background: '#4a9a6a18', padding: '2px 8px', borderRadius: 999, border: '1px solid #4a9a6a33' }}>96% match</span>
                  </div>
                </div>
              ),
              'cinematic': (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    ['Tokyo',       'Neon · Aman · Shinjuku',      '#9b6fd4'],
                    ['Capri',       'Villa · Faraglioni · Sea',     '#c8a84b'],
                    ['Marrakech',   'Riad · Hammam · La Mamounia',  '#b4944a'],
                    ['Swiss Alps',  'Chalet · Slopes · Alpenglow',  '#4a8ab4'],
                    ['Boudoir',     'Silk · Candlelight · Private', '#9b6fd4'],
                    ['Mega Yacht',  'Med · Deck · Sunset',          '#4a9a6a'],
                  ].map(([name, desc, color]) => (
                    <div key={name} style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${color}33`, background: color + '06' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 2 }}>{name}</div>
                      <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.3 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              ),
              'music': (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    { title: 'Diamond',        mood: 'Luxury',    bpm: 128, match: 96, color: '#c8a84b' },
                    { title: 'Midnight Drive', mood: 'Confident', bpm: 124, match: 91, color: '#9b6fd4' },
                    { title: 'Golden Hour',    mood: 'Emotional', bpm: 100, match: 84, color: '#b4944a' },
                    { title: 'Pure Energy',    mood: 'Hype',      bpm: 140, match: 79, color: '#4a9a6a' },
                  ].map((t, i) => (
                    <div key={i} style={{ padding: '10px 14px', borderRadius: 8, background: C.surface, border: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${t.color}44`, background: t.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: t.color, flexShrink: 0 }}>▶</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{t.title}</div>
                        <div style={{ fontSize: 9, color: C.muted }}>{t.mood} · {t.bpm} BPM</div>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: t.color }}>{t.match}%</span>
                    </div>
                  ))}
                </div>
              ),
              'affiliate': (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { label: 'This month',     value: '$847',  color: '#4a9a6a' },
                      { label: 'Referrals',       value: '14',    color: '#4a8ab4' },
                      { label: 'Commission',      value: '30%',   color: '#c8a84b' },
                      { label: 'Total earned',    value: '$3,240', color: '#9b6fd4' },
                    ].map((s, i) => (
                      <div key={i} style={{ padding: '16px', borderRadius: 8, border: `1px solid ${s.color}33`, background: s.color + '06', textAlign: 'center' }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: -0.5 }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: C.muted, marginTop: 3 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: 8, background: C.surface, border: `1px solid #4a9a6a33` }}>
                    <div style={{ fontSize: 9, color: C.muted, marginBottom: 2 }}>Next payout</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#4a9a6a' }}>June 1, 2026 · via Stripe</div>
                  </div>
                </div>
              ),
              'updates': (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { text: 'Mega Yacht + Supermodel story worlds',    date: 'May 2026' },
                    { text: 'Multi-mood music + track streaming',      date: 'May 2026' },
                    { text: 'Ad Studio v3 — image + video + music',   date: 'Apr 2026' },
                    { text: 'Affiliate dashboard + payout tracking',   date: 'Apr 2026' },
                    { text: 'Shot Director AI + Brand DNA Lock',       date: 'Mar 2026' },
                    { text: 'Variation engine + coherence check',      date: 'Mar 2026' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '8px 12px', borderRadius: 7, background: C.surface, border: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 8, fontWeight: 800, color: '#000', background: '#4a9a6a', padding: '2px 6px', borderRadius: 3, flexShrink: 0, letterSpacing: 0.5 }}>NEW</span>
                      <span style={{ fontSize: 11, color: C.secondary, flex: 1 }}>{item.text}</span>
                      <span style={{ fontSize: 9, color: C.muted, flexShrink: 0 }}>{item.date}</span>
                    </div>
                  ))}
                </div>
              ),
            }

            return (
              <div key={slide.id} style={{ borderRadius: 16, border: `1px solid ${slide.color}33`, background: slide.color + '05', padding: 'clamp(28px, 4vw, 52px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
                {/* Text */}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: slide.color, marginBottom: 14 }}>{slide.badge}</div>
                  <h3 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 18px', color: C.primary, whiteSpace: 'pre-line' }}>
                    {slide.headline}
                  </h3>
                  <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, margin: '0 0 22px' }}>
                    {slide.sub}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                    {slide.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: slide.color, fontSize: 10, flexShrink: 0, marginTop: 3 }}>✦</span>
                        <span style={{ fontSize: 13, color: C.secondary }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button onClick={() => scrollTo(slide.anchor)}
                      style={{ padding: '10px 22px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${slide.color}`, background: slide.color + '18', color: slide.color }}>
                      {slide.cta}
                    </button>
                    <button onClick={goToLogin}
                      style={{ padding: '10px 22px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}>
                      Start Free →
                    </button>
                  </div>
                </div>
                {/* Visual */}
                <div>
                  {VISUALS[slide.id]}
                </div>
              </div>
            )
          })()}

          {/* Dot nav */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 28 }}>
            {FEATURE_SLIDES.map((s, i) => (
              <button key={i} onClick={() => setSlideIndex(i)} style={{
                width: slideIndex === i ? 28 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                background: slideIndex === i ? FEATURE_SLIDES[i].color : C.subtle,
                transition: 'all 0.2s',
              }} />
            ))}
          </div>

        </div>
      </section>

      {/* ── OUTPUT NUMBERS ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '40px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {OUTPUT_COUNT.map((o, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px', borderRight: i < 3 ? `1px solid ${C.hairline}` : 'none' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: o.color, lineHeight: 1, letterSpacing: -1 }}>{o.n}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 6, lineHeight: 1.4 }}>{o.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE OUTPUT SHOWCASE ── */}
      <section id="section-outputs" style={{ padding: 'clamp(60px, 8vw, 100px) 24px', background: C.void }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>What It Actually Creates</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
              Real outputs. Real copy. Right now.
            </h2>
            <p style={{ fontSize: 15, color: C.secondary, maxWidth: 480, margin: '0 auto' }}>
              Click any card to see exactly what the app generates and where to find it.
            </p>
          </div>

          {/* Card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: activeCard ? 24 : 0 }}>
            {SHOWCASE_CARDS.map(card => {
              const isActive = activeCard === card.id
              const isHover  = showcaseHover === card.id
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCard(isActive ? null : card.id)}
                  onMouseEnter={() => setShowcaseHover(card.id)}
                  onMouseLeave={() => setShowcaseHover(null)}
                  style={{
                    borderRadius: 10, padding: '18px', cursor: 'pointer',
                    border: `1px solid ${isActive ? card.color + '66' : isHover ? card.color + '33' : C.hairline}`,
                    background: isActive ? card.color + '10' : isHover ? card.color + '06' : C.surface,
                    transition: 'all 0.18s',
                    transform: isHover && !isActive ? 'translateY(-2px)' : 'none',
                  }}
                >
                  {/* Label + group */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: card.color }}>{card.label}</span>
                    <span style={{ fontSize: 8, color: C.muted, background: C.raised, padding: '2px 7px', borderRadius: 999 }}>{card.group}</span>
                  </div>
                  {/* Output quote */}
                  <div style={{ fontSize: 13, color: C.primary, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 10, whiteSpace: 'pre-wrap' }}>
                    {card.output}
                  </div>
                  {/* Subtext + badge */}
                  <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.4, marginBottom: 10 }}>{card.subtext}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: card.badgeColor, background: card.badgeColor + '18', padding: '2px 8px', borderRadius: 999, border: `1px solid ${card.badgeColor}33` }}>
                      {card.badge}
                    </span>
                    <span style={{ fontSize: 10, color: isActive ? card.color : C.muted, fontWeight: 700 }}>
                      {isActive ? '▲ Less' : '▼ More'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Expanded detail panel */}
          {activeCard && (() => {
            const card = SHOWCASE_CARDS.find(c => c.id === activeCard)
            if (!card) return null
            return (
              <div style={{ borderRadius: 12, border: `1px solid ${card.color}44`, background: card.color + '08', padding: 'clamp(24px, 4vw, 40px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: card.color, marginBottom: 10 }}>{card.label} — {card.group}</div>
                  <p style={{ fontSize: 15, color: C.primary, lineHeight: 1.8, margin: '0 0 20px' }}>{card.detail}</p>
                  <button onClick={goToLogin}
                    style={{ padding: '10px 24px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${card.color}`, background: card.color + '18', color: card.color }}>
                    {card.cta}
                  </button>
                </div>
                <button onClick={() => setActiveCard(null)}
                  style={{ padding: '6px 10px', borderRadius: 5, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.muted, flexShrink: 0 }}>
                  ✕ Close
                </button>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── FEATURE EXPLORER ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Everything You Need</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
              6 systems. One platform.
            </h2>
            <p style={{ fontSize: 15, color: C.secondary, maxWidth: 480, margin: '0 auto' }}>
              Every tool talks to the same brief. Change your product name — everything updates. That's the OS difference.
            </p>
          </div>

          {/* Group selector */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {FEATURE_GROUPS.map(g => (
              <button key={g.id} onClick={() => setActiveGroup(g.id)}
                style={{ padding: '8px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${activeGroup === g.id ? g.color : C.hairline}`,
                  background: activeGroup === g.id ? g.color + '15' : 'transparent',
                  color: activeGroup === g.id ? g.color : C.secondary,
                }}>
                <span style={{ marginRight: 6, fontSize: 10 }}>{g.icon}</span>{g.label}
              </button>
            ))}
          </div>

          {/* Active group detail */}
          <div style={{ borderRadius: 12, border: `1px solid ${currentGroup.color}33`, background: currentGroup.color + '06', padding: 'clamp(28px, 4vw, 48px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', transition: 'all 0.3s' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: currentGroup.color, marginBottom: 12 }}>{currentGroup.label}</div>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 16px', color: C.primary }}>{currentGroup.tagline}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentGroup.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: currentGroup.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: C.secondary }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '16px 20px', borderRadius: 8, background: C.surface, border: `1px solid ${C.hairline}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: currentGroup.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>How it works</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>
                  {currentGroup.id === 'creative' && 'Enter your product once. Generate 10 psychological angles, 50+ hooks across 5 emotional types, 6 caption styles, image prompts, video prompts, and 4 UGC scripts — all from the same brief.'}
                  {currentGroup.id === 'campaign' && 'Map your product to a complete funnel. 7/14/30/60-day campaign arc, matching email sequence, SMS sequence, content calendar, and launch sequence — all timed and emotionally connected.'}
                  {currentGroup.id === 'funnel' && 'Convert the traffic your ads bring. Landing page with hero, benefits, testimonials, and FAQ. Offer builder with value stack and guarantee. Retargeting creatives for 6 warm audience stages.'}
                  {currentGroup.id === 'intel' && 'Know before you spend. Score any hook and get a CTR prediction. Get a real-time trend report. Paste your ad account data and get a creative action plan. Deconstruct any competitor ad visually.'}
                  {currentGroup.id === 'production' && 'Generate content that actually gets filmed. Teleprompter-ready talking head scripts. Scene-by-scene video storyboards with Runway/Kling prompts. Amazon + Shopify product descriptions. Influencer briefs ready to send.'}
                  {currentGroup.id === 'studio' && '20+ cinematic worlds — Tokyo, Capri, Marrakech, Swiss Alps and more. 12-layer prompt engine. 11 director styles from Kubrick to Wong Kar-wai. Story worlds with character persistence. Every prompt is a film scene.'}
                </div>
              </div>
              <button onClick={goToLogin} style={{ padding: '12px 0', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${currentGroup.color}`, background: currentGroup.color + '12', color: currentGroup.color }}>
                Try {currentGroup.label} Free →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Built For</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              One tool. Every type of marketer.
            </h2>
          </div>

          {/* Audience tabs */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
            {AUDIENCES.map((a, i) => (
              <button key={i} onClick={() => setActiveAudience(i)}
                style={{ padding: '8px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${activeAudience === i ? a.color : C.hairline}`,
                  background: activeAudience === i ? a.color + '15' : 'transparent',
                  color: activeAudience === i ? a.color : C.secondary, transition: 'all 0.15s',
                }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>

          <div style={{ borderRadius: 12, border: `1px solid ${currentAud.color}33`, background: currentAud.color + '06', padding: 'clamp(28px, 4vw, 44px)', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{currentAud.icon}</div>
            <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: C.primary, margin: '0 0 16px' }}>{currentAud.label}</h3>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.8, margin: '0 0 20px' }}>{currentAud.desc}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, border: `1px solid ${currentAud.color}44`, background: currentAud.color + '12' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: currentAud.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: currentAud.color }}>{currentAud.proof}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── REPLACES ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Replaces</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
              6 tools. $300+/month.<br />
              <span style={{ color: C.gold }}>Now one.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
            {REPLACES.map((r, i) => (
              <div key={i} style={{ padding: '16px 20px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 2, textDecoration: 'line-through', textDecorationColor: C.muted }}>{r.tool}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{r.use}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#cf6a6a', flexShrink: 0 }}>{r.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ fontSize: 13, color: C.secondary }}>
              Prompt CEO starts at <span style={{ color: C.gold, fontWeight: 700 }}>$29/month</span> — and does all of this in one place.
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Results</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              They tried it once. They never left.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ padding: '28px 24px', borderRadius: 10, border: `1px solid ${t.color}33`, background: t.color + '06' }}>
                <div style={{ fontSize: 28, color: t.color, marginBottom: 14, lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</div>
                <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.8, margin: '0 0 20px', fontStyle: 'italic' }}>{t.quote}</p>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES TEASER ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Proof</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>Real numbers from real campaigns.</h2>
            <p style={{ fontSize: 15, color: C.secondary, maxWidth: 460, margin: '0 auto' }}>Not testimonials. Actual results with specific metrics.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 32 }}>
            {[
              { metric: '3.4×',  label: 'ROAS',           detail: 'DTC skincare brand, 6 weeks',          color: C.gold   },
              { metric: '4.8%',  label: 'CTR',             detail: 'Cold traffic hook from VoC mining',     color: C.green  },
              { metric: '$240k', label: 'Launch revenue',  detail: 'Fitness supplement, first month',       color: C.violet },
              { metric: '60%',   label: 'Less delivery time', detail: 'Agency managing 8 clients',          color: C.blue   },
            ].map((s, i) => (
              <div key={i} style={{ padding: '20px', borderRadius: 10, border: `1px solid ${s.color}33`, background: s.color + '06', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: s.color, letterSpacing: -1, lineHeight: 1 }}>{s.metric}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, margin: '8px 0 4px' }}>{s.label}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{s.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => router.push('/case-studies')}
              style={{ padding: '12px 28px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              Read Full Case Studies →
            </button>
          </div>
        </div>
      </section>

      {/* ── THE STUDIO (secondary positioning) ── */}
      <section id="section-studio" style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>The Director's Studio</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Your face.<br />
              <span style={{ color: C.gold }}>20 worlds.</span><br />
              One afternoon.
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              The original Prompt CEO magic is still here. 12-layer cinematic prompt engine. 20+ worlds from Tokyo to Capri to Marrakech. 11 director styles. Story worlds with full character persistence. Every prompt is a film scene — not an AI output.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['20+ cinematic worlds — location, sub-location, and phase pools', '11 director styles: Kubrick, Malick, Wong Kar-wai and more', 'Story worlds: Boudoir, Rockstar, Power CEO, After Dark', 'Shot Director AI — cinematographer brief per scene', 'Brand DNA Lock — visual consistency across every generation'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: C.gold, fontSize: 11, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              Try the Studio Free →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['Tokyo',      'Neon · Aman suites · Shinjuku',     C.violet],
              ['Capri',      'Villa terrace · Faraglioni · Sea',  C.gold],
              ['Marrakech',  'Riad · Hammam · La Mamounia',       C.tension],
              ['Swiss Alps', 'Chalet · Slopes · Alpenglow',       C.blue],
              ['Boudoir',    'Silk · Candlelight · Private',      C.violet],
              ['Rockstar',   'Stage · Tour hotel · 4am',          C.gold],
              ['Power CEO',  'Boardroom · Private jet · Glass',   C.blue],
              ['Mega Yacht', 'Mediterranean · Deck · Sunset',     C.green],
            ].map(([name, desc, color]) => (
              <div key={name} style={{ padding: '13px 15px', borderRadius: 8, border: `1px solid ${color}33`, background: color + '06' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD STUDIO ── */}
      <section id="section-adstudio" style={{ padding: 'clamp(60px, 8vw, 100px) 24px', background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9b6fd4', marginBottom: 16 }}>AI Ad Studio</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Images. Video.<br />
              <span style={{ color: '#9b6fd4' }}>Music. One studio.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              Stop switching between Midjourney, CapCut, and Spotify. Generate scroll-stopping ad images in 5 style modes, build video storyboards with AI-ready prompts for Runway and Kling, and pick a licensed soundtrack matched to your exact mood and campaign — all without leaving the app.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['AI image generation — lifestyle, editorial, minimal, UGC, cinematic', 'Video storyboards with shot-by-shot direction + Runway/Kling prompts', 'Licensed music library matched by mood, energy, and BPM to your brief', 'AI timing plan that syncs your ad script to the music drop'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: '#9b6fd4', fontSize: 11, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid #9b6fd4`, background: '#9b6fd418', color: '#9b6fd4' }}>
              Try Ad Studio Free →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['Lifestyle', 'Tokyo · Aman suites', '#9b6fd4'], ['Editorial', 'Capri · Villa terrace', '#c8a84b'], ['Minimal', 'Clean · White studio', '#4a8ab4'], ['UGC', 'Natural · Handheld', '#4a9a6a']].map(([s, d, c]) => (
                <div key={s} style={{ padding: '20px 14px', borderRadius: 8, border: `1px solid ${c}33`, background: c + '08', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c, marginBottom: 3 }}>{s}</div>
                  <div style={{ fontSize: 9, color: C.muted }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 8, background: C.surface, border: `1px solid #c8a84b44` }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#c8a84b', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>AI Music Match — 96% fit</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, color: '#c8a84b' }}>♪</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>Diamond</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Luxury · High energy · 128 BPM · Drop at 0:32</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MUSIC INTELLIGENCE ── */}
      <section id="section-music" style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { title: 'Diamond',        mood: 'Luxury · Confident',  bpm: 128, match: 96, color: '#c8a84b' },
              { title: 'Midnight Drive', mood: 'Bold · Cinematic',    bpm: 124, match: 91, color: '#9b6fd4' },
              { title: 'Golden Hour',    mood: 'Emotional · Warm',    bpm: 100, match: 84, color: '#b4944a' },
              { title: 'Pure Energy',    mood: 'Hype · Explosive',    bpm: 140, match: 79, color: '#4a9a6a' },
              { title: 'After Dark',     mood: 'Mysterious · Sexy',   bpm: 96,  match: 74, color: '#9b6fd4' },
            ].map((t, i) => (
              <div key={i} style={{ padding: '12px 16px', borderRadius: 8, background: C.surface, border: `1px solid ${i === 0 ? t.color + '55' : C.hairline}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${t.color}44`, background: t.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: t.color, flexShrink: 0 }}>▶</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? t.color : C.primary }}>{t.title}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{t.mood} · {t.bpm} BPM</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: t.color }}>{t.match}%</div>
                  <div style={{ fontSize: 8, color: C.muted }}>AI match</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4a9a6a', marginBottom: 16 }}>Music Intelligence</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              AI-matched soundtracks<br />
              <span style={{ color: '#4a9a6a' }}>for every ad.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              Every track in the library is scored against your ad brief — mood, energy, campaign type, platform, and product fit. You get a ranked list with exactly why each track fits, plus an AI timing plan that maps the drop, hook, and CTA moments to your video script.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['Mood-matched recommendations from your brief', 'BPM, drop timing, hook window for every track', 'Licensed — use in any campaign without clearing rights', '$9/month Music Addon for unlimited access'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: '#4a9a6a', fontSize: 11, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid #4a9a6a`, background: '#4a9a6a18', color: '#4a9a6a' }}>
              Explore Music Library →
            </button>
          </div>
        </div>
      </section>

      {/* ── AFFILIATE PROGRAM ── */}
      <section id="section-affiliate" style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4a8ab4', marginBottom: 16 }}>Partner Program</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Earn 30% recurring<br />
              <span style={{ color: '#4a8ab4' }}>on every referral.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              Share your link. Every subscription you refer pays you 30% every single month — for as long as they stay subscribed. No cap, no tiers, no minimum. Real-time dashboard shows you exactly what's coming and when.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['30% recurring — paid every month indefinitely', 'Real-time dashboard with referral names + payout countdown', 'Ready-made share content for social and email', 'Monthly Stripe payouts — no minimum threshold'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: '#4a8ab4', fontSize: 11, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/partner')} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid #4a8ab4`, background: '#4a8ab418', color: '#4a8ab4' }}>
              Join the Partner Program →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'This month',   value: '$847',   color: '#4a9a6a' },
                { label: 'Referrals',    value: '14',     color: '#4a8ab4' },
                { label: 'Commission',   value: '30%',    color: '#c8a84b' },
                { label: 'Total earned', value: '$3,240', color: '#9b6fd4' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '20px', borderRadius: 8, border: `1px solid ${s.color}33`, background: s.color + '06', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: -0.5 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 8, background: C.surface, border: `1px solid #4a9a6a33`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Next payout</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#4a9a6a' }}>June 1, 2026</div>
              </div>
              <div style={{ fontSize: 11, color: C.secondary }}>via Stripe</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALWAYS EVOLVING ── */}
      <section id="section-updates" style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4a9a6a', marginBottom: 16 }}>Always Evolving</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              New features and worlds<br />
              <span style={{ color: '#4a9a6a' }}>every single week.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              This isn't a tool that launched and went quiet. New cinematic worlds, AI campaign tools, platform integrations, and creative features ship constantly — and every update goes live the moment it's ready. No installs. No app store. Just open it and it's already better.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['New cinematic worlds added every month', 'New AI tools and campaign systems weekly', 'Feature requests from the community actually ship', 'Every update is live instantly — nothing to install'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: '#4a9a6a', fontSize: 11, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid #4a9a6a`, background: '#4a9a6a18', color: '#4a9a6a' }}>
              Start Free — See What's Live →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>Recent updates</div>
            {[
              { text: 'Mega Yacht + Supermodel story worlds',      date: 'May 2026' },
              { text: 'Multi-mood music upload + track streaming', date: 'May 2026' },
              { text: 'Ad Studio v3 — image + video + music',     date: 'Apr 2026' },
              { text: 'Affiliate dashboard + payout tracking',     date: 'Apr 2026' },
              { text: 'Shot Director AI + Brand DNA Lock',         date: 'Mar 2026' },
              { text: 'Variation engine + coherence check',        date: 'Mar 2026' },
              { text: 'onlyfans-creator + swim-model worlds',      date: 'Mar 2026' },
              { text: 'Admin music upload panel',                  date: 'Feb 2026' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '9px 13px', borderRadius: 7, background: C.surface, border: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: '#000', background: '#4a9a6a', padding: '2px 6px', borderRadius: 3, flexShrink: 0, letterSpacing: 0.5 }}>NEW</span>
                <span style={{ fontSize: 11, color: C.secondary, flex: 1 }}>{item.text}</span>
                <span style={{ fontSize: 9, color: C.muted, flexShrink: 0 }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 80px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Simple Pricing</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 8px' }}>Replaces $300+/month of separate tools.</h2>
          <p style={{ fontSize: 14, color: C.secondary, marginBottom: 36 }}>Starting at $29/month. 7-day free trial on all plans.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { name: 'Creator',    price: '$29', color: C.blue   },
              { name: 'Studio Pro', price: '$49', color: C.green, popular: true },
              { name: 'Pro',        price: '$79', color: C.gold   },
              { name: 'Agency',     price: '$179', color: C.violet },
            ].map(p => (
              <div key={p.name} style={{ padding: '16px 20px', borderRadius: 8, border: `1px solid ${p.popular ? p.color : C.hairline}`, background: p.popular ? p.color + '10' : C.surface, minWidth: 120, textAlign: 'center', position: 'relative' }}>
                {p.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: p.color, color: '#000', fontSize: 8, fontWeight: 800, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: 1 }}>POPULAR</div>}
                <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.primary, letterSpacing: -1 }}>{p.price}</div>
                <div style={{ fontSize: 10, color: C.muted }}>/month</div>
              </div>
            ))}
          </div>
          <button onClick={goToPricing} style={{ padding: '12px 28px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            See Full Pricing →
          </button>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${C.gold}07 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(30px, 5.5vw, 56px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px' }}>
            Stop switching between<br />10 different tools.<br />
            <span style={{ color: C.gold }}>Do it all here.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Hooks, landing pages, email sequences, SMS campaigns, retargeting packs, video storyboards, ad audits, influencer briefs, product descriptions — and the most advanced cinematic prompt engine ever built.
          </p>
          <button onClick={goToLogin} style={{ padding: '16px 48px', borderRadius: 6, fontSize: 16, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000', letterSpacing: 0.3, marginBottom: 16 }}>
            Start Free — No Card Needed
          </button>
          <div style={{ fontSize: 12, color: C.muted }}>7-day free trial · Cancel anytime · No credit card required</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>PROMPT CEO</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={goToPricing}                               style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/case-studies')}        style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Case Studies</button>
          <button onClick={() => router.push('/partner')}             style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}               style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
          <button onClick={() => router.push('/tutorials')}           style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Tutorials</button>
          <button onClick={() => router.push('/terms')}               style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Terms</button>
          <button onClick={() => router.push('/privacy')}             style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Privacy</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
