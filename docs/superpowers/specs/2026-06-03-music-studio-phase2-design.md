# Music Studio Phase 2 — Soundtrack Intelligence™ Design Spec
**Date:** 2026-06-03
**Status:** Shipped — 2026-06-03 (9 commits, `1aa997d` → `9c84a7b`, cleanup `HEAD`)

---

## Implementation Record

### Files Shipped

| File | Type | Description |
|---|---|---|
| `lib/music/intelligenceAssembler.js` | Created | Pure functions: `deriveUserProfile`, `buildAdConfig`, `selectHeroCollection`, `computeCollectionStats`, `computeMetrics`, `buildReasoningChain`, `COLLECTION_DEFINITIONS`, `PLATFORM_LABELS` |
| `app/api/music-studio/intelligence/route.js` | Created | GET endpoint — 4 parallel queries via `Promise.allSettled`, runs `recommendMusicForAd`, returns structured intelligence response |
| `app/music-studio/page.js` | Modified | Major upgrade — AI Director hero, metrics strip, enriched collections, Track Intelligence Panel, Recommendations as default tab |

### Final Response Shape (`/api/music-studio/intelligence`)

Stable contract — shape must not change between Phase 2 and Phase 3 GPT upgrade:

```json
{
  "status": "success",
  "userProfile": {
    "primaryPlatform": "linkedin",
    "primaryGoal": "founder",
    "primaryStyle": "lifestyle",
    "mostUsedMood": "Professional",
    "confidence": 0.82,
    "confidenceLabel": "Strong match",
    "derivedFrom": "14 campaign patterns",
    "hasEnoughData": true
  },
  "heroRecommendation": {
    "collectionId": "founder_authority",
    "collectionLabel": "Founder Authority",
    "reason": "Your recent campaigns focus on founder update content for LinkedIn.",
    "confidence": 82
  },
  "recommendedTracks": [
    { "id": "uuid", "title": "...", "fitScore": 91, "reason": "...", "preview_file_url": "/api/stream-track/uuid", "...": "all track fields" }
  ],
  "recommendedCollections": [
    { "id": "founder_authority", "confidence": 82, "reason": "..." },
    { "id": "educational_content", "confidence": 70, "reason": "..." }
  ],
  "collections": [
    { "id": "founder_authority", "label": "Founder Authority", "emoji": "👤", "description": "...", "platforms": ["LinkedIn","YouTube"], "filterMood": null, "filterEnergy": null, "trackCount": 3, "moodProfile": ["Professional","Confident"] }
  ],
  "metrics": {
    "totalTracks": 6,
    "licensedByUser": 2,
    "mostUsedMood": "Professional",
    "topPlatform": "LinkedIn",
    "bestBpmRange": "85–110 BPM",
    "mostRecommendedTrack": "Executive Pulse"
  },
  "reasoningChain": [
    "Campaign memory: 14 patterns, primary goal = founder, primary platform = linkedin",
    "Derived music profile: luxury,professional,confident mood, medium energy, 85–110 BPM",
    "Top track scored 91/100: Matches founder content style. Aligned with Founder Update pacing"
  ]
}
```

**Key implementation notes:**
- `recommendMusicForAd` (from `app/prompt-engine-v3/ad-system/musicRecommendation.js`) is the scorer — NOT the BPM scorer in `lib/music/scorer.js`. Uses rich `platform_fit[]`, `mood_fit[]`, `campaign_fit[]` arrays.
- `whyFits` is the correct return field from `recommendMusicForAd` (aliased as `reason` on `recommendedTracks`)
- `fitScore` is aliased from `matchScore` so `TrackCard` score bar renders correctly
- `FULL_TRACK_SELECT = TRACK_SELECT + ', mood_fit, visual_style_fit, commercial_score'` — extends the base scorer's select to include fields `recommendMusicForAd` needs
- OS memory events were removed from the parallel query set — fetched but never consumed (eliminated dead round-trip)

