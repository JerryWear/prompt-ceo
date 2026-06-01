/**
 * PromptCEO Opportunity Engine v1
 *
 * Moves PromptCEO from Memory → Observation
 * to Memory → Analysis → Opportunity → Recommendation.
 *
 * Pure function. No API calls. No side effects.
 * Input:  osMemorySummary, localOSContext, recentOSMemory
 * Output: sorted, deduplicated opportunity objects (max 5)
 *
 * Future connections:
 *  - AI Director reads top opportunity to personalise its opening.
 *  - Tool Orchestrator uses opportunity type to sequence next automation.
 *  - v2 will weight opportunities by project age and fatigue data.
 */

// ---------------------------------------------------------------------------
// Priority sort order
// ---------------------------------------------------------------------------
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Analyses OS memory and context to identify actionable strategic opportunities.
 *
 * Each opportunity includes a recommendedAction that maps to a specific tool
 * and intent. The action is metadata only — no tool is triggered automatically.
 * Tool Orchestrator will consume targetTool + intent in a future step.
 *
 * @param {Object}      opts
 * @param {Object|null} opts.osMemorySummary  - Output of buildCompactMemorySummary()
 * @param {Object|null} opts.localOSContext   - Hydrated OS context object
 * @param {Array}       opts.recentOSMemory   - Raw os_memory_events rows (up to 20)
 * @returns {Array<{id, type, priority, title, description, recommendedAction}>} Up to 5 opportunities
 */
export function buildOpportunities({ osMemorySummary, localOSContext, recentOSMemory }) {
  const mem  = osMemorySummary || {};
  const ctx  = localOSContext  || {};
  const evts = Array.isArray(recentOSMemory) ? recentOSMemory : [];

  const seen = new Set();
  const raw  = [];

  function add(opportunity) {
    if (!seen.has(opportunity.id)) {
      seen.add(opportunity.id);
      raw.push(opportunity);
    }
  }

  // ── RULE 1 — Ads Without Campaigns ───────────────────────────────────────
  // User has been generating ads but hasn't structured them into a campaign.
  if ((mem.adsCreated || 0) >= 3 && (mem.campaignsCreated || 0) < 1) {
    add({
      id:          'campaign_opportunity',
      type:        'campaign',
      priority:    'high',
      title:       'Campaign Expansion Opportunity',
      description: 'Several ads have been created without a broader campaign structure. Consider organizing them into a complete campaign.',
      recommendedAction: {
        label:      'Build a structured campaign',
        targetTool: 'campaign_builder',
        intent:     'turn_ads_into_campaign',
      },
    });
  }

  // ── RULE 2 — Campaigns Without Video ─────────────────────────────────────
  // User has campaigns but has never generated video support content.
  const hasVideo = evts.some(e => e.event_type === 'USER_BUILT_VIDEO');
  if ((mem.campaignsCreated || 0) >= 2 && !hasVideo) {
    add({
      id:          'video_opportunity',
      type:        'video',
      priority:    'high',
      title:       'Video Content Opportunity',
      description: 'Campaigns exist, but supporting video assets are missing. Short-form content could strengthen campaign performance.',
      recommendedAction: {
        label:      'Create supporting video content',
        targetTool: 'video_studio',
        intent:     'create_campaign_video_assets',
      },
    });
  }

  // ── RULE 3 — Product Without Campaign ────────────────────────────────────
  // A product is known to the OS but no campaign has been linked yet.
  if (ctx.activeProduct && !ctx.activeCampaign) {
    add({
      id:          'launch_opportunity',
      type:        'launch',
      priority:    'medium',
      title:       'Launch Opportunity',
      description: 'A product is available, but no active campaign is connected to it.',
      recommendedAction: {
        label:      'Build campaign for this product',
        targetTool: 'campaign_builder',
        intent:     'build_product_campaign',
      },
    });
  }

  // ── RULE 4 — Multiple Saved Projects ─────────────────────────────────────
  // High project-save activity signals scattered effort.
  if ((mem.projectsSaved || 0) >= 3) {
    add({
      id:          'consolidation_opportunity',
      type:        'consolidation',
      priority:    'medium',
      title:       'Project Consolidation Opportunity',
      description: 'Multiple projects are active. Consider consolidating the strongest ideas into a larger campaign.',
      recommendedAction: {
        label:      'Consolidate project ideas',
        targetTool: 'ai_director',
        intent:     'consolidate_projects',
      },
    });
  }

  // ── RULE 5 — Missing Goal ─────────────────────────────────────────────────
  // No strategic goal defined; recommendations will be generic without one.
  if (!ctx.activeGoal) {
    add({
      id:          'strategy_opportunity',
      type:        'strategy',
      priority:    'medium',
      title:       'Strategy Opportunity',
      description: 'No clear goal is currently defined. Setting a goal will improve PromptCEO recommendations.',
      recommendedAction: {
        label:      'Define campaign goal',
        targetTool: 'ai_director',
        intent:     'define_goal',
      },
    });
  }

  // Sort: high → medium → low, preserve insertion order within same priority
  raw.sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 2) - (PRIORITY_ORDER[b.priority] ?? 2));

  return raw.slice(0, 5);
}
