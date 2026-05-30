# Campaign Evolution System™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-phase campaign progression system that tracks which phase a project is in, gates advancement behind a generation threshold, injects rich phase-specific context into AI prompts, and shows a visual phase bar in the Studio.

**Architecture:** The `project_brain.campaign_stage` field (already exists) drives everything. A new `/api/campaign-next-phase` route evaluates readiness to advance using `total_generations` thresholds. `generate-ad-text` gets richer phase injection (hook_type, CTA_type, audience_state per phase). The Studio UI replaces the simple stage pill with a 5-step progress bar and an "Advance Phase" button. A `campaign_phase` column is added to `generation_logs` so every generation is tagged with the phase it was created in.

**Tech Stack:** Next.js 14 App Router, Supabase (service role), React 18 inline styles, xAI Grok API

---

## Phase Map (used across multiple tasks — memorize this)

```javascript
const PHASE_MAP = {
  attention: {
    label: 'Attention', num: 1,
    hook_type: 'pattern_break', visual_style: 'high_contrast',
    cta_type: 'curiosity_click', audience_state: 'cold',
    description: 'Stop the scroll. No context assumed. Hit hard in the first frame.',
    cumulative_threshold: 5,  // advance when total_generations >= 5
    color: '#3b82f6',
  },
  emotional_connection: {
    label: 'Connection', num: 2,
    hook_type: 'story', visual_style: 'cinematic',
    cta_type: 'empathy_follow', audience_state: 'aware',
    description: 'They know you. Now make them feel something real.',
    cumulative_threshold: 10,
    color: '#8b5cf6',
  },
  desire_escalation: {
    label: 'Desire', num: 3,
    hook_type: 'desire', visual_style: 'aspirational',
    cta_type: 'want_this', audience_state: 'warming',
    description: 'Paint the life they want. Make the gap feel urgent.',
    cumulative_threshold: 15,
    color: '#f59e0b',
  },
  conversion: {
    label: 'Conversion', num: 4,
    hook_type: 'pain', visual_style: 'direct',
    cta_type: 'buy_now', audience_state: 'hot',
    description: 'Remove every objection. Make buying the obvious next step.',
    cumulative_threshold: 20,
    color: '#10b981',
  },
  retargeting: {
    label: 'Retargeting', num: 5,
    hook_type: 'social_proof', visual_style: 'testimonial',
    cta_type: 'last_chance', audience_state: 'fatigued',
    description: "They saw it and didn't act. Win them back with proof and urgency.",
    cumulative_threshold: null,  // final phase — no advancement
    color: '#f97316',
  },
}
const PHASE_ORDER = ['attention', 'emotional_connection', 'desire_escalation', 'conversion', 'retargeting']
```

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `supabase/migrations/20260529_generation_logs_phase.sql` | **Create** | ALTER TABLE to add campaign_phase column |
| `app/api/campaign-next-phase/route.js` | **Create** | POST — evaluates readiness, returns next stage recommendation |
| `app/api/generate-ad-text/route.js` | **Modify** | Richer phase injection + log campaign_phase on each generation |
| `app/prompt-engine-v3/page.js` | **Modify** | Replace simple stage pill with 5-step phase bar + Advance Phase button |

---

## Task 1: Add campaign_phase column to generation_logs

**Files:**
- Create: `supabase/migrations/20260529_generation_logs_phase.sql`

- [ ] **Step 1: Create the migration SQL file**

Create `supabase/migrations/20260529_generation_logs_phase.sql`:

```sql
ALTER TABLE generation_logs
  ADD COLUMN IF NOT EXISTS campaign_phase text;

CREATE INDEX IF NOT EXISTS idx_generation_logs_campaign_phase
  ON generation_logs(user_id, campaign_phase);
```

- [ ] **Step 2: Run it in Supabase SQL Editor**

Go to Supabase → SQL Editor → New query. Paste the SQL above and run it. Verify in Table Editor that `generation_logs` now has a `campaign_phase` column of type `text`.

- [ ] **Step 3: Commit the migration file**

```bash
git add supabase/migrations/20260529_generation_logs_phase.sql
git commit -m "feat: add campaign_phase column to generation_logs"
```

---

