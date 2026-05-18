-- ─────────────────────────────────────────────────────────────
-- Ad Projects — Connected Campaign Upgrade
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

-- Add connected campaign columns to existing ad_projects table
alter table public.ad_projects
  add column if not exists platform      text,
  add column if not exists campaign_goal text,
  add column if not exists brand_voice   text,
  add column if not exists visual_style  text,
  add column if not exists selected_angle jsonb,
  add column if not exists selected_hook  jsonb,
  add column if not exists full_context   jsonb,
  add column if not exists outputs        jsonb;

-- Allow users to update their own projects
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
    and tablename = 'ad_projects'
    and policyname = 'Users update own projects'
  ) then
    execute 'create policy "Users update own projects"
      on public.ad_projects for update
      using (auth.uid() = user_id)';
  end if;
end $$;
