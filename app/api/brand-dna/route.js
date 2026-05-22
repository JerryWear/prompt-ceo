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

// GET — list all brand DNA profiles for the user
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { data, error } = await admin()
      .from('brand_dnas')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ status: 'success', brands: data || [] })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — create a new brand DNA profile
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const {
      name,
      // Text/copy DNA
      product_name, product_description, target_customer, brand_voice,
      tone_words, forbidden_words, cta_style, price_point,
      voice_fingerprint,
      // Visual DNA
      visual_world_ids, visual_mood_signature, color_palette,
      lighting_signature, styling_signature, forbidden_visual_elements,
      reference_image_url,
      // Lock settings
      is_locked,
    } = body

    if (!name?.trim()) return NextResponse.json({ error: 'Brand name is required' }, { status: 400 })

    const { data, error } = await admin()
      .from('brand_dnas')
      .insert({
        user_id:                  user.id,
        name:                     name.trim(),
        product_name:             product_name             || '',
        product_description:      product_description      || '',
        target_customer:          target_customer          || '',
        brand_voice:              brand_voice              || 'premium',
        tone_words:               tone_words               || '',
        forbidden_words:          forbidden_words          || '',
        cta_style:                cta_style                || '',
        price_point:              price_point              || 'mid-ticket',
        voice_fingerprint:        voice_fingerprint        || null,
        visual_world_ids:         visual_world_ids         || [],
        visual_mood_signature:    visual_mood_signature    || '',
        color_palette:            color_palette            || '',
        lighting_signature:       lighting_signature       || '',
        styling_signature:        styling_signature        || '',
        forbidden_visual_elements: forbidden_visual_elements || '',
        reference_image_url:      reference_image_url      || '',
        is_locked:                is_locked                ?? false,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', brand: data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
