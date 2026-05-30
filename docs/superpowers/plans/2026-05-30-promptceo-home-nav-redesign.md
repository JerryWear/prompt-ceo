# PromptCEO Home + Navigation Redesign — Phase A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote the GPT view into a real Home screen with two states (new user onboarding / returning user Brain recommendations), collapse the horizontal nav from 4 scattered groups into 4 clean destination groups, and rename display labels without touching internal view keys.

**Architecture:** Two files change. `page.js` gets: a new default view (ai_director), two pure helper functions (buildBrainRecommendation, buildConfidenceScore), one new state + handler (recommendationAccepted + handleRecommendationAccept), a rewritten welcome state block inside the ai_director IIFE, and a restructured nav block. `signal/route.js` gets one new event weight entry. All internal view keys stay unchanged — only display labels change.

**Tech Stack:** Next.js 14, React (useState, useCallback), Tailwind-free (inline styles matching the existing C.* design token pattern)

---

## File Map

| File | Change |
|---|---|
| `app/prompt-engine-v3/page.js:11424` | Change `INIT.view` from `'studio'` to `'ai_director'` |
| `app/prompt-engine-v3/page.js:12085–12128` | Add `buildBrainRecommendation` and `buildConfidenceScore` pure functions in the "AI DIRECTOR — pure JS helpers" section |
| `app/prompt-engine-v3/page.js:~12858` | Add `recommendationAccepted` state after existing timelineLoading/adaptResult states |
| `app/prompt-engine-v3/page.js:~12140` | Add `handleRecommendationAccept` function near `fireSignal` |
| `app/prompt-engine-v3/page.js:17352–17401` | Replace welcome state block with two-state render (new user / returning user) |
| `app/prompt-engine-v3/page.js:14712–14823` | Replace nav block with 4-group restructured nav |
| `app/api/signal/route.js:21–30` | Add `brain_recommendation_accepted: 9` to EVENT_WEIGHTS |

---

## Task 1: Change Default View to Home

**Files:**
- Modify: `app/prompt-engine-v3/page.js:11424`

The INIT constant sets the app's default view on first load. Currently it opens Studio. Change it to ai_director so the Home screen is the landing page.

- [ ] **Step 1: Edit INIT.view**

Find line 11424 in `app/prompt-engine-v3/page.js`:
```javascript
view:               'studio',
```
Change to:
```javascript
view:               'ai_director',
```

- [ ] **Step 2: Verify the change is isolated**

Run: `grep -n "view:.*'studio'" app/prompt-engine-v3/page.js | head -5`

Expected: The `INIT` entry no longer shows `'studio'` — only other occurrences unrelated to INIT. No other code paths should need updating; `?view=studio` URL param still works because the validViews array at line 12159 still includes `'studio'`.

- [ ] **Step 3: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: set ai_director as default landing view"
```

---

## Task 2: Add brain_recommendation_accepted Signal Event

**Files:**
- Modify: `app/api/signal/route.js:21–30`

The signal route validates event types against EVENT_WEIGHTS. The new "Generate Next Asset" button fires `brain_recommendation_accepted`. Add it with weight 9 (highest — this is the most valuable signal: user accepted a Brain recommendation).

- [ ] **Step 1: Add the event type**

Find the EVENT_WEIGHTS constant in `app/api/signal/route.js` (lines 21–30):
```javascript
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
```
Change to:
```javascript
const EVENT_WEIGHTS = {
  generation_completed:         2,
  result_downloaded:            5,
  result_copied:                4,
  result_re_run:                6,
  phase_advanced:               8,
  creative_dir_used:            7,
  session_length_20min:         8,
  style_changed:                3,
  brain_recommendation_accepted: 9,
}
```

- [ ] **Step 2: Verify no other files reference EVENT_WEIGHTS**

Run: `grep -rn "EVENT_WEIGHTS\|brain_recommendation" app/`

Expected: only `signal/route.js` has `EVENT_WEIGHTS`. The new event type string will appear in `page.js` after Task 4.

- [ ] **Step 3: Commit**

```bash
git add app/api/signal/route.js
git commit -m "feat: add brain_recommendation_accepted signal event (weight 9)"
```

---

## Task 3: Add Brain Helper Functions and State

**Files:**
- Modify: `app/prompt-engine-v3/page.js:12085–12128` (pure helpers section)
- Modify: `app/prompt-engine-v3/page.js:~12858` (state declarations)
- Modify: `app/prompt-engine-v3/page.js:~12140` (near fireSignal)

Add two pure client-side functions that compute the Brain recommendation message and confidence score from projectBrain data — no API call needed. Add the `recommendationAccepted` state and the `handleRecommendationAccept` callback that pre-fills the Director chat.

- [ ] **Step 1: Add the two pure helper functions**

Find the section starting at line 12085 in `page.js`:
```javascript
// ─────────────────────────────────────────────────────────────
// AI DIRECTOR — pure JS helpers (no API calls)
// ─────────────────────────────────────────────────────────────

