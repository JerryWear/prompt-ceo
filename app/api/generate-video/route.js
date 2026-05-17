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

// ─── Ad video prompt builders ─────────────────────────────────────────────────

function buildProductAdVideoPrompt({ productName, adStyle, platform, imageUrl }) {
  const motionMap = {
    lifestyle: 'slow cinematic camera drift through an aspirational lifestyle scene, product naturally present',
    minimal: 'clean product reveal with elegant camera pull-back, dramatic lighting transition',
    editorial: 'editorial fashion-style camera movement, confident pacing, product as hero',
    ugc: 'handheld authentic movement, natural lighting, real-life feel, casual energy',
    cinematic: 'wide cinematic sweep with dynamic depth-of-field, product placement in environmental scene',
  }

  return `
Commercial advertising video for: ${productName}
Style: ${motionMap[adStyle] || motionMap.lifestyle}
Platform: ${platform || 'Instagram / TikTok'}

Camera motion: smooth, intentional, professionally directed
Lighting: consistent with hero image, commercial grade
Mood: aspirational, premium, scroll-stopping
No text overlays or graphics
Output: short-form ad content, 5-10 seconds
`
}

function buildPersonalBrandAdVideoPrompt({ creatorNiche, adGoal, platform }) {
  const motionMap = {
    fitness: 'dynamic energetic camera movement, athletic environment, strong natural light transitions',
    beauty: 'soft elegant slow motion, beauty close-ups, smooth cinematic drift',
    fashion: 'editorial confident stride and pose, fashion-week camera energy',
    lifestyle: 'aspirational slow cinematic reveal through a luxury or everyday elevated setting',
    business: 'professional composed camera movement, polished environment',
    creator: 'authentic behind-the-scenes energy, creative space, natural movement',
  }

  const goalMotion = {
    awareness: 'bold opening frame, cinematic identity reveal',
    conversion: 'clear value hook in first 2 seconds, strong visual momentum',
    engagement: 'relatable authentic movement, invites the viewer in',
    launch: 'high-energy reveal, exciting pacing, premium feel',
  }

  return `
Personal brand advertising video for a ${creatorNiche} creator.
Motion style: ${motionMap[creatorNiche] || motionMap.lifestyle}
Goal motion: ${goalMotion[adGoal] || goalMotion.awareness}
Platform: ${platform || 'Instagram / TikTok'}

Camera: smooth, directed, professional brand campaign feel
Lighting: consistent, commercial, on-brand
Mood: confident, aspirational, authentic
No text overlays
Output: short-form personal brand ad, 5-10 seconds
`
}

// ─── Main route ───────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const body = await req.json()

    const mode = String(body?.mode || 'director').trim()
    const isAdMode = mode === 'product_ad' || mode === 'personal_brand_ad'

    const prompt = String(body?.prompt || '').trim()
    const imageUrl = String(body?.imageUrl || '').trim()
    const progressionLevel = String(body?.progressionLevel || 'tease').trim()

    // Ad mode can generate without a text prompt if imageUrl is provided
    if (!isAdMode && (!prompt || prompt.length < 10)) {
      return NextResponse.json({ error: 'Prompt too short or invalid' }, { status: 400 })
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
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

    // ── Credits ───────────────────────────────────────────────────────────────
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

    // ── Build prompt based on mode ────────────────────────────────────────────
    let finalPrompt = prompt

    if (mode === 'product_ad') {
      finalPrompt = buildProductAdVideoPrompt({
        productName: String(body?.adConfig?.productName || 'the product').trim(),
        adStyle: String(body?.adConfig?.adStyle || 'lifestyle').trim(),
        platform: String(body?.adConfig?.platform || '').trim(),
        imageUrl,
      })
      if (prompt) finalPrompt = `${prompt}\n\n${finalPrompt}`

    } else if (mode === 'personal_brand_ad') {
      finalPrompt = buildPersonalBrandAdVideoPrompt({
        creatorNiche: String(body?.adConfig?.creatorNiche || 'lifestyle').trim(),
        adGoal: String(body?.adConfig?.adGoal || 'awareness').trim(),
        platform: String(body?.adConfig?.platform || '').trim(),
      })
      if (prompt) finalPrompt = `${prompt}\n\n${finalPrompt}`
    }

    // ── Runway generation ─────────────────────────────────────────────────────
    const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET })

    const duration = isAdMode ? 5 : resolveVideoDuration(progressionLevel)
    const safePrompt = trimPromptSafe(finalPrompt)

    const taskParams = {
      model: 'gen4_turbo',
      promptText: safePrompt,
      ratio: mode === 'product_ad' ? '1280:720' : '720:1280', // landscape for product, portrait for personal brand
      duration,
    }

    if (imageUrl) {
      taskParams.promptImage = imageUrl
    }

    const task = await client.imageToVideo.create(taskParams)

    let result = task
    let attempts = 0
    while (result.status !== 'SUCCEEDED' && attempts < 60) {
      if (result.status === 'FAILED') throw new Error('Runway generation failed')
      await new Promise(r => setTimeout(r, 5000))
      result = await client.tasks.retrieve(task.id)
      attempts++
    }

    if (result.status !== 'SUCCEEDED') throw new Error('Video generation timed out')

    const videoUrl = result.output?.[0]
    if (!videoUrl) throw new Error('No video returned from Runway')

    // 💰 DEDUCT CREDITS
    const { error: deductError } = await admin
      .from('app_users')
      .update({ credits: userRow.credits - COST })
      .eq('id', user.id)

    if (deductError) return NextResponse.json({ error: 'Failed to deduct credits' }, { status: 500 })

    // 📝 LOG
    try {
      await admin.from('generation_logs').insert({
        user_id: user.id,
        type: 'video',
        mode,
        prompt: safePrompt.slice(0, 500),
        video_url: videoUrl,
        credits_used: COST,
        created_at: new Date().toISOString(),
      })
    } catch {
      // Non-fatal
    }

    return NextResponse.json({
      status: 'complete',
      videoUrl,
      creditsRemaining: userRow.credits - COST,
      mode,
    })

  } catch (err) {
    console.error('VIDEO_GENERATE_ERROR:', err)
    return NextResponse.json({ error: err.message || 'Video generation failed' }, { status: 500 })
  }
}