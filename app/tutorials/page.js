'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b18',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a18',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd418',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab418',
}

const AD_STUDIO_STEPS = [
  {
    title: 'Fill in Product Details',
    icon: '📋',
    desc: 'Start by entering your product name, description, target customer, main problem, desire, benefit, offer, and CTA. The more detail you add, the smarter every generation becomes. This is the brain behind everything.',
    tips: [
      'Be specific — "women 25–35 who want to lose weight without giving up wine" beats "women"',
      'Fill in as many fields as possible — each one improves all 15 output tabs',
      'You can change any field at any time and regenerate',
    ],
  },
  {
    title: 'Pick Brand Voice & Platform',
    icon: '🎙',
    desc: 'Choose your brand voice — Luxury, Bold, Emotional, Clean, Aggressive, Feminine, Premium, or Friendly. Then set your platform (Instagram, TikTok, Facebook) and campaign goal (Sales, Leads, Awareness, Retargeting). These inject into every generation automatically.',
    tips: [
      'Brand voice shapes every word — choose the one that matches how your brand actually sounds',
      'Platform changes composition and format guidance for images and videos',
      'You can lock the brand voice to prevent it changing between generations',
    ],
  },
  {
    title: 'Build Full Ad Project (or go tab by tab)',
    icon: '⚡',
    desc: 'Click "Build Full Ad Project" on the Creative tab to auto-generate Angles → select the best → Hooks → select the best → Captions + UGC. Everything fills automatically. Or go tab by tab at your own pace.',
    tips: [
      'Build Full Ad Project takes about 60 seconds and fills 6 tabs at once',
      'Tab by tab gives you more control — you pick which angle and hook to use',
      'Always click "Use This Angle" before generating hooks — it injects context',
    ],
  },
  {
    title: 'Navigate with 6 Tab Groups',
    icon: '📑',
    desc: 'The Ad Studio is organized into 6 groups — Creative, Campaign, Funnel, Intel, Production, Account. Click any group to expand its sub-tabs. Each group has its own workflow. Creative is where you start. Campaign builds the sequence. Funnel converts the traffic. Intel tells you what works before you spend.',
    tips: [
      'Creative: Angles → Hooks → Captions → Images → Video → UGC',
      'Campaign: Campaign → Sequencer → Email → SMS → Calendar → Launch',
      'Funnel: Landing Page → Offer Builder → Retargeting → VoC (Testimonial Mining)',
      'Intel: Hook Score → Inspire → Trends → Ad Audit → A/B Tests',
      'Production: Script → Storyboard → Music → Product → Influencer',
      'Account: Naming → Clients → Swipe File → ROI',
    ],
  },
  {
    title: 'Use the Intelligence Layer',
    icon: '🧠',
    desc: 'After every generation, the Creative Director AI fires automatically — showing what works, what is weak, and the exact next action. Go to the Intel group for deeper analysis: score any hook before spending, get a real-time trend report, paste your ad account data for a complete creative action plan.',
    tips: [
      'Hook Score (Intel tab) — paste any hook, get a CTR prediction and 6-dimension score before launch',
      'Trends (Intel tab) — real-time report on what hook formats and visual styles are winning right now',
      'Audit (Intel tab) — paste your Meta or TikTok performance data, get a creative action plan',
      'Lock button on angles, hooks, brand voice, visual style, and music — injects into everything',
    ],
  },
  {
    title: 'Build the Full Funnel',
    icon: '▽',
    desc: 'Once your ads are ready, complete the funnel. Go to the Funnel group. Landing Page Copy generates hero, benefits, testimonials, and FAQ in your brand voice. Offer Builder structures your price anchoring, bonus stack, and guarantee. Retargeting generates 4 ad variations for every warm audience stage.',
    tips: [
      'Landing Page picks up your hook and caption automatically — maintains the emotional arc',
      'Offer Builder output formats separately for ad copy, email, and landing page',
      'Retargeting: choose the audience stage (site visitor, video viewer, add-to-cart, past buyer)',
      'VoC (Testimonial Mining): paste customer reviews and extract hooks in your customers\' own words',
    ],
  },
  {
    title: 'Production Assets',
    icon: '▶',
    desc: 'The Production group generates assets that actually get filmed or published. Talking Head Script gives you a teleprompter-ready script with delivery notes and hook variations. Video Storyboard generates a scene-by-scene breakdown with ready-to-paste Runway/Kling/Pika prompts.',
    tips: [
      'Script: pick duration (30/60/90s) and style (Founder, Expert, Direct Sell, Problem Solver)',
      'Teleprompter mode shows the script in large centered text — switch to it when filming',
      'Storyboard: each scene has a director note AND an AI video prompt ready to paste',
      'Product (Production tab): generates Amazon title + 5 bullets AND Shopify full description simultaneously',
    ],
  },
  {
    title: 'Add Music',
    icon: '🎵',
    desc: 'Go to the Music tab. AI recommends tracks from 400+ originals based on your campaign mood, platform, and goal. Preview free. License for your plan\'s included licenses or the $9 Music Add-on. Lock it and every generation adapts to the track energy.',
    tips: [
      'Featured tracks are curated specifically for campaign quality',
      'The "Sounds Like" strip on the Creative tab shows the top recommendation without you having to visit Music',
      'Locking music injects timing direction into video prompts and campaign stages',
    ],
  },
  {
    title: 'Deliver to Clients',
    icon: '🔗',
    desc: 'Click 📦 Pack to download everything as one .txt file. Click 🔗 Share to generate a client review link — they see a clean approval page and can approve or request changes. You never give them app access.',
    tips: [
      'Export Briefs generate professional Campaign, Creator, and Media Buyer documents',
      'Webhook: paste a Zapier or Make.com URL to push campaign data automatically',
      'Client approval triggers a notification — you can then iterate or launch',
    ],
  },
]

