# PromptCEO Music Catalog Seeding Template
**Last updated:** 2026-06-03
**Purpose:** Complete guide for uploading PromptCEO-owned tracks with full intelligence metadata.

---

## How Catalog Seeding Works

The admin upload panel uses two routes:

1. **`POST /api/admin/music-presign`** — generates a signed Supabase Storage URL for the file upload
2. **`POST /api/admin/upload-music`** — saves the `music_tracks` DB row after the file is in storage
3. **Supabase Dashboard → SQL Editor** — used for intelligence fields that the upload route doesn't yet write directly (platform_fit, campaign_fit, mood_fit, etc.)

**Recommended workflow per track:**
1. Upload the full audio file via the admin panel (writes: title, artist, genre, mood, energy, duration)
2. Upload the preview clip (30–60 second clip for playback in the UI)
3. Open Supabase Dashboard → Table Editor → `music_tracks` → find the row → update intelligence fields
4. Set `is_active = true` once all intelligence fields are populated

---

## Field Reference

### Core Identity Fields (written by upload route)

| DB Column | Type | Required | Notes |
|---|---|---|---|
| `title` | text | ✅ | Full track title |
| `artist` | text | — | Artist display name (same as `artist_name`) |
| `artist_name` | text | ✅ | Canonical artist name used by scorer |
| `genre` | text | — | e.g. "Cinematic", "Hip-Hop", "Electronic", "Orchestral" |
| `mood` | text | ✅ | Single mood word — used directly in scoring. See Mood Vocabulary below |
| `energy` | text | ✅ | Exactly one of: `low` / `medium` / `medium-high` / `high` |
| `bpm` | integer | ✅ | Beats per minute. Range: 60–180 |
| `duration_seconds` | integer | ✅ | Full track length in seconds |
| `full_file_url` | text | ✅ | Supabase Storage URL to the full track (private bucket) |
| `preview_file_url` | text | ✅ | Supabase Storage URL to the preview clip (public bucket) |
| `is_active` | boolean | ✅ | Set `false` during upload. Set `true` when fully seeded |
| `is_premium` | boolean | — | `true` for premium-tier tracks (higher license cost) |
| `featured` | boolean | — | `true` for featured catalog picks (shown first in Library) |
| `license_credits` | integer | — | Credit cost to license. Default: `2`. Premium: `5` |
| `tags` | text[] | — | Free-form tags, e.g. `["cinematic","powerful","luxury"]` |
| `best_for` | text | — | One-line description of ideal use, e.g. "Founder launch videos and LinkedIn authority content" |

### Intelligence Fields (set manually via Supabase Dashboard after upload)

These fields power `recommendMusicForAd` and the Track Intelligence Panel. **They are arrays of lowercase string tags.**

| DB Column | Type | Notes |
|---|---|---|
| `platform_fit` | text[] | Platforms this track performs best on. Values: `instagram`, `tiktok`, `facebook`, `youtube_shorts`, `shopify` |
| `campaign_fit` | text[] | Campaign goals this track suits. Values: `awareness`, `traffic`, `leads`, `sales`, `retargeting`, `luxury` |
| `mood_fit` | text[] | Mood tags for scoring. Use `MOOD_EXPAND` vocabulary (see below) |
| `visual_style_fit` | text[] | Visual styles. Values: `lifestyle`, `minimal`, `editorial`, `cinematic`, `creator` |
| `product_fit` | text[] | Product types. Values: `fitness`, `beauty`, `skincare`, `fashion`, `coaching`, `wellness`, `tech`, `lifestyle`, `luxury`, `jewellery`, `sport` |

### Quality Score Fields (0–10 integer, set manually)

| DB Column | Type | Description |
|---|---|---|
| `hook_strength` | integer | How strong the opening hook is (0–10). 8+ = strong hook |
| `drop_strength` | integer | How impactful the drop/reveal moment is (0–10). 8+ = powerful |
| `luxury_score` | integer | How well the track signals premium / luxury (0–10). 7+ = luxury brand use |
| `emotional_depth` | integer | Emotional resonance depth (0–10). 7+ = emotional storytelling |
| `commercial_score` | integer | General commercial viability (0–10). Used as a base score boost |
| `start_energy` | text | Energy level at the very beginning. Values: `low` / `medium` / `high` |

### Timing Marker Fields (set manually, values in seconds)

These power the "Best Moments" section in the Track Intelligence Panel.

