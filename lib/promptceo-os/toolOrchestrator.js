/**
 * PromptCEO OS — Tool Orchestrator Foundation
 *
 * First routing layer: maps a strategic opportunity's recommendedAction
 * to the correct PromptCEO tool and app view.
 *
 * Current state: PURE MAPPING ONLY — no execution, no navigation.
 *
 * Future steps will use this to:
 *  - Power "Go →" buttons on opportunity cards (one call: set('view', route.view))
 *  - Enable AI Director to suggest "open Campaign Builder" based on the top opportunity
 *  - Allow Tool Orchestrator to sequence multi-step automation across tools
 *
 * View keys are validated against app/prompt-engine-v3/page.js validViews:
 *   ['studio', 'ad_studio', 'perfect_day', 'full_campaign', 'timeline',
 *    'ai_director', 'full_day_video', 'campaign_journey', 'cross_platform',
 *    'life_engine', 'life_engine_generator']
 */

// ---------------------------------------------------------------------------
// Tool Registry
// ---------------------------------------------------------------------------

/**
 * Maps targetTool identifiers (from opportunityEngine.js recommendedAction)
 * to real app view names and metadata.
 *
 * available: false = tool exists but has no dedicated standalone view yet,
 * or the view is not stable enough for automated routing.
 */
export const TOOL_REGISTRY = {
  ai_director: {
    label:     'AI Director',
    view:      'ai_director',     // real view key ✓
    available: true,
  },

  campaign_builder: {
    label:     'Campaign Builder',
    view:      'full_campaign',   // real view key ✓
    available: true,
  },

  ad_studio: {
    label:     'Ad Studio',
    view:      'ad_studio',       // real view key ✓
    available: true,
  },

  prompt_studio: {
    label:     'Prompt Studio',
    view:      'studio',          // real view key ✓
    available: true,
  },

  video_studio: {
    label:     'Video Studio',
    view:      'full_day_video',  // closest real key — 'video' does not exist in validViews
    available: false,             // not routable as a standalone video studio yet
  },

  music_studio: {
    label:     'Music Studio',
    view:      null,              // no dedicated music view exists in validViews
    available: false,             // music is embedded in Ad Studio, not a standalone view
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Resolves an opportunity's recommendedAction to a full tool route descriptor.
 *
 * @param {{ recommendedAction?: { targetTool?: string, intent?: string } }} opportunity
 * @returns {{ targetTool, label, view, available, intent } | null}
 */
export function resolveToolRoute(opportunity) {
  const action = opportunity?.recommendedAction;
  if (!action?.targetTool) return null;

  const entry = TOOL_REGISTRY[action.targetTool];
  if (!entry) return null;

  return {
    targetTool: action.targetTool,
    label:      entry.label,
    view:       entry.view,
    available:  entry.available,
    intent:     action.intent || null,
  };
}

/**
 * Returns the human-readable label for a tool identifier.
 *
 * @param {string} targetTool
 * @returns {string}
 */
export function getToolLabel(targetTool) {
  return TOOL_REGISTRY[targetTool]?.label || 'PromptCEO Tool';
}

/**
 * Returns true only when the tool has a real, routable view available.
 *
 * @param {string} targetTool
 * @returns {boolean}
 */
export function isToolAvailable(targetTool) {
  const entry = TOOL_REGISTRY[targetTool];
  return Boolean(entry && entry.available && entry.view);
}
