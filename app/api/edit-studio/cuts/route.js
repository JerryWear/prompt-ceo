import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtTime(s = 0) {
  const m   = Math.floor(s / 60)
  const sec = (s % 60).toFixed(1).padStart(4, '0')
  return `${m}:${sec}`
}

// Find transcript text that covers a given time range (with 0.5s tolerance)
function transcriptTextInRange(transcript, start, end) {
  const segs = transcript.filter(s => s.start < end + 0.5 && s.end > start - 0.5)
  return segs.map(s => s.text).join(' ').trim()
}

// ─── Core: convert directorAnalysis.cutRecommendations → cutPlans ─────────────

function buildCutPlans(directorAnalysis, transcript, platform, goal) {
  const recs = directorAnalysis.cutRecommendations || []

  return recs.map((rec, i) => {
    // Map each structure item to a transcript-backed segment
    const segments = (rec.structure || []).map((struct, j) => ({
      id:             `seg_${i}_${j}`,
      type:           struct.type,
      label:          ({ hook: 'Hook', proof: 'Proof', value: 'Value', cta: 'CTA', transition: 'Transition' }[struct.type] || struct.type),
      start:          struct.start,
      end:            struct.end,
      duration:       Math.round((struct.end - struct.start) * 10) / 10,
      transcriptText: transcriptTextInRange(transcript, struct.start, struct.end),
      reason:         struct.reason,
      keep:           true,
    }))

    // Identify gaps between segments as removed sections
    const removedSegments = []
    for (let k = 0; k < segments.length - 1; k++) {
      const gap = segments[k + 1].start - segments[k].end
      if (gap > 0.3) {
        removedSegments.push({
          start:  segments[k].end,
          end:    segments[k + 1].start,
          reason: transcriptTextInRange(transcript, segments[k].end, segments[k + 1].start)
            ? 'Trimmed section — content covered by adjacent segments'
            : 'Gap between selected moments',
        })
      }
    }

    // Also add anything before the first segment or after the last
    if (segments.length && segments[0].start > 0.5) {
      removedSegments.unshift({
        start:  0,
        end:    segments[0].start,
        reason: 'Weak opening — cut per AI Director recommendation',
      })
    }

    return {
      id:            rec.id || `plan_${i}`,
      title:         rec.title,
      platform:      rec.platform || platform,
      goal:          rec.goal     || goal,
      totalDuration: Math.round((rec.duration ?? (rec.end - rec.start)) * 10) / 10,
      score:         rec.score,
      status:        'draft',
      segments,
      removedSegments,
      directorNotes: directorAnalysis.directorSummary?.verdict || '',
      captionStyle:  rec.captionStyle,
      musicMood:     rec.musicMood,
      cta:           rec.cta,
    }
  })
}

// ─── Mock fallback ────────────────────────────────────────────────────────────

function buildMockCutPlans(transcript, platform, goal) {
  const dur    = transcript.at(-1)?.end || 29
  const segs   = transcript
  const first  = segs[0]  || { start: 0,   end: 3,   text: '' }
  const second = segs[1]  || { start: 3.5, end: 7,   text: '' }
  const third  = segs[2]  || { start: 7,   end: 12,  text: '' }
  const last   = segs.at(-1) || { start: 23, end: dur, text: '' }

  return [
    {
      id:            'plan_hook_first',
      title:         'Hook-First Cut',
      platform:      platform || 'instagram',
      goal:          goal     || 'founder',
      totalDuration: Math.round((last.end - second.start) * 10) / 10,
      score:         89,
      status:        'draft',
      segments: [
        { id: 'seg_0_0', type: 'hook',  label: 'Hook',  start: second.start, end: second.end, duration: second.end - second.start, transcriptText: second.text, reason: 'Opens on the strongest moment in the video', keep: true },
        { id: 'seg_0_1', type: 'value', label: 'Value', start: third.start,  end: third.end,  duration: third.end  - third.start,  transcriptText: third.text,  reason: 'Core insight — no setup needed',              keep: true },
        { id: 'seg_0_2', type: 'cta',   label: 'CTA',   start: last.start,   end: last.end,   duration: last.end   - last.start,   transcriptText: last.text,   reason: 'Clear close with action signal',               keep: true },
      ],
      removedSegments: [
        { start: 0, end: second.start, reason: 'Weak opening — cut per AI Director' },
        { start: third.end, end: last.start, reason: 'Low-value connector sections removed' },
      ],
      directorNotes:  'Start on your strongest moment. Cut the setup.',
      captionStyle:   'Bold',
      musicMood:      'Motivational',
      cta:            'Follow for more',
    },
    {
      id:            'plan_full',
      title:         'Full Video',
      platform:      platform || 'linkedin',
      goal:          goal     || 'founder',
      totalDuration: Math.round(dur * 10) / 10,
      score:         72,
      status:        'draft',
      segments: segs.map((s, i) => ({
        id:             `seg_1_${i}`,
        type:           i === 0 ? 'hook' : i === segs.length - 1 ? 'cta' : 'value',
        label:          i === 0 ? 'Hook' : i === segs.length - 1 ? 'CTA' : 'Value',
        start:          s.start,
        end:            s.end,
        duration:       s.end - s.start,
        transcriptText: s.text,
        reason:         i === 0 ? 'Opening context' : i === segs.length - 1 ? 'Closing action' : 'Core content',
        keep:           true,
      })),
      removedSegments:  [],
      directorNotes:    'Full video — best for LinkedIn or YouTube Short under 60s.',
      captionStyle:     'Clean',
      musicMood:        'Focused',
      cta:              'Link in bio',
    },
  ]
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
// POST /api/edit-studio/cuts
// Body: { projectId?, directorAnalysis, transcript, platform, goal }

export async function POST(req) {
  try {
    const body = await req.json()
    const { projectId, directorAnalysis, transcript, platform, goal } = body

    // Validation
    if (!transcript?.length) {
      return NextResponse.json({ status: 'error', message: 'Generate a transcript first.' }, { status: 400 })
    }
    if (!directorAnalysis) {
      return NextResponse.json({ status: 'error', message: 'Run AI Director analysis first.' }, { status: 400 })
    }

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // Build cut plans from director analysis
    let cutPlans
    let fallback       = false
    let fallbackReason = ''

    try {
      cutPlans = buildCutPlans(directorAnalysis, transcript, platform, goal)
      if (!cutPlans.length) throw new Error('No cut recommendations in director analysis')
    } catch (err) {
      fallback       = true
      fallbackReason = `Fallback: ${err.message}`
      cutPlans       = buildMockCutPlans(transcript, platform, goal)
    }

    // Persist to Supabase (non-fatal)
    if (user && projectId) {
      try {
        // Save to edit_cut_suggestions
        await supabase
          .from('edit_cut_suggestions')
          .upsert(
            {
              project_id:  projectId,
              suggestions: cutPlans,
              model:       'director_v1',
            },
            { onConflict: 'project_id' }
          )

        // Patch edit_projects
        await supabase
          .from('edit_projects')
          .update({ status: 'edited', cut_plans: cutPlans })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch {
        // Non-fatal
      }
    }

    return NextResponse.json({
      status:          'success',
      fallback,
      fallback_reason: fallback ? fallbackReason : undefined,
      cutPlans,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
