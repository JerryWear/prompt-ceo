// ─────────────────────────────────────────────────────────────
// Product Description Pack Generator
// Generates Amazon and/or Shopify product copy — title, bullets,
// description, meta — in the same brand voice as all your ads.
// ─────────────────────────────────────────────────────────────

export const PRODUCT_PLATFORMS = {
  amazon:  { label: 'Amazon',          rules: 'keyword-first title, 5 benefit bullets under 200 chars each, search-optimised' },
  shopify: { label: 'Shopify / DTC',   rules: 'brand voice first, conversion-focused, lifestyle-forward, SEO-aware' },
  both:    { label: 'Amazon + Shopify', rules: 'generate both formats' },
}

export const PRODUCT_CATEGORIES = [
  'Beauty & Skincare', 'Health & Supplements', 'Fitness & Sports', 'Fashion & Apparel',
  'Home & Kitchen', 'Electronics & Tech', 'Pet Products', 'Baby & Kids', 'Food & Beverage',
  'Books & Education', 'Tools & Hardware', 'Toys & Games', 'Automotive', 'Garden & Outdoors',
]

export function buildProductDescriptionPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    keyFeatures        = '',
    mainProblem        = '',
    proofPoint         = '',
    brandVoice         = 'premium',
    productPlatform    = 'both',
    productCategory    = '',
    pricePoint         = 'mid-ticket',
    keywords           = '',
  } = adConfig

  const plat = PRODUCT_PLATFORMS[productPlatform] || PRODUCT_PLATFORMS.both

  return `You are a world-class product copywriter who specialises in e-commerce listings that rank AND convert. You write Amazon listings that rank on page 1 and Shopify descriptions that turn browsers into buyers.

Generate a complete product description pack for this product.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Category: ${productCategory || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem Solved: ${mainProblem || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Key Features: ${keyFeatures || 'Not specified'}
Proof/Results: ${proofPoint || 'Not specified'}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
${keywords ? `Target Keywords: ${keywords}` : ''}

PLATFORM: ${plat.label}
Rules: ${plat.rules}

Return ONLY valid JSON:
{
  ${productPlatform !== 'shopify' ? `"amazon": {
    "title": "Amazon-optimised product title — keyword-first, under 200 characters, follows Amazon title formula: [Brand] [Product Name] [Key Feature] [Benefit] [Size/Count/Variant if relevant]",
    "bullets": [
      "BENEFIT HEADLINE: supporting detail — first 3-5 words in caps as the bullet headline, then expand. Under 200 characters. Focus on benefit, not just feature. Bullet 1 = most important benefit.",
      "SECOND BENEFIT: supporting detail — different benefit from bullet 1.",
      "THIRD BENEFIT: supporting detail.",
      "FOURTH BENEFIT: supporting detail.",
      "FIFTH BENEFIT: supporting detail — often used for guarantee, compatibility, or brand trust."
    ],
    "productDescription": "Amazon product description — 200-300 words. Can use HTML paragraph breaks. Tells the full story: who it's for, what problem it solves, key benefits, social proof, and a soft CTA. Not just a features list.",
    "backendKeywords": "50-100 words of backend search terms — space-separated, no repetition of title keywords, no punctuation. Related terms, synonyms, long-tail phrases.",
    "searchTerms": ["10-15 specific search terms customers use to find this product"],
    "seoSummary": "one sentence on the primary keyword strategy for this listing"
  },` : ''}
  ${productPlatform !== 'amazon' ? `"shopify": {
    "productTitle": "Shopify product title — brand-voice first, benefit-forward, memorable. Under 60 characters.",
    "tagline": "one-line product tagline — the promise in 10 words or less",
    "shortDescription": "Short description / product card copy — 1-2 sentences. Appears in collection pages and previews. Hook-first, benefit-forward.",
    "fullDescription": "Full Shopify product page description — 300-400 words. Structured as: opening hook (1 sentence), problem you solve (1-2 sentences), product introduction (2-3 sentences), key benefits as embedded prose (not bullet list), social proof reference, guarantee/risk reversal, CTA. Written in ${brandVoice} brand voice. Engaging, not corporate.",
    "bulletPoints": [
      "Short benefit bullet 1 — for the quick-scan section of the page",
      "Benefit bullet 2",
      "Benefit bullet 3",
      "Benefit bullet 4",
      "Benefit bullet 5"
    ],
    "metaTitle": "Shopify/SEO meta title — under 60 characters, keyword-first, click-worthy",
    "metaDescription": "Meta description — 140-155 characters, includes primary keyword, has a CTA or value statement, drives clicks from search results",
    "altText": "Product image alt text — descriptive, keyword-rich, under 125 characters",
    "tags": ["10-15 relevant Shopify product tags for internal search and collections"]
  }` : ''}
}

Make every word specific to this product. Amazon bullets must be scannable. Shopify copy must read like a brand, not a warehouse.

Return ONLY the JSON. No markdown. No explanation.`
}
