-- Consent-based visitor analytics for BGIVS.
-- Stores useful study/admin metadata without storing raw IP addresses.

create table if not exists public.visitor_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  session_id text not null,
  event_name text not null default 'page_view',
  path text not null,
  page_title text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  device_type text,
  browser_family text,
  operating_system text,
  user_agent text,
  language text,
  timezone text,
  screen_width integer,
  screen_height integer,
  country_code text,
  region text,
  city text,
  ip_hash text,
  consent_version text not null default '2026-07-29',
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  constraint visitor_events_visitor_id_not_empty check (length(trim(visitor_id)) > 0),
  constraint visitor_events_session_id_not_empty check (length(trim(session_id)) > 0),
  constraint visitor_events_path_not_empty check (length(trim(path)) > 0),
  constraint visitor_events_event_name_not_empty check (length(trim(event_name)) > 0)
);

create index if not exists visitor_events_occurred_at_idx
  on public.visitor_events (occurred_at desc);

create index if not exists visitor_events_path_occurred_at_idx
  on public.visitor_events (path, occurred_at desc);

create index if not exists visitor_events_visitor_occurred_at_idx
  on public.visitor_events (visitor_id, occurred_at desc);

create index if not exists visitor_events_session_occurred_at_idx
  on public.visitor_events (session_id, occurred_at desc);

alter table public.visitor_events enable row level security;

drop policy if exists "visitor_events_staff_select" on public.visitor_events;
create policy "visitor_events_staff_select"
  on public.visitor_events
  for select
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]));

drop policy if exists "visitor_events_admin_delete" on public.visitor_events;
create policy "visitor_events_admin_delete"
  on public.visitor_events
  for delete
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

-- No anon insert policy: public traffic is accepted through the server route
-- so rate limiting, consent checks, and IP hashing stay centralized.
