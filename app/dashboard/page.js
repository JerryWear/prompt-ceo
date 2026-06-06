'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:      '#020202',
  deep:      '#050505',
  base:      '#080808',
  surface:   '#0d0d0d',
  raised:    '#111111',
  border:    '#1a1a1a',
  subtle:    '#222222',
  primary:   '#ede9e1',
  secondary: '#ccc8c2',
  muted:     '#9e9a96',
  ghost:     '#6e6a66',
  gold:      '#c8a84b',
  goldDim:   '#1a1408',
  goldGlow:  'rgba(200,168,75,0.12)',
  blue:      '#4a8ab4',
  blueGlow:  'rgba(74,138,180,0.1)',
  violet:    '#9b6fd4',
  green:     '#4a9a6a',
  greenDim:  '#0a1a0f',
}

const STUDIOS = [
  { icon: '◧', label: 'Studio',      sub: 'Cinematic images & worlds',    path: '/prompt-engine-v3', query: 'studio',    color: C.blue,    glow: C.blueGlow },
  { icon: '▣', label: 'Ad Studio',   sub: 'Hooks, copy & campaigns',       path: '/prompt-engine-v3', query: 'ad_studio', color: '#c87a4a', glow: 'rgba(200,122,74,0.10)' },
  { icon: '✂', label: 'Edit Studio', sub: 'Turn footage into finished ads', path: '/edit-studio/v2',   query: null,        color: C.violet,  glow: 'rgba(155,111,212,0.10)' },
]

