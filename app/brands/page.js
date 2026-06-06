'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const C = {
  void:     '#020202', deep:    '#050505', base:      '#080808',
  surface:  '#0d0d0d', raised:  '#111111', border:    '#1a1a1a',
  subtle:   '#222222', primary: '#FFFFFF', secondary: '#D0D0D0',
  muted:    '#A0A0A0', ghost:   '#888888',
  gold:     '#c8a84b', goldDim: '#1a1408', goldGlow:  'rgba(200,168,75,0.12)',
  blue:     '#4a8ab4', violet:  '#9b6fd4', green:     '#4a9a6a',
}

const NAV = [
  { label: 'Home',        href: '/dashboard',                       active: false },
  { label: 'Studio',      href: '/prompt-engine-v3?view=studio',    active: false },
  { label: 'Ad Studio',   href: '/prompt-engine-v3?view=ad_studio', active: false },
  { label: 'Edit Studio', href: '/edit-studio/v2',                  active: false },
  { label: 'Brands',      href: '/brands',                          active: true  },
]

function fmtDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BrandsPage() {
  const router = useRouter()

  const [brands,         setBrands]         = useState([])
  const [loading,        setLoading]        = useState(true)
  const [authed,         setAuthed]         = useState(false)
  const [activeBrand,    setActiveBrand]    = useState(null)
  const [brandDropOpen,  setBrandDropOpen]  = useState(false)

  useEffect(() => {
    fetch('/api/brand-profiles')
      .then(r => {
        if (r.status === 401) { setAuthed(false); setLoading(false); return null }
        setAuthed(true)
        return r.json()
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBrands(data)
          try {
            const savedId = localStorage.getItem('promptceo_active_brand_id')
            const saved   = savedId ? data.find(b => b.id === savedId) : null
            setActiveBrand(saved || data[0])
          } catch {
            setActiveBrand(data[0])
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const switchBrand = (brand) => {
    setActiveBrand(brand)
    setBrandDropOpen(false)
    try { localStorage.setItem('promptceo_active_brand_id', brand?.id || '') } catch {}
  }

  return (
    <div style={{ background: C.void, minHeight: '100vh', color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        .nav-link:hover { color: #9e9a96 !important; }
        .brand-card:hover { border-color: ${C.gold}33 !important; }
        .studio-cta:hover { color: ${C.gold} !important; border-color: ${C.gold}44 !important; }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: `1px solid ${C.border}`,
        background: `${C.void}ee`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        padding: '0 28px', display: 'flex', alignItems: 'center', height: 52, gap: 4, flexShrink: 0,
      }}>
        <a href="/dashboard" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3.5, color: C.gold, textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0, marginRight: 12 }}>
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
                borderRadius: 8, minWidth: 200, zIndex: 200,
                overflow: 'hidden', boxShadow: '0 12px 40px #00000099',
              }}>
                <div style={{ padding: '6px 14px 4px', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.ghost, textTransform: 'uppercase' }}>Active Brand</div>
                {brands.length === 0 && (
                  <div style={{ padding: '10px 14px', fontSize: 11, color: C.ghost }}>No brands yet — create one in Ad Studio.</div>
                )}
                {brands.map((b, i) => (
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

        <a href="/account" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 12px', marginLeft: 8 }}>
          Account
        </a>
      </div>

      {/* ── Page body ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '44px 24px 80px', animation: 'fadeUp 0.4s ease both' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <a href="/dashboard" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20, transition: 'color 0.15s' }}>
            ← Home
          </a>
          <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: -0.5, color: C.primary, marginBottom: 8 }}>
            Brand Profiles
          </div>
          <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
            Your brand identities — audience, voice, and positioning — injected into every campaign, ad, and edit.
          </div>
        </div>

        {/* States */}
        {loading ? (
          <div style={{ color: C.ghost, fontSize: 13 }}>Loading…</div>
        ) : !authed ? (
          <div style={{ padding: '32px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>Sign in to manage your brand profiles.</div>
            <a href="/prompt-engine-v3/login" style={{ padding: '10px 24px', borderRadius: 8, background: C.goldDim, border: `1px solid ${C.gold}44`, color: C.gold, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </a>
          </div>
        ) : brands.length === 0 ? (
          <div style={{ padding: '48px 32px', borderRadius: 12, border: `1px dashed ${C.border}`, textAlign: 'center', background: C.surface }}>
            <div style={{ fontSize: 24, marginBottom: 16, color: C.ghost }}>◈</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.primary, marginBottom: 8 }}>No brand profiles yet</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 24, maxWidth: 360, margin: '0 auto 24px' }}>
              Build your first brand profile from the Ad Studio. Once created, your brand DNA is automatically injected into every ad, campaign, and creative.
            </div>
            <a href="/prompt-engine-v3?view=ad_studio" style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 8, background: C.goldDim, border: `1px solid ${C.gold}44`, color: C.gold, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Open Ad Studio →
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {brands.map(brand => (
              <div
                key={brand.id}
                className="brand-card"
                style={{
                  padding: '24px 28px', borderRadius: 12,
                  border: `1px solid ${brand.id === activeBrand?.id ? C.gold + '44' : C.border}`,
                  background: brand.id === activeBrand?.id ? '#09080200' : C.surface,
                  transition: 'border-color 0.15s',
                }}
              >
                {/* Brand header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: C.gold }}>◈</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: C.primary }}>{brand.name || 'Unnamed Brand'}</span>
                      {brand.industry && (
                        <span style={{ fontSize: 10, color: C.ghost, padding: '2px 7px', borderRadius: 4, border: `1px solid ${C.border}`, background: C.raised }}>
                          {brand.industry}
                        </span>
                      )}
                      {brand.id === activeBrand?.id && (
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold, padding: '2px 8px', borderRadius: 4, border: `1px solid ${C.gold}33`, background: C.goldDim }}>
                          Active
                        </span>
                      )}
                    </div>
                    {brand.target_audience && (
                      <div style={{ fontSize: 12, color: C.muted, marginBottom: 3 }}>
                        <span style={{ color: C.ghost }}>Audience: </span>{brand.target_audience}
                      </div>
                    )}
                    {(brand.voice || brand.brand_voice) && (
                      <div style={{ fontSize: 12, color: C.muted }}>
                        <span style={{ color: C.ghost }}>Voice: </span>{brand.voice || brand.brand_voice}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: C.ghost, flexShrink: 0, textAlign: 'right' }}>
                    {brand.last_used_at ? `Used ${fmtDate(brand.last_used_at)}` : fmtDate(brand.created_at)}
                  </div>
                </div>

                {/* Campaign memory signal */}
                {brand.id === activeBrand?.id && (
                  <div style={{ padding: '12px 16px', borderRadius: 8, background: C.void, border: `1px solid ${C.border}`, marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ fontSize: 10, color: C.gold, flexShrink: 0, marginTop: 1 }}>✦</span>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold + '77', marginBottom: 4 }}>AI Insights</div>
                      <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6 }}>
                        Every campaign, ad, and Edit Studio project built with this brand feeds PromptCEO&apos;s Campaign Memory. Your strongest angles and audience signals will surface here.
                      </div>
                    </div>
                  </div>
                )}

                {/* Studio CTAs */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { label: '→ Ad Studio', href: '/prompt-engine-v3?view=ad_studio' },
                    { label: '→ Studio',    href: '/prompt-engine-v3?view=studio' },
                    { label: '→ Edit Studio', href: '/edit-studio/v2' },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="studio-cta"
                      style={{
                        fontSize: 11, color: C.muted, textDecoration: 'none',
                        padding: '5px 12px', borderRadius: 6, border: `1px solid ${C.border}`,
                        background: C.raised, transition: 'all 0.15s', fontWeight: 500,
                      }}
                    >
                      {label}
                    </a>
                  ))}
                  {brand.id !== activeBrand?.id && (
                    <button
                      onClick={() => switchBrand(brand)}
                      style={{
                        fontSize: 11, color: C.ghost,
                        padding: '5px 12px', borderRadius: 6, border: `1px solid ${C.border}`,
                        background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                        marginLeft: 'auto',
                      }}
                    >
                      Set Active
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add brand CTA */}
        {authed && brands.length > 0 && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href="/prompt-engine-v3?view=ad_studio" style={{ fontSize: 12, color: C.ghost, textDecoration: 'none' }}>
              + Add another brand in Ad Studio
            </a>
          </div>
        )}

      </div>
    </div>
  )
}
