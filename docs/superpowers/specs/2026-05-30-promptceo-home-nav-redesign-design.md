# PromptCEO Home + Navigation Redesign — Design Spec (Phase A)

**Goal:** Transform the GPT view into a real Home screen and collapse 12+ navigation items into 4 destination groups — eliminating cognitive overload without removing any features.

**Architecture:** Evolve the existing `ai_director` view in `page.js` into a two-state Home (new user / returning user). Restructure the sidebar navigation in place — no new routes, no new files, just view key remapping and nav rendering changes. The conversational AI chat remains; the Brain recommendation panel is added above it for returning users.

**Core principle:** Nothing is deleted. Everything is reorganized. Users who knew the old nav should be able to find everything within 5 seconds.

---

## 1. The Two States

### State A — New User (no campaign history, no projectBrain data)

Renders when: `isNewUser === true` OR `memory.campaignCount === 0` AND `!projectBrain`

Layout:
```
Welcome to PromptCEO.

What are you building?
[ Brand ] [ Product ] [ Creator ] [ Agency ] [ SaaS ]

─────────────────────

Start Fast
[ Build First Campaign ] [ Create First Ad ] [ Create First Video ] [ Perfect Day ]

─────────────────────

What PromptCEO does
• Generates complete ad campaigns
• Creates image and video ads
• Learns what works over time
• Adapts content for every platform
• Tracks your campaign evolution automatically

─────────────────────

[ Chat input — already here from GPT view ]
```

Clicking a "What are you building?" chip pre-fills the chat and kicks off discovery mode.

Clicking a "Start Fast" button routes to the appropriate generator with no other setup required.

---

### State B — Returning User (has history or projectBrain)

Renders when: `memory.campaignCount > 0` OR `projectBrain` exists

Layout:
```
Good morning, [firstName].

─── CURRENT PROJECT ───────────────────────────
[projectName]
Campaign Stage: Desire Escalation
Audience Temperature: Warm
Fatigue: 34/100

Recommended next move:
Generate 3 Story-Based Instagram Videos

Confidence: [calculated from signal weight convergence]

[ Generate Next Asset → ]
─────────────────────────────────────────────

─── PERFORMANCE SIGNALS ───────────────────
Best hook type: Curiosity Gap (↑ 3× signal weight)
Top world: Maldives Villa
Best platform: Instagram
─────────────────────────────────────────────

─── RECENT PROJECTS ──────────────────────
[Project cards — click to load]
─────────────────────────────────────────────

[ Chat input — below the intelligence panel ]
Type anything or let the Director lead.
```

**"Generate Next Asset" behavior (Option A):**
Clicking the button pre-fills the chat input with a Director message built from Brain data:
> *"Build 3 desire-escalation Story videos for [productName] — Instagram, Maldives Villa world, curiosity-gap hooks, cinematic pacing."*
User sees it as a message in the chat. They can edit or confirm. Confirming routes to the appropriate generator with all params pre-filled.

This creates the `brain_recommendation_accepted` signal that feeds back into Project Brain.

**Confidence score:** Calculated as: average signal weight convergence across top 3 Brain signals (best_hook_type, best_world, best_platform) mapped against campaign_stage readiness. Range 60–97%. Simple heuristic, displayed as a single number — do not expose the formula.

---

## 2. Navigation Restructure

### Current (12+ top-level items)
GPT · Studio · Instant · Perfect Day · Day Video · Timeline · Life Engine · Ad Studio · Full Campaign · Journey · Platforms · Hub

### Phase A Target (4 groups, flat sub-items)

```
HOME
  (default — the evolved GPT/Home screen)

CAMPAIGNS
  Campaign Builder   ← current Full Campaign
  Campaign Journey   ← current Journey
  Timeline           ← current Timeline
  Distribution       ← current Platforms (renamed)

STUDIO
  Studio             ← current Studio (image generation)
  Quick Create       ← current Instant Campaign
  Perfect Day        ← current Perfect Day (Phase B: absorbed into Life Engine)
  Day Video          ← current Day Video (Phase B: absorbed into Life Engine)
  Life Engine        ← current Life Engine
  Ad Studio          ← current Ad Studio

PROFILE
  Account
  Credits
  Music
  Settings
  Billing
```

**Nav rendering:** The sidebar currently renders a flat list of button items. In Phase A, it renders grouped sections with a group label above each cluster. Collapsed by default on mobile, expanded on desktop. No accordion behavior — all groups visible.

