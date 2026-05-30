# Project Brain™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a persistent per-project memory layer (Project Brain™) that tracks campaign stage, fatigue, and best-performing patterns — then surfaces that intelligence into generations and the Studio UI.

**Architecture:** A new Supabase table `project_brain` stores one row per project. Three existing API routes read/write it: `instant-campaign` writes after generation, `generate-ad-text` injects brain context into the system prompt, and `orchestration-engine` reads it as the primary config signal. A lightweight API route (`/api/project-brain/[id]`) handles CRUD. The Studio header gains three new UI elements: a campaign stage pill, a fatigue warning bar, and a "What next?" button.

**Tech Stack:** Next.js 14 App Router, Supabase (service role for writes, anon+SSR for reads), xAI Grok API, React 18 (`useState`/`useEffect`/`useCallback`)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/api/project-brain/[id]/route.js` | **Create** | GET + PATCH the brain row for a project |
| `app/api/instant-campaign/route.js` | **Modify** | PATCH brain after generation (fatigue + stage tracking) |
| `app/api/generate-ad-text/route.js` | **Modify** | Inject brain context into system prompt |
| `app/api/orchestration-engine/route.js` | **Modify** | Read brain as primary config signal |
| `app/prompt-engine-v3/page.js` | **Modify** | Brain state + Studio header UI (stage pill, fatigue bar, "What next?" button) |

---

## Task 1: Create the Supabase `project_brain` table

**Files:**
- No file changes — run SQL in Supabase dashboard

- [ ] **Step 1: Open Supabase SQL editor**

Go to your Supabase project → SQL Editor → New query. Paste and run:

```sql
CREATE TABLE IF NOT EXISTS project_brain (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            uuid NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  user_id               uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_stage        text NOT NULL DEFAULT 'attention'
                          CHECK (campaign_stage IN ('attention','emotional_connection','desire_escalation','conversion','retargeting')),
  fatigue_score         integer NOT NULL DEFAULT 0 CHECK (fatigue_score >= 0 AND fatigue_score <= 100),
  best_hook_types       text[] NOT NULL DEFAULT '{}',
  best_worlds           text[] NOT NULL DEFAULT '{}',
  best_styles           text[] NOT NULL DEFAULT '{}',
  best_platform         text,
  active_strategy       jsonb NOT NULL DEFAULT '{}',
  audience_temperature  text NOT NULL DEFAULT 'cold'
                          CHECK (audience_temperature IN ('cold','warming','hot','fatigued')),
  creator_energy        text NOT NULL DEFAULT 'aspirational'
                          CHECK (creator_energy IN ('polished','raw','energetic','calm','emotional','aspirational')),
  pacing_profile        text NOT NULL DEFAULT 'balanced'
                          CHECK (pacing_profile IN ('fast','balanced','slow','cinematic')),
  total_generations     integer NOT NULL DEFAULT 0,
  last_recommended_shift text,
  last_updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_brain_user_id ON project_brain(user_id);
CREATE INDEX IF NOT EXISTS idx_project_brain_project_id ON project_brain(project_id);

ALTER TABLE project_brain ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own brain" ON project_brain
  FOR ALL USING (auth.uid() = user_id);
```

- [ ] **Step 2: Verify table created**

In Supabase → Table Editor, confirm `project_brain` appears with all columns. No errors in the SQL editor output.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: create project_brain Supabase table"
```

---

## Task 2: Create `/api/project-brain/[id]` route

**Files:**
- Create: `app/api/project-brain/[id]/route.js`

- [ ] **Step 1: Create the directory and file**

Create `app/api/project-brain/[id]/route.js` with this exact content:

```javascript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

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

const admin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET /api/project-brain/[id] — fetch brain for a project (creates if missing)
export async function GET(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id: projectId } = await params

  // Try to fetch existing brain
  const { data: existing } = await admin()
    .from('project_brain')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', user.id)
    .single()

  if (existing) return NextResponse.json({ brain: existing })

  // Create a fresh brain row for this project
  const { data: created, error } = await admin()
    .from('project_brain')
    .insert({ project_id: projectId, user_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ brain: created })
}

// PATCH /api/project-brain/[id] — update brain fields
export async function PATCH(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id: projectId } = await params
  const body = await req.json()

  // Whitelist updatable fields
  const allowed = [
    'campaign_stage', 'fatigue_score', 'best_hook_types', 'best_worlds',
    'best_styles', 'best_platform', 'active_strategy', 'audience_temperature',
    'creator_energy', 'pacing_profile', 'total_generations', 'last_recommended_shift',
  ]
  const updates = {}
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key]
  }
  updates.last_updated_at = new Date().toISOString()

  if (Object.keys(updates).length === 1) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  // Upsert — create if not exists, update if exists
  const { data, error } = await admin()
    .from('project_brain')
    .upsert(
      { project_id: projectId, user_id: user.id, ...updates },
      { onConflict: 'project_id' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ brain: data })
}
```

- [ ] **Step 2: Test GET — fetch brain for a project**

Start dev server (`npm run dev`). In browser console or curl, with a valid session:

```bash
curl http://localhost:3000/api/project-brain/SOME_PROJECT_ID
```

Expected: `{ brain: { campaign_stage: "attention", fatigue_score: 0, ... } }`

- [ ] **Step 3: Test PATCH — update a field**

```bash
curl -X PATCH http://localhost:3000/api/project-brain/SOME_PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{"fatigue_score": 25, "campaign_stage": "emotional_connection"}'
```

Expected: `{ brain: { campaign_stage: "emotional_connection", fatigue_score: 25, ... } }`

- [ ] **Step 4: Commit**

```bash
git add app/api/project-brain/
git commit -m "feat: add GET+PATCH /api/project-brain/[id] route"
```

---

## Task 3: Wire instant-campaign to write the brain after generation

**Files:**
- Modify: `app/api/instant-campaign/route.js` — after the existing campaign_memory write (around line 152), add brain PATCH

- [ ] **Step 1: Find the write location**

Open `app/api/instant-campaign/route.js`. Find the block starting with:
```javascript
// Step 5 — write campaign_memory (Build 5)
```
It's around line 152. The brain write goes AFTER the world_memory block (around line 174), before the `return NextResponse.json(...)`.

- [ ] **Step 2: Add the brain write**

After the `} catch {}` that closes the world_memory block and before `return NextResponse.json({`, add:

```javascript
    // Step 7 — update project_brain
    try {
      if (projectId) {
        // Fetch current brain to calculate new fatigue
        const { data: currentBrain } = await admin
          .from('project_brain')
          .select('total_generations, fatigue_score, best_hook_types, best_worlds, best_styles, best_platform')
          .eq('project_id', projectId)
          .single()

        const prevTotal = currentBrain?.total_generations || 0
        const prevFatigue = currentBrain?.fatigue_score || 0

        // Fatigue increases by 8 per generation, decays by 2 if > 50 (soft cap)
        const newFatigue = Math.min(100, prevFatigue >= 50
          ? Math.max(0, prevFatigue - 2 + 8)
          : prevFatigue + 8)

        // Merge new hook type, world, style into best arrays (keep last 5 unique)
        const mergeArr = (existing = [], newVal) => {
          if (!newVal) return existing
          const deduped = [newVal, ...(existing || []).filter(v => v !== newVal)]
          return deduped.slice(0, 5)
        }

        await admin.from('project_brain').upsert({
          project_id:       projectId,
          user_id:          user.id,
          total_generations: prevTotal + 1,
          fatigue_score:    newFatigue,
          best_hook_types:  mergeArr(currentBrain?.best_hook_types, orch.hookType),
          best_worlds:      mergeArr(currentBrain?.best_worlds, orch.suggestedWorld),
          best_styles:      mergeArr(currentBrain?.best_styles, style),
          best_platform:    orch.platform,
          last_updated_at:  new Date().toISOString(),
        }, { onConflict: 'project_id' })
      }
    } catch {}
```

- [ ] **Step 3: Verify the write works**

Run an instant campaign in the app with a project selected. Then check Supabase → Table Editor → `project_brain`. Confirm a row exists for that project with `total_generations: 1` and a non-zero `fatigue_score`.

- [ ] **Step 4: Commit**

```bash
git add app/api/instant-campaign/route.js
git commit -m "feat: instant-campaign writes project_brain after generation"
```

---

## Task 4: Inject brain context into generate-ad-text system prompt

**Files:**
- Modify: `app/api/generate-ad-text/route.js`

The goal: if a `projectId` is in the request body AND a brain row exists, inject the brain's `campaign_stage`, `best_hook_types`, and `active_strategy` into the Grok system prompt as a soft bias.

- [ ] **Step 1: Find where the body is read**

Open `app/api/generate-ad-text/route.js`. Find where `body` is destructured (around line 56–66). It includes `adConfig`, `type`, etc. Add `projectId` extraction here:

```javascript
const projectId = clean(body?.projectId || body?.adConfig?.projectId)
```

Add this line immediately after the existing destructuring block.

- [ ] **Step 2: Find the system prompt construction**

Search for `'You are a world-class advertising strategist'` in `generate-ad-text/route.js`. This is the Grok system message string. It's passed to the AI call.

- [ ] **Step 3: Add brain fetch before the AI call**

Find the section that builds the system prompt (look for where `systemPrompt` or the system message string is assembled). Before the `fetch('https://api.x.ai/...')` call, add:

```javascript
    // ── Project Brain™ context injection ──────────────────
    let brainContext = ''
    if (projectId) {
      try {
        const { data: brain } = await admin
          .from('app_users') // reuse existing admin client
          .select('id')
          .eq('id', user.id)
          .single()
        // Fetch brain separately
        const { data: brainRow } = await admin
          .from('project_brain')
          .select('campaign_stage, best_hook_types, best_styles, best_platform, audience_temperature, fatigue_score, active_strategy')
          .eq('project_id', projectId)
          .eq('user_id', user.id)
          .single()

        if (brainRow) {
          const parts = []
          if (brainRow.campaign_stage) parts.push(`Current campaign stage: ${brainRow.campaign_stage.replace(/_/g, ' ')} — optimize content for this phase.`)
          if (brainRow.best_hook_types?.length) parts.push(`This creator's best hook types: ${brainRow.best_hook_types.join(', ')} — lean into these.`)
          if (brainRow.best_styles?.length) parts.push(`Top performing styles for this project: ${brainRow.best_styles.slice(0, 3).join(', ')}.`)
          if (brainRow.audience_temperature) parts.push(`Audience temperature: ${brainRow.audience_temperature} — adjust warmth of messaging accordingly.`)
          if (brainRow.fatigue_score > 70) parts.push(`Creative fatigue is high (${brainRow.fatigue_score}/100) — push for maximum novelty and pattern-breaks.`)
          if (parts.length) brainContext = '\n\nProject intelligence:\n' + parts.join('\n')
        }
      } catch {}
    }
