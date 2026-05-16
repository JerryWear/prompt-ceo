import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function POST(req) {
  try {
    const body = await req.json()

    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) { return cookieStore.get(name)?.value },
          set(name, value, options) { cookieStore.set({ name, value, ...options }) },
          remove(name, options) { cookieStore.set({ name, value: '', ...options }) },
        },
      }
    )

    const { data: { user } } = await supabaseAuth.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error } = await admin.from('generation_logs').insert({
      user_id:           user.id,
      email:             user.email,
      engine:            'prompt-engine-v3',
      credits_used:      0,
      status:            'complete',
      prompt:            body.prompt || '',
      world_id:          body.world_id || '',
      progression_level: body.progression_level || '',
      time_of_day:       body.time_of_day || '',
      director:          body.director || '',
      image_url:         body.image_url || '',
    })

    if (error) throw error

    return NextResponse.json({ status: 'saved' })
  } catch (err) {
    console.error('SAVE_PROMPT_ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}