-- supabase/migrations/20260602_music_usage_logs.sql

create table if not exists public.music_usage_logs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  track_id     uuid references public.music_tracks(id) on delete set null,
  project_id   text,
  project_type text,
  action       text not null,
  created_at   timestamptz not null default now()
);

create index if not exists music_usage_logs_user_id_idx on public.music_usage_logs (user_id);
create index if not exists music_usage_logs_track_id_idx on public.music_usage_logs (track_id);

alter table public.music_usage_logs enable row level security;

-- Users can read their own logs
create policy "users_read_own_usage_logs"
  on public.music_usage_logs for select
  using (auth.uid() = user_id);

-- Service role can insert/read all (used by API routes with SUPABASE_SERVICE_ROLE_KEY)
create policy "service_role_all_usage_logs"
  on public.music_usage_logs
  using (true)
  with check (true);