### Edge Case Verification

| Scenario | Behaviour |
|---|---|
| Zero campaign history | `hasEnoughData: false` → hero shows "Tell the Director what you're building" empty state |
| Zero usage logs | `mostUsedMood: null`, `licensedByUser: 0`, BPM range falls back to goal-derived value from `GOAL_MUSIC_MAP` |
| Empty performance logs | `performanceInsights: { ready: false }` → platform derived from campaign memory only |
| Populated tracks | Normal flow — `recommendMusicForAd` scores all tracks, top 5 returned |
| No tracks in catalog | `recommendedTracks: []`, `metrics.totalTracks: 0`, collections show 0 track counts |

### Known Limitations

| Limitation | Impact |
|---|---|
| `reasoningChain` is deterministic prose, not GPT | Explanations are formulaic, not conversational |
| Campaign memory gated on content creation | New users (0 campaigns) always see the empty state hero |
| Performance insights gated at ≥5 log entries | Platform signal not used until user has submitted results |
| Collections are code-defined presets | Cannot be customised per user or admin |
| Confidence score is a function of pattern count, not actual recommendation quality | May show high confidence on a poor recommendation if user has many patterns |

### Phase 3 Dependency: Catalog Must Be Seeded First

**The GPT Director upgrade (Phase 3) is only worthwhile after the catalog is seeded.**

Reason: Claude would be writing narrative recommendations like "I recommend Cinematic Momentum for your luxury founder campaign" — but if there are only 6 tracks in the catalog, the intelligence surface is thin and recommendations feel arbitrary regardless of how good the language is.

Priority order before Phase 3:
1. **Seed catalog** — upload all PromptCEO-owned tracks via `/api/admin/upload-music`. More tracks = richer recommendations, more meaningful `platform_fit[]`/`campaign_fit[]` arrays, better differentiation between collections.
2. **Confirm `music_usage_logs` is collecting** — a few weeks of real usage data will make the metrics strip and BPM range derivation meaningful.
3. **Then upgrade to GPT Director** — swap the deterministic `deriveUserProfile → buildAdConfig → recommendMusicForAd` pipeline for a Claude call in the intelligence route. Response shape stays identical. UI never changes.

---

## Strategic Intent

Phase 1 connected the music catalog to the UI. Phase 2 makes the system intelligent.

The shift:

| Phase 1 | Phase 2 |
|---|---|
| Browse tracks | AI recommends tracks |
| Manual filter by mood | Director reads your campaign history |
| Static collections | Collections with live data |
| No track detail | Track Intelligence Panel |
| No user profile | Derived user music profile |

Users should open Music Studio and immediately see: "PromptCEO already knows what I should be using."

---

## Intelligence Systems Audit

### What Already Exists (and Can Be Reused)

**1. Campaign Memory (`campaign_memory` table)**

Written by `full-ad-campaign`, `instant-campaign`, and the `signal` route. Contains:
- `successful_patterns` (jsonb): `{ style, goal, type, platform, worldId }`
- `top_hook_types[]`: hook archetypes the user favors
- `top_platforms[]`: platforms the user creates for
- `top_angles[]`: narrative angles used

Read by `/api/campaign-memory-summary` → returns `topGoals`, `topStyles`, `topPlatforms`, `topWorlds`.

**Music Director input:** `topGoals` maps directly to music goal profiles (founder → Professional/Confident mood, launch → Energetic/Motivational). `topPlatforms` maps to BPM ranges and energy levels. This is the richest signal available.

---

**2. Project Brain (`project_brain` table)**

Per-project fields: `campaign_stage`, `fatigue_score`, `best_hook_types`, `best_worlds`, `best_styles`, `best_platform`, `active_strategy`, `audience_temperature`, `creator_energy`, `pacing_profile`.

**Music Director input:** `best_platform`, `creator_energy`, `pacing_profile` — when a project ID is present, these refine the recommendation for that specific project's context. Not available at the global Music Studio level (no project in context), but available when Music Studio is opened from within a project.

