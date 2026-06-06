/**
 * Unit tests for buildArgs() in edit-render-worker.mjs
 *
 * Run with: node workers/edit-render-worker.test.mjs
 *
 * These tests verify filter_complex concat ordering without spawning FFmpeg.
 * The concat filter requires INTERLEAVED pairs: [v0][a0][v1][a1]...
 * Using [v0][v1][a0][a1] causes: "Media type mismatch" FFmpeg error.
 */

// ── Inline buildArgs for isolated testing (mirrors the worker exactly) ─────────

function buildArgs(plan, inputPath, captionPath, musicPath, outputPath, hasSourceAudio = true) {
  const segs = (plan.segments || []).filter(s => (s.duration ?? (s.end - s.start)) > 0)
  if (!segs.length) throw new Error('Render plan has no segments with duration > 0')

  const [w, h]   = (plan.resolution || '1080x1920').split('x')
  const crf      = plan.quality === 'high' ? '18' : plan.quality === 'web' ? '26' : '23'
  const hasMusic = !!musicPath

  const inputs  = ['-i', inputPath]
  if (hasMusic) inputs.push('-i', musicPath)

  const filters = []

  segs.forEach((seg, i) => {
    filters.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`)
    if (hasSourceAudio) {
      filters.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`)
    } else {
      const dur = seg.duration ?? (seg.end - seg.start)
      filters.push(`anullsrc=channel_layout=stereo:sample_rate=44100,atrim=duration=${dur},asetpts=PTS-STARTPTS[a${i}]`)
    }
  })

  const n = segs.length
  const interleaved = segs.map((_, i) => `[v${i}][a${i}]`).join('')
  filters.push(`${interleaved}concat=n=${n}:v=1:a=1[catv][cata]`)
  filters.push(`[catv]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[scaled]`)

  let finalAudio = '[cata]'
  if (hasMusic) {
    filters.push(`[1:a]volume=0.6[bed]`)
    filters.push(`[cata]volume=1.0[voice]`)
    filters.push(`[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixeda]`)
    finalAudio = '[mixeda]'
  }

  const filterComplex = filters.join(';')

  return {
    args: [
      ...inputs,
      '-filter_complex', filterComplex,
      '-map', '[scaled]',
      '-map', finalAudio,
      '-c:v', 'libx264', '-preset', 'fast', '-crf', crf,
      '-c:a', 'aac', '-b:a', '128k',
      '-r', '30',
      '-movflags', '+faststart', '-y', outputPath,
    ],
    filterComplex,
  }
}

// ── Test helpers ──────────────────────────────────────────────────────────────

let passed = 0
let failed = 0

function assert(condition, message) {
  if (!condition) {
    console.error(`  FAIL: ${message}`)
    failed++
  } else {
    console.log(`  PASS: ${message}`)
    passed++
  }
}

function test(name, fn) {
  console.log(`\n▶ ${name}`)
  try {
    fn()
  } catch (err) {
    console.error(`  ERROR: ${err.message}`)
    failed++
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

const seg1 = { start: 0, end: 5, duration: 5 }
const seg2 = { start: 5, end: 10, duration: 5 }

test('single segment with audio → [v0][a0]concat=n=1', () => {
  const plan = { segments: [seg1] }
  const { filterComplex } = buildArgs(plan, 'in.mp4', null, null, 'out.mp4', true)
  assert(filterComplex.includes('[v0][a0]concat=n=1:v=1:a=1'), 'concat uses interleaved [v0][a0]')
  assert(!filterComplex.includes('[v0][v1]'), 'no all-video prefix')
  assert(!filterComplex.includes('anullsrc'), 'no anullsrc when source has audio')
})

test('multiple segments with audio → [v0][a0][v1][a1]concat=n=2', () => {
  const plan = { segments: [seg1, seg2] }
  const { filterComplex } = buildArgs(plan, 'in.mp4', null, null, 'out.mp4', true)
  assert(filterComplex.includes('[v0][a0][v1][a1]concat=n=2:v=1:a=1'), 'concat uses interleaved [v0][a0][v1][a1]')
  assert(!filterComplex.includes('[v0][v1][a0][a1]'), 'old wrong ordering absent')
  assert(!filterComplex.includes('anullsrc'), 'no anullsrc when source has audio')
})

test('single segment without audio → anullsrc, no [0:a] reference', () => {
  const plan = { segments: [seg1] }
  const { filterComplex } = buildArgs(plan, 'in.mp4', null, null, 'out.mp4', false)
  assert(filterComplex.includes('anullsrc'), 'anullsrc present for silent source')
  assert(!filterComplex.includes('[0:a]'), 'no [0:a] stream reference when source has no audio')
  assert(filterComplex.includes('[v0][a0]concat=n=1:v=1:a=1'), 'concat still uses interleaved pair')
})

test('multiple segments without audio → interleaved anullsrc pairs', () => {
  const plan = { segments: [seg1, seg2] }
  const { filterComplex } = buildArgs(plan, 'in.mp4', null, null, 'out.mp4', false)
  const anullCount = (filterComplex.match(/anullsrc/g) || []).length
  assert(anullCount === 2, `anullsrc appears once per segment (got ${anullCount})`)
  assert(!filterComplex.includes('[0:a]'), 'no [0:a] stream reference when source has no audio')
  assert(filterComplex.includes('[v0][a0][v1][a1]concat=n=2:v=1:a=1'), 'interleaved pairs with anullsrc audio')
})

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(50)}`)
console.log(`Results: ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
