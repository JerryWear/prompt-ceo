import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set() {},
        remove() {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// The 12 engine phases mapped to their emotional arc position and campaign purpose
const PHASE_MAP = [
  { phase: 'wake',            label: 'Wake',            arc: 'tease',   campaignRole: 'awareness',   energy: 'intimate, private, soft — first impression' },
  { phase: 'morning_refresh', label: 'Morning Refresh', arc: 'tease',   campaignRole: 'awareness',   energy: 'fresh, clean, beginning — self-care ritual' },
  { phase: 'getting_dressed', label: 'Getting Dressed', arc: 'tease',   campaignRole: 'awareness',   energy: 'transformation, preparation, identity building' },
  { phase: 'breakfast',       label: 'Breakfast',       arc: 'tease',   campaignRole: 'interest',    energy: 'lifestyle, pleasure, aspirational morning' },
  { phase: 'late_morning',    label: 'Late Morning',    arc: 'tension', campaignRole: 'interest',    energy: 'visible, active, socially present, fashionable' },
  { phase: 'lunch',           label: 'Lunch',           arc: 'tension', campaignRole: 'consideration', energy: 'indulgent, social, mid-day luxury peak' },
  { phase: 'afternoon',       label: 'Afternoon',       arc: 'tension', campaignRole: 'consideration', energy: 'peak sensory, most alive, full lifestyle moment' },
  { phase: 'reset',           label: 'Reset',           arc: 'tension', campaignRole: 'desire',      energy: 'exclusive access, private transition, elevated' },
  { phase: 'golden_hour',     label: 'Golden Hour',     arc: 'payoff',  campaignRole: 'desire',      energy: 'cinematic peak, most beautiful moment, desire-maximum' },
  { phase: 'dinner',          label: 'Dinner',          arc: 'payoff',  campaignRole: 'conversion',  energy: 'intimate, warm, romantic — ready to commit' },
  { phase: 'evening',         label: 'Evening',         arc: 'payoff',  campaignRole: 'conversion',  energy: 'social peak, visible, action moment' },
  { phase: 'night',           label: 'Night',           arc: 'payoff',  campaignRole: 'retention',   energy: 'private, exclusive, loyal — final intimacy' },
]

function assignDayPhase(dayIndex, totalDays) {
  const ratio = dayIndex / (totalDays - 1)
  const phaseIndex = Math.min(Math.floor(ratio * PHASE_MAP.length), PHASE_MAP.length - 1)
  return PHASE_MAP[phaseIndex]
}

function buildSequencerPrompt({ brand, product, targetCustomer, goal, duration, worldHint, characterHint, mainDesire, offer }) {
  const phases = Array.from({ length: duration }, (_, i) => {
    const dayNum = i + 1
    const p = assignDayPhase(i, duration)
    return `Day ${dayNum} | Phase: ${p.label} | Arc: ${p.arc} | Role: ${p.campaignRole} | Energy: ${p.energy}`
  }).join('\n')

  return `You are the world's best performance creative director. Build a ${duration}-day campaign sequencer for this brand.

BRAND BRIEF:
Brand/Product: ${brand || product || 'luxury brand'}
Product: ${product || brand || ''}
Target Customer: ${targetCustomer || 'luxury consumer, high-value audience'}
Campaign Goal: ${goal || 'sales'}
Main Desire: ${mainDesire || 'aspiration and lifestyle elevation'}
Offer: ${offer || 'exclusive access'}
World/Setting: ${worldHint || 'cinematic luxury world'}
Character Identity: ${characterHint || 'high-status woman in luxury world'}

PHASE SEQUENCE (follow exactly — each day has a pre-assigned cinematic phase and campaign role):
${phases}

INSTRUCTIONS:
For each day, generate a campaign entry that uses the assigned phase's energy and campaign role.
The campaign must tell a STORY ARC across all ${duration} days — not random isolated posts.
Each day should feel like the next chapter in the same cinematic world.

Output ONLY a JSON array with ${duration} objects, each with:
{
  "day": number,
  "phase": "phase_key",
  "phaseLabel": "Phase Label",
  "arc": "tease|tension|payoff",
  "campaignRole": "awareness|interest|consideration|desire|conversion|retention",
  "hook": "single most powerful opening line for this day",
  "caption": "1-2 sentence Instagram-ready caption using the world energy",
  "cta": "call to action matched to the campaign role",
  "imageDirection": "one sentence on what world + phase to generate — what setting, light, mood",
  "postingTime": "best time to post this type of content"
}

Start with [ and output ONLY valid JSON. No markdown. No explanation outside the array.`
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { brand, product, targetCustomer, goal, duration = 30, worldHint, characterHint, mainDesire, offer } = body

    if (!brand && !product) {
      return NextResponse.json({ error: 'Brand or product name is required' }, { status: 400 })
    }

    if (![7, 14, 30, 60].includes(Number(duration))) {
      return NextResponse.json({ error: 'Duration must be 7, 14, 30, or 60' }, { status: 400 })
    }

    // Credit check — 5 credits
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    const { data: userRow } = await admin.from('app_users').select('credits').eq('id', user.id).single()
    if (!userRow || userRow.credits < 5) {
      return NextResponse.json({ error: 'Not enough credits — need 5' }, { status: 402 })
    }

    const apiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const prompt = buildSequencerPrompt({ brand, product, targetCustomer, goal, duration: Number(duration), worldHint, characterHint, mainDesire, offer })

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a world-class campaign strategist. Output ONLY valid JSON arrays. No markdown. No preamble. Start with [.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.75,
        max_tokens: duration <= 14 ? 3000 : duration <= 30 ? 5000 : 8000,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Grok API error: ${err}`)
    }

    const grokData = await response.json()
    const raw      = grokData.choices?.[0]?.message?.content?.trim() || ''
    const cleaned  = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

    let sequence
    try {
      sequence = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ error: 'Failed to parse sequence JSON', raw }, { status: 500 })
    }

    // Deduct credits
    await admin.from('app_users').update({ credits: userRow.credits - 5 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', sequence, creditsRemaining: userRow.credits - 5 })
  } catch (err) {
    console.error('CAMPAIGN_SEQUENCER_ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
