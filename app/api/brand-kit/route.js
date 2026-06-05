import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function admin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// GET /api/brand-kit — returns current user's brand kit
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { data } = await admin().from('app_users').select('brand_kit').eq('id', user.id).single()
    return NextResponse.json({ status: 'success', brandKit: data?.brand_kit || {} })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// PATCH /api/brand-kit — save brand kit { logoUrl?, primaryColor? }
export async function PATCH(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()

    // Only allow known keys
    const patch = {}
    const ALLOWED_FIELDS = ['logoUrl', 'primaryColor', 'introClipUrl', 'outroClipUrl', 'watermarkUrl']
    const body2 = body
    ALLOWED_FIELDS.forEach(field => {
      if (typeof body2[field] === 'string') patch[field] = body2[field].trim()
    })

    if (!Object.keys(patch).length) {
      return NextResponse.json({ status: 'error', message: 'No valid fields provided' }, { status: 400 })
    }

    // Merge with existing brand_kit
    const { data: existing } = await admin().from('app_users').select('brand_kit').eq('id', user.id).single()
    const merged = { ...(existing?.brand_kit || {}), ...patch }

    await admin().from('app_users').update({ brand_kit: merged }).eq('id', user.id)
    return NextResponse.json({ status: 'success', brandKit: merged })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