---

**3. OS Memory Events (`os_memory_events` table)**

Read via `/api/os-memory/recent` → `getRecentMemoryEvents()` → `buildCompactMemorySummary()`.

Returns: `totalEvents`, `adsCreated`, `campaignsCreated`, `projectsSaved`, `recentEventTypes`, `latestProjectNames`, `recentSummaries`.

**Music Director input:** `recentEventTypes` shows recent content type (ad vs campaign vs project). `latestProjectNames` can show what the user is actively working on. Low-signal but adds context to the reasoning chain.

---

**4. Performance Insights (`performance_logs` table)**

Read via `/api/performance-insights` → `topHooks`, `topPlatforms`, `topWorlds`, `likeRate`.

**Music Director input:** `topPlatforms` tells us where the user's content actually performs — the highest-signal input for platform-specific music selection. Only available if user has logged ≥5 performance results. Treat as a bonus signal when present.

---

**5. Music Usage Logs (`music_usage_logs` table — Phase 1)**

Now collecting: `track_id`, `project_type`, `action` (selected/licensed), `created_at`.

**Music Director input:** After 5+ logs, can derive: most-selected tracks, most-licensed tracks, preferred moods from selection patterns. In Phase 2 this is light data. In Phase 3 it becomes the primary feedback loop.

---

**6. Music Recommendation Engine v2 (`musicRecommendation.js`)**

`recommendMusicForAd(adConfig, tracks)` — **the richer scorer, currently unused in Music Studio.**

Inputs: `productName`, `targetMood`, `adStyle`, `platform`, `platformGoal`, `brandVoice`.

Scoring: matches against `product_fit[]`, `mood_fit[]`, `visual_style_fit[]`, `platform_fit[]`, `campaign_fit[]` arrays on each track. Adds `commercial_score`, `hook_strength`, goal-specific bonuses. Returns: `matchScore` (0–100) + `matchReasons` strings.

**This is the primary scorer for Phase 2** — it is significantly more accurate than the BPM-range scorer in `lib/music/scorer.js` because it uses the full track intelligence arrays.

---

**7. Music Intelligence Layer (`musicIntelligence.js`)**

`getSoundtrackIdentity(track, adConfig)` — derives musical personality tags from a locked track.

`getStageMusic(stageKey, track)` — returns stage-specific timing notes (when to use the drop, CTA window, etc.).

`getCampaignFitSummary(track, adConfig)` — one-sentence campaign fit explanation.

**Music Director input:** `getSoundtrackIdentity` powers the Track Intelligence Panel. `getStageMusic` is the foundation for the future Campaign Stage Music feature.

---

### What Does NOT Yet Exist (needs to be built)

- A unified endpoint that assembles all signals into a single Music Director response
- Track-level platform confidence scores (derivable from `platform_fit[]` + `recommendMusicForAd`)
- Collection enrichment with live track counts and mood profiles
- A user music profile (derived from campaign memory)

---

## Architecture Decision

### Three Approaches Considered

**Approach A — Client-Side Signal Assembly**

The Music Studio page fetches `/api/campaign-memory-summary`, `/api/os-memory/recent`, `/api/music-tracks`, and `/api/music-studio/usage` in parallel. Assembles recommendations in the browser using the existing scorer.

- Pros: No new backend route. Uses all existing endpoints.
- Cons: 4 parallel fetches on every page load. All intelligence logic runs in the browser. No caching. Reasoning chain is buried in UI code.
- Complexity: Low
- Scalability: Poor — adding a new signal source requires changing the page component.

**Approach B — Dedicated `/api/music-studio/intelligence` Endpoint** *(Recommended)*

A single server-side route reads campaign memory, OS memory, music_usage_logs, and performance insights. Runs `recommendMusicForAd` with the derived user profile. Returns a structured `{ userProfile, recommendations, metrics, reasoningChain }` object. The page makes one fetch.

