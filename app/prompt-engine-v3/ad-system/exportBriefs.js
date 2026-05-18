// ─────────────────────────────────────────────────────────────
// Export Briefs
// Generates professional client-ready documents:
// Campaign Brief · Creator Brief · Media Buyer Brief
// ─────────────────────────────────────────────────────────────

export function buildCampaignBriefPrompt(adConfig, outputs) {
  const angle   = adConfig.selectedAngle   || adConfig.lockedAngle
  const hook    = adConfig.selectedHook    || adConfig.lockedHook
  const music   = adConfig.lockedMusic     || null
  const hasAngles    = (outputs?.angles    || []).length > 0
  const hasHooks     = (outputs?.hooks_pain || outputs?.hooks_desire || []).length > 0
  const hasCaptions  = (outputs?.captions  || []).length > 0
  const hasCampaign  = (outputs?.campaign  || []).length > 0

  const topAngles   = (outputs?.angles    || []).slice(0, 3).map(a => `• ${a.title}: "${a.hook}"`).join('\n')
  const topHooks    = (outputs?.hooks_pain || outputs?.hooks_desire || []).slice(0, 5).map((h, i) => `${i + 1}. "${h}"`).join('\n')
  const topCaptions = (outputs?.captions  || []).slice(0, 2).map(c => `• ${c.label}: "${String(c.fullCaption || '').slice(0, 200)}"`).join('\n')

  return `You are a senior account director writing a professional campaign brief for a client.

CAMPAIGN DATA:
Product: ${adConfig.productName || ''}
Description: ${adConfig.productDescription || ''}
Target Customer: ${adConfig.targetCustomer || ''}
Main Problem: ${adConfig.mainProblem || ''}
Main Desire: ${adConfig.mainDesire || ''}
Main Benefit: ${adConfig.mainBenefit || ''}
Proof Point: ${adConfig.proofPoint || ''}
Offer: ${adConfig.offer || ''}
CTA: ${adConfig.callToAction || ''}
Brand Voice: ${adConfig.brandVoice || ''}
Price Point: ${adConfig.pricePoint || ''}
Platform: ${adConfig.platform || ''}
Campaign Goal: ${adConfig.platformGoal || ''}
Visual Style: ${adConfig.adStyle || ''}
${angle ? `Selected Direction: ${angle.title}` : ''}
${hook ? `Selected Hook: "${hook}"` : ''}
${music ? `Music: ${music.title}` : ''}

${topAngles ? `TOP ANGLES GENERATED:\n${topAngles}` : ''}
${topHooks ? `TOP HOOKS GENERATED:\n${topHooks}` : ''}
${topCaptions ? `TOP CAPTIONS:\n${topCaptions}` : ''}

Write a complete, professional Campaign Brief document. Make it ready to send to a client or internal team.

Return ONLY valid JSON:
{
  "title": "Campaign Brief — [Product Name]",
  "sections": [
    { "heading": "Campaign Overview", "content": "2-3 sentences summarising what this campaign is and why" },
    { "heading": "Target Audience", "content": "detailed description of who we are targeting and their mindset" },
    { "heading": "Campaign Objective", "content": "specific measurable goal for this campaign" },
    { "heading": "Creative Direction", "content": "the main angle, tone, visual approach, and energy" },
    { "heading": "Key Message", "content": "the single most important thing the audience must take away" },
    { "heading": "Platform Strategy", "content": "platform, format, placement, and why" },
    { "heading": "Selected Hook", "content": "the winning hook and why it was chosen" },
    { "heading": "Brand Voice Guidelines", "content": "tone, language rules, what to avoid" },
    { "heading": "Success Metrics", "content": "how we measure if this campaign worked" }
  ]
}`
}

