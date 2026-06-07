import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 60

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/assess
// Body: { understanding, assets, prompt?, intent? }
// Returns: { assessment }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { understanding, assets, prompt, intent } = await req.json()
    if (!understanding) return NextResponse.json({ error: 'understanding required' }, { status: 400 })

    const hasFounder  = !!(assets?.founderImageUrl || understanding?.founder?.present)
    const hasProduct  = !!(assets?.productImageUrls?.length || understanding?.products?.count > 0)
    const hasVideo    = !!(assets?.videoUrls?.length || understanding?.video?.present)
    const hasWebsite  = !!(assets?.websiteUrl || understanding?.brand?.name)

    const systemPrompt = `You are Jarvis — a senior Creative Director with 20 years building direct-response ad campaigns.

You have reviewed a brand's assets, website, and positioning. You are writing your honest strategic assessment.

Your voice:
- Direct. Specific. Opinionated. Never vague.
- You name exact things you observed. Not summaries.
- You challenge weak positioning. You do not validate it just because it exists.
- You have seen 10,000 ad campaigns. You know what works and what fails.
- NEVER use these words: revolutionize, game-changer, cutting-edge, innovative, AI-powered, seamless, future of, groundbreaking, world-class, disruptive, transformative, holistic, leverage, synergy, empower
- When something is weak, say it is weak. Be direct but constructive.
- When something is strong, say exactly WHY it is strong with specifics.
- "myRecommendedCampaign" must be a real argument. First person. Take a position. Disagree with the obvious if the obvious is wrong.
- Write as if you are sitting across from the founder and giving real feedback.

Return ONLY valid JSON matching this exact structure:
{
  "whatIUnderstand": {
    "whatTheyDo": "what this company actually does in plain language — no jargon",
    "whoTheyServe": "specific audience description, not 'businesses' or 'marketers'",
    "whatStandsOut": "the single most notable or surprising thing about this business"
  },
  "whatILike": [
    "specific positive observation with a reason",
    "specific positive observation with a reason",
    "specific positive observation with a reason"
  ],
  "whatConcernsMe": [
    "specific concern or weakness — name the exact problem",
    "specific concern or weakness — name the exact problem"
  ],
  "whatIWouldChange": [
    "specific actionable recommendation",
    "specific actionable recommendation",
    "specific actionable recommendation"
  ],
  "founderOpportunity": ${hasFounder ? `{
    "howToUse": "specific role the founder should play in ads",
    "trustOpportunities": "what about this founder builds trust with the target audience",
    "authorityOpportunities": "what gives this founder credibility on this topic",
    "personalStory": "what personal story angle would resonate"
  }` : 'null'},
  "productOpportunity": ${hasProduct || hasVideo ? `{
    "whatStandsOut": "specific product features or visuals that are compelling",
    "whatToEmphasize": "what should be front and center in ads",
    "visualMoments": "2-3 specific visual moments that would make great scenes"
  }` : 'null'},
  "myRecommendedCampaign": {
    "headline": "a short bold statement of your recommendation — max 12 words",
    "argument": "2-4 sentences in first person making the case for this campaign direction — be specific, take a position, explain why this beats other approaches",
    "angle": "the specific angle you would lead with",
    "why": "the specific reason this angle beats the obvious alternatives"
  }
}`

    const userContent = `Brand analysis:
${JSON.stringify(understanding, null, 2)}

Assets provided:
- Founder image: ${hasFounder ? 'YES' : 'NO'}
- Product images: ${hasProduct ? `YES (${understanding?.products?.count || assets?.productImageUrls?.length || 0} images)` : 'NO'}
- Video: ${hasVideo ? 'YES' : 'NO'}
- Website URL: ${assets?.websiteUrl || 'Not provided'}

${prompt ? `User's stated direction: "${prompt}"` : ''}
${intent ? `Requested ad type: ${intent.replace(/_/g, ' ')}` : ''}

Write your assessment. Be honest. Be specific. Name exact things you observed.`

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userContent },
        ],
        max_tokens: 2000,
        temperature: 0.75,
        response_format: { type: 'json_object' },
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let assessment
    try {
      assessment = JSON.parse(gptData.choices[0].message.content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse assessment' }, { status: 500 })
    }

    return NextResponse.json({ assessment })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
