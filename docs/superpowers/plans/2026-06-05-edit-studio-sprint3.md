# Edit Studio Sprint 3 — Production Reliability, Observability & Intelligence

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Edit Studio production-grade and self-monitoring: Railway deployment config, render ops dashboard, intelligence expansion from signal data, AI Director export recommendations, and Brand Kit expanded with intro/outro/watermark clips.

**Architecture:** Phase 1 delivers configuration files and a health-check API — actual deployment is a user action. Phases 2–4 extend existing infrastructure via new API routes and UI additions. Phase 5 extends the render pipeline with additional FFmpeg inputs for intro/outro video clips and watermark overlay. All brand assets inject automatically — no user placement controls, no timeline editor.

**Tech Stack:** Next.js 14 App Router, Supabase admin client, Railway nixpacks, FFmpeg concat demuxer for intro/outro, existing `buildFullFfmpegArgs` extended with new clip inputs.

---

## Deployment Note (Phase 1)

The code artifacts below are fully buildable. **The actual Railway deployment and live validation require user action** — the user pushes to Railway, then the health check endpoint at `/api/admin/render-health` provides the evidence. This plan delivers all tooling needed for that validation.

---

## Architectural Principle

PromptCEO is not CapCut. AI Director makes decisions. Users approve, adjust, publish. Brand Kit assets (intro/outro/watermark) are injected automatically by the pipeline — users upload them once, AI applies them everywhere.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `nixpacks.toml` | Railway FFmpeg build config |
| Create | `docs/infrastructure/railway-deployment.md` | Deployment guide |
| Create | `app/api/admin/render-health/route.js` | Admin health check — queue, processing, last renders |
| Create | `app/api/admin/render-ops/route.js` | Admin render stats — counts, avg duration, recent failures |
| Modify | `app/account/page.js` | Add 'renders' tab to AdminPanel |
| Create | `app/api/edit-studio/user-insights/route.js` | Aggregate signal_logs → preferred platform/length/style/music |
| Modify | `app/edit-studio/page.js` | Add AI Director recommendations section in Export panel |
| Create | `supabase/migrations/20260605_brand_kit_v2.sql` | Add intro/outro/watermark fields to brand_kit guidance (comment-only — jsonb is schemaless) |
| Modify | `app/api/brand-kit/presign/route.js` | Support clip upload types (intro, outro, watermark) |
| Modify | `app/account/page.js` | Brand Kit v2 UI — intro/outro/watermark upload sections |
| Modify | `lib/edit-studio/renderEngine.js` | Add introPath, outroPath, watermarkPath to buildFullFfmpegArgs |
| Modify | `scripts/render-worker.mjs` | Resolve + apply intro/outro/watermark in executeJob |

---

## Task 1: Railway Infrastructure Config

**Files:**
- Create: `nixpacks.toml`
- Create: `docs/infrastructure/railway-deployment.md`

- [ ] **Step 1: Create `nixpacks.toml` at project root**

```toml
# nixpacks.toml
# Railway build configuration for the PromptCEO render worker.
# ffmpeg-full includes libx264, libass, aac, and all common codecs.

[phases.setup]
nixPkgs = ["ffmpeg-full", "nodejs_20"]

[start]
cmd = "node scripts/render-worker.mjs"
```

- [ ] **Step 2: Create `docs/infrastructure/railway-deployment.md`**

```markdown
# Edit Studio Render Worker — Railway Deployment

The render worker polls Supabase for queued render jobs and executes them using FFmpeg.
It runs as a persistent background worker on Railway.

## Prerequisites

- Railway account: https://railway.app
- Project repo pushed to GitHub
- Supabase project active with `edit_render_jobs` table

## Deployment Steps

1. **Create a new Railway project** from the GitHub repo.
2. **Add a Worker service** (not a Web service — workers have no sleep).
3. **Set the start command:** `node scripts/render-worker.mjs`
4. **Set environment variables** (Settings → Variables):

| Variable | Value | Where to find |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role secret | Supabase Settings → API |
| `POLL_INTERVAL_MS` | `5000` | Default — adjust if needed |
| `MAX_CONCURRENT` | `1` | Increase for parallel renders |
| `MAX_RETRIES` | `3` | Retry limit per job |
| `STALE_MINUTES` | `10` | Stale job recovery window |

5. **Deploy.** Railway uses `nixpacks.toml` to install `ffmpeg-full`.
6. **Verify FFmpeg:** In Railway logs, look for `FFmpeg found. Worker ready.`
7. **Verify libass:** Create a test render with captions. If captions appear, libass is working.

## Validation Checklist

After deploying, use these endpoints (admin account required):

- `GET /api/admin/render-health` — Worker health, queue size, last job timestamps
- `GET /api/admin/render-ops` — Full stats: counts by status, avg duration, recent failures

## Scaling

- Increase `MAX_CONCURRENT` to process multiple jobs simultaneously.
- Add a second Railway service pointing at the same worker file for redundancy.
- Railway auto-restarts the worker if it crashes.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "FFmpeg not found" in logs | Check nixpacks.toml is at project root |
| Jobs stay `queued` | Verify `SUPABASE_SERVICE_ROLE_KEY` is set |
| Caption rendering fails | `libass` is included in `ffmpeg-full` — check nixpacks.toml |
| `Storage upload failed` | Verify `edit-studio-exports` bucket exists in Supabase |
```

- [ ] **Step 3: Commit**

```bash
git add nixpacks.toml docs/infrastructure/railway-deployment.md
git commit -m "feat: add Railway nixpacks config and deployment guide for render worker"
```

---

## Task 2: Render Health Check API

**Files:**
- Create: `app/api/admin/render-health/route.js`

- [ ] **Step 1: Create the file**

