import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'
import os from 'os'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { execFile as _execFile } from 'child_process'

const execFileAsync = promisify(_execFile)

// Allow up to 60 seconds — frame extraction + GPT-4o vision can be slow
export const maxDuration = 60

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'
const VISION_MODEL    = 'gpt-4o'

// ─── Supabase helpers ─────────────────────────────────────────────────────────

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

function makeAdminClient() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── Frame extraction ─────────────────────────────────────────────────────────
// Returns an array of base64-encoded JPEG strings (up to maxFrames).
// Gracefully returns [] if FFmpeg is unavailable or extraction fails.

async function extractFrames(videoPath, workDir, log, maxFrames = 15) {
  const framesDir = path.join(workDir, 'frames')
  try {
    fs.mkdirSync(framesDir, { recursive: true })

    // 1 frame every 5 seconds, max 512px wide, max 15 frames, quality 5
    await execFileAsync('ffmpeg', [
      '-i',        videoPath,
      '-vf',       'fps=1/5,scale=512:-1',
      '-frames:v', String(maxFrames),
      '-q:v',      '5',
      path.join(framesDir, 'frame_%04d.jpg'),
    ], { timeout: 30_000 })

    const frameFiles = fs
      .readdirSync(framesDir)
      .filter(f => f.endsWith('.jpg'))
      .sort()

    const frames = []
    for (const file of frameFiles.slice(0, maxFrames)) {
      const buf = fs.readFileSync(path.join(framesDir, file))
      frames.push(buf.toString('base64'))
    }
    log.info(`Extracted ${frames.length} frames from video`)
    return frames
  } catch (err) {
    // FFmpeg unavailable or extraction failed — continue without frames
    log.info(`Frame extraction skipped: ${err.message}`)
    return []
  }
}

// ─── Transcript formatter ─────────────────────────────────────────────────────

function buildTranscriptText(segments = []) {
  if (!segments.length) return '(no transcript provided)'
  return segments
    .map(s => `[${Number(s.start || 0).toFixed(1)}s] ${s.text}`)
    .join('\n')
}

// ─── Mock fallback ────────────────────────────────────────────────────────────
// Structurally complete — matches the JSON schema the route documents.

function buildMockUnderstanding() {
  return {
    detected_products: ['Dashboard UI', 'Analytics panel', 'Prompt generation interface'],
    business_type: 'saas',
    business_description: 'An AI-powered creative operating system for marketers and content creators.',
    screens_detected: [
      { label: 'Home dashboard',        timestamp_approx: 2,  significance: 'high'   },
      { label: 'Prompt Studio editor',  timestamp_approx: 8,  significance: 'high'   },
      { label: 'Campaign results page', timestamp_approx: 16, significance: 'medium' },
    ],
    key_moments: [
      { timestamp_approx: 3,  label: 'Product demo opens',          reason: 'First clear product view — strong hook candidate', score: 9 },
      { timestamp_approx: 12, label: 'Feature walkthrough',         reason: 'Core value delivery — shows product in action',    score: 8 },
      { timestamp_approx: 22, label: 'Results / social proof shot', reason: 'Tangible outcome — drives credibility',             score: 8 },
    ],
    weak_moments: [
      { timestamp_approx: 0,  label: 'Generic opener',    reason: 'No clear hook — starts with context the viewer did not ask for' },
      { timestamp_approx: 18, label: 'Navigation padding', reason: 'Transitional footage with no narrative value'                  },
    ],
    strong_moments: [
      { timestamp_approx: 3,  label: 'First product reveal', type: 'hook'  },
      { timestamp_approx: 12, label: 'Core feature demo',    type: 'demo'  },
      { timestamp_approx: 22, label: 'Outcome close',        type: 'cta'   },
    ],
    recommended_positioning: 'product_demo',
    positioning_reason: 'The video clearly showcases the product interface — a demo-style ad will align with what viewers naturally see.',
    recommended_ad_types: ['demo', 'saas', 'linkedin', 'launch'],
    key_messages: [
      'AI does the creative work for you',
      'From brief to campaign in minutes',
      'Built for marketers who move fast',
      'One platform — prompts, ads, video',
    ],
    estimated_duration: 29,
  }
}

// ─── Vision prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = 'You are a video content analyst specializing in digital advertising. Analyze the video frames and transcript. Identify what product is shown, what type of business, notable UI screens or features visible in frames, and the strongest moments for ad creative. Respond only with valid JSON.'