const STUDIO_STEPS = [
  {
    title: 'Upload Your Identity',
    icon: '📸',
    desc: 'Click the upload area in the Identity panel on the left. Upload a clear reference photo — face visible, good lighting. Click "Scan Identity" and AI extracts age, ethnicity, body type, hair, and eye description automatically.',
    tips: [
      'Use a high-quality photo with clear facial features',
      'You can edit the extracted description manually after scanning',
      'Character DNA lets you save this setup and reload it instantly next time',
    ],
  },
  {
    title: 'Pick a World',
    icon: '🌍',
    desc: 'Choose a Location World (Tokyo, Capri, Mykonos, Marrakech, Swiss Alps, New York, Santorini, Dubai, Malibu, Bali, Amalfi, Venice, Paris, Monaco + more) or a Story World (Supermodel Life, Desert Queen, Wild Nature, Neon City, High Society, Lingerie, Intimate Creator). Each world has phases that progress through a full day.',
    tips: [
      'Location worlds follow a day arc — wake, morning, afternoon, golden hour, dinner, night',
      'Story worlds define a lifestyle — the AI uses the world\'s vocabulary in every prompt',
      'Custom Worlds: build your own location with a name, atmosphere, lighting, and mood',
    ],
  },
  {
    title: 'Choose a Director',
    icon: '🎬',
    desc: 'Apply a director\'s visual language: Kubrick (cold, symmetrical, tension), Wong Kar-wai (saturated longing, slow motion), Fincher (desaturated, clinical tension), Malick (golden hour, nature, whisper), Noé (neon, confrontational, extreme), and 6 more. Each one changes how the scene is composed and lit.',
    tips: [
      'Kubrick works best for controlled, architectural, high-status scenes',
      'Wong Kar-wai is perfect for intimate, emotional, and golden-hour sequences',
      'Try locking a director with the 🔒 button to keep consistency across the whole sequence',
    ],
  },
  {
    title: 'Set Progression',
    icon: '📊',
    desc: 'Drag the slider to position your scene in the cinematic arc. Tease (0–33%) → Tension (33–66%) → Payoff (66–100%). The AI adjusts language, proximity, and energy automatically based on position. Early scenes establish, later scenes reveal.',
    tips: [
      'For a full sequence, use Build Full Sequence instead of moving the slider manually',
      'Tease phase: establishing shots, environment, distance',
      'Payoff phase: close, intimate, resolved, the emotional peak',
    ],
  },
  {
    title: 'Generate Your Scene',
    icon: '▶',
    desc: 'Click Generate Scene. The prompt appears in the output panel with the full cinematic direction. Shot Director AI fires automatically — showing what works cinematically, what to fix, and exact direction for the next shot. Free, every time.',
    tips: [
      'Generate Image button appears in the output panel — generates directly inside the app',
      'No identity required for direct image generation',
      'Copy prompt buttons export to Midjourney (--ar 2:3 --style raw), Runway, or Kling format',
    ],
  },
  {
    title: 'Use Layer Swap',
    icon: '↺',
    desc: 'Click ↺ Wardrobe, ↺ Scene, ↺ Camera, ↺ Mood, or ↺ Lighting to regenerate just that element while keeping everything else. A gold banner appears confirming the change. Click Regenerate Image to see the result.',
    tips: [
      'Layer swap is how you iterate — change one thing at a time, not everything',
      'Wardrobe swap is the most common — change the outfit, keep the scene and lighting',
      'The gold banner shows exactly what changed so you always know the current state',
    ],
  },
  {
    title: 'Run a Full Sequence',
    icon: '⚡',
    desc: 'Click ⚡ Full Sequence to generate your entire scene count as a smart progression. Each shot gets specific cinematic direction based on its arc position — establishing, arrival, building, tension, peak, resolution, aftermath. All scenes generate at once.',
    tips: [
      'Set your scene count before running — 10 scenes is a good starting point',
      'After the sequence runs, switch to Timeline view to see all scenes at once',
      'Generate All Images button in the Timeline header generates every scene image at once',
    ],
  },
  {
    title: 'Export Your Work',
    icon: '📤',
    desc: 'From the Timeline, export all prompts as a .txt file. Each prompt is pre-formatted for your chosen platform. The Photographer Brief button generates a real-world shoot document — character, wardrobe, lighting, shot list, director notes. Download as .txt for your team.',
    tips: [
      'Photographer Brief is available after running a batch sequence',
      'MJ, Runway, and Kling export buttons appear on every individual scene card',
      'Prompt Library: star ⭐ your best prompts to save them for future sessions',
    ],
  },
]

