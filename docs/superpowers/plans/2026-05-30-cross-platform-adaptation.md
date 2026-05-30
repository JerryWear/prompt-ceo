# Cross-Platform Adaptation™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take any generated ad content (hooks, captions, angles, campaign stages) and produce platform-native rewrites for Instagram, TikTok, Meta, and YouTube in one click.

**Architecture:** New POST `/api/adapt-campaign` accepts current outputs + target platforms → uses Grok to rewrite each piece with platform-specific tone, length, and format rules → returns a `{ platforms: { instagram, tiktok, meta, youtube } }` object. New nav tab `cross_platform` in the CAMPAIGNS group renders a one-click "Adapt for Platforms" button, platform cards with adapted copy, and a copy button per card. No new Supabase tables needed.

**Tech Stack:** Next.js 14 App Router, xAI Grok (`grok-3`), React useState inside IIFE view block (existing codebase pattern), existing `s.adTextResults` for source content.

---

### Task 1: API route — platform adaptation engine

**Files:**
- Create: `app/api/adapt-campaign/route.js`

- [ ] **Step 1: Create the route file**

```javascript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

const PLATFORM_RULES = {
  instagram: {
    label: 'Instagram',
    icon: '📸',
    hookMaxChars: 125,
    captionMaxChars: 2200,
    tone: 'aspirational, visually descriptive, lifestyle-driven',
    hashtagNote: 'Add 5-10 relevant hashtags at the end',
    ctaStyle: 'soft CTA (Link in bio, Save this, Double tap)',
    formatNote: 'Short punchy opening line, then expand. Emojis welcome.',
  },
  tiktok: {
    label: 'TikTok',
    icon: '🎵',
    hookMaxChars: 80,
    captionMaxChars: 150,
    tone: 'casual, energetic, trend-aware, conversational',
    hashtagNote: 'Add 3-5 trending hashtags',
    ctaStyle: 'direct action CTA (Follow for more, Comment X, Watch till end)',
    formatNote: 'Ultra-short. First 3 words must stop the scroll. Hook drives to watch.',
  },
  meta: {
    label: 'Meta Ads',
    icon: '🎯',
    hookMaxChars: 40,
    captionMaxChars: 125,
    tone: 'benefit-driven, direct, problem-solution focused',
    hashtagNote: 'No hashtags needed',
    ctaStyle: 'explicit CTA (Shop Now, Learn More, Get Started, Claim Offer)',
    formatNote: 'Lead with the pain or benefit. Clear value prop. Short sentences.',
  },
  youtube: {
    label: 'YouTube',
    icon: '▶️',
    hookMaxChars: 100,
    captionMaxChars: 5000,
    tone: 'authoritative, educational, storytelling, value-driven',
    hashtagNote: 'Add 3 hashtags above the fold',
    ctaStyle: 'subscribe + next action (Subscribe, Comment below, Check link)',
    formatNote: 'Strong title hook, then tell the full story. Timestamps if long.',
  },
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { outputs, productName, brandVoice, platforms: targetPlatforms } = await req.json()
    if (!outputs || typeof outputs !== 'object') {
      return NextResponse.json({ error: 'outputs is required' }, { status: 400 })
    }

    const platforms = targetPlatforms || ['instagram', 'tiktok', 'meta', 'youtube']

    // Extract best content from outputs
    const hooks = Object.keys(outputs)
      .filter(k => k.startsWith('hooks'))
      .flatMap(k => outputs[k]?.hooks || [])
      .slice(0, 3)
      .map(h => h.hook || h)
      .filter(Boolean)

    const captions = (outputs.captions || [])
      .slice(0, 2)
      .map(c => c.fullCaption || c.hook || c)
      .filter(Boolean)

    const angles = (outputs.angles || [])
      .slice(0, 2)
      .map(a => a.angle || a.headline || a)
      .filter(Boolean)

    const campaignStages = (outputs.campaign || [])
      .map(s => `${s.label}: ${s.hook}`)
      .slice(0, 3)
      .filter(Boolean)

    if (hooks.length === 0 && captions.length === 0 && angles.length === 0) {
      return NextResponse.json({ error: 'No content to adapt. Generate some ad content first.' }, { status: 400 })
    }

    const sourceContent = [
      hooks.length > 0 ? `HOOKS:\n${hooks.map((h, i) => `${i + 1}. ${h}`).join('\n')}` : '',
      captions.length > 0 ? `CAPTIONS:\n${captions.map((c, i) => `${i + 1}. ${c}`).join('\n')}` : '',
      angles.length > 0 ? `ANGLES:\n${angles.map((a, i) => `${i + 1}. ${a}`).join('\n')}` : '',
      campaignStages.length > 0 ? `CAMPAIGN STAGES:\n${campaignStages.join('\n')}` : '',
    ].filter(Boolean).join('\n\n')

    const results = {}

    await Promise.all(platforms.map(async (platform) => {
      const rules = PLATFORM_RULES[platform]
      if (!rules) return

      const systemPrompt = `You are an expert social media copywriter specializing in ${rules.label}.

