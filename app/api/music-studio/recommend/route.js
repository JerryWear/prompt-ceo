import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { rankTracks, buildMusicSummary, buildTimingPlan, TRACK_SELECT } from '../../../../lib/music/scorer.js'

// POST /api/music-studio/recommend
// Shared recommendation endpoint for Music Studio UI and future Ad Studio calls.
export async function POST(req) {
  try {
    const body = await req.json()
    const { platform, goal, directorAnalysis, videoLength, mood, energy } = body

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    let query = admin
      .from('music_tracks')
      .select(TRACK_SELECT)
      .eq('is_active', true)
      .order('featured', { ascending: false })

    if (mood)   query = query.ilike('mood', `%${mood}%`)
    if (energy) query = query.eq('energy', energy)

    const { data: dbTracks, error } = await query
    if (error) throw new Error(error.message)

    const directorMood   = directorAnalysis?.creativeDirection?.musicMood || null
    const directorPacing = directorAnalysis?.creativeDirection?.pacing     || null

    const recommendedTracks = rankTracks(dbTracks || [], {
      platform, goal, directorMood, directorPacing, editDuration: videoLength || null,
    })
    const topTrack     = recommendedTracks[0]
    const timingPlan   = topTrack ? buildTimingPlan(topTrack, platform, videoLength || null) : {}
    const musicSummary = buildMusicSummary(platform, goal, directorMood, directorPacing, videoLength || null)

    return NextResponse.json({ status: 'success', recommendedTracks, musicSummary, timingPlan })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