function StepCard({ step, index, color, isOpen, onToggle }) {
  return (
    <div style={{ borderRadius: 10, border: `1px solid ${isOpen ? color + '55' : C.hairline}`, background: isOpen ? color + '06' : C.surface, overflow: 'hidden', transition: 'all 0.2s' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: isOpen ? color : C.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: isOpen ? '#000' : C.muted, flexShrink: 0, transition: 'all 0.2s' }}>
          {index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>{step.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: isOpen ? color : C.primary }}>{step.title}</span>
          </div>
        </div>
        <span style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{ padding: '0 20px 20px' }}>
          <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.75, marginBottom: 16 }}>{step.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {step.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: color, fontSize: 11, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function TutorialsPage() {
  const router   = useRouter()
  const supabase = createClient()
  const [user,       setUser]       = useState(null)
  const [activeTab,  setActiveTab]  = useState('ad')
  const [openSteps,  setOpenSteps]  = useState({ ad: new Set([0]), studio: new Set([0]) })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  const toggleStep = (tab, index) => {
    setOpenSteps(prev => {
      const next = new Set(prev[tab])
      next.has(index) ? next.delete(index) : next.add(index)
      return { ...prev, [tab]: next }
    })
  }

  const expandAll = (tab) => {
    const steps = tab === 'ad' ? AD_STUDIO_STEPS : STUDIO_STEPS
    setOpenSteps(prev => ({ ...prev, [tab]: new Set(steps.map((_, i) => i)) }))
  }

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>
          PROMPT CEO
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          {user ? (
            <>
              <button onClick={() => router.push('/account')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>My Account</button>
              <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '7px 18px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Open App
              </button>
            </>
          ) : (
            <>
              <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Sign In</button>
              <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '7px 18px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Start Free Trial
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 100, paddingBottom: 48, textAlign: 'center', padding: '100px 24px 48px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${C.gold}06 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>Step-by-Step Tutorials</span>
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, margin: '0 0 16px' }}>
            Learn how to use<br />
            <span style={{ color: C.gold }}>every part of the app.</span>
          </h1>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, maxWidth: 480, margin: '0 auto' }}>
            Two complete walkthroughs — Ad Studio for brand campaigns, Director's Studio for cinematic content. Click any step to expand it.
          </p>
        </div>
      </section>

      {/* TAB SWITCHER */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 32px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: `1px solid ${C.hairline}`, paddingBottom: 0 }}>
          {[
            { id: 'ad',     label: '📣 Ad Studio',          color: C.violet },
            { id: 'studio', label: "🎬 Director's Studio",  color: C.green  },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px', borderRadius: '6px 6px 0 0', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', border: `1px solid ${activeTab === tab.id ? tab.color + '55' : C.hairline}`,
                borderBottom: activeTab === tab.id ? `1px solid ${C.void}` : `1px solid ${C.hairline}`,
                background: activeTab === tab.id ? tab.color + '10' : C.surface,
                color: activeTab === tab.id ? tab.color : C.muted,
                marginBottom: -1, transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* AD STUDIO */}
        {activeTab === 'ad' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.violet, marginBottom: 4 }}>Ad Studio</div>
                <div style={{ fontSize: 13, color: C.secondary }}>7 steps from product brief to client delivery</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => expandAll('ad')} style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
                  Expand All
                </button>
                <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: C.violetGlow, color: C.violet }}>
                  Open Ad Studio →
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AD_STUDIO_STEPS.map((step, i) => (
                <StepCard
                  key={i}
                  step={step}
                  index={i}
                  color={C.violet}
                  isOpen={openSteps.ad.has(i)}
                  onToggle={() => toggleStep('ad', i)}
                />
              ))}
            </div>

            {/* Quick reference */}
            <div style={{ marginTop: 32, borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Quick Reference — The 15 Tabs</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                {[
                  ['Creative',   'Image & video ads'],
                  ['Angles',     '10 psychological directions'],
                  ['Hooks',      '50 hooks across 5 types'],
                  ['Captions',   '6 caption styles'],
                  ['Images',     '6 image ad prompts'],
                  ['Video',      '4 video prompts'],
                  ['UGC',        '4 creator scripts'],
                  ['Campaign',   '10-stage full funnel'],
                  ['Score',      '8-dimension rating'],
                  ['Music',      '400+ AI-matched tracks'],
                  ['Launch',     '5-stage launch sequence'],
                  ['Calendar',   '30-day content plan'],
                  ['A/B Tests',  'Test & learn engine'],
                  ['ROI',        'Spend projector'],
                  ['Inspire',    'Competitor analysis'],
                ].map(([tab, desc]) => (
                  <div key={tab} style={{ padding: '8px 10px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.violet, marginBottom: 2 }}>{tab}</div>
                    <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DIRECTOR'S STUDIO */}
        {activeTab === 'studio' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.green, marginBottom: 4 }}>Director's Studio</div>
                <div style={{ fontSize: 13, color: C.secondary }}>8 steps from identity to full cinematic sequence</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => expandAll('studio')} style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
                  Expand All
                </button>
                <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.greenDim}`, background: C.greenGlow, color: C.green }}>
                  Open Studio →
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STUDIO_STEPS.map((step, i) => (
                <StepCard
                  key={i}
                  step={step}
                  index={i}
                  color={C.green}
                  isOpen={openSteps.studio.has(i)}
                  onToggle={() => toggleStep('studio', i)}
                />
              ))}
            </div>

            {/* Quick reference */}
            <div style={{ marginTop: 32, borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Quick Reference — Worlds</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 6 }}>
                {[
                  'Tokyo', 'Mykonos', 'Capri', 'Santorini', 'Marrakech',
                  'Swiss Alps', 'New York', 'Dubai', 'Malibu', 'Tulum',
                  'Paris', 'Monaco', 'Bali', 'Amalfi', 'Venice',
                  'Supermodel Life', 'Desert Queen', 'Wild Nature', 'Neon City', 'High Society',
                ].map(w => (
                  <div key={w} style={{ padding: '6px 10px', borderRadius: 5, border: `1px solid ${C.hairline}`, background: C.base, fontSize: 11, color: C.secondary, textAlign: 'center' }}>
                    {w}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: 'center', padding: '40px 24px', borderRadius: 12, border: `1px solid ${C.goldDim}`, background: C.goldGlow }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.gold, marginBottom: 8 }}>Ready to start?</div>
          <div style={{ fontSize: 13, color: C.secondary, marginBottom: 24 }}>Everything you just read is waiting for you inside the app.</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '12px 28px', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000' }}>
              Open the App
            </button>
            <button onClick={() => router.push('/pricing')} style={{ padding: '12px 28px', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}>
              See Pricing →
            </button>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 40 }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
