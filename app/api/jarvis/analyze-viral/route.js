import { NextResponse }            from 'next/server'
import { createServerClient }      from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }                 from 'next/headers'

export const maxDuration = 60

const STUDIO_PRO_TIERS = new Set(['studio_pro', 'pro', 'agency'])

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis/analyze-viral
// Body: { content: string, brandDNA?: object }
// Returns: { hookArchetype, hookText, structure, pacing, emotionalTrigger, visualStyle, campaignPhase, whyItWorks, applyToBrand }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    // Membership gate — Studio Pro and above
    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: userRow } = await admin
      .from('app_users')
      .select('subscription_tier, subscription_status, is_admin')
      .eq('id', user.id)
      .single()

    const isAdmin  = userRow?.is_admin || false
    const isActive = isAdmin || userRow?.subscription_status === 'active' || userRow?.subscription_status === 'trialing'
    const tier     = isActive ? (userRow?.subscription_tier || 'free') : 'free'

    if (!isAdmin && !STUDIO_PRO_TIERS.has(tier)) {
      return NextResponse.json(
        { error: 'Viral Content Analyzer requires Studio Pro or above. Upgrade to access this feature.' },
        { status: 403 }
      )
    }

    const { content, brandDNA } = await req.json()
    if (!content?.trim()) return NextResponse.json({ error: 'content is required' }, { status: 400 })

    const trimmedContent = content.trim().slice(0, 6000)
    if (trimmedContent.length < 20) {
      return NextResponse.json({ error: 'Please paste more content to analyze' }, { status: 400 })
    }

    const brandSection = brandDNA
      ? `\n\nBRAND DNA:\n${JSON.stringify(brandDNA, null, 2).slice(0, 1000)}`
      : ''

    const userPrompt = `AD CONTENT:\n${trimmedContent}${brandSection}\n\nAnalyze this content and return the JSON schema exactly as specified. Be specific and tactical — reference actual phrases or moments from the content.`

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model:    'gpt-4o',
        messages: [
          {
            role:    'system',
            content: 'You are a viral content analyst. Analyze the ad copy provided and return ONLY a valid JSON object with these exact fields filled in — no empty strings allowed:\n- hookText: the exact opening line or most powerful hook sentence from the content\n- hookArchetype: one of: pattern_break, curiosity_gap, bold_claim, visual_hook, emotional_open, transformation_story, aspiration, direct_offer, urgency, social_proof\n- structure: describe the content structure in one sentence (opening, middle, close)\n- pacing: one of: fast_cut, story_driven, cinematic, fast, slow\n- emotionalTrigger: the core emotion being activated (e.g. fear, curiosity, aspiration, urgency)\n- visualStyle: describe the visual approach in one sentence\n- campaignPhase: one of: attention, emotional_connection, desire_escalation, conversion, retargeting\n- whyItWorks: exactly 2 sentences explaining why this ad is effective\n- applyToBrand: one sentence on how to adapt this pattern for the user\'s brand\n\nReturn only JSON. No markdown. No preamble. Every field must have a non-empty value.',
          },
          {
            role:    'user',
            content: userPrompt,
          },
        ],
        temperature:     0.4,
        response_format: { type: 'json_object' },
        max_tokens:      800,
      }),
      signal: AbortSignal.timeout(30000),
    })

    const aiData = await openaiRes.json()
    if (!openaiRes.ok) throw new Error(aiData.error?.message || `OpenAI error (${openaiRes.status})`)

    let result
    try { result = JSON.parse(aiData.choices[0].message.content) }
    catch { throw new Error('Analysis returned invalid JSON') }

    // Validate required fields are present; fill blanks rather than crash
    const VALID_ARCHETYPES = new Set(['pattern_break','curiosity_gap','bold_claim','visual_hook','emotional_open','transformation_story','aspiration','direct_offer','urgency','social_proof'])
    const VALID_PHASES     = new Set(['attention','emotional_connection','desire_escalation','conversion','retargeting'])
    const VALID_PACING     = new Set(['fast_cut','story_driven','cinematic','fast','slow'])

    const analysis = {
      hookArchetype:    VALID_ARCHETYPES.has(result.hookArchetype)  ? result.hookArchetype  : 'pattern_break',
      hookText:         String(result.hookText         || ''),
      structure:        String(result.structure        || ''),
      pacing:           VALID_PACING.has(result.pacing) ? result.pacing : 'fast_cut',
      emotionalTrigger: String(result.emotionalTrigger || ''),
      visualStyle:      String(result.visualStyle      || ''),
      campaignPhase:    VALID_PHASES.has(result.campaignPhase) ? result.campaignPhase : 'attention',
      whyItWorks:       String(result.whyItWorks       || ''),
      applyToBrand:     String(result.applyToBrand     || ''),
    }

    return NextResponse.json({ status: 'success', analysis })

  } catch (err) {
    console.error('[analyze-viral] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
