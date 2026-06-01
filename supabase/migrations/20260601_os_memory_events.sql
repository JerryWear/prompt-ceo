-- ── PromptCEO OS Core — Memory Events ────────────────────────────────────────
-- Persists high-value OS signals for AI Director recommendations and analytics.
--
-- Populated by lib/promptceo-os/memoryWriter.js once the real DB write is wired
-- in Step 10. Only signals that pass shouldWriteToMemory() are stored here:
--   USER_CREATED_AD, USER_CREATED_CAMPAIGN, USER_SAVED_PROJECT,
--   USER_REVIEWED_PRODUCT, USER_BUILT_VIDEO, USER_SELECTED_MUSIC
--
-- Design decisions:
--   - project_id is TEXT (not FK to projects) so events outlive project deletion
--     and can be attached to ephemeral or auto-created project IDs safely.
--   - user_id is nullable (ON DELETE SET NULL) so events survive user deactivation
--     and can be written by service-role processes without auth context.
--   - event_payload stores the full signal payload for future AI Director reads.
--   - memory_summary is reserved for a future AI-generated plain-language
--     summary of the event (e.g. "Built a luxury cinematic ad for PromptCEO").
--
-- REVIEW BEFORE RUNNING:
--   1. Run in Supabase SQL Editor or via Supabase CLI
--   2. Confirm auth.users exists (standard Supabase project — it always does)
--   3. RLS policy uses auth.uid() — confirm Supabase auth is configured
-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS os_memory_events (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  project_id      text        NULL,
  project_name    text        NULL,
  event_type      text        NOT NULL,
  event_source    text        NULL,
  event_payload   jsonb       NOT NULL DEFAULT '{}'::jsonb,
  memory_summary  text        NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- User-scoped queries: all OS events for a user (AI Director personalisation)
CREATE INDEX IF NOT EXISTS idx_os_memory_events_user_id
  ON os_memory_events(user_id);

-- Project-scoped queries: history for a specific project
CREATE INDEX IF NOT EXISTS idx_os_memory_events_project_id
  ON os_memory_events(project_id);

-- Type-scoped queries: "how many ads has this user created?"
CREATE INDEX IF NOT EXISTS idx_os_memory_events_event_type
  ON os_memory_events(event_type);

-- Chronological queries: latest events first (default AI Director view)
CREATE INDEX IF NOT EXISTS idx_os_memory_events_created_at
  ON os_memory_events(created_at DESC);

-- Row Level Security — matches existing project convention (FOR ALL, combined policy)
ALTER TABLE os_memory_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own OS memory events"
  ON os_memory_events FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
