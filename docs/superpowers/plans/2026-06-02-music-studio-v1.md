# Music Studio v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect Edit Studio and Ad Studio to the real `music_tracks` database, add usage logging, and build a standalone `/music-studio` page with Library, Recommendations, Usage, Licensing, and Collections tabs.

**Architecture:** Extract the existing scoring engine from `app/api/edit-studio/music/route.js` into a shared `lib/music/scorer.js`, then upgrade the edit-studio route and create a new `/api/music-studio/recommend` route to both use it. Add a `music_usage_logs` table for tracking. Build the Music Studio page as a single-file Next.js client component matching the existing dark design system.

**Tech Stack:** Next.js 14 App Router, Supabase (service role for writes, SSR client for auth), inline CSS with the project's design token object (`C`), no new dependencies.

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `lib/music/scorer.js` | Shared scoring engine, DB-row mapper, `rankTracks` function |
| Modify | `app/api/edit-studio/music/route.js` | Remove mock library, import scorer, query real DB |
| Modify | `app/edit-studio/page.js` | Remove `MOCK_MUSIC`, fetch real tracks from `/api/music-tracks` on mount |
| Create | `app/api/music-studio/recommend/route.js` | New shared recommendation endpoint |
| Create | `supabase/migrations/20260602_music_usage_logs.sql` | `music_usage_logs` table + RLS |
| Modify | `app/api/license-music/route.js` | Insert usage log on successful license |
| Create | `app/api/music-studio/log-usage/route.js` | Lightweight route to log track selection |
| Modify | `app/edit-studio/page.js` | Call log-usage when track is selected |
| Create | `app/api/music-studio/usage/route.js` | Return user's usage logs with track info |
| Create | `app/api/music-studio/licenses/route.js` | Return user's license rows with track info |
| Create | `app/music-studio/page.js` | Standalone Music Studio UI — 5 tabs |
| Modify | `app/prompt-engine-v3/page.js` | Add Music Studio nav link |

---

## Task 1: Extract Scorer to Shared Lib

**Files:**
- Create: `lib/music/scorer.js`

- [ ] **Step 1: Create `lib/music/scorer.js`**

