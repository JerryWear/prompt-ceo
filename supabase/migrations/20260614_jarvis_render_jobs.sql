create table if not exists jarvis_render_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  status text not null default 'queued',
  render_plan jsonb not null,
  export_url text,
  error_message text,
  render_details jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table jarvis_render_jobs enable row level security;

create policy "Users manage own jarvis render jobs"
  on jarvis_render_jobs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index jarvis_render_jobs_status_idx
  on jarvis_render_jobs(status)
  where status in ('queued', 'processing');

create index jarvis_render_jobs_user_idx
  on jarvis_render_jobs(user_id);