| DB Column | Description | Example |
|---|---|---|
| `intro_start_seconds` | When the intro begins | `0` |
| `build_start_seconds` | When the build/tension begins | `8` |
| `drop_time_seconds` | When the main drop hits (sync product reveal here) | `24` |
| `best_hook_start_seconds` | Start of the best hook window | `0` |
| `best_hook_end_seconds` | End of the best hook window | `8` |
| `best_payoff_start_seconds` | Start of the emotional payoff section | `32` |
| `best_payoff_end_seconds` | End of the emotional payoff section | `48` |
| `best_cta_start_seconds` | When to start the call-to-action section | `45` |
| `best_cta_end_seconds` | End of the CTA window | `60` |

### Schema Gaps (not yet in live DB — add when needed)

These fields were in the original Music Studio blueprint but are not currently in the `music_tracks` table. Add them via Supabase SQL when ready:

| Planned Column | Type | Blueprint Purpose |
|---|---|---|
| `musical_key` | text | Musical key, e.g. "C minor", "F# major" |
| `waveform_url` | text | URL to waveform visualisation image |
| `cover_image_url` | text | URL to track artwork / cover image |

**SQL to add these columns:**
```sql
alter table public.music_tracks
  add column if not exists musical_key    text,
  add column if not exists waveform_url   text,
  add column if not exists cover_image_url text;
```

---

## Vocabulary Reference

### Mood (single word — `mood` column)

Use exactly one of these values. This is the primary mood label displayed in the UI and used in scoring:

```
Professional  Confident  Motivational  Focused
Energetic     Trendy     Cinematic     Emotional
Calm          Powerful   Bold          Luxurious
```

### Mood Fit Tags (`mood_fit` array — multiple values allowed)

These are the granular tags `recommendMusicForAd` matches against. Use the expanded set:

```
luxury        soft          calm          cinematic     elegant       warm
bold          powerful      aggressive    energetic     determination
emotional     romantic      love          inspirational
clean         minimal       aspirational  motivational  confident
friendly      upbeat        positive      dramatic      premium
feminine      fast          upbeat        trendy
```

### Platform Fit (`platform_fit` array)

```
instagram    tiktok    facebook    youtube_shorts    shopify
```

### Campaign Fit (`campaign_fit` array)

```
awareness    traffic    leads    sales    retargeting    luxury
```

### Visual Style Fit (`visual_style_fit` array)

```
lifestyle    minimal    editorial    cinematic    creator
```

### Energy Levels (`energy` column)

Must be exactly one of: `low` / `medium` / `medium-high` / `high`

---

## Seeding Checklist

Run this checklist for each track before setting `is_active = true`:

```
[ ] Title entered
[ ] Artist name entered (both artist and artist_name columns)
[ ] Genre set
[ ] Mood set (single value from Mood Vocabulary)
[ ] BPM measured
[ ] Duration in seconds
[ ] Energy level set (low / medium / medium-high / high)
[ ] Full audio file uploaded to private bucket
[ ] Preview clip uploaded to public bucket (30–60 seconds)
[ ] best_for text written
[ ] tags array populated

Intelligence fields:
[ ] platform_fit[] populated (at least 1 value)
[ ] campaign_fit[] populated (at least 1 value)
[ ] mood_fit[] populated (3–6 values)
[ ] visual_style_fit[] populated (at least 1 value)
[ ] product_fit[] populated (at least 1 value)

Quality scores:
[ ] hook_strength set (0–10)
[ ] drop_strength set (0–10)
[ ] luxury_score set (0–10)
[ ] emotional_depth set (0–10)
[ ] commercial_score set (0–10)
[ ] start_energy set

Timing markers:
[ ] drop_time_seconds set (if track has a drop)
[ ] best_hook_start_seconds set
[ ] best_hook_end_seconds set
[ ] best_cta_start_seconds set

Final:
[ ] is_active set to true
[ ] Verified track appears in /music-studio Library
[ ] Verified preview plays correctly
```

---

## Example Entries

### Example 1 — Founder Authority Track

A track for professional LinkedIn/YouTube founder content. Understated, confident, premium feel.

```json
{
  "title":            "Executive Momentum",
  "artist_name":      "PromptCEO Studio",
  "genre":            "Cinematic",
  "mood":             "Professional",
  "bpm":              95,
  "duration_seconds": 210,
  "energy":           "medium",
  "start_energy":     "low",
  "is_premium":       false,
  "featured":         true,
  "license_credits":  2,
  "tags":             ["professional", "confident", "understated", "premium"],
  "best_for":         "Founder update videos, LinkedIn authority content, thought leadership",

  "platform_fit":       ["linkedin", "youtube_shorts"],
  "campaign_fit":       ["awareness", "leads"],
  "mood_fit":           ["luxury", "calm", "elegant", "confident", "premium", "aspirational"],
  "visual_style_fit":   ["editorial", "minimal"],
  "product_fit":        ["coaching", "tech", "lifestyle", "wellness"],

  "hook_strength":    6,
  "drop_strength":    3,
  "luxury_score":     7,
  "emotional_depth":  6,
  "commercial_score": 7,

  "drop_time_seconds":          null,
  "best_hook_start_seconds":    0,
  "best_hook_end_seconds":      8,
  "intro_start_seconds":        0,
  "build_start_seconds":        16,
  "best_payoff_start_seconds":  90,
  "best_payoff_end_seconds":    120,
  "best_cta_start_seconds":     180,
  "best_cta_end_seconds":       210
}
```

