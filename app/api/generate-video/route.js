import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function POST(req) {
  try {
    const cookieStore = await cookies()

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name, options) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabaseAuth.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow, error } = await admin
      .from('app_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !userRow) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 500 }
      )
    }

    const COST = 25 // 🔥 adjust later

    if (userRow.credits < COST) {
      return NextResponse.json(
        { error: 'Not enough credits' },
        { status: 402 }
      )
    }

    // 👉 TEMP VIDEO (replace later with real AI)
    const videoUrl = "https://example.com/fake-video.mp4"

    // 💰 Deduct credits ONLY after success
    const { error: deductError } = await admin
      .from('app_users')
      .update({ credits: userRow.credits - COST })
      .eq('id', user.id)

    if (deductError) {
      return NextResponse.json(
        { error: 'Failed to deduct credits' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'complete',
      videoUrl,
      creditsRemaining: userRow.credits - COST,
    })

  } catch (err) {
    console.error('VIDEO_GENERATE_ERROR:', err)

    return NextResponse.json(
      { error: 'Video generation failed' },
      { status: 500 }
    )
  }
}