import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

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

// ─── Voice mapping ────────────────────────────────────────────────────────────

const AD_TYPE_VOICE = {
  founder:            'founder_male',
  saas_demo:          'professional_female',
  problem_solution:   'professional_female',
  linkedin_authority: 'professional_male',
  tiktok_hook:        'energetic_creator',
}

const VOICE_MAP = {
  founder_male:        'onyx',
  professional_male:   'echo',
  professional_female: 'nova',
  ugc_creator:         'fable',
  energetic_creator:   'shimmer',
}

// ─── Caption engine (inlined from caption-intelligence) ───────────────────────

const AD_TYPE_CAPTION_STYLE = {
  founder:            'founder',
  saas_demo:          'saas_demo',
  problem_solution:   'founder',
  linkedin_authority: 'linkedin_authority',
  tiktok_hook:        'tiktok_ugc',
}

const CAPTION_STYLES = {
  tiktok_ugc:        { wordsPerChunk: [1, 2], uppercase: true,         hookEmphasis: 'high'   },
  founder:           { wordsPerChunk: [2, 4], uppercase: true,         hookEmphasis: 'high'   },
  linkedin_authority:{ wordsPerChunk: [5, 8], uppercase: false,        hookEmphasis: 'medium' },
  saas_demo:         { wordsPerChunk: [2, 4], uppercase: 'key_terms',  hookEmphasis: 'high'   },
  high_energy:       { wordsPerChunk: [1, 2], uppercase: true,         hookEmphasis: 'maximum'},
}

const SPLIT_BEFORE      = new Set(['and', 'but', 'or', 'so', 'because', 'when', 'if', 'then'])
const PUNCTUATION_BREAK = /[.,?!—]$/
const KEY_TERMS         = new Set(['promptceo', 'prompt', 'studio', 'campaign', 'ai', 'director', 'builder', 'intelligence'])
const EMOTION_WORDS     = new Set(['tired', 'stuck', 'frustrated', 'love', 'hate', 'finally', 'never', 'always', 'stop', 'wait', 'wrong', 'broken', 'free', 'fast', 'done', 'now', 'gone', 'win', 'lose', 'pain'])

function tokenize(text) {
  return text.split(/\s+/).filter(Boolean)
}

function shouldBreakBefore(word) {
  return SPLIT_BEFORE.has(word.toLowerCase().replace(/[^a-z]/g, ''))
}

function hasPunctuationBreak(word) {
  return PUNCTUATION_BREAK.test(word)
}

function buildChunks(words, style) {
  const [minWords, maxWords] = style.wordsPerChunk
  const chunks = []
  let current = []

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    current.push(word)

    const atMax          = current.length >= maxWords
    const atMinWithBreak = current.length >= minWords &&
      (hasPunctuationBreak(word) || (i + 1 < words.length && shouldBreakBefore(words[i + 1])))
    const punctAfterOne  = hasPunctuationBreak(word) && current.length >= 1
    const isEmphasisWord = minWords === 1 && current.length === 1 && (
      KEY_TERMS.has(word.toLowerCase().replace(/[^a-z]/g, '')) ||
      /\d/.test(word) ||
      EMOTION_WORDS.has(word.toLowerCase().replace(/[^a-z]/g, ''))
    )

    const shouldBreak = atMax || atMinWithBreak || punctAfterOne || isEmphasisWord

    if (shouldBreak && i < words.length - 1) {
      chunks.push([...current])
      current = []
    }
  }

  if (current.length > 0) chunks.push(current)
  return chunks
}

function formatChunk(words, style, section) {
  const raw = words.join(' ')
  if (style.uppercase === true) return raw.toUpperCase()
  if (style.uppercase === 'key_terms') {
    const hasKeyTerm = words.some(w => KEY_TERMS.has(w.toLowerCase().replace(/[^a-z]/g, '')))
    const hasNumber  = words.some(w => /\d/.test(w))
    if (hasKeyTerm || hasNumber || section === 'hook') return raw.toUpperCase()
    return raw
  }
  return raw
}

