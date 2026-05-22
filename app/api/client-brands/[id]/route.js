import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// PUT — update a client brand
export async function PUT(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { data, error } = await admin()
      .from('client_brands')
      .update({
        name:             body.name            || undefined,
        industry:         body.industry        ?? undefined,
        brand_voice:      body.brandVoice      ?? undefined,
        color_theme:      body.colorTheme      ?? undefined,
        brand_notes:      body.brandNotes      ?? undefined,
        product_name:     body.productName     ?? undefined,
        target_customer:  body.targetCustomer  ?? undefined,
        updated_at:       new Date().toISOString(),
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', client: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// DELETE — remove a client brand
export async function DELETE(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { error } = await admin()
      .from('client_brands')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)

    if (error) throw error
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