- Pros: Single request. Server-side aggregation. Intelligence logic lives in the API layer (not the browser). Cacheable per user with a 5-minute TTL. Clean interface — adding new signals doesn't change the UI contract.
- Cons: One new route to build and maintain.
- Complexity: Medium
- Scalability: Excellent — future signals (campaign evolution, brand DNA, performance feedback) plug into the endpoint without touching the UI.

**Approach C — GPT-Powered Narrative Director**

The intelligence endpoint passes all context to Claude/GPT which produces narrative reasoning: "Based on your last 5 campaigns targeting LinkedIn founders with luxury brand positioning, I recommend these three tracks because…"

- Pros: Human-quality explanations. Fully adaptive.
- Cons: API cost on every page load. 2–5s latency. Data richness is not yet sufficient to justify generative reasoning — campaign memory patterns are sparse for most users. Risk of hallucinated justifications.
- Complexity: High
- Scalability: Excellent, but premature for Phase 2.

**Decision: Approach B now, architecture ready for Approach C later.**

Approach B produces the right user experience (single load, personalized, reasoned). The endpoint interface is designed so that swapping the deterministic scorer for GPT generation in Phase 3 requires changing only the `/api/music-studio/intelligence` route — not the UI.

---

## Component Definitions

### AI Music Director™

**Purpose:** The first thing users see. Replaces the passive library with active intelligence.

**Inputs (server-side, assembled by `/api/music-studio/intelligence`):**

| Source | Data Used | Confidence Weight |
|---|---|---|
| `campaign_memory` (via `/api/campaign-memory-summary`) | `topGoals[0]`, `topPlatforms[0]`, `topStyles[0]` | High (40%) |
| `performance_logs` (via `/api/performance-insights`) | `topPlatforms[0]` | High (30%) — when available |
| `music_usage_logs` | Most-selected mood | Medium (20%) |
| `os_memory_events` | `recentEventTypes` | Low (10%) — tiebreaker |

**Processing:**

1. **Derive user music profile** from campaign memory:
   - Map `topGoals[0]` → music goal profile (e.g., `founder` → `{ mood: 'Professional/Confident', energy: 'medium', bpmAdj: -10 }`)
   - Map `topPlatforms[0]` → platform profile (e.g., `linkedin` → BPM 70–100, low energy)
   - Map `topStyles[0]` → visual style (e.g., `lifestyle` → `mood_fit: ['warm', 'aspirational']`)

2. **Build `adConfig`** for `recommendMusicForAd`:
   ```js
   {
     platform:    derivedPlatform,       // from topPlatforms
     platformGoal: derivedGoal,          // from topGoals
     adStyle:     derivedStyle,          // from topStyles
     targetMood:  derivedMood,           // from goal profile
     brandVoice:  derivedBrandVoice,     // from topStyles → brand voice map
   }
   ```

3. **Score all active tracks** via `recommendMusicForAd(adConfig, allTracks)` — returns top 5 with `matchScore` and `matchReasons`.

4. **Select hero collection** — map `derivedGoal + derivedPlatform` to the most relevant collection name.

5. **Calculate confidence** based on data richness:
   - 0 campaign patterns → confidence 50%, label "Getting to know you"
   - 1–5 patterns → confidence 65–75%, label "Building your profile"
   - 6–20 patterns → confidence 80–90%, label "Strong match"
   - 20+ patterns → confidence 92–97%, label "Highly personalized"

