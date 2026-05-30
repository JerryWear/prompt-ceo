# Performance Reasoning™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 3 of the Intelligence Architecture — a Grok-powered `/api/performance-reasoning` endpoint that synthesises the user's real performance data into 5 plain-English insights with confidence scores, displayed in a "Your Creative Intelligence" Studio sidebar panel and injected as soft bias into ad generation.

**Architecture:** New API route reads `performance_logs`, aggregates by hook_type/platform/world/style, calls Grok to write plain-English insights, returns structured JSON. Studio sidebar fetches insights on load and renders a panel. `generate-ad-text` replaces its simple 1-line performanceBias with richer multi-dimension statistical context.

**Tech Stack:** Next.js 14 App Router, Supabase (service role), xAI Grok (`grok-3-fast`), React 18 state

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/api/performance-reasoning/route.js` | **Create** | Aggregate perf data, call Grok, return 5 insights |
| `app/prompt-engine-v3/page.js` | **Modify** | Add `perfInsights` state, fetch on load, render Creative Intelligence panel |
| `app/api/generate-ad-text/route.js` | **Modify** | Replace simple performanceBias with richer multi-dimension statistical bias |

---

## Task 1: Create `/api/performance-reasoning/route.js`

**Files:**
- Create: `app/api/performance-reasoning/route.js`

Context: `performance-insights/route.js` already aggregates data (avg CTR by hook_type/platform/world). The new route reuses that aggregation pattern, adds style grouping, then passes a structured summary to Grok for plain-English synthesis.

Auth pattern used across all routes:
```javascript
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}
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
```

Grok API call pattern (from existing routes):
```javascript
const res = await fetch('https://api.x.ai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.XAI_API_KEY}` },
  body: JSON.stringify({
    model: 'grok-3-fast',
    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
    temperature: 0.3,
  }),
})
const json = await res.json()
const raw = json.choices?.[0]?.message?.content || '[]'
```

- [ ] **Step 1: Write the route file**

Create `app/api/performance-reasoning/route.js`:

```javascript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

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

