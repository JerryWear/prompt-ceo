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

// Build contradiction patterns for an asset type.
// When an asset WAS uploaded, any string matching these patterns is a contradiction.
const CONTRADICTION_PATTERNS = {
  video:   [/lack of.*video/i, /no.*video.*upload/i, /video.*not.*upload/i, /without.*video/i, /missing.*video/i, /video.*missing/i, /no video/i, /no.*product video/i, /video.*not.*provid/i, /\bno uploaded video\b/i],
  founder: [/lack of.*founder/i, /no.*founder.*image/i, /founder.*not.*upload/i, /missing.*founder/i, /no.*headshot/i, /no.*founder photo/i],
  product: [/lack of.*product image/i, /no.*product.*image.*upload/i, /missing.*product image/i],
}

// Scan a single string for contradiction patterns given the asset manifest.
function isContradiction(str, hasVideo, hasFounder, hasProduct) {
  if (!str) return false
  if (hasVideo   && CONTRADICTION_PATTERNS.video.some(p   => p.test(str))) return true
  if (hasFounder && CONTRADICTION_PATTERNS.founder.some(p => p.test(str))) return true
  if (hasProduct && CONTRADICTION_PATTERNS.product.some(p => p.test(str))) return true
  return false
}

// Remove contradictory items from an array of strings.
function cleanArray(arr, hasVideo, hasFounder, hasProduct) {
  if (!Array.isArray(arr)) return arr
  return arr.filter(item => {
    const str = typeof item === 'string' ? item : (item?.asset || item?.action || item?.text || '')
    return !isContradiction(str, hasVideo, hasFounder, hasProduct)
  })
}

