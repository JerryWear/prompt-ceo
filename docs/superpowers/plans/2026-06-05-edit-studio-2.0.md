# Edit Studio 2.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Edit Studio from a video editor into an AI Creative Director that takes one uploaded video and outputs multiple professionally structured ads (Founder, Demo, SaaS, LinkedIn, TikTok, UGC, Launch, Retargeting) — each with hooks, scripts, voiceover, captions, music, and a rendered MP4.

**Architecture:** Seven sequential sprints. Sprint 1 adds vision-based video understanding (GPT-4o + frame extraction) on top of the existing Whisper transcript. Sprint 2 adds Creative Director ad-type selection. Sprint 3 generates hooks and scripts per ad type and introduces the `edit_ads` table. Sprint 4 synthesizes voiceover via OpenAI TTS. Sprint 5 generates captions from scripts (not transcript). Sprint 6 orchestrates all steps into one Auto Ad Factory route and updates renderEngine.js to support voiceover audio. Sprint 7 adds a quality scoring gate before render. A new v2 UI at `app/edit-studio/v2/page.js` surfaces the agency-feel experience; `app/edit-studio/page.js` routes new projects to v2.

**Tech Stack:** Next.js App Router, Supabase (postgres + storage), OpenAI (gpt-4o vision + tts-1-hd + whisper-1), FFmpeg (frame extraction + render), existing `lib/edit-studio/renderEngine.js`, existing `scripts/render-worker.js`.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `supabase/migrations/20260605_edit_studio_v2.sql` | `edit_ads` table + v2 columns on `edit_projects` |
| Create | `app/api/edit-studio/understand/route.js` | Sprint 1 — frame extraction + GPT-4o vision analysis |
| Create | `app/api/edit-studio/creative-director/route.js` | Sprint 2 — ad type strategy from understanding data |
| Create | `app/lib/edit-studio/adGenerator.js` | Shared generation logic (hooks, scripts, captions) imported by individual routes + auto-factory |
| Create | `app/api/edit-studio/hooks/route.js` | Sprint 3 — 5 hooks per ad type |
| Create | `app/api/edit-studio/scripts/route.js` | Sprint 3 — 15s/30s/60s scripts per ad type + hook |
| Create | `app/api/edit-studio/voice/route.js` | Sprint 4 — OpenAI TTS synthesis → Supabase storage |
| Create | `app/api/edit-studio/caption-from-script/route.js` | Sprint 5 — script-driven timed captions |
| Create | `app/api/edit-studio/auto-factory/route.js` | Sprint 6 — orchestrates all steps for all ad types in parallel |
| Create | `app/api/edit-studio/quality-score/route.js` | Sprint 7 — GPT-4o scores hook/clarity/offer/cta/pacing |
| Create | `app/edit-studio/v2/page.js` | New agency-feel UI (upload → understand → select → build → gallery) |
| Create | `app/edit-studio/v2/page.module.css` | Styles for v2 UI |
| Modify | `app/edit-studio/page.js` | Route new projects to v2; keep v1 for existing projects |
| Modify | `lib/edit-studio/renderEngine.js` | Handle `voiceover_url` — download + overlay in FFmpeg filter chain |
| Modify | `scripts/render-worker.js` | Pass `voiceover_url` through to `executeRenderJob` |

---

## Sprint 1: Video Understanding Engine

### Task 1: Database Migration

**Files:**
- Create: `supabase/migrations/20260605_edit_studio_v2.sql`

- [ ] **Step 1: Write migration file**

```sql
-- supabase/migrations/20260605_edit_studio_v2.sql

-- ── edit_projects v2 columns ───────────────────────────────────────────────
ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS is_v2              boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS understanding_data jsonb,
  ADD COLUMN IF NOT EXISTS creative_strategy  jsonb;

-- ── edit_ads ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS edit_ads (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id              uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  user_id                 uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ad_type                 text        NOT NULL,
  hook_type               text,
  hook_text               text,
  hooks                   jsonb       NOT NULL DEFAULT '[]',
  script_15s              jsonb       NOT NULL DEFAULT '{}',
  script_30s              jsonb       NOT NULL DEFAULT '{}',
  script_60s              jsonb       NOT NULL DEFAULT '{}',
  selected_duration       text        NOT NULL DEFAULT '30s',
  voiceover_storage_path  text,
  voiceover_voice         text,
  caption_timeline        jsonb       NOT NULL DEFAULT '[]',
  selected_music_bed      jsonb       NOT NULL DEFAULT '{}',
  quality_scores          jsonb       NOT NULL DEFAULT '{}',
  render_job_id           uuid,
  render_export_url       text,
  status                  text        NOT NULL DEFAULT 'draft',
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own edit ads"
  ON edit_ads FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_edit_ads_ts()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER edit_ads_updated_at
  BEFORE UPDATE ON edit_ads
  FOR EACH ROW EXECUTE FUNCTION update_edit_ads_ts();

CREATE INDEX IF NOT EXISTS idx_edit_ads_project
  ON edit_ads(project_id, created_at DESC);
```

- [ ] **Step 2: Apply migration in Supabase Studio**

Open Supabase Studio → SQL Editor → paste and run the migration above.

Expected: no errors, `edit_ads` table visible in Table Editor, `edit_projects` has `is_v2`, `understanding_data`, `creative_strategy` columns.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260605_edit_studio_v2.sql
git commit -m "feat: add edit_ads table and v2 columns on edit_projects"
```

---

### Task 2: Video Understanding API Route

**Files:**
- Create: `app/api/edit-studio/understand/route.js`

- [ ] **Step 1: Create the route file**

```javascript
// app/api/edit-studio/understand/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import https from 'https';
import http from 'http';

const execFileAsync = promisify(execFile);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SYSTEM_PROMPT = `You are a video content analyst specializing in digital advertising.
Analyze the provided video frames and transcript. Identify the product, business type, notable UI screens,
and the strongest moments suitable for ad creative. Respond only with valid JSON.`;

function buildPrompt(transcriptText) {
  return `Analyze this video content and return JSON matching this exact schema:
{
  "detected_products": ["string"],
  "business_type": "saas|ecommerce|service|creator|agency|other",
  "business_description": "one sentence",
  "screens_detected": [{"label": "string", "timestamp_approx": 0, "significance": "high|medium|low"}],
  "key_moments": [{"timestamp_approx": 0, "label": "string", "reason": "string", "score": 8}],
  "weak_moments": [{"timestamp_approx": 0, "label": "string", "reason": "string"}],
  "strong_moments": [{"timestamp_approx": 0, "label": "string", "type": "hook|demo|cta|social_proof"}],
  "recommended_positioning": "founder_authority|product_demo|transformation|problem_solution|social_proof",
  "positioning_reason": "string",
  "recommended_ad_types": ["founder|demo|saas|linkedin|tiktok|ugc|launch|retargeting"],
  "key_messages": ["string"],
  "estimated_duration": 0
}

Transcript:
${transcriptText || '(no speech detected)'}`;
}

