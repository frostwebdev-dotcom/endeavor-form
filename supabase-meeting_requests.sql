-- Run this in Supabase SQL Editor to create the meeting_requests table.

create table if not exists public.meeting_requests (
  id uuid primary key default gen_random_uuid(),
  preferred_email text not null,
  preferred_phone text,
  preferred_date text,
  preferred_time text,
  alternative_date text,
  alternative_time text,
  firm_name text,
  created_at timestamptz default now()
);

-- Enable RLS. API uses the service role key, which bypasses RLS.
-- With no INSERT policy, only the service role can insert (e.g. your API).
alter table public.meeting_requests enable row level security;

-- Optional: add a SELECT policy if you need to read rows (e.g. admin) with same service role.
-- create policy "Service role can select" on public.meeting_requests for select using (true);
