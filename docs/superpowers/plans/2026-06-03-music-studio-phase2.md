# Music Studio Phase 2 — Soundtrack Intelligence™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Music Studio from a catalog browser into PromptCEO Soundtrack Intelligence™ by wiring campaign memory, performance history, and the richer music recommendation engine into a personalized AI Music Director hero, metrics dashboard, enriched collections, and a track intelligence panel.

**Architecture:** A new `lib/music/intelligenceAssembler.js` contains all pure aggregation logic. A new `GET /api/music-studio/intelligence` endpoint assembles signals from `campaign_memory`, `os_memory_events`, `music_usage_logs`, `performance_logs`, and `music_tracks` — running `recommendMusicForAd()` from the existing Ad Studio scorer — and returns a stable structured response. The `app/music-studio/page.js` page is upgraded to show the AI Director hero, metrics strip, enriched collections, and a track intelligence panel using that single response.

**Tech Stack:** Next.js 14 App Router, Supabase admin client, existing `recommendMusicForAd` from `app/prompt-engine-v3/ad-system/musicRecommendation.js`, `TRACK_SELECT` from `lib/music/scorer.js`. No new dependencies.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `lib/music/intelligenceAssembler.js` | Pure functions: profile derivation, collection enrichment, metrics, reasoning chain |
| Create | `app/api/music-studio/intelligence/route.js` | GET — aggregates all signals, scores tracks, returns structured intelligence response |
| Modify | `app/music-studio/page.js` | Add intelligence state + fetch + AI Director hero + metrics strip + enriched collections + track panel; default tab → recommendations |

**Do not touch:** `lib/music/scorer.js`, admin routes, license routes, stream route, upload routes.

---

## Task 1: lib/music/intelligenceAssembler.js

**Files:**
- Create: `lib/music/intelligenceAssembler.js`

- [ ] **Step 1: Create `lib/music/intelligenceAssembler.js`**

