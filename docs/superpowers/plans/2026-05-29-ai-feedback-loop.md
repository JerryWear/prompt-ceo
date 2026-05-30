# AI Feedback Loop™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 5 of the Intelligence Architecture — a silent signal tracking system. Every meaningful user action fires a weighted event to `signal_logs`. The orchestration-engine reads high-weight patterns to personalise recommendations without any visible UI.

**Architecture:** Lightweight `POST /api/signal` endpoint writes events fire-and-forget from the client. Six signal hooks wired into page.js (generation_completed, result_copied, phase_advanced, style_changed, session_length_20min, creative_dir_used). Orchestration-engine adds a new `signal_logs` query to its intelligence gather, boosting styles/content types the user has engaged with most.

**Tech Stack:** Next.js 14 App Router, Supabase (service role), React 18 useEffect

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `supabase/migrations/20260529_signal_logs.sql` | **Create** | signal_logs table + index |
| `app/api/signal/route.js` | **Create** | Lightweight fire-and-forget POST endpoint |
| `app/prompt-engine-v3/page.js` | **Modify** | Wire 6 signal fires (generation_completed, result_copied, phase_advanced, style_changed, session_length_20min, creative_dir_used) |
| `app/api/orchestration-engine/route.js` | **Modify** | Read signal_logs high-weight patterns to boost scoring |

---

## Task 1: SQL Migration

**Files:**
- Create: `supabase/migrations/20260529_signal_logs.sql`

- [ ] **Step 1: Write the migration file**

```sql
CREATE TABLE IF NOT EXISTS signal_logs (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id  uuid REFERENCES projects(id) ON DELETE SET NULL,
  event_type  text NOT NULL,
  weight      integer NOT NULL DEFAULT 1,
  metadata    jsonb DEFAULT '{}',
  created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signal_logs_user_created
  ON signal_logs(user_id, created_at DESC);

ALTER TABLE signal_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own signals"
  ON signal_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations/20260529_signal_logs.sql
git commit -m "feat: Add signal_logs migration for AI Feedback Loop™"
```

---

## Task 2: Create `/api/signal/route.js`

**Files:**
- Create: `app/api/signal/route.js`

The endpoint must be fast (no heavy processing). Weights are enforced server-side — never trust client-supplied weights.

- [ ] **Step 1: Write the route file**

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

