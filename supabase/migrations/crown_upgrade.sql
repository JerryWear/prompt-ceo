-- Crown Upgrade Migration
-- Perfect Day™ + Full Ad Campaign™ + AI Creative Conversation™

CREATE TABLE IF NOT EXISTS perfect_day_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  world text NOT NULL,
  style text,
  platform text,
  moments jsonb NOT NULL DEFAULT '[]',
  day_title text,
  series_hook text,
  posting_schedule jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS perfect_day_sessions_user_idx ON perfect_day_sessions(user_id, created_at DESC);

ALTER TABLE perfect_day_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own perfect day sessions"
  ON perfect_day_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow generation_logs.type to include new types (no schema change needed, type is text)
-- Allow campaign_memory to reference perfect day campaigns (no schema change needed)
