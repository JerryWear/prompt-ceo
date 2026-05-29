ALTER TABLE generation_logs
  ADD COLUMN IF NOT EXISTS campaign_phase text;

CREATE INDEX IF NOT EXISTS idx_generation_logs_campaign_phase
  ON generation_logs(user_id, campaign_phase);
