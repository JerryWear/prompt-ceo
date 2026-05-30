# Instant Auto-Learning™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 4 of the Intelligence Architecture — make the Instant™ flow learn from the user's past choices. Step 1 shows "top pick" badges on familiar types. Steps 2 & 3 reorder options by frequency. The instant-campaign route overrides the static world suggestion with the user's most-used world from world_memory.

**Architecture:** New lightweight `/api/campaign-memory-summary` endpoint aggregates campaign_memory + world_memory into sorted frequency lists. Instant page fetches this on mount and uses it to sort/badge all three step grids. The instant-campaign route additionally overrides suggestedWorld with the top world_memory record for the user.

**Tech Stack:** Next.js 14 App Router, Supabase (service role), React 18 useState/useEffect

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/api/campaign-memory-summary/route.js` | **Create** | Aggregate campaign_memory + world_memory into sorted frequency lists |
| `app/instant/page.js` | **Modify** | Fetch memory on mount, sort/badge step 1–3 option grids |
| `app/api/instant-campaign/route.js` | **Modify** | Override suggestedWorld with top world_memory record |

---

## Task 1: Create `/api/campaign-memory-summary/route.js`

**Files:**
- Create: `app/api/campaign-memory-summary/route.js`

Auth pattern (same as all routes):
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
```

campaign_memory rows have `successful_patterns: { type, goal, style, ... }` (jsonb). world_memory rows have `world_id` and `use_count`.

- [ ] **Step 1: Write the route file**

Create `app/api/campaign-memory-summary/route.js`:

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

