-- Edit Studio Phase 11: Production Render Worker
-- Adds job lifecycle columns and an atomic claim function for safe multi-worker operation.

ALTER TABLE edit_render_jobs
  ADD COLUMN IF NOT EXISTS worker_id            text,
  ADD COLUMN IF NOT EXISTS processing_started_at timestamptz,
  ADD COLUMN IF NOT EXISTS completed_at          timestamptz,
  ADD COLUMN IF NOT EXISTS failed_at             timestamptz;

-- Index: workers need to find queued jobs fast
CREATE INDEX IF NOT EXISTS idx_edit_render_jobs_status_queued
  ON edit_render_jobs(status, created_at ASC)
  WHERE status = 'queued';

-- Index: stale-job reclaim query
CREATE INDEX IF NOT EXISTS idx_edit_render_jobs_processing_started
  ON edit_render_jobs(processing_started_at)
  WHERE status = 'processing';

-- ─── Atomic job claim function ────────────────────────────────────────────────
-- Uses FOR UPDATE SKIP LOCKED so two workers never claim the same job.
-- SECURITY DEFINER runs as the table owner, bypassing RLS for the worker's service key.

CREATE OR REPLACE FUNCTION claim_render_job(p_worker_id text)
RETURNS edit_render_jobs
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_job edit_render_jobs;
BEGIN
  -- Lock a single queued job, skip any already locked by another worker
  SELECT *
    INTO v_job
    FROM edit_render_jobs
   WHERE status = 'queued'
   ORDER BY created_at ASC
   LIMIT 1
   FOR UPDATE SKIP LOCKED;

  -- No job available
  IF v_job.id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Atomically transition to processing
  UPDATE edit_render_jobs
     SET status                = 'processing',
         worker_id             = p_worker_id,
         processing_started_at = now()
   WHERE id = v_job.id;

  v_job.status                = 'processing';
  v_job.worker_id             = p_worker_id;
  v_job.processing_started_at = now();

  RETURN v_job;
END;
$$;

-- Grant execute to authenticated role (worker uses service_role key which bypasses this,
-- but having the grant makes explicit which principals can call it).
GRANT EXECUTE ON FUNCTION claim_render_job(text) TO service_role;