```js
import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

// GET /api/admin/render-health
// Returns real-time render infrastructure health: queue depth, active jobs,
// last success/failure timestamps. Admin-only.
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Verify admin
    const { data: userRow } = await admin.from('app_users').select('is_admin').eq('id', user.id).single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Run all queries in parallel
    const [queuedResult, processingResult, lastCompleted, lastFailed, recentJobs] = await Promise.all([
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'queued'),
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'processing'),
      admin.from('edit_render_jobs').select('updated_at, render_details').eq('status', 'completed').order('updated_at', { ascending: false }).limit(1),
      admin.from('edit_render_jobs').select('updated_at, error_message').eq('status', 'failed').order('updated_at', { ascending: false }).limit(1),
      admin.from('edit_render_jobs').select('id, status, created_at, updated_at, render_details, error_message').order('created_at', { ascending: false }).limit(5),
    ])

    const queueSize    = queuedResult.count      || 0
    const activeJobs   = processingResult.count  || 0
    const lastSuccess  = lastCompleted.data?.[0] || null
    const lastFailure  = lastFailed.data?.[0]    || null
    const recent       = recentJobs.data          || []

    // Determine health status
    const now = Date.now()
    const lastSuccessMs = lastSuccess?.updated_at ? new Date(lastSuccess.updated_at).getTime() : null
    const sinceLastSuccess = lastSuccessMs ? Math.floor((now - lastSuccessMs) / 60000) : null

    let status = 'healthy'
    let statusMessage = 'Worker is processing normally.'

    if (queueSize > 10) {
      status = 'degraded'
      statusMessage = `Queue is backing up: ${queueSize} jobs waiting.`
    } else if (activeJobs === 0 && queueSize > 0) {
      status = 'degraded'
      statusMessage = 'Jobs queued but no worker is processing. Check Railway deployment.'
    } else if (sinceLastSuccess !== null && sinceLastSuccess > 60) {
      status = 'warning'
      statusMessage = `No successful render in ${sinceLastSuccess} minutes.`
    } else if (queueSize === 0 && activeJobs === 0) {
      status = 'idle'
      statusMessage = 'Worker is idle — no jobs queued.'
    }

    return NextResponse.json({
      status,
      statusMessage,
      queueSize,
      activeJobs,
      lastSuccess: lastSuccess ? {
        at: lastSuccess.updated_at,
        minutesAgo: sinceLastSuccess,
        details: lastSuccess.render_details,
      } : null,
      lastFailure: lastFailure ? {
        at:      lastFailure.updated_at,
        message: lastFailure.error_message,
      } : null,
      recentJobs: recent.map(j => ({
        id:        j.id,
        status:    j.status,
        createdAt: j.created_at,
        updatedAt: j.updated_at,
        error:     j.error_message || null,
        details:   j.render_details || null,
      })),
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error|render-health)" | head -5
```
Expected: `✓ Compiled successfully`, `/api/admin/render-health` listed as ƒ.

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/render-health/route.js
git commit -m "feat: add /api/admin/render-health endpoint for worker monitoring"
```

---

## Task 3: Render Ops API

**Files:**
- Create: `app/api/admin/render-ops/route.js`

- [ ] **Step 1: Create the file**

```js
import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

