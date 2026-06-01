/**
 * PromptCEO OS Core — Type Definitions
 *
 * Centralised shape definitions for the OS context and signal system.
 * Future consumers: AI Director, Project Brain, Ad Studio, Prompt Studio,
 * Video Studio, Music Studio, Product Reviewer, and Tool Orchestrator.
 */

// ---------------------------------------------------------------------------
// OS Context shape
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} OSContext
 * @property {Object|null}  user            - Authenticated user record
 * @property {Object|null}  activeProject   - Currently selected project
 * @property {Object|null}  activeBrand     - Brand DNA / identity in use
 * @property {Object|null}  activeProduct   - Product under focus
 * @property {Object|null}  activeCampaign  - Campaign being built/run
 * @property {Object|null}  activeWorld     - Scene world (e.g. urban_apartment)
 * @property {Object|null}  activeIdentity  - Persona / talent identity
 * @property {Object|null}  activeGoal      - Current strategic objective
 * @property {OSAction[]}   recentActions   - Ordered history of user actions
 * @property {OSSignal[]}   systemSignals   - Internal OS routing signals
 * @property {string[]}     recommendations - AI-generated next-step suggestions
 * @property {string|null}  updatedAt       - ISO timestamp of last mutation
 */

// ---------------------------------------------------------------------------
// Signal shape
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} OSSignal
 * @property {string} type      - Signal type constant (see SIGNAL_TYPES)
 * @property {string} source    - Which tool emitted this (e.g. 'ad-studio')
 * @property {Object} payload   - Arbitrary data relevant to the signal
 * @property {string} createdAt - ISO timestamp
 */

// ---------------------------------------------------------------------------
// Action shape (lightweight breadcrumb stored in recentActions)
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} OSAction
 * @property {string} type      - What the user did
 * @property {string} source    - Which tool triggered it
 * @property {Object} payload   - Context at time of action
 * @property {string} createdAt - ISO timestamp
 */

// ---------------------------------------------------------------------------
// Signal type constants
// ---------------------------------------------------------------------------

export const SIGNAL_TYPES = {
  USER_CREATED_CAMPAIGN:    'USER_CREATED_CAMPAIGN',
  USER_SELECTED_WORLD:      'USER_SELECTED_WORLD',
  USER_GENERATED_IMAGE:     'USER_GENERATED_IMAGE',
  USER_CREATED_AD:          'USER_CREATED_AD',
  USER_SELECTED_MUSIC:      'USER_SELECTED_MUSIC',
  USER_SAVED_PROJECT:       'USER_SAVED_PROJECT',
  USER_REVIEWED_PRODUCT:    'USER_REVIEWED_PRODUCT',
  USER_BUILT_VIDEO:         'USER_BUILT_VIDEO',
  USER_OPENED_AI_DIRECTOR:  'USER_OPENED_AI_DIRECTOR',
  USER_OPENED_AD_STUDIO:    'USER_OPENED_AD_STUDIO',
  USER_OPENED_PROMPT_STUDIO:'USER_OPENED_PROMPT_STUDIO',
};

// ---------------------------------------------------------------------------
// Source constants (which tool emits a signal)
// ---------------------------------------------------------------------------

export const SIGNAL_SOURCES = {
  AD_STUDIO:      'ad-studio',
  PROMPT_STUDIO:  'prompt-studio',
  VIDEO_STUDIO:   'video-studio',
  MUSIC_STUDIO:   'music-studio',
  AI_DIRECTOR:    'ai-director',
  PROJECT_BRAIN:  'project-brain',
  CAMPAIGN_BUILDER:  'campaign-builder',
  PRODUCT_REVIEWER:  'product-reviewer',
  PROJECT_SYSTEM:    'project-system',
  OS_CORE:           'os-core',
};
