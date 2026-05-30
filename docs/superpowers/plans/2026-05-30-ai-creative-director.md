# AI Creative Director™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Parse a natural language creative instruction → map intent to a config delta (style, visualPacing, hookType, platform, worlds) → let user apply it with one click.

**Architecture:** New POST `/api/creative-director` uses Grok to parse the instruction against STYLE_VOICE + VISUAL_PACING constants and return a structured delta + human explanation. AdStudioView gets a Creative Director bar below the generate button: an input, a submit button, an explanation card, and an Apply button that writes the delta back to state.

**Tech Stack:** Next.js 14 App Router, xAI Grok (`grok-3-fast`), React useState, existing `set`/`merge`/`setAdStyle`/`setAdPlatform` in AdStudioView.

---

### Task 1: API route — natural language → config delta

**Files:**
- Create: `app/api/creative-director/route.js`

Note: there is already an `app/api/creative-director-note/route.js` — that is a different endpoint (feedback notes on completed generations). Do NOT touch it.

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

const STYLE_VOICE = {
  luxury:                 ['premium', 'aspirational', 'luxury', 'high-end', 'exclusive'],
  cinematic:              ['cinematic', 'editorial', 'artistic', 'film', 'dramatic'],
  ugc:                    ['authentic', 'friendly', 'relatable', 'real', 'raw', 'natural'],
  emotional:              ['emotional', 'warm', 'human', 'heartfelt', 'empathetic'],
  viral:                  ['viral', 'bold', 'energetic', 'trend', 'hook', 'scroll-stopping'],
  dark_luxury:            ['premium', 'dark', 'luxury', 'high-fashion', 'moody', 'intense'],
  high_energy:            ['motivational', 'energetic', 'bold', 'powerful', 'hype', 'pump'],
  soft_feminine:          ['soft', 'feminine', 'gentle', 'authentic', 'pastel', 'delicate'],
  corporate_authority:    ['authoritative', 'professional', 'corporate', 'trust', 'credible'],
  fitness_motivation:     ['motivational', 'athletic', 'transformative', 'strong', 'results'],
  high_status:            ['premium', 'status', 'aspirational', 'elite', 'success'],
  aspirational_lifestyle: ['aspirational', 'lifestyle', 'freedom', 'dream', 'travel', 'adventure'],
}

const VISUAL_PACING = {
  fast_cut:     'High energy, rapid transitions — attention and retargeting phases',
  cinematic:    'Slow, deliberate, wide shots — luxury and aspirational styles',
  tension:      'Building suspense, tight frames — desire escalation and emotional styles',
  story_driven: 'Linear narrative flow — authentic UGC and conversion phases',
}

const STYLE_PACING_MAP = {
  luxury: 'cinematic', cinematic: 'cinematic', dark_luxury: 'tension',
  emotional: 'tension', ugc: 'story_driven', soft_feminine: 'story_driven',
  corporate_authority: 'story_driven', viral: 'fast_cut', high_energy: 'fast_cut',
  fitness_motivation: 'fast_cut', aspirational_lifestyle: 'cinematic', high_status: 'cinematic',
}

