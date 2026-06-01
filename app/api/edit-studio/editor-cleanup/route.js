import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ─── Constants ────────────────────────────────────────────────────────────────

const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually',
  'sort of', 'kind of', 'right', 'okay', 'so', 'i mean', 'literally']

const WEAK_INTRO_PHRASES = ['today i', 'hi everyone', 'hello', "what's up", 'hey guys',
  'welcome back', 'in this video', 'so today', 'i wanted to']

// ─── Rule-based detection ─────────────────────────────────────────────────────

function detectFillerWords(transcript) {
  const counts = {}
  const timestamps = {}

  for (const seg of transcript) {
    const text  = seg.text.toLowerCase()
    const words = text.split(/\s+/)

    for (const filler of FILLER_WORDS) {
      const fillerWords = filler.split(' ')
      // Single word
      if (fillerWords.length === 1) {
        words.forEach((w, i) => {
          if (w.replace(/[.,!?]/g, '') === filler) {
            counts[filler] = (counts[filler] || 0) + 1
            // Approximate timestamp within segment
            const approxTs = seg.start + (i / words.length) * (seg.end - seg.start)
            ;(timestamps[filler] = timestamps[filler] || []).push(Math.round(approxTs * 10) / 10)
          }
        })
      } else {
        // Multi-word filler
        if (text.includes(filler)) {
          counts[filler] = (counts[filler] || 0) + 1
          ;(timestamps[filler] = timestamps[filler] || []).push(seg.start)
        }
      }
    }
  }

  return Object.entries(counts)
    .filter(([, c]) => c > 0)
    .map(([word, count]) => ({ word, count, timestamps: timestamps[word] || [] }))
    .sort((a, b) => b.count - a.count)
}

function detectRepeatedIdeas(transcript) {
  const repeated = []
  const checked  = new Set()

  for (let i = 0; i < transcript.length; i++) {
    for (let j = i + 1; j < transcript.length; j++) {
      const key = `${i}_${j}`
      if (checked.has(key)) continue
      checked.add(key)

      const wordsA = new Set(transcript[i].text.toLowerCase().split(/\s+/).filter(w => w.length > 4))
      const wordsB = new Set(transcript[j].text.toLowerCase().split(/\s+/).filter(w => w.length > 4))
      const overlap = [...wordsA].filter(w => wordsB.has(w))
      const similarity = overlap.length / Math.max(1, Math.min(wordsA.size, wordsB.size))

      if (similarity > 0.55 && overlap.length >= 3) {
        repeated.push({
          text:        overlap.slice(0, 6).join(' ') + '…',
          occurrences: [
            { start: transcript[i].start, end: transcript[i].end },
            { start: transcript[j].start, end: transcript[j].end },
          ],
          recommendation: 'Keep the version that is more specific or comes closer to the hook.',
        })
      }
    }
  }
  return repeated
}