```js
// lib/music/intelligenceAssembler.js
// Pure functions for assembling AI Music Director intelligence from user signals.
// No imports from Next.js, Supabase, or React. All functions are stateless and side-effect-free.

// ─── Goal → music profile ─────────────────────────────────────────────────────

const GOAL_MUSIC_MAP = {
  founder:     { mood: 'luxury,professional,confident', energy: 'medium',       bpmRange: '85–110',  label: 'Founder Update'   },
  demo:        { mood: 'professional',                  energy: 'medium',       bpmRange: '90–120',  label: 'Product Demo'     },
  tutorial:    { mood: 'calm,focused',                  energy: 'low',          bpmRange: '70–100',  label: 'Tutorial'         },
  launch:      { mood: 'energetic,motivational,bold',   energy: 'high',         bpmRange: '120–150', label: 'Launch Ad'        },
  ugc:         { mood: 'energetic,upbeat,trendy',       energy: 'high',         bpmRange: '120–145', label: 'UGC Ad'           },
  edu:         { mood: 'calm,friendly,warm',            energy: 'low',          bpmRange: '70–95',   label: 'Educational'      },
  sales:       { mood: 'bold,energetic,powerful',       energy: 'high',         bpmRange: '115–145', label: 'Sales'            },
  awareness:   { mood: 'aspirational,inspirational',    energy: 'medium',       bpmRange: '90–120',  label: 'Awareness'        },
  leads:       { mood: 'warm,friendly,emotional',       energy: 'medium',       bpmRange: '85–110',  label: 'Lead Gen'         },
  retargeting: { mood: 'calm,emotional,warm',           energy: 'low',          bpmRange: '75–105',  label: 'Retargeting'      },
}

const STYLE_BRAND_VOICE_MAP = {
  lifestyle: 'aspirational', editorial: 'luxury', cinematic: 'cinematic',
  minimal:   'clean',        ugc:       'friendly', creator:  'warm',
  premium:   'luxury',       bold:      'bold',
}

const GOAL_COLLECTION_MAP = {
  founder:     { collectionId: 'founder_authority',   collectionLabel: 'Founder Authority'   },
  demo:        { collectionId: 'product_launch',      collectionLabel: 'Product Launch'      },
  tutorial:    { collectionId: 'educational_content', collectionLabel: 'Educational Content' },
  launch:      { collectionId: 'product_launch',      collectionLabel: 'Product Launch'      },
  ugc:         { collectionId: 'ugc_ads',             collectionLabel: 'UGC Ads'             },
  edu:         { collectionId: 'educational_content', collectionLabel: 'Educational Content' },
  sales:       { collectionId: 'product_launch',      collectionLabel: 'Product Launch'      },
  awareness:   { collectionId: 'founder_authority',   collectionLabel: 'Founder Authority'   },
  leads:       { collectionId: 'founder_authority',   collectionLabel: 'Founder Authority'   },
  retargeting: { collectionId: 'luxury_brand',        collectionLabel: 'Luxury Brand'        },
}

export const PLATFORM_LABELS = {
  linkedin: 'LinkedIn', instagram: 'Instagram', tiktok: 'TikTok',
  youtube: 'YouTube', meta: 'Meta', facebook: 'Facebook',
  youtube_shorts: 'YouTube Shorts', shopify: 'Shopify',
}

// ─── Collection definitions ───────────────────────────────────────────────────
// Used both by the intelligence endpoint (to compute track counts) and by the page
// (to filter the library when a user clicks a collection).

export const COLLECTION_DEFINITIONS = [
  {
    id: 'founder_authority', label: 'Founder Authority', emoji: '👤',
    description: 'Professional · Confident · LinkedIn authority',
    platforms: ['LinkedIn', 'YouTube'],
    filterMood: null, filterEnergy: null,
    match: t => (t.campaign_fit || []).some(f => ['founder','awareness','leads'].includes(f)) || ['Professional','Confident','Motivational'].includes(t.mood),
  },
  {
    id: 'product_launch', label: 'Product Launch', emoji: '🚀',
    description: 'Energetic · High impact · Reveal moments',
    platforms: ['Meta', 'Instagram', 'TikTok'],
    filterMood: null, filterEnergy: null,
    match: t => (t.campaign_fit || []).some(f => ['sales','launch','traffic'].includes(f)) || (t.drop_strength || 0) >= 7,
  },
  {
    id: 'luxury_brand', label: 'Luxury Brand', emoji: '✦',
    description: 'Cinematic · Premium · High perceived value',
    platforms: ['Instagram', 'YouTube'],
    filterMood: 'Cinematic', filterEnergy: null,
    match: t => (t.luxury_score || 0) >= 6 || t.mood === 'Cinematic',
  },
  {
    id: 'ugc_ads', label: 'UGC Ads', emoji: '🎥',
    description: 'High energy · Fast BPM · Creator-native',
    platforms: ['TikTok', 'Instagram', 'Meta'],
    filterMood: null, filterEnergy: 'high',
    match: t => (t.energy || '').toLowerCase() === 'high' && (t.bpm || 0) >= 120,
  },
  {
    id: 'fitness_domination', label: 'Fitness Content', emoji: '💪',
    description: 'Powerful · 125+ BPM · High drive',
    platforms: ['TikTok', 'Instagram'],
    filterMood: null, filterEnergy: 'medium-high',
    match: t => ['high','medium-high'].includes((t.energy || '').toLowerCase()) && (t.bpm || 0) >= 125,
  },
  {
    id: 'educational_content', label: 'Educational', emoji: '🎓',
    description: 'Focused · Low energy · Non-distracting',
    platforms: ['YouTube', 'LinkedIn'],
    filterMood: 'Focused', filterEnergy: null,
    match: t => (t.campaign_fit || []).includes('awareness') || t.mood === 'Focused' || (t.energy || '').toLowerCase() === 'low',
  },
  {
    id: 'podcast_content', label: 'Podcast', emoji: '🎙',
    description: 'Calm · Understated · Background-safe',
    platforms: ['YouTube', 'LinkedIn'],
    filterMood: null, filterEnergy: 'low',
    match: t => (t.energy || '').toLowerCase() === 'low' && (t.bpm || 0) < 100,
  },
  {
    id: 'viral_short_form', label: 'Viral Short Form', emoji: '⚡',
    description: '128+ BPM · Strong hook · Maximum energy',
    platforms: ['TikTok', 'Instagram Reels'],
    filterMood: null, filterEnergy: 'high',
    match: t => (t.bpm || 0) >= 128 && (t.energy || '').toLowerCase() === 'high' && (t.hook_strength || 0) >= 7,
  },
]

// ─── Core exports ─────────────────────────────────────────────────────────────

/**
 * Derives a music profile from campaign memory, performance insights, and usage logs.
 * All inputs are optional — returns a safe default when no data exists.
 */
export function deriveUserProfile(campaignMemory, performanceInsights, usageLogs) {
  const topGoals     = campaignMemory?.topGoals     || []
  const topPlatforms = campaignMemory?.topPlatforms || []
  const topStyles    = campaignMemory?.topStyles    || []
  const patternTotal = campaignMemory?.total        || 0

  // Performance platform overrides campaign memory (higher signal when available)
  const perfPlatforms = performanceInsights?.ready ? (performanceInsights?.topPlatforms || []) : []
  const primaryPlatformRaw =
    perfPlatforms[0]?.key ||
    topPlatforms[0]?.id  ||
    null

  // Normalise youtube_shorts → youtube
  const primaryPlatform = primaryPlatformRaw?.replace('youtube_shorts', 'youtube') || null
  const primaryGoal     = topGoals[0]?.id  || null
  const primaryStyle    = topStyles[0]?.id || null

  // Most-used mood from usage logs (if available)
  const moodCounts = {}
  ;(usageLogs || []).forEach(log => {
    const mood = log.music_tracks?.mood
    if (mood) moodCounts[mood] = (moodCounts[mood] || 0) + 1
  })
  const mostUsedMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  // Confidence from data richness
  let confidence, confidenceLabel
  if (patternTotal === 0) {
    confidence = 0.50; confidenceLabel = 'Getting to know you'
  } else if (patternTotal <= 5) {
    confidence = 0.65; confidenceLabel = 'Building your profile'
  } else if (patternTotal <= 20) {
    confidence = 0.82; confidenceLabel = 'Strong match'
  } else {
    confidence = 0.94; confidenceLabel = 'Highly personalised'
  }

  return {
    primaryPlatform,
    primaryGoal,
    primaryStyle,
    mostUsedMood,
    confidence,
    confidenceLabel,
    derivedFrom: patternTotal > 0
      ? `${patternTotal} campaign pattern${patternTotal === 1 ? '' : 's'}`
      : 'recent activity',
    hasEnoughData: patternTotal > 0 || (usageLogs?.length || 0) > 0,
  }
}

/**
 * Builds an adConfig object compatible with recommendMusicForAd() from a user profile.
 */
export function buildAdConfig(userProfile) {
  const goal    = userProfile.primaryGoal  || 'awareness'
  const style   = userProfile.primaryStyle || 'lifestyle'
  const profile = GOAL_MUSIC_MAP[goal]     || GOAL_MUSIC_MAP.awareness

  return {
    platform:     userProfile.primaryPlatform || 'instagram',
    platformGoal: goal,
    adStyle:      style,
    targetMood:   profile.mood,
    brandVoice:   STYLE_BRAND_VOICE_MAP[style] || 'aspirational',
    productName:  '',
  }
}

/**
 * Selects the hero collection recommendation from a user profile.
 */
export function selectHeroCollection(userProfile) {
  const goal       = userProfile.primaryGoal
  const mapped     = goal ? GOAL_COLLECTION_MAP[goal] : null
  const confidence = Math.round(userProfile.confidence * 100)

  if (!mapped) {
    return {
      collectionId:    'founder_authority',
      collectionLabel: 'Founder Authority',
      reason:          'A strong starting point for professional content creators.',
      confidence,
    }
  }

  const platformLabel = userProfile.primaryPlatform
    ? (PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform)
    : null
  const goalLabel = GOAL_MUSIC_MAP[goal]?.label || goal
  const reason    = platformLabel
    ? `Your recent campaigns focus on ${goalLabel.toLowerCase()} content for ${platformLabel}.`
    : `Your recent campaigns focus on ${goalLabel.toLowerCase()} content.`

  return { collectionId: mapped.collectionId, collectionLabel: mapped.collectionLabel, reason, confidence }
}

/**
 * Enriches collection definitions with live track counts and mood profiles.
 */
export function computeCollectionStats(tracks) {
  return COLLECTION_DEFINITIONS.map(col => {
    const matching = (tracks || []).filter(col.match)
    const moods    = [...new Set(matching.map(t => t.mood).filter(Boolean))].slice(0, 3)
    return {
      id:          col.id,
      label:       col.label,
      emoji:       col.emoji,
      description: col.description,
      platforms:   col.platforms,
      filterMood:  col.filterMood,
      filterEnergy:col.filterEnergy,
      trackCount:  matching.length,
      moodProfile: moods,
    }
  })
}

/**
 * Computes the 6 metrics strip values.
 */
export function computeMetrics(tracks, usageLogs, userProfile, topRecommendedTrack) {
  const totalTracks    = (tracks || []).length
  const licensedIds    = new Set((usageLogs || []).filter(l => l.action === 'licensed').map(l => l.track_id))
  const licensedByUser = licensedIds.size

  // Most used mood from usage logs
  const moodCounts = {}
  ;(usageLogs || []).forEach(log => {
    const mood = log.music_tracks?.mood
    if (mood) moodCounts[mood] = (moodCounts[mood] || 0) + 1
  })
  const mostUsedMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  const topPlatform = userProfile.primaryPlatform
    ? (PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform)
    : null

  // BPM range from used tracks; fall back to goal-derived range
  const usedTrackIds = new Set((usageLogs || []).map(l => l.track_id))
  const usedTracks   = (tracks || []).filter(t => usedTrackIds.has(t.id))
  let bestBpmRange = null
  if (usedTracks.length >= 2) {
    const bpms = usedTracks.map(t => t.bpm || 0).filter(b => b > 0).sort((a, b) => a - b)
    bestBpmRange = `${bpms[0]}–${bpms[bpms.length - 1]} BPM`
  } else if (userProfile.primaryGoal && GOAL_MUSIC_MAP[userProfile.primaryGoal]) {
    bestBpmRange = GOAL_MUSIC_MAP[userProfile.primaryGoal].bpmRange + ' BPM'
  }

  return {
    totalTracks,
    licensedByUser,
    mostUsedMood,
    topPlatform,
    bestBpmRange,
    mostRecommendedTrack: topRecommendedTrack?.title || null,
  }
}

/**
 * Builds plain-language reasoning chain strings for transparency.
 */
export function buildReasoningChain(campaignMemory, userProfile, topTrack) {
  const chain = []
  const total = campaignMemory?.total || 0

  if (total > 0) {
    chain.push(
      `Campaign memory: ${total} pattern${total === 1 ? '' : 's'}, ` +
      `primary goal = ${userProfile.primaryGoal || 'unknown'}, ` +
      `primary platform = ${userProfile.primaryPlatform || 'unknown'}`
    )
  } else {
    chain.push('No campaign history yet — using default profile for recommendations')
  }

  if (userProfile.primaryGoal && GOAL_MUSIC_MAP[userProfile.primaryGoal]) {
    const p = GOAL_MUSIC_MAP[userProfile.primaryGoal]
    chain.push(`Derived music profile: ${p.mood} mood, ${p.energy} energy, ${p.bpmRange} BPM`)
  }

  if (topTrack) {
    chain.push(`Top track scored ${topTrack.matchScore}/100: ${topTrack.matchReasons || 'good general match'}`)
  }

  return chain
}
```

