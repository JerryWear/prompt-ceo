import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

const PLATFORM_RULES = {
  instagram: {
    label: 'Instagram',
    icon: '📸',
    hookMaxChars: 125,
    captionMaxChars: 2200,
    tone: 'aspirational, visually descriptive, lifestyle-driven',
    hashtagNote: 'Add 5-10 relevant hashtags at the end',
    ctaStyle: 'soft CTA (Link in bio, Save this, Double tap)',
    formatNote: 'Short punchy opening line, then expand. Emojis welcome.',
  },
  tiktok: {
    label: 'TikTok',
    icon: '🎵',
    hookMaxChars: 80,
    captionMaxChars: 150,
    tone: 'casual, energetic, trend-aware, conversational',
    hashtagNote: 'Add 3-5 trending hashtags',
    ctaStyle: 'direct action CTA (Follow for more, Comment X, Watch till end)',
    formatNote: 'Ultra-short. First 3 words must stop the scroll. Hook drives to watch.',
  },
  meta: {
    label: 'Meta Ads',
    icon: '🎯',
    hookMaxChars: 40,
    captionMaxChars: 125,
    tone: 'benefit-driven, direct, problem-solution focused',
    hashtagNote: 'No hashtags needed',
    ctaStyle: 'explicit CTA (Shop Now, Learn More, Get Started, Claim Offer)',
    formatNote: 'Lead with the pain or benefit. Clear value prop. Short sentences.',
  },
  youtube: {
    label: 'YouTube',
    icon: '▶️',
    hookMaxChars: 100,
    captionMaxChars: 5000,
    tone: 'authoritative, educational, storytelling, value-driven',
    hashtagNote: 'Add 3 hashtags above the fold',
    ctaStyle: 'subscribe + next action (Subscribe, Comment below, Check link)',
    formatNote: 'Strong title hook, then tell the full story. Timestamps if long.',
  },
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { outputs, productName, brandVoice, platforms: targetPlatforms } = await req.json()
    if (!outputs || typeof outputs !== 'object') {
      return NextResponse.json({ error: 'outputs is required' }, { status: 400 })
    }

    const platforms = targetPlatforms || ['instagram', 'tiktok', 'meta', 'youtube']

    const hooks = Object.keys(outputs)
      .filter(k => k.startsWith('hooks'))
      .flatMap(k => outputs[k]?.hooks || [])
      .slice(0, 3)
      .map(h => h.hook || h)
      .filter(Boolean)

    const captions = (outputs.captions || [])
      .slice(0, 2)
      .map(c => c.fullCaption || c.hook || c)
      .filter(Boolean)

    const angles = (outputs.angles || [])
      .slice(0, 2)
      .map(a => a.angle || a.headline || a)
      .filter(Boolean)

    const campaignStages = (outputs.campaign || [])
      .map(s => `${s.label}: ${s.hook}`)
      .slice(0, 3)
      .filter(Boolean)

    if (hooks.length === 0 && captions.length === 0 && angles.length === 0) {
      return NextResponse.json({ error: 'No content to adapt. Generate some ad content first.' }, { status: 400 })
    }

    const sourceContent = [
      hooks.length > 0 ? `HOOKS:\n${hooks.map((h, i) => `${i + 1}. ${h}`).join('\n')}` : '',
      captions.length > 0 ? `CAPTIONS:\n${captions.map((c, i) => `${i + 1}. ${c}`).join('\n')}` : '',
      angles.length > 0 ? `ANGLES:\n${angles.map((a, i) => `${i + 1}. ${a}`).join('\n')}` : '',
      campaignStages.length > 0 ? `CAMPAIGN STAGES:\n${campaignStages.join('\n')}` : '',
    ].filter(Boolean).join('\n\n')

    const results = {}

    await Promise.all(platforms.map(async (platform) => {
      const rules = PLATFORM_RULES[platform]
      if (!rules) return

      const systemPrompt = `You are an expert social media copywriter specializing in ${rules.label}.

Platform rules for ${rules.label}:
- Tone: ${rules.tone}
- Hook max characters: ${rules.hookMaxChars}
- Caption max characters: ${rules.captionMaxChars}
- CTA style: ${rules.ctaStyle}
- Format note: ${rules.formatNote}
- Hashtag note: ${rules.hashtagNote}
${productName ? `- Product: ${productName}` : ''}
${brandVoice ? `- Brand voice: ${brandVoice}` : ''}

Rewrite the provided ad content specifically for ${rules.label}. Adapt tone, length, format, and style — do NOT just copy the original with minor tweaks.

Respond ONLY with valid JSON:
{
  "hook": "<platform-native hook under ${rules.hookMaxChars} chars>",
  "caption": "<full caption adapted for ${rules.label} under ${rules.captionMaxChars} chars, including hashtags>",
  "angle": "<core angle reframed for ${rules.label} audience>",
  "cta": "<platform-native call to action>"
}`

      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: sourceContent },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      })

      if (!response.ok) return

      const data = await response.json()
      const raw = data.choices?.[0]?.message?.content?.trim() || '{}'

      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        const match = raw.match(/\{[\s\S]*\}/)
        parsed = match ? JSON.parse(match[0]) : null
      }

      if (parsed) {
        results[platform] = {
          ...parsed,
          icon: rules.icon,
          label: rules.label,
        }
      }
    }))

    return NextResponse.json({ platforms: results })
  } catch (err) {
    console.error('adapt-campaign error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
