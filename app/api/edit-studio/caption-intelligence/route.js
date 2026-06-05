import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// ─── Caption Styles ───────────────────────────────────────────────────────────
// Named export so the UI can import the style list directly for the style selector.

export const CAPTION_STYLES = {
  tiktok_ugc: {
    name: 'TikTok UGC',
    wordsPerChunk: [1, 2],
    uppercase: true,
    pacingFactor: 0.35,       // seconds per word (baseline)
    hookEmphasis: 'high',
    fontWeight: 'black',      // for render engine
    placement: 'center',
    colorScheme: 'yellow_white',
    splitOnPunctuation: true,
    emphasizeNumbers: true,
  },
  founder: {
    name: 'Founder',
    wordsPerChunk: [2, 4],
    uppercase: true,
    pacingFactor: 0.55,
    hookEmphasis: 'high',
    fontWeight: 'bold',
    placement: 'lower_third',
    colorScheme: 'white_black',
    splitOnPunctuation: true,
    emphasizeNumbers: true,
  },
  linkedin_authority: {
    name: 'LinkedIn Authority',
    wordsPerChunk: [5, 8],
    uppercase: false,         // sentence case
    pacingFactor: 0.8,
    hookEmphasis: 'medium',
    fontWeight: 'normal',
    placement: 'bottom',
    colorScheme: 'white_subtle',
    splitOnPunctuation: true,
    emphasizeNumbers: false,
  },
  saas_demo: {
    name: 'SaaS Demo',
    wordsPerChunk: [2, 4],
    uppercase: 'key_terms',   // only key terms uppercase
    pacingFactor: 0.5,
    hookEmphasis: 'high',
    fontWeight: 'bold',
    placement: 'center',
    colorScheme: 'blue_white',
    splitOnPunctuation: true,
    emphasizeNumbers: true,
  },
  high_energy: {
    name: 'High-Energy Launch',
    wordsPerChunk: [1, 2],
    uppercase: true,
    pacingFactor: 0.25,
    hookEmphasis: 'maximum',
    fontWeight: 'black',
    placement: 'center',
    colorScheme: 'red_white',
    splitOnPunctuation: true,
    emphasizeNumbers: true,
  },
}

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

// ─── Algorithm helpers ────────────────────────────────────────────────────────

// Words that signal a natural phrase boundary — split BEFORE these
const SPLIT_BEFORE = new Set(['and', 'but', 'or', 'so', 'because', 'when', 'if', 'then'])

// Punctuation that ends a phrase — split AFTER these
const PUNCTUATION_BREAK = /[.,?!—]$/

// Key product/domain terms used in saas_demo uppercase detection
const KEY_TERMS = new Set([
  'promptceo', 'prompt', 'studio', 'campaign', 'ai', 'director',
  'builder', 'intelligence',
])

/**
 * Assemble a scriptObj into an array of { text, section } objects.
 * Preserves section identity (hook / body / cta) for emphasis + timing.
 */
function assembleScript(scriptObj) {
  const sections = []
  if (scriptObj.hook) sections.push({ text: scriptObj.hook.trim(), section: 'hook' })
  if (scriptObj.body) sections.push({ text: scriptObj.body.trim(), section: 'body' })
  if (scriptObj.cta)  sections.push({ text: scriptObj.cta.trim(),  section: 'cta' })
  return sections
}

/**
 * Split a string into an array of word tokens (whitespace-separated).
 * Punctuation stays attached to the word it belongs to ("great," stays "great,").
 */
function tokenize(text) {
  return text.split(/\s+/).filter(Boolean)
}

function shouldBreakBefore(word) {
  return SPLIT_BEFORE.has(word.toLowerCase().replace(/[^a-z]/g, ''))
}

function hasPunctuationBreak(word) {
  return PUNCTUATION_BREAK.test(word)
}

/**
 * Group a flat list of words into caption chunks based on the style's
 * wordsPerChunk range, breaking early at natural phrase boundaries.
 */
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

    const shouldBreak = atMax || atMinWithBreak || punctAfterOne

    if (shouldBreak && i < words.length - 1) {
      chunks.push([...current])
      current = []
    }
  }

  if (current.length > 0) chunks.push(current)
  return chunks
}

/**
 * Apply the style's uppercase / case rules to a chunk of words.
 * saas_demo uses selective uppercase for key terms, numbers, and hook section.
 */
function formatChunk(words, style, section) {
  const raw = words.join(' ')

  if (style.uppercase === true) return raw.toUpperCase()

  if (style.uppercase === 'key_terms') {
    const hasKeyTerm = words.some(w => KEY_TERMS.has(w.toLowerCase().replace(/[^a-z]/g, '')))
    const hasNumber  = words.some(w => /\d/.test(w))
    if (hasKeyTerm || hasNumber || section === 'hook') return raw.toUpperCase()
    return raw
  }

  // false / undefined → sentence case (no transform)
  return raw
}

/**
 * Determine the emphasis level for a caption chunk.
 * Hook section always gets the style's hookEmphasis.
 * Body chunks are elevated if they contain numbers, emotional words, or key terms.
 */
