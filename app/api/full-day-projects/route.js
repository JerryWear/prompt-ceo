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

// GET — list user's full day projects
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await admin()
      .from('full_day_projects')
      .select('id, title, world_id, day_type, style, platform, creator_name, created_at, updated_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — save a full day project
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const {
      id = null,
      worldId, dayType, title, style, platform,
      creatorName, creatorTraits,
      scenes, dayMeta, postingPlan, videoPlan,
      generatedImages,
      brandProfileId,
    } = body

    const payload = {
      user_id:          user.id,
      world_id:         worldId || 'luxury_penthouse',
      day_type:         dayType || 'perfect_day',
      title:            title || 'Untitled Day',
      style:            style || 'cinematic',
      platform:         platform || 'instagram',
      creator_name:     creatorName || null,
      creator_traits:   creatorTraits || {},
      scenes:           scenes || [],
      day_meta:         dayMeta || {},
      posting_plan:     postingPlan || {},
      video_plan:       videoPlan || {},
      generated_images: generatedImages || {},
      brand_profile_id: brandProfileId || null,
    }

    let result
    if (id) {
      // Update existing
      const { data, error } = await admin()
        .from('full_day_projects')
        .update(payload)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()
      if (error) throw error
      result = data
    } else {
      // Create new
      const { data, error } = await admin()
        .from('full_day_projects')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      result = data
    }

    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE — remove a project
export async function DELETE(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const { error } = await admin()
      .from('full_day_projects')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error
    return NextResponse.json({ deleted: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