---

### Example 2 — Luxury Brand Track

High luxury score, cinematic feel. Product reveals, premium brand campaigns, high-end fashion/beauty.

```json
{
  "title":            "Velvet Empire",
  "artist_name":      "PromptCEO Studio",
  "genre":            "Cinematic",
  "mood":             "Cinematic",
  "bpm":              88,
  "duration_seconds": 195,
  "energy":           "medium",
  "start_energy":     "low",
  "is_premium":       true,
  "featured":         true,
  "license_credits":  5,
  "tags":             ["luxury", "cinematic", "premium", "powerful", "drop-impact"],
  "best_for":         "Luxury product reveals, high-end brand campaigns, premium fashion and beauty",

  "platform_fit":       ["instagram", "youtube_shorts"],
  "campaign_fit":       ["awareness", "luxury", "retargeting"],
  "mood_fit":           ["luxury", "cinematic", "elegant", "premium", "dramatic", "powerful"],
  "visual_style_fit":   ["cinematic", "editorial"],
  "product_fit":        ["beauty", "fashion", "jewellery", "luxury"],

  "hook_strength":    7,
  "drop_strength":    9,
  "luxury_score":     10,
  "emotional_depth":  8,
  "commercial_score": 8,

  "drop_time_seconds":          32,
  "best_hook_start_seconds":    0,
  "best_hook_end_seconds":      12,
  "intro_start_seconds":        0,
  "build_start_seconds":        16,
  "best_payoff_start_seconds":  32,
  "best_payoff_end_seconds":    64,
  "best_cta_start_seconds":     150,
  "best_cta_end_seconds":       195
}
```

---

### Example 3 — Fitness Motivation Track

High energy, fast BPM, powerful. Fitness content, supplement ads, sport/gym campaigns.

```json
{
  "title":            "Iron Drive",
  "artist_name":      "PromptCEO Studio",
  "genre":            "Electronic",
  "mood":             "Energetic",
  "bpm":              138,
  "duration_seconds": 175,
  "energy":           "high",
  "start_energy":     "high",
  "is_premium":       false,
  "featured":         false,
  "license_credits":  2,
  "tags":             ["energetic", "powerful", "high-energy", "driven", "drop-impact"],
  "best_for":         "Fitness content, supplement ads, sport and gym campaigns, transformation stories",

  "platform_fit":       ["tiktok", "instagram", "facebook"],
  "campaign_fit":       ["awareness", "traffic", "sales"],
  "mood_fit":           ["energetic", "powerful", "bold", "determination", "aggressive", "fast"],
  "visual_style_fit":   ["creator", "lifestyle"],
  "product_fit":        ["fitness", "sport", "supplement", "gym"],

  "hook_strength":    9,
  "drop_strength":    9,
  "luxury_score":     1,
  "emotional_depth":  4,
  "commercial_score": 8,

  "drop_time_seconds":          16,
  "best_hook_start_seconds":    0,
  "best_hook_end_seconds":      8,
  "intro_start_seconds":        0,
  "build_start_seconds":        8,
  "best_payoff_start_seconds":  16,
  "best_payoff_end_seconds":    48,
  "best_cta_start_seconds":     140,
  "best_cta_end_seconds":       175
}
```

---

### Example 4 — UGC Ad Track

TikTok-native. Fast, trendy, hook-first. Creator content, UGC ads, viral short-form.

```json
{
  "title":            "Scroll Stopper",
  "artist_name":      "PromptCEO Studio",
  "genre":            "Pop Electronic",
  "mood":             "Trendy",
  "bpm":              128,
  "duration_seconds": 165,
  "energy":           "high",
  "start_energy":     "high",
  "is_premium":       false,
  "featured":         false,
  "license_credits":  2,
  "tags":             ["trendy", "hook-driven", "energetic", "upbeat", "creator"],
  "best_for":         "TikTok UGC ads, viral short-form content, creator-native campaigns",

  "platform_fit":       ["tiktok", "instagram", "facebook"],
  "campaign_fit":       ["awareness", "traffic", "sales"],
  "mood_fit":           ["energetic", "upbeat", "trendy", "fast", "positive", "motivational"],
  "visual_style_fit":   ["creator", "lifestyle"],
  "product_fit":        ["fashion", "beauty", "wellness", "lifestyle", "coaching"],

  "hook_strength":    10,
  "drop_strength":    7,
  "luxury_score":     2,
  "emotional_depth":  3,
  "commercial_score": 9,

  "drop_time_seconds":          12,
  "best_hook_start_seconds":    0,
  "best_hook_end_seconds":      6,
  "intro_start_seconds":        0,
  "build_start_seconds":        6,
  "best_payoff_start_seconds":  12,
  "best_payoff_end_seconds":    36,
  "best_cta_start_seconds":     135,
  "best_cta_end_seconds":       165
}
```

