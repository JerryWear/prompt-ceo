'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:      '#040404',
  surface: '#0a0a0a',
  raised:  '#111111',
  border:  '#1c1c1c',
  subtle:  '#242424',
  gold:    '#c4a45a',
  goldDim: '#2a200a',
  green:   '#7adf7a',
  primary: '#f0ede6',
  secondary: '#a09888',
  muted:   '#5a5650',
  ghost:   '#303030',
}

// ─── Step data ────────────────────────────────────────────────────────────────
const TYPES = [
  { id: 'product',        icon: '📦', label: 'Product',        desc: 'Physical or consumer good' },
  { id: 'ecommerce',      icon: '🛒', label: 'Ecommerce',      desc: 'Online store or retail' },
  { id: 'personal_brand', icon: '👤', label: 'Personal Brand', desc: 'Thought leader or expert' },
  { id: 'fitness',        icon: '💪', label: 'Fitness',        desc: 'Trainer, gym or wellness' },
  { id: 'coaching',       icon: '🎯', label: 'Coaching',       desc: 'Consulting or services' },
  { id: 'creator',        icon: '🎬', label: 'Creator',        desc: 'Content or influencer' },
  { id: 'fashion',        icon: '👗', label: 'Fashion',        desc: 'Clothing or accessories' },
  { id: 'saas',           icon: '💻', label: 'SaaS',           desc: 'Software or digital tool' },
  { id: 'luxury',         icon: '💎', label: 'Luxury',         desc: 'Premium or high-end brand' },
  { id: 'agency',         icon: '🏢', label: 'Agency',         desc: 'Professional services' },
  { id: 'local_business', icon: '📍', label: 'Local Business', desc: 'Community-based brand' },
  { id: 'subscription',   icon: '♾️', label: 'Subscription',   desc: 'Membership or recurring' },
  { id: 'app',            icon: '📱', label: 'App',            desc: 'Mobile or web application' },
]

const GOALS = [
  { id: 'sales',               icon: '💰', label: 'Sales',               desc: 'Drive direct purchases' },
  { id: 'leads',               icon: '🎣', label: 'Leads',               desc: 'Capture qualified contacts' },
  { id: 'followers',           icon: '👥', label: 'Followers',           desc: 'Grow your audience' },
  { id: 'brand_awareness',     icon: '📣', label: 'Brand Awareness',     desc: 'Build recognition' },
  { id: 'app_installs',        icon: '⬇️', label: 'App Installs',        desc: 'Drive downloads' },
  { id: 'creator_growth',      icon: '📈', label: 'Creator Growth',      desc: 'Expand creator reach' },
  { id: 'high_ticket',         icon: '👑', label: 'High Ticket',         desc: 'Land premium clients' },
  { id: 'viral_reach',         icon: '🔥', label: 'Viral Reach',         desc: 'Maximize organic spread' },
  { id: 'premium_positioning', icon: '✦',  label: 'Premium Positioning', desc: 'Establish elite status' },
]

const STYLES = [
  { id: 'luxury',               icon: '💎', label: 'Luxury',               desc: 'Cinematic, aspirational' },
  { id: 'cinematic',            icon: '🎞️', label: 'Cinematic',            desc: 'Editorial, dramatic' },
  { id: 'ugc',                  icon: '📱', label: 'UGC',                  desc: 'Authentic, creator-style' },
  { id: 'emotional',            icon: '💫', label: 'Emotional',            desc: 'Human, heartfelt' },
  { id: 'viral',                icon: '⚡', label: 'Viral',                desc: 'High energy, shareable' },
  { id: 'dark_luxury',          icon: '🖤', label: 'Dark Luxury',          desc: 'Moody, high fashion' },
  { id: 'high_energy',          icon: '🔥', label: 'High Energy',          desc: 'Dynamic, kinetic' },
  { id: 'soft_feminine',        icon: '🌸', label: 'Soft Feminine',        desc: 'Pastel, organic' },
  { id: 'corporate_authority',  icon: '🏛️', label: 'Authority',            desc: 'Professional, confident' },
  { id: 'fitness_motivation',   icon: '🏋️', label: 'Fitness',             desc: 'Athletic, transformative' },
  { id: 'high_status',          icon: '👑', label: 'High Status',          desc: 'Elite, exclusive' },
  { id: 'aspirational_lifestyle', icon: '🌅', label: 'Aspirational',       desc: 'Dream life, freedom' },
]

