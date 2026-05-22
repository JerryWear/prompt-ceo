// ─────────────────────────────────────────────────────────────
// Brand DNA Lock — Injection layer
// When a brand DNA is locked, its constraints are appended to
// every generated prompt to ensure visual and tonal consistency.
// ─────────────────────────────────────────────────────────────

/**
 * buildBrandDNAConstraints
 * Takes a locked brand DNA object and returns a constraint string
 * that gets appended to every prompt.
 */
export function buildBrandDNAConstraints(dna) {
  if (!dna?.is_locked) return ''

  const parts = []

  if (dna.visual_mood_signature?.trim()) {
    parts.push(`Visual mood must be: ${dna.visual_mood_signature.trim()}`)
  }

  if (dna.color_palette?.trim()) {
    parts.push(`Color palette: ${dna.color_palette.trim()}`)
  }

  if (dna.lighting_signature?.trim()) {
    parts.push(`Lighting: ${dna.lighting_signature.trim()}`)
  }

  if (dna.styling_signature?.trim()) {
    parts.push(`Styling must match: ${dna.styling_signature.trim()}`)
  }

  if (dna.forbidden_visual_elements?.trim()) {
    parts.push(`Forbidden visual elements — never include: ${dna.forbidden_visual_elements.trim()}`)
  }

  if (dna.forbidden_words?.trim()) {
    parts.push(`Forbidden copy/tone: ${dna.forbidden_words.trim()}`)
  }

  if (dna.tone_words?.trim()) {
    parts.push(`Brand tone: ${dna.tone_words.trim()}`)
  }

  if (parts.length === 0) return ''

  return `\n\n[BRAND DNA LOCK — ${dna.name}]\n${parts.join('\n')}\n[END BRAND DNA LOCK]`
}

/**
 * buildBrandDNAAdContext
 * Returns a context object that pre-fills Ad Studio fields
 * when a brand DNA is loaded.
 */
export function buildBrandDNAAdContext(dna) {
  if (!dna) return {}
  return {
    productName:    dna.product_name        || '',
    productDesc:    dna.product_description || '',
    targetCustomer: dna.target_customer     || '',
    brandVoice:     dna.brand_voice         || 'premium',
    pricePoint:     dna.price_point         || 'mid-ticket',
    callToAction:   dna.cta_style           || '',
  }
}

/**
 * validatePromptAgainstDNA
 * Quick scan: returns an array of warnings if the prompt
 * contains forbidden visual elements or tone violations.
 */
export function validatePromptAgainstDNA(prompt, dna) {
  if (!dna?.is_locked || !prompt) return []

  const warnings = []
  const lower = prompt.toLowerCase()

  // Check forbidden visual elements
  if (dna.forbidden_visual_elements?.trim()) {
    const forbidden = dna.forbidden_visual_elements.split(',').map(f => f.trim().toLowerCase()).filter(Boolean)
    for (const item of forbidden) {
      if (item && lower.includes(item)) {
        warnings.push(`Forbidden element detected: "${item}"`)
      }
    }
  }

  // Check forbidden words/tone
  if (dna.forbidden_words?.trim()) {
    const forbiddenWords = dna.forbidden_words.split(',').map(f => f.trim().toLowerCase()).filter(Boolean)
    for (const word of forbiddenWords) {
      if (word && lower.includes(word)) {
        warnings.push(`Forbidden tone/word detected: "${word}"`)
      }
    }
  }

  return warnings
}
