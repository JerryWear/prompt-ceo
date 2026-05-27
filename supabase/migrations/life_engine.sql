-- PromptCEO Life Engine™ — Database Migration
-- Tables: full_day_projects, scene_memory

-- ── full_day_projects ──────────────────────────────────────────────────────
-- Stores complete generated full-day outputs (Perfect Day, Travel World,
-- Creator Day, Fitness Day, Ad Campaign Day)

CREATE TABLE IF NOT EXISTS full_day_projects (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_profile_id    uuid REFERENCES brand_profiles(id) ON DELETE SET NULL,

  -- Classification
  world_id            text NOT NULL DEFAULT 'luxury_penthouse',
  day_type            text NOT NULL DEFAULT 'perfect_day',
  title               text NOT NULL DEFAULT 'Untitled Day',
  style               text DEFAULT 'cinematic',
  platform            text DEFAULT 'instagram',

  -- Identity snapshot at generation time
  creator_name        text,
  creator_traits      jsonb DEFAULT '{}',

  -- Generated content
  scenes              jsonb DEFAULT '[]',   -- array of 14 scene objects
  day_meta            jsonb DEFAULT '{}',   -- title, seriesHook, narration, hashtags
  posting_plan        jsonb DEFAULT '{}',   -- posting schedule
  video_plan          jsonb DEFAULT '{}',   -- video direction notes

  -- Generated images (keyed by scene index)
  generated_images    jsonb DEFAULT '{}',

  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE full_day_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own full_day_projects"
  ON full_day_projects
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS full_day_projects_user_id_idx ON full_day_projects(user_id);
CREATE INDEX IF NOT EXISTS full_day_projects_created_idx ON full_day_projects(created_at DESC);

-- ── scene_memory ───────────────────────────────────────────────────────────
-- Stores scene continuity notes for cross-session consistency

CREATE TABLE IF NOT EXISTS scene_memory (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_day_project_id     uuid REFERENCES full_day_projects(id) ON DELETE CASCADE,

  scene_id                text NOT NULL,
  time_block              text,
  wardrobe                text,
  location                text,
  emotional_state         text,
  visual_notes            text,

  created_at              timestamptz DEFAULT now()
);

ALTER TABLE scene_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own scene_memory"
  ON scene_memory
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Updated_at trigger for full_day_projects
CREATE OR REPLACE FUNCTION update_full_day_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER full_day_projects_updated_at
  BEFORE UPDATE ON full_day_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_full_day_projects_updated_at();