function detectRemovals(transcript, selectedCutPlan, directorAnalysis) {
  const removals = []
  let id = 0

  // 1. Weak intro — first segment if its text contains weak-intro phrases
  const firstSeg = transcript[0]
  if (firstSeg) {
    const lc = firstSeg.text.toLowerCase()
    const isWeak = WEAK_INTRO_PHRASES.some(p => lc.startsWith(p)) ||
      (firstSeg.end - firstSeg.start > 3 && (firstSeg.confidence || 1) < 0.92)
    if (isWeak) {
      removals.push({
        id:         `r${id++}`,
        type:       'weak_intro',
        start:      firstSeg.start,
        end:        firstSeg.end,
        text:       firstSeg.text,
        reason:     'Opening does not hook immediately. The value starts later — cut this and open on the stronger moment.',
        confidence: 0.88,
        apply:      true,
      })
    }
  }

  // 2. Filler word removals (one per distinct filler found in a segment)
  const foundFillers = {}
  for (const seg of transcript) {
    const words = seg.text.toLowerCase().split(/\s+/)
    for (const filler of FILLER_WORDS.slice(0, 5)) { // top 5 most impactful fillers
      if (!foundFillers[filler] && words.some(w => w.replace(/[.,!?]/g, '') === filler)) {
        const wordIdx  = words.findIndex(w => w.replace(/[.,!?]/g, '') === filler)
        const approxTs = seg.start + (wordIdx / words.length) * (seg.end - seg.start)
        const dur      = filler.length > 2 ? 0.5 : 0.3
        removals.push({
          id:         `r${id++}`,
          type:       'filler',
          start:      Math.round((approxTs - 0.1) * 10) / 10,
          end:        Math.round((approxTs + dur) * 10) / 10,
          text:       `"${filler}"`,
          reason:     `Filler pause before the main point. Removing tightens delivery.`,
          confidence: 0.82,
          apply:      true,
        })
        foundFillers[filler] = true
      }
    }
  }

  // 3. Low-value long sections — segments > 7s with low confidence
  for (const seg of transcript) {
    const dur = seg.end - seg.start
    if (dur > 7 && (seg.confidence || 1) < 0.9 && !removals.some(r => r.start === seg.start)) {
      removals.push({
        id:         `r${id++}`,
        type:       'low_value',
        start:      seg.start,
        end:        seg.end,
        text:       seg.text.slice(0, 60) + (seg.text.length > 60 ? '…' : ''),
        reason:     `Long section (${Math.round(dur)}s) with low signal density. Trim or cut.`,
        confidence: 0.71,
        apply:      false, // suggest but don't default-apply
      })
    }
  }

  // 4. Dead space — gaps between kept segments in the selected cut plan
  if (selectedCutPlan?.removedSegments) {
    for (const gap of selectedCutPlan.removedSegments) {
      const gapDur = gap.end - gap.start
      if (gapDur > 1.5) {
        removals.push({
          id:         `r${id++}`,
          type:       'dead_space',
          start:      gap.start,
          end:        gap.end,
          text:       `${Math.round(gapDur * 10) / 10}s gap`,
          reason:     gap.reason || 'Dead space between segments. Cut transitions will handle this.',
          confidence: 0.95,
          apply:      true,
        })
      }
    }
  }

  return removals.sort((a, b) => a.start - b.start)
}

function detectPacingRecommendations(transcript, selectedCutPlan) {
  const recs = []

  // Find segments that run long relative to their content density
  for (const seg of transcript) {
    const dur   = seg.end - seg.start
    const words = seg.text.split(/\s+/).length
    const wps   = words / dur // words per second
    if (wps < 1.5 && dur > 5) {
      recs.push({
        timestamp:      seg.start,
        recommendation: 'Increase pacing here — delivery is slower than optimal for platform',
        reason:         `Only ${Math.round(wps * 10) / 10} words/second. Target 2–3 wps for social video.`,
      })
    }
  }
  return recs.slice(0, 3) // cap at 3 recommendations
}

// ─── Claude AI enhancement (optional) ────────────────────────────────────────
// Uses Claude claude-opus-4-8 to find subtler issues the rule engine misses.
// Falls back gracefully if the API is unavailable.

const EDITOR_SYSTEM = `You are an AI video editor with expertise in short-form content for social platforms.

Your task: analyze a video transcript and a selected edit plan, then identify specific cleanup opportunities.

Focus on:
- Filler words and verbal tics (um, uh, like, you know, basically)
- Repeated ideas or concepts said twice
- Slow pacing zones where delivery drags
- Unnecessary setup before the real point
- CTA confusion (multiple conflicting calls to action)
- Low-density sections (talking a lot, saying little)

Be specific about timestamps and text. Sound like a professional editor, not a transcript reader.`

