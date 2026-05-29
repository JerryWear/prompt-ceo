# Studio Timeline™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Campaign Journey view that shows all 5 campaign phases as collapsible sections, with generation history per phase and locked-phase unlock conditions — wired to the existing project brain.

**Architecture:** New `GET /api/campaign-timeline/[id]` endpoint reads generation_logs + project_brain for a project and returns per-phase counts and recent entries. A new `campaign_journey` view in page.js fetches this data on mount and renders 5 collapsible phase sections: past phases collapsed/viewable, current phase expanded and highlighted, future phases locked with unlock conditions.

**Tech Stack:** Next.js 14 App Router, Supabase (service role), React 18 useState/useEffect

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/api/campaign-timeline/[id]/route.js` | **Create** | Reads generation_logs + project_brain, returns per-phase summary |
| `app/prompt-engine-v3/page.js` | **Modify** | Add `campaign_journey` view state + fetch, nav button, and inline CampaignTimeline JSX |

---

## Task 1: Create `app/api/campaign-timeline/[id]/route.js`

**Files:**
- Create: `app/api/campaign-timeline/[id]/route.js`

Returns a unified payload: phases with generation counts/recent items + brain summary. All grouping happens in JS (Supabase client doesn't support GROUP BY).

- [ ] **Step 1: Create the directory and write the route file**

```bash
mkdir app/api/campaign-timeline
mkdir app/api/campaign-timeline/[id]
```

Create `app/api/campaign-timeline/[id]/route.js`:

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

const PHASES = [
  { id: 'attention',            label: 'Attention',   num: 1, color: '#3b82f6', threshold: 5  },
  { id: 'emotional_connection', label: 'Connection',  num: 2, color: '#8b5cf6', threshold: 10 },
  { id: 'desire_escalation',    label: 'Desire',      num: 3, color: '#f59e0b', threshold: 15 },
  { id: 'conversion',           label: 'Conversion',  num: 4, color: '#10b981', threshold: 20 },
  { id: 'retargeting',          label: 'Retargeting', num: 5, color: '#f97316', threshold: null },
]

export async function GET(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id: projectId } = await params
    const db = admin()

    const [{ data: logs }, { data: brain }] = await Promise.all([
      db.from('generation_logs')
        .select('id, type, world_id, campaign_phase, created_at, status')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200),
      db.from('project_brain')
        .select('campaign_stage, total_generations, fatigue_score')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .single(),
    ])

    const currentStage = brain?.campaign_stage || 'attention'
    const totalGens    = brain?.total_generations || 0
    const currentNum   = PHASES.find(p => p.id === currentStage)?.num || 1

    // Group logs by campaign_phase
    const byPhase = {}
    ;(logs || []).forEach(l => {
      const phase = l.campaign_phase || 'attention'
      if (!byPhase[phase]) byPhase[phase] = []
      byPhase[phase].push(l)
    })

    const phases = PHASES.map(p => {
      const phaseLogs = byPhase[p.id] || []
      const isUnlocked = p.num <= currentNum
      const isCurrent  = p.id === currentStage

      // Unlock condition for locked phases: need to complete the previous phase threshold
      let unlockCondition = null
      if (!isUnlocked) {
        const prevPhase = PHASES.find(ph => ph.num === p.num - 1)
        if (prevPhase?.threshold != null) {
          const remaining = Math.max(0, prevPhase.threshold - totalGens)
          unlockCondition = remaining > 0
            ? `Generate ${remaining} more in ${prevPhase.label} phase to advance`
            : `Advance from ${prevPhase.label} phase to unlock`
        }
      }

      return {
        id:                 p.id,
        label:              p.label,
        num:                p.num,
        color:              p.color,
        threshold:          p.threshold,
        isCurrent,
        isUnlocked,
        unlockCondition,
        generationCount:    phaseLogs.length,
        recentGenerations:  phaseLogs.slice(0, 5).map(l => ({
          id:         l.id,
          type:       l.type || 'generation',
          world_id:   l.world_id || '',
          created_at: l.created_at,
        })),
      }
    })

    return NextResponse.json({
      phases,
      brain: {
        campaign_stage:    currentStage,
        total_generations: totalGens,
        fatigue_score:     brain?.fatigue_score || 0,
      },
    })
  } catch (err) {
    console.error('[campaign-timeline]', err)
    return NextResponse.json({ error: 'Failed to load timeline' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify file exists**

Run: `ls app/api/campaign-timeline/\[id\]/`
Expected: `route.js` listed

- [ ] **Step 3: Commit**

```bash
git add app/api/campaign-timeline/
git commit -m "feat: Add /api/campaign-timeline/[id] — per-phase generation summary for Campaign Journey view"
```

---

## Task 2: Add Campaign Journey view to `app/prompt-engine-v3/page.js`

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

Four changes:
1. Add `campaignTimeline` + `timelineLoading` state near the other intelligence states (~line 12736)
2. Add a fetch useEffect that fires when `s.view === 'campaign_journey'` and a project is active
3. Add a "Journey" nav button in the CAMPAIGNS nav group
4. Add the `{s.view === 'campaign_journey' && (` view block with full inline JSX

**Key landmarks (verify with Read before editing):**
- State declarations: around line 12736 (`const [projectBrain, setProjectBrain] = useState(null)`)
- CAMPAIGNS nav group: around line 14618–14642 (contains the Ad Studio + Full Campaign buttons)
- End of existing view blocks: around line 17883+ (full_campaign view is last)

---

### 2a — State declarations

- [ ] **Step 1: Add campaignTimeline and timelineLoading state**

Find this line (around line 12736):
```javascript
  const [projectBrain, setProjectBrain] = useState(null)
```

Add after it:
```javascript
  const [campaignTimeline, setCampaignTimeline] = useState(null)
  const [timelineLoading,  setTimelineLoading]  = useState(false)
```

---

### 2b — Fetch useEffect

- [ ] **Step 2: Add fetch useEffect for campaign journey data**

Find the projectBrain fetch useEffect (around line 12819):
```javascript
  useEffect(() => {
    if (!s.activeProjectId) { setProjectBrain(null); return }
    fetch(`/api/project-brain/${s.activeProjectId}`)
      .then(r => r.json())
      .then(d => { if (d.brain) setProjectBrain(d.brain) })
      .catch(() => {})
  }, [s.activeProjectId])
```

Add after it:
```javascript
  useEffect(() => {
    if (s.view !== 'campaign_journey' || !s.activeProjectId) return
    setTimelineLoading(true)
    fetch(`/api/campaign-timeline/${s.activeProjectId}`)
      .then(r => r.json())
      .then(d => { if (d.phases) setCampaignTimeline(d) })
      .catch(() => {})
      .finally(() => setTimelineLoading(false))
  }, [s.view, s.activeProjectId])
```

---

### 2c — Nav button

- [ ] **Step 3: Add Journey button to the CAMPAIGNS nav group**

Find the closing of the Full Campaign button and the Hub link (around line 14641–14644):
```javascript
              }}>◈ Full Campaign</button>
            </div>

            <a href="/prompt-engine-v3/dashboard" style={{
```

Replace with:
```javascript
              }}>◈ Full Campaign</button>
              <button onClick={() => set('view', 'campaign_journey')} style={{
                padding: '4px 11px', borderRadius: 0, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: `2px solid ${s.view === 'campaign_journey' ? C.gold : 'transparent'}`,
                background: s.view === 'campaign_journey' ? '#0e0c08' : 'transparent',
                color: s.view === 'campaign_journey' ? C.gold : '#5a5650',
                transition: 'all 0.15s',
              }}>◉ Journey</button>
            </div>

            <a href="/prompt-engine-v3/dashboard" style={{
```

---

### 2d — Campaign Journey view block

- [ ] **Step 4: Read the final view block boundary to find the right insertion point**

Read lines 17880–17920 to find the last line of the `full_campaign` view block (the closing `)}` of `{s.view === 'full_campaign' && (`). You need to insert the campaign_journey block immediately after it.

- [ ] **Step 5: Add the campaign_journey view block**

After the closing of the `full_campaign` view block, add:

```javascript
        {/* ══ CAMPAIGN JOURNEY VIEW ══ */}
        {s.view === 'campaign_journey' && (() => {
          const JOURNEY_PHASES = [
            { id: 'attention',            label: 'Attention',   num: 1, color: '#3b82f6', hint: 'Stop the scroll. Cold audience — no context assumed.' },
            { id: 'emotional_connection', label: 'Connection',  num: 2, color: '#8b5cf6', hint: 'They know you. Make them feel something real.' },
            { id: 'desire_escalation',    label: 'Desire',      num: 3, color: '#f59e0b', hint: 'Paint the life they want. Make the gap feel urgent.' },
            { id: 'conversion',           label: 'Conversion',  num: 4, color: '#10b981', hint: 'Remove every objection. Make buying obvious.' },
            { id: 'retargeting',          label: 'Retargeting', num: 5, color: '#f97316', hint: 'Win them back. Proof + urgency. Final push.' },
          ]
          const [expandedPhases, setExpandedPhases] = React.useState(() => {
            const initial = {}
            JOURNEY_PHASES.forEach(p => { initial[p.id] = false })
            return initial
          })
          const togglePhase = (id) => setExpandedPhases(prev => ({ ...prev, [id]: !prev[id] }))

          const formatDate = (iso) => {
            if (!iso) return ''
            const d = new Date(iso)
            return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
          }

          const formatType = (type) => (type || 'generation').replace(/_/g, ' ')

          return (
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 24px' }}>
              {/* Header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold, marginBottom: 4 }}>
                  Campaign Journey
                </div>
                {!s.activeProjectId && (
                  <div style={{ fontSize: 12, color: C.muted }}>Select a project to view its campaign journey.</div>
                )}
                {s.activeProjectId && campaignTimeline?.brain && (
                  <div style={{ fontSize: 10, color: C.secondary, display: 'flex', gap: 16 }}>
                    <span>{campaignTimeline.brain.total_generations} generations</span>
                    <span>Fatigue: {campaignTimeline.brain.fatigue_score}%</span>
                  </div>
                )}
                {s.activeProjectId && timelineLoading && (
                  <div style={{ fontSize: 11, color: C.muted }}>Loading…</div>
                )}
              </div>

              {/* Phase list */}
              {s.activeProjectId && campaignTimeline?.phases && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {campaignTimeline.phases.map(phase => {
                    const isExpanded = expandedPhases[phase.id] || phase.isCurrent
                    return (
                      <div key={phase.id} style={{
                        borderRadius: 8,
                        border: `1px solid ${phase.isCurrent ? phase.color + '55' : C.hairline}`,
                        background: phase.isCurrent ? phase.color + '0a' : C.raised,
                        opacity: phase.isUnlocked ? 1 : 0.5,
                        overflow: 'hidden',
                      }}>
                        {/* Phase header — always visible */}
                        <div
                          onClick={() => phase.isUnlocked && togglePhase(phase.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 14px',
                            cursor: phase.isUnlocked ? 'pointer' : 'default',
                          }}
                        >
                          {/* Phase number dot */}
                          <div style={{
                            flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                            background: phase.isUnlocked ? phase.color : C.hairline,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, fontWeight: 800, color: phase.isUnlocked ? '#fff' : C.muted,
                          }}>{phase.num}</div>

                          {/* Label + hint */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: phase.isCurrent ? phase.color : C.primary }}>
                                {phase.label}
                              </span>
                              {phase.isCurrent && (
                                <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
                                  padding: '2px 5px', borderRadius: 3, background: phase.color + '22', color: phase.color }}>
                                  Current
                                </span>
                              )}
                              {!phase.isUnlocked && (
                                <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
                                  padding: '2px 5px', borderRadius: 3, background: C.hairline, color: C.muted }}>
                                  Locked
                                </span>
                              )}
                            </div>
                            {phase.isUnlocked && (
                              <div style={{ fontSize: 9, color: C.secondary, marginTop: 1 }}>{phase.hint}</div>
                            )}
                            {!phase.isUnlocked && phase.unlockCondition && (
                              <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>{phase.unlockCondition}</div>
                            )}
                          </div>

                          {/* Generation count */}
                          {phase.isUnlocked && (
                            <div style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: C.secondary }}>
                              {phase.generationCount} gen{phase.generationCount !== 1 ? 's' : ''}
                            </div>
                          )}

                          {/* Expand chevron */}
                          {phase.isUnlocked && (
                            <div style={{ flexShrink: 0, fontSize: 10, color: C.muted, transition: 'transform 0.2s',
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</div>
                          )}
                        </div>

                        {/* Expanded content */}
                        {phase.isUnlocked && isExpanded && (
                          <div style={{ borderTop: `1px solid ${C.hairline}`, padding: '10px 14px 12px' }}>
                            {phase.recentGenerations.length === 0 ? (
                              <div style={{ fontSize: 10, color: C.muted }}>No generations yet in this phase.</div>
                            ) : (
                              <>
                                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
                                  color: C.muted, marginBottom: 8 }}>Recent</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                  {phase.recentGenerations.map(gen => (
                                    <div key={gen.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                      <span style={{ fontSize: 9, fontWeight: 600, color: C.primary, minWidth: 90 }}>
                                        {formatType(gen.type)}
                                      </span>
                                      {gen.world_id && (
                                        <span style={{ fontSize: 8, color: C.secondary }}>
                                          {gen.world_id.replace(/_/g, ' ')}
                                        </span>
                                      )}
                                      <span style={{ marginLeft: 'auto', fontSize: 8, color: C.muted, whiteSpace: 'nowrap' }}>
                                        {formatDate(gen.created_at)}
                                      </span>
                                    </div>
                                  ))}
                                  {phase.generationCount > 5 && (
                                    <div style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>
                                      +{phase.generationCount - 5} more
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })()}
```

- [ ] **Step 6: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Campaign Journey view — 5-phase timeline with generation history and unlock conditions"
```

---

## Self-Review

**Spec coverage:**
- ✅ 5 phase sections — attention, emotional_connection, desire_escalation, conversion, retargeting
- ✅ Current phase expanded + highlighted (border + background tint in phase color)
- ✅ Past phases collapsible (collapsed by default, toggle to expand)
- ✅ Locked phases show unlock condition (unlock message from API)
- ✅ "Replaces Dashboard tab" — Journey button added to CAMPAIGNS nav group (no Dashboard view existed in page.js; Hub link preserved alongside)
- ✅ Generation history per phase — type, world_id, date (last 5 shown, +N more indicator)
- ✅ No project selected → graceful message
- ✅ Loading state while fetching

**Placeholder scan:** None. All code is complete.

**Type consistency:**
- API returns `phase.recentGenerations[]` with `{ id, type, world_id, created_at }` — page.js reads `gen.type`, `gen.world_id`, `gen.created_at` — matches.
- API returns `phase.unlockCondition` (string | null) — page.js renders it when truthy — matches.
- API returns `phase.isCurrent`, `phase.isUnlocked`, `phase.generationCount` — all used correctly in JSX.

**Edge cases handled:**
- No project active: shows "Select a project" message
- Phase with 0 generations: shows "No generations yet in this phase."
- Null campaign_phase on a log: defaults to 'attention' (the starting phase)
- Brain not yet created for project: defaults safely (stage='attention', totalGens=0)