const PLATFORM_GOAL = {
  instagram: 'Visual storytelling, premium, aspirational',
  tiktok: 'Short-form viral, high energy, trend-driven',
  meta: 'Lead generation, direct response, benefit-driven',
  youtube: 'Long-form storytelling, educational, authority',
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { instruction, currentConfig } = await req.json()
    if (!instruction?.trim()) return NextResponse.json({ error: 'instruction is required' }, { status: 400 })

    const systemPrompt = `You are a Creative Director AI for a social media ad studio. 
Your job is to interpret a natural language creative instruction and map it to a structured config delta.

Available styles and their voice associations:
${Object.entries(STYLE_VOICE).map(([s, v]) => `- ${s}: ${v.join(', ')}`).join('\n')}

Available visual pacing options:
${Object.entries(VISUAL_PACING).map(([p, d]) => `- ${p}: ${d}`).join('\n')}

Available platforms:
${Object.entries(PLATFORM_GOAL).map(([p, d]) => `- ${p}: ${d}`).join('\n')}

Current config: ${JSON.stringify(currentConfig || {})}

Respond ONLY with valid JSON in this exact format:
{
  "style": "<style key or null if no change>",
  "visualPacing": "<pacing key or null if no change>",
  "platform": "<platform key or null if no change>",
  "hookType": "<pain|desire|curiosity|transformation|viral or null if no change>",
  "explanation": "<1-2 sentences explaining what you changed and why, in plain English>"
}

Rules:
- Only include fields that the instruction clearly implies changing
- Use null for fields the instruction doesn't address
- If style is set and visualPacing is not explicitly mentioned, derive visualPacing from the style using: luxury→cinematic, dark_luxury→tension, emotional→tension, ugc→story_driven, soft_feminine→story_driven, corporate_authority→story_driven, viral→fast_cut, high_energy→fast_cut, fitness_motivation→fast_cut, aspirational_lifestyle→cinematic, high_status→cinematic, cinematic→cinematic
- explanation must be human-readable, no jargon`

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: instruction },
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`xAI error: ${err}`)
    }

    const data = await response.json()
    const raw = data.choices?.[0]?.message?.content?.trim() || '{}'

    let delta
    try {
      delta = JSON.parse(raw)
    } catch {
      // Try to extract JSON from response if wrapped in markdown
      const match = raw.match(/\{[\s\S]*\}/)
      delta = match ? JSON.parse(match[0]) : { explanation: 'Could not parse response. Try rephrasing your instruction.' }
    }

    // Remove null values from delta
    const cleanDelta = Object.fromEntries(
      Object.entries(delta).filter(([k, v]) => v !== null && k !== 'explanation')
    )

    return NextResponse.json({ delta: cleanDelta, explanation: delta.explanation || '' })
  } catch (err) {
    console.error('creative-director error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify the file was created**

Run: `ls app/api/creative-director/` (expect `route.js`)

- [ ] **Step 3: Commit**

```bash
git add app/api/creative-director/route.js
git commit -m "feat: AI Creative Director™ API — natural language → config delta via Grok"
```

---

### Task 2: UI — Creative Director bar in AdStudioView

**Files:**
- Modify: `app/prompt-engine-v3/page.js` lines 340-380 (add 3 new states) and lines 4484-4490 (insert CD bar after generate button)

The insertion point is line 4485, immediately after the generate button closing `</button>` at line 4484.
The states block to add is after the existing `directorLoading` state at line 370.

- [ ] **Step 1: Add 3 new states to AdStudioView (after line 370 — after `directorLoading` state)**

Find this block (lines 368-371):
```javascript
  // Creative Director notes — one per generation type
  const [directorNotes,    setDirectorNotes]    = useState({})
  const [directorLoading,  setDirectorLoading]  = useState(false)
  // Campaign Consistency
```

Replace with:
```javascript
  // Creative Director notes — one per generation type
  const [directorNotes,    setDirectorNotes]    = useState({})
  const [directorLoading,  setDirectorLoading]  = useState(false)
  // AI Creative Director™ — instruction bar
  const [cdInstruction,  setCdInstruction]  = useState('')
  const [cdResult,       setCdResult]       = useState(null)
  const [cdLoading,      setCdLoading]      = useState(false)
  // Campaign Consistency
```

- [ ] **Step 2: Insert Creative Director bar below the generate button (after line 4484)**

Find this exact block:
```javascript
        </button>
        {adMode === 'product_ad' && !productName.trim() && !isGenerating && (
          <div style={{ padding: '6px 10px', borderRadius: 4, fontSize: 11, color: C.secondary, background: C.deep, border: `1px solid ${C.hairline}`, textAlign: 'center' }}>
            ← Enter a product name to generate
          </div>
        )}
```

Replace with:
```javascript
        </button>

        {/* AI Creative Director™ */}
        <div style={{ borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.base, overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', background: C.raised, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.violet, flexShrink: 0 }}>✦ AI Director</span>
            <input
              value={cdInstruction}
              onChange={e => setCdInstruction(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && cdInstruction.trim() && !cdLoading) {
                  setCdLoading(true)
                  setCdResult(null)
                  fetch('/api/creative-director', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      instruction: cdInstruction,
                      currentConfig: { style: adStyle, platform: adPlatform, visualPacing: s.visualPacing },
                    }),
                  })
                    .then(r => r.json())
                    .then(d => { if (d.delta || d.explanation) setCdResult(d) })
                    .catch(() => {})
                    .finally(() => setCdLoading(false))
                }
              }}
              placeholder="e.g. make it more premium and cinematic…"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 11, color: C.primary, padding: 0,
              }}
            />
            <button
              disabled={!cdInstruction.trim() || cdLoading}
              onClick={() => {
                if (!cdInstruction.trim() || cdLoading) return
                setCdLoading(true)
                setCdResult(null)
                fetch('/api/creative-director', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    instruction: cdInstruction,
                    currentConfig: { style: adStyle, platform: adPlatform, visualPacing: s.visualPacing },
                  }),
                })
                  .then(r => r.json())
                  .then(d => { if (d.delta || d.explanation) setCdResult(d) })
                  .catch(() => {})
                  .finally(() => setCdLoading(false))
              }}
              style={{
                padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                cursor: cdInstruction.trim() && !cdLoading ? 'pointer' : 'not-allowed',
                border: `1px solid ${C.violet}`, background: 'transparent',
                color: C.violet, opacity: cdInstruction.trim() && !cdLoading ? 1 : 0.4,
                flexShrink: 0,
              }}
            >
              {cdLoading ? '⟳' : '→'}
            </button>
          </div>
          {cdResult && (
            <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cdResult.explanation && (
                <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{cdResult.explanation}</div>
              )}
              {cdResult.delta && Object.keys(cdResult.delta).length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {cdResult.delta.style && (
                      <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, background: C.deep, color: C.gold, border: `1px solid ${C.goldDim}` }}>
                        style → {cdResult.delta.style}
                      </span>
                    )}
                    {cdResult.delta.visualPacing && (
                      <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, background: C.deep, color: C.violet, border: `1px solid ${C.violet}` }}>
                        pacing → {cdResult.delta.visualPacing}
                      </span>
                    )}
                    {cdResult.delta.platform && (
                      <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, background: C.deep, color: C.secondary, border: `1px solid ${C.subtle}` }}>
                        platform → {cdResult.delta.platform}
                      </span>
                    )}
                    {cdResult.delta.hookType && (
                      <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, background: C.deep, color: C.secondary, border: `1px solid ${C.subtle}` }}>
                        hook → {cdResult.delta.hookType}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const d = cdResult.delta
                      if (d.style) setAdStyle(d.style)
                      if (d.platform) setAdPlatform(d.platform)
                      if (d.visualPacing || d.hookType) merge({
                        ...(d.visualPacing ? { visualPacing: d.visualPacing } : {}),
                        ...(d.hookType ? { hookType: d.hookType } : {}),
                      })
                      setCdResult(null)
                      setCdInstruction('')
                    }}
                    style={{
                      padding: '5px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                      cursor: 'pointer', border: `1px solid ${C.gold}`, background: '#1a1408',
                      color: C.gold, flexShrink: 0,
                    }}
                  >
                    ✓ Apply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {adMode === 'product_ad' && !productName.trim() && !isGenerating && (
          <div style={{ padding: '6px 10px', borderRadius: 4, fontSize: 11, color: C.secondary, background: C.deep, border: `1px solid ${C.hairline}`, textAlign: 'center' }}>
            ← Enter a product name to generate
          </div>
        )}
```

- [ ] **Step 3: Verify the edit — search for cdInstruction in page.js**

Run: `grep -n "cdInstruction" app/prompt-engine-v3/page.js | head -10`
Expected: at least 3 lines — the useState declaration, the input value, and the onKeyDown handler.

- [ ] **Step 4: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: AI Creative Director™ UI — natural language instruction bar with Apply"
```
