import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ─── Caption style presets ────────────────────────────────────────────────────

const STYLE_PRESETS = {
  founder_clean:    { maxWords: 6, uppercase: false, position: 'bottom', animation: 'fade',  emphasis: 'medium', size: 'medium' },
  bold_tiktok:      { maxWords: 4, uppercase: true,  position: 'center', animation: 'pop',   emphasis: 'heavy',  size: 'large'  },
  cinematic_luxury: { maxWords: 5, uppercase: false, position: 'bottom', animation: 'fade',  emphasis: 'light',  size: 'medium' },
  minimal_linkedin: { maxWords: 8, uppercase: false, position: 'bottom', animation: 'none',  emphasis: 'light',  size: 'small'  },
  high_energy:      { maxWords: 3, uppercase: true,  position: 'center', animation: 'slide', emphasis: 'heavy',  size: 'xlarge' },
}

const PLATFORM_DEFAULT_STYLE = {
  tiktok: 'bold_tiktok', instagram: 'bold_tiktok', youtube: 'founder_clean',
  linkedin: 'minimal_linkedin', meta: 'high_energy',
}

// Map page captionSettings.style to a preset ID
const SETTINGS_STYLE_TO_PRESET = {
  bold: 'bold_tiktok', minimal: 'minimal_linkedin',
  cinematic: 'cinematic_luxury', clean: 'founder_clean', pop: 'high_energy',
}

// ─── Keyword detection ────────────────────────────────────────────────────────

const POWER_WORDS = new Set([
  'fastest', 'only', 'never', 'always', 'proven', 'secret', 'discover',
  'transform', 'best', 'free', 'new', 'now', 'instantly', 'guaranteed',
  'zero', 'results', 'build', 'launch', 'grow', 'scale',
])

function buildKeywordSet(directorAnalysis, selectedCutPlan, platform, goal) {
  const kw = new Set(POWER_WORDS)

  // From director hook
  const hook = directorAnalysis?.hookAnalysis?.strongestHook?.text || ''
  hook.split(/\s+/).filter(w => w.length > 4).forEach(w => kw.add(w.toLowerCase().replace(/[^a-z]/g, '')))

  // From CTA
  const cta = selectedCutPlan?.cta || ''
  cta.split(/\s+/).filter(w => w.length > 3).forEach(w => kw.add(w.toLowerCase().replace(/[^a-z]/g, '')))

  // Platform/goal context words
  const contextMap = {
    tiktok:    ['trending', 'viral', 'fyp'],
    instagram: ['reel', 'brand', 'aesthetic'],
    linkedin:  ['professional', 'strategy', 'growth'],
    meta:      ['offer', 'limited', 'ad'],
    founder:   ['founder', 'built', 'startup', 'team'],
    demo:      ['product', 'feature', 'works', 'see'],
    launch:    ['launch', 'live', 'available', 'today'],
  }
  ;[platform, goal].forEach(k => (contextMap[k] || []).forEach(w => kw.add(w)))

  return kw
}

function isKeyword(word, kwSet) {
  return kwSet.has(word.toLowerCase().replace(/[^a-z]/g, ''))
}

// ─── Core caption builder ─────────────────────────────────────────────────────

function buildWordTimestamps(segText, segStart, segEnd, kwSet) {
  const rawWords = segText.trim().split(/\s+/).filter(Boolean)
  if (!rawWords.length) return []
  const dur    = segEnd - segStart
  const wDur   = dur / rawWords.length
  return rawWords.map((w, i) => ({
    word:      w,
    start:     Math.round((segStart + i * wDur) * 100) / 100,
    end:       Math.round((segStart + (i + 1) * wDur) * 100) / 100,
    highlight: isKeyword(w, kwSet),
  }))
}

function chunksFromWords(words, maxWords, preset) {
  const chunks = []
  for (let i = 0; i < words.length; i += maxWords) {
    const slice = words.slice(i, i + maxWords)
    if (!slice.length) continue
    chunks.push({
      words: slice,
      start: slice[0].start,
      end:   slice.at(-1).end,
      text:  preset.uppercase
        ? slice.map(w => w.word).join(' ').toUpperCase()
        : slice.map(w => w.word).join(' '),
    })
  }
  return chunks
}