function detectEmphasis(words, section, style) {
  if (section === 'hook') return style.hookEmphasis || 'high'
  if (section === 'cta')  return 'medium'
  const hasNumber  = words.some(w => /\d/.test(w) || /thousand|million|hundred/.test(w))
  const hasEmotion = words.some(w => ['tired', 'stuck', 'frustrated', 'love', 'hate', 'finally', 'never', 'always', 'stop', 'wait'].includes(w.replace(/[^a-z]/g, '')))
  const hasProduct = words.some(w => KEY_TERMS.has(w.replace(/[^a-z]/g, '')))
  if (hasNumber || hasEmotion || hasProduct) return 'high'
  return 'normal'
}

function buildEnrichedChunks(sections, style) {
  const enriched = []
  for (const { text, section } of sections) {
    const words  = tokenize(text)
    const chunks = buildChunks(words, style)
    for (const chunkWords of chunks) {
      const formattedText = formatChunk(chunkWords, style, section)
      const emphasis      = detectEmphasis(chunkWords, section, style)
      enriched.push({ words: chunkWords, text: formattedText, section, emphasis, style_class: `${section}_${emphasis}` })
    }
  }
  return enriched
}

function calculateTiming(enrichedChunks, totalWords, voiceoverDurationSecs) {
  const ESTIMATED_WPM = 162
  const totalDuration = voiceoverDurationSecs ?? (totalWords / ESTIMATED_WPM) * 60
  const captionTimeline = []
  let wordsSoFar = 0
  let captionId  = 0

  for (const { words, text, emphasis, section, style_class } of enrichedChunks) {
    const chunkWordCount = words.length
    const start = (wordsSoFar / totalWords) * totalDuration
    const end   = ((wordsSoFar + chunkWordCount) / totalWords) * totalDuration
    captionTimeline.push({
      id:       `cap_${captionId++}`,
      text,
      start:    parseFloat(start.toFixed(3)),
      end:      parseFloat(end.toFixed(3)),
      duration: parseFloat((end - start).toFixed(3)),
      section,
      emphasis,
      style_class,
      line:     1,
    })
    wordsSoFar += chunkWordCount
  }

  return captionTimeline
}

/**
 * Generate captions for an ad using the Sprint 5 caption algorithm.
 * Returns an empty array if the script has no text.
 */
function generateCaptionsInline(scriptObj, adType, durationSecs = 30) {
  const styleName = AD_TYPE_CAPTION_STYLE[adType] || 'founder'
  const style     = CAPTION_STYLES[styleName]

  const sections = [
    { text: (scriptObj.hook || '').trim(), section: 'hook' },
    { text: (scriptObj.body || '').trim(), section: 'body' },
    { text: (scriptObj.cta  || '').trim(), section: 'cta'  },
  ].filter(s => s.text.length > 0)

  if (!sections.length) return []

  const enrichedChunks = buildEnrichedChunks(sections, style)
  const totalWords     = enrichedChunks.reduce((sum, c) => sum + c.words.length, 0)
  if (!totalWords) return []

  return calculateTiming(enrichedChunks, totalWords, durationSecs)
}

// ─── Render plan builder ──────────────────────────────────────────────────────

const PLATFORM_RESOLUTION = {
  tiktok_hook:        '1080x1920',
  founder:            '1080x1920',
  problem_solution:   '1080x1920',
  saas_demo:          '1920x1080',
  linkedin_authority: '1920x1080',
}

const AD_TYPE_CAPTION_ASS_STYLE = {
  founder:            'bold',
  saas_demo:          'clean',
  problem_solution:   'bold',
  linkedin_authority: 'minimal',
  tiktok_hook:        'bold',
}