function countFreq(items) {
  const map = {}
  items.forEach(v => { if (v) map[v] = (map[v] || 0) + 1 })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ id, count }))
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = adminClient()

    const [{ data: memories }, { data: worlds }] = await Promise.all([
      admin.from('campaign_memory')
        .select('successful_patterns')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),
      admin.from('world_memory')
        .select('world_id, use_count')
        .eq('user_id', user.id)
        .order('use_count', { ascending: false })
        .limit(10),
    ])

    const patterns = (memories || []).map(m => m.successful_patterns || {})

    const topTypes  = countFreq(patterns.map(p => p.type))
    const topGoals  = countFreq(patterns.map(p => p.goal))
    const topStyles = countFreq(patterns.map(p => p.style))
    const topWorlds = (worlds || []).map(w => ({ id: w.world_id, count: w.use_count }))

    return NextResponse.json({ topTypes, topGoals, topStyles, topWorlds, total: patterns.length })
  } catch (err) {
    console.error('[campaign-memory-summary]', err)
    return NextResponse.json({ error: 'Failed to load memory summary' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify file exists**

Run: `ls app/api/campaign-memory-summary/`
Expected: `route.js` listed

- [ ] **Step 3: Commit**

```bash
git add app/api/campaign-memory-summary/route.js
git commit -m "feat: Add /api/campaign-memory-summary — aggregate type/goal/style/world frequency from user memory"
```

---

## Task 2: Update `app/instant/page.js` — memory-aware option grids

**Files:**
- Modify: `app/instant/page.js`

Three changes in this file:
1. Add `userMemory` state + fetch useEffect (after the brandProfiles useEffect, around line 123)
2. Sort TYPES in step 1 render using memory frequency, add badge to top picks
3. Sort GOALS and STYLES in steps 2 & 3 using memory frequency

**Current state block location (line ~81):**
```javascript
  const [recommendations, setRecommendations] = useState([])
  const [recsLoading,     setRecsLoading]     = useState(false)
```

**Current brand useEffect (lines 113–123):**
```javascript
  useEffect(() => {
    fetch('/api/brand-profiles')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setBrandProfiles(d)
          setActiveBrand(d[0])
        }
      })
      .catch(() => {})
  }, [])
```

**What the step grids look like** — search for `TYPES.map` and `GOALS.map` and `STYLES.map` in the file to find the grid render locations.

- [ ] **Step 1: Add userMemory state after the recsLoading line**

Find:
```javascript
  const [recommendations, setRecommendations] = useState([])
  const [recsLoading,     setRecsLoading]     = useState(false)
```

Add after it:
```javascript
  const [userMemory,      setUserMemory]      = useState({ topTypes: [], topGoals: [], topStyles: [], topWorlds: [], total: 0 })
```

- [ ] **Step 2: Add memory fetch useEffect after the brand useEffect**

Find the closing of the brand useEffect:
```javascript
  useEffect(() => {
    fetch('/api/brand-profiles')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setBrandProfiles(d)
          setActiveBrand(d[0])
        }
      })
      .catch(() => {})
  }, [])
```

Add after it:
```javascript
  useEffect(() => {
    fetch('/api/campaign-memory-summary')
      .then(r => r.json())
      .then(d => { if (d.topTypes) setUserMemory(d) })
      .catch(() => {})
  }, [])
```

- [ ] **Step 3: Sort TYPES grid by memory frequency and add badge**

Read the file to find where TYPES.map is used in the JSX (step 1 grid render). The current render looks roughly like:
```javascript
{TYPES.map(t => (
  <button key={t.id} onClick={() => { setType(t.id); ... }} style={...}>
    <span>{t.icon}</span>
    <div>{t.label}</div>
    <div>{t.desc}</div>
  </button>
))}
```

Find the TYPES grid render. Before the `.map()`, build a sorted list. Replace the `TYPES.map(...)` with a version that:
1. Sorts by memory frequency (top types first)
2. Shows a gold `★` badge + "top pick" label on types the user has used before

The replacement pattern — find the TYPES.map call in the JSX and replace with:
```javascript
{[...TYPES].sort((a, b) => {
  const aCount = userMemory.topTypes.find(t => t.id === a.id)?.count || 0
  const bCount = userMemory.topTypes.find(t => t.id === b.id)?.count || 0
  return bCount - aCount
}).map(t => {
  const memCount = userMemory.topTypes.find(m => m.id === t.id)?.count || 0
  const isTopPick = memCount > 0
  return (
    <button key={t.id} onClick={() => setType(t.id)} style={{
      ...whatever styles are currently on the button...,
      ...(type === t.id ? { border: `1px solid ${C.gold}`, background: C.goldDim } : {}),
    }}>
      {isTopPick && (
        <div style={{ position: 'absolute', top: 4, right: 6, fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.5 }}>
          ★ {memCount}×
        </div>
      )}
      {/* existing content */}
    </button>
  )
})}
```

IMPORTANT: Read the actual TYPES.map JSX in the file first to understand its exact structure (button styles, children), then make a surgical edit that adds sorting + badge without breaking the existing markup.

- [ ] **Step 4: Sort GOALS and STYLES grids by memory frequency**

Find where `GOALS.map` is rendered (step 2). Replace with:
```javascript
{[...GOALS].sort((a, b) => {
  const aCount = userMemory.topGoals.find(g => g.id === a.id)?.count || 0
  const bCount = userMemory.topGoals.find(g => g.id === b.id)?.count || 0
  return bCount - aCount
}).map(g => ( /* existing button JSX unchanged */ ))}
```

Find where `STYLES.map` is rendered (step 3). Replace with:
```javascript
{[...STYLES].sort((a, b) => {
  const aCount = userMemory.topStyles.find(s => s.id === a.id)?.count || 0
  const bCount = userMemory.topStyles.find(s => s.id === b.id)?.count || 0
  return bCount - aCount
}).map(s => ( /* existing button JSX unchanged */ ))}
```

- [ ] **Step 5: Commit**

```bash
git add app/instant/page.js
git commit -m "feat: Instant Auto-Learning — sort type/goal/style grids by user memory, badge top picks"
```

---

## Task 3: Override world suggestion in `/api/instant-campaign/route.js`

**Files:**
- Modify: `app/api/instant-campaign/route.js`

After line 77 (`const orch = orchestrate(type, goal, style, productName.trim())`), add a world_memory override block that replaces the static default world with the user's most-used world.

- [ ] **Step 1: Add world_memory override after orchestrate()**

Find this exact line in the file:
```javascript
    const orch = orchestrate(type, goal, style, productName.trim())
```

Add directly after it:
```javascript
    // Auto-Learning: override static world with user's most-used world
    try {
      const { data: topWorlds } = await admin
        .from('world_memory')
        .select('world_id, use_count')
        .eq('user_id', user.id)
        .order('use_count', { ascending: false })
        .limit(1)
        .single()
      if (topWorlds?.world_id) {
        orch.suggestedWorld        = topWorlds.world_id
        orch.adConfig.suggestedWorld = topWorlds.world_id
      }
    } catch {}
```

- [ ] **Step 2: Verify the edit looks correct**

Read lines 75–95 of the file to confirm the new block is inserted cleanly between `orchestrate()` and the `sequenceDay()` call.

- [ ] **Step 3: Commit**

```bash
git add app/api/instant-campaign/route.js
git commit -m "feat: Instant Auto-Learning — override static world with user's top world_memory record"
```

---

## Self-Review

**Spec coverage:**
- ✅ `app/instant/orchestration.js` — static defaults remain as base; world is now overridden by world_memory in the route (not in orchestration.js itself since it has no DB access — the override happens in the route layer)
- ✅ `/api/instant-campaign` — calls world_memory before generating to personalise world selection
- ✅ Instant step 1 — "★ Nx" badge on types the user has used before, sorted by frequency
- ✅ Instant steps 2+3 — GOALS and STYLES sorted by campaign_memory frequency
- ✅ World suggestion — uses world_memory top 1 for this user (not type-specific, since world_memory isn't keyed by type — uses overall top world)

**Placeholder scan:** None. All code is complete.

**Type consistency:** `userMemory.topTypes/topGoals/topStyles` are all `{id, count}[]` arrays, consistent with countFreq() output. `userMemory.topWorlds` is `{id, count}[]` from world_memory.