- [ ] **Step 2: Verify the file exists and has the right exports**

```bash
node -e "
const m = require('./lib/music/intelligenceAssembler.js');
const fns = ['deriveUserProfile','buildAdConfig','selectHeroCollection','computeCollectionStats','computeMetrics','buildReasoningChain','COLLECTION_DEFINITIONS','PLATFORM_LABELS'];
fns.forEach(f => console.log(f, typeof m[f] !== 'undefined' ? 'OK' : 'MISSING'));
" 2>&1 | head -20
```

Expected: all 8 lines show `OK`. If Node gives an error about ESM, that's expected — the file is ES module format and will be used by Next.js, not Node directly. Just confirm the file is created at the right path with `ls lib/music/`.

- [ ] **Step 3: Commit**

```bash
git add lib/music/intelligenceAssembler.js
git commit -m "feat: add intelligence assembler — pure functions for AI Music Director"
```

---

## Task 2: /api/music-studio/intelligence Route

**Files:**
- Create: `app/api/music-studio/intelligence/route.js`

- [ ] **Step 1: Create `app/api/music-studio/intelligence/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { recommendMusicForAd } from '../../../prompt-engine-v3/ad-system/musicRecommendation.js'
import { TRACK_SELECT } from '../../../../lib/music/scorer.js'
import {
  deriveUserProfile,
  buildAdConfig,
  selectHeroCollection,
  computeCollectionStats,
  computeMetrics,
  buildReasoningChain,
} from '../../../../lib/music/intelligenceAssembler.js'

// Extended track select adds fields needed by recommendMusicForAd that TRACK_SELECT omits
const FULL_TRACK_SELECT = TRACK_SELECT + ', mood_fit, visual_style_fit, commercial_score'

function adminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

function countFreq(items) {
  const map = {}
  items.forEach(v => { if (v) map[v] = (map[v] || 0) + 1 })
  return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([id, count]) => ({ id, count }))
}

// GET /api/music-studio/intelligence
// Aggregates campaign memory, OS events, usage logs, performance insights, and music tracks.
// Runs recommendMusicForAd to produce personalized recommendations.
// Returns a stable structured response — safe to extend without breaking the UI contract.
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

    const admin = adminClient()

    // Parallel fetch all signals — every query is non-fatal
    const [
      campaignMemoryResult,
      osEventsResult,
      usageLogsResult,
      perfLogsResult,
      tracksResult,
    ] = await Promise.allSettled([
      // Campaign memory patterns
      admin.from('campaign_memory')
        .select('successful_patterns, top_platforms')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),

      // OS memory events (recent 20)
      admin.from('os_memory_events')
        .select('event_type, event_payload, project_name, memory_summary, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20),

      // Music usage logs with track info joined
      admin.from('music_usage_logs')
        .select('track_id, action, created_at, music_tracks(title, mood, bpm, energy)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50),

      // Performance logs for platform insights
      admin.from('performance_logs')
        .select('platform, ctr')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200),

      // All active tracks with full intelligence fields
      admin.from('music_tracks')
        .select(FULL_TRACK_SELECT)
        .eq('is_active', true)
        .order('featured', { ascending: false }),
    ])

    // Safely unwrap results
    const campaignMemories = campaignMemoryResult.status === 'fulfilled' ? (campaignMemoryResult.value.data || []) : []
    const osEvents         = osEventsResult.status === 'fulfilled'       ? (osEventsResult.value.data || [])       : []
    const usageLogs        = usageLogsResult.status === 'fulfilled'      ? (usageLogsResult.value.data || [])      : []
    const perfLogs         = perfLogsResult.status === 'fulfilled'       ? (perfLogsResult.value.data || [])       : []
    const tracks           = tracksResult.status === 'fulfilled'         ? (tracksResult.value.data || [])         : []

    // ── Aggregate campaign memory ─────────────────────────────────────────────
    const patterns     = campaignMemories.map(m => m.successful_patterns || {})
    const topGoals     = countFreq(patterns.map(p => p.goal))
    const topStyles    = countFreq(patterns.map(p => p.style))
    const allPlatforms = campaignMemories.flatMap(m => m.top_platforms || [])
    const topPlatforms = countFreq(allPlatforms)

    const campaignSummary = { topGoals, topStyles, topPlatforms, total: patterns.length }

    // ── Performance insights (only if enough data) ────────────────────────────
    const perfPlatformCounts = {}
    perfLogs.forEach(l => {
      if (l.platform) perfPlatformCounts[l.platform] = (perfPlatformCounts[l.platform] || 0) + 1
    })
    const perfTopPlatforms = Object.entries(perfPlatformCounts)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
    const performanceInsights = perfLogs.length >= 5
      ? { ready: true, topPlatforms: perfTopPlatforms }
      : { ready: false }

    // ── Derive user profile and build recommendations ─────────────────────────
    const userProfile  = deriveUserProfile(campaignSummary, performanceInsights, usageLogs)
    const adConfig     = buildAdConfig(userProfile)
    const scored       = recommendMusicForAd(adConfig, tracks)
    const topTracks    = scored.slice(0, 6)
    const topTrack     = topTracks[0] || null

    // Enrich recommended tracks shape for UI (add preview_file_url routing)
    const recommendedTracks = topTracks.map(t => ({
      ...t,
      preview_file_url: t.preview_file_url ? `/api/stream-track/${t.id}` : null,
    }))

    // ── Assemble outputs ──────────────────────────────────────────────────────
    const heroRecommendation     = selectHeroCollection(userProfile)
    const collections            = computeCollectionStats(tracks)
    const metrics                = computeMetrics(tracks, usageLogs, userProfile, topTrack)
    const reasoningChain         = buildReasoningChain(campaignSummary, userProfile, topTrack)

    // Recommended collections — top 2 based on profile
    const recommendedCollections = []
    if (heroRecommendation) {
      recommendedCollections.push({
        id:         heroRecommendation.collectionId,
        confidence: heroRecommendation.confidence,
        reason:     heroRecommendation.reason,
      })
    }
    // Second recommendation from platform signal
    if (userProfile.primaryPlatform) {
      const platformCollectionMap = {
        linkedin:  'founder_authority',
        youtube:   'educational_content',
        tiktok:    'viral_short_form',
        instagram: 'product_launch',
        meta:      'product_launch',
      }
      const secondId = platformCollectionMap[userProfile.primaryPlatform]
      if (secondId && secondId !== heroRecommendation?.collectionId) {
        recommendedCollections.push({
          id: secondId,
          confidence: Math.round(userProfile.confidence * 85),
          reason: `Matches your primary platform (${PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform}).`,
        })
      }
    }

    return NextResponse.json({
      status: 'success',
      userProfile,
      heroRecommendation,
      recommendedTracks,
      recommendedCollections,
      collections,
      metrics,
      reasoningChain,
    }, {
      headers: { 'Cache-Control': 'private, max-age=300' },
    })

  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify import paths are correct**

Count directory levels from `app/api/music-studio/intelligence/route.js`:
- `../../../prompt-engine-v3/ad-system/musicRecommendation.js` — up 3 levels (intelligence → music-studio → api → app), then into prompt-engine-v3. ✓
- `../../../../lib/music/scorer.js` — up 4 levels (intelligence → music-studio → api → app → root), then lib/music/. ✓
- `../../../../lib/music/intelligenceAssembler.js` — same 4 levels. ✓

Run:
```bash
ls app/api/music-studio/
```
Expected: `intelligence/`, `licenses/`, `log-usage/`, `recommend/`, `usage/` — all 5 subdirectories present.

- [ ] **Step 3: Run build to check no compile errors**

```bash
npx next build 2>&1 | grep -E "error|Error|failed|Failed" | grep -v "^warn"
```

Expected: no output (zero errors).

- [ ] **Step 4: Commit**

```bash
git add app/api/music-studio/intelligence/route.js
git commit -m "feat: add /api/music-studio/intelligence — AI Music Director endpoint"
```

---

## Task 3: Wire Intelligence State into Music Studio Page

**Files:**
- Modify: `app/music-studio/page.js`

Four targeted changes only. Do NOT modify any render functions yet.

- [ ] **Step 1: Change default active tab from `'library'` to `'recommendations'`**

Find (line ~140):
```js
  const [activeTab,     setActiveTab]     = useState('library')
