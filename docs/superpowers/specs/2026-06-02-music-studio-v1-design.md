# PromptCEO Music Studio™ v1 — Design Spec
**Date:** 2026-06-02
**Status:** Approved

---

## What We're Building

An upgrade + unification of the existing music infrastructure into a coherent **Soundtrack Intelligence System** that powers Edit Studio, Ad Studio, and a new standalone `/music-studio` page.

This is NOT a greenfield build. The schema, backend routes, and AI scoring logic already exist. This build connects the pieces and surfaces them in a clean UI.

---

## What Already Exists (Do Not Rebuild)

| Asset | Location | Status |
|---|---|---|
| `music_tracks` table | Supabase | Live — rich schema with BPM, mood, energy, timing markers, hook/drop/luxury scores, platform/campaign fit |
| `music_licenses` table | Supabase | Live |
| `/api/music-tracks` GET | Route | Live — returns tracks with preview URLs |
| `/api/license-music` POST | Route | Live — music_addon gating |
| `/api/stream-track/[id]` | Route | Live — signed URL streaming |
| `/api/admin/upload-music` + `/api/admin/music-presign` | Routes | Live — admin catalog management |
| Ad Studio music intelligence | `ad-system/musicIntelligence.js`, `musicRecommendation.js`, `musicTiming.js` | Live |
| Edit Studio music endpoint | `/api/edit-studio/music` | Live but uses **hardcoded mock library** — needs DB upgrade |

---

## Product Rules

- **No user uploads.** Admin-only catalog. Music Studio = PromptCEO Soundtrack Intelligence™, not storage.
- Music addon gating stays on licensing. Preview streaming is unauthenticated.
- Admin panel continues to manage catalog via existing presign/upload routes.

---

## Priority Build Order

### Phase 1 — Connect Edit Studio to Real DB
**File:** `/app/api/edit-studio/music/route.js`

Replace the hardcoded `MUSIC_LIBRARY` array with a query to `music_tracks` (via Supabase service role). Keep the existing scoring engine exactly as-is — it already handles `directorMood`, `platform`, `goal`, BPM, energy, duration. Just feed it real tracks instead of mock data.

Changes:
- At request time, query `music_tracks` where `is_active = true`
- Map DB columns → the shape the scorer expects (`id`, `title`, `artist`, `mood`, `bpm`, `duration`, `energy`, `licenseType`)
- Remove the `MUSIC_LIBRARY` constant
- Keep `availableTracks` fallback for any caller that still passes tracks

### Phase 2 — /api/music-studio/recommend
New route that powers both the standalone Music Studio and future Ad Studio calls.

Input:
```json
{
  "platform": "linkedin|youtube|instagram|tiktok|meta",
  "goal": "founder|demo|tutorial|launch|ugc|edu",
  "campaignType": "string (optional)",
  "directorAnalysis": "object (optional)",
  "videoLength": "number seconds (optional)",
  "mood": "string (optional)",
  "energy": "low|medium|medium-high|high (optional)"
}
```

Output:
```json
{
  "recommendedTracks": [...],
  "musicSummary": { "recommendedMood", "pacing", "reason", "confidence" },
  "timingPlan": { "introFade", "outroFade", "targetVolume", "beatSyncSuggestion" }
}
```

Implementation: pull from `music_tracks` DB, run through the same scoring engine from `edit-studio/music`. This becomes the shared recommendation brain.

### Phase 3 — music_usage_logs
New Supabase table (create via migration or direct insert if table doesn't exist):

```sql
create table music_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  track_id uuid references music_tracks(id),
  project_id text,
  project_type text,  -- 'edit_studio' | 'ad_studio' | 'music_studio'
  action text,        -- 'selected' | 'licensed' | 'rendered'
  created_at timestamptz default now()
);
```

Log whenever a track is: selected for preview, licensed, or used in a render. Log from the existing `/api/license-music` route (add insert there) and from the edit-studio render route.

### Phase 4 — /app/music-studio (Standalone UI)
Route: `/music-studio`
Auth-gated. Simple layout.

**Tabs:**
1. **Library** — browse all `music_tracks`, filter by mood/genre/energy/BPM range, preview via stream-track endpoint
2. **Recommendations** — input platform + goal → get AI-ranked tracks from `/api/music-studio/recommend`
3. **Usage** — read from `music_usage_logs` for this user — which tracks they've used, in which projects
4. **Licensing** — show user's `music_licenses` rows, what they've licensed and when
5. **Collections** — curated groupings by use case (Founder Launch, Product Demo, UGC Ads, etc.) — filter view on top of Library

**Track card:**
- Title, artist, mood chip, BPM, duration
- Play button (stream-track)
- "Use in Edit Studio" / "Use in Ad Studio" CTA
- License button (calls `/api/license-music`)
- Fit score badge (from recommendation context, when available)

**No upload UI.** Admin-only catalog stays in the admin panel.

### Phase 5 — Collections
Collections are defined in code as named filter presets, not a new DB table. v1 collections:

| Collection | Filter Logic |
|---|---|
| Founder Launch | mood IN ['Confident', 'Professional', 'Motivational'] |
| Product Demo | mood IN ['Professional', 'Cinematic'], energy IN ['medium', 'medium-high'] |
| Luxury Brand | luxury_score >= 7 |
| UGC Ads | energy = 'high', bpm >= 120 |
| Fitness Content | energy IN ['high', 'medium-high'], bpm >= 125 |
| Educational | mood IN ['Focused', 'Professional'], energy = 'low' |
| Viral Short Form | bpm >= 128, energy = 'high' |
| LinkedIn | mood IN ['Professional', 'Confident'], energy = 'low' |
| TikTok | bpm >= 120, energy = 'high' |

Collections tab renders as a grid of named cards → clicking filters the Library view.

### Phase 6 — Credit Transactions (After Usage Logging Is Stable)
New table `music_credit_transactions` for debit/refill history. Deferred until Phase 3 usage logging is confirmed working.

### Phase 7 — Analytics (Last)
Admin-only dashboard reading from `music_usage_logs`:
- Most used tracks
- Most licensed tracks  
- Best performing by platform
- Usage over time

Deferred until usage logging has enough data to be meaningful.

---

## Navigation

Add Music Studio to the top-level Studio nav:

```
Studio
├── Prompt Studio
├── Ad Studio
├── Edit Studio   ← already exists
└── Music Studio  ← new
```

---

## Key Constraints

- No mock data in production routes after Phase 1
- No user upload UI at any point in v1
- Keep the scoring engine in `edit-studio/music/route.js` as the single source of truth (or extract to a shared lib if needed)
- `/api/stream-track/[id]` handles all audio playback — no direct storage URLs in the UI

---

## Out of Scope for v1

- Revenue/licensing pack store
- Cross-platform performance analytics
- Campaign memory integration
- AI conversation about music choices
- "Bring Your Own Music" mode
