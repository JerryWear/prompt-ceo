import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import RunwayML from '@runwayml/sdk'

function trimPromptSafe(prompt, max = 1000) {
  if (prompt.length <= max) return prompt

  const trimmed = prompt.slice(0, max)

  const lastPeriod = trimmed.lastIndexOf('.')
  if (lastPeriod > 600) {
    return trimmed.slice(0, lastPeriod + 1)
  }

  return trimmed
}

export async function POST(req) {
  try {
    const body = await req.json()
    const prompt = String(body?.prompt || '').trim()

    if (!prompt || prompt.length < 50) {
  return NextResponse.json(
    { error: 'Prompt too short or invalid' },
    { status: 400 }
  )
}

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

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
  return NextResponse.json(
    { error: 'Not authenticated' },
    { status: 401 }
  )
}

// 🔥 GET USER CREDITS
const { data: profile, error: profileError } = await supabaseAuth
  .from('profiles')
  .select('credits')
  .eq('id', user.id)
  .single()

if (profileError) {
  return NextResponse.json(
    { error: 'Failed to load profile' },
    { status: 500 }
  )
}

const VIDEO_COST = 60

// ❌ BLOCK if not enough credits
if ((profile?.credits || 0) < VIDEO_COST) {
  return NextResponse.json(
    { error: 'Not enough credits' },
    { status: 400 }
  )
}

// 🔥 DEDUCT CREDITS
const { error: updateError } = await supabaseAuth
  .from('profiles')
  .update({
    credits: profile.credits - VIDEO_COST,
  })
  .eq('id', user.id)

if (updateError) {
  return NextResponse.json(
    { error: 'Failed to deduct credits' },
    { status: 500 }
  )
}

    console.log('VIDEO AUTH USER:', user?.id, user?.email)

const isLocalDev = process.env.NODE_ENV === 'development'

if (!user && !isLocalDev) {
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
}

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow, error } = await admin
      .from('app_users')
      .select('*')
      .eq('id', user?.id || '6b0da2b0-601b-4a60-b2c9-c4b90113cbac')
      .single()

    if (error || !userRow) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 500 }
      )
    }

    const COST = 60 // 🔥 adjust later

    console.log('VIDEO USER ROW:', {
  id: userRow.id,
  email: userRow.email,
  credits: userRow.credits,
  cost: COST,
})

    if (userRow.credits < COST) {
      return NextResponse.json(
        { error: 'Not enough credits' },
        { status: 402 }
      )
    }

// 🎬 RUNWAY VIDEO GENERATION

const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET,
})

// 1. Create task
const durationValue = resolveVideoDuration({ phase, progressionLevel })

const safePrompt = trimPromptSafe(
  prompt
    .replace(/\b\d+\s*[–-]\s*\d+\s*seconds\b/gi, `${durationValue} seconds`)
    .replace(/\b\d+\s*seconds\b/gi, `${durationValue} seconds`)
)

const task = await client.textToVideo.create({
  model: 'gen4.5',
  promptText: safePrompt,
  ratio: '720:1280',
  duration: resolveVideoDuration({ phase, progressionLevel }),
})

// 2. Poll
let result = task
while (result.status !== 'SUCCEEDED') {
if (result.status === 'FAILED') {
  console.error('RUNWAY FAILED RESULT:', JSON.stringify(result, null, 2))
  throw new Error('Runway generation failed')
}

  await new Promise((r) => setTimeout(r, 3000))
  result = await client.tasks.retrieve(task.id)
}

// 3. Get video
const videoUrl = result.output?.[0]

if (!videoUrl) {
  throw new Error('No video returned')
}

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