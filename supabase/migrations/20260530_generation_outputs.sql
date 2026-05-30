-- ── generation_outputs ────────────────────────────────────────────────────────
-- Dedicated output storage for database hydration.
--
-- Separates output storage (reconstruction, hydration, export) from
-- generation_logs (analytics, history, brain metrics, signals).
--
-- Each row stores the FULL output payload from a generator, versioned
-- so future PromptCEO versions can hydrate correctly from older outputs.
--
-- Payload format (stored inside output_payload jsonb):
--   {
--     "version":       1,
--     "generatorType": "perfect_day",
--     "generatedAt":   "2026-05-30T14:22:00.000Z",
--     "data":          { ...exact generator JSON result... }
--   }
--
-- REVIEW BEFORE RUNNING:
--   1. Run in Supabase dashboard SQL editor
--   2. Confirm generation_logs table exists with id column (uuid)
--   3. Confirm projects table exists
--   4. RLS policy uses auth.uid() — confirm Supabase auth is configured
-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS generation_outputs (
  id                 uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_log_id  uuid        REFERENCES generation_logs(id) ON DELETE CASCADE,
  project_id         uuid        REFERENCES projects(id) ON DELETE SET NULL,
  user_id            uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  generator_type     text        NOT NULL,
  output_payload     jsonb       NOT NULL,
  created_at         timestamptz DEFAULT now() NOT NULL
);

-- Primary hydration query: latest output per generator_type per project
-- Used by /api/project-hydration/[id] to reconstruct UI state
CREATE INDEX IF NOT EXISTS idx_generation_outputs_project_type_date
  ON generation_outputs(project_id, generator_type, created_at DESC);

-- FK lookup: find outputs for a specific log entry
CREATE INDEX IF NOT EXISTS idx_generation_outputs_log_id
  ON generation_outputs(generation_log_id);

-- User queries: all outputs for a user (history, exports)
CREATE INDEX IF NOT EXISTS idx_generation_outputs_user_date
  ON generation_outputs(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE generation_outputs ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own outputs
CREATE POLICY "Users manage own outputs"
  ON generation_outputs FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