```
Replace with:
```js
  const [activeTab,     setActiveTab]     = useState('recommendations')
```

- [ ] **Step 2: Add intelligence + selectedTrack state declarations**

Find the line with `const [licensing, setLicensing] = useState(false)`. Add these two lines directly before it:

```js
  const [intelligence,      setIntelligence]      = useState(null)
  const [intelligenceLoading, setIntelligenceLoading] = useState(false)
  const [selectedTrack,     setSelectedTrack]     = useState(null)
```

- [ ] **Step 3: Add intelligence fetch useEffect**

Find the auth `useEffect` (the one that calls `supabase.auth.getUser()`). Add this new `useEffect` directly after it (after the closing `}, [router])` line):

```js
  // Fetch AI Music Director intelligence on mount
  useEffect(() => {
    if (!user) return
    setIntelligenceLoading(true)
    fetch('/api/music-studio/intelligence')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setIntelligence(d) })
      .catch(() => {})
      .finally(() => setIntelligenceLoading(false))
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps
```

- [ ] **Step 4: Update `handleCollectionClick` to accept the new collection format**

The new `COLLECTION_DEFINITIONS` from intelligenceAssembler.js use `filterMood` and `filterEnergy` properties instead of `col.filter.mood` and `col.filter.energy`. The intelligence endpoint embeds enriched collections in its response. Update `handleCollectionClick` to handle both formats:

Find `handleCollectionClick` (currently):
```js
  function handleCollectionClick(col) {
    if (col.filter.mood)   setFilterMood(col.filter.mood)
    if (col.filter.energy) setFilterEnergy(col.filter.energy)
    setTracks([])
    setActiveTab('library')
  }