```js
// lib/music/scorer.js
// Shared music scoring engine — used by Edit Studio and Music Studio routes.

export const PLATFORM_PROFILE = {
  tiktok:    { targetMoods: ['Energetic', 'Trendy'],        bpmMin: 120, bpmMax: 160, energy: 'high',        volume: 0.65, fadeIn: 0.5, fadeOut: 1.0 },
  instagram: { targetMoods: ['Energetic', 'Motivational'],  bpmMin: 100, bpmMax: 140, energy: 'medium',      volume: 0.60, fadeIn: 0.5, fadeOut: 1.5 },
  youtube:   { targetMoods: ['Professional', 'Confident'],  bpmMin: 85,  bpmMax: 120, energy: 'medium',      volume: 0.55, fadeIn: 1.0, fadeOut: 2.0 },
  linkedin:  { targetMoods: ['Professional', 'Confident'],  bpmMin: 70,  bpmMax: 100, energy: 'low',         volume: 0.45, fadeIn: 1.5, fadeOut: 2.5 },
  meta:      { targetMoods: ['Energetic', 'Motivational'],  bpmMin: 115, bpmMax: 155, energy: 'high',        volume: 0.70, fadeIn: 0.5, fadeOut: 1.0 },
}

export const GOAL_PROFILE = {
  founder:  { boostMoods: ['Confident', 'Professional'], bpmAdj: -10, label: 'Founder Update' },
  demo:     { boostMoods: ['Professional', 'Cinematic'],  bpmAdj:   0, label: 'Product Demo'   },
  tutorial: { boostMoods: ['Focused'],                    bpmAdj: -15, label: 'Tutorial'        },
  launch:   { boostMoods: ['Energetic', 'Motivational'],  bpmAdj: +10, label: 'Launch Ad'       },
  ugc:      { boostMoods: ['Energetic', 'Trendy'],        bpmAdj:   0, label: 'UGC Ad'          },
  edu:      { boostMoods: ['Focused', 'Professional'],    bpmAdj: -20, label: 'Educational'     },
}

const BEST_USE_MAP = {
  Motivational: 'Strong for launch ads and founder stories — keeps energy high without being distracting.',
  Focused:      'Ideal for tutorials and product demos — supports focus without competing with narration.',
  Professional: 'Best for founder updates and LinkedIn — signals credibility and confidence.',
  Energetic:    'High-impact ad creative — grabs attention and drives action.',
  Confident:    'Founder-first content — sounds premium without being aggressive.',
  Trendy:       'TikTok and Reels — follows current sound patterns for maximum reach.',
  Cinematic:    'Premium product reveals and brand stories — elevates perceived value.',
}

const PLATFORM_REASONS = {
  tiktok:    'TikTok rewards high-energy tracks that match fast-cut editing and hook immediately.',
  instagram: 'Instagram Reels perform best with tracks that feel current and energetic without distracting from the message.',
  youtube:   'YouTube Shorts benefit from confident, clear tracks that support the voiceover without competing.',
  linkedin:  'LinkedIn audiences respond to professional, understated music that signals credibility.',
  meta:      'Meta Ads need music that grabs attention in the first second and maintains energy throughout.',
}

export function scoreTrack(track, { targetMoods, bpmMin, bpmMax, energy, editDuration, directorMood, goalMoods }) {
  let score = 40

  const allTargetMoods = [...(directorMood ? [directorMood] : []), ...targetMoods, ...(goalMoods || [])]
  const moodMatch = allTargetMoods.some(m =>
    track.mood.toLowerCase().includes(m.toLowerCase().split(' ')[0].toLowerCase())
  )
  if (moodMatch) score += 28

  if (track.bpm >= bpmMin && track.bpm <= bpmMax) score += 18
  else if (track.bpm >= bpmMin - 15 && track.bpm <= bpmMax + 15) score += 8

  const energyMap = { low: 0, medium: 1, 'medium-high': 2, high: 3 }
  const trackE    = energyMap[track.energy] ?? 1
  const targetE   = energyMap[energy]       ?? 1
  if (Math.abs(trackE - targetE) <= 1) score += 10

  if (editDuration && track.duration >= editDuration) score += 8
  else if (editDuration && track.duration >= editDuration * 0.7) score += 3

  if (track.licenseType === 'included') score += 4
  else if (track.licenseType === 'credit') score += 1

  return Math.min(99, score)
}

export function buildBestUse(track) {
  return BEST_USE_MAP[track.mood] || 'Versatile track suitable for multiple content types.'
}

export function buildReason(track, platform, goal, directorMood) {
  const parts = []
  if (directorMood && track.mood.toLowerCase().includes(directorMood.toLowerCase().split(' ')[0].toLowerCase())) {
    parts.push(`Matches your Director recommendation: ${directorMood.toLowerCase()}`)
  }
  const goalLabel = GOAL_PROFILE[goal]?.label
  if (goalLabel) parts.push(`aligned with ${goalLabel} pacing`)
  parts.push(`${track.bpm} BPM gives the right energy for ${platform || 'short-form'} content`)
  return parts.join(', ').replace(/^./, c => c.toUpperCase()) + '.'
}

export function buildTimingPlan(track, platform, editDuration) {
  const profile = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  return {
    introFade:            profile.fadeIn,
    outroFade:            profile.fadeOut,
    targetVolume:         profile.volume,
    recommendedStartTime: 0,
    beatSyncSuggestion:   track.bpm > 120
      ? `Cut to beat — with ${track.bpm} BPM, aim for cuts every ${Math.round(60 / track.bpm * 4 * 10) / 10}s.`
      : `Loose sync — ${track.bpm} BPM allows natural cuts without strict beat timing.`,
    loop: editDuration != null && track.duration < editDuration,
  }
}

export function buildMusicSummary(platform, goal, directorMood, directorPacing, editDuration) {
  const profile  = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  const goalProf = GOAL_PROFILE[goal]          || {}
  const mood     = directorMood || profile.targetMoods[0] || 'Professional'
  const pacing   = directorPacing || (profile.energy === 'high' ? 'Fast' : profile.energy === 'low' ? 'Slow' : 'Moderate')

  return {
    recommendedMood: mood,
    pacing,
    reason:     PLATFORM_REASONS[platform] || `Music selected for ${goalProf.label || 'short-form'} pacing and ${platform || 'social'} platform dynamics.`,
    confidence: platform && goal ? 0.88 : 0.72,
  }
}

// Maps a music_tracks DB row to the shape the scorer and UI expects
export function mapDbTrack(t) {
  return {
    id:          t.id,
    title:       t.title,
    artist:      t.artist_name || t.artist || '',
    mood:        t.mood         || 'Professional',
    bpm:         t.bpm          || 100,
    duration:    t.duration_seconds || 180,
    energy:      (t.energy || 'medium').toLowerCase(),
    licenseType: t.is_premium ? 'premium' : ((t.license_credits || 0) > 0 ? 'credit' : 'included'),
    // pass-through for UI display
    duration_seconds:          t.duration_seconds,
    tags:                      t.tags,
    best_for:                  t.best_for,
    preview_file_url:          t.preview_file_url ? `/api/stream-track/${t.id}` : null,
    drop_time_seconds:         t.drop_time_seconds,
    best_hook_start_seconds:   t.best_hook_start_seconds,
    best_hook_end_seconds:     t.best_hook_end_seconds,
    best_payoff_start_seconds: t.best_payoff_start_seconds,
    best_payoff_end_seconds:   t.best_payoff_end_seconds,
    best_cta_start_seconds:    t.best_cta_start_seconds,
    best_cta_end_seconds:      t.best_cta_end_seconds,
    product_fit:               t.product_fit,
    platform_fit:              t.platform_fit,
    campaign_fit:              t.campaign_fit,
    hook_strength:             t.hook_strength,
    drop_strength:             t.drop_strength,
    luxury_score:              t.luxury_score,
    emotional_depth:           t.emotional_depth,
    is_premium:                t.is_premium,
    featured:                  t.featured,
  }
}

// DB field list for music_tracks queries (use in .select())
export const TRACK_SELECT = [
  'id', 'title', 'artist', 'artist_name', 'genre', 'mood', 'energy', 'bpm',
  'duration_seconds', 'tags', 'best_for', 'drop_time_seconds',
  'best_hook_start_seconds', 'best_hook_end_seconds',
  'best_payoff_start_seconds', 'best_payoff_end_seconds',
  'best_cta_start_seconds', 'best_cta_end_seconds',
  'license_credits', 'is_premium', 'featured', 'preview_file_url',
  'product_fit', 'platform_fit', 'campaign_fit',
  'hook_strength', 'drop_strength', 'luxury_score', 'emotional_depth',
].join(', ')

// Score, enrich, and return top N tracks from an array of raw DB rows
export function rankTracks(dbTracks, { platform, goal, directorMood, directorPacing, editDuration, topN = 6 } = {}) {
  const profile  = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  const goalProf = GOAL_PROFILE[goal]          || {}
  const bpmMin   = profile.bpmMin + (goalProf.bpmAdj || 0)
  const bpmMax   = profile.bpmMax + (goalProf.bpmAdj || 0)

  return dbTracks
    .map(t => {
      const track = mapDbTrack(t)
      return {
        ...track,
        fitScore: scoreTrack(track, {
          targetMoods: profile.targetMoods,
          bpmMin, bpmMax,
          energy:      profile.energy,
          editDuration,
          directorMood,
          goalMoods:   goalProf.boostMoods,
        }),
        bestUse: buildBestUse(track),
        reason:  buildReason(track, platform, goal, directorMood),
      }
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, topN)
}
```