**Outputs (response shape from `/api/music-studio/intelligence`):**
```json
{
  "userProfile": {
    "primaryPlatform": "linkedin",
    "primaryGoal": "founder",
    "primaryStyle": "lifestyle",
    "confidence": 0.87,
    "confidenceLabel": "Strong match",
    "derivedFrom": "18 campaign patterns",
    "hasEnoughData": true
  },
  "heroRecommendation": {
    "collectionId": "founder_launch",
    "collectionLabel": "Founder Authority",
    "reason": "Your recent activity focuses on founder content and LinkedIn authority campaigns.",
    "confidence": 87
  },
  "recommendedTracks": [
    {
      "id": "uuid",
      "title": "Track Title",
      "matchScore": 91,
      "reasons": ["Matches founder content style", "Optimised for LinkedIn", "Strong emotional depth"],
      "energy": "medium",
      "mood": "Professional"
    }
  ],
  "recommendedCollections": [
    { "id": "founder_launch", "confidence": 87, "reason": "Matches your primary content type" },
    { "id": "linkedin",       "confidence": 82, "reason": "Your most-used platform" }
  ],
  "metrics": {
    "totalTracks": 6,
    "licensedByUser": 2,
    "mostUsedMood": "Professional",
    "topPlatform": "LinkedIn",
    "bestBpmRange": "85–110",
    "mostRecommendedTrack": "Track Title"
  },
  "reasoningChain": [
    "Campaign memory: 18 patterns, primary goal = founder, primary platform = linkedin",
    "Derived music profile: Professional/Confident mood, medium energy, BPM 75–100",
    "Top track scored 91/100: platform_fit matches linkedin, campaign_fit matches founder"
  ]
}
```

**Empty state** (no campaign history): Show the Recommendations form (platform + goal picker) directly in the hero section instead of the personalized read. Label: "Tell the Director what you're building."

---

### Collections Engine

**Purpose:** Replace the flat grid of named filter buttons with enriched collection cards that show users the value of each collection before they browse.

**Data source:** `music_tracks` — all active tracks. Collection membership is determined by the same code-defined filter logic as Phase 1, but the counts and mood profiles are computed live.

**Each collection card shows:**
- Name + emoji
- Description (static)
- Track count (live: `tracks.filter(collectionFilter).length`)
- Mood profile chips (top 2 moods from tracks in collection, e.g., "Professional · Confident")
- Platform fit tags (union of `platform_fit` across tracks in collection, top 3)
- "Browse" CTA → switches to Library tab with collection filter active

**Collections defined:**

| ID | Filter Logic | Platform Fit |
|---|---|---|
| `founder_authority` | `campaign_fit` includes `founder` OR `mood` in `['Professional','Confident']` | LinkedIn, YouTube |
| `product_launch` | `campaign_fit` includes `sales` OR `launch` | Meta, Instagram, TikTok |
| `luxury_brand` | `luxury_score >= 7` OR `mood` includes `Cinematic` | Instagram, YouTube |
| `ugc_ads` | `energy` = `high` AND `bpm >= 120` | TikTok, Instagram, Meta |
| `fitness_domination` | `energy` in `['high','medium-high']` AND `bpm >= 125` | TikTok, Instagram |
| `educational_content` | `campaign_fit` includes `awareness` OR `mood` = `Focused` | YouTube, LinkedIn |
| `podcast_content` | `energy` = `low` AND `bpm < 100` | YouTube, LinkedIn |
| `viral_short_form` | `bpm >= 128` AND `energy` = `high` AND `hook_strength >= 7` | TikTok, Instagram Reels |

**Architecture:** Collections are computed from the same `tracks` array fetched for the Library. No separate DB query. A `computeCollections(tracks)` pure function in the page file maps collection definitions over the track array and returns enriched collection objects.

---

### Track Intelligence Panel

**Purpose:** When a user clicks a track, open a right-side detail panel showing everything the AI knows about that track's campaign fit. This is one of the strongest differentiators.

**Trigger:** Click any track card → panel opens (page does not navigate away).

**Data sources:**
- Track row fields: `platform_fit[]`, `campaign_fit[]`, `mood_fit[]`, `visual_style_fit[]`, `hook_strength`, `drop_strength`, `luxury_score`, `emotional_depth`, `commercial_score`, `bpm`, `energy`, `mood`, `drop_time_seconds`, `best_hook_start_seconds`, `best_hook_end_seconds`, `best_cta_start_seconds`
- `getSoundtrackIdentity(track, {})` from `musicIntelligence.js` — produces identity tags
- `getStageMusic` timing notes — produces "Use for X stage" notes
- Computed platform confidence scores: for each known platform, run `recommendMusicForAd({ platform }, [track])` → `matchScore`

