import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set() {},
        remove() {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// PUT — update a character profile (also updates last_used_at)
export async function PUT(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id } = await params
    const body = await req.json()

    const admin = adminClient()

    // Verify ownership
    const { data: existing } = await admin
      .from('character_profiles')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!existing || existing.user_id !== user.id)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const updateFields = { updated_at: new Date().toISOString() }
    const allowed = [
      'name', 'character_mode', 'subject_gender', 'identity_name',
      'has_image', 'image_url', 'use_identity', 'use_traits',
      'identity_strength', 'age_range', 'traits', 'world_id',
      'director_preset', 'wardrobe_signature', 'mood_baseline',
      'notes', 'thumbnail_url', 'last_used_at',
    ]
    for (const key of allowed) {
      if (body[key] !== undefined) updateFields[key] = body[key]
    }

    const { data, error } = await admin
      .from('character_profiles')
      .update(updateFields)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', character: data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE — remove a character profile
export async function DELETE(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id } = await params
    const admin = adminClient()

    const { data: existing } = await admin
      .from('character_profiles')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!existing || existing.user_id !== user.id)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const { error } = await admin
      .from('character_profiles')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