function buildUserPrompt(transcriptText) {
  return `Analyze this video. Return JSON with this exact schema:
{
  "detected_products": ["list of products/features visible"],
  "business_type": "saas|ecommerce|service|creator|agency|other",
  "business_description": "one sentence describing the business",
  "screens_detected": [{"label": "screen name", "timestamp_approx": 0, "significance": "high|medium|low"}],
  "key_moments": [{"timestamp_approx": 0, "label": "description", "reason": "why it's strong for ads", "score": 8}],
  "weak_moments": [{"timestamp_approx": 0, "label": "description", "reason": "why it's weak"}],
  "strong_moments": [{"timestamp_approx": 0, "label": "description", "type": "hook|demo|cta|social_proof"}],
  "recommended_positioning": "founder_authority|product_demo|transformation|problem_solution|social_proof",
  "positioning_reason": "one sentence explanation",
  "recommended_ad_types": ["founder|demo|saas|linkedin|tiktok|ugc|launch|retargeting"],
  "key_messages": ["3-5 key messages derived from the content"],
  "estimated_duration": 0
}

Transcript:
${transcriptText}`
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/understand
// Body: { projectId, storagePath, bucket?, transcriptSegments? }

export async function POST(req) {
  const log = makeRouteLogger('understand')
  let workDir = null

  try {
    const body = await req.json()
    const {
      projectId,
      storagePath,
      bucket             = 'edit-studio-assets',
      transcriptSegments = [],
    } = body

    // ── Validate inputs ───────────────────────────────────────────────────────
    if (!projectId) {
      return NextResponse.json({ status: 'error', ok: false, message: 'projectId is required.' }, { status: 400 })
    }
    if (!storagePath) {
      return NextResponse.json({ status: 'error', ok: false, message: 'storagePath is required.' }, { status: 400 })
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ status: 'error', ok: false, message: 'Authentication required.' }, { status: 401 })
    }

    // ── Create signed URL ─────────────────────────────────────────────────────
    log.info('Creating signed download URL from storage path')
    const admin = makeAdminClient()
    const { data: signed, error: signErr } = await admin.storage
      .from(bucket)
      .createSignedUrl(storagePath, 300) // 5-minute window
    if (signErr) {
      log.failure({ projectId, errorCode: 'SIGN_URL_FAILED', message: signErr.message })
      return NextResponse.json(
        { status: 'error', ok: false, message: `Could not create signed URL: ${signErr.message}` },
        { status: 500 }
      )
    }

    // ── Download video to temp dir ────────────────────────────────────────────
    workDir = path.join(os.tmpdir(), `understand_${projectId}_${Date.now()}`)
    fs.mkdirSync(workDir, { recursive: true })

    const videoFileName = path.basename(storagePath) || 'source.mp4'
    const videoPath     = path.join(workDir, videoFileName)

    log.info('Downloading source video from storage')
    const dlRes = await fetch(signed.signedUrl)
    if (!dlRes.ok) {
      log.failure({ projectId, errorCode: 'DOWNLOAD_FAILED', message: `HTTP ${dlRes.status}` })
      return NextResponse.json(
        { status: 'error', ok: false, message: `Could not download video from storage: HTTP ${dlRes.status}` },
        { status: 500 }
      )
    }
    const videoBuffer = await dlRes.arrayBuffer()
    fs.writeFileSync(videoPath, Buffer.from(videoBuffer))
    log.info(`Video saved to temp (${(videoBuffer.byteLength / 1024 / 1024).toFixed(1)} MB)`)

    // ── Extract frames via FFmpeg (graceful fallback) ──────────────────────────
    const frames = await extractFrames(videoPath, workDir, log, 10)

    // ── Build transcript text ─────────────────────────────────────────────────
    const transcriptText = buildTranscriptText(transcriptSegments)

    // ── Call GPT-4o Vision ────────────────────────────────────────────────────
    let understanding
    let fallback       = false
    let fallbackReason = ''

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      fallback       = true
      fallbackReason = 'OPENAI_API_KEY not configured'
      understanding  = buildMockUnderstanding()
    } else {
      try {
        // Build the message content — up to 10 frames as image_url blocks
        const imageBlocks = frames.slice(0, 10).map(b64 => ({
          type:      'image_url',
          image_url: { url: `data:image/jpeg;base64,${b64}`, detail: 'low' },
        }))

        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role:    'user',
            content: [
              ...imageBlocks,
              { type: 'text', text: buildUserPrompt(transcriptText) },
            ],
          },
        ]

        log.info(`Calling GPT-4o vision with ${imageBlocks.length} frame(s)`)
        const gptRes = await fetch(OPENAI_CHAT_URL, {
          method:  'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            model:           VISION_MODEL,
            messages,
            response_format: { type: 'json_object' },
            max_tokens:      1500,
          }),
        })

        if (!gptRes.ok) {
          const errText = await gptRes.text().catch(() => gptRes.statusText)
          throw new Error(`OpenAI ${gptRes.status}: ${errText}`)
        }

        const gptData = await gptRes.json()
        const content = gptData.choices?.[0]?.message?.content
        if (!content) throw new Error(`GPT-4o returned empty content (finish_reason: ${gptData.choices?.[0]?.finish_reason ?? 'unknown'})`)
        understanding = JSON.parse(content)
      } catch (err) {
        fallback       = true
        fallbackReason = `Vision analysis unavailable: ${err.message}`
        understanding  = buildMockUnderstanding()
      }
    }

    // ── Persist to Supabase (non-fatal) ───────────────────────────────────────
    try {
      await supabase
        .from('edit_projects')
        .update({
          understanding_data: understanding,
          is_v2:              true,
          status:             'understood',
        })
        .eq('id', projectId)
        .eq('user_id', user.id)
    } catch {
      // Non-fatal — client still receives the understanding
    }

    log.success({
      projectId,
      fallback,
      extra: {
        frames:        frames.length,
        business_type: understanding.business_type,
        positioning:   understanding.recommended_positioning,
      },
    })

    return NextResponse.json({
      status:          'success',
      ok:              true,
      fallback,
      fallback_reason: fallback ? fallbackReason : undefined,
      understanding,
    })
  } catch (err) {
    log.failure({ errorCode: 'UNDERSTAND_FATAL', message: err.message })
    return NextResponse.json({ status: 'error', ok: false, message: err.message }, { status: 500 })
  } finally {
    // ── Cleanup temp dir ──────────────────────────────────────────────────────
    if (workDir) {
      try {
        fs.rmSync(workDir, { recursive: true, force: true })
      } catch {
        // Best-effort cleanup — non-fatal
      }
    }
  }
}
