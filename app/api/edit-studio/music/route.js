import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { rankTracks, buildMusicSummary, buildTimingPlan, TRACK_SELECT } from '../../../../lib/music/scorer.js'

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

// POST /api/edit-studio/music
export async function POST(req) {
  try {
    const body = await req.json()
    const { projectId, platform, goal, selectedCutPlan, directorAnalysis,
            captionSummary, captionSettings, editorCleanup } = body

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: dbTracks, error } = await admin
      .from('music_tracks')
      .select(TRACK_SELECT)
      .eq('is_active', true)
      .order('featured', { ascending: false })

    if (error) throw new Error(error.message)

    const directorMood   = directorAnalysis?.creativeDirection?.musicMood || null
    const directorPacing = directorAnalysis?.creativeDirection?.pacing     || null
    const editDuration   = selectedCutPlan?.totalDuration                  || null

    const recommendedTracks = rankTracks(dbTracks || [], { platform, goal, directorMood, directorPacing, editDuration })
    const topTrack          = recommendedTracks[0]
    const timingPlan        = topTrack ? buildTimingPlan(topTrack, platform, editDuration) : {}
    const musicSummary      = buildMusicSummary(platform, goal, directorMood, directorPacing, editDuration)

    const result = { musicSummary, recommendedTracks, timingPlan }

    if (user && projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({ music_intelligence: result })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', ...result })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
