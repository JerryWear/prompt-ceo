import { NextResponse }       from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies }            from 'next/headers'
import OpenAI                 from 'openai'
import { buildBrandContext }  from '../../../lib/jarvis/brandBrain'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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

// Trigger map — what Jarvis says after each key event
const TRIGGER_PROMPTS = {
  ad_created: (ctx) => `The user just saved an ad campaign. Product: "${ctx.productName || 'unknown'}". Angle used: "${ctx.selectedAngle || 'none'}". In 2 sentences max: what's the single best next move? Be specific to their brand context. End with one concrete action.`,
  video_rendered: (ctx) => `The user just rendered a video in Edit Studio. Project: "${ctx.title || 'untitled'}". In 2 sentences max: what should they do with this video next? Connect to their ad campaigns or music. Be specific.`,
  music_selected: (ctx) => `The user just selected a music track. Track ID: "${ctx.trackId || 'unknown'}". In 1-2 sentences: how should they use this music across their current campaign? Be specific.`,
  campaign_created: (ctx) => `The user just completed a campaign. In 2 sentences max: what's the highest-leverage next step to actually get results from this campaign?`,
}

// POST /api/jarvis/proactive
// Body: { trigger, context }
// trigger: 'ad_created' | 'video_rendered' | 'music_selected' | 'campaign_created'
// Called fire-and-forget from studio events — returns a short proactive Jarvis message
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'success', message: null }) // silent fail

    const { trigger, context = {} } = await req.json()
    if (!trigger || !TRIGGER_PROMPTS[trigger]) {
      return NextResponse.json({ status: 'success', message: null })
    }

    const [brandContext] = await Promise.all([
      buildBrandContext(user.id),
    ])

    const triggerPrompt = TRIGGER_PROMPTS[trigger](context)

    const completion = await openai.chat.completions.create({
      model:       'gpt-4o-mini', // fast — this needs to be near-instant
      messages: [
        {
          role:    'system',
          content: `You are Jarvis, the AI Operating System for PromptCEO. Be direct, specific, max 2 sentences. Reference the user's brand.\n\nBrand context:\n${brandContext}`,
        },
        { role: 'user', content: triggerPrompt },
      ],
      max_tokens:  120,
      temperature: 0.7,
    })

    const message = completion.choices[0]?.message?.content?.trim() || null

    return NextResponse.json({ status: 'success', message, trigger })
  } catch {
    return NextResponse.json({ status: 'success', message: null }) // always succeeds
  }
}
