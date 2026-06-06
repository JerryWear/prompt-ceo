import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function extractFirstName(user) {
  const full = user.user_metadata?.full_name || user.user_metadata?.name || ''
  if (full.trim()) return full.trim().split(' ')[0]
  const emailPrefix = user.email?.split('@')[0] || ''
  return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) || 'there'
}

function mostCommon(arr) {
  if (!arr.length) return null
  const counts = {}
  arr.forEach(v => { if (v) counts[v] = (counts[v] || 0) + 1 })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0] || null
}

function buildRecommendedAction({ activeEditProject, lastAdProject, strongestAngle, adsThisWeek }) {
  if (activeEditProject?.status === 'render_complete') {
    return {
      label: `Review your render — "${activeEditProject.title}"`,
      href: `/edit-studio/v2?projectId=${activeEditProject.id}`,
      context: 'Your Edit Studio render is ready',
    }
  }
  if (activeEditProject && !['rendered', 'failed'].includes(activeEditProject.status)) {
    return {
      label: `Continue Edit Studio — "${activeEditProject.title}"`,
      href: `/edit-studio/v2?projectId=${activeEditProject.id}`,
      context: 'Your project is in progress',
    }
  }
  if (strongestAngle) {
    return {
      label: `Build 3 more "${strongestAngle}" variations`,
      href: '/prompt-engine-v3?view=ad_studio',
      context: 'Your best-performing angle this week',
    }
  }
  if (lastAdProject) {
    return {
      label: `Continue — "${lastAdProject.name}"`,
      href: '/prompt-engine-v3?view=ad_studio',
      context: 'Your most recent campaign',
    }
  }
  return {
    label: 'Create your first campaign',
    href: '/prompt-engine-v3?view=ad_studio',
    context: 'Build your brand in Ad Studio',
  }
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = admin()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const [weekRes, recentAdsRes, editRes] = await Promise.all([
      db.from('ad_projects').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).gte('created_at', sevenDaysAgo),
      db.from('ad_projects')
        .select('id, campaign_name, product_name, platform, selected_angle')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
      db.from('edit_projects')
        .select('id, title, status, created_at')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    ])

    const adsThisWeek  = weekRes.count || 0
    const recentAds    = recentAdsRes.data || []
    const editProjects = editRes.data || []

    const strongestAngle = mostCommon(recentAds.map(a => a.selected_angle).filter(Boolean))
    const topPlatform    = mostCommon(recentAds.map(a => a.platform).filter(Boolean))
    const lastAdProject  = recentAds[0]
      ? { id: recentAds[0].id, name: recentAds[0].campaign_name || recentAds[0].product_name || 'Untitled' }
      : null

    // Prefer in-progress or render_complete over completed projects
    const activeEditProject = editProjects.find(p =>
      !['rendered', 'failed'].includes(p.status)
    ) || null

    const briefingData = { activeEditProject, lastAdProject, strongestAngle, adsThisWeek }
    const recommendedAction = buildRecommendedAction(briefingData)

    return NextResponse.json({
      firstName:          extractFirstName(user),
      adsThisWeek,
      strongestAngle,
      topPlatform,
      activeEditProject:  activeEditProject
        ? { id: activeEditProject.id, title: activeEditProject.title || 'Untitled', status: activeEditProject.status }
        : null,
      lastAdProject,
      recommendedAction,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
