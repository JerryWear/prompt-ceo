// ─────────────────────────────────────────────────────────────
// Ad Angles Generator
// Builds the prompt sent to the AI to generate 10 creative
// ad angles from a single product input.
// ─────────────────────────────────────────────────────────────

export function buildAnglesPrompt(adConfig) {
  const {
    productName       = '',
    productDescription = '',
    targetCustomer    = '',
    mainProblem       = '',
    mainDesire        = '',
    mainBenefit       = '',
    proofPoint        = '',
    offer             = '',
    callToAction      = '',
    brandVoice        = 'premium',
    pricePoint        = 'mid-ticket',
    platformGoal      = 'sales',
    targetMood        = '',
    platform          = 'instagram',
  } = adConfig

  return `You are a world-class advertising strategist and creative director.

Generate 10 distinct creative ad angles for this product. Each angle must be a completely different psychological approach to selling the same product.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem It Solves: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Call to Action: ${callToAction || 'Not specified'}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
Campaign Goal: ${platformGoal}
Platform: ${platform}
Mood: ${targetMood || 'aspirational, premium'}

OUTPUT FORMAT — return a valid JSON array with exactly 10 objects:

[
  {
    "angleId": "transformation",
    "title": "Transformation Angle",
    "hook": "one powerful hook line for this angle",
    "emotionalTrigger": "the core emotion this angle activates",
    "customerPain": "the specific pain this angle addresses",
    "customerDesire": "the desire this angle speaks to",
    "adPromise": "what this angle promises the customer",
    "visualDirection": "describe the ideal visual for this angle in one sentence",
    "captionDirection": "describe the caption tone and structure in one sentence",
    "scriptDirection": "describe the UGC/video script direction in one sentence"
  }
]

The 10 angles must cover these psychological approaches (one each):
1. Transformation (before/after, identity shift)
2. Pain Relief (frustration, urgency, problem-first)
3. Aspiration (dream lifestyle, status, beauty)
4. Authority (expertise, trust, credibility)
5. Social Proof (reviews, popularity, others using it)
6. Urgency (limited time, scarcity, FOMO)
7. Emotional (deep personal connection, identity)
8. Luxury Status (premium, exclusive, high-end)
9. Simplicity (easy, fast, effortless solution)
10. Discipline (consistency, self-respect, action)

Make every hook specific to this product — not generic. Make each angle feel like a real campaign concept.
Return ONLY the JSON array. No markdown. No explanation.`
}