**Panel sections:**

**1. Track Identity**
- Mood chip, Energy chip, BPM
- Identity tags from `getSoundtrackIdentity` (e.g., "cinematic", "luxury", "hook-driven", "powerful")
- Scores: Hook Strength (n/10), Drop Strength (n/10), Luxury Score (n/10), Emotional Depth (n/10)

**2. Platform Intelligence**
For each platform in `['linkedin','instagram','tiktok','youtube','meta']`:
- Confidence bar + percentage (computed from `platform_fit[]` match + BPM/energy fit)
- Only show platforms where confidence ≥ 50%

**3. Best Campaign Types**
`campaign_fit[]` array values, displayed as chips: e.g., "Founder Launch", "Product Reveal", "Authority Building"

**4. Best Moments (Timing)**
From timing fields:
- Hook Window: `0 – best_hook_end_seconds`
- Drop / Reveal: `drop_time_seconds`
- CTA Window: `best_cta_start_seconds +`
Stage notes from `getStageMusic`

**5. Use in Studio buttons**
- "Use in Edit Studio" → deep link to `/edit-studio` with track pre-selected (via localStorage or URL param)
- "Use in Ad Studio" → sets as locked music in Ad Studio context (future integration)
- "License Track" → triggers `handleLicense`

**Architecture:** Panel state is `selectedTrack` — a single track object in the Music Studio page. No new API call needed — all data is already on the track object from the Library fetch. `getSoundtrackIdentity` is a pure client-side function (no network). Platform confidence is computed inline.

---

### Soundtrack Intelligence Dashboard (Metrics Strip)

**Purpose:** Above the Library, show 6 metrics cards that prove the system is intelligent and data-aware.

**Data sources (all from `/api/music-studio/intelligence`):**