// GET /api/admin/render-ops
// Returns render operations statistics: counts by status, avg duration,
// recent failures with error details. Admin-only.
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data: userRow } = await admin.from('app_users').select('is_admin').eq('id', user.id).single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [queued, processing, completed, failed, recent] = await Promise.all([
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'queued'),
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'processing'),
      admin.from('edit_render_jobs').select('id, created_at, updated_at, render_details').eq('status', 'completed').order('updated_at', { ascending: false }).limit(100),
      admin.from('edit_render_jobs').select('id, created_at, updated_at, error_message, render_details, render_plan').eq('status', 'failed').order('updated_at', { ascending: false }).limit(20),
      admin.from('edit_render_jobs').select('id, status, user_id, created_at, updated_at, render_plan, render_details, error_message').order('created_at', { ascending: false }).limit(20),
    ])

    // Compute average render duration from completed jobs that have timestamps
    const completedWithDuration = (completed.data || []).filter(j =>
      j.render_details?.completedAt && j.created_at
    )
    const avgDurationMs = completedWithDuration.length
      ? completedWithDuration.reduce((sum, j) => {
          const dur = new Date(j.render_details.completedAt).getTime() - new Date(j.created_at).getTime()
          return sum + dur
        }, 0) / completedWithDuration.length
      : null

    const avgDurationSeconds = avgDurationMs ? Math.round(avgDurationMs / 1000) : null

    return NextResponse.json({
      counts: {
        queued:     queued.count     || 0,
        processing: processing.count || 0,
        completed:  completed.data?.length || 0,
        failed:     failed.data?.length    || 0,
      },
      avgRenderSeconds: avgDurationSeconds,
      recentFailures: (failed.data || []).slice(0, 10).map(j => ({
        id:        j.id,
        createdAt: j.created_at,
        failedAt:  j.updated_at,
        error:     j.error_message,
        platform:  j.render_plan?.platform || null,
        retries:   j.render_details?.retryCount || 0,
      })),
      recentJobs: (recent.data || []).map(j => ({
        id:        j.id,
        status:    j.status,
        userId:    j.user_id?.slice(0, 8) + '…',
        platform:  j.render_plan?.platform || null,
        createdAt: j.created_at,
        updatedAt: j.updated_at,
        error:     j.error_message || null,
        stage:     j.render_details?.stage || null,
        retries:   j.render_details?.retryCount || 0,
      })),
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/render-ops/route.js
git commit -m "feat: add /api/admin/render-ops for render statistics dashboard"
```

---

## Task 4: Admin Panel 'Renders' Tab

**Files:**
- Modify: `app/account/page.js`

- [ ] **Step 1: Add render ops state to `AdminPanel`**

Find the existing state declarations in `AdminPanel` (around line 28). After `const [musicSuccess, setMusicSuccess] = useState(null)`, add:

```js
  const [renderOps,        setRenderOps]        = useState(null)
  const [renderOpsLoading, setRenderOpsLoading] = useState(false)
```

- [ ] **Step 2: Load render ops when tab activates**

Find `useEffect(() => { if (tab === 'members') loadMembers('all', 0) }, [tab])` (around line 80). Add another effect immediately after:

```js
  useEffect(() => {
    if (tab !== 'renders') return
    setRenderOpsLoading(true)
    Promise.all([
      fetch('/api/admin/render-health').then(r => r.json()),
      fetch('/api/admin/render-ops').then(r => r.json()),
    ])
      .then(([health, ops]) => setRenderOps({ health, ops }))
      .catch(() => {})
      .finally(() => setRenderOpsLoading(false))
  }, [tab])
```

- [ ] **Step 3: Add 'renders' to the tabs array**

Find the tabs array (around line 129):
```js
          { id: 'overview',   label: 'Overview' },
          { id: 'members',    label: `Members (${stats.totalUsers})` },
          { id: 'affiliates', label: ... },
          { id: 'music',      label: 'Music Upload' },
```

Add `{ id: 'renders', label: 'Render Ops' }` after `'music'`:
```js
          { id: 'overview',   label: 'Overview' },
          { id: 'members',    label: `Members (${stats.totalUsers})` },
          { id: 'affiliates', label: `Affiliates${pendingApps.length > 0 ? ` ⚠ ${pendingApps.length}` : ` (${affiliates.length})`}` },
          { id: 'music',      label: 'Music Upload' },
          { id: 'renders',    label: 'Render Ops' },
```

- [ ] **Step 4: Add 'renders' tab content**

Find the last tab content block — likely `{tab === 'music' && (() => {...})()}`. Add this new block AFTER it (before the closing `</div>` of the tab content container):

```jsx
        {/* ── RENDERS TAB ── */}
        {tab === 'renders' && (() => {
          if (renderOpsLoading) return <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>Loading render ops…</div>
          if (!renderOps) return <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>No data</div>

          const { health, ops } = renderOps
          const statusColor = health?.status === 'healthy' ? C.green : health?.status === 'idle' ? C.muted : health?.status === 'warning' ? C.gold : '#c45a5a'

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Health banner */}
              <div style={{ padding: '14px 18px', borderRadius: 10, border: `1px solid ${statusColor}44`, background: statusColor + '10' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: statusColor, textTransform: 'capitalize' }}>{health?.status || '—'}</div>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{health?.statusMessage}</div>
                {health?.lastSuccess && (
                  <div style={{ fontSize: 11, color: C.ghost, marginTop: 6 }}>
                    Last success: {health.lastSuccess.minutesAgo != null ? `${health.lastSuccess.minutesAgo}m ago` : new Date(health.lastSuccess.at).toLocaleTimeString()}
                  </div>
                )}
                {health?.lastFailure && (
                  <div style={{ fontSize: 11, color: '#c45a5a', marginTop: 4 }}>
                    Last failure: {new Date(health.lastFailure.at).toLocaleTimeString()} — {health.lastFailure.message?.slice(0, 80)}
                  </div>
                )}
              </div>

              {/* Queue metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[
                  { label: 'Queued',     value: health?.queueSize   || 0, color: C.gold  },
                  { label: 'Processing', value: health?.activeJobs  || 0, color: C.blue  },
                  { label: 'Completed',  value: ops?.counts?.completed || 0, color: C.green },
                  { label: 'Failed',     value: ops?.counts?.failed    || 0, color: '#c45a5a' },
                ].map(m => (
                  <div key={m.label} style={{ padding: '12px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Avg render time */}
              {ops?.avgRenderSeconds != null && (
                <div style={{ fontSize: 12, color: C.muted }}>
                  Average render duration: <strong style={{ color: C.primary }}>{ops.avgRenderSeconds}s</strong>
                </div>
              )}

              {/* Recent failures */}
              {ops?.recentFailures?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Recent Failures</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {ops.recentFailures.map(f => (
                      <div key={f.id} style={{ padding: '10px 12px', borderRadius: 7, border: `1px solid #c45a5a33`, background: '#c45a5a08' }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>{f.id?.slice(0, 12)}…</span>
                          <span style={{ fontSize: 10, color: C.muted }}>{f.platform || '—'}</span>
                          {f.retries > 0 && <span style={{ fontSize: 10, color: C.gold }}>retry {f.retries}</span>}
                          <span style={{ fontSize: 10, color: C.ghost, marginLeft: 'auto' }}>{new Date(f.failedAt).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#c45a5a' }}>{f.error?.slice(0, 120)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent jobs */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Recent Jobs</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {(ops?.recentJobs || []).map(j => {
                    const statusClr = j.status === 'completed' ? C.green : j.status === 'failed' ? '#c45a5a' : j.status === 'processing' ? C.blue : C.gold
                    return (
                      <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.hairline}`, background: C.base }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusClr, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace', flexShrink: 0 }}>{j.id?.slice(0, 8)}…</span>
                        <span style={{ fontSize: 10, color: C.muted }}>{j.platform || '—'}</span>
                        <span style={{ fontSize: 10, color: statusClr, textTransform: 'uppercase', letterSpacing: 0.5 }}>{j.status}</span>
                        {j.stage && <span style={{ fontSize: 10, color: C.ghost }}>@ {j.stage}</span>}
                        <span style={{ fontSize: 10, color: C.ghost, marginLeft: 'auto' }}>{new Date(j.createdAt).toLocaleTimeString()}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Refresh button */}
              <button onClick={() => { setRenderOpsLoading(true); Promise.all([fetch('/api/admin/render-health').then(r=>r.json()), fetch('/api/admin/render-ops').then(r=>r.json())]).then(([h,o])=>setRenderOps({health:h,ops:o})).catch(()=>{}).finally(()=>setRenderOpsLoading(false)) }}
                style={{ padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.secondary, alignSelf: 'flex-start' }}>
                ↺ Refresh
              </button>
            </div>
          )
        })()}
```

- [ ] **Step 5: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 6: Commit**

```bash
git add app/account/page.js
git commit -m "feat: add Render Ops tab to AdminPanel with health status and job monitoring"
```

---

## Task 5: User Insights API

**Files:**
- Create: `app/api/edit-studio/user-insights/route.js`

- [ ] **Step 1: Create the file**

```js
import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function topKey(map) {
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || null
}

function avg(arr) {
  if (!arr.length) return null
  return Math.round(arr.reduce((s, v) => s + v, 0) / arr.length)
}

// GET /api/edit-studio/user-insights
// Derives user preferences from signal_logs and campaign_memory.
// Returns: preferred_platform, preferred_video_length, preferred_caption_style,
//          preferred_music_style, export_frequency, re_render_frequency.
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Fetch relevant signals — last 200, weight ≥ 2 (includes platform_selected, video_generated)
    const [signalsResult, campMemResult] = await Promise.all([
      admin.from('signal_logs')
        .select('event_type, metadata, created_at')
        .eq('user_id', user.id)
        .gte('weight', 2)
        .order('created_at', { ascending: false })
        .limit(200),
      admin.from('campaign_memory')
        .select('successful_patterns, top_platforms')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),
    ])

    const signals  = signalsResult.data  || []
    const campMem  = campMemResult.data   || []

    // ── Preferred platform ────────────────────────────────────────────────────
    const platformCounts = {}
    signals.filter(s => ['video_generated', 'platform_selected', 'platform_changed'].includes(s.event_type))
      .forEach(s => {
        const p = s.metadata?.platform
        if (p) platformCounts[p] = (platformCounts[p] || 0) + 1
      })
    // Supplement with campaign_memory.top_platforms
    campMem.forEach(m => (m.top_platforms || []).forEach(p => {
      if (p) platformCounts[p] = (platformCounts[p] || 0) + 0.5
    }))
    const preferredPlatform = topKey(platformCounts)

    // ── Preferred video length ────────────────────────────────────────────────
    const videoLengths = signals
      .filter(s => s.event_type === 'video_generated' && s.metadata?.videoLength)
      .map(s => Number(s.metadata.videoLength))
      .filter(n => n > 0 && n < 600)
    const preferredVideoLength = avg(videoLengths)

    // ── Preferred caption style ───────────────────────────────────────────────
    const captionCounts = {}
    signals.filter(s => s.event_type === 'video_generated' && s.metadata?.captionStyle)
      .forEach(s => {
        const c = s.metadata.captionStyle
        captionCounts[c] = (captionCounts[c] || 0) + 1
      })
    const preferredCaptionStyle = topKey(captionCounts)

    // ── Preferred music style (title → mood derivation) ───────────────────────
    const musicTitleCounts = {}
    signals.filter(s => s.event_type === 'video_generated' && s.metadata?.musicTitle)
      .forEach(s => {
        const t = s.metadata.musicTitle
        musicTitleCounts[t] = (musicTitleCounts[t] || 0) + 1
      })
    const preferredMusicTitle = topKey(musicTitleCounts)

    // ── Export frequency (video_generated events per week) ────────────────────
    const exportSignals = signals.filter(s => s.event_type === 'video_generated')
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const exportsThisWeek = exportSignals.filter(s => new Date(s.created_at).getTime() > oneWeekAgo).length

    // ── Re-render frequency ───────────────────────────────────────────────────
    const reRenderSignals  = signals.filter(s => s.event_type === 'result_re_run')
    const reRendersThisWeek = reRenderSignals.filter(s => new Date(s.created_at).getTime() > oneWeekAgo).length

    // ── Readiness (enough data for meaningful recommendations) ────────────────
    const hasEnoughData = exportSignals.length >= 3

    return NextResponse.json({
      status: 'success',
      hasEnoughData,
      totalExports:        exportSignals.length,
      preferredPlatform,
      preferredVideoLength,
      preferredCaptionStyle,
      preferredMusicTitle,
      exportsThisWeek,
      reRendersThisWeek,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error|user-insights)" | head -5
```

- [ ] **Step 3: Commit**

```bash
git add app/api/edit-studio/user-insights/route.js
git commit -m "feat: add /api/edit-studio/user-insights for AI Director preference learning"
```

---

## Task 6: AI Director Export Recommendations

**Files:**
- Modify: `app/edit-studio/page.js`

- [ ] **Step 1: Add insights state**

Find `const [retryingRender, setRetryingRender] = useState(false)`. Add after it:
```js
  const [exportInsights,      setExportInsights]      = useState(null)
  const [insightsLoading,     setInsightsLoading]     = useState(false)
```

- [ ] **Step 2: Load insights when Export tab activates**

Find the useEffect for render polling (around line 885). Add a new useEffect after it:
```js
  // Load AI Director export insights when entering Export tab
  useEffect(() => {
    if (activeStep !== 5) return // step 5 = Export
    if (exportInsights) return   // already loaded
    setInsightsLoading(true)
    fetch('/api/edit-studio/user-insights')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setExportInsights(d) })
      .catch(() => {})
      .finally(() => setInsightsLoading(false))
  }, [activeStep]) // eslint-disable-line react-hooks/exhaustive-deps
```

- [ ] **Step 3: Add recommendation renderer**

Find `function renderLibrary()` (or `const renderExport = () => {`). Add this new function BEFORE `const renderExport = () => {`:

```js
  function renderDirectorExportTips() {
    const ins = exportInsights
    if (insightsLoading) return null
    if (!ins?.hasEnoughData) return null

    const tips = []

    if (ins.preferredPlatform && ins.preferredPlatform !== project.platform) {
      const PLATFORM_LABELS = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', meta: 'Meta' }
      tips.push(`You usually export to ${PLATFORM_LABELS[ins.preferredPlatform] || ins.preferredPlatform} first.`)
    }

    if (ins.preferredVideoLength) {
      const planDuration = cutPlans.find(p => p.id === selectedPlanId)?.totalDuration
      if (planDuration && Math.abs(planDuration - ins.preferredVideoLength) > 15) {
        tips.push(`Most of your successful exports are ${ins.preferredVideoLength}s. This edit is ${Math.round(planDuration)}s.`)
      }
    }

    if (ins.preferredCaptionStyle && captionSettings?.style && ins.preferredCaptionStyle !== captionSettings.style) {
      tips.push(`You frequently use "${ins.preferredCaptionStyle}" captions. Currently set to "${captionSettings.style}".`)
    }

    if (ins.preferredMusicTitle && selectedMusicBed?.title && ins.preferredMusicTitle !== selectedMusicBed.title) {
      tips.push(`You often use "${ins.preferredMusicTitle}" for this type of content.`)
    }

    if (ins.reRendersThisWeek >= 3) {
      tips.push(`You've re-rendered ${ins.reRendersThisWeek} times this week — preview the edit before rendering.`)
    }

    if (!tips.length) return null

    return (
      <div style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${C.gold}22`, background: C.gold + '06', marginBottom: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>AI Director · Export Tips</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 11, color: C.gold, flexShrink: 0, marginTop: 1 }}>·</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{tip}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, color: C.ghost, marginTop: 10 }}>
          Based on {ins.totalExports} export{ins.totalExports !== 1 ? 's' : ''}. These are observations, not requirements.
        </div>
      </div>
    )
  }
```

- [ ] **Step 4: Call the renderer inside `renderExport`**

Find `const renderExport = () => {`. Inside the returned JSX, find the very first `<div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>`. Add `{renderDirectorExportTips()}` as the FIRST child:

```jsx
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {renderDirectorExportTips()}

        {/* ── Render Readiness checklist ─── */}
```

- [ ] **Step 5: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 6: Commit**

```bash
git add app/edit-studio/page.js
git commit -m "feat: add AI Director export recommendations based on user signal history"
```

---

## Task 7: Brand Kit v2 — DB + API Extension

**Files:**
- Create: `supabase/migrations/20260605_brand_kit_v2.sql`
- Modify: `app/api/brand-kit/presign/route.js`
- Modify: `app/api/brand-kit/route.js`

The `brand_kit` jsonb column already exists. We're extending the shape to support new fields. No SQL column changes needed — jsonb is schemaless.

- [ ] **Step 1: Create documentation migration**

```sql
-- supabase/migrations/20260605_brand_kit_v2.sql
-- Brand Kit v2: extends brand_kit jsonb shape on app_users.
-- No column changes needed — jsonb is schemaless.
-- New brand_kit fields:
--   introClipUrl  text  URL to branded intro video clip (MP4, max 10s)
--   outroClipUrl  text  URL to branded outro video clip (MP4, max 10s)
--   watermarkUrl  text  URL to transparent watermark PNG (top-left overlay)
--
-- Storage bucket 'brand-assets' already exists.
-- New storage paths:
--   {userId}/intro.mp4
--   {userId}/outro.mp4
--   {userId}/watermark.png

-- This migration is documentation only — no SQL to run.
-- The brand-assets bucket handles all media types.
select 1; -- no-op
```

- [ ] **Step 2: Update `app/api/brand-kit/presign/route.js` to support clip types**

Find the extension validation block:
```js
    if (!['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) {
      return NextResponse.json({ status: 'error', message: 'Logo must be PNG, JPG, SVG, or WebP' }, { status: 400 })
    }

    const storagePath = `${user.id}/logo.${ext}`
```

Replace the entire block from the extension check through `const storagePath` with:

```js
    const uploadType = body?.uploadType || 'logo'
    const ALLOWED = {
      logo:      { exts: ['png','jpg','jpeg','svg','webp'], path: (id, ext) => `${id}/logo.${ext}`,      maxMb: 2 },
      intro:     { exts: ['mp4','mov','webm'],              path: (id, ext) => `${id}/intro.${ext}`,     maxMb: 50 },
      outro:     { exts: ['mp4','mov','webm'],              path: (id, ext) => `${id}/outro.${ext}`,     maxMb: 50 },
      watermark: { exts: ['png','webp'],                    path: (id, ext) => `${id}/watermark.${ext}`, maxMb: 2 },
    }

    const typeConfig = ALLOWED[uploadType]
    if (!typeConfig) {
      return NextResponse.json({ status: 'error', message: `Unknown upload type: ${uploadType}` }, { status: 400 })
    }
    if (!typeConfig.exts.includes(ext)) {
      return NextResponse.json({ status: 'error', message: `${uploadType} must be ${typeConfig.exts.join(', ')}` }, { status: 400 })
    }

    const storagePath = typeConfig.path(user.id, ext)
```

Also update the `publicUrl` field name to include the upload type context:
```js
    return NextResponse.json({ status: 'success', signedUrl: data.signedUrl, token: data.token, storagePath, publicUrl, uploadType })
```

- [ ] **Step 3: Update `app/api/brand-kit/route.js` PATCH to allow new fields**

Find the `patch` object builder:
```js
    const patch = {}
    if (typeof logoUrl      === 'string') patch.logoUrl      = logoUrl.trim()
    if (typeof primaryColor === 'string') patch.primaryColor = primaryColor.trim()
```

Replace with:
```js
    const patch = {}
    const ALLOWED_FIELDS = ['logoUrl', 'primaryColor', 'introClipUrl', 'outroClipUrl', 'watermarkUrl']
    const body2 = body
    ALLOWED_FIELDS.forEach(field => {
      if (typeof body2[field] === 'string') patch[field] = body2[field].trim()
    })
```

- [ ] **Step 4: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/20260605_brand_kit_v2.sql app/api/brand-kit/presign/route.js app/api/brand-kit/route.js
git commit -m "feat: extend brand kit API to support intro/outro clip and watermark uploads"
```

---

## Task 8: Brand Kit v2 — Account UI

**Files:**
- Modify: `app/account/page.js`

- [ ] **Step 1: Expand brandKit state default**

Find `const [brandKit, setBrandKit] = useState({ logoUrl: '', primaryColor: '#c8a84b' })`.
Replace with:
```js
  const [brandKit, setBrandKit] = useState({ logoUrl: '', primaryColor: '#c8a84b', introClipUrl: '', outroClipUrl: '', watermarkUrl: '' })
```

- [ ] **Step 2: Update loadBrandKit mapping**

Find `.then(d => { if (d.status === 'success') setBrandKit({ logoUrl: d.brandKit?.logoUrl || '', primaryColor: d.brandKit?.primaryColor || '#c8a84b' }) })`.
Replace with:
```js
      .then(d => {
        if (d.status === 'success') setBrandKit({
          logoUrl:      d.brandKit?.logoUrl      || '',
          primaryColor: d.brandKit?.primaryColor || '#c8a84b',
          introClipUrl: d.brandKit?.introClipUrl || '',
          outroClipUrl: d.brandKit?.outroClipUrl || '',
          watermarkUrl: d.brandKit?.watermarkUrl || '',
        })
      })
```

- [ ] **Step 3: Create generalized clip upload handler**

Find `handleLogoUpload`. Add this generalized handler AFTER it:

```js
  const handleClipUpload = async (file, uploadType, fieldName) => {
    if (!file) return
    setBrandKitMsg(null)
    setLogoUploading(true) // reuse same loading indicator
    try {
      const presignRes = await fetch('/api/brand-kit/presign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, uploadType }),
      })
      const presignData = await presignRes.json()
      if (presignData.status !== 'success') throw new Error(presignData.message)

      const uploadRes = await fetch(presignData.signedUrl, {
        method: 'PUT', body: file, headers: { 'Content-Type': file.type, 'x-upsert': 'true' },
      })
      if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`)

      const saveRes = await fetch('/api/brand-kit', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [fieldName]: presignData.publicUrl }),
      })
      const saveData = await saveRes.json()
      if (saveData.status !== 'success') throw new Error(saveData.message)

      setBrandKit(k => ({ ...k, [fieldName]: presignData.publicUrl }))
      setBrandKitMsg({ type: 'success', text: `${uploadType} saved.` })
    } catch (err) {
      setBrandKitMsg({ type: 'error', text: err.message })
    } finally {
      setLogoUploading(false)
    }
  }
```

- [ ] **Step 4: Add refs for clip inputs**

Find `const brandLogoRef = useRef(null)`. Add:
```js
  const brandIntroRef    = useRef(null)
  const brandOutroRef    = useRef(null)
  const brandWatermarkRef = useRef(null)
```

- [ ] **Step 5: Add clip upload sections to Brand Kit JSX**

Find the Brand Kit JSX section (the `{/* ── Brand Kit ── */}` block). Find the closing `</div>` of the "Primary color" section (just before the status message div). Add three new sections after the color section:

```jsx
            {/* Intro clip */}
            <div style={{ marginBottom: 20, paddingTop: 16, borderTop: `1px solid ${C.hairline}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Intro Clip</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Short branded video (≤10s) prepended to every render. MP4, MOV, or WebM · max 50 MB</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: brandKit.introClipUrl ? C.green : C.ghost }}>{brandKit.introClipUrl ? '✓ Intro clip set' : 'No intro clip'}</span>
                <input ref={brandIntroRef} type="file" accept="video/mp4,video/quicktime,video/webm" style={{ display: 'none' }} onChange={e => handleClipUpload(e.target.files?.[0], 'intro', 'introClipUrl')} />
                <button onClick={() => brandIntroRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {brandKit.introClipUrl ? '↺ Replace' : '⬆ Upload'}
                </button>
                {brandKit.introClipUrl && (
                  <button onClick={() => { fetch('/api/brand-kit', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ introClipUrl: '' }) }).then(() => setBrandKit(k => ({ ...k, introClipUrl: '' }))) }}
                    style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.ghost }}>Remove</button>
                )}
              </div>
            </div>

            {/* Outro clip */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Outro Clip</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Short branded video (≤10s) appended to every render. MP4, MOV, or WebM · max 50 MB</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: brandKit.outroClipUrl ? C.green : C.ghost }}>{brandKit.outroClipUrl ? '✓ Outro clip set' : 'No outro clip'}</span>
                <input ref={brandOutroRef} type="file" accept="video/mp4,video/quicktime,video/webm" style={{ display: 'none' }} onChange={e => handleClipUpload(e.target.files?.[0], 'outro', 'outroClipUrl')} />
                <button onClick={() => brandOutroRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {brandKit.outroClipUrl ? '↺ Replace' : '⬆ Upload'}
                </button>
                {brandKit.outroClipUrl && (
                  <button onClick={() => { fetch('/api/brand-kit', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ outroClipUrl: '' }) }).then(() => setBrandKit(k => ({ ...k, outroClipUrl: '' }))) }}
                    style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.ghost }}>Remove</button>
                )}
              </div>
            </div>

            {/* Watermark */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Watermark</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Transparent PNG overlaid top-left on every render (separate from the logo overlay). PNG or WebP · max 2 MB</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: brandKit.watermarkUrl ? C.green : C.ghost }}>{brandKit.watermarkUrl ? '✓ Watermark set' : 'No watermark'}</span>
                <input ref={brandWatermarkRef} type="file" accept="image/png,image/webp" style={{ display: 'none' }} onChange={e => handleClipUpload(e.target.files?.[0], 'watermark', 'watermarkUrl')} />
                <button onClick={() => brandWatermarkRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {brandKit.watermarkUrl ? '↺ Replace' : '⬆ Upload'}
                </button>
                {brandKit.watermarkUrl && (
                  <button onClick={() => { fetch('/api/brand-kit', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ watermarkUrl: '' }) }).then(() => setBrandKit(k => ({ ...k, watermarkUrl: '' }))) }}
                    style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.ghost }}>Remove</button>
                )}
              </div>
            </div>
