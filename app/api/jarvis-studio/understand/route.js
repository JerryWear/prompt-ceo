import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 90

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// Attempt Whisper transcription of a video URL.
// Returns transcript string or null if it fails (too large, no audio, timeout).
async function transcribeVideo(videoUrl) {
  try {
    const fetchRes = await fetch(videoUrl)
    if (!fetchRes.ok) return null

    const contentLength = parseInt(fetchRes.headers.get('content-length') || '0', 10)
    if (contentLength > 24 * 1024 * 1024) return null // skip if >24MB (Whisper limit is 25MB)

    const buffer = await fetchRes.arrayBuffer()
    if (buffer.byteLength > 24 * 1024 * 1024) return null

    const blob = new Blob([buffer], { type: 'video/mp4' })
    const fd   = new FormData()
    fd.append('file', blob, 'video.mp4')
    fd.append('model', 'whisper-1')
    fd.append('response_format', 'text')

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: fd,
    })
    if (!res.ok) return null

    const text = await res.text()
    return text?.trim() || null
  } catch {
    return null
  }
}

// POST /api/jarvis-studio/understand
// Body: { websiteUrl?, founderImageUrl?, productImageUrls?, videoUrl?, prompt?, intent? }
// Returns: { understanding: { brand, founder, products, video, adReadiness } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { websiteUrl, founderImageUrl, productImageUrls = [], videoUrl, prompt, intent } = await req.json()

    // 1. Scrape website + transcribe video in parallel
    const [webContent, videoTranscript] = await Promise.all([
      websiteUrl ? (async () => {
        try {
          const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}` },
            body: JSON.stringify({ url: websiteUrl.trim(), formats: ['markdown'], onlyMainContent: true }),
          })
          const fcData = await fcRes.json()
          return (fcData.success && fcData.data?.markdown) ? fcData.data.markdown.slice(0, 8000) : ''
        } catch { return '' }
      })() : Promise.resolve(''),
      videoUrl ? transcribeVideo(videoUrl) : Promise.resolve(null),
    ])

    // 2. Build GPT-4o Vision message
    const userContent = []

    if (webContent) {
      userContent.push({ type: 'text', text: `WEBSITE CONTENT:\n${webContent}\n---` })
    }

    if (founderImageUrl) {
      userContent.push({ type: 'image_url', image_url: { url: founderImageUrl, detail: 'high' } })
      userContent.push({ type: 'text', text: 'FOUNDER/BRAND IMAGE: Analyze this person\'s visual presence, estimated age, style, energy, and what they communicate about the brand.' })
    }

    if (productImageUrls.length > 0) {
      userContent.push({ type: 'text', text: `PRODUCT IMAGES (${productImageUrls.length} images):` })
      productImageUrls.slice(0, 4).forEach((url, i) => {
        userContent.push({ type: 'image_url', image_url: { url, detail: 'high' } })
        userContent.push({ type: 'text', text: `Product image ${i + 1}: Describe what you see — product type, UI design, features visible, design language, colors, quality signals.` })
      })
    }

    if (videoUrl) {
      if (videoTranscript) {
        userContent.push({
          type: 'text',
          text: `VIDEO — WHISPER TRANSCRIPT (actual spoken content from the uploaded video):\n"${videoTranscript.slice(0, 3000)}"\n\nBased on this transcript: identify the product being demonstrated, key features mentioned, the tone and style of presentation, and what proof points are established. This is real content from the video.`,
        })
      } else {
        userContent.push({
          type: 'text',
          text: `VIDEO UPLOADED: A product/brand video was uploaded. Transcription was not available (file may be too large or contain no audio). Set video.present = true. Reason about the video based on brand context — what a founder-led product demo for this category typically demonstrates.`,
        })
      }
    }

    if (prompt) {
      userContent.push({ type: 'text', text: `CREATIVE DIRECTION FROM USER: ${prompt}` })
    }
    if (intent) {
      userContent.push({ type: 'text', text: `DESIRED AD TYPE: ${intent.replace(/_/g, ' ')}` })
    }

    const hasContent = webContent || founderImageUrl || productImageUrls.length || videoUrl || prompt
    if (!hasContent) return NextResponse.json({ error: 'At least one input is required' }, { status: 400 })

    userContent.push({
      type: 'text',
      text: `Extract deep brand intelligence from everything above. Return ONLY this exact JSON:
{
  "brand": {
    "name": "brand name",
    "tagline": "tagline or null",
    "industry": "specific industry",
    "productDescription": "2-3 sentences describing exactly what they sell",
    "valueProposition": "core unique value in one sharp sentence",
    "targetAudience": "very specific: demographics, psychographics, current situation, desired outcome",
    "toneOfVoice": "e.g. direct and confident, warm and empathetic, premium and aspirational",
    "painPoints": ["specific pain 1", "specific pain 2", "specific pain 3"],
    "keyMessages": ["message 1", "message 2", "message 3"],
    "visualStyle": "e.g. minimalist dark, bold and saturated, natural/earthy, luxury editorial",
    "competitiveAdvantage": "what makes this brand genuinely different — be specific"
  },
  "founder": {
    "present": ${!!founderImageUrl},
    "visualDescription": "appearance, style, energy — from the actual image",
    "estimatedAge": "age range or null",
    "cameraPresence": "assessment of how they will come across on camera",
    "suggestedRole": "spokesperson | authority | relatability"
  },
  "products": {
    "count": ${productImageUrls.length},
    "descriptions": ["description per product image observed"],
    "designLanguage": "visual/design language across products",
    "keyVisuals": "what stands out visually that could anchor an ad"
  },
  "video": {
    "present": ${!!videoUrl},
    "transcriptAvailable": ${!!videoTranscript},
    "analysis": "${videoTranscript ? 'Based on Whisper transcript' : 'No transcript — reasoning from context'}: describe what this video shows, what it demonstrates, and how it could be used in ads"
  },
  "adReadiness": {
    "strongestAsset": "founder | product | website | video | prompt",
    "productionApproach": "recommended mix: e.g. HeyGen for founder scenes + Runway for visual scenes",
    "platformFocus": "instagram_reels"
  }
}`,
    })

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are the senior brand intelligence analyst at an elite AI creative agency. Extract deep, specific, actionable brand intelligence from whatever inputs are provided. Be specific. Never generic. Return only valid JSON.',
          },
          { role: 'user', content: userContent },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
        max_tokens: 2000,
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let understanding
    try {
      understanding = JSON.parse(gptData.choices[0].message.content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse brand understanding' }, { status: 500 })
    }

    // Force ground-truth fields — GPT cannot override what we know was provided
    if (founderImageUrl)          understanding.founder = { ...understanding.founder, present: true }
    if (videoUrl)                 understanding.video   = { ...understanding.video,   present: true, transcriptAvailable: !!videoTranscript }
    if (productImageUrls.length)  understanding.products = { ...understanding.products, count: Math.max(understanding.products?.count || 0, productImageUrls.length) }

    // Attach transcript for the assess route to use
    if (videoTranscript) understanding.video.transcript = videoTranscript.slice(0, 2000)

    return NextResponse.json({ status: 'success', understanding })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