## Task 2: Create `/api/campaign-next-phase` route

**Files:**
- Create: `app/api/campaign-next-phase/route.js`

This route evaluates whether a project is ready to advance to the next campaign phase.

- [ ] **Step 1: Create the route file**

Create `app/api/campaign-next-phase/route.js` with this exact content:

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

const PHASE_ORDER = ['attention', 'emotional_connection', 'desire_escalation', 'conversion', 'retargeting']

const PHASE_MAP = {
  attention:            { label: 'Attention',    cumulative_threshold: 5,    next: 'emotional_connection' },
  emotional_connection: { label: 'Connection',   cumulative_threshold: 10,   next: 'desire_escalation' },
  desire_escalation:    { label: 'Desire',       cumulative_threshold: 15,   next: 'conversion' },
  conversion:           { label: 'Conversion',   cumulative_threshold: 20,   next: 'retargeting' },
  retargeting:          { label: 'Retargeting',  cumulative_threshold: null,  next: null },
}

// POST /api/campaign-next-phase
// Body: { projectId: string }
// Returns: { ready: bool, currentStage: string, nextStage: string|null, totalGenerations: number, threshold: number|null, reason: string }
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { projectId } = await req.json()
    if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

    const { data: brain, error } = await admin()
      .from('project_brain')
      .select('campaign_stage, total_generations, fatigue_score')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    if (error || !brain) {
      return NextResponse.json({ error: 'Project brain not found' }, { status: 404 })
    }

    const currentStage = brain.campaign_stage || 'attention'
    const phase = PHASE_MAP[currentStage]
    const totalGenerations = brain.total_generations || 0

    // Final phase — cannot advance
    if (!phase?.next) {
      return NextResponse.json({
        ready: false,
        currentStage,
        nextStage: null,
        totalGenerations,
        threshold: null,
        reason: 'You are in the final phase — Retargeting. The campaign cycle is complete.',
      })
    }

    const threshold = phase.cumulative_threshold
    const remaining = Math.max(0, threshold - totalGenerations)
    const ready = totalGenerations >= threshold

    return NextResponse.json({
      ready,
      currentStage,
      nextStage: phase.next,
      totalGenerations,
      threshold,
      remaining,
      reason: ready
        ? `You've generated ${totalGenerations} pieces of content — ready to advance to ${PHASE_MAP[phase.next].label}.`
        : `Generate ${remaining} more piece${remaining === 1 ? '' : 's'} of content to unlock ${PHASE_MAP[phase.next].label} phase.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/campaign-next-phase
// Body: { projectId: string }  — advances to next phase
export async function PATCH(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { projectId } = await req.json()
    if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

    const { data: brain, error } = await admin()
      .from('project_brain')
      .select('campaign_stage, total_generations, user_id')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    if (error || !brain) {
      return NextResponse.json({ error: 'Project brain not found' }, { status: 404 })
    }

    const currentStage = brain.campaign_stage || 'attention'
    const phase = PHASE_MAP[currentStage]
    const totalGenerations = brain.total_generations || 0

    if (!phase?.next) {
      return NextResponse.json({ error: 'Already at final phase' }, { status: 400 })
    }

    if (totalGenerations < phase.cumulative_threshold) {
      return NextResponse.json({
        error: `Not ready — need ${phase.cumulative_threshold - totalGenerations} more generations`,
      }, { status: 400 })
    }

    const { data: updated, error: updateError } = await admin()
      .from('project_brain')
      .update({ campaign_stage: phase.next, last_updated_at: new Date().toISOString() })
      .eq('project_id', projectId)
      .select()
      .single()

    if (updateError) return NextResponse.json({ error: 'Failed to advance phase' }, { status: 500 })

    return NextResponse.json({ brain: updated, advanced: true, from: currentStage, to: phase.next })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify the route works**

Start dev server. With a project that has a brain row with `total_generations: 3`:

Test POST (check readiness):
```bash
# Should return ready: false, remaining: 2
```

Test PATCH (advance — should fail with 400 since threshold not met):
```bash
# Should return error: "Not ready — need 2 more generations"
```

- [ ] **Step 3: Commit**

```bash
git add app/api/campaign-next-phase/
git commit -m "feat: add /api/campaign-next-phase POST+PATCH route"
```

---

## Task 3: Richer phase injection in generate-ad-text + log campaign_phase

**Files:**
- Modify: `app/api/generate-ad-text/route.js`

Currently `brainContext` only says "Current campaign stage: attention — optimize content for this phase." Build 2 makes it richer: injects the phase's `hook_type`, `cta_type`, `audience_state` so Grok knows exactly what to write.

Also tags every `generation_logs` insert with the current `campaign_phase`.

- [ ] **Step 1: Read the current brainContext block**

Open `app/api/generate-ad-text/route.js`. Find the `// ── Project Brain™ context ──` block (around line 149). It currently selects `campaign_stage, best_hook_types, best_styles, audience_temperature, fatigue_score` and builds `brainContext`.

- [ ] **Step 2: Replace the brainContext block**

Replace the entire `// ── Project Brain™ context ──` section (lines ~149–180) with this richer version:

```javascript
    // ── Project Brain™ context (Campaign Evolution) ──────────
    const PHASE_DETAIL = {
      attention:            { hook_type: 'pattern-break', cta_type: 'curiosity click', audience_state: 'cold — no prior relationship', instruction: 'Stop the scroll. No context assumed. Hit hard in the first frame.' },
      emotional_connection: { hook_type: 'story',         cta_type: 'empathy follow',  audience_state: 'aware — seen you before',     instruction: 'They know you. Make them feel something real. No hard sell.' },
      desire_escalation:    { hook_type: 'desire',        cta_type: 'want this',        audience_state: 'warming — interested',         instruction: 'Paint the life they want. Make the gap between now and that life feel urgent.' },
      conversion:           { hook_type: 'pain',          cta_type: 'buy now',          audience_state: 'hot — ready to act',           instruction: 'Remove every objection. Make buying the obvious next step.' },
      retargeting:          { hook_type: 'social proof',  cta_type: 'last chance',      audience_state: 'fatigued — saw it, didn\'t act', instruction: 'Win them back with proof and urgency. Acknowledge they\'ve seen this before.' },
    }

    let brainContext = ''
    let brainCampaignPhase = null
    if (projectId) {
      try {
        const { data: brainRow } = await admin
          .from('project_brain')
          .select('campaign_stage, best_hook_types, best_styles, audience_temperature, fatigue_score')
          .eq('project_id', projectId)
          .eq('user_id', user.id)
          .single()

        if (brainRow) {
          brainCampaignPhase = brainRow.campaign_stage || 'attention'
          const phaseDetail = PHASE_DETAIL[brainCampaignPhase] || PHASE_DETAIL.attention
          const parts = [
            `Campaign phase: ${brainCampaignPhase.replace(/_/g, ' ').toUpperCase()} — ${phaseDetail.instruction}`,
            `Required hook type for this phase: ${phaseDetail.hook_type}.`,
            `CTA style: ${phaseDetail.cta_type}.`,
            `Audience state: ${phaseDetail.audience_state}.`,
          ]
          if (brainRow.best_hook_types?.length) {
            parts.push(`This creator's proven hook types: ${brainRow.best_hook_types.join(', ')}.`)
          }
          if (brainRow.best_styles?.length) {
            parts.push(`Top performing styles: ${brainRow.best_styles.slice(0, 3).join(', ')}.`)
          }
          if ((brainRow.fatigue_score || 0) > 70) {
            parts.push(`Creative fatigue is high (${brainRow.fatigue_score}/100) — maximize novelty and pattern-breaks.`)
          }
          brainContext = '\n\nProject intelligence:\n' + parts.join('\n')
        }
      } catch {}
    }
