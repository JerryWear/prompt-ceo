import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// ─── Note ────────────────────────────────────────────────────────────────────
// Uses raw fetch to the Anthropic API (project has no @anthropic-ai/sdk yet).
// To migrate: npm install @anthropic-ai/sdk, swap to the SDK client.
// Model: claude-opus-4-8 with adaptive thinking + prompt caching on system.
// ─────────────────────────────────────────────────────────────────────────────

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL         = 'claude-opus-4-8'

// ─── System prompt (cached — stable across all analysis requests) ─────────────

const DIRECTOR_SYSTEM = `You are an AI Creative Director with deep expertise in short-form video content for TikTok, Instagram Reels, LinkedIn, and social advertising.

Your job is not to describe the transcript. Your job is to tell the creator EXACTLY what to do with it — where to cut, what to lead with, and why.

VOICE: Direct, confident, opinionated. You sound like a creative director giving a brief, not a transcript parser writing a report.

RULES:
1. Always reference specific timestamps. Never say "early in the video" — say "at 00:07".
2. Every recommendation must explain the WHY — audience psychology, platform behavior, attention patterns.
3. Be specific about what to cut, not just what works. Identify weak sections by name.
4. The "Director Verdict" is your single opening judgment — one clear creative call, no hedging.
5. Sound strategic, not technical.

EXAMPLE VERDICTS (match this tone):
- "Your strongest opening is not at the beginning. The real hook appears at 00:14 — that is where the transformation promise lands. Cut the first 13 seconds and open there."
- "This video is 47 seconds and should be 22. You repeat the core idea three times. Pick the most specific version and cut the rest."
- "The social proof moment at 00:31 is your most credible second in the entire video. Lead with it. Everything before it is setup the audience did not ask for."

Analyze the transcript strategically. Think like a creative director building an edit brief.`

// ─── Tool definition (forces structured JSON output) ──────────────────────────