```

- [ ] **Step 6: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 7: Commit**

```bash
git add app/account/page.js
git commit -m "feat: add intro/outro clip and watermark upload to Brand Kit account UI"
```

---

## Task 9: Brand Kit v2 — FFmpeg Pipeline

**Files:**
- Modify: `lib/edit-studio/renderEngine.js`
- Modify: `app/api/edit-studio/render-plan/route.js`

- [ ] **Step 1: Update `render-plan/route.js` to inject intro/outro/watermark from brand kit**

Find the existing brand kit injection block:
```js
        if (kit.logoUrl) brandKit = { logoUrl: kit.logoUrl, primaryColor: kit.primaryColor || null }
```
Replace with:
```js
        if (kit.logoUrl || kit.introClipUrl || kit.outroClipUrl || kit.watermarkUrl) {
          brandKit = {
            logoUrl:      kit.logoUrl      || null,
            primaryColor: kit.primaryColor || null,
            introClipUrl: kit.introClipUrl || null,
            outroClipUrl: kit.outroClipUrl || null,
            watermarkUrl: kit.watermarkUrl || null,
          }
        }
```

- [ ] **Step 2: Update `buildFullFfmpegArgs` in `renderEngine.js`**

Current signature:
```js
export function buildFullFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null) {
```
Replace with:
```js
export function buildFullFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null, introPath = null, outroPath = null, watermarkPath = null) {
```

Inside the function, find the logo input section:
```js
  const hasLogo  = !!logoPath
  const logoIdx  = hasMusic ? 2 : 1
  if (hasLogo) inputs.push('-i', logoPath)
```
Replace with a generalized input tracker:
```js
  let nextIdx    = hasMusic ? 2 : 1
  const hasLogo  = !!logoPath
  const logoIdx  = hasLogo ? nextIdx++ : null
  if (hasLogo) inputs.push('-i', logoPath)

  const hasIntro     = !!introPath
  const introIdx     = hasIntro ? nextIdx++ : null
  if (hasIntro) inputs.push('-i', introPath)

  const hasOutro     = !!outroPath
  const outroIdx     = hasOutro ? nextIdx++ : null
  if (hasOutro) inputs.push('-i', outroPath)

  const hasWatermark = !!watermarkPath
  const watermarkIdx = hasWatermark ? nextIdx++ : null
  if (hasWatermark) inputs.push('-i', watermarkPath)
```

Find the logo overlay section (currently at end before return):
```js
  // Logo overlay (brand kit — bottom-right corner)
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalVideo}][slogo]overlay=W-w-20:H-h-20[withlogo]`)
    finalVideo = '[withlogo]'
  }
```
Replace with:
```js
  // Logo overlay (bottom-right corner)
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalVideo}][slogo]overlay=W-w-20:H-h-20[afterlogo]`)
    finalVideo = '[afterlogo]'
  }

  // Watermark overlay (top-left, semi-transparent)
  if (hasWatermark) {
    filters.push(`[${watermarkIdx}:v]scale=100:-1,format=rgba,colorchannelmixer=aa=0.6[swm]`)
    filters.push(`[${finalVideo}][swm]overlay=20:20[afterwm]`)
    finalVideo = '[afterwm]'
  }

  // Intro/outro concatenation
  if (hasIntro || hasOutro) {
    // Scale intro/outro to same resolution as main content
    if (hasIntro) {
      filters.push(`[${introIdx}:v]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[introV]`)
    }
    if (hasOutro) {
      filters.push(`[${outroIdx}:v]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[outroV]`)
    }

    // Build concat: [intro?][main][outro?]
    const concatV  = []
    const concatA  = []
    const nSegs    = (hasIntro ? 1 : 0) + 1 + (hasOutro ? 1 : 0)

    if (hasIntro) { concatV.push('[introV]'); concatA.push(`[${introIdx}:a]`) }
    concatV.push(`[${finalVideo}]`); concatA.push(`[${finalAudio}]`)
    if (hasOutro) { concatV.push('[outroV]'); concatA.push(`[${outroIdx}:a]`) }

    filters.push(`${concatV.join('')}${concatA.join('')}concat=n=${nSegs}:v=1:a=1[finalV][finalA]`)
    finalVideo = '[finalV]'
    finalAudio = '[finalA]'
  }