function buildDirectorOpener(memory, activeBrandProfile) {
```

Insert the two new functions BEFORE `buildDirectorOpener`:
```javascript
// ─────────────────────────────────────────────────────────────
// AI DIRECTOR — pure JS helpers (no API calls)
// ─────────────────────────────────────────────────────────────

function buildBrainRecommendation(projectBrain, brandProfile) {
  if (!projectBrain) return null
  const stage = projectBrain.campaign_stage || 'attention'
  const countMap   = { attention: 3, emotional_connection: 3, desire_escalation: 3, conversion: 2, retargeting: 2 }
  const formatMap  = { attention: 'hook-led posts', emotional_connection: 'story posts', desire_escalation: 'Story videos', conversion: 'direct-response ads', retargeting: 're-engagement posts' }
  const count      = countMap[stage] || 3
  const format     = formatMap[stage] || 'campaign assets'
  const platform   = projectBrain.best_platform || 'Instagram'
  const world      = projectBrain.best_worlds?.[0] || null
  const hook       = projectBrain.best_hook_types?.[0] || null
  const product    = brandProfile?.name || 'your brand'
  const pacing     = projectBrain.pacing_profile || null

  let msg = `Build ${count} ${format} for ${product} — ${platform}`
  if (world)   msg += `, ${world.replace(/_/g, ' ')} world`
  if (hook)    msg += `, ${hook.replace(/_/g, ' ')} hooks`
  if (pacing)  msg += `, ${pacing} pacing`
  return msg + '.'
}

function buildConfidenceScore(projectBrain) {
  if (!projectBrain) return null
  let score = 60
  if (projectBrain.best_hook_types?.length > 0)  score += 8
  if (projectBrain.best_worlds?.length > 0)       score += 8
  if (projectBrain.best_platform)                 score += 7
  if ((projectBrain.fatigue_score ?? 100) < 50)  score += 7
  if ((projectBrain.total_generations || 0) > 5) score += 7
  return Math.min(score, 97)
}

function buildDirectorOpener(memory, activeBrandProfile) {
```

- [ ] **Step 2: Add `recommendationAccepted` state**

Find the block of state declarations around line 12858 where `adaptResult`, `adaptLoading`, `adaptError`, `copiedKey` are declared (the Cross-Platform view states added in a previous session). Add `recommendationAccepted` state after them:

```javascript
// Brain recommendation state
const [recommendationAccepted, setRecommendationAccepted] = useState(false)
```

- [ ] **Step 3: Add `handleRecommendationAccept` callback**

Find the `fireSignal` function in `page.js` (around line 12133):
```javascript
  const fireSignal = (event_type, metadata = {}) => {
    fetch('/api/signal', { ... }).catch(() => {})
  }
```

Add `handleRecommendationAccept` immediately after `fireSignal`:
```javascript
  const handleRecommendationAccept = useCallback(() => {
    if (!projectBrain) return
    const msg = buildBrainRecommendation(projectBrain, activeBrandProfile)
    if (!msg) return
    fireSignal('brain_recommendation_accepted', {
      stage: projectBrain.campaign_stage,
      confidence: buildConfidenceScore(projectBrain),
    })
    setRecommendationAccepted(true)
    setDirectorInput(msg)
    setTimeout(() => directorSend(msg), 50)
  }, [projectBrain, activeBrandProfile, directorSend])
```

Note: `setDirectorInput` and `directorSend` are already in scope at this position (both declared earlier in the component). `activeBrandProfile` is also in scope at this point.

- [ ] **Step 4: Verify types**

Run: `grep -n "buildBrainRecommendation\|buildConfidenceScore\|handleRecommendationAccept\|recommendationAccepted" app/prompt-engine-v3/page.js`

Expected: each name appears in exactly the places added in Steps 1–3. `buildBrainRecommendation` and `buildConfidenceScore` appear in the helper section above the component. `recommendationAccepted` and `handleRecommendationAccept` appear inside the component body.

- [ ] **Step 5: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: add Brain recommendation helpers and accept handler"
```

---

## Task 4: Rewrite Home Welcome State (Two-State Render)

**Files:**
- Modify: `app/prompt-engine-v3/page.js:17352–17401`

The welcome state is shown when `directorHistory.length === 0 && directorPhase === 'idle'`. Replace the single static state with two branches: new user (no history) and returning user (has directorMemory or projectBrain).

Context: the `ai_director` IIFE starts at line 17337. The welcome state block starts at line 17352 and ends at line 17401 (closing `</div>`). The conversation messages and input bar follow after. Only the welcome block changes — nothing else in the IIFE moves.

Variables in scope at this location:
- `directorMemory` — loaded campaign_memory data: `{ campaignCount, bestHookType, topWorld, topWorldUses, bestPlatform, recentStyle }`
- `projectBrain` — from `useState(null)` at line 12858, populated when `s.activeProjectId` exists
- `activeBrandProfile` — from state
- `buildBrainRecommendation(projectBrain, activeBrandProfile)` — pure function added in Task 3
- `buildConfidenceScore(projectBrain)` — pure function added in Task 3
- `handleRecommendationAccept` — callback added in Task 3
- `recommendationAccepted` — state added in Task 3
- `C.*` — design token object
- `directorSend`, `setDirectorInput` — existing callbacks
- `buildDirectorQuickStarts(directorMemory, activeBrandProfile)` — existing helper

- [ ] **Step 1: Identify the exact block to replace**

The block to replace starts at:
```javascript
              {/* Welcome state */}
              {directorHistory.length === 0 && directorPhase === 'idle' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 28, maxWidth: 620, margin: '0 auto', width: '100%' }}>
                  <div style={{ fontSize: 28, color: C.gold }}>✦</div>
                  <div style={{ fontSize: 22, fontWeight: 700, ...
```

And ends at the closing `</div>` of that outer div (the one with `height: '100%'`), before the conversation messages block.

Run `grep -n "Welcome state\|What would you like to create" app/prompt-engine-v3/page.js` to confirm the exact lines.

- [ ] **Step 2: Replace the welcome state block**

Replace the entire block (from `{/* Welcome state */}` through its closing `</div>)`) with:

```jsx
              {/* Home — two-state welcome */}
              {directorHistory.length === 0 && directorPhase === 'idle' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, maxWidth: 640, margin: '0 auto', width: '100%', padding: '0 16px' }}>

                  {/* ── RETURNING USER STATE ── */}
                  {(directorMemory?.campaignCount > 0 || projectBrain) ? (
                    <>
                      {/* Greeting */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Welcome back</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', fontFamily: C.display, letterSpacing: -0.5 }}>
                          {activeBrandProfile?.name ? activeBrandProfile.name : 'PromptCEO'}
                        </div>
                      </div>

                      {/* Brain recommendation card */}
                      {projectBrain && s.activeProjectId && (() => {
                        const recMsg    = buildBrainRecommendation(projectBrain, activeBrandProfile)
                        const confidence = buildConfidenceScore(projectBrain)
                        if (!recMsg) return null
                        const stage     = projectBrain.campaign_stage || 'attention'
                        const stageFmt  = stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                        return (
                          <div style={{ width: '100%', borderRadius: 14, border: `1px solid ${C.goldDim}60`, background: 'linear-gradient(135deg, #1a1408 0%, #0d0d0d 100%)', overflow: 'hidden' }}>
                            <div style={{ padding: '10px 18px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, boxShadow: `0 0 6px ${C.gold}` }} />
                              <span style={{ fontSize: 10, fontWeight: 800, color: C.gold, letterSpacing: 1.5, textTransform: 'uppercase' }}>PromptCEO Recommends</span>
                              <span style={{ fontSize: 9, color: C.muted, marginLeft: 'auto', background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 3, padding: '2px 7px' }}>{stageFmt} Phase</span>
                            </div>
                            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                              <div style={{ fontSize: 14, color: '#e8e0d0', lineHeight: 1.7 }}>{recMsg}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <button
                                  onClick={handleRecommendationAccept}
                                  disabled={recommendationAccepted}
                                  style={{
                                    padding: '10px 22px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: recommendationAccepted ? 'default' : 'pointer',
                                    background: recommendationAccepted ? C.surface : C.gold, color: recommendationAccepted ? C.muted : '#0d0b08',
                                    border: `1px solid ${recommendationAccepted ? C.hairline : C.gold}`,
                                    transition: 'all 0.2s',
                                  }}
                                >{recommendationAccepted ? '✓ Sent to Director' : 'Generate Next Asset →'}</button>
                                {confidence && (
                                  <span style={{ fontSize: 10, color: C.muted }}>Confidence: <span style={{ color: C.gold, fontWeight: 700 }}>{confidence}%</span></span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })()}

                      {/* Memory signals */}
                      {directorMemory?.campaignCount > 0 && (
                        <div style={{ width: '100%', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.raised, overflow: 'hidden' }}>
                          <div style={{ padding: '10px 18px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold }} />
                            <span style={{ fontSize: 10, fontWeight: 800, color: C.gold, letterSpacing: 1.5, textTransform: 'uppercase' }}>Performance Signals</span>
                            <span style={{ fontSize: 10, color: C.muted, marginLeft: 'auto' }}>{directorMemory.campaignCount} campaign{directorMemory.campaignCount !== 1 ? 's' : ''}</span>
                          </div>
                          <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {[
                              { label: 'Best hook type', value: directorMemory.bestHookType?.replace(/_/g,' ') },
                              { label: 'Top world',      value: directorMemory.topWorld?.replace(/_/g,' ') },
                              { label: 'Best platform',  value: directorMemory.bestPlatform },
                              { label: 'Recent style',   value: directorMemory.recentStyle?.replace(/_/g,' ') },
                            ].map(item => item.value ? (
                              <div key={item.label} style={{ background: C.surface, borderRadius: 8, padding: '10px 14px', border: `1px solid ${C.hairline}` }}>
                                <div style={{ fontSize: 9, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>{item.label}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, textTransform: 'capitalize' }}>{item.value}</div>
                              </div>
                            ) : null)}
                          </div>
                        </div>
                      )}

                      {/* Quick starts for returning users */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 580 }}>
                        {buildDirectorQuickStarts(directorMemory, activeBrandProfile).map(q => (
                          <button key={q.label} onClick={() => { setDirectorInput(q.msg); setTimeout(() => directorSend(q.msg), 50) }}
                            style={{ padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary, transition: 'all 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldDim; e.currentTarget.style.color = C.gold }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.secondary }}
                          >{q.label}</button>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* ── NEW USER STATE ── */
                    <>
                      <div style={{ fontSize: 28, color: C.gold }}>✦</div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', fontFamily: C.display, letterSpacing: -0.3, marginBottom: 10 }}>Welcome to PromptCEO.</div>
                        <div style={{ fontSize: 15, color: C.muted, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>The AI Creative Operating System for brands, creators, and agencies. Tell me what you're building and I'll set up your first campaign.</div>
                      </div>

                      {/* What are you building chips */}
                      <div style={{ width: '100%' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}>What are you building?</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                          {[
                            { label: 'Brand',   msg: "I'm building a brand and need a full campaign strategy" },
                            { label: 'Product', msg: "I want to launch a product and need ads and content" },
                            { label: 'Creator', msg: "I'm a content creator building my personal brand" },
                            { label: 'Agency',  msg: "I run an agency and need campaigns for clients" },
                            { label: 'SaaS',    msg: "I have a SaaS product and need acquisition campaigns" },
                          ].map(chip => (
                            <button key={chip.label}
                              onClick={() => { setDirectorInput(chip.msg); setTimeout(() => directorSend(chip.msg), 50) }}
                              style={{ padding: '10px 22px', borderRadius: 24, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary, transition: 'all 0.15s' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldDim; e.currentTarget.style.color = C.gold }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.secondary }}
                            >{chip.label}</button>
                          ))}
                        </div>
                      </div>

                      {/* Start fast */}
                      <div style={{ width: '100%' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}>Start fast</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          {[
                            { label: 'Build First Campaign', msg: 'I want to build my first ad campaign' },
                            { label: 'Create First Ad',      msg: 'I want to create a single ad creative' },
                            { label: 'Create First Video',   msg: 'I want to plan a video campaign' },
                            { label: 'Perfect Day',          msg: 'Create a perfect day lifestyle campaign for my brand' },
                          ].map(btn => (
                            <button key={btn.label}
                              onClick={() => { setDirectorInput(btn.msg); setTimeout(() => directorSend(btn.msg), 50) }}
                              style={{ padding: '12px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary, textAlign: 'center', transition: 'all 0.15s' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.secondary }}
                            >{btn.label}</button>
                          ))}
                        </div>
                      </div>

                      {/* What PromptCEO does */}
                      <div style={{ width: '100%', borderRadius: 10, border: `1px solid ${C.hairline}`, padding: '16px 20px', background: C.raised }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>What PromptCEO does</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {[
                            'Generates complete ad campaigns — hooks, captions, image prompts',
                            'Creates image and video content with cinematic quality',
                            'Tracks your campaign evolution across 5 phases automatically',
                            'Learns what works — best hooks, worlds, platforms — over time',
                            'Adapts every campaign for Instagram, TikTok, Meta Ads, and YouTube',
                          ].map(item => (
                            <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                              <span style={{ color: C.gold, fontSize: 11, marginTop: 2 }}>✓</span>
                              <span style={{ fontSize: 13, color: C.secondary, lineHeight: 1.5 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
```

- [ ] **Step 3: Verify the IIFE structure is intact**

Run: `grep -n "s\.view === 'ai_director'" app/prompt-engine-v3/page.js`

Expected: single result at the IIFE opening. The conversation messages block and input bar that follow the welcome state should be untouched.

- [ ] **Step 4: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Home two-state welcome — new user onboarding + returning user Brain recommendations"
```

---

## Task 5: Restructure Navigation

**Files:**
- Modify: `app/prompt-engine-v3/page.js:14712–14823`

Replace the current 4 ad-hoc groups (CREATE, LIFE, CAMPAIGNS + Hub) with 4 clean groups (HOME, CAMPAIGNS, STUDIO + Hub link). Internal view keys are unchanged — only display labels and group membership change.

**Current → New mapping:**

| Internal key | Old group | Old label | New group | New label |
|---|---|---|---|---|
| `ai_director` | CREATE | GPT | HOME | Home |
| `studio` | CREATE | Studio | STUDIO | Studio |
| `/instant` link | CREATE | Instant | STUDIO | Quick Create |
| `perfect_day` | LIFE | Perfect Day | STUDIO | Perfect Day |
| `full_day_video` | LIFE | Day Video | STUDIO | Day Video |
| `timeline` | LIFE | Timeline | STUDIO | Timeline |
| `/full-day` link | LIFE | Life Engine | STUDIO | Life Engine |
| `ad_studio` | CAMPAIGNS | Ad Studio | STUDIO | Ad Studio |
| `full_campaign` | CAMPAIGNS | Full Campaign | CAMPAIGNS | Campaign Builder |
| `campaign_journey` | CAMPAIGNS | Journey | CAMPAIGNS | Campaign Journey |
| `cross_platform` | CAMPAIGNS | Platforms | CAMPAIGNS | Distribution |
| `/prompt-engine-v3/dashboard` link | (Hub) | Hub | — | Hub |

- [ ] **Step 1: Find the exact block boundaries**

Run: `grep -n "Grouped nav\|Hub" app/prompt-engine-v3/page.js | head -10`

Expected: The `{/* ── Grouped nav ── */}` comment at line 14712 and the Hub link ending around line 14822. The block ends at the closing `</div>` before `<div style={{ flex: 1 }} />`.

- [ ] **Step 2: Replace the nav block**

Replace the entire nav block from `{/* ── Grouped nav ── */}` (line ~14712) through the closing `</div>` of the groups container (line ~14823) with:

```jsx
          {/* ── Grouped nav ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>

            {/* ─ HOME ─ */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                fontSize: 7, fontWeight: 900, color: '#2a2825',
                letterSpacing: 1.5, textTransform: 'uppercase',
                padding: '0 7px', userSelect: 'none', cursor: 'default',
                borderRight: `1px solid ${C.hairline}`,
              }}>HOME</span>
              <button onClick={() => set('view', 'ai_director')} style={{
                padding: '4px 13px', borderRadius: 0, fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: `2px solid ${s.view === 'ai_director' ? C.gold : 'transparent'}`,
                background: s.view === 'ai_director' ? '#0e0c08' : 'transparent',
                color: s.view === 'ai_director' ? C.gold : '#5a5650',
                transition: 'all 0.15s',
              }}>✦ Home</button>
            </div>

            {/* ─ CAMPAIGNS ─ */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                fontSize: 7, fontWeight: 900, color: '#2a2825',
                letterSpacing: 1.5, textTransform: 'uppercase',
                padding: '0 7px', userSelect: 'none', cursor: 'default',
                borderRight: `1px solid ${C.hairline}`,
              }}>CAMPAIGNS</span>
              {[
                { id: 'full_campaign',    label: 'Campaign Builder', icon: '◈' },
                { id: 'campaign_journey', label: 'Campaign Journey', icon: '◉', gold: true },
                { id: 'timeline',         label: 'Timeline',         icon: '▤' },
                { id: 'cross_platform',   label: 'Distribution',     icon: '⊕', blue: true },
              ].map(v => (
                <button key={v.id} onClick={() => set('view', v.id)} style={{
                  padding: '4px 11px', borderRadius: 0, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                  border: 'none', borderRight: `1px solid ${C.hairline}`,
                  borderBottom: `2px solid ${s.view === v.id ? (v.gold ? C.gold : v.blue ? C.blue : C.primary) : 'transparent'}`,
                  background: s.view === v.id ? (v.gold ? '#0e0c08' : v.blue ? '#080c18' : C.raised) : 'transparent',
                  color: s.view === v.id ? (v.gold ? C.gold : v.blue ? C.blue : C.primary) : '#5a5650',
                  transition: 'all 0.15s',
                }}>{v.icon} {v.label}</button>
              ))}
            </div>

            {/* ─ STUDIO ─ */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                fontSize: 7, fontWeight: 900, color: '#2a2825',
                letterSpacing: 1.5, textTransform: 'uppercase',
                padding: '0 7px', userSelect: 'none', cursor: 'default',
                borderRight: `1px solid ${C.hairline}`,
              }}>STUDIO</span>
              {[
                { id: 'studio',        label: 'Studio',      icon: '◧' },
                { id: 'perfect_day',   label: 'Perfect Day', icon: '☀' },
                { id: 'full_day_video', label: 'Day Video',  icon: '🎬' },
              ].map(v => (
                <button key={v.id} onClick={() => set('view', v.id)} style={{
                  padding: '4px 11px', borderRadius: 0, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                  border: 'none', borderRight: `1px solid ${C.hairline}`,
                  borderBottom: `2px solid ${s.view === v.id ? C.primary : 'transparent'}`,
                  background: s.view === v.id ? C.raised : 'transparent',
                  color: s.view === v.id ? C.primary : '#5a5650',
                  transition: 'all 0.15s',
                }}>{v.icon} {v.label}</button>
              ))}
              <button onClick={switchToAdStudio} style={{
                padding: '4px 13px', borderRadius: 0, fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.2, whiteSpace: 'nowrap',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: `2px solid ${s.view === 'ad_studio' ? '#a855f7' : 'transparent'}`,
                background: s.view === 'ad_studio' ? '#120520' : 'transparent',
                color: s.view === 'ad_studio' ? '#d580ff' : '#7a4abf',
                transition: 'all 0.15s',
              }}>📣 Ad Studio</button>
              <a href="/instant" style={{
                padding: '4px 11px', fontSize: 11, fontWeight: 600, letterSpacing: 0.2, whiteSpace: 'nowrap', textDecoration: 'none',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: '2px solid transparent',
                background: 'transparent', color: '#5a5650', display: 'inline-block',
              }}>⚡ Quick Create</a>
              <a href="/full-day" style={{
                padding: '4px 11px', fontSize: 11, fontWeight: 600, letterSpacing: 0.2, whiteSpace: 'nowrap', textDecoration: 'none',
                border: 'none', borderRight: `1px solid ${C.hairline}`,
                borderBottom: '2px solid transparent',
                background: 'transparent', color: '#7a5abf', display: 'inline-block',
              }}>🌍 Life Engine</a>
            </div>

            <a href="/prompt-engine-v3/dashboard" style={{
              padding: '4px 12px', fontSize: 10, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
              border: 'none', borderRight: `1px solid ${C.hairline}`,
              borderBottom: '2px solid transparent',
              background: 'transparent', color: '#3a3632', display: 'inline-block',
            }}>⊞ Hub</a>

          </div>
