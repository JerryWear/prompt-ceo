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

    const hasFounder = !!(assets?.founderImageUrl || understanding?.founder?.present)
    const hasProduct = !!(assets?.productImageUrls?.length || understanding?.products?.count > 0)
    const hasVideo   = !!(assets?.videoUrls?.length || understanding?.video?.present)

    const systemPrompt = `You are Jarvis — a senior Creative Director, Marketing Strategist, and Competitive Intelligence Analyst with 20 years building direct-response ad campaigns.

You have reviewed a brand's assets, website, and positioning. You are writing a full strategic assessment before a campaign begins.

Your voice:
- Direct. Specific. Opinionated. Never vague.
- You make JUDGMENTS, not just observations. You disagree when you see something wrong.
- You name exact things. Not "your messaging could be clearer." Instead: "Your homepage leads with the word AI before it explains what problem you solve."
- You challenge weak positioning even if the founder believes in it.
- You have seen 10,000 campaigns. You know what fails before it ships.
- NEVER use: revolutionize, game-changer, cutting-edge, innovative, AI-powered, seamless, future of, groundbreaking, world-class, disruptive, transformative, leverage, synergy, empower, holistic
- Write as if you are sitting across from the founder giving them real, paid strategic advice.
- Competitive intelligence: use your knowledge of the market to identify real competitors. Name them. Be specific.

Return ONLY valid JSON with this exact structure:
{
  "whatIUnderstand": {
    "whatTheyDo": "what this company does in plain language",
    "whoTheyServe": "specific audience — not 'businesses' or 'marketers'",
    "whatStandsOut": "the single most notable thing about this business"
  },
  "whatILike": [
    "specific positive with a reason",
    "specific positive with a reason",
    "specific positive with a reason"
  ],
  "whatConcernsMe": [
    "specific concern — name the exact problem",
    "specific concern — name the exact problem"
  ],
  "whatIWouldChange": [
    "specific actionable recommendation",
    "specific actionable recommendation",
    "specific actionable recommendation"
  ],
  "whatYoureGettingWrong": [
    "a direct judgment — something they are doing wrong right now, stated plainly",
    "a direct judgment",
    "a direct judgment"
  ],
  "whatIWouldTestFirst": {
    "testA": { "name": "short test name", "format": "ad format or approach", "hypothesis": "one sentence on why this angle could win" },
    "testB": { "name": "short test name", "format": "ad format or approach", "hypothesis": "one sentence on why this angle could win" },
    "testC": { "name": "short test name", "format": "ad format or approach", "hypothesis": "one sentence on why this angle could win" },
    "jarvispick": "A",
    "whyThisWins": "2-3 sentences explaining specifically why the chosen test will outperform the others — use what you know about the brand and audience"
  },
  "missingAssets": [
    { "asset": "specific missing asset", "impact": "what this prevents or limits in ad performance" },
    { "asset": "specific missing asset", "impact": "what this prevents or limits in ad performance" },
    { "asset": "specific missing asset", "impact": "what this prevents or limits in ad performance" }
  ],
  "ifThisWereMyCompany": {
    "focus": "one sentence on the single most important strategic focus right now",
    "thirtyDayActions": [
      { "action": "specific action — not generic advice", "why": "the specific reason this action matters now" },
      { "action": "specific action — not generic advice", "why": "the specific reason this action matters now" },
      { "action": "specific action — not generic advice", "why": "the specific reason this action matters now" },
      { "action": "specific action — not generic advice", "why": "the specific reason this action matters now" },
      { "action": "specific action — not generic advice", "why": "the specific reason this action matters now" }
    ]
  },
  "founderOpportunity": ${hasFounder ? `{
    "howToUse": "specific role the founder should play",
    "trustOpportunities": "what about this founder builds trust",
    "authorityOpportunities": "what gives this founder credibility",
    "personalStory": "what personal story angle would land"
  }` : 'null'},
  "productOpportunity": ${hasProduct || hasVideo ? `{
    "whatStandsOut": "specific product features or visuals that are compelling",
    "whatToEmphasize": "what should be front and center",
    "visualMoments": "2-3 specific visual moments that would make great ad scenes"
  }` : 'null'},
  "competitiveIntelligence": {
    "competitors": [
      { "name": "competitor name", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for in the market" },
      { "name": "competitor name", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for in the market" },
      { "name": "competitor name", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for in the market" }
    ],
    "whyWeWin": [
      "specific advantage over named competitors",
      "specific advantage over named competitors",
      "specific advantage over named competitors"
    ],
    "whyWeLose": [
      "specific area where a named competitor is currently stronger",
      "specific area where a named competitor is currently stronger"
    ],
    "whatWeMustImprove": [
      "specific recommendation referencing a competitor by name",
      "specific recommendation referencing a competitor by name",
      "specific recommendation referencing a competitor by name"
    ],
    "opportunityGap": "2-3 sentences on what competitors are NOT doing that this brand should do first — the white space"
  },
  "myRecommendedCampaign": {
    "headline": "short bold statement of your recommendation — max 12 words",
    "argument": "2-4 sentences in first person — specific, take a position, explain why this beats other approaches",
    "angle": "the specific angle to lead with",
    "why": "why this angle beats the obvious alternatives"
  }
}`

    const userContent = `Brand analysis:
${JSON.stringify(understanding, null, 2)}

Assets:
- Founder image: ${hasFounder ? 'YES' : 'NO'}
- Product images: ${hasProduct ? `YES (${understanding?.products?.count || assets?.productImageUrls?.length || 0})` : 'NO'}
- Video: ${hasVideo ? 'YES' : 'NO'}
- Website: ${assets?.websiteUrl || 'not provided'}

${prompt ? `Stated direction: "${prompt}"` : ''}
${intent ? `Requested ad type: ${intent.replace(/_/g, ' ')}` : ''}

Give your full strategic assessment. Be honest. Make judgments. Name competitors. Name specific problems. Name specific actions.`

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userContent },
        ],
        max_tokens: 4000,
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
