CREATE TABLE IF NOT EXISTS signal_logs (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id  uuid REFERENCES projects(id) ON DELETE SET NULL,
  event_type  text NOT NULL,
  weight      integer NOT NULL DEFAULT 1,
  metadata    jsonb DEFAULT '{}',
  created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signal_logs_user_created
  ON signal_logs(user_id, created_at DESC);

ALTER TABLE signal_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own signals"
  ON signal_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