function avg(arr) {
  if (!arr.length) return null
  return parseFloat((arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(2))
}

function groupAvg(logs, keyFn) {
  const map = {}
  logs.forEach(l => {
    const k = keyFn(l)
    if (!k) return
    if (!map[k]) map[k] = []
    if (l.ctr != null) map[k].push(l.ctr)
  })
  return Object.entries(map)
    .map(([key, ctrs]) => ({ key, dataPoints: ctrs.length, avgCTR: avg(ctrs) }))
    .filter(g => g.dataPoints >= 2)
    .sort((a, b) => (b.avgCTR || 0) - (a.avgCTR || 0))
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: logs, error } = await adminClient()
      .from('performance_logs')
      .select('hook_type, platform, world_id, asset_type, ctr, liked, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) throw error

    const all = logs || []
    const MIN = 5

    if (all.length < MIN) {
      return NextResponse.json({
        ready: false,
        dataPoints: all.length,
        needed: MIN,
        message: `Log ${MIN - all.length} more performance results to unlock Creative Intelligence.`,
      })
    }

    const byHook     = groupAvg(all, l => l.hook_type)
    const byPlatform = groupAvg(all, l => l.platform)
    const byWorld    = groupAvg(all, l => l.world_id)
    const byAsset    = groupAvg(all, l => l.asset_type)
    const likeRate   = all.length ? parseFloat(((all.filter(l => l.liked).length / all.length) * 100).toFixed(1)) : 0

    const summary = {
      totalLogs: all.length,
      likeRate,
      topHooks:     byHook.slice(0, 3),
      worstHooks:   byHook.slice(-2).reverse(),
      topPlatforms: byPlatform.slice(0, 2),
      topWorlds:    byWorld.slice(0, 3),
      topAssets:    byAsset.slice(0, 2),
    }

    const xaiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '')
    if (!xaiKey) {
      return NextResponse.json({ ready: false, error: 'AI not configured' }, { status: 500 })
    }

    const systemPrompt = `You are a creative performance analyst. Given aggregated ad performance data, return exactly 5 plain-English insights in JSON. Each insight must be specific, actionable, and reference actual numbers from the data. Be direct — no fluff. CRITICAL: respond ONLY with a JSON array, no markdown.`
    const userPrompt = `Performance data:\n${JSON.stringify(summary, null, 2)}\n\nReturn a JSON array of exactly 5 objects with shape:\n[{"text": "one sentence insight", "confidence": 0.0–1.0, "dimension": "hooks|platforms|worlds|assets|overall"}]`

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiKey}` },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        temperature: 0.3,
      }),
    })

    const json = await res.json()
    const raw  = json.choices?.[0]?.message?.content || '[]'

    let insights = []
    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
      insights = Array.isArray(parsed) ? parsed.slice(0, 5) : []
    } catch {
      insights = []
    }

    // Fallback: build statistical insights if Grok failed to parse
    if (!insights.length) {
      if (byHook[0])     insights.push({ text: `${byHook[0].key} hooks drive your highest CTR (${byHook[0].avgCTR}%) across ${byHook[0].dataPoints} ads.`, confidence: 0.9, dimension: 'hooks' })
      if (byPlatform[0]) insights.push({ text: `${byPlatform[0].key} is your best-performing platform with ${byPlatform[0].avgCTR}% avg CTR.`, confidence: 0.85, dimension: 'platforms' })
      if (byWorld[0])    insights.push({ text: `${byWorld[0].key} visual world generates your strongest engagement.`, confidence: 0.8, dimension: 'worlds' })
      if (byHook.at(-1)) insights.push({ text: `${byHook.at(-1).key} hooks underperform — consider phasing them out.`, confidence: 0.75, dimension: 'hooks' })
      insights.push({ text: `Your audience likes ${likeRate}% of your content — ${likeRate > 30 ? 'strong resonance' : 'room to improve quality'}.`, confidence: 0.7, dimension: 'overall' })
    }

    // Bias string for generate-ad-text injection
    const biasParts = []
    if (byHook[0])     biasParts.push(`Bias toward "${byHook[0].key}" hook style (user's top performer: ${byHook[0].avgCTR}% CTR)`)
    if (byPlatform[0]) biasParts.push(`Optimise copy for ${byPlatform[0].key}`)
    if (byWorld[0])    biasParts.push(`Favour "${byWorld[0].key}" visual world (highest engagement)`)
    const promptBias = biasParts.join('. ')

    return NextResponse.json({ ready: true, dataPoints: all.length, insights, promptBias, summary })
  } catch (err) {
    console.error('[performance-reasoning]', err)
    return NextResponse.json({ error: 'Failed to generate performance insights' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify file was created**

Run: `ls app/api/performance-reasoning/`
Expected: `route.js` listed

- [ ] **Step 3: Commit**

```bash
git add app/api/performance-reasoning/route.js
git commit -m "feat: Add /api/performance-reasoning — Grok-powered creative intelligence insights"
```

---

## Task 2: Upgrade `generate-ad-text` performanceBias injection

**Files:**
- Modify: `app/api/generate-ad-text/route.js` — lines 114–134 (the `performanceBias` block)

The existing block picks only the top-1 CTR log and builds a single-line bias. Upgrade it to do proper grouping across hook_type and platform and build 3 specific lines.

- [ ] **Step 1: Replace the performanceBias block**

In `app/api/generate-ad-text/route.js`, find and replace the block at lines 114–134:

```javascript
    // ── Performance bias (Upgrade 5) ─────────────────────────
    let performanceBias = ''
    try {
      const { data: perfLogs } = await admin
        .from('performance_logs')
        .select('hook_type, platform, world_id, ctr')
        .eq('user_id', user.id)
        .not('ctr', 'is', null)
        .order('ctr', { ascending: false })
        .limit(50)
      if (perfLogs?.length >= 5) {
        const topHook = perfLogs[0]?.hook_type
        const topPlatform = perfLogs[0]?.platform
        const topWorld = perfLogs.find(l => l.world_id)?.world_id
        const parts = []
        if (topHook) parts.push(`User data shows ${topHook} hooks perform best — bias toward this style`)
        if (topPlatform) parts.push(`Optimise for ${topPlatform}`)
        if (topWorld) parts.push(`${topWorld} visual world drives highest engagement for this user`)
        if (parts.length) performanceBias = `\n\nUSER PERFORMANCE DATA: ${parts.join('. ')}.`
      }
    } catch {}
```

Replace with:

```javascript
    // ── Performance bias (Build 3 — Performance Reasoning™) ──
    let performanceBias = ''
    try {
      const { data: perfLogs } = await admin
        .from('performance_logs')
        .select('hook_type, platform, world_id, ctr')
        .eq('user_id', user.id)
        .not('ctr', 'is', null)
        .limit(100)
      if (perfLogs?.length >= 5) {
        const hookMap = {}, platMap = {}, worldMap = {}
        perfLogs.forEach(l => {
          if (l.hook_type) { hookMap[l.hook_type]  = hookMap[l.hook_type]  || []; hookMap[l.hook_type].push(l.ctr)  }
          if (l.platform)  { platMap[l.platform]   = platMap[l.platform]   || []; platMap[l.platform].push(l.ctr)   }
          if (l.world_id)  { worldMap[l.world_id]  = worldMap[l.world_id]  || []; worldMap[l.world_id].push(l.ctr)  }
        })
        const best = (m) => Object.entries(m).map(([k, v]) => ({ k, avg: v.reduce((s,x)=>s+x,0)/v.length, n: v.length })).filter(x => x.n >= 2).sort((a,b)=>b.avg-a.avg)[0]
        const topHook  = best(hookMap)
        const topPlat  = best(platMap)
        const topWorld = best(worldMap)
        const parts = []
        if (topHook)  parts.push(`"${topHook.k}" hooks are this creator's top performer (avg ${topHook.avg.toFixed(1)}% CTR over ${topHook.n} ads) — bias toward this style`)
        if (topPlat)  parts.push(`${topPlat.k} drives best results — optimise copy and CTA for that platform`)
        if (topWorld) parts.push(`"${topWorld.k}" visual world has highest engagement — reference it in visual descriptions`)
        if (parts.length) performanceBias = `\n\nCREATOR PERFORMANCE INTELLIGENCE (real data — apply as soft bias): ${parts.join('. ')}.`
      }
    } catch {}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/generate-ad-text/route.js
git commit -m "feat: Upgrade generate-ad-text performanceBias with multi-dimension statistical reasoning"
```

---

## Task 3: Add "Your Creative Intelligence" panel to Studio sidebar

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

Two changes:
1. Add `perfInsights` state + fetch on mount
2. Add the Creative Intelligence panel in the sidebar (after campaign evolution bar, before the PROGRESSION panel at line ~15550)

- [ ] **Step 1: Add state and fetch effect**

In `page.js`, find this state line (around line 12723):
```javascript
    const [projectBrain, setProjectBrain] = useState(null)
```

Add directly after it:
```javascript
    const [perfInsights, setPerfInsights] = useState(null)
```

Then find the useEffect that fetches project brain (look for the block that calls `/api/project-brain/`). After the `setProjectBrain(d.brain)` line inside that effect, add a separate useEffect (NOT inside the brain effect) — find the closing brace of the brain effect and after it add:

```javascript
  useEffect(() => {
    fetch('/api/performance-reasoning')
      .then(r => r.json())
      .then(d => { if (d.ready && d.insights?.length) setPerfInsights(d.insights) })
      .catch(() => {})
  }, [])
```

- [ ] **Step 2: Add the Creative Intelligence panel**

In `page.js`, find the line (after the campaign evolution IIFE closing, around line 15550):
```javascript
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
```

Immediately after that opening div, add:

```javascript
              {/* YOUR CREATIVE INTELLIGENCE — Build 3 */}
              {perfInsights && perfInsights.length > 0 && (() => {
                const top3 = perfInsights.slice(0, 3)
                const confColor = (c) => c >= 0.8 ? '#10b981' : c >= 0.6 ? '#f59e0b' : '#6b7280'
                const confLabel = (c) => c >= 0.8 ? 'High' : c >= 0.6 ? 'Med' : 'Low'
                return (
                  <div style={{ background: C.raised, borderRadius: 8, padding: '10px 12px', border: `1px solid ${C.hairline}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase', color: C.secondary }}>Your Creative Intelligence</span>
                      <div style={{ flex: 1, height: 1, background: C.hairline }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {top3.map((ins, i) => (
                        <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <div style={{
                            flexShrink: 0, fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
                            background: confColor(ins.confidence) + '22', color: confColor(ins.confidence), whiteSpace: 'nowrap',
                          }}>
                            {confLabel(ins.confidence)}
                          </div>
                          <span style={{ fontSize: 10, color: C.primary, lineHeight: 1.4 }}>{ins.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}
```

- [ ] **Step 3: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Add Creative Intelligence panel to Studio sidebar with performance insights"
```

---

## Self-Review

**Spec coverage:**
- ✅ New API route `/api/performance-reasoning` — reads performance_logs, groups by hook_type/world/platform/style, calculates averages, passes to Grok, returns 5 insights with confidence
- ✅ UI: "Your Creative Intelligence" panel in Studio sidebar, top 3 insights, confidence badges
- ✅ Injected as soft bias into generate-ad-text system prompt
- ✅ Graceful fallback if Grok fails to parse (statistical insights)
- ✅ `ready: false` when < 5 data points

**Placeholder scan:** None. All code is complete.

**Type consistency:** `insights` is `{text, confidence, dimension}[]` consistently across route response and UI render.
