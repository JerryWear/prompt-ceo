-- Upgrade 5: Performance Memory
-- Extend performance_logs with project + asset tracking

ALTER TABLE performance_logs
  ADD COLUMN IF NOT EXISTS project_id  uuid REFERENCES projects(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS asset_type  text, -- hook | caption | angle | image | video
  ADD COLUMN IF NOT EXISTS asset_id    text, -- free-form reference ID
  ADD COLUMN IF NOT EXISTS world_id    text, -- story world used
  ADD COLUMN IF NOT EXISTS liked       boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_perf_logs_project ON performance_logs(project_id);
CREATE INDEX IF NOT EXISTS idx_perf_logs_asset   ON performance_logs(asset_type, asset_id);