const NAV = [
  { label: 'Home',        href: '/dashboard',                       active: true },
  { label: 'Studio',      href: '/prompt-engine-v3?view=studio',    active: false },
  { label: 'Ad Studio',   href: '/prompt-engine-v3?view=ad_studio', active: false },
  { label: 'Edit Studio', href: '/edit-studio/v2',                  active: false },
  { label: 'Brands',      href: '/brands',                          active: false },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const router   = useRouter()
  const supabase = createClient()

  const [user,          setUser]          = useState(null)
  const [brandProfiles, setBrandProfiles] = useState([])
  const [activeBrand,   setActiveBrand]   = useState(null)
  const [brandDropOpen, setBrandDropOpen] = useState(false)
  const [briefing,      setBriefing]      = useState(null)
  const [activityFeed,  setActivityFeed]  = useState([])
  const [chatInput,     setChatInput]     = useState('')
  const [chatLoading,   setChatLoading]   = useState(false)
  const [chatResult,    setChatResult]    = useState(null)
  const [chatError,     setChatError]     = useState('')

  const chatRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.replace('/prompt-engine-v3/login'); return }
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/api/brand-profiles').then(r => r.json()).catch(() => []),
      fetch('/api/home-briefing').then(r => r.json()).catch(() => null),
      fetch('/api/activity-feed').then(r => r.json()).catch(() => null),
    ]).then(([brands, briefingData, feedData]) => {
      if (Array.isArray(brands) && brands.length > 0) {
        setBrandProfiles(brands)
        try {
          const savedId = localStorage.getItem('promptceo_active_brand_id')
          const saved   = savedId ? brands.find(b => b.id === savedId) : null
          setActiveBrand(saved || brands[0])
        } catch {
          setActiveBrand(brands[0])
        }
      }
      if (briefingData && !briefingData.error) setBriefing(briefingData)
      if (feedData?.feed)                       setActivityFeed(feedData.feed)
    })
  }, [])

  const switchBrand = (brand) => {
    setActiveBrand(brand)
    setBrandDropOpen(false)
    try { localStorage.setItem('promptceo_active_brand_id', brand?.id || '') } catch {}
  }

  const openStudio = (s) => {
    if (s.query) router.push(`${s.path}?view=${s.query}`)
    else         router.push(s.path)
  }

  const runChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    setChatLoading(true)
    setChatError('')
    setChatResult(null)
    try {
      const res  = await fetch('/api/creative-conversation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput.trim(), brandProfile: activeBrand || null, parseOnly: true }),
      })
      const data = await res.json()
      if (data.error) { setChatError(data.error); setChatLoading(false); return }
      setChatResult(data)
      try { sessionStorage.setItem('promptceo_chat_intent', JSON.stringify({ ...data, originalMessage: chatInput.trim() })) } catch {}
      setTimeout(() => {
        const dest = data.output_type === 'perfect_day' ? 'perfect_day' : 'full_campaign'
        router.push(`/prompt-engine-v3?view=${dest}`)
      }, 1400)
    } catch (err) {
      setChatError(err.message || 'Something went wrong')
    }
    setChatLoading(false)
  }

  // ── Briefing lines ───────────────────────────────────────────────────────────
  const briefingLines = []
  if (briefing) {
    if (briefing.adsThisWeek > 0)
      briefingLines.push(`You generated ${briefing.adsThisWeek} ad${briefing.adsThisWeek !== 1 ? 's' : ''} this week.`)
    if (briefing.strongestAngle)
      briefingLines.push(`Strongest angle: ${briefing.strongestAngle}.`)
    if (briefing.topPlatform && briefing.adsThisWeek > 0)
      briefingLines.push(`Most active on: ${briefing.topPlatform}.`)
    if (briefing.activeEditProject?.status === 'render_complete')
      briefingLines.push(`"${briefing.activeEditProject.title}" is ready to review.`)
    else if (briefing.activeEditProject)
      briefingLines.push(`Edit Studio — "${briefing.activeEditProject.title}" is in progress.`)
  }

  // ── AI Insights (deterministic, Jarvis slot) ─────────────────────────────────
  const aiInsight = briefing?.strongestAngle
    ? `Your brand shows strongest performance on "${briefing.strongestAngle}" angles. Reinforce this pattern before testing new approaches.`
    : briefing?.lastAdProject
    ? 'You have recent campaign activity. Review your strongest hooks before starting a new direction.'
    : 'Build your first campaign and PromptCEO will start identifying your strongest creative patterns.'

  return (
    <div style={{ background: C.void, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: C.primary }}>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg) } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
        .feed-row:hover  { background: #111111 !important; }
        .s-card:hover    { border-color: var(--sc) !important; background: var(--sg) !important; }
        .s-card:hover .s-label { color: var(--sc) !important; }
        .s-card:hover .s-arrow { color: var(--sc) !important; opacity: 1 !important; }
        .nav-link:hover  { color: #9e9a96 !important; }
        .ghost-link:hover{ color: #9e9a96 !important; }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: `1px solid ${C.border}`,
        background: `${C.void}ee`, backdropFilter: 'blur(12px)',
        padding: '0 28px', display: 'flex', alignItems: 'center', height: 52, gap: 4,
      }}>
        <a href="/dashboard" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3.5, color: C.gold, textTransform: 'uppercase', textDecoration: 'none', marginRight: 12, flexShrink: 0 }}>
          PromptCEO
        </a>
        {NAV.map(({ label, href, active }) => (
          <a key={label} href={href} className="nav-link" style={{
            fontSize: 12, fontWeight: active ? 600 : 400,
            color: active ? C.primary : C.ghost,
            textDecoration: 'none', padding: '5px 10px', borderRadius: 6,
            background: active ? C.raised : 'transparent',
            borderLeft: `2px solid ${active ? C.gold : 'transparent'}`,
            transition: 'color 0.15s',
          }}>{label}</a>
        ))}
        <div style={{ flex: 1 }} />

        {/* Brand chip */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setBrandDropOpen(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6,
              border: `1px solid ${activeBrand ? C.gold + '44' : C.border}`,
              background: activeBrand ? C.goldDim : C.surface,
              cursor: 'pointer', fontSize: 11,
              color: activeBrand ? C.gold : C.ghost, fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 10 }}>◈</span>
            <span>{activeBrand?.name || 'No Brand'}</span>
            <span style={{ fontSize: 8, opacity: 0.5 }}>{brandDropOpen ? '▲' : '▾'}</span>
          </button>
          {brandDropOpen && (
            <>
              <div onClick={() => setBrandDropOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: C.raised, border: `1px solid ${C.border}`,
                borderRadius: 8, minWidth: 210, zIndex: 200,
                overflow: 'hidden', boxShadow: '0 12px 40px #00000099',
              }}>
                <div style={{ padding: '6px 14px 4px', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.ghost, textTransform: 'uppercase' }}>Active Brand</div>
                {brandProfiles.length === 0 && (
                  <div style={{ padding: '10px 14px', fontSize: 11, color: C.ghost }}>No brands yet — create one in Ad Studio.</div>
                )}
                {brandProfiles.map((b, i) => (
                  <div
                    key={b.id}
                    onClick={() => switchBrand(b)}
                    style={{
                      padding: '9px 14px', fontSize: 12,
                      color: b.id === activeBrand?.id ? C.gold : C.primary,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                      borderTop: i > 0 ? `1px solid ${C.border}` : 'none',
                      background: b.id === activeBrand?.id ? C.goldDim : 'transparent',
                    }}
                  >
                    <span style={{ width: 12, fontSize: 9, color: C.gold }}>{b.id === activeBrand?.id ? '✓' : ''}</span>
                    <div>
                      <div>{b.name}</div>
                      {b.target_audience && <div style={{ fontSize: 10, color: C.ghost, marginTop: 1 }}>{b.target_audience.slice(0, 42)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <a href="/account" className="ghost-link" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 12px', marginLeft: 8, transition: 'color 0.15s' }}>
          Account
        </a>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* BRIEFING CARD */}
        <div style={{
          padding: '24px 28px 22px', borderRadius: 12,
          border: `1px solid #242010`,
          borderLeft: `3px solid ${C.gold}55`,
          background: '#080700',
          marginBottom: 20,
          animation: 'fadeUp 0.4s ease both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: C.ghost, marginBottom: 10 }}>
                {greeting()}{briefing?.firstName ? `, ${briefing.firstName}` : ''}.
              </div>
              {briefingLines.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 18 }}>
                  {briefingLines.map((line, i) => (
                    <div key={i} style={{ fontSize: 14, color: C.secondary, lineHeight: 1.5 }}>{line}</div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 14, color: C.muted, marginBottom: 18, lineHeight: 1.65 }}>
                  Your studio is ready. Tell me what you&apos;re building and I&apos;ll take you there.
                </div>
              )}
              {briefing?.recommendedAction && (
                <a href={briefing.recommendedAction.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.gold, textDecoration: 'none', fontWeight: 600 }}>
                  <span style={{ fontSize: 8, color: C.gold + '77' }}>▶</span>
                  {briefing.recommendedAction.label}
                  <span style={{ fontSize: 11, color: C.ghost, fontWeight: 400 }}>— {briefing.recommendedAction.context}</span>
                </a>
              )}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.gold + '55', textTransform: 'uppercase', flexShrink: 0, paddingTop: 2 }}>
              ✦ Live
            </div>
          </div>
        </div>

        {/* CHAT */}
        <div style={{ marginBottom: 28, animation: 'fadeUp 0.4s ease 0.06s both' }}>
          <div style={{
            display: 'flex', gap: 8, alignItems: 'stretch',
            padding: '5px 5px 5px 14px', borderRadius: 10,
            border: `1px solid ${chatInput.trim() ? C.gold + '44' : C.border}`,
            background: C.surface, transition: 'border-color 0.2s',
          }}>
            <span style={{ fontSize: 13, color: C.ghost, display: 'flex', alignItems: 'center', flexShrink: 0 }}>✦</span>
            <input
              ref={chatRef}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runChat()}
              placeholder={activeBrand ? `Tell the Director what to build for ${activeBrand.name}…` : 'Tell me what to create — "A luxury campaign for my skincare brand targeting women 25–35"'}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.primary, fontSize: 13, padding: '9px 0', fontFamily: 'inherit' }}
            />
            <button
              onClick={runChat}
              disabled={!chatInput.trim() || chatLoading}
              style={{
                padding: '8px 18px', borderRadius: 7, fontSize: 11, fontWeight: 700,
                cursor: chatInput.trim() && !chatLoading ? 'pointer' : 'not-allowed',
                border: `1px solid ${chatInput.trim() ? C.gold : C.border}`,
                background: chatInput.trim() ? C.goldDim : 'transparent',
                color: chatInput.trim() ? C.gold : C.ghost, flexShrink: 0, transition: 'all 0.15s',
              }}
            >
              {chatLoading
                ? <span style={{ display: 'inline-block', width: 12, height: 12, border: `2px solid ${C.gold}44`, borderTopColor: C.gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                : 'Create →'}
            </button>
          </div>
          {chatResult && (
            <div style={{ marginTop: 6, padding: '8px 12px', borderRadius: 7, background: C.greenDim, border: `1px solid ${C.green}33`, fontSize: 11, color: C.green, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✓</span>
              <span>{chatResult.understood} — routing to {chatResult.output_type?.replace(/_/g, ' ')}…</span>
            </div>
          )}
          {chatError && (
            <div style={{ marginTop: 6, padding: '8px 12px', borderRadius: 7, background: '#110606', border: '1px solid #2a1010', fontSize: 11, color: '#f87171' }}>{chatError}</div>
          )}
        </div>

        {/* ACTION LAYER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, animation: 'fadeUp 0.4s ease 0.12s both' }}>

          {/* Continue card */}
          <div style={{ padding: '20px 22px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.ghost, marginBottom: 12 }}>Continue</div>
            {(briefing?.activeEditProject || briefing?.lastAdProject) ? (
              <>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.primary, marginBottom: 4 }}>
                  {briefing.activeEditProject?.title || briefing.lastAdProject?.name}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
                  {briefing.activeEditProject
                    ? `Edit Studio · ${(briefing.activeEditProject.status || '').replace(/_/g, ' ')}`
                    : 'Ad Studio · Campaign'}
                </div>
                <a
                  href={briefing.recommendedAction?.href || '/prompt-engine-v3?view=ad_studio'}
                  style={{ fontSize: 12, color: C.gold, textDecoration: 'none', fontWeight: 600 }}
                >
                  Continue →
                </a>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.55 }}>
                  No active projects yet. Start your first campaign.
                </div>
                <a href="/prompt-engine-v3?view=ad_studio" style={{ fontSize: 12, color: C.gold, textDecoration: 'none', fontWeight: 600 }}>
                  Start in Ad Studio →
                </a>
              </>
            )}
          </div>

          {/* Brand card */}
          <div style={{
            padding: '20px 22px', borderRadius: 10,
            border: `1px solid ${activeBrand ? C.gold + '33' : C.border}`,
            background: activeBrand ? '#09080200' : C.surface,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: activeBrand ? C.gold + '88' : C.ghost, marginBottom: 12 }}>Active Brand</div>
            {activeBrand ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: C.gold }}>◈</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.primary }}>{activeBrand.name}</span>
                </div>
                {activeBrand.target_audience && (
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>
                    <span style={{ color: C.ghost }}>Audience: </span>{activeBrand.target_audience.slice(0, 48)}
                  </div>
                )}
                {activeBrand.voice && (
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>
                    <span style={{ color: C.ghost }}>Voice: </span>{activeBrand.voice.slice(0, 48)}
                  </div>
                )}
                <a href="/brands" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none' }}>View Brand Profile →</a>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.55 }}>
                  No brand active. Add your brand DNA so every output is tailored.
                </div>
                <a href="/prompt-engine-v3?view=ad_studio" style={{ fontSize: 12, color: C.gold, textDecoration: 'none', fontWeight: 600 }}>
                  Add Brand in Ad Studio →
                </a>
              </>
            )}
          </div>
        </div>

        {/* STUDIO SHORTCUTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 36, animation: 'fadeUp 0.4s ease 0.17s both' }}>
          {STUDIOS.map(s => (
            <div
              key={s.label}
              className="s-card"
              onClick={() => openStudio(s)}
              style={{
                '--sc': s.color, '--sg': s.glow,
                padding: '14px 16px', borderRadius: 9,
                border: `1px solid ${C.border}`, background: C.surface,
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <span style={{ fontSize: 15, flexShrink: 0, color: s.color, opacity: 0.85 }}>{s.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="s-label" style={{ fontSize: 12, fontWeight: 700, color: C.secondary, transition: 'color 0.15s', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: C.ghost, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.sub}</div>
              </div>
              <span className="s-arrow" style={{ fontSize: 10, color: C.ghost, opacity: 0.35, transition: 'all 0.15s', flexShrink: 0 }}>→</span>
            </div>
          ))}
        </div>

        {/* INTELLIGENCE LAYER */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, animation: 'fadeUp 0.4s ease 0.22s both' }}>

          {/* Activity feed */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.ghost, marginBottom: 12 }}>Recent Activity</div>
            {activityFeed.length === 0 ? (
              <div style={{ padding: '20px', borderRadius: 9, border: `1px dashed ${C.border}`, textAlign: 'center', color: C.ghost, fontSize: 12, lineHeight: 1.6 }}>
                Activity will appear here as you build campaigns and Edit Studio projects.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {activityFeed.map(event => (
                  <a
                    key={event.id}
                    href={event.href}
                    className="feed-row"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '9px 10px', borderRadius: 7,
                      background: 'transparent', transition: 'background 0.1s',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 11, color: C.ghost, flexShrink: 0, width: 16, textAlign: 'center' }}>{event.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: C.secondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {event.projectName}
                      </div>
                      <div style={{ fontSize: 10, color: C.ghost, marginTop: 1 }}>{event.studio} · {event.action}</div>
                    </div>
                    <div style={{ fontSize: 10, color: C.ghost, flexShrink: 0 }}>{fmtAgo(event.createdAt)}</div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* AI Insights — Jarvis slot */}
          <div style={{
            padding: '20px 22px', borderRadius: 10,
            border: `1px solid ${C.gold}1a`,
            background: '#07060200',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 10, color: C.gold }}>✦</span>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold + '77' }}>AI Insights</div>
            </div>
            <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.75 }}>
              {aiInsight}
            </div>
            {briefing?.strongestAngle && (
              <a href="/prompt-engine-v3?view=ad_studio" style={{ display: 'inline-block', marginTop: 16, fontSize: 11, color: C.gold + 'aa', textDecoration: 'none' }}>
                Build on this angle →
              </a>
            )}
            {!briefing?.strongestAngle && !briefing?.lastAdProject && (
              <a href="/prompt-engine-v3?view=ad_studio" style={{ display: 'inline-block', marginTop: 16, fontSize: 11, color: C.gold + 'aa', textDecoration: 'none' }}>
                Start your first campaign →
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

function fmtAgo(iso) {
  if (!iso) return ''
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)    return 'just now'
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  const days = Math.floor(diff / 86400)
  if (days < 7)     return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
