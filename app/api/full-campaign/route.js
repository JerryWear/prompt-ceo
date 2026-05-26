import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function ask(prompt, maxTokens = 2000) {
  const msg = await ai.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })
  return msg.content[0].text.trim()
}

function tryJSON(text, fallback = []) {
  try {
    const match = text.match(/\[[\s\S]*\]/)
    return match ? JSON.parse(match[0]) : fallback
  } catch { return fallback }
}

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: userRow } = await admin.from('users').select('subscription_status').eq('id', user.id).single()
    const { isActive } = await import('../../../lib/subscription.js')
    if (!isActive(userRow)) return NextResponse.json({ error: 'Subscription required' }, { status: 402 })

    const body = await req.json()
    const { product, platform = 'instagram', projectId } = body

    if (!product) return NextResponse.json({ error: 'product is required' }, { status: 400 })

    const context = `Product/Creator: ${product}\nPlatform: ${platform}`

    // Step 1 — parallel: angles + hooks + image prompts
    const [anglesRaw, hooksRaw, promptsRaw] = await Promise.all([
      ask(`You are an expert ad strategist. Generate 10 unique marketing angles for:\n${context}\n\nReturn a JSON array of 10 strings. Each angle is 1 sentence. No numbering. Just the JSON array.`),
      ask(`You are a viral content expert. Generate 10 scroll-stopping hooks for:\n${context}\n\nReturn a JSON array of 10 strings. Each hook is under 15 words. No numbering. Just the JSON array.`),
      ask(`You are a cinematic prompt engineer. Generate 30 diverse image prompts for social media content for:\n${context}\n\nEach prompt should be vivid, specific, and optimized for AI image generation. Vary the settings, moods, and compositions.\n\nReturn a JSON array of 30 strings. Just the JSON array.`, 4000),
    ])

    const angles      = tryJSON(anglesRaw,  [])
    const hooks       = tryJSON(hooksRaw,   [])
    const imagePrompts = tryJSON(promptsRaw, [])

    const bestAngle = angles[0] || ''
    const bestHook  = hooks[0]  || ''

    // Step 2 — captions using top angle + hook
    const captionsRaw = await ask(
      `You are a social media copywriter. Generate 30 captions for ${platform} for:\n${context}\n\nAngle: ${bestAngle}\nHook: ${bestHook}\n\nEach caption should be engaging, include a call to action, and be optimized for ${platform}. Vary the length and tone.\n\nReturn a JSON array of 30 strings. Just the JSON array.`,
      4000
    )
    const captions = tryJSON(captionsRaw, [])

    // Step 3 — 30-day posting schedule
    const scheduleRaw = await ask(
      `Create a 30-day social media posting schedule for ${platform} for:\n${context}\n\nReturn a JSON array of 30 objects, each with: { "day": number, "time": "HH:MM", "content_type": "image|reel|story", "theme": "brief theme description" }\n\nOptimize posting times for maximum engagement on ${platform}. Just the JSON array.`,
      2000
    )
    const schedule = tryJSON(scheduleRaw, [])

    // Step 4 — auto-save as project
    let savedProjectId = projectId || null
    if (!savedProjectId) {
      const { data: project } = await admin.from('projects').insert({
        user_id: user.id,
        name: `${product} — Full Campaign`,
        type: 'campaign',
      }).select().single()
      savedProjectId = project?.id || null
    }

    // Save to generation_logs
    await admin.from('generation_logs').insert({
      user_id:    user.id,
      project_id: savedProjectId,
      type:       'full_campaign',
      input:      { product, platform },
      output:     { angles, hooks, imagePrompts, captions, schedule },
    })

    return NextResponse.json({
      angles,
      hooks,
      imagePrompts,
      captions,
      schedule,
      projectId: savedProjectId,
    })
  } catch (err) {
    console.error('Full campaign error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