```

Update the return args to use `finalVideo`/`finalAudio` (they already use these — just ensure the mapping is clean) and add new return flags:
```js
  return {
    args: [
      ...inputs,
      '-filter_complex', filters.join(';'),
      '-map', finalVideo,
      '-map', finalAudio,
      '-c:v', 'libx264', '-preset', 'fast', '-crf', crf,
      '-c:a', 'aac', '-b:a', '128k',
      '-r', String(plan.fps || 30),
      '-movflags', '+faststart',
      '-y',
      outputPath,
    ],
    captionsRendered:   hasCaps,
    musicRendered:      hasMusic,
    logoRendered:       hasLogo,
    introRendered:      hasIntro,
    outroRendered:      hasOutro,
    watermarkRendered:  hasWatermark,
  }
```

- [ ] **Step 3: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add lib/edit-studio/renderEngine.js app/api/edit-studio/render-plan/route.js
git commit -m "feat: add intro/outro/watermark to FFmpeg pipeline in renderEngine + render-plan"
```

---

## Task 10: Brand Kit v2 — Render Worker

**Files:**
- Modify: `scripts/render-worker.mjs`

- [ ] **Step 1: Add intro/outro/watermark resolution functions**

Find `resolveLogoPath` in the worker. Add these three functions AFTER it:

