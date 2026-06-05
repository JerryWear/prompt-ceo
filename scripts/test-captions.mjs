/**
 * Sprint 5 validation: Caption Intelligence Engine
 * Runs all 5 caption styles against the PromptCEO Founder Ad and TikTok Ad scripts.
 * Shows each style's output chunks in a visual ASCII preview.
 *
 * Usage: node scripts/test-captions.mjs
 */

// ── Mirror of the route's caption engine (no imports needed — pure logic) ──────

const CAPTION_STYLES = {
  tiktok_ugc: {
    name: 'TikTok UGC',
    wordsPerChunk: [1, 2],
    uppercase: true,
    pacingFactor: 0.35,
    hookEmphasis: 'high',
    fontWeight: 'black',
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
    uppercase: false,
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
    uppercase: 'key_terms',
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

const SPLIT_BEFORE = new Set(['and', 'but', 'or', 'so', 'because', 'when', 'if', 'then'])
const PUNCTUATION_BREAK = /[.,?!—]$/

const KEY_TERMS = new Set(['promptceo', 'prompt', 'studio', 'campaign', 'ai', 'director', 'builder', 'intelligence'])
const EMOTION_WORDS = new Set(['tired', 'stuck', 'frustrated', 'love', 'hate', 'finally', 'never', 'always', 'stop', 'wait', 'wrong', 'broken', 'free', 'fast', 'done', 'now', 'gone', 'win', 'lose', 'pain'])

function assembleScript(scriptObj) {
  const sections = []
  if (scriptObj.hook) sections.push({ text: scriptObj.hook.trim(), section: 'hook' })
  if (scriptObj.body) sections.push({ text: scriptObj.body.trim(), section: 'body' })
  if (scriptObj.cta)  sections.push({ text: scriptObj.cta.trim(),  section: 'cta'  })
  return sections
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
  const hasEmotion = words.some(w => EMOTION_WORDS.has(w.replace(/[^a-z]/g, '')))
  const hasProduct = words.some(w => KEY_TERMS.has(w.replace(/[^a-z]/g, '')))
  if (hasNumber || hasEmotion || hasProduct) return 'high'
  return 'normal'
}

function generateCaptions(scriptObj, styleKey, voiceoverDurationSecs) {
  const style    = CAPTION_STYLES[styleKey]
  const sections = assembleScript(scriptObj)

  const allChunks = []
  let totalWords  = 0

  for (const { text, section } of sections) {
    const words  = text.split(/\s+/).filter(Boolean)
    totalWords  += words.length
    const chunks = buildChunks(words, style)
    for (const words of chunks) {
      allChunks.push({
        words,
        text:       formatChunk(words, style, section),
        section,
        emphasis:   detectEmphasis(words, section, style),
        style_class: section === 'hook' ? 'hero' : section === 'cta' ? 'cta' : 'normal',
      })
    }
  }

  const estimatedRate = 162
  const totalDuration = voiceoverDurationSecs || (totalWords / estimatedRate) * 60

  const timeline = []
  let wordsSoFar = 0

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i]
    const start = (wordsSoFar / totalWords) * totalDuration
    const end   = ((wordsSoFar + chunk.words.length) / totalWords) * totalDuration
    timeline.push({
      id:         `cap_${i}`,
      text:       chunk.text,
      start:      parseFloat(start.toFixed(3)),
      end:        parseFloat(end.toFixed(3)),
      duration:   parseFloat((end - start).toFixed(3)),
      section:    chunk.section,
      emphasis:   chunk.emphasis,
      style_class:chunk.style_class,
      line:       1,
    })
    wordsSoFar += chunk.words.length
  }

  return { caption_timeline: timeline, style_name: style.name, chunk_count: timeline.length, total_duration: totalDuration }
}

// ── Test data ─────────────────────────────────────────────────────────────────

const SCRIPTS = {
  founder: {
    label: 'Founder Ad (30s) — onyx voice',
    adType: 'founder',
    script: {
      hook: 'Eight thousand dollars a month.',
      body: "One ad took two weeks. I got tired. I built PromptCEO. It's my solution.",
      cta:  'Try it free at PromptCEO dot io.',
    },
    voiceoverSecs: 11.2, // estimated from Sprint 4 file sizes
  },
  tiktok: {
    label: 'TikTok Ad (30s) — shimmer voice',
    adType: 'tiktok_hook',
    script: {
      hook: "Hang on. Watch this.",
      body: "Ditched my agency. Using PromptCEO now. So much faster.",
      cta:  'Get it at PromptCEO dot io.',
    },
    voiceoverSecs: 8.5,
  },
  problem: {
    label: 'Problem/Solution Ad (30s)',
    adType: 'problem_solution',
    script: {
      hook: "You briefed your agency three weeks ago. You got one ad.",
      body: "It didn't convert. There's a better way. PromptCEO takes your video and builds five ads. Right now.",
      cta:  'Start free at PromptCEO dot io.',
    },
    voiceoverSecs: 14.0,
  },
}

