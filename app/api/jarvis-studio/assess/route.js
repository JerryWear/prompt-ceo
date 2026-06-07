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

// ---------------------------------------------------------------------------
// assetManifest — built entirely from deterministic application state.
// GPT never sees a question mark about what was uploaded. It sees facts.
// ---------------------------------------------------------------------------
function buildAssetManifest(assets, understanding, promptText) {
  // Video is present if: upload succeeded (videoUrls has entries) OR user had
  // a video file selected (videoProvided flag) OR frames were analyzed
  // OR understand route marked it present
  const videoPresent = !!(
    assets?.videoUrls?.length ||
    assets?.videoProvided ||
    understanding?.video?.framesAnalyzed ||
    understanding?.video?.present
  )

  return {
    website: {
      present: !!(assets?.websiteUrl),
      url: assets?.websiteUrl || null,
      scraped: !!(understanding?.brand?.name && assets?.websiteUrl),
      brandExtracted: understanding?.brand || null,
    },
    founderImage: {
      present: !!(assets?.founderImageUrl || understanding?.founder?.present),
      url: assets?.founderImageUrl || null,
      analysis: understanding?.founder?.visualDescription || null,
      cameraPresence: understanding?.founder?.cameraPresence || null,
      suggestedRole: understanding?.founder?.suggestedRole || null,
    },
    productImages: {
      present: !!(assets?.productImageUrls?.length || understanding?.products?.count > 0),
      count: assets?.productImageUrls?.length || understanding?.products?.count || 0,
      descriptions: understanding?.products?.descriptions || [],
      designLanguage: understanding?.products?.designLanguage || null,
      keyVisuals: understanding?.products?.keyVisuals || null,
    },
    productVideo: {
      present: videoPresent,
      url: assets?.videoUrls?.[0] || null,
      transcriptAvailable: !!(understanding?.video?.transcript),
      framesAnalyzed: !!(understanding?.video?.framesAnalyzed),
      transcript: understanding?.video?.transcript || null,
      analysis: understanding?.video?.analysis || null,
      visualAnalysis: understanding?.video?.visualAnalysis || null,
    },
    music: {
      present: !!(assets?.musicUrl || assets?.musicTrackId),
      trackId: assets?.musicTrackId || null,
    },
    prompt: {
      present: !!(promptText?.trim()),
      text: promptText?.trim() || null,
    },
  }
}

// ---------------------------------------------------------------------------
// missingUploadedAssets — computed by code, never by GPT.
// It is the inverse of what is present in the manifest.
// ---------------------------------------------------------------------------
const UPLOADABLE = [
  {
    key: 'founderImage',
    label: 'Founder image',
    impact: 'Enables HeyGen avatar generation and founder-led ad scenes',
  },
  {
    key: 'productImages',
    label: 'Product images',
    impact: 'Enables product-focused visual scenes with DALL-E and Runway visual reference',
  },
  {
    key: 'productVideo',
    label: 'Product video',
    impact: 'Enables video-based reasoning, transcript analysis, and repurposing existing footage into ad clips',
  },
  {
    key: 'website',
    label: 'Website URL',
    impact: 'Enables deep brand analysis from live website copy, headlines, and positioning',
  },
  {
    key: 'music',
    label: 'Music track',
    impact: 'Enables custom music aligned with brand tone instead of AI-selected track',
  },
]

function computeMissingUploaded(manifest) {
  return UPLOADABLE
    .filter(item => !manifest[item.key]?.present)
    .map(item => ({ asset: item.label, impact: item.impact }))
}

// ---------------------------------------------------------------------------
// Server-side contradiction scan — last-resort safety net.
// Runs AFTER GPT. Removes any string in any array that contradicts the manifest.
// ---------------------------------------------------------------------------
const CONTRADICTION_RULES = [
  {
    field: 'productVideo',
    patterns: [
      /\black of.*video\b/i, /\bno.*video.*upload/i, /\bvideo.*not.*upload/i,
      /\bwithout.*video\b/i, /\bmissing.*video\b/i, /\bvideo.*missing\b/i,
      /\bno video\b/i, /\bno.*product video\b/i, /\babsence of.*video\b/i,
      /\bvideo.*not.*provid/i, /\bno uploaded video\b/i, /\bno footage\b/i,
    ],
  },
  {
    field: 'website',
    patterns: [
      /\black of.*website\b/i, /\bno.*website\b/i, /\bwithout.*website\b/i,
      /\bmissing.*website\b/i, /\bwebsite.*missing\b/i, /\babsence of.*website\b/i,
      /\bno.*url\b/i, /\bwebsite.*not.*provid/i, /\bno web.*presence\b/i,
    ],
  },
  {
    field: 'founderImage',
    patterns: [
      /\black of.*founder\b/i, /\bno.*founder.*image\b/i, /\bfounder.*not.*upload/i,
      /\bmissing.*founder\b/i, /\bno.*headshot\b/i, /\bno.*founder photo\b/i,
    ],
  },
  {
    field: 'productImages',
    patterns: [
      /\black of.*product image\b/i, /\bno.*product.*image.*upload/i,
      /\bmissing.*product image\b/i, /\bno product screenshot\b/i,
    ],
  },
]