const LOADING_LINES = [
  'Orchestrating your campaign…',
  'Selecting worlds and visual systems…',
  'Generating hooks and psychological angles…',
  'Building captions for ' ,
  'Composing your 30-day schedule…',
  'Finalising campaign assets…',
]

// ─── Main page ────────────────────────────────────────────────────────────────
export default function InstantPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [step,        setStep]        = useState(1) // 1 | 2 | 3 | 'building' | 'results'
  const [productName, setProductName] = useState('')
  const [type,        setType]        = useState('')
  const [goal,        setGoal]        = useState('')
  const [style,       setStyle]       = useState('')
  const [result,      setResult]      = useState(null)
  const [error,       setError]       = useState('')
  const [loadingLine, setLoadingLine] = useState(LOADING_LINES[0])
  const [copied,      setCopied]      = useState(null)
  const [expanded,    setExpanded]    = useState({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/prompt-engine-v3/login')
    })
  }, [])

  const build = async () => {
    if (!productName.trim() || !type || !goal || !style) return
    setStep('building')
    setError('')

    let lineIdx = 0
    setLoadingLine(LOADING_LINES[0])
    const interval = setInterval(() => {
      lineIdx = Math.min(lineIdx + 1, LOADING_LINES.length - 1)
      setLoadingLine(
        lineIdx === 3
          ? `Building captions for ${productName}…`
          : LOADING_LINES[lineIdx]
      )
    }, 2200)

    try {
      const res  = await fetch('/api/instant-campaign', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ type, goal, style, productName: productName.trim() }),
      })
      const data = await res.json()
      clearInterval(interval)
      if (data.error) { setError(data.error); setStep(3); return }
      setResult(data)
      setStep('results')
    } catch (err) {
      clearInterval(interval)
      setError(err.message || 'Something went wrong')
      setStep(3)
    }
  }

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggle = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }))

  const openInStudio = () => {
    if (result) {
      try { sessionStorage.setItem('promptceo_instant_bridge', JSON.stringify(result)) } catch {}
    }
    router.push('/prompt-engine-v3')
  }

  const downloadZip = async () => {
    if (!result) return
    const JSZip  = (await import('jszip')).default
    const zip    = new JSZip()
    const slug   = productName.replace(/\s+/g, '-').toLowerCase()
    const folder = zip.folder(`${slug}-campaign`)
    if (result.hooks?.length)
      folder.file('hooks.txt', result.hooks.map((h, i) => `${i + 1}. ${h}`).join('\n\n'))
    if (result.angles?.length)
      folder.file('angles.txt', result.angles.map((a, i) => `${i + 1}. ${a}`).join('\n\n'))
    if (result.captions?.length)
      folder.file('captions.txt', result.captions.map((c, i) => `--- Caption ${i + 1} ---\n${c}`).join('\n\n'))
    if (result.imagePrompts?.length)
      folder.file('image-prompts.txt', result.imagePrompts.map((p, i) => `${i + 1}. ${p}`).join('\n\n'))
    if (result.schedule?.length)
      folder.file('30-day-schedule.txt', result.schedule.map(d =>
        `Day ${d.day}${d.time ? ` @ ${d.time}` : ''} [${d.content_type || 'post'}]: ${d.theme || ''}`
      ).join('\n'))
    folder.file('README.txt', [
      `${productName} — Full Campaign`,
      `Generated by PromptCEO Instant™ · ${new Date().toLocaleDateString()}`,
      `Style: ${style.replace(/_/g, ' ')}`,
      `Goal: ${goal.replace(/_/g, ' ')}`,
      `Platform: ${result.orchestration?.platform || ''}`,
    ].join('\n'))
    const blob = await zip.generateAsync({ type: 'blob' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `${slug}-campaign.zip`
    a.click()
    URL.revokeObjectURL(url)
  }

  const startOver = () => {
    setStep(1); setType(''); setGoal(''); setStyle('')
    setProductName(''); setResult(null); setError(''); setExpanded({})
  }

  // ── Building state ──────────────────────────────────────────────────────────
  if (step === 'building') {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ marginBottom: 32, position: 'relative', width: 64, height: 64 }}>
          <div style={{ position: 'absolute', inset: 0, border: `2px solid ${C.gold}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 8, border: `1px solid ${C.gold}44`, borderBottomColor: 'transparent', borderRadius: '50%', animation: 'spin 1.4s linear infinite reverse' }} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>Building Your Campaign</div>
        <div style={{ fontSize: 14, color: C.secondary, minHeight: 22 }}>{loadingLine}</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  // ── Results ─────────────────────────────────────────────────────────────────
  if (step === 'results' && result) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: C.primary }}>
        {/* Top bar */}
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: C.gold, textTransform: 'uppercase' }}>PromptCEO Instant™</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={startOver} style={ghostBtn}>← New Campaign</button>
            <button onClick={openInStudio} style={{ ...ghostBtn, color: C.gold, borderColor: C.gold + '44' }}>Open in Studio →</button>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px' }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 20, background: C.goldDim, border: `1px solid ${C.gold}33`, marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: C.gold }}>✦</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: 'uppercase' }}>Campaign Ready</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.primary, marginBottom: 6 }}>{productName}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{result.orchestration?.summary}</div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 32 }}>
            {[
              ['Hooks',         result.hooks?.length],
              ['Angles',        result.angles?.length],
              ['Captions',      result.captions?.length],
              ['Image Prompts', result.imagePrompts?.length],
              ['Schedule Days', result.schedule?.length],
            ].map(([label, count]) => (
              <div key={label} style={{ padding: '12px 14px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.gold }}>{count || 0}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
            <button onClick={downloadZip} style={actionBtn(C.gold)}>📦 Download ZIP</button>
            <button onClick={openInStudio} style={actionBtn(C.green)}>🎬 Generate Images in Studio</button>
            <button onClick={openInStudio} style={actionBtn('#6a9af0')}>📹 Generate Video Prompts</button>
          </div>

          {/* Hooks */}
          <ResultSection title="Hooks" count={result.hooks?.length} icon="✦" expanded={expanded.hooks} onToggle={() => toggle('hooks')}>
            {(result.hooks || []).map((h, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
                  <div style={{ flex: 1, fontSize: 14, color: C.primary, lineHeight: 1.6 }}>{h}</div>
                  <button onClick={() => copy(h, `hook_${i}`)} style={copyBtn(copied === `hook_${i}`)}>
                    {copied === `hook_${i}` ? '✓' : '⎘'}
                  </button>
                </div>
              </div>
            ))}
          </ResultSection>

          {/* Angles */}
          {result.angles?.length > 0 && (
            <ResultSection title="Marketing Angles" count={result.angles?.length} icon="🎯" expanded={expanded.angles} onToggle={() => toggle('angles')}>
              {(result.angles || []).map((a, i) => (
                <div key={i} style={itemCard}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
                    <div style={{ flex: 1, fontSize: 13, color: C.secondary, lineHeight: 1.6 }}>{a}</div>
                    <button onClick={() => copy(a, `angle_${i}`)} style={copyBtn(copied === `angle_${i}`)}>
                      {copied === `angle_${i}` ? '✓' : '⎘'}
                    </button>
                  </div>
                </div>
              ))}
            </ResultSection>
          )}

          {/* Captions */}
          <ResultSection title="Captions" count={result.captions?.length} icon="✍️" expanded={expanded.captions} onToggle={() => toggle('captions')}>
            {(result.captions || []).map((c, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
                  <div style={{ flex: 1, fontSize: 13, color: C.secondary, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{c}</div>
                  <button onClick={() => copy(c, `cap_${i}`)} style={copyBtn(copied === `cap_${i}`)}>
                    {copied === `cap_${i}` ? '✓' : '⎘'}
                  </button>
                </div>
              </div>
            ))}
          </ResultSection>

          {/* Image prompts */}
          <ResultSection title="Image Prompts" count={result.imagePrompts?.length} icon="🖼️" expanded={expanded.images} onToggle={() => toggle('images')}>
            {(result.imagePrompts || []).map((p, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
                  <div style={{ flex: 1, fontSize: 11, color: C.muted, lineHeight: 1.6, fontFamily: 'monospace' }}>{p}</div>
                  <button onClick={() => copy(p, `img_${i}`)} style={copyBtn(copied === `img_${i}`)}>
                    {copied === `img_${i}` ? '✓' : '⎘'}
                  </button>
                </div>
              </div>
            ))}
          </ResultSection>

          {/* 30-day schedule */}
          {result.schedule?.length > 0 && (
            <ResultSection title="30-Day Schedule" count={result.schedule?.length} icon="📅" expanded={expanded.schedule} onToggle={() => toggle('schedule')}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
                {(result.schedule || []).map((d, i) => (
                  <div key={i} style={{ padding: '8px 10px', borderRadius: 6, background: C.surface, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, marginBottom: 2 }}>Day {d.day}{d.time ? ` · ${d.time}` : ''}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>[{d.content_type}] {d.theme}</div>
                  </div>
                ))}
              </div>
            </ResultSection>
          )}

          {/* Footer CTA */}
          <div style={{ marginTop: 40, padding: '20px 24px', borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 2 }}>Want full creative control?</div>
              <div style={{ fontSize: 12, color: C.muted }}>Open this campaign in Studio to generate images, lock angles, and build advanced sequences.</div>
            </div>
            <button onClick={openInStudio} style={{ padding: '10px 20px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}55`, background: C.goldDim, color: C.gold, whiteSpace: 'nowrap' }}>
              Open in Studio →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Wizard steps 1–3 ────────────────────────────────────────────────────────
  const stepConfig = {
    1: { title: 'What are you promoting?',    subtitle: 'Choose a category that best describes your brand or product' },
    2: { title: 'What is the goal?',           subtitle: 'PromptCEO will optimise every element for this objective' },
    3: { title: 'What style do you want?',     subtitle: 'This shapes the visual world, tone, and emotional direction' },
  }

  const items   = step === 1 ? TYPES : step === 2 ? GOALS : STYLES
  const selected = step === 1 ? type  : step === 2 ? goal  : style
  const setSelected = step === 1 ? setType : step === 2 ? setGoal : setStyle

  const canContinue = step === 1
    ? (productName.trim().length > 0 && type !== '')
    : step === 2 ? goal !== '' : style !== ''

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: C.primary }}>
      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: C.gold, textTransform: 'uppercase' }}>PromptCEO Instant™</div>
        <a href="/prompt-engine-v3" style={{ fontSize: 11, color: C.muted, textDecoration: 'none' }}>Open Studio →</a>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 120px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, justifyContent: 'center' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: n < step ? 28 : n === step ? 28 : 24,
                height: n < step ? 28 : n === step ? 28 : 24,
                borderRadius: '50%',
                border: `2px solid ${n <= step ? C.gold : C.ghost}`,
                background: n < step ? C.gold : n === step ? C.goldDim : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800,
                color: n < step ? '#000' : n === step ? C.gold : C.ghost,
                transition: 'all 0.2s',
              }}>
                {n < step ? '✓' : n}
              </div>
              {n < 3 && <div style={{ width: 40, height: 1, background: n < step ? C.gold + '55' : C.ghost }} />}
            </div>
          ))}
        </div>

        {/* Step title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{stepConfig[step].title}</div>
          <div style={{ fontSize: 13, color: C.muted }}>{stepConfig[step].subtitle}</div>
        </div>

        {/* Product name input — only on step 1 */}
        {step === 1 && (
          <div style={{ marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Brand or product name…"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 9,
                border: `1px solid ${productName.trim() ? C.gold + '55' : C.border}`,
                background: C.surface, color: C.primary,
                fontSize: 15, outline: 'none', fontFamily: 'inherit',
                boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
            />
          </div>
        )}

        {/* Option grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
          {items.map(item => (
            <OptionCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              desc={item.desc}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 7, background: '#110606', border: '1px solid #2a1010', fontSize: 12, color: '#f87171', marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => { setError(''); setStep(s => s - 1) }}
            style={{ ...ghostBtn, visibility: step > 1 ? 'visible' : 'hidden' }}
          >
            ← Back
          </button>
          <button
            onClick={step < 3 ? () => setStep(s => s + 1) : build}
            disabled={!canContinue}
            style={{
              padding: '12px 28px', borderRadius: 8,
              fontSize: 13, fontWeight: 700, cursor: canContinue ? 'pointer' : 'not-allowed',
              border: `1px solid ${canContinue ? C.gold : C.ghost}`,
              background: canContinue ? 'linear-gradient(180deg, #1a1408, #0c0a04)' : 'transparent',
              color: canContinue ? C.gold : C.ghost,
              transition: 'all 0.2s',
            }}
          >
            {step < 3 ? 'Continue →' : '✦ Build My Campaign'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function OptionCard({ icon, label, desc, selected, onSelect }) {
  const [hover, setHover] = useState(false)
  const active = selected || hover

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '1 1 140px', maxWidth: 200,
        padding: '14px 14px', borderRadius: 9,
        border: `1px solid ${selected ? C.gold : hover ? C.gold + '44' : C.border}`,
        background: selected ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : hover ? C.surface : 'transparent',
        cursor: 'pointer', transition: 'all 0.15s',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: selected ? C.gold : active ? C.secondary : C.muted }}>{label}</div>
      <div style={{ fontSize: 10, color: C.ghost, lineHeight: 1.4 }}>{desc}</div>
    </div>
  )
}

function ResultSection({ title, count, icon, expanded, onToggle, children }) {
  return (
    <div style={{ marginBottom: 16, borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', padding: '14px 18px', background: C.surface,
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14 }}>{icon}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{title}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, padding: '2px 7px', borderRadius: 10, background: C.goldDim }}>{count}</span>
        </div>
        <span style={{ fontSize: 10, color: C.muted }}>{expanded ? '▲ Collapse' : '▼ Expand'}</span>
      </button>
      {expanded && (
        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6, background: C.bg }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Shared style helpers ─────────────────────────────────────────────────────
const ghostBtn = {
  padding: '8px 14px', borderRadius: 6, fontSize: 11, fontWeight: 600,
  cursor: 'pointer', border: `1px solid ${C.border}`,
  background: 'transparent', color: C.muted,
}

const itemCard = {
  padding: '10px 12px', borderRadius: 7,
  background: C.surface, border: `1px solid ${C.border}`,
}

const copyBtn = (active) => ({
  padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
  cursor: 'pointer', flexShrink: 0,
  border: `1px solid ${active ? '#2a4a2a' : C.border}`,
  background: active ? '#081208' : 'transparent',
  color: active ? C.green : C.muted,
  transition: 'all 0.15s',
})

const actionBtn = (color) => ({
  padding: '10px 18px', borderRadius: 7, fontSize: 12, fontWeight: 700,
  cursor: 'pointer', border: `1px solid ${color}44`,
  background: `${color}0f`, color: color,
  transition: 'all 0.15s',
})
