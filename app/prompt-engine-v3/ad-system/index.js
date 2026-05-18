// ─────────────────────────────────────────────────────────────
// Ad System — Main Export
// Central export for all ad generation modules.
// The API route imports directly from individual files
// to keep the edge bundle lean. This index is for UI use.
// ─────────────────────────────────────────────────────────────

export { AD_PSYCHOLOGY_ANGLES, BRAND_VOICE_OPTIONS, PRICE_POINT_OPTIONS, PLATFORM_GOAL_OPTIONS, INSPIRED_STYLES } from './adPsychology.js'
export { PLATFORM_RULES, buildPlatformInstruction } from './platformRules.js'
export { SCORE_DIMENSIONS, buildQualityScorePrompt, getScoreColor, getGradeColor } from './adQualityScore.js'
export { INSPIRED_STYLE_PROFILES, buildStyleInstruction, buildStyledGenerationPrompt } from './competitorStyleEngine.js'
export { VARIATION_TYPES, buildVariationPrompt } from './adVariations.js'
export { BRAND_DNA_FIELDS, dnaLoad, dnaSave, dnaAddProfile, dnaDeleteProfile, dnaGetProfile } from './brandDNA.js'
export { buildAnglesPrompt }        from './adAngles.js'
export { HOOK_TYPES, buildHooksPrompt }    from './adHooks.js'
export { CAPTION_TYPES, buildCaptionsPrompt } from './adCaptions.js'
export { IMAGE_AD_FORMATS, buildImageAdPromptPrompt } from './imageAdPrompt.js'
export { VIDEO_AD_FORMATS, buildVideoAdPromptPrompt } from './videoAdPrompt.js'
export { UGC_CREATOR_STYLES, UGC_DURATIONS, buildUGCScriptsPrompt } from './ugcScripts.js'
export { CAMPAIGN_STAGES, buildCampaignPrompt } from './campaignBuilder.js'

// Generation type registry — used by UI to know costs + labels
export const AD_GENERATION_TYPES = {
  angles:       { label: 'Ad Angles',        cost: 2,  icon: '🎯', tab: 'angles'       },
  hooks:        { label: 'Hook Pack',         cost: 1,  icon: '🪝', tab: 'hooks'        },
  captions:     { label: 'Caption Pack',      cost: 2,  icon: '✍️', tab: 'captions'     },
  image_prompt: { label: 'Image Prompts',     cost: 2,  icon: '🖼', tab: 'image_prompt' },
  video_prompt: { label: 'Video Prompts',     cost: 3,  icon: '🎬', tab: 'video_prompt' },
  ugc_scripts:  { label: 'UGC Scripts',       cost: 2,  icon: '🎤', tab: 'ugc_scripts'  },
  campaign:      { label: 'Full Campaign',     cost: 5,  icon: '📊', tab: 'campaign'      },
  quality_score: { label: 'Quality Score',    cost: 1,  icon: '🏆', tab: 'score'         },
}
