-- Performance Memory: stores winning creative patterns per user
-- Separate from performance_logs (which tracks CTR/metrics).
-- This table stores qualitative signals: "this hook archetype performed well".

create table if not exists performance_memory (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade,
  project_id       text,
  hook_text        text,
  hook_archetype   text,
  campaign_phase   text,
  emotional_trigger text,
  pacing           text,
  visual_style     text,
  performance_signal text default 'performed_well',
  created_at       timestamptz default now()
);

alter table performance_memory enable row level security;

create policy "Users manage own performance memory"
  on performance_memory for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists idx_perf_memory_user    on performance_memory(user_id);
create index if not exists idx_perf_memory_created on performance_memory(user_id, created_at desc);
