// ─────────────────────────────────────────────────────────────
// Ad Hooks Generator
// Builds prompts for generating hook packs across 5 categories.
// Each pack returns 10 hooks of a specific type.
// ─────────────────────────────────────────────────────────────

export const HOOK_TYPES = {
  pain:         { label: 'Pain Hooks',         desc: 'Call out the problem directly' },
  desire:       { label: 'Desire Hooks',        desc: 'Speak to what the customer wants' },
  curiosity:    { label: 'Curiosity Hooks',     desc: 'Open a loop, create intrigue' },
  luxury:       { label: 'Luxury Hooks',        desc: 'Premium lifestyle, status, exclusivity' },
  directOffer:  { label: 'Direct Offer Hooks',  desc: 'Clear sales hook with the deal upfront' },
}

export function buildHooksPrompt(adConfig, hookType = 'pain') {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainProblem        = '',
    mainDesire         = '',
    mainBenefit        = '',
    proofPoint         = '',
    offer              = '',
    brandVoice         = 'premium',
    pricePoint         = 'mid-ticket',
    platform           = 'instagram',
  } = adConfig

  const hookInstructions = {
    pain: `Write 10 PAIN hooks. These hooks call out the customer's frustration, problem, or suffering directly. Make the customer feel seen and understood before offering any solution. Examples of structure: "Tired of...", "Still struggling with...", "The real reason why...", "Stop wasting money on..."`,

    desire: `Write 10 DESIRE hooks. These hooks speak directly to what the customer secretly wants — the dream outcome, the identity they want, the life they imagine. Do not mention the problem. Speak pure aspiration. Examples: "Imagine waking up to...", "What if your skin could...", "This is what confidence looks like...", "Finally, the version of you that..."`,

    curiosity: `Write 10 CURIOSITY hooks. These hooks open a loop, make a surprising claim, or hint at a secret the customer does not know yet. They must create an irresistible urge to keep reading. Examples: "Nobody is talking about this...", "The one thing that changed everything...", "I tested 47 products. Here is what actually worked...", "The reason your skin never changes..."`,

    luxury: `Write 10 LUXURY hooks. These hooks speak to exclusivity, premium status, and elevated lifestyle. They make the product feel like an upgrade, a privilege, or a symbol of taste. Examples: "Not for everyone — but maybe for you.", "The difference between looking good and looking expensive.", "For the woman who refuses to compromise.", "Some things in life are worth every penny."`,

    directOffer: `Write 10 DIRECT OFFER hooks. These hooks lead with the deal, the offer, or the specific value proposition. Clear, bold, direct. Examples: "Get glowing skin for under $40.", "Free shipping ends tonight.", "50,000 women already switched — here is why.", "Try it for 30 days or your money back."`,
  }

  const platformTips = {
    instagram: 'Hooks for Instagram captions or Stories — 1-2 sentences, punchy, visual',
    tiktok: 'Hooks for TikTok video openings — spoken aloud in the first 2 seconds, pattern-interrupt energy',
    facebook: 'Hooks for Facebook ad copy — slightly longer, builds trust, addresses skepticism',
    general: 'Universal hooks that work across platforms',
  }

  return `You are a world-class direct response copywriter and advertising expert.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
Platform: ${platform} — ${platformTips[platform] || platformTips.general}

TASK:
${hookInstructions[hookType] || hookInstructions.pain}

Make every hook completely specific to this product — never generic. Each hook should feel like it was written by a top copywriter who understands this exact customer.

OUTPUT FORMAT — return a valid JSON object:
{
  "hookType": "${hookType}",
  "hooks": [
    "hook 1",
    "hook 2",
    "hook 3",
    "hook 4",
    "hook 5",
    "hook 6",
    "hook 7",
    "hook 8",
    "hook 9",
    "hook 10"
  ]
}

Return ONLY the JSON object. No markdown. No explanation. No numbering inside the hook strings.`
}
