import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

function clean(value) {
  return String(value || '').trim()
}

export async function GET() {
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
      error: authError,
    } = await supabaseAuth.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { status: 'error', message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const userId = user.id

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    let { data, error } = await admin
      .from('app_users')
      .select('credits, plan, daily_limit')
      .eq('id', userId)
      .single()

    if (error && error.code === 'PGRST116') {
      const { error: insertError } = await admin.from('app_users').insert({
        id: userId,
        email: user.email || '',
        credits: 50,
        plan: 'trial',
        daily_limit: 20,
      })

      if (insertError) {
        return NextResponse.json(
          { status: 'error', message: insertError.message },
          { status: 500 }
        )
      }

      const refetch = await admin
        .from('app_users')
        .select('credits, plan, daily_limit')
        .eq('id', userId)
        .single()

      data = refetch.data
      error = refetch.error
    }

    if (error) {
      return NextResponse.json(
        { status: 'error', message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'success',
      credits: data?.credits ?? 0,
      plan: clean(data?.plan) || 'trial',
      dailyLimit: data?.daily_limit ?? 20,
    })
  } catch (err) {
    console.error('GET_CREDITS_FATAL:', err)

    return NextResponse.json(
      {
        status: 'error',
        message: clean(err?.message) || 'Could not load credits',
      },
      { status: 500 }
    )
  }
}