| Metric | Source | Empty state |
|---|---|---|
| Total Tracks | `metrics.totalTracks` | "0 tracks" |
| Your Licensed Tracks | `metrics.licensedByUser` | "None yet" |
| Most Used Mood | `metrics.mostUsedMood` (from usage logs) | "Not enough data" |
| Top Platform | `metrics.topPlatform` (from campaign memory or performance insights) | "Not enough data" |
| Best BPM Range | `metrics.bestBpmRange` (from most-used tracks' BPM) | "–" |
| Most Recommended | `metrics.mostRecommendedTrack` (highest-scored track for user profile) | "Run recommendations" |

**Architecture:** These are included in the `/api/music-studio/intelligence` response — no additional fetch. The strip renders immediately with the intelligence load.

---

### Recommendations Tab as Default

**Change:** `activeTab` initial state changes from `'library'` to `'recommendations'`.

**Why:** The tab order and default should reflect the product positioning. Library is a reference — Recommendations is the value. Users arriving at Music Studio should see AI-driven recommendations first, not a list they have to filter.

**Implementation:** One-line change to `useState('library')` → `useState('recommendations')`.

---

## New Route: `/api/music-studio/intelligence`

**File:** `app/api/music-studio/intelligence/route.js`

**Method:** GET (no body needed — reads authenticated user's data)

**Processing steps:**

```
1. Auth check (SSR client)
2. Parallel fetch:
   a. Campaign memory summary (reuse /api/campaign-memory-summary logic inline)
   b. OS memory events (recent 20 events)
   c. Music usage logs for this user (from music_usage_logs, last 50)
   d. Performance insights (from performance_logs, if ≥5 data points)
   e. All active music tracks (from music_tracks)
3. Derive user music profile from campaign memory
4. Build adConfig from profile
5. Score tracks via recommendMusicForAd(adConfig, tracks) from musicRecommendation.js
6. Compute metrics from usage logs + track data
7. Select hero collection from profile
8. Build reasoning chain (array of plain-language strings)
9. Return structured response
```

**Caching:** The response is deterministic given the same DB state. Cache-Control: `private, max-age=300` (5 minutes). Users with rapidly changing campaign memory will see refresh within 5 minutes.

**Error behavior:** All sub-queries are non-fatal. If campaign memory fails, profile defaults to no-preference (shows recommendations form). If tracks fail, returns `{ error: 'catalog unavailable' }`. Never blocks page render.

---

## Data Flow Diagram

```
User opens /music-studio
         │
         ▼
GET /api/music-studio/intelligence
         │
    ┌────┴────────────────────────────────┐
    │ campaign_memory  os_memory_events   │
    │ music_usage_logs performance_logs   │
    │ music_tracks                        │
    └────────────────┬────────────────────┘
                     │
              Derive user profile
                     │
              Build adConfig
                     │
         recommendMusicForAd()
         (musicRecommendation.js)
                     │
              Score all tracks
                     │
    ┌────────────────┼──────────────────────┐
    │                │                      │
    ▼                ▼                      ▼
userProfile  recommendedTracks          metrics
heroRec      recommendedCollections  reasoningChain
    │
    └──── Single JSON response ────► Music Studio Page
                                         │
                        ┌────────────────┼──────────────────┐
                        ▼                ▼                   ▼
               AI Director Hero    Metrics Strip       Recommendations Tab
                        │
                        ▼
               [Click track] → Track Intelligence Panel
                               (client-side, no fetch)
```

---

## Future Performance Learning Integration

Phase 2 builds the foundation. Here is where future phases connect:

**Phase 3 — Feedback Loop**

Add `music_performance_logs` table:
```sql
track_id, project_id, platform, ctr, engagement_rate, liked, created_at
```

When a user exports a render from Edit Studio with a music bed, log the render. When performance data is submitted for that project, associate it with the track. This closes the loop: tracks that get used in high-performing content get higher base scores in `recommendMusicForAd`.

**Phase 4 — Score Weight Evolution**

Add a `track_performance_boost` column to `music_tracks`. Update nightly from the aggregated `music_performance_logs`. The `recommendMusicForAd` scorer adds `track.performance_boost` to the final score. Best-performing tracks rise naturally.

**Phase 5 — GPT Director Upgrade**

Replace the deterministic profile-to-adConfig mapping in `/api/music-studio/intelligence` with a Claude call. Pass the same data (campaign memory, OS events, usage logs) plus the scoring output as context. Claude writes the reasoning chain and confidence narrative. The response shape stays the same — only the reasoning generation changes.

The interface between the route and the UI never changes. Only the brain behind the route evolves.

---

## What Is NOT in Phase 2

- Credits, licensing marketplace, monetization of any kind
- GPT generation (deterministic scoring only)
- Admin analytics dashboard
- Campaign stage music recommendations (uses `getStageMusic` but not surfaced yet)
- "Bring Your Own Music" mode
- Cross-user pattern aggregation ("tracks popular with founders")

---

## File Changes Required

| Action | File | Change |
|---|---|---|
| Create | `app/api/music-studio/intelligence/route.js` | New — aggregates all signals, returns structured intelligence response |
| Create | `lib/music/intelligenceAssembler.js` | Pure functions: `deriveUserProfile`, `computeCollectionStats`, `computeMetrics`, `buildReasoningChain` |
| Modify | `app/music-studio/page.js` | Major upgrade: AI Director hero section, Metrics strip, enriched Collections, Track Intelligence panel, Recommendations as default tab |
| No change | `lib/music/scorer.js` | Kept as-is for Edit Studio |
| No change | `app/api/music-studio/recommend/route.js` | Kept as-is, still used when no campaign history |
| No change | Admin routes, license routes, stream route | Untouched |
