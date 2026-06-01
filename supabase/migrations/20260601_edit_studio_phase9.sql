-- Edit Studio Phase 9: Render Plan + Job tracking

-- Inline columns on edit_projects (latest render plan + job list)
ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS render_plan jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS render_jobs jsonb NOT NULL DEFAULT '[]';

-- Dedicated render jobs table for auditability and future queue management
CREATE TABLE IF NOT EXISTS edit_render_jobs (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  user_id       uuid        NOT NULL REFERENCES auth.users(id)   ON DELETE CASCADE,
  status        text        NOT NULL DEFAULT 'queued', -- queued | processing | completed | failed
  render_plan   jsonb       NOT NULL DEFAULT '{}',
  export_url    text,
  error_message text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_render_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own render jobs"
  ON edit_render_jobs FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_edit_render_jobs_ts()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER edit_render_jobs_updated_at
  BEFORE UPDATE ON edit_render_jobs
  FOR EACH ROW EXECUTE FUNCTION update_edit_render_jobs_ts();

CREATE INDEX IF NOT EXISTS idx_edit_render_jobs_project
  ON edit_render_jobs(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_edit_render_jobs_user
  ON edit_render_jobs(user_id, status);
