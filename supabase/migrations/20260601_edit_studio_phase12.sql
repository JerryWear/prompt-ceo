-- Edit Studio Phase 12: Caption + Music render details tracking
ALTER TABLE edit_render_jobs
  ADD COLUMN IF NOT EXISTS render_details jsonb NOT NULL DEFAULT '{}';