// Recursively sanitize every string value in the assessment object.
function sanitizeAssessment(obj, hasVideo, hasFounder, hasProduct) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return cleanArray(obj, hasVideo, hasFounder, hasProduct)
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      out[k] = cleanArray(v, hasVideo, hasFounder, hasProduct)
    } else if (v && typeof v === 'object') {
      out[k] = sanitizeAssessment(v, hasVideo, hasFounder, hasProduct)
    } else {
      out[k] = v
    }
  }
  return out
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

    // Ground-truth asset manifest — built from actual uploaded state, not GPT inference
    const hasFounder  = !!(assets?.founderImageUrl  || understanding?.founder?.present)
    const hasProduct  = !!(assets?.productImageUrls?.length || understanding?.products?.count > 0)
    const hasVideo    = !!(assets?.videoUrls?.length || understanding?.video?.present)
    const hasWebsite  = !!(assets?.websiteUrl)
    const hasPrompt   = !!(prompt?.trim())
    const hasTranscript = !!(understanding?.video?.transcript)

    // This manifest is injected at the TOP of the system prompt as inviolable fact
    const assetManifest = `INVIOLABLE ASSET MANIFEST — READ THIS FIRST:
The following assets WERE uploaded and analyzed. No section of your assessment may contradict this.
- Website URL: ${hasWebsite  ? `YES (${assets.websiteUrl})` : 'NOT PROVIDED'}
- Founder image: ${hasFounder ? 'YES — analyzed by vision model' : 'NOT PROVIDED'}
- Product images: ${hasProduct ? `YES — ${assets?.productImageUrls?.length || understanding?.products?.count || 0} image(s) analyzed` : 'NOT PROVIDED'}
- Product video: ${hasVideo   ? `YES — uploaded and ${hasTranscript ? 'transcribed by Whisper (real audio content available)' : 'present (no audio transcript)'}` : 'NOT PROVIDED'}
- Stated direction: ${hasPrompt ? `YES — "${prompt}"` : 'NONE'}

HARD RULES derived from this manifest:
${hasVideo   ? '- Video WAS uploaded. NEVER say "lack of video", "no video", "video not uploaded", "missing video". Reason FROM the video, not about its absence.' : ''}
${hasFounder ? '- Founder image WAS uploaded. NEVER say founder image is missing.' : ''}
${hasProduct ? '- Product images WERE uploaded. NEVER say product images are missing.' : ''}
${hasWebsite ? '- Website WAS crawled. NEVER say website is missing.' : ''}

missingUploadedAssets may only contain assets NOT in the manifest above.`

    const systemPrompt = `You are Jarvis — a senior Creative Director, Marketing Strategist, and Competitive Intelligence Analyst with 20 years building direct-response ad campaigns.

${assetManifest}

Your task: write a full strategic assessment from actual observed evidence. Every conclusion must trace to something you observed.

EVIDENCE-FIRST RULE:
- Wrong: "Your founder builds trust."
- Right: "The uploaded founder image shows a professional in a structured environment — this supports authority-based positioning with a sophisticated buyer."
- Wrong: "Your messaging could be clearer."
- Right: "The crawled homepage opens with the word 'AI' before explaining what problem is solved — this delays comprehension for a first-time visitor."
- Wrong: "The product looks premium."
- Right: "The uploaded screenshot shows a dark dashboard with gold UI accents and dense data tables — this signals enterprise-grade positioning."

VIDEO EVIDENCE RULE:
${hasVideo && hasTranscript
  ? `A Whisper transcript from the video is provided. Analyze it directly. Quote specific phrases. Identify what the presenter says about the product, what features are demonstrated, what proof points are established. This is real content — reason from it.`
  : hasVideo
  ? `A video was uploaded. No audio transcript was available. Reason from the visual brand context and what a typical product demo in this category demonstrates. Do NOT say the video is missing. Do NOT say there is a lack of video.`
  : `No video was uploaded.`
}

COMPETITIVE INTELLIGENCE RULE:
Prioritize DIRECT product competitors — companies doing the exact same job for the exact same buyer. Name real companies. For AI ad/creative tools: Creatify, Arcads, AdCreative.ai, Pencil, HeyGen, Synthesia are more relevant competitors than Canva, Adobe, or Visme. Only include broad tools if genuinely closest to this product.

VOICE:
- Direct. Specific. Opinionated. Never vague.
- Make judgments, not observations. Disagree when something is wrong.
- NEVER use: revolutionize, game-changer, cutting-edge, innovative, seamless, future of, groundbreaking, world-class, disruptive, transformative, leverage, synergy, empower, holistic.
- Write as if speaking directly to the founder.

Return ONLY valid JSON:
{
  "evidenceUsed": {
    ${hasWebsite    ? '"website": "specific headlines, positioning language, copy observed",' : ''}
    ${hasFounder    ? '"founderImage": "specific observations — appearance, setting, authority signals, presentation style",' : ''}
    ${hasProduct    ? '"productImages": "specific observations — UI design, features visible, design language, quality signals",' : ''}
    ${hasVideo      ? `"video": "${hasTranscript ? 'From Whisper transcript: specific content, phrases spoken, features mentioned, proof points stated' : 'Video uploaded, no transcript: what the brand context suggests the video demonstrates'}",` : ''}
    ${hasPrompt     ? '"prompt": "what you inferred from the stated direction",' : ''}
    "summary": "one sentence on the overall strength of this asset set for ad production"
  },
  ${hasVideo ? `"videoAnalysis": {
    "whatIObserved": [
      "${hasTranscript ? 'specific thing from transcript — spoken content, feature mentioned, or proof point stated' : 'specific thing inferred from brand context about what this video demonstrates'}",
      "specific observation",
      "specific observation",
      "specific observation"
    ],
    "strongestProofPoints": [
      "specific moment or statement that proves the product works",
      "specific moment or statement"
    ],
    "strongestAdMoments": [
      "specific moment that would work cut into an ad — be precise",
      "specific moment"
    ],
    "visualOpportunities": [
      "specific visual that should become an ad scene",
      "specific visual"
    ],
    "whatConcernsMe": [
      "weak or confusing moment, missed opportunity in the video content"
    ]
  },` : ''}
  "whatIUnderstand": {
    "whatTheyDo": "plain language — no jargon",
    "whoTheyServe": "specific audience",
    "whatStandsOut": "most notable thing about this business"
  },
  "whatILike": [
    "specific positive citing evidence — name what you saw",
    "specific positive citing evidence",
    "specific positive citing evidence"
  ],
  "whatConcernsMe": [
    "specific concern citing evidence — name what you saw",
    "specific concern citing evidence"
  ],
  "whatIWouldChange": [
    "specific recommendation citing evidence",
    "specific recommendation citing evidence",
    "specific recommendation citing evidence"
  ],
  "whatYoureGettingWrong": [
    "direct judgment citing evidence",
    "direct judgment citing evidence",
    "direct judgment citing evidence"
  ],
  "whatIWouldTestFirst": {
    "testA": { "name": "short name", "format": "ad format", "hypothesis": "why this could win" },
    "testB": { "name": "short name", "format": "ad format", "hypothesis": "why this could win" },
    "testC": { "name": "short name", "format": "ad format", "hypothesis": "why this could win" },
    "jarvispick": "A",
    "whyThisWins": "2-3 sentences — specific argument for the chosen test"
  },
  "missingUploadedAssets": [
    { "asset": "ONLY assets NOT in the manifest — never list video/founder/product if they were uploaded", "impact": "what this prevents" }
  ],
  "missingMarketingAssets": [
    { "asset": "asset the business lacks publicly — unrelated to what was uploaded", "impact": "what this limits" },
    { "asset": "specific asset", "impact": "specific limitation" },
    { "asset": "specific asset", "impact": "specific limitation" }
  ],
  "ifThisWereMyCompany": {
    "focus": "single most important strategic focus",
    "thirtyDayActions": [
      { "action": "specific — not generic", "why": "specific reason this matters now" },
      { "action": "specific — not generic", "why": "specific reason this matters now" },
      { "action": "specific — not generic", "why": "specific reason this matters now" },
      { "action": "specific — not generic", "why": "specific reason this matters now" },
      { "action": "specific — not generic", "why": "specific reason this matters now" }
    ]
  },
  "founderOpportunity": ${hasFounder ? `{
    "howToUse": "specific role — cite what you observed in the image",
    "trustOpportunities": "cite what you saw that builds trust",
    "authorityOpportunities": "cite what you observed that establishes authority",
    "personalStory": "angle based on what you observed"
  }` : 'null'},
  "productOpportunity": ${hasProduct || hasVideo ? `{
    "whatStandsOut": "specific features — cite what you saw",
    "whatToEmphasize": "what should be front and center — cite evidence",
    "visualMoments": "2-3 specific scenes from the assets that would work in ads"
  }` : 'null'},
  "competitiveIntelligence": {
    "competitors": [
      { "name": "direct competitor — same product, same buyer", "whatTheyDoWell": "specific strength", "knownFor": "market reputation" },
      { "name": "direct competitor", "whatTheyDoWell": "specific strength", "knownFor": "market reputation" },
      { "name": "direct competitor", "whatTheyDoWell": "specific strength", "knownFor": "market reputation" }
    ],
    "whyWeWin": ["specific advantage over named competitor", "specific advantage", "specific advantage"],
    "whyWeLose": ["specific weakness vs named competitor", "specific weakness"],
    "whatWeMustImprove": ["recommendation naming a competitor", "recommendation naming a competitor", "recommendation naming a competitor"],
    "opportunityGap": "2-3 sentences on what direct competitors are not doing that this brand should do first"
  },
  "myRecommendedCampaign": {
    "headline": "bold statement — max 12 words",
    "argument": "2-4 sentences first person — specific position, specific reasoning",
    "angle": "specific angle to lead with",
    "why": "why this beats the obvious alternatives"
  }
}`

    const userContent = `Brand analysis from understand route:
${JSON.stringify(understanding, null, 2)}

${understanding?.video?.transcript ? `VIDEO TRANSCRIPT (real Whisper audio from uploaded video):\n"${understanding.video.transcript}"` : ''}

Uploaded asset manifest (same as in system prompt — use this as ground truth):
- Website: ${hasWebsite ? assets.websiteUrl : 'NOT PROVIDED'}
- Founder image: ${hasFounder ? 'YES' : 'NOT PROVIDED'}
- Product images: ${hasProduct ? `YES (${assets?.productImageUrls?.length || 0})` : 'NOT PROVIDED'}
- Video: ${hasVideo ? 'YES — DO NOT list as missing anywhere in your assessment' : 'NOT PROVIDED'}
- Prompt: ${hasPrompt ? `"${prompt}"` : 'NONE'}
${intent ? `- Ad type: ${intent.replace(/_/g, ' ')}` : ''}

Write the full assessment. Every conclusion must cite evidence. Make judgments. Name direct competitors first.`

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

    // Deep sanitize: recursively remove any string in any field that contradicts the asset manifest.
    // This is a deterministic safety net — runs after GPT regardless of what was generated.
    assessment = sanitizeAssessment(assessment, hasVideo, hasFounder, hasProduct)

    // Additional structured filter for missingUploadedAssets
    if (Array.isArray(assessment.missingUploadedAssets)) {
      const blocklist = []
      if (hasFounder) blocklist.push('founder', 'headshot', 'portrait', 'face', 'photo of founder')
      if (hasProduct) blocklist.push('product image', 'product screenshot', 'product photo', 'screenshot')
      if (hasVideo)   blocklist.push('video', 'footage', 'demo video', 'demo footage', 'recording', 'clip', 'screen recording', 'walkthrough', 'product video', 'brand video')
      if (hasWebsite) blocklist.push('website', 'url', 'website link')
      assessment.missingUploadedAssets = assessment.missingUploadedAssets.filter(item => {
        const lower = (item?.asset || '').toLowerCase()
        return !blocklist.some(kw => lower.includes(kw))
      })
    }

    return NextResponse.json({ assessment })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