async function downloadToTemp(signedUrl, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = signedUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    protocol.get(signedUrl, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function extractFrames(videoPath, framesDir) {
  await execFileAsync('ffmpeg', [
    '-i', videoPath,
    '-vf', 'fps=1/5,scale=512:-1',
    '-frames:v', '15',
    '-q:v', '5',
    path.join(framesDir, 'frame_%04d.jpg'),
  ]);
  return fs.readdirSync(framesDir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .map(f => fs.readFileSync(path.join(framesDir, f)).toString('base64'));
}

export async function POST(request) {
  const { projectId, storagePath, bucket, transcriptSegments } = await request.json();

  if (!projectId || !storagePath) {
    return NextResponse.json({ error: 'projectId and storagePath required' }, { status: 400 });
  }

  const workDir = path.join(os.tmpdir(), `understand_${projectId}_${Date.now()}`);
  fs.mkdirSync(workDir, { recursive: true });
  const videoPath = path.join(workDir, 'source.mp4');
  const framesDir = path.join(workDir, 'frames');
  fs.mkdirSync(framesDir);

  try {
    // Get fresh signed URL
    const { data: urlData, error: urlError } = await supabaseAdmin.storage
      .from(bucket || 'edit-studio-assets')
      .createSignedUrl(storagePath, 300);
    if (urlError) throw urlError;

    await downloadToTemp(urlData.signedUrl, videoPath);

    // Build transcript text for prompt
    const transcriptText = Array.isArray(transcriptSegments)
      ? transcriptSegments.map(s => `[${s.start?.toFixed(1)}s] ${s.text}`).join('\n')
      : '';

    // Extract frames — fall back gracefully if FFmpeg not available
    let frameBase64s = [];
    try {
      frameBase64s = await extractFrames(videoPath, framesDir);
    } catch {
      // FFmpeg unavailable — proceed with transcript-only analysis
    }

    const imageContent = frameBase64s.slice(0, 10).map(b64 => ({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${b64}`, detail: 'low' },
    }));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: buildPrompt(transcriptText) },
            ...imageContent,
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1500,
    });

    const understanding = JSON.parse(response.choices[0].message.content);

    await supabaseAdmin
      .from('edit_projects')
      .update({ understanding_data: understanding, status: 'understood', is_v2: true })
      .eq('id', projectId);

    return NextResponse.json({ understanding });
  } catch (err) {
    console.error('[understand]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}
```

- [ ] **Step 2: Verify the route responds**

Start dev server (`npm run dev`), then:

```bash
curl -X POST http://localhost:3000/api/edit-studio/understand \
  -H "Content-Type: application/json" \
  -d '{"projectId":"test-id","storagePath":"","bucket":"edit-studio-assets","transcriptSegments":[]}'
```

Expected: `{"error":"..."}` (will error on missing Supabase data, but route must parse and not throw 500 from syntax errors).

- [ ] **Step 3: Commit**

```bash
git add app/api/edit-studio/understand/route.js
git commit -m "feat: video understanding engine — frame extraction + GPT-4o vision analysis"
```

---

## Sprint 2: Creative Director + Ad Type Selection

### Task 3: Creative Director API Route

**Files:**
- Create: `app/api/edit-studio/creative-director/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/creative-director/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const AD_TYPE_META = {
  founder:    { label: 'Founder Ad',               icon: '👤', description: 'Personal authority + product story' },
  demo:       { label: 'Product Demo',              icon: '🎬', description: 'Show what it does, step by step' },
  saas:       { label: 'SaaS Ad',                   icon: '💻', description: 'Problem → solution → CTA' },
  linkedin:   { label: 'LinkedIn Authority Video',  icon: '💼', description: 'Professional insight + subtle pitch' },
  tiktok:     { label: 'TikTok Hook Video',         icon: '⚡', description: 'Fast hook, entertainment-led' },
  ugc:        { label: 'UGC Ad',                    icon: '📱', description: 'Authentic, unpolished feel' },
  launch:     { label: 'Product Launch Ad',         icon: '🚀', description: 'Big announcement energy' },
  retargeting:{ label: 'Retargeting Ad',            icon: '🎯', description: 'Assumes awareness, closes with offer' },
};

export async function POST(request) {
  const { projectId, understandingData } = await request.json();

  if (!understandingData) {
    return NextResponse.json({ error: 'understandingData required' }, { status: 400 });
  }

  const prompt = `Based on this video analysis, recommend which ad types to create and why.
Return JSON:
{
  "recommended_order": ["ad_type_keys_in_priority_order"],
  "rationale": {"ad_type_key": "one sentence why this format fits"},
  "primary_recommendation": "ad_type_key",
  "primary_reason": "one sentence",
  "avoid": ["ad_type_keys"],
  "avoid_reason": {"ad_type_key": "why to skip"}
}

Video analysis:
${JSON.stringify(understandingData, null, 2)}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a creative director at a top performance marketing agency.' },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 600,
  });

  const strategy = JSON.parse(response.choices[0].message.content);

  // Enrich with meta
  const adTypes = Object.entries(AD_TYPE_META).map(([key, meta]) => ({
    key,
    ...meta,
    recommended: strategy.recommended_order?.includes(key) ?? false,
    rationale: strategy.rationale?.[key] || null,
    avoid: strategy.avoid?.includes(key) ?? false,
    avoid_reason: strategy.avoid_reason?.[key] || null,
    priority: strategy.recommended_order?.indexOf(key) ?? 99,
  })).sort((a, b) => a.priority - b.priority);

  const result = { strategy, adTypes };

  if (projectId) {
    await supabaseAdmin
      .from('edit_projects')
      .update({ creative_strategy: result })
      .eq('id', projectId);
  }

  return NextResponse.json(result);
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/creative-director/route.js
git commit -m "feat: creative director — GPT-4o ad type strategy from video understanding"
```

---

## Sprint 3: Hook Generator + Script Generator

### Task 4: Shared adGenerator Library

**Files:**
- Create: `app/lib/edit-studio/adGenerator.js`

- [ ] **Step 1: Create the library**

```javascript
// app/lib/edit-studio/adGenerator.js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const HOOK_TYPES = ['curiosity', 'problem', 'authority', 'transformation', 'contrarian'];

export async function generateHooks(adType, understandingData) {
  const context = `
Product: ${understandingData.detected_products?.join(', ')}
Business: ${understandingData.business_description}
Key messages: ${understandingData.key_messages?.join('; ')}
Positioning: ${understandingData.recommended_positioning}`;

  const prompt = `Write 5 ad hooks for a ${adType} ad. Each under 15 words. Specific to this product (not generic).
Return JSON:
{
  "hooks": [
    {"type": "curiosity",       "text": "..."},
    {"type": "problem",         "text": "..."},
    {"type": "authority",       "text": "..."},
    {"type": "transformation",  "text": "..."},
    {"type": "contrarian",      "text": "..."}
  ]
}

${context}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an expert direct-response copywriter. Hooks must be specific, not generic.' },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 400,
  });

  return JSON.parse(res.choices[0].message.content).hooks;
}

export async function generateScripts(adType, hookText, understandingData) {
  const context = `
Product: ${understandingData.detected_products?.join(', ')}
Business: ${understandingData.business_description}
Key messages: ${understandingData.key_messages?.join('; ')}`;

  const prompt = `Write ad scripts for a ${adType} ad. Opening hook: "${hookText}"
Each script has hook, body, and cta sections.
15s = under 40 words total. 30s = under 85 words. 60s = under 175 words.
Return JSON:
{
  "15s": {"hook": "...", "body": "...", "cta": "..."},
  "30s": {"hook": "...", "body": "...", "cta": "..."},
  "60s": {"hook": "...", "body": "...", "cta": "..."}
}

${context}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an expert direct-response copywriter. Every sentence must be short enough to read as a caption.' },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 800,
  });

  return JSON.parse(res.choices[0].message.content);
}

export function scriptToCaptions(scriptObj, targetDurationSecs) {
  const sections = [
    { text: scriptObj.hook, type: 'hook',   weight: 0.25 },
    { text: scriptObj.body, type: 'body',   weight: 0.60 },
    { text: scriptObj.cta,  type: 'cta',    weight: 0.15 },
  ];

  const captions = [];
  let currentTime = 0;
  let id = 0;

  for (const section of sections) {
    if (!section.text) continue;
    const sectionDuration = targetDurationSecs * section.weight;
    const words = section.text.split(' ').filter(Boolean);
    const chunkSize = section.type === 'hook' ? 3 : 4;
    const chunks = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }
    const chunkDuration = Math.max(0.5, sectionDuration / chunks.length);

    for (const chunk of chunks) {
      captions.push({
        id: `cap_${id++}`,
        text: chunk.toUpperCase(),
        start: parseFloat(currentTime.toFixed(2)),
        end:   parseFloat((currentTime + chunkDuration).toFixed(2)),
        type:  section.type,
        style: section.type === 'hook' ? 'bold' : 'clean',
      });
      currentTime += chunkDuration;
    }
  }

  return captions;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/lib/edit-studio/adGenerator.js
git commit -m "feat: shared adGenerator lib — hooks, scripts, script-to-captions"
```

---

### Task 5: Hooks Route

**Files:**
- Create: `app/api/edit-studio/hooks/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/hooks/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateHooks } from '@/app/lib/edit-studio/adGenerator';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const { adId, projectId, adType, understandingData } = await request.json();

  if (!adType || !understandingData) {
    return NextResponse.json({ error: 'adType and understandingData required' }, { status: 400 });
  }

  const hooks = await generateHooks(adType, understandingData);
  const primaryHook = hooks.find(h => h.type === 'curiosity') || hooks[0];

  if (adId) {
    await supabaseAdmin
      .from('edit_ads')
      .update({
        hooks,
        hook_type: primaryHook.type,
        hook_text: primaryHook.text,
        status: 'hooks_generated',
      })
      .eq('id', adId);
  }

  return NextResponse.json({ hooks, primaryHook });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/hooks/route.js
git commit -m "feat: hooks route — 5 hook archetypes per ad type"
```

---

### Task 6: Scripts Route

**Files:**
- Create: `app/api/edit-studio/scripts/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/scripts/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateScripts } from '@/app/lib/edit-studio/adGenerator';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const { adId, adType, hookText, understandingData } = await request.json();

  if (!adType || !hookText || !understandingData) {
    return NextResponse.json({ error: 'adType, hookText, and understandingData required' }, { status: 400 });
  }

  const scripts = await generateScripts(adType, hookText, understandingData);

  if (adId) {
    await supabaseAdmin
      .from('edit_ads')
      .update({
        script_15s: scripts['15s'],
        script_30s: scripts['30s'],
        script_60s: scripts['60s'],
        status: 'scripted',
      })
      .eq('id', adId);
  }

  return NextResponse.json({ scripts });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/scripts/route.js
git commit -m "feat: scripts route — 15s/30s/60s ad scripts with hook/body/cta"
```

---

## Sprint 4: Voice Studio

### Task 7: Voice Synthesis Route

**Files:**
- Create: `app/api/edit-studio/voice/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/voice/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const VOICE_MAP = {
  founder_male:       'onyx',
  professional_male:  'echo',
  professional_female:'nova',
  ugc_creator:        'fable',
  energetic_creator:  'shimmer',
};

export const VOICE_OPTIONS = [
  { key: 'founder_male',        label: 'Founder Male',        description: 'Deep, authoritative' },
  { key: 'professional_male',   label: 'Professional Male',   description: 'Clear, trustworthy' },
  { key: 'professional_female', label: 'Professional Female', description: 'Warm, confident' },
  { key: 'ugc_creator',         label: 'UGC Creator',         description: 'Casual, authentic' },
  { key: 'energetic_creator',   label: 'Energetic Creator',   description: 'High energy, punchy' },
];

export async function POST(request) {
  const { adId, projectId, scriptText, voiceKey, duration } = await request.json();

  if (!scriptText || !voiceKey || !projectId) {
    return NextResponse.json({ error: 'scriptText, voiceKey, and projectId required' }, { status: 400 });
  }

  const voice = VOICE_MAP[voiceKey];
  if (!voice) {
    return NextResponse.json({ error: `Unknown voiceKey: ${voiceKey}` }, { status: 400 });
  }

  const mp3Response = await openai.audio.speech.create({
    model: 'tts-1-hd',
    voice,
    input: scriptText,
    speed: 1.0,
  });

  const audioBuffer = Buffer.from(await mp3Response.arrayBuffer());
  const storagePath = `voiceovers/${projectId}/${adId || Date.now()}.mp3`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from('edit-studio-assets')
    .upload(storagePath, audioBuffer, { contentType: 'audio/mpeg', upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = await supabaseAdmin.storage
    .from('edit-studio-assets')
    .createSignedUrl(storagePath, 3600);

  if (adId) {
    await supabaseAdmin
      .from('edit_ads')
      .update({
        voiceover_storage_path: storagePath,
        voiceover_voice: voiceKey,
        status: 'voiced',
      })
      .eq('id', adId);
  }

  return NextResponse.json({
    voiceover_url: urlData.signedUrl,
    storage_path: storagePath,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/voice/route.js
git commit -m "feat: voice studio — OpenAI TTS synthesis with 5 voice personalities"
```

---

## Sprint 5: Caption Intelligence

### Task 8: Caption-from-Script Route

**Files:**
- Create: `app/api/edit-studio/caption-from-script/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/caption-from-script/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { scriptToCaptions } from '@/app/lib/edit-studio/adGenerator';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const DURATION_MAP = { '15s': 15, '30s': 30, '60s': 60 };

export async function POST(request) {
  const { adId, scriptObj, selectedDuration } = await request.json();

  if (!scriptObj || !selectedDuration) {
    return NextResponse.json({ error: 'scriptObj and selectedDuration required' }, { status: 400 });
  }

  const durationSecs = DURATION_MAP[selectedDuration] || 30;
  const captions = scriptToCaptions(scriptObj, durationSecs);

  if (adId) {
    await supabaseAdmin
      .from('edit_ads')
      .update({ caption_timeline: captions, status: 'captioned' })
      .eq('id', adId);
  }

  return NextResponse.json({ captions });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/caption-from-script/route.js
git commit -m "feat: caption intelligence — script-driven timed captions (not transcript)"
```

---

## Sprint 6: Auto Ad Factory + Render Engine Update

### Task 9: Auto Factory Route

**Files:**
- Create: `app/api/edit-studio/auto-factory/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/auto-factory/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateHooks, generateScripts, scriptToCaptions } from '@/app/lib/edit-studio/adGenerator';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const VOICE_MAP = {
  founder_male: 'onyx', professional_male: 'echo',
  professional_female: 'nova', ugc_creator: 'fable', energetic_creator: 'shimmer',
};
const DURATION_MAP = { '15s': 15, '30s': 30, '60s': 60 };

async function buildSingleAd({ projectId, userId, adType, voiceKey, selectedDuration, understandingData }) {
  const durationSecs = DURATION_MAP[selectedDuration] || 30;
  const durationKey = selectedDuration || '30s';

  // Create ad row
  const { data: adRow, error: insertErr } = await supabaseAdmin
    .from('edit_ads')
    .insert({ project_id: projectId, user_id: userId, ad_type: adType, selected_duration: durationKey, status: 'draft' })
    .select('id')
    .single();
  if (insertErr) throw insertErr;
  const adId = adRow.id;

  // Generate hooks
  const hooks = await generateHooks(adType, understandingData);
  const primaryHook = hooks.find(h => h.type === 'curiosity') || hooks[0];

  // Generate scripts
  const scripts = await generateScripts(adType, primaryHook.text, understandingData);
  const scriptObj = scripts[durationKey] || scripts['30s'];

  // Generate voiceover
  const scriptText = [scriptObj.hook, scriptObj.body, scriptObj.cta].filter(Boolean).join(' ');
  const voiceId = VOICE_MAP[voiceKey] || 'nova';

  const mp3Response = await openai.audio.speech.create({
    model: 'tts-1-hd', voice: voiceId, input: scriptText, speed: 1.0,
  });
  const audioBuffer = Buffer.from(await mp3Response.arrayBuffer());
  const storagePath = `voiceovers/${projectId}/${adId}.mp3`;

  await supabaseAdmin.storage
    .from('edit-studio-assets')
    .upload(storagePath, audioBuffer, { contentType: 'audio/mpeg', upsert: true });

  // Generate captions
  const captions = scriptToCaptions(scriptObj, durationSecs);

  // Persist all
  await supabaseAdmin.from('edit_ads').update({
    hooks,
    hook_type: primaryHook.type,
    hook_text: primaryHook.text,
    script_15s: scripts['15s'],
    script_30s: scripts['30s'],
    script_60s: scripts['60s'],
    voiceover_storage_path: storagePath,
    voiceover_voice: voiceKey,
    caption_timeline: captions,
    status: 'captioned',
  }).eq('id', adId);

  return { adId, adType, status: 'captioned' };
}

export async function POST(request) {
  const { projectId, adTypes, voiceKey, selectedDuration } = await request.json();

  if (!projectId || !adTypes?.length) {
    return NextResponse.json({ error: 'projectId and adTypes required' }, { status: 400 });
  }

  // Get project + user
  const { data: project, error: projErr } = await supabaseAdmin
    .from('edit_projects')
    .select('user_id, understanding_data, creative_strategy')
    .eq('id', projectId)
    .single();
  if (projErr || !project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  if (!project.understanding_data) {
    return NextResponse.json({ error: 'Run video understanding first' }, { status: 400 });
  }

  // Build all ads in parallel
  const results = await Promise.allSettled(
    adTypes.map(adType => buildSingleAd({
      projectId,
      userId: project.user_id,
      adType,
      voiceKey: voiceKey || 'professional_female',
      selectedDuration: selectedDuration || '30s',
      understandingData: project.understanding_data,
    }))
  );

  const ads = results.map((r, i) => ({
    adType: adTypes[i],
    success: r.status === 'fulfilled',
    adId:    r.status === 'fulfilled' ? r.value.adId : null,
    error:   r.status === 'rejected'  ? r.reason?.message : null,
  }));

  return NextResponse.json({ ads });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/auto-factory/route.js
git commit -m "feat: auto ad factory — parallel hooks+scripts+voice+captions for all ad types"
```

---

### Task 10: Update renderEngine.js for Voiceover

**Files:**
- Modify: `lib/edit-studio/renderEngine.js`

- [ ] **Step 1: Read the current buildFullFfmpegArgs function signature**

Read `lib/edit-studio/renderEngine.js` and find the section that builds the FFmpeg audio filter (look for `amix` or `afade`). Note the exact lines.

- [ ] **Step 2: Add voiceover support to the audio filter chain**

Find the audio section of `buildFullFfmpegArgs`. It currently builds audio from the source video + optional music bed. Add voiceover as a third audio source.

The change: if `renderPlan.voiceover_path` is set in the render plan, download it to a temp file and add it as an input. In the filter complex, use the voiceover audio instead of the original video audio:

```javascript
// Inside buildFullFfmpegArgs, in the audio filter section:
// BEFORE (existing):
// [0:a]volume=1.0[voice]; [1:a]afade...[music]; [voice][music]amix=inputs=2[audio_out]

// AFTER (with voiceover support):
if (voiceoverPath) {
  // inputs: 0=video, 1=voiceover_mp3, 2=music_bed
  filterLines.push(`[1:a]volume=1.0[vo]`);
  if (musicInputIndex) {
    filterLines.push(`[${musicInputIndex}:a]volume=${musicVolume},afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${fadeOutStart}:d=${fadeOut}[music]`);
    filterLines.push(`[vo][music]amix=inputs=2:duration=first[audio_out]`);
  } else {
    filterLines.push(`[vo]anull[audio_out]`);
  }
} else {
  // existing logic — original video audio + optional music
}
```

The exact modification depends on the current renderEngine.js structure. Read the file first (Step 1) to get exact line numbers and current variable names before writing the diff.

- [ ] **Step 3: Update render worker to download voiceover before passing to renderEngine**

In `scripts/render-worker.js`, in the `executeJob` section where it downloads the source video, add:

```javascript
// After source video download, before ffmpeg:
if (renderPlan.voiceover_storage_path) {
  const { data: voiceUrlData } = await supabaseAdmin.storage
    .from('edit-studio-assets')
    .createSignedUrl(renderPlan.voiceover_storage_path, 300);
  await downloadToTemp(voiceUrlData.signedUrl, voiceoverPath);
  renderPlan.voiceover_path = voiceoverPath; // local path for FFmpeg
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/edit-studio/renderEngine.js scripts/render-worker.js
git commit -m "feat: render engine — voiceover audio support in FFmpeg filter chain"
```

---

## Sprint 7: Quality Engine

### Task 11: Quality Score Route

**Files:**
- Create: `app/api/edit-studio/quality-score/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/quality-score/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SCORE_SYSTEM = `You are a performance marketing expert scoring ad scripts.
Score each dimension 1-10. Be honest — generic or weak copy scores low. Return only JSON.`;

export async function POST(request) {
  const { adId, adType, hookText, scriptObj, selectedDuration } = await request.json();

  if (!hookText || !scriptObj) {
    return NextResponse.json({ error: 'hookText and scriptObj required' }, { status: 400 });
  }

  const scriptText = [scriptObj.hook, scriptObj.body, scriptObj.cta].filter(Boolean).join('\n');

  const prompt = `Score this ${selectedDuration || '30s'} ${adType || ''} ad:

Hook: ${hookText}
Script:
${scriptText}

Return JSON:
{
  "hook":    {"score": 0, "reason": "one sentence"},
  "clarity": {"score": 0, "reason": "one sentence"},
  "offer":   {"score": 0, "reason": "one sentence"},
  "cta":     {"score": 0, "reason": "one sentence"},
  "pacing":  {"score": 0, "reason": "one sentence"},
  "overall": 0,
  "grade":   "A|B|C|D",
  "top_suggestion": "most impactful single change"
}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SCORE_SYSTEM },
      { role: 'user',   content: prompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 400,
  });

  const scores = JSON.parse(res.choices[0].message.content);

  if (adId) {
    await supabaseAdmin
      .from('edit_ads')
      .update({ quality_scores: scores, status: 'scored' })
      .eq('id', adId);
  }

  return NextResponse.json({ scores });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/edit-studio/quality-score/route.js
git commit -m "feat: quality engine — GPT-4o scores hook/clarity/offer/cta/pacing before render"
```

---

## Sprint 1–7: New v2 UI

### Task 12: v2 Page Skeleton

**Files:**
- Create: `app/edit-studio/v2/page.js`
- Create: `app/edit-studio/v2/page.module.css`

- [ ] **Step 1: Create the CSS module**

```css
/* app/edit-studio/v2/page.module.css */
.page { min-height: 100vh; background: #0a0a0a; color: #fff; font-family: var(--font-sans); }

/* Upload screen */
.uploadScreen { display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 100vh; gap: 32px; padding: 40px; }
.headline { font-size: 2.5rem; font-weight: 700; text-align: center; max-width: 600px; line-height: 1.2; }
.subline { color: #888; font-size: 1.1rem; text-align: center; }
.dropZone { width: 100%; max-width: 520px; border: 2px dashed #333; border-radius: 16px;
  padding: 60px 40px; text-align: center; cursor: pointer; transition: border-color 0.2s; }
.dropZone:hover, .dropZone.dragOver { border-color: #fff; }
.dropZoneIcon { font-size: 3rem; margin-bottom: 16px; }
.dropZoneText { font-size: 1.1rem; color: #aaa; }
.dropZoneHint { font-size: 0.85rem; color: #555; margin-top: 8px; }

/* Understanding screen */
.understandScreen { display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 100vh; gap: 24px; padding: 40px; }
.analysisCard { background: #111; border: 1px solid #222; border-radius: 16px;
  padding: 32px; width: 100%; max-width: 640px; }
.analysisTitle { font-size: 1.4rem; font-weight: 700; margin-bottom: 24px; }
.detectedItem { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;
  border-bottom: 1px solid #1a1a1a; }
.detectedItem:last-child { border-bottom: none; }
.detectedLabel { color: #555; font-size: 0.85rem; min-width: 140px; }
.detectedValue { color: #fff; font-size: 0.95rem; }
.pillList { display: flex; flex-wrap: wrap; gap: 6px; }
.pill { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 20px;
  padding: 4px 12px; font-size: 0.8rem; color: #ccc; }
.pillHighlight { background: #1a2a1a; border-color: #2a4a2a; color: #6fcf6f; }
.ctaRow { display: flex; gap: 12px; margin-top: 24px; }
.btnPrimary { background: #fff; color: #000; border: none; border-radius: 8px;
  padding: 12px 28px; font-size: 1rem; font-weight: 600; cursor: pointer; }
.btnSecondary { background: transparent; color: #fff; border: 1px solid #333; border-radius: 8px;
  padding: 12px 28px; font-size: 1rem; cursor: pointer; }

/* Creative Director screen */
.cdScreen { max-width: 800px; margin: 0 auto; padding: 60px 40px; }
.cdHeadline { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
.cdSubline { color: #666; margin-bottom: 40px; }
.adTypeGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;
  margin-bottom: 32px; }
.adTypeCard { background: #111; border: 2px solid #1a1a1a; border-radius: 12px;
  padding: 20px; cursor: pointer; transition: border-color 0.15s; }
.adTypeCard:hover { border-color: #333; }
.adTypeCard.selected { border-color: #fff; background: #141414; }
.adTypeCard.recommended { border-color: #2a3a2a; }
.adTypeIcon { font-size: 1.8rem; margin-bottom: 10px; }
.adTypeLabel { font-weight: 600; margin-bottom: 4px; }
.adTypeDesc { font-size: 0.8rem; color: #666; }
.adTypeRationale { font-size: 0.75rem; color: #4a8a4a; margin-top: 6px; }
.generateAllBtn { width: 100%; padding: 16px; background: #fff; color: #000;
  border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer;
  margin-bottom: 12px; }
.generateSelectedBtn { width: 100%; padding: 16px; background: transparent; color: #fff;
  border: 1px solid #333; border-radius: 10px; font-size: 1rem; cursor: pointer; }

/* Factory screen */
.factoryScreen { max-width: 640px; margin: 0 auto; padding: 60px 40px; }
.factoryTitle { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; }
.adProgress { display: flex; flex-direction: column; gap: 12px; }
.adProgressRow { display: flex; align-items: center; gap: 16px; padding: 16px;
  background: #111; border-radius: 10px; border: 1px solid #1a1a1a; }
.adProgressIcon { font-size: 1.4rem; }
.adProgressInfo { flex: 1; }
.adProgressType { font-weight: 600; }
.adProgressStatus { font-size: 0.8rem; color: #666; margin-top: 2px; }
.adProgressBadge { font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; }
.badgeDone { background: #1a2a1a; color: #6fcf6f; }
.badgeBuilding { background: #1a1a2a; color: #6f9fcf; }
.badgeError { background: #2a1a1a; color: #cf6f6f; }

/* Gallery screen */
.galleryScreen { max-width: 900px; margin: 0 auto; padding: 60px 40px; }
.galleryTitle { font-size: 2rem; font-weight: 700; margin-bottom: 32px; }
.adGallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.adCard { background: #111; border: 1px solid #1a1a1a; border-radius: 14px; overflow: hidden; }
.adCardHeader { padding: 20px; border-bottom: 1px solid #1a1a1a; }
.adCardType { font-weight: 700; font-size: 1.05rem; }
.adCardDuration { font-size: 0.8rem; color: #555; }
.adCardBody { padding: 20px; }
.adCardHook { font-size: 0.9rem; color: #ccc; margin-bottom: 12px; font-style: italic; }
.scoreRow { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.scorePill { font-size: 0.7rem; padding: 3px 8px; border-radius: 10px; background: #1a1a1a;
  color: #aaa; border: 1px solid #2a2a2a; }
.scoreGrade { font-weight: 700; padding: 3px 10px; border-radius: 10px; font-size: 0.75rem; }
.gradeA { background: #1a2a1a; color: #6fcf6f; }
.gradeB { background: #1a221a; color: #9fcf6f; }
.gradeC { background: #2a2a1a; color: #cfcf6f; }
.gradeD { background: #2a1a1a; color: #cf6f6f; }
.adCardActions { display: flex; gap: 8px; }
.btnSmall { flex: 1; padding: 8px; border-radius: 8px; font-size: 0.85rem; cursor: pointer;
  border: 1px solid #2a2a2a; background: #1a1a1a; color: #fff; }
.btnSmallPrimary { background: #fff; color: #000; border-color: #fff; }

/* Shared */
.spinner { width: 48px; height: 48px; border: 3px solid #222; border-top-color: #fff;
  border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.statusText { color: #555; font-size: 0.9rem; }
.progressBar { width: 100%; height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; }
.progressFill { height: 100%; background: #fff; transition: width 0.3s; }
```

- [ ] **Step 2: Create the main v2 page**

```javascript
// app/edit-studio/v2/page.js
'use client';
import { useState, useRef, useCallback } from 'react';
import styles from './page.module.css';

const SCREENS = ['upload', 'understanding', 'creative-director', 'factory', 'gallery'];

const AD_TYPE_ICONS = {
  founder: '👤', demo: '🎬', saas: '💻', linkedin: '💼',
  tiktok: '⚡', ugc: '📱', launch: '🚀', retargeting: '🎯',
};

export default function EditStudioV2() {
  const [screen, setScreen] = useState('upload');
  const [project, setProject] = useState(null);
  const [understanding, setUnderstanding] = useState(null);
  const [adTypes, setAdTypes] = useState([]);
  const [selectedAdTypes, setSelectedAdTypes] = useState([]);
  const [ads, setAds] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // ── Upload ──────────────────────────────────────────────────────────────
  const handleFileSelect = useCallback(async (file) => {
    if (!file || !file.type.startsWith('video/')) return;
    setStatusMsg('Uploading...');
    setProgress(10);

    // 1. Create project row
    const createRes = await fetch('/api/edit-studio/upload-source', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const { projectId, uploadUrl, storagePath, bucket, publicUrl } = await createRes.json();
    setProject({ id: projectId, storagePath, bucket, sourceUrl: publicUrl });

    // 2. Upload file directly to Supabase
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    setProgress(30);

    // 3. Transcribe
    setStatusMsg('Transcribing audio...');
    const transcribeRes = await fetch('/api/edit-studio/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, sourceVideoUrl: publicUrl, storagePath, bucket }),
    });
    const { segments: transcriptSegments } = await transcribeRes.json();
    setProgress(55);

    // 4. Understand (vision + transcript)
    setScreen('understanding');
    setStatusMsg('Analyzing video content...');
    const understandRes = await fetch('/api/edit-studio/understand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, storagePath, bucket, transcriptSegments }),
    });
    const { understanding: u } = await understandRes.json();
    setUnderstanding(u);
    setProgress(75);

    // 5. Creative Director
    setStatusMsg('Building creative strategy...');
    const cdRes = await fetch('/api/edit-studio/creative-director', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, understandingData: u }),
    });
    const { adTypes: types } = await cdRes.json();
    setAdTypes(types);
    setProgress(100);
    setStatusMsg('');
    setScreen('creative-director');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  // ── Ad Type Selection ───────────────────────────────────────────────────
  const toggleAdType = (key) => {
    setSelectedAdTypes(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // ── Factory ─────────────────────────────────────────────────────────────
  const runFactory = useCallback(async (typesToBuild) => {
    setSelectedAdTypes(typesToBuild);
    setAds(typesToBuild.map(t => ({ adType: t, status: 'building' })));
    setScreen('factory');

    const res = await fetch('/api/edit-studio/auto-factory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: project.id,
        adTypes: typesToBuild,
        voiceKey: 'professional_female',
        selectedDuration: '30s',
      }),
    });
    const { ads: builtAds } = await res.json();

    // Score each ad
    const scored = await Promise.allSettled(
      builtAds.filter(a => a.success).map(async (ad) => {
        const adData = await fetch(`/api/edit-studio/hooks?adId=${ad.adId}`, {
          method: 'GET',
        }).then(r => r.json()).catch(() => null);

        const scoreRes = await fetch('/api/edit-studio/quality-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adId: ad.adId,
            adType: ad.adType,
            hookText: adData?.hooks?.[0]?.text || '',
            scriptObj: adData?.script_30s || {},
            selectedDuration: '30s',
          }),
        });
        const { scores } = await scoreRes.json();
        return { ...ad, scores };
      })
    );

    const finalAds = builtAds.map(ad => {
      const scoredAd = scored.find(r => r.status === 'fulfilled' && r.value.adId === ad.adId);
      return { ...ad, scores: scoredAd?.value?.scores || null };
    });

    setAds(finalAds);
    setTimeout(() => setScreen('gallery'), 800);
  }, [project]);

  // ── Fetch ad details for gallery ────────────────────────────────────────
  const [adDetails, setAdDetails] = useState({});

  const loadAdDetails = useCallback(async (adId) => {
    if (adDetails[adId]) return;
    const { data } = await fetch(`/api/edit-studio/ad-detail?adId=${adId}`).then(r => r.json()).catch(() => ({}));
    if (data) setAdDetails(prev => ({ ...prev, [adId]: data }));
  }, [adDetails]);

  // ── Render ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      {screen === 'upload' && (
        <div className={styles.uploadScreen}>
          <h1 className={styles.headline}>Turn one video into five ads.</h1>
          <p className={styles.subline}>Upload your raw footage. AI does the rest.</p>
          <div
            className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className={styles.dropZoneIcon}>🎬</div>
            <div className={styles.dropZoneText}>Drop your video here</div>
            <div className={styles.dropZoneHint}>MP4, MOV, WebM — up to 500MB</div>
          </div>
          <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }}
            onChange={e => handleFileSelect(e.target.files[0])} />
          {statusMsg && <p className={styles.statusText}>{statusMsg}</p>}
          {progress > 0 && progress < 100 && (
            <div className={styles.progressBar} style={{ width: 520 }}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      )}

      {screen === 'understanding' && (
        <div className={styles.understandScreen}>
          {!understanding ? (
            <>
              <div className={styles.spinner} />
              <p className={styles.statusText}>{statusMsg || 'Analyzing...'}</p>
            </>
          ) : (
            <div className={styles.analysisCard}>
              <div className={styles.analysisTitle}>Here is what we found</div>
              <div className={styles.detectedItem}>
                <span className={styles.detectedLabel}>Products detected</span>
                <div className={styles.pillList}>
                  {understanding.detected_products?.map(p => (
                    <span key={p} className={`${styles.pill} ${styles.pillHighlight}`}>{p}</span>
                  ))}
                </div>
              </div>
              <div className={styles.detectedItem}>
                <span className={styles.detectedLabel}>Business type</span>
                <span className={styles.detectedValue}>{understanding.business_description}</span>
              </div>
              <div className={styles.detectedItem}>
                <span className={styles.detectedLabel}>Recommended angle</span>
                <span className={styles.detectedValue}>{understanding.recommended_positioning?.replace(/_/g, ' ')}</span>
              </div>
              <div className={styles.detectedItem}>
                <span className={styles.detectedLabel}>Key messages</span>
                <div className={styles.pillList}>
                  {understanding.key_messages?.map(m => (
                    <span key={m} className={styles.pill}>{m}</span>
                  ))}
                </div>
              </div>
              <div className={styles.ctaRow}>
                <button className={styles.btnPrimary} onClick={() => setScreen('creative-director')}>
                  Choose ad types →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {screen === 'creative-director' && (
        <div className={styles.cdScreen}>
          <h2 className={styles.cdHeadline}>What would you like to create?</h2>
          <p className={styles.cdSubline}>Select the formats. AI generates everything.</p>
          <div className={styles.adTypeGrid}>
            {adTypes.map(t => (
              <div
                key={t.key}
                className={`${styles.adTypeCard} ${selectedAdTypes.includes(t.key) ? styles.selected : ''} ${t.recommended ? styles.recommended : ''}`}
                onClick={() => toggleAdType(t.key)}
              >
                <div className={styles.adTypeIcon}>{AD_TYPE_ICONS[t.key]}</div>
                <div className={styles.adTypeLabel}>{t.label}</div>
                <div className={styles.adTypeDesc}>{t.description}</div>
                {t.rationale && <div className={styles.adTypeRationale}>{t.rationale}</div>}
              </div>
            ))}
          </div>
          <button className={styles.generateAllBtn}
            onClick={() => runFactory(adTypes.map(t => t.key))}>
            Generate All ({adTypes.length} ads)
          </button>
          <button className={styles.generateSelectedBtn}
            disabled={selectedAdTypes.length === 0}
            onClick={() => runFactory(selectedAdTypes)}>
            Generate Selected ({selectedAdTypes.length})
          </button>
        </div>
      )}

      {screen === 'factory' && (
        <div className={styles.factoryScreen}>
          <h2 className={styles.factoryTitle}>Building your ads...</h2>
          <div className={styles.adProgress}>
            {ads.map(ad => (
              <div key={ad.adType} className={styles.adProgressRow}>
                <span className={styles.adProgressIcon}>{AD_TYPE_ICONS[ad.adType]}</span>
                <div className={styles.adProgressInfo}>
                  <div className={styles.adProgressType}>{ad.adType.charAt(0).toUpperCase() + ad.adType.slice(1)} Ad</div>
                  <div className={styles.adProgressStatus}>
                    {ad.status === 'building' ? 'Generating hooks, script, voice, captions...' : ad.success ? 'Complete' : `Error: ${ad.error}`}
                  </div>
                </div>
                <span className={`${styles.adProgressBadge} ${ad.status === 'building' ? styles.badgeBuilding : ad.success ? styles.badgeDone : styles.badgeError}`}>
                  {ad.status === 'building' ? '...' : ad.success ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'gallery' && (
        <div className={styles.galleryScreen}>
          <h2 className={styles.galleryTitle}>Your ads are ready.</h2>
          <div className={styles.adGallery}>
            {ads.filter(a => a.success).map(ad => {
              const grade = ad.scores?.grade || '—';
              const gradeClass = grade === 'A' ? styles.gradeA : grade === 'B' ? styles.gradeB : grade === 'C' ? styles.gradeC : styles.gradeD;
              return (
                <div key={ad.adType} className={styles.adCard}>
                  <div className={styles.adCardHeader}>
                    <div className={styles.adCardType}>{AD_TYPE_ICONS[ad.adType]} {ad.adType.charAt(0).toUpperCase() + ad.adType.slice(1)} Ad</div>
                    <div className={styles.adCardDuration}>30s · Hooks + Script + Voice + Captions</div>
                  </div>
                  <div className={styles.adCardBody}>
                    {ad.scores && (
                      <>
                        <div className={styles.scoreRow}>
                          <span className={`${styles.scoreGrade} ${gradeClass}`}>{grade}</span>
                          {['hook','clarity','offer','cta','pacing'].map(k => (
                            <span key={k} className={styles.scorePill}>{k} {ad.scores[k]?.score}/10</span>
                          ))}
                        </div>
                        {ad.scores.top_suggestion && (
                          <div className={styles.adCardHook}>💡 {ad.scores.top_suggestion}</div>
                        )}
                      </>
                    )}
                    <div className={styles.adCardActions}>
                      <button className={`${styles.btnSmall} ${styles.btnSmallPrimary}`}
                        onClick={() => window.location.href = `/edit-studio/ad/${ad.adId}`}>
                        Open
                      </button>
                      <button className={styles.btnSmall}>Render</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/edit-studio/v2/page.js app/edit-studio/v2/page.module.css
git commit -m "feat: edit studio v2 UI — agency-feel upload→understand→create→gallery flow"
```

---

### Task 13: Wire v2 into main Edit Studio page

**Files:**
- Modify: `app/edit-studio/page.js`

- [ ] **Step 1: Read the top of page.js to find where the component renders**

Read `app/edit-studio/page.js` lines 1-40. Find the `export default function` declaration.

- [ ] **Step 2: Add v2 routing**

At the top of `app/edit-studio/page.js`, after the existing imports, add:

```javascript
import EditStudioV2 from './v2/page';
```

Inside the main component, before the existing return, add a check:

```javascript
// New projects go to v2. The URL param ?v2=1 or a new project triggers v2.
// Existing loaded projects stay on v1.
const searchParams = typeof window !== 'undefined' 
  ? new URLSearchParams(window.location.search) : null;
const forceV2 = searchParams?.get('v2') === '1';

if (forceV2 || (!currentProject && !isLoading)) {
  return <EditStudioV2 />;
}
```

This ensures: `/edit-studio` (no project loaded) → v2, `/edit-studio?v2=1` → v2, existing projects → v1.

- [ ] **Step 3: Verify routing**

`npm run dev`, navigate to `http://localhost:3000/edit-studio`. Should show v2 upload screen.
Navigate to `http://localhost:3000/edit-studio?project=<existing-id>`. Should show v1 advanced editor.

- [ ] **Step 4: Commit**

```bash
git add app/edit-studio/page.js
git commit -m "feat: route new edit studio sessions to v2 UI"
```

---

## Self-Review: Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Video Understanding — product, business, screens, moments | Task 2 (understand/route.js) |
| Vision-based (not transcript-only) | Task 2 — frame extraction + GPT-4o vision |
| Creative Director — ad type selection | Task 3 + Task 13 UI |
| Generate All option | Task 13 UI — `generateAllBtn` |
| 5 hook archetypes per ad | Task 4 (adGenerator.js) + Task 5 |
| 15s/30s/60s scripts with hook/body/CTA | Task 4 + Task 6 |
| Voice Studio — 5 voices | Task 7 (voice/route.js) |
| Captions from script (not transcript) | Task 4 + Task 8 |
| Auto Ad Factory — single upload → multiple ads | Task 9 (auto-factory) |
| Quality Engine — 5 scores + suggestion | Task 11 |
| Rendered output | Sprint 6 Task 10 (render engine voiceover update) |
| Upload → Understanding → Creative Director → Gallery flow | Task 12 (v2 UI) |

**Gap identified:** The spec says ads should be rendered to MP4 with voiceover. Task 10 (renderEngine.js update) covers the voiceover plumbing, but the "Render" button in the gallery (Task 12) calls `/api/edit-studio/render` with a render plan built from the `edit_ad` row. A thin wrapper route is needed to translate an `edit_ad` into a render plan. Add this as the final task.

---

### Task 14: Ad-to-Render Wrapper Route

**Files:**
- Create: `app/api/edit-studio/render-ad/route.js`

- [ ] **Step 1: Create the route**

```javascript
// app/api/edit-studio/render-ad/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const { adId } = await request.json();
  if (!adId) return NextResponse.json({ error: 'adId required' }, { status: 400 });

  const { data: ad, error } = await supabaseAdmin
    .from('edit_ads')
    .select('*, edit_projects(source_video_storage_path, source_video_bucket, understanding_data)')
    .eq('id', adId)
    .single();

  if (error || !ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });

  const project = ad.edit_projects;
  const scriptObj = ad.selected_duration === '15s' ? ad.script_15s
    : ad.selected_duration === '60s' ? ad.script_60s : ad.script_30s;

  const durationSecs = ad.selected_duration === '15s' ? 15 : ad.selected_duration === '60s' ? 60 : 30;

  // Use strong moments from understanding as segments
  const strongMoments = project.understanding_data?.strong_moments || [];
  const segments = strongMoments.slice(0, 4).map(m => ({
    start: Math.max(0, m.timestamp_approx - 2),
    end:   m.timestamp_approx + (durationSecs / strongMoments.length),
    keep:  true,
    label: m.label,
  }));

  // Fall back to full video if no strong moments
  if (segments.length === 0) {
    segments.push({ start: 0, end: durationSecs, keep: true, label: 'full' });
  }

  const renderPlan = {
    source_video_storage_path: project.source_video_storage_path,
    source_video_bucket:       project.source_video_bucket || 'edit-studio-assets',
    segments,
    captions:                  ad.caption_timeline || [],
    music:                     ad.selected_music_bed || null,
    voiceover_storage_path:    ad.voiceover_storage_path || null,
    resolution:                ad.ad_type === 'linkedin' ? { width: 1920, height: 1080 } : { width: 1080, height: 1920 },
    fps:                       30,
    quality:                   'high',
    ad_type:                   ad.ad_type,
    total_duration:            durationSecs,
  };

  // Delegate to existing render route
  const renderRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/edit-studio/render`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ renderPlan, projectId: ad.project_id }),
  });
  const renderData = await renderRes.json();

  if (renderData.jobId) {
    await supabaseAdmin.from('edit_ads')
      .update({ render_job_id: renderData.jobId, status: 'rendering' })
      .eq('id', adId);
  }

  return NextResponse.json(renderData);
}
```

- [ ] **Step 2: Wire the Render button in gallery**

In `app/edit-studio/v2/page.js`, replace the `<button>Render</button>` placeholder with:

```javascript
<button className={styles.btnSmall} onClick={async () => {
  await fetch('/api/edit-studio/render-ad', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adId: ad.adId }),
  });
  alert('Render queued — check back in a few minutes.');
}}>
  Render
</button>
```

- [ ] **Step 3: Commit**

```bash
git add app/api/edit-studio/render-ad/route.js app/edit-studio/v2/page.js
git commit -m "feat: render-ad route — translates edit_ad row into render plan and queues job"
```

---

## Success Test

Upload a PromptCEO website screen-recording video to `/edit-studio`.

Expected flow:
1. Video uploads to Supabase storage
2. Whisper transcribes speech
3. GPT-4o analyzes frames + transcript → shows detected products (Prompt Studio, Ad Studio, etc.), recommended positioning (founder_authority or product_demo)
4. Creative Director recommends Founder Ad, SaaS Ad, LinkedIn, TikTok
5. "Generate All" → Auto Factory produces 4 ads in ~20s
6. Gallery shows all 4 ads with quality scores (A/B/C grade)
7. "Render" queues each to the render worker → MP4 with voiceover + script captions + music

When that works, Edit Studio 2.0 is complete.