---

### Example 5 — Product Launch Track

High energy with a powerful drop. Product reveals, launch campaigns, sales-driven Meta/Instagram ads.

```json
{
  "title":            "Launch Sequence",
  "artist_name":      "PromptCEO Studio",
  "genre":            "Cinematic Electronic",
  "mood":             "Motivational",
  "bpm":              120,
  "duration_seconds": 185,
  "energy":           "high",
  "start_energy":     "medium",
  "is_premium":       false,
  "featured":         true,
  "license_credits":  2,
  "tags":             ["motivational", "powerful", "drop-impact", "cinematic", "launch"],
  "best_for":         "Product launch campaigns, reveal videos, Meta and Instagram conversion ads",

  "platform_fit":       ["instagram", "facebook", "tiktok"],
  "campaign_fit":       ["sales", "traffic", "awareness"],
  "mood_fit":           ["motivational", "powerful", "bold", "inspirational", "energetic", "determination"],
  "visual_style_fit":   ["cinematic", "lifestyle"],
  "product_fit":        ["tech", "fashion", "lifestyle", "beauty", "wellness"],

  "hook_strength":    8,
  "drop_strength":    9,
  "luxury_score":     5,
  "emotional_depth":  6,
  "commercial_score": 9,

  "drop_time_seconds":          28,
  "best_hook_start_seconds":    0,
  "best_hook_end_seconds":      10,
  "intro_start_seconds":        0,
  "build_start_seconds":        14,
  "best_payoff_start_seconds":  28,
  "best_payoff_end_seconds":    56,
  "best_cta_start_seconds":     155,
  "best_cta_end_seconds":       185
}
```

---

## Quick SQL Template for Intelligence Fields

After uploading a track via the admin panel, use this SQL in Supabase Dashboard → SQL Editor to add intelligence fields. Replace all placeholder values.

```sql
update public.music_tracks
set
  -- Intelligence arrays
  platform_fit       = array['instagram', 'tiktok'],
  campaign_fit       = array['sales', 'awareness'],
  mood_fit           = array['energetic', 'powerful', 'bold', 'motivational'],
  visual_style_fit   = array['lifestyle', 'creator'],
  product_fit        = array['fitness', 'sport'],

  -- Quality scores (0–10)
  hook_strength      = 8,
  drop_strength      = 9,
  luxury_score       = 2,
  emotional_depth    = 5,
  commercial_score   = 8,
  start_energy       = 'medium',

  -- Timing markers (seconds)
  drop_time_seconds           = 24,
  best_hook_start_seconds     = 0,
  best_hook_end_seconds       = 8,
  intro_start_seconds         = 0,
  build_start_seconds         = 12,
  best_payoff_start_seconds   = 24,
  best_payoff_end_seconds     = 48,
  best_cta_start_seconds      = 145,
  best_cta_end_seconds        = 175,

  -- Metadata
  bpm                = 128,
  tags               = array['energetic', 'powerful', 'drop-impact'],
  best_for           = 'Product launch videos and sales-driven ad campaigns',
  license_credits    = 2,
  featured           = false,
  is_active          = true  -- set to true only when all fields are complete

where title = 'Your Track Title Here';
```

---

## Priority Seeding Order

Seed tracks in this order to maximise the AI Director's usefulness fastest:

1. **Founder Authority** — highest-demand collection, LinkedIn is primary platform for most users
2. **Product Launch** — second-most-used campaign type, needed for Meta/Instagram recommendations
3. **Luxury Brand** — differentiator; no other platform offers this category
4. **UGC Ads** — TikTok-first; needed for the viral_short_form and ugc_ads collections
5. **Fitness Content** — niche but high-engagement; populates fitness_domination collection
6. **Educational** — needed to populate educational_content collection
7. **Podcast / Background** — lowest urgency; populates podcast_content collection

**Minimum viable catalog for meaningful recommendations:** 2–3 tracks per collection (16–24 tracks total).

**Breakeven for GPT Director upgrade:** 30+ tracks across all collections with full intelligence metadata populated.
