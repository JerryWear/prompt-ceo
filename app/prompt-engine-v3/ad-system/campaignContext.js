// ─────────────────────────────────────────────────────────────
// Campaign Context Builder
// Normalises all Ad Studio inputs into one structured object.
// Every generator receives this so they all share one brain.
// ─────────────────────────────────────────────────────────────

export function buildCampaignContext(input = {}) {
  return {
    product: {
      name:        input.productName        || '',
      description: input.productDescription || '',
      pricePoint:  input.pricePoint         || '',
    },
    audience: {
      targetCustomer: input.targetCustomer || '',
      mainProblem:    input.mainProblem    || '',
      mainDesire:     input.mainDesire     || '',
      mainBenefit:    input.mainBenefit    || '',
      proofPoint:     input.proofPoint     || '',
    },
    strategy: {
      offer:        input.offer                              || '',
      callToAction: input.callToAction                      || '',
      campaignGoal: input.platformGoal || input.campaignGoal || '',
      platform:     input.platform     || input.adPlatform  || '',
      format:       input.format                            || '',
    },
    brand: {
      brandVoice:    input.brandVoice                        || '',
      inspiredStyle: input.inspiredStyle                     || '',
      visualStyle:   input.adStyle || input.visualStyle      || '',
      targetMood:    input.targetMood                        || '',
    },
    selections: {
      selectedAngle:       input.selectedAngle       || null,
      selectedHook:        input.selectedHook        || null,
      selectedCaption:     input.selectedCaption     || null,
      selectedImagePrompt: input.selectedImagePrompt || null,
      selectedVideoPrompt: input.selectedVideoPrompt || null,
      selectedMusic:       input.selectedMusic       || null,
    },
  }
}

// One-line summary for debugging / AI context injection
export function summariseCampaignContext(ctx) {
  const parts = []
  if (ctx.product?.name)          parts.push(ctx.product.name)
  if (ctx.strategy?.platform)     parts.push(ctx.strategy.platform)
  if (ctx.strategy?.campaignGoal) parts.push(ctx.strategy.campaignGoal)
  if (ctx.brand?.targetMood)      parts.push(ctx.brand.targetMood)
  return parts.join(' · ')
}
