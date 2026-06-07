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

// Keywords used to post-process missingUploadedAssets — strip any asset that was actually provided.
// This is a deterministic safety net so GPT cannot contradict what we know was uploaded.
function stripProvidedFromMissing(missingList, hasFounder, hasProduct, hasVideo, hasWebsite) {
  if (!Array.isArray(missingList)) return []
  const blocklist = []
  if (hasFounder) blocklist.push('founder', 'headshot', 'portrait', 'face', 'person', 'photo of')
  if (hasProduct) blocklist.push('product image', 'product screenshot', 'product photo', 'screenshot', 'app screenshot')
  if (hasVideo)   blocklist.push('video', 'footage', 'demo video', 'demo footage', 'recording', 'clip', 'screen recording', 'walkthrough video', 'product video')
  if (hasWebsite) blocklist.push('website url', 'website link', 'url', 'website address')
  return missingList.filter(item => {
    const lower = (item.asset || '').toLowerCase()
    return !blocklist.some(kw => lower.includes(kw))
  })
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

    const hasFounder = !!(assets?.founderImageUrl  || understanding?.founder?.present)
    const hasProduct = !!(assets?.productImageUrls?.length || understanding?.products?.count > 0)
    const hasVideo   = !!(assets?.videoUrls?.length || understanding?.video?.present)
    const hasWebsite = !!(assets?.websiteUrl)
    const hasPrompt  = !!(prompt?.trim())

    const systemPrompt = `You are Jarvis — a senior Creative Director, Marketing Strategist, and Competitive Intelligence Analyst with 20 years building direct-response ad campaigns.

You have reviewed a brand's uploaded assets, crawled website, and stated direction. You are writing a full strategic assessment before a campaign begins.

CRITICAL RULE — CITE EVIDENCE:
Every observation must reference what you actually saw or analyzed. Never make general statements.
- Wrong: "Your founder builds trust."
- Right: "The uploaded founder image presents a professional executive in a clean setting, which supports authority-based positioning."
- Wrong: "Your product looks premium."
- Right: "The uploaded screenshot shows a dark dashboard with gold accents and an enterprise-style data layout — this signals premium positioning to a sophisticated buyer."

CRITICAL RULE — MISSING UPLOADED ASSETS:
The user message will list exactly what was uploaded. You MUST NOT list any uploaded asset as a missing uploaded asset.
If a video was uploaded: do NOT list video, demo video, product video, or footage as missing uploaded assets.
If a founder image was uploaded: do NOT list founder image, headshot, or photo as missing uploaded assets.
If product images were uploaded: do NOT list product images or screenshots as missing uploaded assets.
Missing uploaded assets = only things the user could have uploaded but CHOSE NOT TO.

CRITICAL RULE — COMPETITIVE INTELLIGENCE:
Always identify DIRECT product competitors first — companies doing the exact same job for the exact same buyer.
Prioritize companies that:
- Compete in the same product category (e.g. for AI ad creation: Creatify, Arcads, AdCreative.ai, Pencil, not Canva or Adobe)
- Target the same customer type
- Offer the same core workflow
Only include broad creative tools (Canva, Adobe, Visme) if they are genuinely the closest competitors to this specific product.
Name real companies. Be specific about what makes each one a threat.

Your voice:
- Direct. Specific. Opinionated. Never vague.
- Make JUDGMENTS, not just observations. Disagree when you see something wrong.
- Challenge weak positioning even if the founder believes in it.
- NEVER use: revolutionize, game-changer, cutting-edge, innovative, AI-powered, seamless, future of, groundbreaking, world-class, disruptive, transformative, leverage, synergy, empower, holistic
- Write as if you are sitting across from the founder giving real paid strategic advice.

Return ONLY valid JSON with this exact structure:
{
  "evidenceUsed": {
    ${hasWebsite  ? '"website": "specific headlines, copy, positioning language observed in the crawled website",' : ''}
    ${hasFounder  ? '"founderImage": "what you observed — appearance, setting, presentation style, authority signals",' : ''}
    ${hasProduct  ? '"productImages": "what you observed — UI design, features visible, design language, product quality signals",' : ''}
    ${hasVideo    ? '"video": "what you observed — content type, screens shown, workflows demonstrated, UI elements visible, production quality",' : ''}
    ${hasPrompt   ? '"prompt": "what you inferred from the stated direction",' : ''}
    "summary": "one sentence on the overall strength of this asset set for ad production"
  },
  ${hasVideo ? `"videoAnalysis": {
    "whatIObserved": [
      "specific thing observed in the video — screen, workflow, UI element, or moment",
      "specific thing observed in the video",
      "specific thing observed in the video",
      "specific thing observed in the video"
    ],
    "strongestProofPoints": [
      "specific moment or element that proves the product works or delivers value",
      "specific moment or element that proves the product works or delivers value"
    ],
    "strongestAdMoments": [
      "specific moment in the video that would work well cut into an ad",
      "specific moment in the video that would work well cut into an ad"
    ],
    "visualOpportunities": [
      "specific visual from the video that should become an ad scene",
      "specific visual from the video that should become an ad scene"
    ]
  },` : ''}
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
    { "asset": "asset the user could have uploaded but did not — NEVER list anything already uploaded", "impact": "what this prevents in ad production" }
  ],
  "missingMarketingAssets": [
    { "asset": "asset the business appears to lack publicly — independent of what was uploaded", "impact": "what this limits in marketing effectiveness" },
    { "asset": "specific missing marketing asset", "impact": "specific limitation" },
    { "asset": "specific missing marketing asset", "impact": "specific limitation" }
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
    "howToUse": "specific role the founder should play — cite what you observed in the image",
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
      { "name": "direct competitor — same product category, same buyer", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for" },
      { "name": "direct competitor — same product category, same buyer", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for" },
      { "name": "direct competitor — same product category, same buyer", "whatTheyDoWell": "specific strength", "knownFor": "what they are known for" }
    ],
    "whyWeWin": [
      "specific advantage over a named direct competitor",
      "specific advantage over a named direct competitor",
      "specific advantage over a named direct competitor"
    ],
    "whyWeLose": [
      "specific area where a named direct competitor is currently stronger",
      "specific area where a named direct competitor is currently stronger"
    ],
    "whatWeMustImprove": [
      "specific recommendation referencing a competitor by name",
      "specific recommendation referencing a competitor by name",
      "specific recommendation referencing a competitor by name"
    ],
    "opportunityGap": "2-3 sentences on what direct competitors are NOT doing that this brand should do first — the white space"
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

WHAT THE USER ACTUALLY UPLOADED (do not list any of these in missingUploadedAssets):
- Website URL: ${hasWebsite  ? `YES — ${assets.websiteUrl}` : 'NOT PROVIDED'}
- Founder image: ${hasFounder ? 'YES — analyzed by vision model' : 'NOT UPLOADED'}
- Product images: ${hasProduct ? `YES — ${assets?.productImageUrls?.length || understanding?.products?.count || 0} image(s) analyzed` : 'NOT UPLOADED'}
- Video: ${hasVideo ? `YES — ${assets?.videoUrls?.length || 1} video(s) analyzed — DO NOT list video as a missing uploaded asset` : 'NOT UPLOADED'}
- Stated direction: ${hasPrompt ? `"${prompt}"` : 'NONE PROVIDED'}
${intent ? `- Requested ad type: ${intent.replace(/_/g, ' ')}` : ''}

Give your full strategic assessment. Cite evidence. Make judgments. Name direct competitors first. Name specific problems. Name specific actions.`

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

    // Deterministic post-processing: strip any uploaded asset from missingUploadedAssets
    // This is a safety net — GPT cannot contradict what we know was provided
    assessment.missingUploadedAssets = stripProvidedFromMissing(
      assessment.missingUploadedAssets,
      hasFounder, hasProduct, hasVideo, hasWebsite
    )

    return NextResponse.json({ assessment })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