```

- [ ] **Step 3: Verify the Timeline nav item renders**

`timeline` is now in CAMPAIGNS group. Check it still routes correctly — `set('view', 'timeline')` triggers the existing timeline IIFE. Run:

```bash
grep -n "s\.view === 'timeline'" app/prompt-engine-v3/page.js | head -5
```

Expected: existing timeline view IIFE found. The nav change only affects which button is shown — the IIFE itself is untouched.

- [ ] **Step 4: Verify ad_studio active state still works**

The Ad Studio button calls `switchToAdStudio` (not `set('view', 'ad_studio')`). The active underline check `s.view === 'ad_studio'` is preserved in the new button. Confirm:

```bash
grep -n "switchToAdStudio" app/prompt-engine-v3/page.js | head -5
```

Expected: `switchToAdStudio` defined elsewhere in the component — the button just calls it, same as before.

- [ ] **Step 5: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: collapse nav into 4 groups (HOME / CAMPAIGNS / STUDIO / Hub), rename labels"
```

---

## Task 6: Reset recommendationAccepted When User Navigates Back

**Files:**
- Modify: `app/prompt-engine-v3/page.js` — add a useEffect near the existing view-change effects

When the user navigates away from `ai_director` and comes back, `recommendationAccepted` should reset so the button is live again. This prevents the button from being permanently disabled after one accept.

