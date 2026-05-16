import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import RunwayML from '@runwayml/sdk'

function trimPromptSafe(prompt, max = 1000) {
  if (prompt.length <= max) return prompt
  const trimmed = prompt.slice(0, max)
  const lastPeriod = trimmed.lastIndexOf('.')
  if (lastPeriod > 600) return trimmed.slice(0, lastPeriod + 1)
  return trimmed
}

function resolveVideoDuration(progressionLevel) {
  if (progressionLevel === 'payoff') return 10
  if (progressionLevel === 'tension') return 10
  return 5
}

export async function POST(req) {
  try {
    const body = await req.json()
    const prompt = String(body?.prompt || '').trim()
    const imageUrl = String(body?.imageUrl || '').trim()
    const progressionLevel = String(body?.progressionLevel || 'tease').trim()

    if (!prompt || prompt.length < 10) {
      return NextResponse.json({ error: 'Prompt too short or invalid' }, { status: 400 })
    }

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

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow, error: userError } = await admin
      .from('app_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (userError || !userRow) {
      return NextResponse.json({ error: 'User not found' }, { status: 500 })
    }

    const COST = 60

    if (userRow.credits < COST) {
      return NextResponse.json({ error: 'Not enough credits' }, { status: 402 })
    }

    const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET })

    const duration = resolveVideoDuration(progressionLevel)
    const safePrompt = trimPromptSafe(prompt)

    const taskParams = {
      model: 'gen4_turbo',
      promptText: safePrompt,
      ratio: '720:1280',
      duration,
    }

    if (imageUrl) {
      taskParams.promptImage = imageUrl
    }

    const task = await client.imageToVideo.create(taskParams)

    let result = task
    let attempts = 0
    while (result.status !== 'SUCCEEDED' && attempts < 60) {
      if (result.status === 'FAILED') {
        throw new Error('Runway generation failed')
      }
      await new Promise(r => setTimeout(r, 5000))
      result = await client.tasks.retrieve(task.id)
      attempts++
    }

    if (result.status !== 'SUCCEEDED') {
      throw new Error('Video generation timed out')
    }

    const videoUrl = result.output?.[0]

    if (!videoUrl) {
      throw new Error('No video returned from Runway')
    }

    const { error: deductError } = await admin
      .from('app_users')
      .update({ credits: userRow.credits - COST })
      .eq('id', user.id)

    if (deductError) {
      return NextResponse.json({ error: 'Failed to deduct credits' }, { status: 500 })
    }

    return NextResponse.json({
      status: 'complete',
      videoUrl,
      creditsRemaining: userRow.credits - COST,
    })

  } catch (err) {
    console.error('VIDEO_GENERATE_ERROR:', err)
    return NextResponse.json({ error: err.message || 'Video generation failed' }, { status: 500 })
  }
}