function buildV2RenderPlan(ad, project) {
  const resolution   = PLATFORM_RESOLUTION[ad.ad_type] || '1080x1920'
  const duration     = ad.selected_duration === '15s' ? 15 : ad.selected_duration === '60s' ? 60 : 30
  const captionStyle = AD_TYPE_CAPTION_ASS_STYLE[ad.ad_type] || 'bold'

  return {
    // v2 flag
    v2:    true,
    adId:  ad.id,

    // Source video
    sourceVideoStoragePath: project.source_video_storage_path,
    sourceVideoBucket:      project.source_video_bucket || 'edit-studio-assets',
    sourceVideoUrl:         null, // worker resolves via storagePath

    // Segments: full video trimmed to voiceover duration
    segments: [
      { start: 0, end: duration, duration, keep: true, label: 'full_video' },
    ],

    // Audio: voiceover
    voiceoverStoragePath: ad.voiceover_storage_path,
    voiceoverBucket:      'edit-studio-assets',

    // Captions
    captions:        ad.caption_timeline || [],
    captionSettings: {
      style:      captionStyle,
      position:   'center',
      resolution,
    },

    // No music for v2 initial render — keep clean for testing
    overlays: { captionsEnabled: true, musicEnabled: false },

    // Output
    resolution,
    fps:           30,
    quality:       'high',
    outputFormat:  'mp4',
    totalDuration: duration,

    // Metadata
    projectId: project.id,
    adType:    ad.ad_type,
    platform:  ad.ad_type,
    goal:      'ad_render',
  }
}

// ─── Per-ad processor ─────────────────────────────────────────────────────────

async function processAd(ad, project, supabaseAdmin, log) {
  const result = {
    adId:               ad.id,
    adType:             ad.ad_type,
    jobId:              null,
    status:             'failed',
    voiceoverGenerated: false,
    captionsGenerated:  false,
    renderPlan:         null,
    error:              null,
  }

  try {
    // ── Step 1: Auto-generate voiceover if missing ──────────────────────────
    if (!ad.voiceover_storage_path) {
      try {
        const scriptObj  = ad.script_30s || ad.script_15s || {}
        const scriptText = [scriptObj.hook, scriptObj.body, scriptObj.cta].filter(Boolean).join(' ')

        if (scriptText && process.env.OPENAI_API_KEY) {
          const voiceKey    = AD_TYPE_VOICE[ad.ad_type] || 'professional_female'
          const voice       = VOICE_MAP[voiceKey]
          const storagePath = `voiceovers/${project.id}/${ad.id}_${voiceKey}_30s.mp3`

          log.info(`Voiceover: generating for ad ${ad.id} (${ad.ad_type}, voice: ${voice})`)

          const ttsRes = await fetch('https://api.openai.com/v1/audio/speech', {
            method:  'POST',
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type':  'application/json',
            },
            body: JSON.stringify({ model: 'tts-1-hd', voice, input: scriptText, speed: 1.0 }),
          })

          if (ttsRes.ok) {
            const audioBuffer = Buffer.from(await ttsRes.arrayBuffer())

            await supabaseAdmin.storage
              .from('edit-studio-assets')
              .upload(storagePath, audioBuffer, { contentType: 'audio/mpeg', upsert: true })

            await supabaseAdmin
              .from('edit_ads')
              .update({ voiceover_storage_path: storagePath, voiceover_voice: voiceKey, status: 'voiced' })
              .eq('id', ad.id)

            ad.voiceover_storage_path = storagePath
            result.voiceoverGenerated = true
            log.info(`Voiceover: uploaded ${storagePath}`)
          } else {
            const errText = await ttsRes.text().catch(() => ttsRes.statusText)
            log.info(`Voiceover: TTS failed for ad ${ad.id} — ${ttsRes.status}: ${errText}`)
          }
        }
      } catch (voiceErr) {
        // Non-fatal: log and continue — render can proceed without voiceover
        log.info(`Voiceover: non-fatal error for ad ${ad.id} — ${voiceErr.message}`)
      }
    }

    // ── Step 2: Auto-generate captions if missing ───────────────────────────
    const hasCaptions = Array.isArray(ad.caption_timeline) && ad.caption_timeline.length > 0
    if (!hasCaptions) {
      try {
        const scriptObj = ad.script_30s || {}
        const duration  = ad.selected_duration === '15s' ? 15 : ad.selected_duration === '60s' ? 60 : 30
        const captions  = generateCaptionsInline(scriptObj, ad.ad_type, duration)

        if (captions.length) {
          await supabaseAdmin
            .from('edit_ads')
            .update({ caption_timeline: captions, status: 'captioned' })
            .eq('id', ad.id)

          ad.caption_timeline = captions
          result.captionsGenerated = true
          log.info(`Captions: generated ${captions.length} chunks for ad ${ad.id}`)
        }
      } catch (capErr) {
        // Non-fatal: log and continue — render can proceed without captions
        log.info(`Captions: non-fatal error for ad ${ad.id} — ${capErr.message}`)
      }
    }

    // ── Step 3: Build v2 render plan ────────────────────────────────────────
    const renderPlan = buildV2RenderPlan(ad, project)
    result.renderPlan = renderPlan

    // ── Step 4: Create render job row ───────────────────────────────────────
    const { data: job, error: jobErr } = await supabaseAdmin
      .from('edit_render_jobs')
      .insert({
        project_id:  project.id,
        user_id:     project.user_id,
        status:      'queued',
        render_plan: renderPlan,
      })
      .select('id')
      .single()

    if (jobErr) throw new Error(`Render job insert failed: ${jobErr.message}`)

    // ── Step 5: Update edit_ads with job ID and status ──────────────────────
    await supabaseAdmin
      .from('edit_ads')
      .update({ render_job_id: job.id, status: 'rendering' })
      .eq('id', ad.id)

    result.jobId  = job.id
    result.status = 'queued'
    log.info(`Ad ${ad.id}: render job ${job.id} queued`)
  } catch (err) {
    result.error = err.message
    log.info(`Ad ${ad.id}: failed — ${err.message}`)
  }

  return result
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/auto-render
// Body: { projectId }

