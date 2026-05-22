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

// GET — list all character profiles for the authenticated user
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = adminClient()
    const { data, error } = await admin
      .from('character_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ status: 'success', characters: data || [] })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — create a new character profile
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const {
      name,
      character_mode,
      subject_gender,
      identity_name,
      has_image,
      image_url,
      use_identity,
      use_traits,
      identity_strength,
      age_range,
      traits,
      world_id,
      director_preset,
      wardrobe_signature,
      mood_baseline,
      notes,
      thumbnail_url,
    } = body

    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const admin = adminClient()
    const { data, error } = await admin
      .from('character_profiles')
      .insert({
        user_id:            user.id,
        name:               name.trim(),
        character_mode:     character_mode     || 'female',
        subject_gender:     subject_gender     || 'female',
        identity_name:      identity_name      || '',
        has_image:          has_image          || false,
        image_url:          image_url          || '',
        use_identity:       use_identity       ?? true,
        use_traits:         use_traits         ?? false,
        identity_strength:  identity_strength  ?? 100,
        age_range:          age_range          || 'auto',
        traits:             traits             || {},
        world_id:           world_id           || '',
        director_preset:    director_preset    || 'none',
        wardrobe_signature: wardrobe_signature || '',
        mood_baseline:      mood_baseline      || '',
        notes:              notes              || '',
        thumbnail_url:      thumbnail_url      || '',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', character: data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