function scanForContradictions(str, manifest) {
  if (!str || typeof str !== 'string') return false
  for (const rule of CONTRADICTION_RULES) {
    if (!manifest[rule.field]?.present) continue // asset not present → GPT may mention its absence
    if (rule.patterns.some(p => p.test(str))) return true // asset IS present but GPT claims it isn't
  }
  return false
}

function sanitize(value, manifest) {
  if (!value || typeof value !== 'object') return value
  if (Array.isArray(value)) {
    return value.filter(item => {
      const str = typeof item === 'string'
        ? item
        : (item?.asset || item?.action || item?.text || item?.concern || item?.observation || '')
      return !scanForContradictions(str, manifest)
    })
  }
  const out = {}
  for (const [k, v] of Object.entries(value)) {
    out[k] = Array.isArray(v) ? sanitize(v, manifest) : (v && typeof v === 'object') ? sanitize(v, manifest) : v
  }
  return out
}

// ---------------------------------------------------------------------------
// POST /api/jarvis-studio/assess
// Body: { understanding, assets, prompt?, intent? }
// Returns: { assessment, assetManifest, missingUploadedAssets }
// ---------------------------------------------------------------------------
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { understanding, assets, prompt, intent } = await req.json()
    if (!understanding) return NextResponse.json({ error: 'understanding required' }, { status: 400 })

    // Build manifest and missing list from deterministic state — never from GPT
    const manifest = buildAssetManifest(assets, understanding, prompt)
    const missingUploadedAssets = computeMissingUploaded(manifest)

    // Build a plain-English asset summary for GPT — facts only, no ambiguity
    const factBlock = `
WHAT EXISTS (FACTS — DO NOT CONTRADICT THESE):
${manifest.website.present         ? `✓ Website URL: ${manifest.website.url} — crawled and brand data extracted` : '✗ Website: not provided'}
${manifest.founderImage.present    ? `✓ Founder image: uploaded and analyzed by vision model` : '✗ Founder image: not provided'}
${manifest.productImages.present   ? `✓ Product images: ${manifest.productImages.count} image(s) uploaded and analyzed` : '✗ Product images: not provided'}
${manifest.productVideo.present    ? `✓ Product video: uploaded${manifest.productVideo.transcriptAvailable ? ', Whisper audio transcript available' : ', no audio transcript'}${manifest.productVideo.framesAnalyzed ? ', visual frames analyzed by GPT-4o Vision' : ''}` : '✗ Product video: not provided'}
${manifest.music.present           ? `✓ Music track: provided` : '✗ Music: not provided'}
${manifest.prompt.present          ? `✓ Creative direction: "${manifest.prompt.text}"` : '✗ No creative direction stated'}

YOUR JOB: Analyze what IS present. Do not decide what exists.
You may critique the QUALITY of present assets. You may NOT say any present asset is absent or missing.
Example allowed: "The video does not show a clear CTA." (quality concern about a present asset)
Example forbidden: "There is no video." (existence claim contradicting the facts above)
`.trim()

    // Build the analysis context from the manifest — only present assets get a section
    const analysisContext = []

    if (manifest.website.present && manifest.website.brandExtracted) {
      const b = manifest.website.brandExtracted
      analysisContext.push(`WEBSITE ANALYSIS:
Product: ${b.productDescription}
Value proposition: ${b.valueProposition}
Target audience: ${b.targetAudience}
Tone: ${b.toneOfVoice}
Pain points: ${(b.painPoints || []).join('; ')}
Key messages: ${(b.keyMessages || []).join('; ')}
Visual style: ${b.visualStyle}
Competitive advantage: ${b.competitiveAdvantage}`)
    }

    if (manifest.founderImage.present) {
      analysisContext.push(`FOUNDER IMAGE ANALYSIS:
Visual description: ${manifest.founderImage.analysis}
Camera presence: ${manifest.founderImage.cameraPresence}
Suggested role: ${manifest.founderImage.suggestedRole}`)
    }

    if (manifest.productImages.present) {
      analysisContext.push(`PRODUCT IMAGE ANALYSIS (${manifest.productImages.count} images):
Descriptions: ${(manifest.productImages.descriptions || []).join(' | ')}
Design language: ${manifest.productImages.designLanguage}
Key visuals: ${manifest.productImages.keyVisuals}`)
    }

    if (manifest.productVideo.present) {
      const videoParts = []
      if (manifest.productVideo.transcriptAvailable) {
        videoParts.push(`AUDIO TRANSCRIPT (Whisper — real spoken content):\n"${manifest.productVideo.transcript}"`)
      } else {
        videoParts.push(`Audio transcript: not available (silent or no narration)`)
      }
      if (manifest.productVideo.framesAnalyzed && manifest.productVideo.visualAnalysis) {
        const va = manifest.productVideo.visualAnalysis
        videoParts.push(`VISUAL FRAME ANALYSIS (GPT-4o Vision — 5 frames captured across the video):
Observed screens/sections: ${(va.observedScreens || []).join(', ') || 'none identified'}
Detected features: ${(va.detectedFeatures || []).join(', ') || 'none identified'}
Visible text: ${(va.visibleText || []).join(', ') || 'none identified'}
Workflow summary: ${va.workflowSummary || 'not identified'}
Strongest moments: ${(va.strongestMoments || []).join(' | ') || 'none identified'}
Ad opportunities from frames: ${(va.adOpportunities || []).join(' | ') || 'none identified'}`)
      } else if (!manifest.productVideo.framesAnalyzed) {
        videoParts.push(`Visual frame analysis: not performed`)
        if (manifest.productVideo.analysis) {
          videoParts.push(`Context-based video inference: ${manifest.productVideo.analysis}`)
        }
      }
      analysisContext.push(`PRODUCT VIDEO:\n${videoParts.join('\n\n')}`)
    }

    if (manifest.prompt.present) {
      analysisContext.push(`CREATIVE DIRECTION: "${manifest.prompt.text}"`)
    }

    const systemPrompt = `You are Jarvis — a senior Creative Director, Marketing Strategist, and Competitive Intelligence Analyst with 20 years building direct-response campaigns.

${factBlock}

EVIDENCE-FIRST RULE — every conclusion must cite what you observed:
- Wrong: "Your founder builds trust."
- Right: "The founder image shows a professional in a structured environment, which supports authority-based positioning."
- Wrong: "The product looks premium."
- Right: "The uploaded screenshot shows a dark dashboard with gold UI accents, signaling enterprise-grade positioning."

COMPETITIVE INTELLIGENCE RULE:
Identify DIRECT product competitors first — companies doing the exact same job for the same buyer.
For AI ad/creative tools: Creatify, Arcads, AdCreative.ai, Pencil, HeyGen, Synthesia are direct competitors.
Canva, Adobe, Visme are NOT direct competitors unless this product is a design tool.

VOICE: Direct. Specific. Opinionated. No generic marketing language.
NEVER use: revolutionize, game-changer, cutting-edge, innovative, seamless, future of, groundbreaking, world-class, disruptive, transformative, leverage, synergy, empower.

Return ONLY valid JSON — do NOT include a missingUploadedAssets field (the system computes this):
{
  "evidenceUsed": {
    ${manifest.website.present      ? '"website": "specific headlines and copy observed from the crawled site",' : ''}
    ${manifest.founderImage.present ? '"founderImage": "specific observations from the image — appearance, setting, authority signals",' : ''}
    ${manifest.productImages.present? '"productImages": "specific observations — UI, features visible, design language",' : ''}
    ${manifest.productVideo.present ? `"video": "${manifest.productVideo.framesAnalyzed ? 'From visual frames: list the specific screens, UI elements, and features you saw — be literal. ' : ''}${manifest.productVideo.transcriptAvailable ? 'From Whisper transcript: specific content, features spoken, proof points stated.' : 'Video uploaded, no transcript: contextual reasoning from brand.'}",` : ''}
    ${manifest.prompt.present       ? '"prompt": "what you inferred from the stated direction",' : ''}
    "summary": "one sentence on asset set strength for ad production"
  },
  ${manifest.productVideo.present ? `"videoAnalysis": {
    "whatIObserved": [${manifest.productVideo.framesAnalyzed ? '"specific screen or feature I saw in the frames — be literal"' : '"specific observation from transcript or context"'}, "specific observation", "specific observation", "specific observation"],
    "strongestProofPoints": ["specific proof point — cite audio transcript or visual frame", "specific proof point"],
    "strongestAdMoments": [${manifest.productVideo.framesAnalyzed ? '"frame at X position showed Y — this becomes an ad scene because..."' : '"moment that would work in an ad"'}, "specific moment"],
    "visualOpportunities": [${manifest.productVideo.framesAnalyzed ? '"I saw [specific screen] — this should become an ad scene showing [specific benefit]"' : '"specific visual that should become an ad scene"'}, "specific visual"],
    "whatConcernsMe": ["quality concern about the video content — NOT existence concerns"]
  },` : ''}
  "whatIUnderstand": {
    "whatTheyDo": "plain language, no jargon",
    "whoTheyServe": "specific audience, not generic descriptors",
    "whatStandsOut": "most notable or surprising thing about this business"
  },
  "whatILike": ["positive with evidence — cite what you observed", "positive with evidence", "positive with evidence"],
  "whatConcernsMe": ["concern with evidence — cite what you saw, quality of PRESENT assets only", "concern with evidence"],
  "whatIWouldChange": ["recommendation with reasoning and evidence", "recommendation", "recommendation"],
  "whatYoureGettingWrong": ["direct judgment citing evidence", "direct judgment", "direct judgment"],
  "whatIWouldTestFirst": {
    "testA": { "name": "short name", "format": "ad format", "hypothesis": "why this could win" },
    "testB": { "name": "short name", "format": "ad format", "hypothesis": "why this could win" },
    "testC": { "name": "short name", "format": "ad format", "hypothesis": "why this could win" },
    "jarvispick": "A",
    "whyThisWins": "2-3 sentences — specific argument citing evidence"
  },
  "missingMarketingAssets": [
    { "asset": "something the business PUBLICLY lacks — unrelated to what was uploaded to Jarvis", "impact": "specific limitation in marketing" },
    { "asset": "public marketing gap", "impact": "specific limitation" },
    { "asset": "public marketing gap", "impact": "specific limitation" }
  ],
  "ifThisWereMyCompany": {
    "focus": "single most important strategic focus",
    "thirtyDayActions": [
      { "action": "specific — not generic", "why": "specific reason this matters now" },
      { "action": "specific", "why": "specific reason" },
      { "action": "specific", "why": "specific reason" },
      { "action": "specific", "why": "specific reason" },
      { "action": "specific", "why": "specific reason" }
    ]
  },
  "founderOpportunity": ${manifest.founderImage.present ? `{
    "howToUse": "specific role — cite what you observed in the image",
    "trustOpportunities": "cite what you saw that builds trust",
    "authorityOpportunities": "cite what establishes authority",
    "personalStory": "angle based on what you observed"
  }` : 'null'},
  "productOpportunity": ${(manifest.productImages.present || manifest.productVideo.present) ? `{
    "whatStandsOut": "specific features — cite what you saw",
    "whatToEmphasize": "what should be front and center — cite evidence",
    "visualMoments": "2-3 specific scenes from the assets that work in ads"
  }` : 'null'},
  "competitiveIntelligence": {
    "competitors": [
      { "name": "direct competitor — same product, same buyer", "whatTheyDoWell": "specific strength", "knownFor": "market reputation" },
      { "name": "direct competitor", "whatTheyDoWell": "specific strength", "knownFor": "market reputation" },
      { "name": "direct competitor", "whatTheyDoWell": "specific strength", "knownFor": "market reputation" }
    ],
    "whyWeWin": ["specific advantage over named competitor", "specific advantage", "specific advantage"],
    "whyWeLose": ["specific weakness vs named competitor", "specific weakness"],
    "whatWeMustImprove": ["recommendation naming a competitor", "recommendation", "recommendation"],
    "opportunityGap": "2-3 sentences on what direct competitors are not doing that this brand should do first"
  },
  "myRecommendedCampaign": {
    "headline": "bold statement — max 12 words",
    "argument": "2-4 sentences first person — specific position, cite evidence",
    "angle": "specific angle to lead with",
    "why": "why this beats the obvious alternatives"
  }
}`

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `Here is the brand analysis context:\n\n${analysisContext.join('\n\n')}\n\nWrite the full strategic assessment. Cite evidence. Make judgments. Name direct competitors first.` },
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

    // Ensure GPT didn't sneak a missingUploadedAssets into its response — we own this field
    delete assessment.missingUploadedAssets

    // Last-resort contradiction scan across all remaining GPT-generated text
    assessment = sanitize(assessment, manifest)

    // Return assessment + manifest + code-computed missing list as separate fields
    return NextResponse.json({ assessment, assetManifest: manifest, missingUploadedAssets })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
