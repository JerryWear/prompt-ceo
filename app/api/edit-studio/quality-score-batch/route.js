import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'
import { scoreAd } from '../quality-score/route.js'

// Allow up to 60 seconds — 5 parallel GPT-4o calls
export const maxDuration = 60

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

// ─── Render readiness checks ──────────────────────────────────────────────────

const MIN_AVG_SCORE = 6.0
const MIN_AD_SCORE  = 4.0

function assessReadiness(scores) {
  const validScores  = scores.filter(s => typeof s.overall_score === 'number')
  if (!validScores.length) {
    return { ready_to_render: false, render_warning: 'No valid scores produced — run quality scoring again.' }
  }

  const avg         = validScores.reduce((sum, s) => sum + s.overall_score, 0) / validScores.length
  const avgRounded  = Math.round(avg * 10) / 10

  const hasCritical = validScores.some(s => s.overall_score < MIN_AD_SCORE)

  if (hasCritical) {
    const weak = validScores.filter(s => s.overall_score < MIN_AD_SCORE).map(s => s.adType).join(', ')
    return {
      ready_to_render: false,
      render_warning:  `Ad(s) scored below ${MIN_AD_SCORE} (grade F): ${weak}. Revise scripts before rendering to avoid wasted render credits.`,
      avg_score:       avgRounded,
    }
  }

  if (avgRounded < MIN_AVG_SCORE) {
    return {
      ready_to_render: false,
      render_warning:  `Average quality score is ${avgRounded} — below the ${MIN_AVG_SCORE} threshold. Review fix_targets in each ad before rendering.`,
      avg_score:       avgRounded,
    }
  }

  return { ready_to_render: true, render_warning: null, avg_score: avgRounded }
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/quality-score-batch
// Body: { projectId }

export async function POST(req) {
  const log = makeRouteLogger('quality-score-batch')

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

    // ── Fetch project (ownership + context) ───────────────────────────────────
    const { data: project, error: projectErr } = await supabaseAdmin
      .from('edit_projects')
      .select('id, user_id, understanding_data, creative_strategy')
      .eq('id', projectId)
      .single()

    if (projectErr || !project) {
      return NextResponse.json(
        { status: 'error', ok: false, message: `Project not found: ${projectErr?.message ?? 'unknown error'}` },
        { status: 404 }
      )
    }

    // Security: confirm project belongs to authenticated user
    if (project.user_id !== user.id) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Project not found.' },
        { status: 404 }
      )
    }

    // ── Fetch all ads for project ─────────────────────────────────────────────
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

    log.info(`Scoring ${ads.length} ad(s) for project ${projectId}`)

    // ── Score all ads in parallel — individual failures do not block others ────
    const settled = await Promise.allSettled(
      ads.map(ad => scoreAd(ad, project, supabaseAdmin))
    )

    // Map results: fulfilled = scores, rejected = error entry
    const scores = settled.map((outcome, i) => {
      const ad = ads[i]
      if (outcome.status === 'fulfilled') {
        const s = outcome.value
        return {
          adId:          ad.id,
          adType:        ad.ad_type,
          grade:         s.grade,
          overall_score: s.overall_score,
          fix_targets:   s.fix_targets || [],
          error:         null,
        }
      }
      // Promise rejected — defensive path (scoreAd has internal try/catch)
      return {
        adId:          ad.id,
        adType:        ad.ad_type,
        grade:         null,
        overall_score: null,
        fix_targets:   [],
        error:         outcome.reason?.message ?? 'Unknown error',
      }
    })

    // ── Derive summary stats ──────────────────────────────────────────────────
    const validScores = scores.filter(s => typeof s.overall_score === 'number')

    const strongest = validScores.length
      ? validScores.reduce((best, s) => s.overall_score > best.overall_score ? s : best)
      : null

    const weakest = validScores.length
      ? validScores.reduce((worst, s) => s.overall_score < worst.overall_score ? s : worst)
      : null

    const readiness = assessReadiness(validScores)

    const summary = {
      strongest: strongest ? { adId: strongest.adId, adType: strongest.adType, overall_score: strongest.overall_score } : null,
      weakest:   weakest   ? { adId: weakest.adId,   adType: weakest.adType,   overall_score: weakest.overall_score   } : null,
      avg_score: readiness.avg_score ?? null,
    }

    log.success({
      projectId,
      extra: {
        totalAds:        ads.length,
        scored:          validScores.length,
        avg_score:       summary.avg_score,
        ready_to_render: readiness.ready_to_render,
      },
    })

    return NextResponse.json({
      status:          'success',
      ok:              true,
      scores,
      strongest:       summary.strongest,
      weakest:         summary.weakest,
      avg_score:       summary.avg_score,
      ready_to_render: readiness.ready_to_render,
      render_warning:  readiness.render_warning,
    })
  } catch (err) {
    log.failure({ errorCode: 'QUALITY_SCORE_BATCH_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