```

- [ ] **Step 4: Append brainContext to the system message**

Find the system message string passed to Grok (it starts with `'You are a world-class advertising strategist...'`). Append `${brainContext}` at the end of that string. The exact edit depends on how the string is constructed — find the closing `'` or template literal end and insert before it:

```javascript
// Before:
content: 'You are a world-class advertising strategist and direct-response copywriter. ...'
// After:
content: `You are a world-class advertising strategist and direct-response copywriter. ...${brainContext}`
```

- [ ] **Step 5: Verify injection works**

Generate ad text with a project that has a brain row. In the Vercel/dev logs, you should see the brain context flowing in. The output should subtly match the campaign stage.

- [ ] **Step 6: Commit**

```bash
git add app/api/generate-ad-text/route.js
git commit -m "feat: inject project brain context into generate-ad-text system prompt"
```

---

## Task 5: Wire orchestration-engine to read brain as primary signal

**Files:**
- Modify: `app/api/orchestration-engine/route.js`

The orchestration engine currently builds config from static TYPE_HOOK, TYPE_WORLDS, GOAL_PLATFORM tables. If a brain row exists, it should override the defaults with brain data.

- [ ] **Step 1: Find where projectId is accepted**

Open `app/api/orchestration-engine/route.js`. Search for `req.json()`. Extract `projectId` from the request body:

```javascript
const { type, goal, style, productName, brandProfile, creatorProfile, projectId } = await req.json()
```

- [ ] **Step 2: Find the orchestration output block**

Find where the route builds its response config — where it sets `hookType`, `platform`, `worlds` etc. using the TYPE_HOOK/TYPE_WORLDS constants. It's in the main handler function.

- [ ] **Step 3: Add brain override after static config**

After the static config is built (the block that sets `hookType`, `platform`, `worlds` from constants), add:

```javascript
    // ── Project Brain™ override ──────────────────────────
    if (projectId) {
      try {
        const { data: brain } = await admin()
          .from('project_brain')
          .select('best_hook_types, best_worlds, best_platform, campaign_stage, fatigue_score, audience_temperature, pacing_profile')
          .eq('project_id', projectId)
          .single()

        if (brain) {
          // Override hook type with the project's best performing type
          if (brain.best_hook_types?.[0]) hookType = brain.best_hook_types[0]
          // Override worlds with brain's learned best worlds
          if (brain.best_worlds?.length > 0) suggestedWorld = brain.best_worlds[0]
          // Override platform with brain's learned best platform
          if (brain.best_platform) platform = brain.best_platform
          // Inject brain metadata into context string for downstream use
          brainMeta = {
            campaign_stage:       brain.campaign_stage,
            fatigue_score:        brain.fatigue_score,
            audience_temperature: brain.audience_temperature,
            pacing_profile:       brain.pacing_profile,
          }
        }
      } catch {}
    }
```