- [ ] **Step 1: Add the reset effect**

Find the block of `useEffect` hooks around line 12959 (where the timeline useEffect lives). Add after the existing effects that depend on `s.view`:

```javascript
  useEffect(() => {
    if (s.view === 'ai_director') setRecommendationAccepted(false)
  }, [s.view])
```

- [ ] **Step 2: Verify no naming conflicts**

Run: `grep -n "setRecommendationAccepted" app/prompt-engine-v3/page.js`

Expected: exactly 3 occurrences — the useState declaration, the handleRecommendationAccept callback (Task 3), and this new useEffect.

- [ ] **Step 3: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: reset Brain recommendation button when user returns to Home"
```

---

## Spec Coverage Self-Review

1. **Default view → ai_director**: ✅ Task 1
2. **Two-state Home (new / returning)**: ✅ Task 4
3. **New user: onboarding + quick starts**: ✅ Task 4 (new user branch)
4. **Returning user: Brain recommendation card**: ✅ Task 4 (returning user branch)
5. **Generate Next Asset pre-fills Director chat**: ✅ Task 3 (handleRecommendationAccept calls setDirectorInput + directorSend)
6. **Does not auto-generate (Option A)**: ✅ Uses existing directorSend flow — user sees message, confirms
7. **brain_recommendation_accepted signal**: ✅ Tasks 2 + 3
8. **Nav: 4 groups**: ✅ Task 5
9. **Internal keys unchanged**: ✅ Task 5 (all `set('view', ...)` calls use original keys)
10. **Renames: Campaign Builder, Campaign Journey, Distribution**: ✅ Task 5
11. **Reset button on view change**: ✅ Task 6
12. **No new files, no new routes**: ✅ All changes are edits to existing files only