function detectEmphasis(words, section, style) {
  if (section === 'hook') return style.hookEmphasis || 'high'
  if (section === 'cta')  return 'medium'

  const hasNumber  = words.some(w => /\d/.test(w) || /thousand|million|hundred/.test(w))
  const hasEmotion = words.some(w =>
    ['tired', 'stuck', 'frustrated', 'love', 'hate', 'finally', 'never', 'always', 'stop', 'wait']
      .includes(w.replace(/[^a-z]/g, ''))
  )
  const hasProduct = words.some(w => KEY_TERMS.has(w.replace(/[^a-z]/g, '')))

  if (hasNumber || hasEmotion || hasProduct) return 'high'
  return 'normal'
}

/**
 * Build a flat list of enriched chunk objects (words + text + section + emphasis)
 * from the assembled script sections.
 */
function buildEnrichedChunks(sections, style) {
  const enriched = []

  for (const { text, section } of sections) {
    const words  = tokenize(text)
    const chunks = buildChunks(words, style)

    for (const chunkWords of chunks) {
      const formattedText = formatChunk(chunkWords, style, section)
      const emphasis      = detectEmphasis(chunkWords, section, style)

      // style_class drives CSS / render engine decisions
      const style_class = `${section}_${emphasis}`

      enriched.push({ words: chunkWords, text: formattedText, section, emphasis, style_class })
    }
  }

  return enriched
}

/**
 * Assign proportional start/end timestamps to each caption chunk.
 *
 * If voiceoverDurationSecs is provided, it anchors the timeline.
 * Otherwise we estimate at 162 wpm (tts-1-hd at speed 1.0).
 */
function calculateTiming(enrichedChunks, totalWords, voiceoverDurationSecs) {
  const ESTIMATED_WPM  = 162
  const totalDuration  = voiceoverDurationSecs ?? (totalWords / ESTIMATED_WPM) * 60

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

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/caption-intelligence
// Body: { adId, projectId, scriptObj, selectedDuration, captionStyle, voiceoverDurationSecs }

export async function POST(req) {
  const log = makeRouteLogger('caption-intelligence')

  try {
    const body = await req.json()
    const { adId, projectId, scriptObj, selectedDuration, captionStyle, voiceoverDurationSecs } = body

    // ── Validate required inputs ──────────────────────────────────────────────
    if (!scriptObj) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'scriptObj is required.' },
        { status: 400 }
      )
    }
    if (!captionStyle) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'captionStyle is required.' },
        { status: 400 }
      )
    }
    if (!CAPTION_STYLES[captionStyle]) {
      return NextResponse.json(
        {
          status:  'error',
          ok:      false,
          message: `Unknown captionStyle "${captionStyle}". Valid styles: ${Object.keys(CAPTION_STYLES).join(', ')}`,
        },
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

    // ── Core algorithm ────────────────────────────────────────────────────────
    const style    = CAPTION_STYLES[captionStyle]
    const sections = assembleScript(scriptObj)

    if (sections.length === 0) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'scriptObj must contain at least one of: hook, body, cta.' },
        { status: 400 }
      )
    }

    log.info(`Building captions (style: ${captionStyle}, duration: ${selectedDuration ?? 'unspecified'})`)

    const enrichedChunks = buildEnrichedChunks(sections, style)
    const totalWords     = enrichedChunks.reduce((sum, c) => sum + c.words.length, 0)

    if (totalWords === 0) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Script text produced no words after tokenization.' },
        { status: 400 }
      )
    }

    const timingSource     = voiceoverDurationSecs != null ? 'voiceover' : 'estimated'
    const captionTimeline  = calculateTiming(enrichedChunks, totalWords, voiceoverDurationSecs ?? null)
    const totalDuration    = captionTimeline[captionTimeline.length - 1]?.end ?? 0

    // ── Persist to edit_ads (non-fatal, only when adId is provided) ───────────
    if (adId) {
      try {
        const supabaseAdmin = makeAdminClient()
        await supabaseAdmin
          .from('edit_ads')
          .update({
            caption_timeline: captionTimeline,
            caption_style:    captionStyle,
            status:           'captioned',
          })
          .eq('id', adId)
          .eq('user_id', user.id)
      } catch {
        // Non-fatal — client still receives the caption timeline
      }
    }

    log.success({
      projectId,
      extra: {
        adId:         adId ?? null,
        captionStyle,
        chunk_count:  captionTimeline.length,
        word_count:   totalWords,
        timingSource,
        totalDuration,
      },
    })

    return NextResponse.json({
      status:          'success',
      ok:              true,
      caption_timeline: captionTimeline,
      style_name:       style.name,
      style_config:     style,
      chunk_count:      captionTimeline.length,
      total_duration:   parseFloat(totalDuration.toFixed(3)),
      timing_source:    timingSource,
      word_count:       totalWords,
    })
  } catch (err) {
    log.failure({ errorCode: 'CAPTION_INTELLIGENCE_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