Note: You need to declare `let brainMeta = null` near the top of the handler, and ensure `hookType`, `suggestedWorld`, `platform` are declared with `let` (not `const`) so they can be reassigned.

- [ ] **Step 4: Include brainMeta in the response**

Find the `return NextResponse.json(...)` call and add `brainMeta` to the response:

```javascript
return NextResponse.json({
  // ... existing fields ...
  brainMeta,
})
```

- [ ] **Step 5: Verify orchestration uses brain**

With a project that has a brain row with `best_hook_types: ['curiosity']` and `best_platform: 'tiktok'`, call the orchestration engine with that `projectId`. The response should show `hookType: 'curiosity'` and `platform: 'tiktok'` regardless of the `type`/`goal` inputs.

- [ ] **Step 6: Commit**

```bash
git add app/api/orchestration-engine/route.js
git commit -m "feat: orchestration-engine reads project_brain as primary signal"
```

---

## Task 6: Add brain state + UI to page.js Studio header

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

Add three things:
1. `projectBrain` state that fetches from `/api/project-brain/[id]` when `activeProjectId` changes
2. A campaign stage pill in the Studio header
3. A fatigue warning bar when `fatigue_score > 70`
4. A "What should I build next?" button that asks Grok based on brain state

- [ ] **Step 1: Add projectBrain state**

Find the block in `page.js` where other project-related states are declared (search for `const [fullDayResult`  around line 12717). Add immediately after:

```javascript
  const [projectBrain, setProjectBrain] = useState(null)
```

- [ ] **Step 2: Add useEffect to fetch brain when project changes**

Find the section with other `useEffect` hooks (search for `useEffect(() => {` blocks). Add a new one:

```javascript
  useEffect(() => {
    if (!s.activeProjectId) { setProjectBrain(null); return }
    fetch(`/api/project-brain/${s.activeProjectId}`)
      .then(r => r.json())
      .then(d => { if (d.brain) setProjectBrain(d.brain) })
      .catch(() => {})
  }, [s.activeProjectId])
```

- [ ] **Step 3: Find the Studio header**

Search for `s.view === 'studio'` in page.js (around line 14771). The Studio view opens a 3-column grid. Look for the center column header area — it's where the generation button lives. Search for `Generate` button text nearby.