**Phase B note:** Perfect Day and Day Video move inside Life Engine as sub-modes. In Phase A they remain as separate STUDIO items to minimize disruption.

---

## 3. Key Renames

| Old Name | New Name | Reason |
|---|---|---|
| Platforms | Distribution | "I need to publish" not "I need platforms" |
| Full Campaign | Campaign Builder | Action-oriented, clearer intent |
| Journey | Campaign Journey | Adds context — journey of what? |

**"Director" naming:** Only the AI conversational layer (the Home screen chat) is called "AI Director." The image generation view keeps the name "Studio." The Ad Studio instruction bar is "AI Director bar" internally — not surfaced as a separate nav item.

---

## 4. Brain Recommendation Logic

The recommendation panel reads from `projectBrain` state already loaded in `PromptCEOPage`. No new API call needed for the panel itself.

**Recommendation message construction** (client-side, no API):
```javascript
function buildBrainRecommendation(projectBrain, brandProfile) {
  const stage = projectBrain.campaign_stage || 'attention'
  const countMap = { attention: 3, emotional_connection: 3, desire_escalation: 3, conversion: 2, retargeting: 2 }
  const formatMap = { attention: 'hook-led posts', emotional_connection: 'story posts', desire_escalation: 'Story videos', conversion: 'direct-response ads', retargeting: 'warm re-engagement posts' }
  const count = countMap[stage] || 3
  const format = formatMap[stage] || 'campaign assets'
  const platform = projectBrain.best_platform || 'Instagram'
  const world = projectBrain.best_worlds?.[0] || null
  const hook = projectBrain.best_hook_types?.[0] || null
  const product = brandProfile?.name || 'your brand'
  
  let message = `Generate ${count} ${format} for ${product} — ${platform}`
  if (world) message += `, ${world.replace(/_/g, ' ')} world`
  if (hook) message += `, ${hook.replace(/_/g, ' ')} hooks`
  if (projectBrain.pacing_profile) message += `, ${projectBrain.pacing_profile} pacing`
  message += '.'
  return message
}
```

**Confidence score:**
```javascript
function buildConfidenceScore(projectBrain) {
  let score = 60
  if (projectBrain.best_hook_types?.length > 0) score += 8
  if (projectBrain.best_worlds?.length > 0) score += 8
  if (projectBrain.best_platform) score += 7
  if (projectBrain.fatigue_score < 50) score += 7
  if (projectBrain.total_generations > 5) score += 7
  return Math.min(score, 97)
}
```

**Signal fired on "Generate Next Asset" click:** `brain_recommendation_accepted` → POST /api/signal with weight 9 (highest weight, new event type).

---

## 5. Files Changed

**Major:** `app/prompt-engine-v3/page.js`
- Add `buildBrainRecommendation(projectBrain, brandProfile)` function
- Add `buildConfidenceScore(projectBrain)` function
- Add `recommendationAccepted` state (bool) for post-click UX
- Add `handleRecommendationAccept()` — builds message, fires signal, pre-fills chat
- In `ai_director` view IIFE: replace current header/memory panel with two-state Home render
- In sidebar nav render: add group labels, remap view keys to new structure, rename items

**Minor:** `app/api/signal/route.js`
- Add `brain_recommendation_accepted` to valid event types with weight 9

**No new files. No new routes. No new API endpoints.**

---

## 6. What Stays The Same

- All generators: unchanged
- All API routes: unchanged
- The chat input and Director conversation: unchanged
- Project Brain data loading: unchanged
- All existing view IIFEs: unchanged (only `ai_director` IIFE changes)
- Subscription gating: unchanged
- All signal tracking: unchanged (one new event type added)

---

## 7. Success Criteria

- A new user landing on Home immediately understands what PromptCEO does and has 4 clear starting points
- A returning user with a project sees a recommendation within 1 second of page load (no extra API call)
- The navigation has 4 visible group labels — not 12 flat items
- "Distribution" replaces "Platforms" everywhere in the nav
- Clicking "Generate Next Asset" pre-fills the Director chat and fires `brain_recommendation_accepted`
- No existing generator is inaccessible — everything is reachable within 2 clicks from Home

---

## 8. Phase B Preview (not in scope, noted for architecture awareness)

- Life Engine absorbs Perfect Day and Day Video as sub-modes
- Campaign Journey and Timeline merge into one "Campaign Journey" view with Past/Present/Future sections
- Studio gets Simple/Pro mode toggle
- Option B one-click generation (bypass chat, direct generate from Brain)