export async function POST(req) {
  const log = makeRouteLogger('auto-render')

  try {
    const body = await req.json()
    const { projectId } = body

    // ── Validate input ────────────────────────────────────────────────────────
    if (!projectId) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'projectId is required.' },
        { status: 400 }
      )
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Authentication required.' },
        { status: 401 }
      )
    }

    const supabaseAdmin = makeAdminClient()

    // ── Step 0: Look up project + ads ─────────────────────────────────────────
    const { data: project, error: projectErr } = await supabaseAdmin
      .from('edit_projects')
      .select('id, user_id, source_video_storage_path, source_video_bucket, understanding_data')
      .eq('id', projectId)
      .single()

    if (projectErr || !project) {
      return NextResponse.json(
        { status: 'error', ok: false, message: `Project not found: ${projectErr?.message ?? 'unknown error'}` },
        { status: 404 }
      )
    }

    // Security: confirm the project belongs to the authenticated user
    if (project.user_id !== user.id) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Project not found.' },
        { status: 404 }
      )
    }

    const { data: ads, error: adsErr } = await supabaseAdmin
      .from('edit_ads')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true })

    if (adsErr) {
      return NextResponse.json(
        { status: 'error', ok: false, message: `Failed to fetch ad concepts: ${adsErr.message}` },
        { status: 500 }
      )
    }

    if (!ads || ads.length === 0) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'No ad concepts found. Generate ad concepts first.' },
        { status: 400 }
      )
    }

    log.info(`Processing ${ads.length} ad(s) for project ${projectId}`)

    // ── Process all ads — failures on individual ads do not block others ──────
    const settled = await Promise.allSettled(
      ads.map(ad => processAd(ad, project, supabaseAdmin, log))
    )

    const jobs = settled.map(outcome => {
      if (outcome.status === 'fulfilled') return outcome.value
      // Promise itself rejected — shouldn't happen given try/catch in processAd,
      // but handle defensively
      return {
        adId:               null,
        adType:             null,
        jobId:              null,
        status:             'failed',
        voiceoverGenerated: false,
        captionsGenerated:  false,
        renderPlan:         null,
        error:              outcome.reason?.message ?? 'Unknown error',
      }
    })

    const totalQueued = jobs.filter(j => j.status === 'queued').length

    log.success({
      projectId,
      extra: {
        totalAds:    ads.length,
        totalQueued,
        totalFailed: jobs.length - totalQueued,
      },
    })

    return NextResponse.json({
      status:       'success',
      ok:           true,
      jobs,
      totalQueued,
    })
  } catch (err) {
    log.failure({ errorCode: 'AUTO_RENDER_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
