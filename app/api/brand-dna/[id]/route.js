import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

function admin() {
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

const ALLOWED = [
  'name', 'product_name', 'product_description', 'target_customer',
  'brand_voice', 'tone_words', 'forbidden_words', 'cta_style', 'price_point',
  'voice_fingerprint', 'visual_world_ids', 'visual_mood_signature',
  'color_palette', 'lighting_signature', 'styling_signature',
  'forbidden_visual_elements', 'reference_image_url', 'is_locked',
]

export async function PUT(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id } = await params
    const body = await req.json()

    const db = admin()

    const { data: existing } = await db.from('brand_dnas').select('user_id').eq('id', id).single()
    if (!existing || existing.user_id !== user.id)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const updates = { updated_at: new Date().toISOString() }
    for (const key of ALLOWED) {
      if (body[key] !== undefined) updates[key] = body[key]
    }

    const { data, error } = await db.from('brand_dnas').update(updates).eq('id', id).select().single()
    if (error) throw error
    return NextResponse.json({ status: 'success', brand: data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id } = await params
    const db = admin()

    const { data: existing } = await db.from('brand_dnas').select('user_id').eq('id', id).single()
    if (!existing || existing.user_id !== user.id)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const { error } = await db.from('brand_dnas').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