```js
async function resolveClipPath(url, workDir, filename) {
  if (!url) return null
  try {
    let resolvedUrl = url
    if (url.includes('/brand-assets/')) {
      const storagePath = url.split('/brand-assets/').pop()?.split('?')[0]
      if (storagePath) {
        const { data: signed } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 3600)
        if (signed?.signedUrl) resolvedUrl = signed.signedUrl
      }
    }
    const dest = path.join(workDir, filename)
    await downloadFile(resolvedUrl, dest)
    return dest
  } catch (err) {
    log('WARN', null, `${filename} skipped: ${err.message}`)
    return null
  }
}
```

- [ ] **Step 2: Update `buildArgs` signature to accept new paths**

Find `function buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null)`.
Replace with:
```js
function buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null, introPath = null, outroPath = null, watermarkPath = null) {
```

Inside `buildArgs`, find the existing logo index section:
```js
  const hasLogo  = !!logoPath
  const logoIdx  = musicPath ? 2 : 1
  if (hasLogo) inputs.push('-i', logoPath)
```
Replace with the same generalized tracker as renderEngine.js:
```js
  let nextIdx    = musicPath ? 2 : 1
  const hasLogo  = !!logoPath
  const logoIdx  = hasLogo ? nextIdx++ : null
  if (hasLogo) inputs.push('-i', logoPath)

  const hasIntro     = !!introPath
  const introIdx     = hasIntro ? nextIdx++ : null
  if (hasIntro) inputs.push('-i', introPath)

  const hasOutro     = !!outroPath
  const outroIdx     = hasOutro ? nextIdx++ : null
  if (hasOutro) inputs.push('-i', outroPath)

  const hasWatermark = !!watermarkPath
  const watermarkIdx = hasWatermark ? nextIdx++ : null
  if (hasWatermark) inputs.push('-i', watermarkPath)
```

