import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { logEvent, JARVIS_EVENTS } from '../../lib/jarvis/events'

// POST /api/save-ad-project
// Saves the current connected ad project to Supabase

export async function POST(req) {
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

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const {
      productName, campaignName, platform, campaignGoal, brandVoice, visualStyle,
      selectedAngle, selectedHook, fullContext, outputs,
      musicTrackId, musicLicenseId, projectId,
    } = await req.json()

    // Auto-version — count existing saves for the same product
    const { count } = await supabase
      .from('ad_projects')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .ilike('product_name', productName || '')

    const version     = (count || 0) + 1
    const versionedName = version > 1
      ? `${campaignName || productName} v${version}`
      : (campaignName || productName || '')

    const { data, error } = await supabase
      .from('ad_projects')
      .insert({
        user_id:                 user.id,
        product_name:            productName    || '',
        campaign_name:           versionedName,
        platform:                platform       || null,
        campaign_goal:           campaignGoal   || null,
        brand_voice:             brandVoice     || null,
        visual_style:            visualStyle    || null,
        selected_angle:          selectedAngle  || null,
        selected_hook:           selectedHook   || null,
        full_context:            fullContext    || null,
        outputs:                 outputs        || null,
        selected_music_track_id: musicTrackId   || null,
        music_license_id:        musicLicenseId || null,
        project_id:              projectId      || null,
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    logEvent(user.id, JARVIS_EVENTS.AD_CREATED, 'ad-studio', {
      projectId:     data.id,
      productName:   productName || '',
      campaignGoal:  campaignGoal || '',
      selectedAngle: selectedAngle || '',
      selectedHook:  selectedHook || '',
    }).catch(() => {})

    return NextResponse.json({
      status:    'success',
      projectId: data.id,
      version,
      jarvisProactive: { trigger: 'ad_created', context: { productName, selectedAngle, selectedHook, campaignGoal } },
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