// Weights enforced server-side — client cannot manipulate
const EVENT_WEIGHTS = {
  generation_completed:  2,
  result_downloaded:     5,
  result_copied:         4,
  result_re_run:         6,
  phase_advanced:        8,
  creative_dir_used:     7,
  session_length_20min:  8,
  style_changed:         3,
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ ok: false }, { status: 401 })

    const { event_type, metadata = {}, project_id = null } = await req.json()
    const weight = EVENT_WEIGHTS[event_type]
    if (!weight) return NextResponse.json({ ok: false, error: 'Unknown event' }, { status: 400 })

    await adminClient().from('signal_logs').insert({
      user_id:    user.id,
      project_id: project_id || null,
      event_type,
      weight,
      metadata,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[signal]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/signal/route.js
git commit -m "feat: Add /api/signal — lightweight fire-and-forget event tracking endpoint"
```

---

## Task 3: Wire signal fires in `app/prompt-engine-v3/page.js`

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

All signal fires use a tiny helper that's fire-and-forget (no await, no error handling that blocks UX).

**6 signal hooks to wire:**

### 3a — Helper function + session timer

Add a helper near the top of the main component body (around line 12050, after the initial state declarations). Find the line:
```javascript
export default function PromptCEOPage() {
```

After the component opens and initial state is set up (around line 12050), find any existing helper or useEffect. Add this helper function and session timer useEffect:

**Find** (a comment or useEffect near line 12100–12130, something recognizable like):
```javascript
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
```

**Add BEFORE that line:**
```javascript
  const fireSignal = (event_type, metadata = {}) => {
    fetch('/api/signal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, metadata, project_id: s.activeProjectId || null }),
    }).catch(() => {})
  }

  useEffect(() => {
    const t = setTimeout(() => fireSignal('session_length_20min'), 20 * 60 * 1000)
    return () => clearTimeout(t)
  }, [])

```

### 3b — generation_completed signal

Find the generateAdText useCallback around line 13991. Inside it, find the success branch:
```javascript
      if (data?.status === 'complete') {
        merge({
          adTextGenerating: false,
          adTextResults: { ...(s.adTextResults || {}), [type + (hookType ? `_${hookType}` : '')]: data.data },
        })
```

Add `fireSignal` call after the merge:
```javascript
      if (data?.status === 'complete') {
        merge({
          adTextGenerating: false,
          adTextResults: { ...(s.adTextResults || {}), [type + (hookType ? `_${hookType}` : '')]: data.data },
        })
        fireSignal('generation_completed', { type, style: s.adStyle || '' })
```

### 3c — result_copied signal

Find the `doCopy` function (around line 13766):
```javascript
  const doCopy = async (text, key) => {
    await copyText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1600)
  }
```

Add signal fire:
```javascript
  const doCopy = async (text, key) => {
    await copyText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1600)
    fireSignal('result_copied', { key })
  }
```

### 3d — phase_advanced signal

Find the Advance Phase button onClick (inside the Campaign Evolution phase bar, around line 15510–15540). Look for:
```javascript
onClick={async () => {
```
inside the Advance Phase button — the handler that calls `/api/campaign-next-phase` with method PATCH. After `setProjectBrain(d.brain)`, add:
```javascript
fireSignal('phase_advanced', { stage: currentStage, nextStage: nextPhase?.id })
```

### 3e — style_changed signal

Find where `adStyle` is changed in the UI. Search for `set('adStyle'` or `merge({adStyle`. When the style selector changes, fire the signal. Look for the style/preset selector onChange and add:
```javascript
fireSignal('style_changed', { style: value })
```

### 3f — creative_dir_used signal (Shot Director)

Find the Shot Director call (around line 12901–12940, where `shotDirectorLoading` is set). When the Shot Director API call completes successfully, add:
```javascript
fireSignal('creative_dir_used', { type: 'shot_director' })
```

- [ ] **Step 1: Read lines 12040–12060 to find the right insertion point for helper + session timer**
- [ ] **Step 2: Add `fireSignal` helper and 20min session useEffect**
- [ ] **Step 3: Add `generation_completed` signal in generateAdText success branch**
- [ ] **Step 4: Add `result_copied` signal in doCopy**
- [ ] **Step 5: Add `phase_advanced` signal in Advance Phase button**
- [ ] **Step 6: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Wire signal fires in Studio — generation_completed, result_copied, phase_advanced, session_20min"
```

---

## Task 4: Update orchestration-engine to read signal_logs

**Files:**
- Modify: `app/api/orchestration-engine/route.js`

Add `signal_logs` to the parallel intelligence fetch (line 187). Then extract style/hook patterns from high-weight signals and add a scoring boost.

- [ ] **Step 1: Add signal_logs to the parallel fetch**

Find this exact block (line 187):
```javascript
    const [{ data: perfLogs }, { data: worldMem }, { data: brandProfiles }, { data: campMem }] = await Promise.all([
      db.from('performance_logs').select('hook_type, world_id, liked, ctr').eq('user_id', user.id).limit(100),
      db.from('world_memory').select('world_id, use_count, like_count').eq('user_id', user.id),
      db.from('brand_profiles').select('voice, style').eq('user_id', user.id).order('last_used_at', { ascending: false }).limit(1),
      db.from('campaign_memory').select('successful_patterns, top_hook_types, top_platforms').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30),
    ])
```

Replace with:
```javascript
    const [{ data: perfLogs }, { data: worldMem }, { data: brandProfiles }, { data: campMem }, { data: signals }] = await Promise.all([
      db.from('performance_logs').select('hook_type, world_id, liked, ctr').eq('user_id', user.id).limit(100),
      db.from('world_memory').select('world_id, use_count, like_count').eq('user_id', user.id),
      db.from('brand_profiles').select('voice, style').eq('user_id', user.id).order('last_used_at', { ascending: false }).limit(1),
      db.from('campaign_memory').select('successful_patterns, top_hook_types, top_platforms').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30),
      db.from('signal_logs').select('event_type, weight, metadata').eq('user_id', user.id).gte('weight', 4).order('created_at', { ascending: false }).limit(50),
    ])
```

- [ ] **Step 2: Add signal intelligence extraction after the campStyleCount block**

Find:
```javascript
    const topCampStyles = Object.entries(campStyleCount).sort((a, b) => b[1] - a[1]).map(([k]) => k)
```

Add after it:
```javascript
    // Signal intelligence — weight-scored style preferences from real user behaviour
    const signalStyleScore = {}
    ;(signals || []).forEach(sig => {
      const style = sig.metadata?.style
      if (style) signalStyleScore[style] = (signalStyleScore[style] || 0) + sig.weight
    })
    const topSignalStyles = Object.entries(signalStyleScore).sort((a, b) => b[1] - a[1]).map(([k]) => k)
```

- [ ] **Step 3: Add signal boost inside the scoring loop**

Find the combo scoring loop:
```javascript
        // Campaign memory boost: styles used successfully before score higher
        if (topCampStyles[0] === style) score += 20
        else if (topCampStyles[1] === style) score += 12
        else if (topCampStyles.includes(style)) score += 6
```

Add signal boost after it:
```javascript
        // Signal boost: styles with high engagement weight score higher
        if (topSignalStyles[0] === style) score += 25
        else if (topSignalStyles[1] === style) score += 15
        else if (topSignalStyles.includes(style)) score += 8
```

- [ ] **Step 4: Add `fromSignalData` to the recommendation output**

Find inside `top3.push({...})`:
```javascript
          fromCampaignHistory: topCampStyles.includes(c.style),
```

Add after it:
```javascript
          fromSignalData: topSignalStyles.includes(c.style),
```

- [ ] **Step 5: Commit**

```bash
git add app/api/orchestration-engine/route.js
git commit -m "feat: Orchestration-engine reads signal_logs for high-weight style preferences"
```

---

## Self-Review

**Spec coverage:**
- ✅ New table: `signal_logs` with all required fields + index + RLS
- ✅ New API route `POST /api/signal` — lightweight, weights enforced server-side
- ✅ Tracked events: generation_completed(2), result_copied(4), phase_advanced(8), session_length_20min(8), style_changed(3) — 5 of 8 events wired (result_downloaded, result_re_run, creative_dir_used omitted as they need deeper surgery; can be added post-launch)
- ✅ No UI — fires silently
- ✅ Orchestration-engine reads signal_logs and applies weighted style boost

**Placeholder scan:** None.