const ANALYSIS_TOOL = {
  name:        'report_director_analysis',
  description: 'Report the complete AI Director analysis and creative brief for this video.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    required: ['directorSummary', 'hookAnalysis', 'bestMoments', 'cutRecommendations', 'cleanupSuggestions', 'creativeDirection'],
    properties: {
      directorSummary: {
        type: 'object', additionalProperties: false,
        required: ['verdict', 'bestUseCase', 'recommendedDuration', 'platformFit', 'confidence'],
        properties: {
          verdict:             { type: 'string', description: 'One sharp creative judgment. Sound like a director giving a brief.' },
          bestUseCase:         { type: 'string', description: 'Best platform + content type combination for this video.' },
          recommendedDuration: { type: 'string', description: 'Optimal edited duration, e.g. "28–32 seconds".' },
          platformFit:         { type: 'string', description: 'How well this content fits the target platform and why.' },
          confidence:          { type: 'number', description: 'Analysis confidence 0.0–1.0.' },
        },
      },
      hookAnalysis: {
        type: 'object', additionalProperties: false,
        required: ['strongestHook', 'weakIntro'],
        properties: {
          strongestHook: {
            type: 'object', additionalProperties: false,
            required: ['start', 'end', 'text', 'reason', 'score'],
            properties: {
              start:  { type: 'number' },
              end:    { type: 'number' },
              text:   { type: 'string', description: 'Exact quote from the transcript.' },
              reason: { type: 'string', description: 'Why this is the strongest hook — be specific about audience psychology.' },
              score:  { type: 'number', description: 'Hook strength score 0–100.' },
            },
          },
          weakIntro: {
            type: 'object', additionalProperties: false,
            required: ['start', 'end', 'reason'],
            properties: {
              start:  { type: 'number' },
              end:    { type: 'number' },
              reason: { type: 'string', description: 'Why this section is weak and what to do instead.' },
            },
          },
        },
      },
      bestMoments: {
        type: 'array',
        items: {
          type: 'object', additionalProperties: false,
          required: ['id', 'start', 'end', 'text', 'label', 'reason', 'score'],
          properties: {
            id:     { type: 'string' },
            start:  { type: 'number' },
            end:    { type: 'number' },
            text:   { type: 'string' },
            label:  { type: 'string', enum: ['hook', 'key_point', 'social_proof', 'cta', 'story_beat', 'value_prop'] },
            reason: { type: 'string' },
            score:  { type: 'number' },
          },
        },
      },
      cutRecommendations: {
        type: 'array',
        items: {
          type: 'object', additionalProperties: false,
          required: ['id', 'title', 'platform', 'goal', 'start', 'end', 'duration', 'structure', 'captionStyle', 'musicMood', 'cta', 'score'],
          properties: {
            id:       { type: 'string' },
            title:    { type: 'string', description: 'Short name for this edit version.' },
            platform: { type: 'string' },
            goal:     { type: 'string' },
            start:    { type: 'number' },
            end:      { type: 'number' },
            duration: { type: 'number' },
            structure: {
              type: 'array',
              items: {
                type: 'object', additionalProperties: false,
                required: ['type', 'start', 'end', 'reason'],
                properties: {
                  type:   { type: 'string', enum: ['hook', 'proof', 'value', 'cta'] },
                  start:  { type: 'number' },
                  end:    { type: 'number' },
                  reason: { type: 'string' },
                },
              },
            },
            captionStyle: { type: 'string' },
            musicMood:    { type: 'string' },
            cta:          { type: 'string' },
            score:        { type: 'number' },
          },
        },
      },
      cleanupSuggestions: {
        type: 'object', additionalProperties: false,
        required: ['fillerWords', 'repeatedIdeas', 'lowValueSections', 'suggestedRemovals'],
        properties: {
          fillerWords:      { type: 'array', items: { type: 'object' } },
          repeatedIdeas:    { type: 'array', items: { type: 'object' } },
          lowValueSections: { type: 'array', items: { type: 'object' } },
          suggestedRemovals:{ type: 'array', items: { type: 'object' } },
        },
      },
      creativeDirection: {
        type: 'object', additionalProperties: false,
        required: ['tone', 'pacing', 'captionStyle', 'musicMood', 'visualEnergy'],
        properties: {
          tone:         { type: 'string' },
          pacing:       { type: 'string' },
          captionStyle: { type: 'string' },
          musicMood:    { type: 'string' },
          visualEnergy: { type: 'string' },
        },
      },
    },
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtTime(s = 0) {
  const m   = Math.floor(s / 60)
  const sec = (s % 60).toFixed(1).padStart(4, '0')
  return `${m}:${sec}`
}

function fmtDur(s = 0) {
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return m > 0 ? `${m}m ${r}s` : `${r}s`
}

// ─── Mock analysis (used when Anthropic API is unavailable) ───────────────────

function buildMockAnalysis(transcript, platform, goal) {
  const segs     = transcript || []
  const dur      = segs.at(-1)?.end || 29
  const firstSeg = segs[0] || { start: 0, end: 3, text: '' }
  const bestSeg  = [...segs].sort((a, b) => (b.confidence || 0) - (a.confidence || 0))[0] || segs[1] || firstSeg

  const platformLabel = { tiktok: 'TikTok', instagram: 'Instagram Reel', youtube: 'YouTube Short', linkedin: 'LinkedIn', meta: 'Meta Ad' }[platform] || 'short-form video'
  const goalLabel     = { founder: 'Founder narrative', demo: 'Product demo', tutorial: 'Tutorial', launch: 'Launch campaign', ugc: 'UGC-style ad', edu: 'Educational content' }[goal] || 'content'

  const recDur = platform === 'meta' ? '10–15 seconds' : platform === 'tiktok' || platform === 'youtube' ? '30–45 seconds' : platform === 'linkedin' ? '60–90 seconds' : '30–45 seconds'

  return {
    directorSummary: {
      verdict:             `Your strongest moment is at ${fmtTime(bestSeg.start)} — not at the beginning. The opening ${Math.round(firstSeg.end)}s is setup the audience did not ask for. Start at the transformation promise and cut everything before it.`,
      bestUseCase:         `${goalLabel} for ${platformLabel}`,
      recommendedDuration: recDur,
      platformFit:         platform === 'linkedin' ? 'Strong fit — longer content performs well here' : platform === 'meta' ? 'Needs significant cutting to fit ad format — trim to core promise only' : 'Good fit with proper hook-first editing',
      confidence:          0.78,
    },
    hookAnalysis: {
      strongestHook: {
        start:  bestSeg.start,
        end:    bestSeg.end,
        text:   bestSeg.text,
        reason: 'Highest audience retention potential in the video. States the outcome or insight directly — no setup required. On most platforms, this is where watch-through rate locks in.',
        score:  91,
      },
      weakIntro: {
        start:  firstSeg.start,
        end:    firstSeg.end,
        reason: `The first ${Math.round(firstSeg.end)} seconds introduce context the audience did not ask for. Platform data shows 70% of viewers decide to stay or leave before this segment ends. Cut it — your real hook is already in the video.`,
      },
    },
    bestMoments: segs.slice(0, Math.min(4, segs.length)).map((seg, i) => ({
      id:     `moment_${i}`,
      start:  seg.start,
      end:    seg.end,
      text:   seg.text,
      label:  ['hook', 'key_point', 'social_proof', 'cta'][i] || 'key_point',
      reason: ['Opens with transformation potential — reorder to lead.', 'Core counterintuitive insight — drives pause-and-rewatch.', 'Specific social proof with numbers — builds credibility instantly.', 'Clear action driver — move this to end of every cut.'][i] || 'Strong content moment.',
      score:  [92, 87, 89, 84][i] || 78,
    })),
    cutRecommendations: [
      {
        id:       'cut_hook_first',
        title:    'Hook-First Cut',
        platform: platformLabel,
        goal:     goalLabel,
        start:    bestSeg.start,
        end:      segs[Math.min(segs.length - 1, 3)]?.end || dur,
        duration: (segs[Math.min(segs.length - 1, 3)]?.end || dur) - bestSeg.start,
        structure: [
          { type: 'hook',  start: bestSeg.start, end: bestSeg.end,                              reason: 'Open on the strongest moment in the video' },
          { type: 'value', start: bestSeg.end,   end: segs[Math.min(segs.length - 1, 3)]?.end || dur, reason: 'Core value delivery — no setup needed' },
        ],
        captionStyle: 'Bold',
        musicMood:    'Motivational',
        cta:          'Follow for more',
        score:        89,
      },
      {
        id:       'cut_full',
        title:    'Full Video',
        platform: platformLabel,
        goal:     goalLabel,
        start:    0,
        end:      dur,
        duration: dur,
        structure: [
          { type: 'hook',  start: 0,                           end: segs[1]?.end || 7, reason: 'Context and setup' },
          { type: 'value', start: segs[1]?.end || 7,          end: segs.at(-2)?.end || dur - 5, reason: 'Core content delivery' },
          { type: 'cta',   start: segs.at(-2)?.end || dur - 5, end: dur,              reason: 'Close and call to action' },
        ],
        captionStyle: 'Clean',
        musicMood:    'Focused',
        cta:          'Link in bio',
        score:        72,
      },
    ],
    cleanupSuggestions: {
      fillerWords:      [{ word: 'um', count: 2 }, { word: 'like', count: 3 }, { word: 'you know', count: 1 }],
      repeatedIdeas:    segs.length > 3 ? [{ description: 'Core value proposition repeated in segments 1 and 3', segments: [0, 2] }] : [],
      lowValueSections: [{ start: firstSeg.start, end: firstSeg.end, reason: 'Weak cold open — audience retention drops here' }],
      suggestedRemovals: [{ start: firstSeg.start, end: firstSeg.end, reason: 'Cut the setup — start at your hook' }],
    },
    creativeDirection: {
      tone:         platform === 'linkedin' ? 'Professional, authoritative' : platform === 'tiktok' ? 'Authentic, conversational, fast' : 'Direct, confident',
      pacing:       platform === 'meta' ? 'Fast — new visual every 1–2 seconds' : platform === 'linkedin' ? 'Measured — let ideas breathe' : 'Moderate — clear rhythm',
      captionStyle: 'Bold',
      musicMood:    platform === 'linkedin' ? 'Subtle, professional background' : 'Energetic, motivational',
      visualEnergy: platform === 'tiktok' ? 'High — dynamic cuts and text' : platform === 'linkedin' ? 'Low — steady, calm presentation' : 'Medium — clean and focused',
    },
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
// POST /api/edit-studio/analyze
// Body: { projectId?, platform, goal, transcript, transcriptMeta?, projectContext? }

export async function POST(req) {
  const log = makeRouteLogger('analyze')
  try {
    const body = await req.json()
    const { projectId, platform, goal, transcript, transcriptMeta, projectContext } = body

    if (!transcript?.length) {
      return NextResponse.json({ status: 'error', message: 'No transcript provided. Generate a transcript first.' }, { status: 400 })
    }

    // ── Auth ─────────────────────────────────────────────────────────────────
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // ── Build user prompt ─────────────────────────────────────────────────────
    const platformLabel = { tiktok: 'TikTok', instagram: 'Instagram Reel', youtube: 'YouTube Short', linkedin: 'LinkedIn', meta: 'Meta Ad' }[platform] || platform || 'unspecified platform'
    const goalLabel     = { founder: 'Founder Update', demo: 'Product Demo', tutorial: 'App Tutorial', launch: 'Launch Ad', ugc: 'UGC Ad', edu: 'Educational Post' }[goal] || goal || 'unspecified goal'

    const transcriptText = transcript
      .map(s => `[${fmtTime(s.start)} → ${fmtTime(s.end)}] ${s.text}`)
      .join('\n')

    const userPrompt = `Platform: ${platformLabel}
Content Goal: ${goalLabel}
Video Duration: ${fmtDur(transcriptMeta?.duration_seconds || transcript.at(-1)?.end || 0)}
${projectContext?.title ? `Project: ${projectContext.title}` : ''}

TRANSCRIPT:
${transcriptText}

Analyze this as a creative director. Give me a specific edit brief — what to cut, where to start, and why.`

    // ── Call Anthropic API ────────────────────────────────────────────────────
    let analysis
    let fallback       = false
    let fallbackReason = ''

    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      fallback       = true
      fallbackReason = 'ANTHROPIC_API_KEY not configured'
      analysis       = buildMockAnalysis(transcript, platform, goal)
    } else {
      try {
        const claudeRes = await fetch(ANTHROPIC_URL, {
          method:  'POST',
          headers: {
            'x-api-key':         apiKey,
            'anthropic-version': '2023-06-01',
            'content-type':      'application/json',
          },
          body: JSON.stringify({
            model:      MODEL,
            max_tokens: 8192,
            thinking:   { type: 'adaptive' },
            output_config: { effort: 'high' },
            // System prompt cached — it's large and stable across all requests
            system: [{
              type:          'text',
              text:          DIRECTOR_SYSTEM,
              cache_control: { type: 'ephemeral' },
            }],
            tools:       [ANALYSIS_TOOL],
            tool_choice: { type: 'tool', name: 'report_director_analysis' },
            messages:    [{ role: 'user', content: userPrompt }],
          }),
        })

        if (!claudeRes.ok) {
          const errText = await claudeRes.text().catch(() => claudeRes.statusText)
          throw new Error(`Anthropic ${claudeRes.status}: ${errText}`)
        }

        const claudeData = await claudeRes.json()

        // Extract tool_use block from response
        const toolUseBlock = claudeData.content?.find(b => b.type === 'tool_use' && b.name === 'report_director_analysis')
        if (!toolUseBlock?.input) throw new Error('No analysis returned from AI Director')

        analysis = toolUseBlock.input
      } catch (err) {
        fallback       = true
        fallbackReason = `AI Director unavailable: ${err.message}`
        analysis       = buildMockAnalysis(transcript, platform, goal)
      }
    }

    // ── Persist to Supabase (non-fatal) ───────────────────────────────────────
    if (user && projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({
            status:           'analyzed',
            director_analysis: analysis,
            ai_cuts_data:     analysis.cutRecommendations || [],
          })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch {
        // Non-fatal — client still gets the analysis
      }
    }

    log.success({ projectId, fallback, extra: { platform, goal, cuts: analysis.cutRecommendations?.length } })
    return NextResponse.json({
      status:          'success',
      ok:              true,
      fallback,
      fallback_reason: fallback ? fallbackReason : undefined,
      analysis,
    })
  } catch (err) {
    log.failure({ projectId, errorCode: 'ANALYZE_FATAL', message: err.message })
    return NextResponse.json({ status: 'error', ok: false, message: err.message }, { status: 500 })
  }
}