Find the existing logo overlay block in `buildArgs`:
```js
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalV}][slogo]overlay=W-w-20:H-h-20[withlogo]`)
    finalV = '[withlogo]'
  }
```
Replace with:
```js
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalV}][slogo]overlay=W-w-20:H-h-20[afterlogo]`)
    finalV = '[afterlogo]'
  }

  if (hasWatermark) {
    filters.push(`[${watermarkIdx}:v]scale=100:-1,format=rgba,colorchannelmixer=aa=0.6[swm]`)
    filters.push(`[${finalV}][swm]overlay=20:20[afterwm]`)
    finalV = '[afterwm]'
  }

  if (hasIntro || hasOutro) {
    const [w, h] = (plan.resolution || '1080x1920').split('x')
    if (hasIntro) {
      filters.push(`[${introIdx}:v]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[introV]`)
    }
    if (hasOutro) {
      filters.push(`[${outroIdx}:v]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[outroV]`)
    }
    const concatV = [], concatA = []
    const nSegs   = (hasIntro ? 1 : 0) + 1 + (hasOutro ? 1 : 0)
    if (hasIntro) { concatV.push('[introV]'); concatA.push(`[${introIdx}:a]`) }
    concatV.push(`[${finalV}]`); concatA.push(`[${finalA}]`)
    if (hasOutro) { concatV.push('[outroV]'); concatA.push(`[${outroIdx}:a]`) }
    filters.push(`${concatV.join('')}${concatA.join('')}concat=n=${nSegs}:v=1:a=1[finalV][finalA]`)
    finalV = '[finalV]'; finalA = '[finalA]'
  }
```