function buildCaptions(selectedCutPlan, transcript, editorCleanup, captionSettings, platform, directorAnalysis) {
  // Resolve preset
  const settingsPreset = SETTINGS_STYLE_TO_PRESET[captionSettings?.style] || null
  const platformPreset = PLATFORM_DEFAULT_STYLE[platform]                 || null
  const presetId       = settingsPreset || platformPreset || 'founder_clean'
  const preset         = STYLE_PRESETS[presetId]

  // Keywords to highlight
  const kwSet = buildKeywordSet(directorAnalysis, selectedCutPlan, platform, null)

  // Get kept segments from the selected cut plan
  const keptSegments = (selectedCutPlan?.segments || []).filter(s => s.keep)

  // Active cleanup removals (filler word ranges to skip within captions)
  const activeRemovals = (editorCleanup?.removals || []).filter(r => r.apply)

  // Build per-kept-segment captions
  const captions = []
  let capIdx = 0

  for (const seg of keptSegments) {
    // Find transcript segments that overlap with this cut segment
    const overlapping = transcript.filter(t =>
      t.start < seg.end + 0.3 && t.end > seg.start - 0.3
    )
    const segText = overlapping.map(t => t.text).join(' ').trim() ||
                    seg.transcriptText || ''

    if (!segText) continue

    // Build word-level timestamps for the segment
    const words = buildWordTimestamps(segText, seg.start, seg.end, kwSet)

    // Remove filler-word ranges from word list
    const cleanWords = words.filter(w => {
      return !activeRemovals.some(r =>
        r.type === 'filler' && w.start >= r.start - 0.1 && w.end <= r.end + 0.1
      )
    })

    // Split into caption chunks
    const chunks = chunksFromWords(cleanWords, preset.maxWords, preset)

    for (const chunk of chunks) {
      captions.push({
        id:    `cap_${capIdx++}`,
        start: chunk.start,
        end:   chunk.end,
        text:  chunk.text,
        words: chunk.words,
        style: {
          position:  captionSettings?.position || preset.position,
          size:      preset.size,
          animation: captionSettings?.animation || preset.animation,
          emphasis:  preset.emphasis,
          presetId,
        },
      })
    }
  }

  return { captions, presetId, preset }
}

// ─── Summary builder ──────────────────────────────────────────────────────────

function buildCaptionSummary(captions, presetId, preset, platform) {
  const totalWords       = captions.reduce((n, c) => n + c.words.length, 0)
  const highlightedCount = captions.reduce((n, c) => n + c.words.filter(w => w.highlight).length, 0)
  const avgWords         = captions.length ? totalWords / captions.length : 0

  // Readability: shorter chunks = easier to read fast
  const readability = Math.round(Math.max(40, 100 - Math.max(0, avgWords - 3) * 10))

  // Platform fit: does the preset match what this platform needs?
  const idealPreset = PLATFORM_DEFAULT_STYLE[platform]
  const platformFit = idealPreset === presetId ? 95 : 75

  // Collect highlighted keyword samples
  const keywords = [...new Set(
    captions.flatMap(c => c.words.filter(w => w.highlight).map(w => w.word.toLowerCase()))
  )].slice(0, 6)

  const PRESET_LABELS = {
    founder_clean: 'Founder Clean', bold_tiktok: 'Bold TikTok',
    cinematic_luxury: 'Cinematic Luxury', minimal_linkedin: 'Minimal LinkedIn', high_energy: 'High-Energy Launch',
  }

  return {
    style:                PRESET_LABELS[presetId] || presetId,
    totalCaptions:        captions.length,
    estimatedReadability: readability,
    platformFit,
    keywordHighlights:    keywords,
    averageWordsPerCaption: Math.round(avgWords * 10) / 10,
  }
}

// ─── Supabase helper ─────────────────────────────────────────────────────────

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

// ─── Route ───────────────────────────────────────────────────────────────────
// POST /api/edit-studio/captions

export async function POST(req) {
  try {
    const body = await req.json()
    const { projectId, transcript, selectedCutPlan, editorCleanup,
            captionSettings, platform, goal, directorAnalysis } = body

    if (!transcript?.length) {
      return NextResponse.json({ status: 'error', message: 'Generate a transcript first.' }, { status: 400 })
    }
    if (!selectedCutPlan) {
      return NextResponse.json({ status: 'error', message: 'Select an AI Edit Plan first.' }, { status: 400 })
    }

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // Build captions
    const { captions, presetId, preset } = buildCaptions(
      selectedCutPlan, transcript, editorCleanup, captionSettings, platform, directorAnalysis
    )

    const captionSummary = buildCaptionSummary(captions, presetId, preset, platform)

    // Persist (non-fatal)
    if (user && projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({ caption_timeline: captions })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', captions, captionSummary })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