async function enhanceWithClaude(transcript, selectedCutPlan, platform, goal, baseRemovals) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const transcriptText = transcript
    .map(s => `[${s.start.toFixed(1)}s→${s.end.toFixed(1)}s] ${s.text}`)
    .join('\n')

  const prompt = `Platform: ${platform || 'Instagram Reel'} | Goal: ${goal || 'Founder Update'}

TRANSCRIPT:
${transcriptText}

SELECTED EDIT PLAN: ${selectedCutPlan ? `"${selectedCutPlan.title}" (${Math.round(selectedCutPlan.totalDuration)}s)` : 'None'}

Rule-based engine already found these issues:
${baseRemovals.map(r => `- [${r.type}] ${r.start.toFixed(1)}s: ${r.text}`).join('\n')}

Identify 2–4 ADDITIONAL cleanup opportunities the rule engine missed. Be specific about timestamps and text. Focus on what will make the edit feel faster and more compelling.

Return JSON only:
{
  "verdict": "one-line verdict on the edit quality",
  "pacingScore": 0-100,
  "additionalRemovals": [
    {"type": "filler|repeat|weak_intro|low_value|dead_space", "start": number, "end": number, "text": "...", "reason": "...", "confidence": number}
  ],
  "pacingNote": "one-line pacing advice"
}`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-opus-4-8',
        max_tokens: 1024,
        thinking:   { type: 'adaptive' },
        output_config: { effort: 'medium' },
        system: [{ type: 'text', text: EDITOR_SYSTEM, cache_control: { type: 'ephemeral' } }],
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!res.ok) return null
    const data   = await res.json()
    const text   = data.content?.find(b => b.type === 'text')?.text || ''
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0]
    return jsonStr ? JSON.parse(jsonStr) : null
  } catch {
    return null
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
// POST /api/edit-studio/editor-cleanup

export async function POST(req) {
  try {
    const body = await req.json()
    const { projectId, transcript, selectedCutPlan, directorAnalysis, platform, goal } = body

    if (!transcript?.length) {
      return NextResponse.json({ status: 'error', message: 'Generate a transcript first.' }, { status: 400 })
    }
    if (!selectedCutPlan) {
      return NextResponse.json({ status: 'error', message: 'Select an AI Edit Plan first.' }, { status: 400 })
    }

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // ── Rule-based detection ─────────────────────────────────────────────────
    const removals              = detectRemovals(transcript, selectedCutPlan, directorAnalysis)
    const fillerWords           = detectFillerWords(transcript)
    const repeatedIdeas         = detectRepeatedIdeas(transcript)
    const pacingRecommendations = detectPacingRecommendations(transcript, selectedCutPlan)

    // ── Claude enhancement ───────────────────────────────────────────────────
    const aiEnhancement = await enhanceWithClaude(transcript, selectedCutPlan, platform, goal, removals)

    // Merge AI additional removals (deduplicate by time proximity)
    if (aiEnhancement?.additionalRemovals) {
      let nextId = removals.length
      for (const ar of aiEnhancement.additionalRemovals) {
        const overlap = removals.some(r => Math.abs(r.start - ar.start) < 1)
        if (!overlap && ar.start != null && ar.end != null) {
          removals.push({ id: `r${nextId++}`, apply: true, ...ar })
        }
      }
    }

    // ── Build summary ────────────────────────────────────────────────────────
    const originalDuration   = selectedCutPlan.totalDuration || transcript.at(-1)?.end || 0
    const timeRemoved        = removals.filter(r => r.apply).reduce((n, r) => n + (r.end - r.start), 0)
    const cleanedDuration    = Math.max(0, originalDuration - timeRemoved)
    const applyCount         = removals.filter(r => r.apply).length
    const pacingScore        = aiEnhancement?.pacingScore ?? Math.max(40, Math.min(95, 90 - removals.length * 4))

    const verdict = aiEnhancement?.verdict
      ?? (applyCount === 0
        ? 'Your edit is already tight. No major cleanup needed.'
        : `AI Editor found ${applyCount} cleanup opportunit${applyCount === 1 ? 'y' : 'ies'}. Estimated ${Math.round(timeRemoved * 10) / 10}s removed.`)

    const cleanupResult = {
      cleanupSummary: {
        verdict,
        estimatedTimeRemoved: Math.round(timeRemoved * 10) / 10,
        originalDuration:     Math.round(originalDuration * 10) / 10,
        cleanedDuration:      Math.round(cleanedDuration * 10) / 10,
        pacingScore,
        aiEnhanced:           !!aiEnhancement,
      },
      removals:               removals.sort((a, b) => a.start - b.start),
      fillerWords,
      repeatedIdeas,
      pacingRecommendations,
    }

    // ── Persist (non-fatal) ──────────────────────────────────────────────────
    if (user && projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({ editor_cleanup: cleanupResult })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', ...cleanupResult })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