export function buildCreatorBriefPrompt(adConfig, outputs) {
  const angle   = adConfig.selectedAngle || adConfig.lockedAngle
  const hook    = adConfig.selectedHook  || adConfig.lockedHook
  const music   = adConfig.lockedMusic   || null
  const ugcScripts = (outputs?.ugc_scripts || []).slice(0, 2)

  return `You are a senior creative producer writing a UGC creator brief.

PRODUCT: ${adConfig.productName || ''}
TARGET CUSTOMER: ${adConfig.targetCustomer || ''}
BRAND VOICE: ${adConfig.brandVoice || ''}
PLATFORM: ${adConfig.platform || ''}
CAMPAIGN GOAL: ${adConfig.platformGoal || ''}
${angle ? `CREATIVE DIRECTION: ${angle.title} — ${angle.hook}` : ''}
${hook ? `OPENING HOOK TO USE: "${hook}"` : ''}
${music ? `MUSIC TRACK: ${music.title} (${music.mood || ''} energy)` : ''}
${ugcScripts.length > 0 ? `SAMPLE SCRIPTS:\n${ugcScripts.map(s => `• ${s.label}: "${s.hook}"`).join('\n')}` : ''}

Write a complete creator brief that a UGC creator can follow to film content. Be specific and practical.

Return ONLY valid JSON:
{
  "title": "Creator Brief — ${adConfig.productName || 'Product'}",
  "sections": [
    { "heading": "What We Need From You", "content": "clear 2-sentence summary of the ask" },
    { "heading": "The Brand", "content": "who this brand is, their vibe, and what they stand for" },
    { "heading": "Your Audience", "content": "exactly who you are talking to in this video" },
    { "heading": "Opening Hook (Use This)", "content": "the exact line to open with and why it works" },
    { "heading": "Video Structure", "content": "step-by-step what to say and show — hook, problem, reveal, benefit, CTA" },
    { "heading": "Tone & Energy", "content": "how to speak, move, and deliver — specific direction" },
    { "heading": "What NOT To Do", "content": "specific things to avoid — language, tone, style" },
    { "heading": "Filming Requirements", "content": "location, lighting, aspect ratio, duration, technical specs" },
    { "heading": "CTA", "content": "exact words to end the video with" }
  ]
}`
}

export function buildMediaBuyerBriefPrompt(adConfig, outputs) {
  const campaign  = (outputs?.campaign  || [])
  const stageMap  = campaign.slice(0, 5).map(s => `• ${s.label}: "${s.hook}" → CTA: ${s.cta}`).join('\n')

  return `You are a senior media buyer writing a paid media brief.

PRODUCT: ${adConfig.productName || ''}
PLATFORM: ${adConfig.platform || ''}
CAMPAIGN GOAL: ${adConfig.platformGoal || ''}
BRAND VOICE: ${adConfig.brandVoice || ''}
PRICE POINT: ${adConfig.pricePoint || ''}
TARGET CUSTOMER: ${adConfig.targetCustomer || ''}
OFFER: ${adConfig.offer || ''}
CTA: ${adConfig.callToAction || ''}
${stageMap ? `CAMPAIGN STAGES AVAILABLE:\n${stageMap}` : ''}

Write a complete media buyer brief with targeting, bidding, and creative rotation strategy.

Return ONLY valid JSON:
{
  "title": "Media Buyer Brief — ${adConfig.productName || 'Campaign'}",
  "sections": [
    { "heading": "Campaign Objective", "content": "specific KPI and what success looks like" },
    { "heading": "Audience Targeting", "content": "detailed targeting — demographics, interests, behaviours, lookalikes" },
    { "heading": "Platform & Placements", "content": "which platforms, which placements, and why" },
    { "heading": "Budget Recommendation", "content": "suggested budget split by funnel stage and objective" },
    { "heading": "Creative Rotation Strategy", "content": "how to rotate ads by funnel stage — TOFU, MOFU, BOFU" },
    { "heading": "Bidding Strategy", "content": "recommended bid type, target CPA/ROAS, optimisation event" },
    { "heading": "Retargeting Setup", "content": "pixel events, custom audiences, retargeting windows" },
    { "heading": "Testing Plan", "content": "what to A/B test first — hook, creative, audience, offer" },
    { "heading": "Reporting Cadence", "content": "what metrics to check daily, weekly, and when to scale or kill" }
  ]
}`
}
