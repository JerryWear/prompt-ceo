-- ─────────────────────────────────────────────────────────────
-- Project System
-- Named projects that contain all user assets across Studio
-- and Ad Studio. Foundation for cross-session persistence.
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name          text        NOT NULL,
  type          text        NOT NULL DEFAULT 'creator', -- creator | brand | campaign
  thumbnail_url text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own projects"
  ON projects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_projects_updated_at();

-- Link ad_projects to a project
ALTER TABLE ad_projects
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id) ON DELETE SET NULL;

-- Link generation_logs to a project
ALTER TABLE generation_logs
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id) ON DELETE SET NULL;

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_projects_user_id          ON projects(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ad_projects_project_id    ON ad_projects(project_id);
CREATE INDEX IF NOT EXISTS idx_generation_logs_project_id ON generation_logs(project_id);