// ── Display helpers ───────────────────────────────────────────────────────────

const EMPHASIS_COLORS = {
  maximum: '\x1b[31m', // red
  high:    '\x1b[32m', // green
  medium:  '\x1b[33m', // yellow
  normal:  '\x1b[37m', // white
  low:     '\x1b[90m', // grey
}
const RESET = '\x1b[0m'

const SECTION_LABELS = { hook: '[H]', body: '[B]', cta:  '[C]' }

function printCaptionTimeline(timeline, styleKey) {
  const style = CAPTION_STYLES[styleKey]
  const sectionCounts = { hook: 0, body: 0, cta: 0 }

  for (const cap of timeline) {
    const col    = EMPHASIS_COLORS[cap.emphasis] || RESET
    const sec    = SECTION_LABELS[cap.section] || '   '
    const timing = `${cap.start.toFixed(2)}–${cap.end.toFixed(2)}s`.padStart(13)
    console.log(`  ${sec} ${timing}  ${col}${cap.text}${RESET}`)
    sectionCounts[cap.section] = (sectionCounts[cap.section] || 0) + 1
  }

  console.log(`\n  Chunks: ${timeline.length} | Hook×${sectionCounts.hook} Body×${sectionCounts.body} CTA×${sectionCounts.cta}`)
  console.log(`  Timing: ${timeline.at(-1)?.end?.toFixed(1)}s total | placement: ${style.placement} | colors: ${style.colorScheme}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log('='.repeat(70))
console.log('PromptCEO — Sprint 5 Validation: Caption Intelligence Engine')
console.log('='.repeat(70))

const STYLES_TO_TEST = ['tiktok_ugc', 'founder', 'high_energy', 'saas_demo', 'linkedin_authority']

let allPass = true

for (const [scriptKey, scriptData] of Object.entries(SCRIPTS)) {
  console.log(`\n${'─'.repeat(70)}`)
  console.log(`AD: ${scriptData.label}`)
  console.log('─'.repeat(70))
  console.log(`Script: "${scriptData.script.hook}" / "${scriptData.script.body}" / "${scriptData.script.cta}"`)

  for (const styleKey of STYLES_TO_TEST) {
    const result = generateCaptions(scriptData.script, styleKey, scriptData.voiceoverSecs)
    console.log(`\n  ── ${result.style_name.toUpperCase()} (${styleKey}) ──`)
    printCaptionTimeline(result.caption_timeline, styleKey)

    // Validation: each timeline must have chunks, all required fields
    for (const cap of result.caption_timeline) {
      const missing = ['id','text','start','end','duration','section','emphasis','style_class','line'].filter(f => cap[f] === undefined)
      if (missing.length) {
        console.log(`  ❌ Missing fields on cap ${cap.id}: ${missing.join(', ')}`)
        allPass = false
      }
      if (!cap.text || cap.text.length === 0) {
        console.log(`  ❌ Empty text on cap ${cap.id}`)
        allPass = false
      }
    }
    if (result.caption_timeline.length === 0) {
      console.log(`  ❌ No captions generated for ${styleKey}`)
      allPass = false
    }
  }
}

// ── Hormozi-style output example ─────────────────────────────────────────────
console.log('\n' + '='.repeat(70))
console.log('HORMOZI-STYLE VISUAL EXAMPLE — Founder Ad, TikTok UGC style')
console.log('='.repeat(70))

const founderResult = generateCaptions(SCRIPTS.founder.script, 'tiktok_ugc', SCRIPTS.founder.voiceoverSecs)
console.log('\nPhone screen preview (each line = one caption chunk):\n')
for (const cap of founderResult.caption_timeline) {
  const pad = '  '.repeat(Math.max(0, 3 - cap.text.length / 8))
  const timing = `  (${cap.start.toFixed(1)}–${cap.end.toFixed(1)}s)`
  const emColor = EMPHASIS_COLORS[cap.emphasis] || RESET
  console.log(`${pad}${emColor}${cap.text}${RESET}${timing}`)
}

// ── Final result ─────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(70))
const totalConcepts = Object.keys(SCRIPTS).length * STYLES_TO_TEST.length
console.log(`Tested: ${Object.keys(SCRIPTS).length} ad concepts × ${STYLES_TO_TEST.length} styles = ${totalConcepts} caption sets`)
console.log('')
console.log(allPass
  ? '✅ SPRINT 5 PASS — Caption Intelligence works on all styles and scripts'
  : '❌ SPRINT 5 FAIL — see issues above')
console.log('='.repeat(70))
