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

    const hasFounder  = !!(assets?.founderImageUrl  || understanding?.founder?.present)
    const hasProduct  = !!(assets?.productImageUrls?.length || understanding?.products?.count > 0)
    const hasVideo    = !!(assets?.videoUrls?.length || understanding?.video?.present)
    const hasWebsite  = !!(assets?.websiteUrl)
    const hasPrompt   = !!(prompt?.trim())

    const systemPrompt = `You are Jarvis — a senior Creative Director, Marketing Strategist, and Competitive Intelligence Analyst with 20 years building direct-response ad campaigns.

You have reviewed a brand's uploaded assets, crawled website, and stated direction. You are writing a full strategic assessment before a campaign begins.

CRITICAL RULE — CITE EVIDENCE:
Every observation must reference what you actually saw. Never make general statements.
- Wrong: "Your founder builds trust."
- Right: "The uploaded founder image presents a professional executive in a clean setting, which supports authority-based positioning."
- Wrong: "Your product looks premium."
- Right: "The uploaded screenshot shows a dark dashboard with gold accents and an enterprise-style data layout — this signals premium positioning to a sophisticated buyer."
- Wrong: "Your messaging could be clearer."
- Right: "The homepage headline in the crawled website opens with the word 'AI' before explaining what problem is actually solved, which delays comprehension."

Your voice:
- Direct. Specific. Opinionated. Never vague.
- Make JUDGMENTS, not just observations. Disagree when you see something wrong.
- Challenge weak positioning even if the founder believes in it.
- You have seen 10,000 campaigns. You know what fails before it ships.
- NEVER use: revolutionize, game-changer, cutting-edge, innovative, AI-powered, seamless, future of, groundbreaking, world-class, disruptive, transformative, leverage, synergy, empower, holistic
- Write as if you are sitting across from the founder giving real paid strategic advice.
- Competitive intelligence: use your knowledge of the market to identify real named competitors. Be specific.

IMPORTANT — MISSING ASSETS:
Separate missing UPLOADED assets (user didn't provide them to Jarvis) from missing MARKETING assets (the business lacks them publicly).
- missingUploadedAssets = things the user could have uploaded but didn't (founder video, additional product images, etc.)
- missingMarketingAssets = things the business itself appears to lack publicly (customer testimonials, case studies, public demo video, etc.)

Return ONLY valid JSON with this exact structure:
{
  "evidenceUsed": {
    ${hasWebsite  ? '"website": "what you extracted from the crawled website — specific headlines, copy, positioning language you observed",' : ''}
    ${hasFounder  ? '"founderImage": "what you observed in the founder image — appearance, setting, how they present",' : ''}
    ${hasProduct  ? '"productImages": "what you observed in the product images/screenshots — UI, design language, features visible",' : ''}
    ${hasVideo    ? '"video": "what you observed in the video — content, style, what it demonstrates",' : ''}
    ${hasPrompt   ? '"prompt": "what you inferred from the stated direction",' : ''}
    "summary": "one sentence on how strong the overall asset set is for building ads"
  },
  "whatIUnderstand": {
    "whatTheyDo": "what this company does in plain language — no jargon",
    "whoTheyServe": "specific audience — not 'businesses' or 'marketers'",
    "whatStandsOut": "the single most notable thing about this business"
  },
  "whatILike": [
    "specific positive with evidence — cite what you saw",
    "specific positive with evidence — cite what you saw",
    "specific positive with evidence — cite what you saw"
  ],
  "whatConcernsMe": [
    "specific concern with evidence — name what you saw that caused this concern",
    "specific concern with evidence — name what you saw that caused this concern"
  ],
  "whatIWouldChange": [
    "specific actionable recommendation with reasoning",
    "specific actionable recommendation with reasoning",
    "specific actionable recommendation with reasoning"
  ],
  "whatYoureGettingWrong": [
    "direct judgment citing evidence — something wrong right now, stated plainly",
    "direct judgment citing evidence",
    "direct judgment citing evidence"
  ],
  "whatIWouldTestFirst": {
    "testA": { "name": "short test name", "format": "ad format or approach", "hypothesis": "one sentence on why this angle could win" },
    "testB": { "name": "short test name", "format": "ad format or approach", "hypothesis": "one sentence on why this angle could win" },
    "testC": { "name": "short test name", "format": "ad format or approach", "hypothesis": "one sentence on why this angle could win" },
    "jarvispick": "A",
    "whyThisWins": "2-3 sentences explaining specifically why the chosen test will outperform the others"
  },
  "missingUploadedAssets": [
    { "asset": "specific asset the user could have uploaded but didn't", "impact": "what this prevents in ad production" }
  ],
  "missingMarketingAssets": [
    { "asset": "specific asset the business appears to lack publicly", "impact": "what this limits in marketing effectiveness" },
    { "asset": "specific asset the business appears to lack publicly", "impact": "what this limits in marketing effectiveness" },
    { "asset": "specific asset the business appears to lack publicly", "impact": "what this limits in marketing effectiveness" }
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
    "howToUse": "specific role the founder should play — cite what you observed",
    "trustOpportunities": "what about this founder builds trust — cite what you saw",
    "authorityOpportunities": "what gives this founder credibility — cite what you observed",
    "personalStory": "what personal story angle would land — based on what you observed"
  }` : 'null'},
  "productOpportunity": ${hasProduct || hasVideo ? `{
    "whatStandsOut": "specific product features or visuals — cite what you saw",
    "whatToEmphasize": "what should be front and center — cite what makes this compelling",
    "visualMoments": "2-3 specific visual moments from the assets that would make great ad scenes"
  }` : 'null'},
  "competitiveIntelligence": {
    "competitors": [
      { "name": "real competitor name", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for in the market" },
      { "name": "real competitor name", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for in the market" },
      { "name": "real competitor name", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for in the market" }
    ],
    "whyWeWin": [
      "specific advantage over a named competitor",
      "specific advantage over a named competitor",
      "specific advantage over a named competitor"
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
    "opportunityGap": "2-3 sentences on what competitors are NOT doing that this brand should do first — the white space in the market"
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

Assets actually uploaded by the user:
- Website URL: ${hasWebsite  ? assets.websiteUrl : 'NOT PROVIDED'}
- Founder image: ${hasFounder ? 'YES — analyzed by vision model' : 'NOT UPLOADED'}
- Product images: ${hasProduct ? `YES — ${assets?.productImageUrls?.length || understanding?.products?.count || 0} image(s) analyzed` : 'NOT UPLOADED'}
- Video: ${hasVideo ? 'YES — analyzed' : 'NOT UPLOADED'}
- Stated direction: ${hasPrompt ? `"${prompt}"` : 'NONE PROVIDED'}
${intent ? `- Requested ad type: ${intent.replace(/_/g, ' ')}` : ''}

When listing missingUploadedAssets: only list things the user DID NOT upload above.
When listing missingMarketingAssets: list things the business appears to lack publicly regardless of what was uploaded.

Give your full strategic assessment. Cite evidence. Make judgments. Name competitors. Name specific problems. Name specific actions.`

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