- [ ] **Step 2: Verify the file exists**

Run: `ls lib/music/scorer.js`
Expected: file listed with no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/music/scorer.js
git commit -m "feat: add shared music scoring engine to lib/music/scorer.js"
```

---

## Task 2: Upgrade Edit Studio Music Route to Use Real DB

**Files:**
- Modify: `app/api/edit-studio/music/route.js`

- [ ] **Step 1: Replace the entire file**

The existing file has a hardcoded `MUSIC_LIBRARY` array and inline copies of the scorer functions. Replace the whole file with:

```js
import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { rankTracks, buildMusicSummary, buildTimingPlan, TRACK_SELECT } from '../../../../lib/music/scorer.js'

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

// POST /api/edit-studio/music
export async function POST(req) {
  try {
    const body = await req.json()
    const { projectId, platform, goal, selectedCutPlan, directorAnalysis,
            captionSummary, captionSettings, editorCleanup } = body

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: dbTracks, error } = await admin
      .from('music_tracks')
      .select(TRACK_SELECT)
      .eq('is_active', true)
      .order('featured', { ascending: false })

    if (error) throw new Error(error.message)

    const directorMood   = directorAnalysis?.creativeDirection?.musicMood || null
    const directorPacing = directorAnalysis?.creativeDirection?.pacing     || null
    const editDuration   = selectedCutPlan?.totalDuration                  || null

    const recommendedTracks = rankTracks(dbTracks || [], { platform, goal, directorMood, directorPacing, editDuration })
    const topTrack          = recommendedTracks[0]
    const timingPlan        = topTrack ? buildTimingPlan(topTrack, platform, editDuration) : {}
    const musicSummary      = buildMusicSummary(platform, goal, directorMood, directorPacing, editDuration)

    const result = { musicSummary, recommendedTracks, timingPlan }

    if (user && projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({ music_intelligence: result })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', ...result })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify the import path is correct**

The file is at `app/api/edit-studio/music/route.js`. Count up: `music → edit-studio → api → app → root`. That's 4 levels, so `../../../../lib/music/scorer.js` is correct.

- [ ] **Step 3: Commit**

```bash
git add app/api/edit-studio/music/route.js
git commit -m "feat: connect edit-studio music route to real music_tracks DB"
```

---

## Task 3: Remove MOCK_MUSIC from Edit Studio Page

**Files:**
- Modify: `app/edit-studio/page.js`

The page currently has a `MOCK_MUSIC` constant at ~line 101 and initializes `musicRecs` state with it at ~line 234. The `handleRecommendMusic` function passes `availableTracks: musicRecs` but the route now ignores that (it queries the DB directly). We still want `musicRecs` populated so the UI can show the library before the user runs "Recommend Music".

- [ ] **Step 1: Remove the `MOCK_MUSIC` constant**

Find and delete these lines (around line 101–106):
```js
const MOCK_MUSIC = [
  { id: 'm1', title: 'Drive Forward',   artist: 'Studio Collective', mood: 'Motivational', bpm: 128, duration: 180, licensed: true  },
  { id: 'm2', title: 'Quiet Momentum',  artist: 'Ambient Works',     mood: 'Focused',      bpm: 95,  duration: 210, licensed: true  },
  { id: 'm3', title: 'Executive Pulse', artist: 'Signal Audio',      mood: 'Professional', bpm: 112, duration: 165, licensed: true  },
  { id: 'm4', title: 'Clean Energy',    artist: 'Upbeat Labs',       mood: 'Energetic',    bpm: 140, duration: 195, licensed: false },
]
```

- [ ] **Step 2: Change the `musicRecs` state initialization**

Find (around line 234):
```js
const [musicRecs,        setMusicRecs]         = useState(MOCK_MUSIC)
```

Replace with:
```js
const [musicRecs,        setMusicRecs]         = useState([])
```

- [ ] **Step 3: Add a `useEffect` to load real tracks on mount**

Find the block of `useEffect` calls near the top of `EditStudioPage`. Add this new effect after the existing ones (it should be independent of all the project-loading effects):

```js
// Load real music library from DB
useEffect(() => {
  fetch('/api/music-tracks')
    .then(r => r.json())
    .then(data => {
      if (data.status === 'success' && Array.isArray(data.tracks)) {
        setMusicRecs(data.tracks.map(t => ({
          id:          t.id,
          title:       t.title,
          artist:      t.artist_name || t.artist || '',
          mood:        t.mood         || 'Professional',
          bpm:         t.bpm          || 100,
          duration:    t.duration_seconds || 180,
          energy:      (t.energy || 'medium').toLowerCase(),
          licenseType: t.is_premium ? 'premium' : ((t.license_credits || 0) > 0 ? 'credit' : 'included'),
          preview_file_url: t.preview_file_url,
        })))
      }
    })
    .catch(() => {}) // non-fatal — page works without pre-loaded library
}, [])
```

- [ ] **Step 4: Remove `availableTracks` from `handleRecommendMusic` body**

The API no longer uses `availableTracks` (it queries the DB itself). Find `handleRecommendMusic` and remove the `availableTracks: musicRecs,` line from the JSON body. The updated body should be:

```js
body: JSON.stringify({
  projectId,
  platform:        project.platform,
  goal:            project.goal,
  selectedCutPlan: selectedPlan || null,
  directorAnalysis: aiDirectorAnalysis,
  captionSummary,
  captionSettings,
  editorCleanup,
}),
```

Also remove `musicRecs` from the `useCallback` dependency array for `handleRecommendMusic`.

- [ ] **Step 5: Manual verification**

Open `/edit-studio`. Select a platform and goal. Click "Recommend Music". Confirm:
- The music step shows real track titles (not "Drive Forward", "Quiet Momentum", etc.)
- No console errors about `MOCK_MUSIC` or undefined

- [ ] **Step 6: Commit**

```bash
git add app/edit-studio/page.js
git commit -m "feat: load real music_tracks in Edit Studio, remove MOCK_MUSIC"
```

---

## Task 4: Create /api/music-studio/recommend

**Files:**
- Create: `app/api/music-studio/recommend/route.js`

- [ ] **Step 1: Create the file**

```js
import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { rankTracks, buildMusicSummary, buildTimingPlan, TRACK_SELECT } from '../../../../lib/music/scorer.js'

// POST /api/music-studio/recommend
// Shared recommendation endpoint for Music Studio UI and future Ad Studio calls.
export async function POST(req) {
  try {
    const body = await req.json()
    const { platform, goal, directorAnalysis, videoLength, mood, energy } = body

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    let query = admin
      .from('music_tracks')
      .select(TRACK_SELECT)
      .eq('is_active', true)
      .order('featured', { ascending: false })

    if (mood)   query = query.ilike('mood', `%${mood}%`)
    if (energy) query = query.eq('energy', energy)

    const { data: dbTracks, error } = await query
    if (error) throw new Error(error.message)

    const directorMood   = directorAnalysis?.creativeDirection?.musicMood || null
    const directorPacing = directorAnalysis?.creativeDirection?.pacing     || null

    const recommendedTracks = rankTracks(dbTracks || [], {
      platform, goal, directorMood, directorPacing, editDuration: videoLength || null,
    })
    const topTrack     = recommendedTracks[0]
    const timingPlan   = topTrack ? buildTimingPlan(topTrack, platform, videoLength || null) : {}
    const musicSummary = buildMusicSummary(platform, goal, directorMood, directorPacing, videoLength || null)

    return NextResponse.json({ status: 'success', recommendedTracks, musicSummary, timingPlan })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Manual verification**

In the browser console or via curl:
```bash
curl -X POST http://localhost:3000/api/music-studio/recommend \
  -H "Content-Type: application/json" \
  -d '{"platform":"linkedin","goal":"founder"}'
```
Expected: `{ "status": "success", "recommendedTracks": [...], "musicSummary": {...}, "timingPlan": {...} }`

- [ ] **Step 3: Commit**

```bash
git add app/api/music-studio/recommend/route.js
git commit -m "feat: add /api/music-studio/recommend shared recommendation endpoint"
```

---

## Task 5: Create music_usage_logs Table

**Files:**
- Create: `supabase/migrations/20260602_music_usage_logs.sql`
- Modify: `app/api/license-music/route.js`

- [ ] **Step 1: Create the migration file**

```sql
-- supabase/migrations/20260602_music_usage_logs.sql

create table if not exists public.music_usage_logs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  track_id     uuid references public.music_tracks(id) on delete set null,
  project_id   text,
  project_type text,
  action       text not null,
  created_at   timestamptz not null default now()
);

create index if not exists music_usage_logs_user_id_idx on public.music_usage_logs (user_id);
create index if not exists music_usage_logs_track_id_idx on public.music_usage_logs (track_id);

alter table public.music_usage_logs enable row level security;

-- Users can read their own logs
create policy "users_read_own_usage_logs"
  on public.music_usage_logs for select
  using (auth.uid() = user_id);

-- Service role can insert/read all (used by API routes with SUPABASE_SERVICE_ROLE_KEY)
create policy "service_role_all_usage_logs"
  on public.music_usage_logs
  using (true)
  with check (true);
```

- [ ] **Step 2: Run the migration in Supabase**

Go to Supabase Dashboard → SQL Editor → paste the contents of the migration file → Run.

Verify: the `music_usage_logs` table appears in Table Editor with columns: `id`, `user_id`, `track_id`, `project_id`, `project_type`, `action`, `created_at`.

- [ ] **Step 3: Add usage logging to `/api/license-music/route.js`**

Find the section after the successful license insert (the `return NextResponse.json({ status: 'success', licenseId: license.id, track: {...} })` block). Insert a usage log just before the return:

```js
// Log usage (non-fatal)
try {
  await admin.from('music_usage_logs').insert({
    user_id:      user.id,
    track_id:     track.id,
    project_type: 'ad_studio',
    action:       'licensed',
  })
} catch { /* non-fatal */ }
```

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260602_music_usage_logs.sql app/api/license-music/route.js
git commit -m "feat: add music_usage_logs table + log on track license"
```

---

## Task 6: Create Log-Usage Route + Wire Edit Studio

**Files:**
- Create: `app/api/music-studio/log-usage/route.js`
- Modify: `app/edit-studio/page.js` (`handleSelectMusicBed`)

- [ ] **Step 1: Create `app/api/music-studio/log-usage/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// POST /api/music-studio/log-usage
// Logs a music track action (selected, previewed) for the current user.
export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { trackId, projectId, projectType, action } = await req.json()
    if (!trackId || !action) {
      return NextResponse.json({ status: 'error', message: 'trackId and action required' }, { status: 400 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    await admin.from('music_usage_logs').insert({
      user_id:      user.id,
      track_id:     trackId,
      project_id:   projectId   || null,
      project_type: projectType || null,
      action,
    })

    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Call log-usage from `handleSelectMusicBed` in `app/edit-studio/page.js`**

Find `handleSelectMusicBed` (around line 695). After `setSelectedMusic(track)` add:

```js
// Log track selection (non-fatal, fire-and-forget)
if (projectId) {
  fetch('/api/music-studio/log-usage', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ trackId: track.id, projectId, projectType: 'edit_studio', action: 'selected' }),
  }).catch(() => {})
}
```

Note: `projectId` is in scope here since it's a state variable accessible in the component closure.

- [ ] **Step 3: Commit**

```bash
git add app/api/music-studio/log-usage/route.js app/edit-studio/page.js
git commit -m "feat: add music usage log route + log track selection in Edit Studio"
```

---

## Task 7: Create Usage and Licenses API Routes

**Files:**
- Create: `app/api/music-studio/usage/route.js`
- Create: `app/api/music-studio/licenses/route.js`

- [ ] **Step 1: Create `app/api/music-studio/usage/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// GET /api/music-studio/usage
// Returns the current user's music_usage_logs, newest first, with track info joined.
export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: logs, error } = await admin
      .from('music_usage_logs')
      .select('id, track_id, project_id, project_type, action, created_at, music_tracks(title, artist_name, mood, bpm)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw new Error(error.message)

    return NextResponse.json({ status: 'success', logs: logs || [] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Create `app/api/music-studio/licenses/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// GET /api/music-studio/licenses
// Returns the current user's music_licenses, newest first, with track info joined.
export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: licenses, error } = await admin
      .from('music_licenses')
      .select('id, track_id, project_type, usage_type, credits_charged, created_at, music_tracks(title, artist_name, mood, bpm, duration_seconds)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw new Error(error.message)

    return NextResponse.json({ status: 'success', licenses: licenses || [] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/music-studio/usage/route.js app/api/music-studio/licenses/route.js
git commit -m "feat: add music-studio usage and licenses API routes"
```

---

## Task 8: Build /app/music-studio/page.js

**Files:**
- Create: `app/music-studio/page.js`

- [ ] **Step 1: Create `app/music-studio/page.js`**

```js
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:       '#040404', deep:      '#070707', base:       '#0a0a0a',
  raised:     '#0d0d0d', surface:   '#111111', overlay:    '#151515',
  hairline:   '#1a1a1a', subtle:    '#222222', mid:        '#2a2a2a',
  primary:    '#e8e4dc', secondary: '#ccc8c2', muted:      '#9e9a96',
  ghost:      '#6e6a66',
  gold:       '#c8a84b', goldDim:   '#7a6428', goldGlow:   '#c8a84b22',
  blue:       '#4a8ab4', blueDim:   '#2a4a6a', blueGlow:   '#4a8ab422',
  green:      '#4a9a6a', greenDim:  '#1a3a2a', greenGlow:  '#4a9a6a22',
  violet:     '#9b6fd4', violetDim: '#4a2a7a', violetGlow: '#9b6fd422',
}

const TABS = [
  { id: 'library',         label: '♫ Library'         },
  { id: 'recommendations', label: '★ Recommendations'  },
  { id: 'usage',           label: '◷ Usage'            },
  { id: 'licensing',       label: '✓ Licensing'        },
  { id: 'collections',     label: '▤ Collections'      },
]

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok'         },
  { id: 'instagram', label: 'Instagram'       },
  { id: 'youtube',   label: 'YouTube'         },
  { id: 'linkedin',  label: 'LinkedIn'        },
  { id: 'meta',      label: 'Meta Ads'        },
]

const GOALS = [
  { id: 'founder',  label: 'Founder Update'  },
  { id: 'demo',     label: 'Product Demo'    },
  { id: 'tutorial', label: 'Tutorial'        },
  { id: 'launch',   label: 'Launch Ad'       },
  { id: 'ugc',      label: 'UGC Ad'          },
  { id: 'edu',      label: 'Educational'     },
]

// Collections: named filter presets — no DB table needed
const COLLECTIONS = [
  { id: 'founder_launch', label: 'Founder Launch',   desc: 'Confident · Professional · Motivational', emoji: '👤', filter: { mood: 'Confident'    } },
  { id: 'product_demo',   label: 'Product Demo',     desc: 'Professional · Cinematic',                emoji: '🖥', filter: { mood: 'Professional' } },
  { id: 'luxury_brand',   label: 'Luxury Brand',     desc: 'Luxury score ≥ 7',                        emoji: '✦', filter: { mood: 'Cinematic'    } },
  { id: 'ugc_ads',        label: 'UGC Ads',          desc: 'High energy · Fast BPM',                  emoji: '🎥', filter: { energy: 'high'       } },
  { id: 'fitness',        label: 'Fitness Content',  desc: 'Medium-high energy · 125+ BPM',           emoji: '💪', filter: { energy: 'medium-high'} },
  { id: 'educational',    label: 'Educational',      desc: 'Focused · Low energy',                    emoji: '🎓', filter: { mood: 'Focused'      } },
  { id: 'viral',          label: 'Viral Short Form', desc: '128+ BPM · High energy',                  emoji: '⚡', filter: { energy: 'high'       } },
  { id: 'linkedin',       label: 'LinkedIn',         desc: 'Professional · Low energy',               emoji: '💼', filter: { energy: 'low'        } },
  { id: 'tiktok',         label: 'TikTok',           desc: '120+ BPM · High energy',                  emoji: '🎵', filter: { energy: 'high'       } },
]

const LICENSE_COLORS = { included: C.green, credit: C.gold, premium: C.violet }
const LICENSE_LABELS = { included: 'INCLUDED', credit: 'CREDIT', premium: 'PREMIUM' }

function fmtDur(s) { if (!s) return '—'; const m = Math.floor(s / 60); const r = Math.floor(s % 60); return m > 0 ? `${m}m ${r}s` : `${r}s` }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }

function Chip({ label, color }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
      padding: '2px 6px', borderRadius: 4,
      border: `1px solid ${color}44`, background: color + '18', color,
    }}>{label}</span>
  )
}

function TrackCard({ track, onLicense, playing, onPlay }) {
  const lColor = LICENSE_COLORS[track.licenseType] || C.muted
  const lLabel = LICENSE_LABELS[track.licenseType] || (track.licenseType || '').toUpperCase()
  const isPlaying = playing === track.id

  return (
    <div style={{
      padding: '14px 16px', borderRadius: 10,
      border:     `1px solid ${C.hairline}`,
      background: C.surface,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Play button */}
        <button
          onClick={() => onPlay(track)}
          title={isPlaying ? 'Pause' : 'Play preview'}
          style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
            border: `1px solid ${isPlaying ? C.gold : C.hairline}`,
            background: isPlaying ? C.goldGlow : C.subtle,
            color: isPlaying ? C.gold : C.secondary,
            cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {isPlaying ? '■' : '▶'}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{track.title}</span>
            <Chip label={lLabel} color={lColor} />
            {track.is_premium && <Chip label="PREMIUM" color={C.violet} />}
            {track.featured && <Chip label="FEATURED" color={C.gold} />}
          </div>
          {/* Meta */}
          <div style={{ fontSize: 11, color: C.muted }}>
            {track.artist ? `${track.artist} · ` : ''}{track.mood} · {track.bpm} BPM · {fmtDur(track.duration_seconds)}
            {track.energy ? ` · ${track.energy} energy` : ''}
          </div>
          {/* Fit score bar (only when scored) */}
          {track.fitScore != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <div style={{ flex: 1, height: 3, background: C.hairline, borderRadius: 2 }}>
                <div style={{ width: `${track.fitScore}%`, height: '100%', borderRadius: 2, background: track.fitScore >= 80 ? C.green : track.fitScore >= 60 ? C.gold : C.muted }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: track.fitScore >= 80 ? C.green : track.fitScore >= 60 ? C.gold : C.muted, minWidth: 26 }}>{track.fitScore}</span>
            </div>
          )}
          {/* Reason (from recommendations) */}
          {track.reason && (
            <div style={{ fontSize: 11, color: C.secondary, fontStyle: 'italic', marginTop: 4 }}>"{track.reason}"</div>
          )}
        </div>

        {/* License button */}
        <button
          onClick={() => onLicense(track)}
          style={{
            padding: '7px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700,
            cursor: 'pointer', flexShrink: 0,
            border: `1px solid ${C.gold}`,
            background: C.goldGlow,
            color: C.gold,
          }}>
          License
        </button>
      </div>
    </div>
  )
}

export default function MusicStudioPage() {
  const router      = useRouter()
  const audioRef    = useRef(null)

  const [user,         setUser]         = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [activeTab,    setActiveTab]    = useState('library')

  // Library tab
  const [tracks,       setTracks]       = useState([])
  const [tracksLoading,setTracksLoading]= useState(false)
  const [filterMood,   setFilterMood]   = useState('')
  const [filterEnergy, setFilterEnergy] = useState('')
  const [filterGenre,  setFilterGenre]  = useState('')
  const [playing,      setPlaying]      = useState(null) // track id

  // Recommendations tab
  const [recPlatform,  setRecPlatform]  = useState('')
  const [recGoal,      setRecGoal]      = useState('')
  const [recResults,   setRecResults]   = useState(null)
  const [recLoading,   setRecLoading]   = useState(false)

  // Usage tab
  const [usageLogs,    setUsageLogs]    = useState(null)
  const [usageLoading, setUsageLoading] = useState(false)

  // Licensing tab
  const [licenses,     setLicenses]     = useState(null)
  const [licLoading,   setLicLoading]   = useState(false)

  // License modal state
  const [licensing,    setLicensing]    = useState(false)
  const [licenseError, setLicenseError] = useState(null)

  // Auth check
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (!u) { router.push('/prompt-engine-v3/login'); return }
      setUser(u)
      setLoading(false)
    })
  }, [router])

  // Load tracks when Library or Collections tab is active
  useEffect(() => {
    if (!user) return
    if (activeTab !== 'library' && activeTab !== 'collections') return
    if (tracks.length > 0) return // already loaded
    setTracksLoading(true)
    const params = new URLSearchParams()
    if (filterMood)   params.set('mood', filterMood)
    if (filterEnergy) params.set('energy', filterEnergy)
    if (filterGenre)  params.set('genre', filterGenre)
    fetch(`/api/music-tracks?${params}`)
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setTracks(d.tracks || []) })
      .catch(() => {})
      .finally(() => setTracksLoading(false))
  }, [user, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch when filters change
  useEffect(() => {
    if (!user || (activeTab !== 'library' && activeTab !== 'collections')) return
    setTracksLoading(true)
    const params = new URLSearchParams()
    if (filterMood)   params.set('mood', filterMood)
    if (filterEnergy) params.set('energy', filterEnergy)
    if (filterGenre)  params.set('genre', filterGenre)
    fetch(`/api/music-tracks?${params}`)
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setTracks(d.tracks || []) })
      .catch(() => {})
      .finally(() => setTracksLoading(false))
  }, [filterMood, filterEnergy, filterGenre]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load usage logs
  useEffect(() => {
    if (!user || activeTab !== 'usage' || usageLogs !== null) return
    setUsageLoading(true)
    fetch('/api/music-studio/usage')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setUsageLogs(d.logs) })
      .catch(() => setUsageLogs([]))
      .finally(() => setUsageLoading(false))
  }, [user, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load licenses
  useEffect(() => {
    if (!user || activeTab !== 'licensing' || licenses !== null) return
    setLicLoading(true)
    fetch('/api/music-studio/licenses')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setLicenses(d.licenses) })
      .catch(() => setLicenses([]))
      .finally(() => setLicLoading(false))
  }, [user, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  // Audio playback via stream-track (signed URL redirect)
  const handlePlay = (track) => {
    if (!track.preview_file_url) return
    if (playing === track.id) {
      audioRef.current?.pause()
      setPlaying(null)
      return
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = track.preview_file_url
      audioRef.current.play().catch(() => {})
    }
    setPlaying(track.id)
  }

  const handleLicense = async (track) => {
    setLicensing(true)
    setLicenseError(null)
    try {
      const res  = await fetch('/api/license-music', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ trackId: track.id }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      // Refresh licenses list if it was loaded
      setLicenses(null)
    } catch (err) {
      setLicenseError(err.message)
    } finally {
      setLicensing(false)
    }
  }

  const handleRecommend = async () => {
    if (!recPlatform || !recGoal) return
    setRecLoading(true)
    setRecResults(null)
    try {
      const res  = await fetch('/api/music-studio/recommend', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ platform: recPlatform, goal: recGoal }),
      })
      const data = await res.json()
      if (data.status === 'success') setRecResults(data)
    } catch { /* ignore */ } finally {
      setRecLoading(false)
    }
  }

  const handleCollectionClick = (col) => {
    if (col.filter.mood)   setFilterMood(col.filter.mood)
    if (col.filter.energy) setFilterEnergy(col.filter.energy)
    setTracks([]) // reset so re-fetch fires
    setActiveTab('library')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: 13 }}>
      Loading…
    </div>
  )

  // ── Shared components ───────────────────────────────────────────────────────

  const FilterBar = () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
      {[
        { label: 'Mood', value: filterMood, set: setFilterMood, options: ['Motivational','Focused','Professional','Energetic','Confident','Trendy','Cinematic'] },
        { label: 'Energy', value: filterEnergy, set: setFilterEnergy, options: ['low','medium','medium-high','high'] },
      ].map(f => (
        <select
          key={f.label}
          value={f.value}
          onChange={e => { f.set(e.target.value); setTracks([]) }}
          style={{
            padding: '6px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600,
            border: `1px solid ${f.value ? C.gold : C.hairline}`,
            background: f.value ? C.goldGlow : C.surface,
            color: f.value ? C.gold : C.secondary,
            cursor: 'pointer', outline: 'none',
          }}>
          <option value="">All {f.label}s</option>
          {f.options.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
        </select>
      ))}
      {(filterMood || filterEnergy) && (
        <button
          onClick={() => { setFilterMood(''); setFilterEnergy(''); setTracks([]) }}
          style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, border: `1px solid ${C.hairline}`, background: 'none', color: C.muted, cursor: 'pointer' }}>
          Clear
        </button>
      )}
    </div>
  )

  // ── Tab content ─────────────────────────────────────────────────────────────

  const renderLibrary = () => (
    <div>
      <FilterBar />
      {tracksLoading && <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>Loading tracks…</div>}
      {!tracksLoading && tracks.length === 0 && (
        <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>No tracks found.</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tracks.map(t => (
          <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} />
        ))}
      </div>
    </div>
  )

  const renderRecommendations = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ padding: '16px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.secondary, marginBottom: 12 }}>What are you creating?</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setRecPlatform(p.id)}
              style={{
                padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border:     `1px solid ${recPlatform === p.id ? C.gold : C.hairline}`,
                background: recPlatform === p.id ? C.goldGlow : 'none',
                color:      recPlatform === p.id ? C.gold     : C.secondary,
              }}>
              {p.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {GOALS.map(g => (
            <button
              key={g.id}
              onClick={() => setRecGoal(g.id)}
              style={{
                padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border:     `1px solid ${recGoal === g.id ? C.blue : C.hairline}`,
                background: recGoal === g.id ? C.blueGlow : 'none',
                color:      recGoal === g.id ? C.blue     : C.secondary,
              }}>
              {g.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleRecommend}
          disabled={!recPlatform || !recGoal || recLoading}
          style={{
            padding: '9px 20px', borderRadius: 8, fontSize: 12, fontWeight: 700,
            cursor: (!recPlatform || !recGoal || recLoading) ? 'not-allowed' : 'pointer',
            border:     `1px solid ${(!recPlatform || !recGoal) ? C.hairline : C.gold}`,
            background: (!recPlatform || !recGoal) ? C.surface : C.goldGlow,
            color:      (!recPlatform || !recGoal) ? C.ghost   : C.gold,
          }}>
          {recLoading ? 'Finding tracks…' : '★ Get Recommendations'}
        </button>
      </div>

      {recResults && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recResults.musicSummary && (
            <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.gold}22`, background: C.gold + '08' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                <div><div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Mood</div><div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{recResults.musicSummary.recommendedMood}</div></div>
                <div><div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Pacing</div><div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{recResults.musicSummary.pacing}</div></div>
                <div><div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Confidence</div><div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{Math.round(recResults.musicSummary.confidence * 100)}%</div></div>
              </div>
              <div style={{ fontSize: 11, color: C.muted }}>{recResults.musicSummary.reason}</div>
            </div>
          )}
          <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase' }}>Top Tracks</div>
          {(recResults.recommendedTracks || []).map(t => (
            <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} />
          ))}
        </div>
      )}
    </div>
  )

  const renderUsage = () => (
    <div>
      {usageLoading && <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>Loading…</div>}
      {usageLogs !== null && usageLogs.length === 0 && (
        <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>No usage history yet. Select or license tracks to see activity here.</div>
      )}
      {(usageLogs || []).map(log => {
        const t = log.music_tracks
        return (
          <div key={log.id} style={{ padding: '12px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{t?.title || 'Unknown track'}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                {t?.mood} · {t?.bpm} BPM
                {log.project_type ? ` · ${log.project_type.replace('_', ' ')}` : ''}
                {log.project_id ? ` · Project ${log.project_id.slice(0, 8)}` : ''}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Chip label={log.action} color={log.action === 'licensed' ? C.gold : C.blue} />
              <div style={{ fontSize: 10, color: C.ghost, marginTop: 4 }}>{fmtDate(log.created_at)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderLicensing = () => (
    <div>
      {licLoading && <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>Loading…</div>}
      {licenses !== null && licenses.length === 0 && (
        <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>No licenses yet. License a track from the Library to use it in your projects.</div>
      )}
      {(licenses || []).map(lic => {
        const t = lic.music_tracks
        return (
          <div key={lic.id} style={{ padding: '12px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{t?.title || 'Unknown track'}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                {t?.mood} · {t?.bpm} BPM · {fmtDur(t?.duration_seconds)}
                {lic.project_type ? ` · ${lic.project_type.replace('_', ' ')}` : ''}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Chip label="LICENSED" color={C.green} />
              <div style={{ fontSize: 10, color: C.ghost, marginTop: 4 }}>{fmtDate(lic.created_at)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderCollections = () => (
    <div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
        Curated track groupings by use case. Click a collection to browse those tracks in the Library.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {COLLECTIONS.map(col => (
          <button
            key={col.id}
            onClick={() => handleCollectionClick(col)}
            style={{
              padding: '16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
              border: `1px solid ${C.hairline}`, background: C.surface,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.goldGlow }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.hairline; e.currentTarget.style.background = C.surface }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{col.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{col.label}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{col.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )

  const TAB_RENDERERS = {
    library:         renderLibrary,
    recommendations: renderRecommendations,
    usage:           renderUsage,
    licensing:       renderLicensing,
    collections:     renderCollections,
  }

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>
      {/* Hidden audio element for previews */}
      <audio ref={audioRef} onEnded={() => setPlaying(null)} style={{ display: 'none' }} />

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16, height: 52 }}>
        <a href="/prompt-engine-v3" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none' }}>← Studio</a>
        <div style={{ width: 1, height: 16, background: C.hairline }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>♫ Music Studio™</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: C.ghost }}>PromptCEO Soundtrack Intelligence</div>
      </div>

      {/* License error banner */}
      {licenseError && (
        <div style={{ padding: '10px 24px', background: '#4a1a1a', borderBottom: `1px solid #6a2a2a`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#e88' }}>{licenseError}</span>
          <button onClick={() => setLicenseError(null)} style={{ background: 'none', border: 'none', color: '#e88', cursor: 'pointer', fontSize: 14 }}>×</button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 24px', display: 'flex', gap: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 16px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', background: 'none', border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? C.gold : 'transparent'}`,
              color: activeTab === tab.id ? C.gold : C.ghost,
              transition: 'all 0.15s',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
        {TAB_RENDERERS[activeTab]?.()}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Manual verification**

Navigate to `/music-studio`. Confirm:
- Page loads without errors
- Library tab shows real tracks from DB
- Filter by Mood changes the track list
- Play button triggers audio (if tracks have preview URLs)
- Recommendations tab: select LinkedIn + Founder Update → Get Recommendations → shows ranked tracks
- Collections tab: click "Founder Launch" → Library tab opens with Confident filter active
- Usage tab: shows empty state if no logs yet (or real logs if tracks were selected/licensed)
- Licensing tab: shows empty state or real licenses

- [ ] **Step 3: Commit**

```bash
git add app/music-studio/page.js
git commit -m "feat: add /music-studio page with Library, Recommendations, Usage, Licensing, Collections tabs"
```

---

## Task 9: Add Music Studio Nav Link

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

- [ ] **Step 1: Find the Edit Studio nav link**

In `app/prompt-engine-v3/page.js`, find this block (around line 15785–15788):
```js
<a href="/edit-studio" onClick={() => setNavOpenGroup(null)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', fontSize: 12, fontWeight: 500, textDecoration: 'none', color: C.blue, borderLeft: '2px solid transparent' }}
  onMouseEnter={e => { e.currentTarget.style.background = C.raised; e.currentTarget.style.color = C.blue }}
  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.blue }}
><span style={{ fontSize: 11 }}>✂</span>Edit Studio</a>
```

- [ ] **Step 2: Add Music Studio link directly after it**

Insert this block immediately after the closing `</a>` of the Edit Studio link:
```js
<a href="/music-studio" onClick={() => setNavOpenGroup(null)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', fontSize: 12, fontWeight: 500, textDecoration: 'none', color: C.gold, borderLeft: '2px solid transparent' }}
  onMouseEnter={e => { e.currentTarget.style.background = C.raised; e.currentTarget.style.color = C.gold }}
  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.gold }}
><span style={{ fontSize: 11 }}>♫</span>Music Studio</a>
```

- [ ] **Step 3: Manual verification**

Open the Studio. The nav dropdown should show Edit Studio and Music Studio. Click Music Studio → navigates to `/music-studio`.

- [ ] **Step 4: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: add Music Studio nav link to Studio sidebar"
```

---

## Self-Review

**Spec coverage:**
- Phase 1 (Edit Studio → real DB): Task 2 + Task 3 ✓
- Phase 2 (/api/music-studio/recommend): Task 4 ✓
- Phase 3 (music_usage_logs + logging): Task 5 + Task 6 ✓
- Phase 4 (/app/music-studio with 5 tabs): Task 7 (API) + Task 8 (UI) ✓
- Phase 5 (Collections as code presets): Included in Task 8 ✓
- Nav integration: Task 9 ✓
- Phases 6 & 7 (credits, analytics): Explicitly deferred per spec ✓
- No user upload UI anywhere: confirmed ✓
- Admin routes untouched: confirmed ✓

**Placeholder scan:** No TBDs, no "handle edge cases" phrases, all code blocks are complete.

**Type consistency:**
- `mapDbTrack` returns `{ id, title, artist, mood, bpm, duration, energy, licenseType, ...extras }` — scorer expects exactly this shape ✓
- `rankTracks` calls `scoreTrack`, `buildBestUse`, `buildReason` — all exported from scorer.js ✓
- Edit Studio page maps API tracks to the same shape as `mapDbTrack` output ✓
- `TRACK_SELECT` string used in both edit-studio route and recommend route ✓
- `music_usage_logs` insert shape matches across Task 5 (license route), Task 6 (log-usage route) ✓
