/**
 * Sprint 4 validation: Voice Studio
 * Generates a voiceover for the PromptCEO Founder Ad (30s script from Sprint 3).
 * Writes the MP3 to /tmp and reports duration and file size.
 *
 * Usage: node scripts/test-voice.mjs
 */
import { readFileSync, writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __dirname = dirname(fileURLToPath(import.meta.url))
function loadEnv() {
  try {
    const lines = readFileSync(join(__dirname, '..', '.env.local'), 'utf8').split('\n')
    for (const line of lines) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[k]) process.env[k] = v
    }
  } catch {}
}
loadEnv()

// ── Test data — Founder Ad 30s script from Sprint 3 validation ────────────────
const SCRIPTS = {
  founder: {
    adType: 'Founder Ad',
    voice: 'onyx',
    voiceLabel: 'Founder Male',
    '30s': {
      hook: 'Eliminate your $10k agency fees with PromptCEO.',
      body: 'As a CEO, I know what eats up budgets. I created PromptCEO to cut those costs. Build campaigns and optimize with AI. Revolutionize how you handle creative.',
      cta: 'Start free at promptceo.io.',
    },
  },
  tiktok: {
    adType: 'TikTok Hook Ad',
    voice: 'shimmer',
    voiceLabel: 'Energetic Creator',
    '30s': {
      hook: 'Why PromptCEO says forget traditional agencies.',
      body: 'PromptCEO challenges the status quo. Why pay more when AI accelerates creation, cuts costs, and enhances precision? It\'s time to disrupt the norm.',
      cta: 'Start for free at promptceo.io.',
    },
  },
}

async function generateVoice(scriptKey) {
  const script = SCRIPTS[scriptKey]
  const s30 = script['30s']
  const scriptText = [s30.hook, s30.body, s30.cta].join(' ')

  console.log(`\n${'─'.repeat(60)}`)
  console.log(`Concept: ${script.adType} | Voice: ${script.voiceLabel} (${script.voice})`)
  console.log(`${'─'.repeat(60)}`)
  console.log(`Script (${scriptText.length} chars): "${scriptText.slice(0, 80)}..."`)

  const start = Date.now()

  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      voice: script.voice,
      input: scriptText,
      speed: 1.0,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`TTS error ${res.status}: ${err}`)
  }

  const audioBuffer = Buffer.from(await res.arrayBuffer())
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)

  // Save to tmp for inspection
  const outPath = join(os.tmpdir(), `promptceo_voice_${scriptKey}_30s.mp3`)
  writeFileSync(outPath, audioBuffer)
  const sizeKb = (statSync(outPath).size / 1024).toFixed(1)

  console.log(`✅ Generated in ${elapsed}s`)
  console.log(`   Size: ${sizeKb} KB`)
  console.log(`   Saved: ${outPath}`)

  // Estimate cost: tts-1-hd = $0.030 per 1k chars
  const cost = ((scriptText.length / 1000) * 0.030).toFixed(4)
  console.log(`   Cost: ~$${cost}`)

  return { elapsed, sizeKb, cost, charCount: scriptText.length }
}

async function run() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) { console.error('OPENAI_API_KEY missing'); process.exit(1) }

  console.log('='.repeat(60))
  console.log('PromptCEO — Sprint 4 Validation: Voice Studio')
  console.log('='.repeat(60))
  console.log('Model: tts-1-hd | Testing 2 voices from Sprint 3 concepts\n')

  const results = []
  for (const key of ['founder', 'tiktok']) {
    try {
      const r = await generateVoice(key)
      results.push({ key, ...r, pass: true })
    } catch (err) {
      console.error(`❌ ${key}: ${err.message}`)
      results.push({ key, pass: false, error: err.message })
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log('VALIDATION RESULT')
  console.log('='.repeat(60))

  const passed = results.filter(r => r.pass).length
  for (const r of results) {
    const label = SCRIPTS[r.key]?.adType || r.key
    if (r.pass) {
      console.log(`✅ ${label.padEnd(22)} — ${r.elapsed}s, ${r.sizeKb} KB, $${r.cost}`)
    } else {
      console.log(`❌ ${label.padEnd(22)} — ${r.error}`)
    }
  }

  const totalCost = results
    .filter(r => r.pass)
    .reduce((sum, r) => sum + parseFloat(r.cost), 0)
    .toFixed(4)

  console.log(`\nTotal cost for 2 voiceovers: $${totalCost}`)
  console.log(`Projected cost per full set of 5: ~$${(parseFloat(totalCost) * 2.5).toFixed(3)}`)
  console.log('')
  console.log(passed === 2
    ? '✅ SPRINT 4 PASS — Voice Studio generates audio from ad scripts'
    : `❌ SPRINT 4 PARTIAL — ${passed}/2 passed`)
  console.log('='.repeat(60))
  console.log('\nMP3 files saved to /tmp — open them to verify audio quality.')
}

run().catch(e => { console.error(e); process.exit(1) })
