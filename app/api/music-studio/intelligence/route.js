import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { recommendMusicForAd } from '../../../prompt-engine-v3/ad-system/musicRecommendation.js'
import { TRACK_SELECT } from '../../../../lib/music/scorer.js'
import {
  deriveUserProfile,
  buildAdConfig,
  selectHeroCollection,
  computeCollectionStats,
  computeMetrics,
  buildReasoningChain,
  PLATFORM_LABELS,
} from '../../../../lib/music/intelligenceAssembler.js'

// Extended track select adds fields needed by recommendMusicForAd that TRACK_SELECT omits
const FULL_TRACK_SELECT = TRACK_SELECT + ', mood_fit, visual_style_fit, commercial_score'

function adminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

function countFreq(items) {
  const map = {}
  items.forEach(v => { if (v) map[v] = (map[v] || 0) + 1 })
  return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([id, count]) => ({ id, count }))
}

// GET /api/music-studio/intelligence
export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const admin = adminClient()

    const [
      campaignMemoryResult,
      usageLogsResult,
      perfLogsResult,
      tracksResult,
    ] = await Promise.allSettled([
      admin.from('campaign_memory')
        .select('successful_patterns, top_platforms')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),

      admin.from('music_usage_logs')
        .select('track_id, action, created_at, music_tracks(title, mood, bpm, energy)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50),

      admin.from('performance_logs')
        .select('platform, ctr')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200),

      admin.from('music_tracks')
        .select(FULL_TRACK_SELECT)
        .eq('is_active', true)
        .order('featured', { ascending: false }),
    ])

    const campaignMemories = campaignMemoryResult.status === 'fulfilled' ? (campaignMemoryResult.value.data || []) : []
    const usageLogs        = usageLogsResult.status === 'fulfilled'      ? (usageLogsResult.value.data || [])      : []
    const perfLogs         = perfLogsResult.status === 'fulfilled'       ? (perfLogsResult.value.data || [])       : []
    const tracks           = tracksResult.status === 'fulfilled'         ? (tracksResult.value.data || [])         : []

    const patterns     = campaignMemories.map(m => m.successful_patterns || {})
    const topGoals     = countFreq(patterns.map(p => p.goal))
    const topStyles    = countFreq(patterns.map(p => p.style))
    const allPlatforms = campaignMemories.flatMap(m => m.top_platforms || [])
    const topPlatforms = countFreq(allPlatforms)
    const campaignSummary = { topGoals, topStyles, topPlatforms, total: patterns.length }

    const perfPlatformCounts = {}
    perfLogs.forEach(l => {
      if (l.platform) perfPlatformCounts[l.platform] = (perfPlatformCounts[l.platform] || 0) + 1
    })
    const perfTopPlatforms = Object.entries(perfPlatformCounts)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
    const performanceInsights = perfLogs.length >= 5
      ? { ready: true, topPlatforms: perfTopPlatforms }
      : { ready: false }

    const userProfile       = deriveUserProfile(campaignSummary, performanceInsights, usageLogs)
    const adConfig          = buildAdConfig(userProfile)
    const scored            = recommendMusicForAd(adConfig, tracks)
    const topTracks         = scored.slice(0, 6)
    const topTrack          = topTracks[0] || null

    const recommendedTracks = topTracks.map(t => ({
      ...t,
      fitScore:         t.matchScore,
      reason:           t.whyFits,
      preview_file_url: t.preview_file_url ? `/api/stream-track/${t.id}` : null,
    }))

    const heroRecommendation     = selectHeroCollection(userProfile)
    const collections            = computeCollectionStats(tracks)
    const metrics                = computeMetrics(tracks, usageLogs, userProfile, topTrack)
    const reasoningChain         = buildReasoningChain(campaignSummary, userProfile, topTrack)

    const recommendedCollections = []
    if (heroRecommendation) {
      recommendedCollections.push({
        id:         heroRecommendation.collectionId,
        confidence: heroRecommendation.confidence,
        reason:     heroRecommendation.reason,
      })
    }
    if (userProfile.primaryPlatform) {
      const platformCollectionMap = {
        linkedin:  'founder_authority',
        youtube:   'educational_content',
        tiktok:    'viral_short_form',
        instagram: 'product_launch',
        meta:      'product_launch',
      }
      const secondId = platformCollectionMap[userProfile.primaryPlatform]
      if (secondId && secondId !== heroRecommendation?.collectionId) {
        recommendedCollections.push({
          id:         secondId,
          confidence: Math.round(userProfile.confidence * 85),
          reason:     `Matches your primary platform (${PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform}).`,
        })
      }
    }

    return NextResponse.json({
      status: 'success',
      userProfile,
      heroRecommendation,
      recommendedTracks,
      recommendedCollections,
      collections,
      metrics,
      reasoningChain,
    }, {
      headers: { 'Cache-Control': 'private, max-age=300' },
    })

  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