Platform rules for ${rules.label}:
- Tone: ${rules.tone}
- Hook max characters: ${rules.hookMaxChars}
- Caption max characters: ${rules.captionMaxChars}
- CTA style: ${rules.ctaStyle}
- Format note: ${rules.formatNote}
- Hashtag note: ${rules.hashtagNote}
${productName ? `- Product: ${productName}` : ''}
${brandVoice ? `- Brand voice: ${brandVoice}` : ''}

Rewrite the provided ad content specifically for ${rules.label}. Adapt tone, length, format, and style — do NOT just copy the original with minor tweaks.

Respond ONLY with valid JSON:
{
  "hook": "<platform-native hook under ${rules.hookMaxChars} chars>",
  "caption": "<full caption adapted for ${rules.label} under ${rules.captionMaxChars} chars, including hashtags>",
  "angle": "<core angle reframed for ${rules.label} audience>",
  "cta": "<platform-native call to action>"
}`

      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: sourceContent },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      })

      if (!response.ok) return

      const data = await response.json()
      const raw = data.choices?.[0]?.message?.content?.trim() || '{}'

      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        const match = raw.match(/\{[\s\S]*\}/)
        parsed = match ? JSON.parse(match[0]) : null
      }

      if (parsed) {
        results[platform] = {
          ...parsed,
          icon: rules.icon,
          label: rules.label,
        }
      }
    }))

    return NextResponse.json({ platforms: results })
  } catch (err) {
    console.error('adapt-campaign error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify the file was created**

Run: `ls app/api/adapt-campaign/` (expect `route.js`)

- [ ] **Step 3: Commit**

```bash
git add app/api/adapt-campaign/route.js
git commit -m "feat: Cross-Platform Adaptation™ API — rewrites ad content for Instagram/TikTok/Meta/YouTube"
```

---

### Task 2: Nav button + cross_platform view in PromptCEOPage

**Files:**
- Modify: `app/prompt-engine-v3/page.js`
  - Add nav button after `◉ Journey` button (line ~14798)
  - Add view block after campaign_journey IIFE close (line ~18597)

The `cross_platform` view uses `React.useState` inside an IIFE block — this follows the existing codebase IIFE pattern used in campaign_journey view.

The view needs access to: `s.adTextResults`, `s.activeProjectId`, `set`, `C` (colors constant) — all available in PromptCEOPage scope.

- [ ] **Step 1: Add nav button after Journey button**

Find this exact block:
```javascript
              <button onClick={() => set('view', 'campaign_journey')} style={{
                padding: '4px 11px', borderRadius: 0, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: `2px solid ${s.view === 'campaign_journey' ? C.gold : 'transparent'}`,
                background: s.view === 'campaign_journey' ? '#0e0c08' : 'transparent',
                color: s.view === 'campaign_journey' ? C.gold : '#5a5650',
                transition: 'all 0.15s',
              }}>◉ Journey</button>
            </div>
```

Replace with:
```javascript
              <button onClick={() => set('view', 'campaign_journey')} style={{
                padding: '4px 11px', borderRadius: 0, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: `2px solid ${s.view === 'campaign_journey' ? C.gold : 'transparent'}`,
                background: s.view === 'campaign_journey' ? '#0e0c08' : 'transparent',
                color: s.view === 'campaign_journey' ? C.gold : '#5a5650',
                transition: 'all 0.15s',
              }}>◉ Journey</button>
              <button onClick={() => set('view', 'cross_platform')} style={{
                padding: '4px 11px', borderRadius: 0, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: `2px solid ${s.view === 'cross_platform' ? C.blue : 'transparent'}`,
                background: s.view === 'cross_platform' ? '#080c18' : 'transparent',
                color: s.view === 'cross_platform' ? C.blue : '#5a5650',
                transition: 'all 0.15s',
              }}>⊕ Platforms</button>
            </div>
```

- [ ] **Step 2: Add cross_platform view block after campaign_journey closes**

Find the exact end of campaign_journey view (the IIFE closing + empty line before New Project Modal):
```javascript
        })()}

      </div>

      {/* ── NEW PROJECT MODAL ── */}