```

- [ ] **Step 3: Tag generation_logs with campaign_phase**

Find the `generation_logs` insert in `generate-ad-text/route.js` (search for `generation_logs`). Add `campaign_phase: brainCampaignPhase` to the insert object:

```javascript
await admin.from('generation_logs').insert({
  // ... existing fields ...
  campaign_phase: brainCampaignPhase,  // ← add this line
})
```

- [ ] **Step 4: Commit**

```bash
git add app/api/generate-ad-text/route.js
git commit -m "feat: richer campaign phase injection in generate-ad-text + log campaign_phase"
```

---

## Task 4: Replace stage pill with 5-step phase bar + Advance Phase button in page.js

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

The current Brain status bar (around line 15438) shows a simple stage pill. Replace it with a full 5-step visual phase bar and an "Advance Phase" button.

- [ ] **Step 1: Find the current Brain status bar block**

Search for `{/* Project Brain™ status bar */}` in page.js (around line 15438). It's the block from `{projectBrain && s.activeProjectId && (` to its closing `)}`.

- [ ] **Step 2: Replace the entire block**

Replace from `{/* Project Brain™ status bar */}` through its closing `)}` with this new block:

```javascript
              {/* Project Brain™ — Campaign Evolution Phase Bar */}
              {projectBrain && s.activeProjectId && (() => {
                const PHASES = [
                  { id: 'attention',            label: 'Attention',   num: 1, color: '#3b82f6', threshold: 5  },
                  { id: 'emotional_connection', label: 'Connection',  num: 2, color: '#8b5cf6', threshold: 10 },
                  { id: 'desire_escalation',    label: 'Desire',      num: 3, color: '#f59e0b', threshold: 15 },
                  { id: 'conversion',           label: 'Conversion',  num: 4, color: '#10b981', threshold: 20 },
                  { id: 'retargeting',          label: 'Retargeting', num: 5, color: '#f97316', threshold: null },
                ]
                const PHASE_HINTS = {
                  attention:            'Stop the scroll. Cold audience — no context assumed.',
                  emotional_connection: 'They know you. Make them feel something real.',
                  desire_escalation:    'Paint the life they want. Make the gap feel urgent.',
                  conversion:          'Remove every objection. Make buying obvious.',
                  retargeting:         'Win them back. Proof + urgency. Final push.',
                }
                const currentStage    = projectBrain.campaign_stage || 'attention'
                const totalGens       = projectBrain.total_generations || 0
                const currentPhase    = PHASES.find(p => p.id === currentStage) || PHASES[0]
                const nextPhase       = PHASES.find(p => p.num === currentPhase.num + 1)
                const threshold       = currentPhase.threshold
                const readyToAdvance  = threshold !== null && totalGens >= threshold
                const hint            = PHASE_HINTS[currentStage] || ''

                return (
                  <div style={{ padding: '8px 16px 6px', borderBottom: `1px solid ${C.hairline}`, flexShrink: 0 }}>
                    {/* Phase steps */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                      {PHASES.map((ph, i) => {
                        const done    = ph.num < currentPhase.num
                        const active  = ph.id === currentStage
                        const locked  = ph.num > currentPhase.num
                        return (
                          <Fragment key={ph.id}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: '1 1 0', minWidth: 0 }}>
                              <div style={{
                                width: 20, height: 20, borderRadius: '50%',
                                background: done ? ph.color : active ? ph.color + '22' : C.raised,
                                border: `2px solid ${done || active ? ph.color : C.hairline}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                              }}>
                                {done
                                  ? <span style={{ fontSize: 8, color: '#fff', fontWeight: 900 }}>✓</span>
                                  : <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? ph.color : C.hairline }} />
                                }
                              </div>
                              <span style={{ fontSize: 7, fontWeight: active ? 800 : 500, color: active ? ph.color : locked ? C.muted : C.secondary, letterSpacing: 0.3, whiteSpace: 'nowrap' }}>
                                {ph.label}
                              </span>
                            </div>
                            {i < PHASES.length - 1 && (
                              <div style={{ height: 1, flex: '0 0 12px', background: done ? currentPhase.color + '60' : C.hairline, marginBottom: 12 }} />
                            )}
                          </Fragment>
                        )
                      })}
                    </div>

                    {/* Bottom row: hint + fatigue + advance */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 8, color: C.secondary, flex: 1, minWidth: 0 }}>{hint}</span>
                      {/* Fatigue bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        <span style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.muted }}>Fatigue</span>
                        <div style={{ width: 44, height: 3, borderRadius: 2, background: C.raised, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: 2,
                            width: `${projectBrain.fatigue_score || 0}%`,
                            background: (projectBrain.fatigue_score || 0) > 70 ? C.tension : (projectBrain.fatigue_score || 0) > 40 ? C.gold : C.green,
                          }} />
                        </div>
                        <span style={{ fontSize: 7, color: C.muted }}>{projectBrain.fatigue_score || 0}</span>
                      </div>
                      {/* Advance Phase button */}
                      {nextPhase && (
                        <button
                          disabled={!readyToAdvance}
                          onClick={async () => {
                            if (!readyToAdvance) return
                            try {
                              const r = await fetch('/api/campaign-next-phase', {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ projectId: s.activeProjectId }),
                              })
                              const d = await r.json()
                              if (d.brain) setProjectBrain(d.brain)
                            } catch {}
                          }}
                          title={readyToAdvance
                            ? `Advance to ${nextPhase.label} phase`
                            : `Generate ${threshold !== null ? Math.max(0, threshold - totalGens) : 0} more to unlock ${nextPhase.label}`
                          }
                          style={{
                            fontSize: 8, fontWeight: 700, padding: '3px 9px', borderRadius: 6,
                            cursor: readyToAdvance ? 'pointer' : 'not-allowed',
                            border: `1px solid ${readyToAdvance ? currentPhase.color : C.hairline}`,
                            background: readyToAdvance ? currentPhase.color + '18' : 'none',
                            color: readyToAdvance ? currentPhase.color : C.muted,
                            transition: 'all 0.2s', flexShrink: 0,
                          }}
                        >
                          {readyToAdvance ? `→ ${nextPhase.label}` : `${Math.max(0, (threshold || 0) - totalGens)} more to unlock`}
                        </button>
                      )}
                      {!nextPhase && (
                        <span style={{ fontSize: 8, color: C.gold, fontWeight: 700, flexShrink: 0 }}>✦ Campaign complete</span>
                      )}
                    </div>
                  </div>
                )
              })()}
```

- [ ] **Step 3: Verify Fragment is imported**

Search for the React import at the top of page.js:
```javascript
import { useState, useCallback, useMemo, useRef, useEffect, Fragment } from 'react'
```
`Fragment` was added in Build 1. If it's there, no action needed.

- [ ] **Step 4: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Campaign Evolution phase bar — 5-step visual, Advance Phase button"
```

---

## Task 5: Push to production

- [ ] **Step 1: Run the SQL migration in Supabase**

Go to Supabase → SQL Editor → New query. Paste and run:
```sql
ALTER TABLE generation_logs
  ADD COLUMN IF NOT EXISTS campaign_phase text;

CREATE INDEX IF NOT EXISTS idx_generation_logs_campaign_phase
  ON generation_logs(user_id, campaign_phase);
```

- [ ] **Step 2: Verify recent commits**

```bash
git log --oneline -5
```

Expected 4 new commits: SQL file, campaign-next-phase route, generate-ad-text update, phase bar UI.

- [ ] **Step 3: Push**

```bash
git push origin main
```

- [ ] **Step 4: Verify on live site**

After deploy, load the Studio with a project selected. The phase bar should show 5 steps with the current stage highlighted. "Advance Phase" button should be disabled (greyed out) until enough generations are done.

---

## Self-Review

**Spec coverage:**
- ✅ 5 phases with hook_type, visual_style, CTA_type, audience_state — defined in PHASE_MAP (Task 2 + 3)
- ✅ `POST /api/campaign-next-phase` — evaluates readiness — Task 2
- ✅ `PATCH /api/campaign-next-phase` — advances stage — Task 2
- ✅ `ALTER TABLE generation_logs ADD COLUMN campaign_phase` — Task 1
- ✅ Phase-specific hint in generate-ad-text — Task 3
- ✅ Campaign Phase bar (5-step visual) — Task 4
- ✅ Phase-specific hint text in UI — Task 4 (PHASE_HINTS map)
- ✅ "Advance Phase" button gated by threshold — Task 4
- ✅ Phase injected into every generation prompt — Task 3

**Placeholder scan:** None found. All code is complete.

**Type consistency:** `campaign_stage` values match exactly across: PHASE_MAP in Task 2, PHASE_DETAIL in Task 3, PHASES array in Task 4, and existing `project_brain` CHECK constraint. `PHASE_ORDER` not used in UI (PHASES array used instead — same data, cleaner for map()).
