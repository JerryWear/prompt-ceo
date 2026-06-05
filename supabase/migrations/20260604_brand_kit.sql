-- supabase/migrations/20260604_brand_kit.sql
-- Adds brand_kit to app_users and batch_id to edit_render_jobs.
-- brand_kit shape: { logoUrl: string, primaryColor: string }
-- batch_id: groups jobs created together in a multi-platform export

alter table public.app_users
  add column if not exists brand_kit jsonb default '{}';

alter table public.edit_render_jobs
  add column if not exists batch_id uuid default null;

create index if not exists edit_render_jobs_batch_id_idx
  on public.edit_render_jobs (batch_id)
  where batch_id is not null;