```

Replace with:
```javascript
        })()}

        {s.view === 'cross_platform' && (() => {
          const [adaptResult,  setAdaptResult]  = React.useState(null)
          const [adaptLoading, setAdaptLoading] = React.useState(false)
          const [adaptError,   setAdaptError]   = React.useState(null)
          const [copiedKey,    setCopiedKey]     = React.useState(null)

          const hasContent = s.adTextResults && Object.keys(s.adTextResults).length > 0
          const PLATFORMS = ['instagram', 'tiktok', 'meta', 'youtube']
          const PLATFORM_META = {
            instagram: { icon: '📸', label: 'Instagram', color: '#e1306c', dimColor: '#3a1020' },
            tiktok:    { icon: '🎵', label: 'TikTok',    color: '#69c9d0', dimColor: '#0a2022' },
            meta:      { icon: '🎯', label: 'Meta Ads',  color: '#1877f2', dimColor: '#08122a' },
            youtube:   { icon: '▶️', label: 'YouTube',   color: '#ff0000', dimColor: '#200808' },
          }

          const runAdapt = () => {
            if (adaptLoading || !hasContent) return
            setAdaptLoading(true)
            setAdaptError(null)
            setAdaptResult(null)
            fetch('/api/adapt-campaign', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ outputs: s.adTextResults }),
            })
              .then(r => r.json())
              .then(d => {
                if (d.error) setAdaptError(d.error)
                else if (d.platforms) setAdaptResult(d.platforms)
              })
              .catch(() => setAdaptError('Request failed. Please try again.'))
              .finally(() => setAdaptLoading(false))
          }

          const copyText = (text, key) => {
            navigator.clipboard.writeText(text).then(() => {
              setCopiedKey(key)
              setTimeout(() => setCopiedKey(null), 1800)
            })
          }

          return (
            <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, margin: '0 auto', width: '100%' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, letterSpacing: -0.5 }}>⊕ Cross-Platform Adaptation™</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Rewrites your ad content natively for each platform — tone, length, format, and CTA.</div>
                </div>
                <button
                  onClick={runAdapt}
                  disabled={adaptLoading || !hasContent}
                  style={{
                    padding: '10px 22px', borderRadius: 6, fontSize: 13, fontWeight: 800,
                    cursor: hasContent && !adaptLoading ? 'pointer' : 'not-allowed',
                    border: `1px solid ${hasContent ? C.blue : C.hairline}`,
                    background: hasContent && !adaptLoading ? 'linear-gradient(180deg, #08122a, #040810)' : C.deep,
                    color: hasContent ? C.blue : C.muted,
                    letterSpacing: 0.3,
                  }}
                >
                  {adaptLoading ? '⟳ Adapting…' : '⊕ Adapt for All Platforms'}
                </button>
              </div>

              {/* No content state */}
              {!hasContent && (
                <div style={{ padding: '32px', textAlign: 'center', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.deep }}>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>No ad content yet.</div>
                  <div style={{ fontSize: 11, color: C.secondary }}>Go to Ad Studio → generate hooks, captions, or angles first.</div>
                </div>
              )}

              {/* Error */}
              {adaptError && (
                <div style={{ padding: '12px 16px', borderRadius: 6, border: `1px solid #4a1010`, background: '#1a0808', fontSize: 11, color: '#cf6a6a' }}>
                  {adaptError}
                </div>
              )}

              {/* Platform cards grid */}
              {adaptResult && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {PLATFORMS.filter(p => adaptResult[p]).map(platform => {
                    const r = adaptResult[platform]
                    const meta = PLATFORM_META[platform]
                    return (
                      <div key={platform} style={{ borderRadius: 8, border: `1px solid ${meta.color}33`, background: meta.dimColor, overflow: 'hidden' }}>
                        {/* Card header */}
                        <div style={{ padding: '10px 14px', background: `${meta.color}11`, borderBottom: `1px solid ${meta.color}33`, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 16 }}>{meta.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>{meta.label}</span>
                        </div>
                        {/* Card body */}
                        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {r.hook && (
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Hook</div>
                              <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.5, fontWeight: 600 }}>{r.hook}</div>
                            </div>
                          )}
                          {r.angle && (
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Angle</div>
                              <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{r.angle}</div>
                            </div>
                          )}
                          {r.cta && (
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>CTA</div>
                              <div style={{ fontSize: 11, color: meta.color, lineHeight: 1.5, fontWeight: 600 }}>{r.cta}</div>
                            </div>
                          )}
                          {r.caption && (
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Caption</div>
                              <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.6, whiteSpace: 'pre-wrap', maxHeight: 120, overflow: 'hidden auto' }}>{r.caption}</div>
                            </div>
                          )}
                          {/* Copy button */}
                          <button
                            onClick={() => copyText([r.hook, r.caption].filter(Boolean).join('\n\n'), platform)}
                            style={{
                              padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                              cursor: 'pointer', border: `1px solid ${meta.color}55`,
                              background: 'transparent', color: meta.color, alignSelf: 'flex-start',
                            }}
                          >
                            {copiedKey === platform ? '✓ Copied' : '⎘ Copy'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Loading skeleton */}
              {adaptLoading && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {PLATFORMS.map(p => (
                    <div key={p} style={{ borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.deep, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: 11, color: C.muted }}>Adapting for {PLATFORM_META[p]?.label}…</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })()}

      </div>

      {/* ── NEW PROJECT MODAL ── */}
```

- [ ] **Step 3: Verify cdInstruction and cross_platform are both present**

Run: `grep -c "cross_platform\|cdInstruction" app/prompt-engine-v3/page.js`
Expected: number > 4

- [ ] **Step 4: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Cross-Platform Adaptation™ UI — Platforms nav tab + 4-card grid view"
```