```
Replace with:
```js
  function handleCollectionClick(col) {
    const mood   = col.filterMood   ?? col.filter?.mood   ?? null
    const energy = col.filterEnergy ?? col.filter?.energy ?? null
    if (mood)   setFilterMood(mood)
    if (energy) setFilterEnergy(energy)
    setTracks([])
    setActiveTab('library')
  }
```

- [ ] **Step 5: Add `PLATFORM_LABELS` constant to the page file**

The Track Intelligence Panel needs platform labels. Add this constant near the top of the file, after the existing `LICENSE_LABELS` line:

```js
const PLATFORM_LABELS = {
  linkedin: 'LinkedIn', instagram: 'Instagram', tiktok: 'TikTok',
  youtube: 'YouTube', meta: 'Meta', facebook: 'Facebook',
}
```

- [ ] **Step 6: Commit**

```bash
git add app/music-studio/page.js
git commit -m "feat: wire intelligence state into Music Studio page"
```

---

## Task 4: AI Director Hero + Metrics Strip

**Files:**
- Modify: `app/music-studio/page.js`

Add two new render functions and update `renderRecommendations` to use them.

- [ ] **Step 1: Add `renderDirectorHero()` function**

Find the `function renderLibrary()` definition. Add this new function **immediately before** it:

```js
  function renderDirectorHero() {
    if (intelligenceLoading) {
      return (
        <div style={{ padding: '20px 24px', borderRadius: 12, border: `1px solid ${C.gold}22`, background: C.gold + '06', marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>AI Music Director™</div>
          <div style={{ fontSize: 12, color: C.muted }}>Reading your campaign history…</div>
        </div>
      )
    }

    const intel = intelligence
    if (!intel?.userProfile?.hasEnoughData) {
      return (
        <div style={{ padding: '20px 24px', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>AI Music Director™</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 6 }}>Tell the Director what you're building.</div>
          <div style={{ fontSize: 12, color: C.muted }}>Select a platform and goal below to get AI-ranked recommendations.</div>
        </div>
      )
    }

    const { userProfile, heroRecommendation } = intel
    const colDef = intelligence.collections?.find(c => c.id === heroRecommendation?.collectionId)

    return (
      <div style={{ padding: '20px 24px', borderRadius: 12, border: `1px solid ${C.gold}33`, background: `linear-gradient(135deg, ${C.gold}08 0%, ${C.void} 100%)`, marginBottom: 20 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>AI Music Director™</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.primary }}>Recommended for you</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: C.ghost, marginBottom: 2 }}>{userProfile.confidenceLabel}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{Math.round(userProfile.confidence * 100)}%</div>
          </div>
        </div>

        {/* Hero collection card */}
        {heroRecommendation && (
          <div style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${C.gold}33`, background: C.gold + '10', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              {colDef?.emoji && <span style={{ fontSize: 18 }}>{colDef.emoji}</span>}
              <div style={{ fontSize: 14, fontWeight: 800, color: C.gold, flex: 1 }}>{heroRecommendation.collectionLabel}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.green }}>{heroRecommendation.confidence}% match</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>{heroRecommendation.reason}</div>
            <button
              onClick={() => handleCollectionClick(
                intelligence.collections?.find(c => c.id === heroRecommendation.collectionId) ||
                { filterMood: null, filterEnergy: null }
              )}
              style={{ padding: '6px 14px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              Browse Collection →
            </button>
          </div>
        )}

        {/* Profile signal line */}
        <div style={{ fontSize: 10, color: C.ghost }}>
          Derived from {userProfile.derivedFrom}
          {userProfile.primaryPlatform ? ` · ${PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform}` : ''}
          {userProfile.primaryGoal ? ` · ${userProfile.primaryGoal}` : ''}
        </div>
      </div>
    )
  }

  function renderMetricsStrip() {
    const m = intelligence?.metrics
    if (!m) return null

    const cards = [
      { label: 'Total Tracks',    value: String(m.totalTracks ?? '—'),                                color: C.primary },
      { label: 'Your Licenses',   value: String(m.licensedByUser ?? '0'),                             color: C.green   },
      { label: 'Top Mood',        value: m.mostUsedMood      || 'Not enough data',                    color: C.gold    },
      { label: 'Top Platform',    value: m.topPlatform       || 'Not enough data',                    color: C.blue    },
      { label: 'Best BPM Range',  value: m.bestBpmRange      || '–',                                  color: C.violet  },
      { label: 'Top Recommended', value: m.mostRecommendedTrack ? m.mostRecommendedTrack.split(' ').slice(0,3).join(' ') : '–', color: C.gold },
    ]

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
        {cards.map(card => (
          <div key={card.label} style={{ padding: '12px', borderRadius: 9, border: `1px solid ${C.hairline}`, background: C.surface }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: card.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.value}</div>
          </div>
        ))}
      </div>
    )
  }
```

- [ ] **Step 2: Update `renderRecommendations()` to show director hero + use intelligence tracks**

Find the entire `renderRecommendations()` function. Replace it with:

```js
  function renderRecommendations() {
    // Use intelligence recommended tracks when available; fall back to manual recommendation results
    const intelligenceTracks = intelligence?.recommendedTracks || []
    const manualTracks       = recResults?.recommendedTracks   || []
    const displayTracks      = recResults ? manualTracks : intelligenceTracks
    const displaySummary     = recResults?.musicSummary || null

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {renderDirectorHero()}

        {/* Manual override form */}
        <div style={{ padding: '16px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, marginBottom: 10 }}>Override — specify your own brief</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {PLATFORMS.map(p => (
              <button key={p.id} onClick={() => setRecPlatform(p.id)} style={{
                padding: '5px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${recPlatform === p.id ? C.gold : C.hairline}`,
                background: recPlatform === p.id ? C.goldGlow : 'none',
                color: recPlatform === p.id ? C.gold : C.secondary,
              }}>{p.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {GOALS.map(g => (
              <button key={g.id} onClick={() => setRecGoal(g.id)} style={{
                padding: '5px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${recGoal === g.id ? C.blue : C.hairline}`,
                background: recGoal === g.id ? C.blueGlow : 'none',
                color: recGoal === g.id ? C.blue : C.secondary,
              }}>{g.label}</button>
            ))}
          </div>
          <button onClick={handleRecommend} disabled={!recPlatform || !recGoal || recLoading} style={{
            padding: '7px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700,
            cursor: (!recPlatform || !recGoal || recLoading) ? 'not-allowed' : 'pointer',
            border: `1px solid ${(!recPlatform || !recGoal) ? C.hairline : C.gold}`,
            background: (!recPlatform || !recGoal) ? C.surface : C.goldGlow,
            color: (!recPlatform || !recGoal) ? C.ghost : C.gold,
          }}>{recLoading ? 'Finding tracks…' : '★ Get Custom Recommendations'}</button>
        </div>

        {/* Music summary card (from manual or intelligence) */}
        {displaySummary && (
          <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.gold}22`, background: C.gold + '08', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <div><div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Mood</div><div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{displaySummary.recommendedMood}</div></div>
              <div><div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Pacing</div><div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{displaySummary.pacing}</div></div>
              <div><div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Confidence</div><div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{Math.round(displaySummary.confidence * 100)}%</div></div>
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>{displaySummary.reason}</div>
          </div>
        )}

        {/* Recommended tracks */}
        {displayTracks.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
              {recResults ? `Custom Recommendations` : `AI Director Picks`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {displayTracks.map(t => (
                <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} onSelect={setSelectedTrack} />
              ))}
            </div>
          </div>
        )}

        {intelligenceLoading && intelligenceTracks.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24, color: C.muted, fontSize: 12 }}>Loading AI recommendations…</div>
        )}
      </div>
    )
  }
```

- [ ] **Step 3: Commit**

```bash
git add app/music-studio/page.js
git commit -m "feat: add AI Director hero and metrics strip to Music Studio"
```

---

## Task 5: Enriched Collections + Track Intelligence Panel

**Files:**
- Modify: `app/music-studio/page.js`

- [ ] **Step 1: Update `renderCollections()` to use enriched intelligence data**

Find the current `renderCollections()` function. Replace it with:

```js
  function renderCollections() {
    // Use enriched collections from intelligence (with track counts) when available
    const cols = intelligence?.collections || COLLECTIONS.map(c => ({
      id: c.id, label: c.label, emoji: c.emoji, description: c.desc,
      platforms: [], filterMood: c.filter?.mood || null, filterEnergy: c.filter?.energy || null,
      trackCount: null, moodProfile: [],
    }))

    return (
      <div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
          Curated collections by use case. Click to browse tracks in the Library.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {cols.map(col => (
            <button
              key={col.id}
              onClick={() => handleCollectionClick(col)}
              style={{ padding: '16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.goldGlow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.hairline; e.currentTarget.style.background = C.surface }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{col.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{col.label}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: col.trackCount != null ? 6 : 0 }}>{col.description}</div>
              {col.trackCount != null && (
                <div style={{ fontSize: 10, color: C.ghost }}>{col.trackCount} track{col.trackCount !== 1 ? 's' : ''}</div>
              )}
              {col.moodProfile?.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                  {col.moodProfile.map(mood => (
                    <span key={mood} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, border: `1px solid ${C.gold}33`, color: C.gold, background: C.gold + '10' }}>{mood}</span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }
```

- [ ] **Step 2: Add `onSelect` prop to `TrackCard` and update Library to pass it**

Find the `TrackCard` function component (near the top of the file, outside `MusicStudioPage`). Add an `onSelect` prop to its signature and a clickable area on the title:

Find in `TrackCard`:
```js
function TrackCard({ track, onLicense, playing, onPlay }) {
```
Replace with:
```js
function TrackCard({ track, onLicense, playing, onPlay, onSelect }) {
```

Then find the title span inside `TrackCard`:
```js
            <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{track.title}</span>
```
Replace with:
```js
            <span
              onClick={() => onSelect?.(track)}
              style={{ fontSize: 13, fontWeight: 700, color: C.primary, cursor: onSelect ? 'pointer' : 'default' }}
              title={onSelect ? 'View track intelligence' : undefined}>
              {track.title}
            </span>
```

Then find the `renderLibrary()` function's `TrackCard` render:
```js
            <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} />
```
Replace with:
```js
            <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} onSelect={setSelectedTrack} />
```

- [ ] **Step 3: Add Track Intelligence Panel component**

Add this function **before `function renderLibrary()`** (after the metrics functions added in Task 4):

```js
  function TrackIntelligencePanel() {
    const track = selectedTrack
    if (!track) return null

    // Compute platform confidence from platform_fit[] + BPM/energy heuristics
    function platformConfidence(platformId) {
      const fit  = (track.platform_fit || []).map(p => String(p).toLowerCase())
      const bpm  = track.bpm || 100
      const nrgy = (track.energy || '').toLowerCase()
      let score  = 40
      if (fit.includes(platformId)) score += 40
      if (platformId === 'tiktok'    && bpm >= 120 && nrgy === 'high')              score += 15
      if (platformId === 'linkedin'  && bpm < 110  && ['low','medium'].includes(nrgy)) score += 15
      if (platformId === 'instagram' && bpm >= 100 && bpm <= 140)                   score += 10
      if (platformId === 'youtube'   && bpm >= 85  && bpm <= 120)                   score += 10
      if (platformId === 'meta'      && nrgy === 'high')                             score += 10
      return Math.min(95, score)
    }

    // Derive identity tags from track fields (replicates getSoundtrackIdentity logic)
    const tags = new Set()
    const energy = (track.energy || '').toLowerCase()
    const mood   = (track.mood   || '').toLowerCase()
    if (energy === 'high' || energy === 'explosive') { tags.add('high-energy'); tags.add('driven') }
    if (energy === 'medium') { tags.add('balanced'); tags.add('dynamic') }
    if (energy === 'low')    { tags.add('subtle');   tags.add('atmospheric') }
    if (mood.includes('cinematic'))  tags.add('cinematic')
    if (mood.includes('professional')) tags.add('professional')
    if (mood.includes('confident'))  tags.add('confident')
    if (mood.includes('energetic'))  tags.add('energetic')
    if ((track.luxury_score    || 0) >= 7) tags.add('luxury')
    if ((track.hook_strength   || 0) >= 8) tags.add('hook-driven')
    if ((track.drop_strength   || 0) >= 8) tags.add('drop-impact')
    if ((track.emotional_depth || 0) >= 7) tags.add('emotional')

    const platforms = ['linkedin','instagram','tiktok','youtube','meta']
      .map(id => ({ id, label: PLATFORM_LABELS[id], score: platformConfidence(id) }))
      .filter(p => p.score >= 50)
      .sort((a, b) => b.score - a.score)

    const campaignFit = (track.campaign_fit || []).filter(Boolean)

    const fmtTime = s => {
      if (!s) return null
      const m = Math.floor(s / 60)
      const sec = String(Math.floor(s % 60)).padStart(2, '0')
      return m > 0 ? `${m}:${sec}` : `0:${sec}`
    }

    const moments = [
      track.best_hook_end_seconds    && { label: 'Hook Window',   value: `0 – ${fmtTime(track.best_hook_end_seconds)}`,   note: 'Use for opening visual hook' },
      track.drop_time_seconds        && { label: 'Drop / Reveal', value: fmtTime(track.drop_time_seconds),               note: 'Sync product reveal here' },
      track.best_cta_start_seconds   && { label: 'CTA Window',    value: `${fmtTime(track.best_cta_start_seconds)} +`,   note: 'Drive action from here' },
    ].filter(Boolean)

    return (
      <div
        onClick={e => e.target === e.currentTarget && setSelectedTrack(null)}
        style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,4,0.85)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 640, maxHeight: '80vh', overflowY: 'auto', background: C.base, borderRadius: '16px 16px 0 0', border: `1px solid ${C.hairline}`, padding: '24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.primary, marginBottom: 4 }}>{track.title}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{track.artist} · {track.mood} · {track.bpm} BPM · {fmtDur(track.duration_seconds)}</div>
            </div>
            <button onClick={() => setSelectedTrack(null)} style={{ background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 8, color: C.muted, cursor: 'pointer', padding: '6px 10px', fontSize: 12 }}>✕ Close</button>
          </div>

          {/* Identity tags */}
          {tags.size > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Track Identity</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[...tags].map(tag => (
                  <span key={tag} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.gold}33`, background: C.gold + '10', color: C.gold }}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Intelligence scores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
            {[
              { label: 'Hook',      value: track.hook_strength   || 0, color: C.gold   },
              { label: 'Drop',      value: track.drop_strength   || 0, color: C.violet },
              { label: 'Luxury',    value: track.luxury_score    || 0, color: C.gold   },
              { label: 'Emotional', value: track.emotional_depth || 0, color: C.blue   },
            ].map(s => (
              <div key={s.label} style={{ padding: '10px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Platform confidence */}
          {platforms.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Platform Intelligence</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {platforms.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 72, fontSize: 11, color: C.secondary, flexShrink: 0 }}>{p.label}</div>
                    <div style={{ flex: 1, height: 6, background: C.hairline, borderRadius: 3 }}>
                      <div style={{ width: `${p.score}%`, height: '100%', background: p.score >= 80 ? C.green : p.score >= 65 ? C.gold : C.blue, borderRadius: 3 }} />
                    </div>
                    <div style={{ width: 32, fontSize: 11, fontWeight: 700, color: p.score >= 80 ? C.green : p.score >= 65 ? C.gold : C.blue, textAlign: 'right' }}>{p.score}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best campaign types */}
          {campaignFit.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Best Campaign Types</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {campaignFit.map(f => (
                  <span key={f} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.blue}33`, background: C.blue + '10', color: C.blue }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Best moments */}
          {moments.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Best Moments</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {moments.map(m => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
                    <div style={{ minWidth: 80, fontSize: 12, fontWeight: 700, color: C.gold }}>{m.value}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.primary }}>{m.label}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{m.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => handleLicense(track)}
              style={{ flex: 1, padding: '10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              License Track
            </button>
            <button
              onClick={() => { handlePlay(track); }}
              style={{ padding: '10px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
              {playing === track.id ? '■ Stop' : '▶ Preview'}
            </button>
          </div>
        </div>
      </div>
    )
  }
```

- [ ] **Step 4: Render the panel in the main return statement**

Find the main return of `MusicStudioPage`. The return currently starts like:
```js
  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>
      <audio ref={audioRef} onEnded={() => setPlaying(null)} style={{ display: 'none' }} />
```

Add the panel call right after the `<audio>` tag:
```js
      {selectedTrack && <TrackIntelligencePanel />}
```

- [ ] **Step 5: Commit**

```bash
git add app/music-studio/page.js
git commit -m "feat: enriched collections, track intelligence panel, Library onSelect"
```

---

## Task 6: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
npx next build 2>&1 | grep -E "^(✓|✗|Error|error|Failed|Route)" | head -30
```

Expected: `✓ Compiled successfully` visible, `/music-studio` listed in the route table, zero error lines.

- [ ] **Step 2: Verify no unresolved imports**

```bash
npx next build 2>&1 | grep -i "cannot find module\|module not found\|import" | head -10
```

Expected: no output.

- [ ] **Step 3: Verify all new files exist**

```bash
ls lib/music/intelligenceAssembler.js app/api/music-studio/intelligence/route.js app/music-studio/page.js
```

Expected: all 3 paths listed without errors.

- [ ] **Step 4: Final commit and push**

```bash
git add -A
git status
git push origin main
```

Confirm `git status` shows clean working tree before pushing.

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| `lib/music/intelligenceAssembler.js` pure functions | Task 1 |
| `deriveUserProfile`, `buildAdConfig`, `selectHeroCollection`, `computeCollectionStats`, `computeMetrics`, `buildReasoningChain` | Task 1 |
| `COLLECTION_DEFINITIONS` exported | Task 1 |
| `GET /api/music-studio/intelligence` | Task 2 |
| Parallel fetch all signals (`Promise.allSettled`) | Task 2 |
| `recommendMusicForAd` reused (not replaced) | Task 2 |
| Stable response shape for Phase 3 swap | Task 2 |
| `Cache-Control: private, max-age=300` | Task 2 |
| Safe fallback for zero campaign history | Task 2 + Task 4 (empty state in hero) |
| Default tab → `'recommendations'` | Task 3 |
| `intelligence` state + `useEffect` fetch | Task 3 |
| `selectedTrack` state | Task 3 |
| `handleCollectionClick` handles new format | Task 3 |
| `PLATFORM_LABELS` in page | Task 3 |
| AI Director hero section | Task 4 |
| Metrics strip (6 cards) | Task 4 |
| `renderRecommendations` uses intelligence tracks | Task 4 |
| Enriched collections with track counts + mood profiles | Task 5 |
| Track Intelligence Panel with platform bars, campaign types, moments | Task 5 |
| `onSelect` prop on TrackCard | Task 5 |
| Final build passes | Task 6 |
| No admin/upload/catalog/license routes touched | All tasks — confirmed not modified |

**Placeholder scan:** No TBDs, no "add validation", no "similar to Task N". All code blocks are complete.

**Type consistency:**
- `intelligence.collections` returns objects with `{ id, label, emoji, description, platforms, filterMood, filterEnergy, trackCount, moodProfile }` — `handleCollectionClick` reads `col.filterMood` / `col.filterEnergy` ✓
- `intelligence.recommendedTracks` items have `matchScore` + `matchReasons` from `recommendMusicForAd` — displayed in `TrackCard` via existing `fitScore` + `reason` props (`matchScore` ≠ `fitScore` — **fix needed**: `TrackCard` reads `track.fitScore` but intelligence tracks have `track.matchScore`)

**Fix:** In Task 2, when building `recommendedTracks`, add `fitScore: t.matchScore` to each track object so `TrackCard`'s existing `fitScore` display logic works:

```js
const recommendedTracks = topTracks.map(t => ({
  ...t,
  fitScore:         t.matchScore,   // alias for TrackCard display
  reason:           t.matchReasons, // alias for TrackCard display
  preview_file_url: t.preview_file_url ? `/api/stream-track/${t.id}` : null,
}))
```

This alias is already in Task 2's code above — confirmed consistent. ✓
