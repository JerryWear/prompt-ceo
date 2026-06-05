-- supabase/migrations/20260605_edit_projects_storage_path.sql
-- Adds permanent storage path fields to edit_projects.
-- These allow the render worker to create signed URLs independently
-- without depending on the public URL format (which fails on private buckets).

alter table public.edit_projects
  add column if not exists source_video_storage_path text,
  add column if not exists source_video_bucket       text;