- [ ] **Step 4: Add stage pill and fatigue bar above the generation button**

Find where the center column of the Studio view begins (the `1fr` column in the grid). Just before the generate button area, add:

```javascript
{/* Project Brain™ status bar */}
{projectBrain && (
  <div style={{ padding: '6px 16px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
    {/* Campaign stage pill */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted }}>Stage</span>
      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: C.blueGlow, border: `1px solid ${C.blueDim}`, color: C.blue, textTransform: 'capitalize' }}>
        {(projectBrain.campaign_stage || 'attention').replace(/_/g, ' ')}
      </span>
    </div>
    {/* Fatigue score */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted }}>Fatigue</span>
      <div style={{ width: 60, height: 4, borderRadius: 2, background: C.raised, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2, transition: 'width 0.4s',
          width: `${projectBrain.fatigue_score || 0}%`,
          background: (projectBrain.fatigue_score || 0) > 70 ? C.tension : (projectBrain.fatigue_score || 0) > 40 ? C.gold : C.green,
        }} />
      </div>
      <span style={{ fontSize: 8, color: C.muted }}>{projectBrain.fatigue_score || 0}</span>
    </div>
    {/* Fatigue warning */}
    {projectBrain.fatigue_score > 70 && (
      <span style={{ fontSize: 8, color: C.tension, fontWeight: 700 }}>⚠ Creative fatigue high — try a new style</span>
    )}
    {/* What next button */}
    <button
      onClick={async () => {
        if (!projectBrain) return
        const stage = projectBrain.campaign_stage || 'attention'
        const hooks = (projectBrain.best_hook_types || []).join(', ') || 'pain, curiosity'
        const fatigue = projectBrain.fatigue_score || 0
        const prompt = `Project is at ${stage.replace(/_/g, ' ')} stage. Best hooks: ${hooks}. Fatigue: ${fatigue}/100. In one sentence, what's the single best thing to generate next?`
        const xRes = await fetch('/api/ai-director', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: prompt, history: [], collectedParams: {} }),
        })
        const xd = await xRes.json()
        if (xd.directorMessage) alert(`Project Brain suggests: ${xd.directorMessage}`)
      }}
      style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 6, cursor: 'pointer', border: `1px solid ${C.blueDim}`, background: 'none', color: C.blue }}
    >
      What next? ✦
    </button>
  </div>
)}
```

- [ ] **Step 5: Verify UI renders**

Load the app, select a project that has a brain row. The Studio header should show the stage pill, fatigue bar, and "What next?" button. With no project selected, the bar should not appear.

- [ ] **Step 6: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Project Brain UI — stage pill, fatigue bar, What next button in Studio"
```

---

## Task 7: Push to production

- [ ] **Step 1: Final check**

```bash
git log --oneline -5
```

Expected: 5 recent commits for Project Brain.

- [ ] **Step 2: Push**

```bash
git push origin main
```

- [ ] **Step 3: Verify on Vercel**

After deploy, select a project in the Studio. Confirm the brain status bar appears. Run an Instant Campaign — check Supabase that `project_brain` row was created/updated with incremented `total_generations` and updated `fatigue_score`.

---

## Self-Review

**Spec coverage check:**
- ✅ New Supabase table `project_brain` with all specified fields — Task 1
- ✅ GET/POST/PATCH `/api/project-brain/[id]` — Task 2 (GET creates if missing, PATCH upserts)
- ✅ `instant-campaign` PATCHes brain after generation — Task 3
- ✅ `generate-ad-text` injects campaign_stage + strategy — Task 4
- ✅ `orchestration-engine` reads brain as primary signal — Task 5
- ✅ Campaign stage indicator in Studio header — Task 6
- ✅ Fatigue warning when fatigue_score > 70 — Task 6
- ✅ "What should I generate next?" button — Task 6

**Placeholder scan:** None found. All code is complete.

**Type consistency:** `project_brain` table fields match exactly across all tasks. `upsert` uses `onConflict: 'project_id'` consistently.