- [ ] **Step 3: Resolve and pass new paths inside `executeJob`**

Find the logo resolution block:
```js
    let logoPath = null
    if (plan.brandKit?.logoUrl) {
      logoPath = await resolveLogoPath(plan, workDir)
      if (logoPath) log('INFO', jobId, 'Logo resolved')
    }
```
Add after it:
```js
    let introPath = null, outroPath = null, watermarkPath = null

    if (plan.brandKit?.introClipUrl) {
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'intro' } })
      introPath = await resolveClipPath(plan.brandKit.introClipUrl, workDir, 'intro.mp4')
      if (introPath) log('INFO', jobId, 'Intro clip resolved')
    }
    if (plan.brandKit?.outroClipUrl) {
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'outro' } })
      outroPath = await resolveClipPath(plan.brandKit.outroClipUrl, workDir, 'outro.mp4')
      if (outroPath) log('INFO', jobId, 'Outro clip resolved')
    }
    if (plan.brandKit?.watermarkUrl) {
      watermarkPath = await resolveClipPath(plan.brandKit.watermarkUrl, workDir, 'watermark.png')
      if (watermarkPath) log('INFO', jobId, 'Watermark resolved')
    }
```

Find the `buildArgs` call:
```js
    const args = buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath)
```
Replace with:
```js
    const args = buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath, introPath, outroPath, watermarkPath)
```

Update `renderDetails` to include new fields:
```js
    const renderDetails = { captionsRendered: !!captionPath, musicRendered: !!musicPath, logoRendered: !!logoPath, introRendered: !!introPath, outroRendered: !!outroPath, watermarkRendered: !!watermarkPath, warnings, retryCount, completedAt: new Date().toISOString() }
```

- [ ] **Step 4: Verify no syntax errors in the worker**

```bash
node --check scripts/render-worker.mjs 2>&1
```
Expected: No output (no syntax errors).

- [ ] **Step 5: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 6: Commit**

```bash
git add scripts/render-worker.mjs
git commit -m "feat: add intro/outro/watermark resolution and overlay to render worker"
```

---

## Task 11: Final Build + Push

- [ ] **Step 1: Full production build**

```bash
npx next build 2>&1 | grep -E "^(✓|✗|Error)" | head -10
```
Expected: `✓ Compiled successfully`

- [ ] **Step 2: Verify new routes**

```bash
npx next build 2>&1 | grep "render-health\|render-ops\|user-insights" | head -5
```
Expected: All three listed as ƒ (dynamic).

- [ ] **Step 3: Run worker syntax check**

```bash
node --check scripts/render-worker.mjs && echo "Worker syntax OK"
```
Expected: `Worker syntax OK`

- [ ] **Step 4: Push**

```bash
git push origin main
```

---

## Self-Review

**Spec coverage:**

| Phase | Requirement | Task |
|---|---|---|
| 1 | Railway nixpacks.toml | Task 1 |
| 1 | Deployment guide | Task 1 |
| 1 | Health check endpoint | Task 2 |
| 2 | Render ops API | Task 3 |
| 2 | Render ops dashboard UI | Task 4 |
| 3 | User insights API (preferred_platform, length, caption, music, frequencies) | Task 5 |
| 4 | AI Director export recommendations | Task 6 |
| 5 | Brand Kit intro/outro API support | Task 7 |
| 5 | Brand Kit UI for intro/outro/watermark | Task 8 |
| 5 | FFmpeg pipeline for intro/outro/watermark | Task 9 |
| 5 | Render worker for intro/outro/watermark | Task 10 |
| — | Final build + push | Task 11 |

**Placeholder scan:** No TBDs. All FFmpeg filter patterns are explicit. All API routes have complete code. The `resolveClipPath` function is fully implemented (not "add error handling").

**Type consistency:**
- `introClipUrl`, `outroClipUrl`, `watermarkUrl` — exact field names consistent across: brand_kit PATCH body, render-plan brandKit object, worker `plan.brandKit.*`, render details return object ✓
- `buildFullFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath, introPath, outroPath, watermarkPath)` — 9 params, same order in renderEngine.js and worker buildArgs ✓
- `nextIdx` tracker consistent between renderEngine.js and worker (both start at `hasMusic ? 2 : 1`) ✓
- `introRendered`, `outroRendered`, `watermarkRendered` in both engine return and worker renderDetails ✓

**Deployment note preserved:** Phase 1 delivers tooling. User performs actual Railway deployment. The health check endpoint at `/api/admin/render-health` provides validation evidence after deployment.
