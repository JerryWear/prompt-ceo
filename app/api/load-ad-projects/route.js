import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// GET /api/load-ad-projects
// Returns the user's saved ad projects (latest 20)

export async function GET(req) {
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

    const { data, error } = await supabase
      .from('ad_projects')
      .select(`
        id, product_name, campaign_name, platform, campaign_goal,
        brand_voice, visual_style, selected_angle, selected_hook,
        full_context, outputs, created_at
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', projects: data || [] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
