-- ─────────────────────────────────────────────────────────────────────────────
-- Edit Studio v2.0 — Ad-first editing pipeline
-- Adds v2 columns to edit_projects; introduces edit_ads child table
-- ─────────────────────────────────────────────────────────────────────────────

-- ── edit_projects v2 columns ──────────────────────────────────────────────────
-- is_v2           — distinguishes v2 projects from legacy v1 rows
-- understanding_data — AI-generated content understanding (hooks, key moments, brand voice)
-- creative_strategy  — chosen ad strategy (type, duration, angle, script approach)

ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS is_v2              boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS understanding_data jsonb,
  ADD COLUMN IF NOT EXISTS creative_strategy  jsonb;

-- ── edit_ads ──────────────────────────────────────────────────────────────────
-- One row per ad variant generated from a v2 project.
-- Stores the full ad build state from hook selection through final render.

CREATE TABLE IF NOT EXISTS edit_ads (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id              uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  user_id                 uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ad_type                 text        NOT NULL,             -- ugc | demo | testimonial | launch | edu
  hook_type               text,                            -- question | bold_claim | story | pain_point
  hook_text               text,                            -- selected hook text
  hooks                   jsonb       NOT NULL DEFAULT '[]',   -- all AI-generated hook options
  script_15s              jsonb       NOT NULL DEFAULT '{}',   -- { scenes: [], voiceover: '' }
  script_30s              jsonb       NOT NULL DEFAULT '{}',
  script_60s              jsonb       NOT NULL DEFAULT '{}',
  selected_duration       text        NOT NULL DEFAULT '30s' CHECK (selected_duration IN ('15s', '30s', '60s')),  -- 15s | 30s | 60s
  voiceover_storage_path  text,                            -- Supabase Storage path for generated audio
  voiceover_voice         text,                            -- ElevenLabs voice id / name
  caption_timeline        jsonb       NOT NULL DEFAULT '[]',   -- [{ start, end, text, style }]
  selected_music_bed      jsonb       NOT NULL DEFAULT '{}',   -- { track_id, name, url, volume }
  quality_scores          jsonb       NOT NULL DEFAULT '{}',   -- { hook: n, script: n, overall: n }
  render_job_id           uuid        REFERENCES edit_render_jobs(id) ON DELETE SET NULL,  -- links to edit_render_jobs.id when render queued
  render_export_url       text,                            -- final MP4 download URL
  status                  text        NOT NULL DEFAULT 'draft',
                                                           -- draft | scripted | rendered | exported
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own edit ads"
  ON edit_ads FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_edit_ads_ts()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE OR REPLACE TRIGGER edit_ads_updated_at
  BEFORE UPDATE ON edit_ads
  FOR EACH ROW EXECUTE FUNCTION update_edit_ads_ts();

CREATE INDEX IF NOT EXISTS idx_edit_ads_project ON edit_ads(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_edit_ads_user ON edit_ads(user_id, created_at DESC);
