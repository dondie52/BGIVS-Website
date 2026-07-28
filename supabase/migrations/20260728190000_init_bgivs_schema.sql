-- BGIVS initial schema
-- Extensions, enums, tables, triggers, helpers, indexes, RLS, storage

create extension if not exists "pgcrypto" with schema extensions;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('admin', 'editor');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.enquiry_status as enum ('new', 'in_progress', 'responded', 'closed', 'spam');
create type public.notification_status as enum ('pending', 'sent', 'failed');
create type public.publication_type as enum (
  'book',
  'research_report',
  'policy_paper',
  'article',
  'institutional_guide',
  'training_material'
);

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role public.user_role not null default 'editor',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  position_role text not null,
  organization text not null,
  organization_category text not null,
  email text not null,
  phone text,
  country text not null,
  programme_or_service text not null,
  message text not null,
  consent boolean not null,
  status public.enquiry_status not null default 'new',
  assigned_to uuid references public.profiles (id) on delete set null,
  source_page text,
  referrer text,
  notification_status public.notification_status not null default 'pending',
  notification_error text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_contacted_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  constraint enquiries_full_name_not_empty check (length(trim(full_name)) > 0),
  constraint enquiries_email_not_empty check (length(trim(email)) > 0),
  constraint enquiries_message_length check (length(message) <= 5000),
  constraint enquiries_consent_true check (consent = true)
);

create table public.enquiry_notes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete restrict,
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  author text,
  publisher text,
  description text not null,
  publication_type public.publication_type not null default 'book',
  cover_path text,
  document_path text,
  topics text[] not null default '{}'::text[],
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.book_requests (
  id uuid primary key default gen_random_uuid(),
  publication_id uuid not null references public.publications (id) on delete restrict,
  full_name text not null,
  organization text,
  email text not null,
  phone text,
  country text not null,
  quantity integer not null default 1,
  message text,
  consent boolean not null,
  status public.enquiry_status not null default 'new',
  notification_status public.notification_status not null default 'pending',
  notification_error text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint book_requests_quantity_range check (quantity between 1 and 100),
  constraint book_requests_consent_true check (consent = true)
);

create table public.programmes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  full_description text,
  challenges text[] not null default '{}'::text[],
  activities text[] not null default '{}'::text[],
  beneficiaries text[] not null default '{}'::text[],
  outcomes text[] not null default '{}'::text[],
  icon text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  full_description text,
  intended_for text[] not null default '{}'::text[],
  areas_covered text[] not null default '{}'::text[],
  expected_value text[] not null default '{}'::text[],
  icon text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz not null default now()
);

create table public.rate_limit_events (
  id uuid primary key default gen_random_uuid(),
  bucket_hash text not null,
  endpoint text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger enquiries_set_updated_at
  before update on public.enquiries
  for each row execute function public.set_updated_at();

create trigger enquiry_notes_set_updated_at
  before update on public.enquiry_notes
  for each row execute function public.set_updated_at();

create trigger publications_set_updated_at
  before update on public.publications
  for each row execute function public.set_updated_at();

create trigger book_requests_set_updated_at
  before update on public.book_requests
  for each row execute function public.set_updated_at();

create trigger programmes_set_updated_at
  before update on public.programmes
  for each row execute function public.set_updated_at();

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Role & rate-limit helpers
-- ---------------------------------------------------------------------------
create or replace function public.has_role(required_roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.active = true
      and p.role = any(required_roles)
  );
$$;

create or replace function public.check_rate_limit(
  p_bucket_hash text,
  p_endpoint text,
  p_max_requests int,
  p_window_seconds int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  delete from public.rate_limit_events
  where created_at < now() - make_interval(secs => p_window_seconds * 2);

  select count(*) into v_count
  from public.rate_limit_events
  where bucket_hash = p_bucket_hash
    and endpoint = p_endpoint
    and created_at > now() - make_interval(secs => p_window_seconds);

  if v_count >= p_max_requests then
    return false;
  end if;

  insert into public.rate_limit_events (bucket_hash, endpoint)
  values (p_bucket_hash, p_endpoint);

  return true;
end;
$$;

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index enquiries_status_submitted_at_idx
  on public.enquiries (status, submitted_at desc);

create index enquiries_email_idx
  on public.enquiries (email);

create index enquiries_organization_category_idx
  on public.enquiries (organization_category);

create index book_requests_status_submitted_at_idx
  on public.book_requests (status, submitted_at desc);

create index publications_status_sort_order_idx
  on public.publications (status, sort_order);

create index programmes_status_sort_order_idx
  on public.programmes (status, sort_order);

create index services_status_sort_order_idx
  on public.services (status, sort_order);

create index enquiry_notes_enquiry_id_created_at_idx
  on public.enquiry_notes (enquiry_id, created_at);

create index admin_audit_logs_created_at_idx
  on public.admin_audit_logs (created_at desc);

create index rate_limit_events_bucket_endpoint_created_at_idx
  on public.rate_limit_events (bucket_hash, endpoint, created_at);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_notes enable row level security;
alter table public.publications enable row level security;
alter table public.book_requests enable row level security;
alter table public.programmes enable row level security;
alter table public.services enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_audit_logs enable row level security;
alter table public.rate_limit_events enable row level security;

-- publications
create policy "publications_public_select_published"
  on public.publications
  for select
  to anon, authenticated
  using (status = 'published');

create policy "publications_staff_all"
  on public.publications
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]))
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

-- programmes
create policy "programmes_public_select_published"
  on public.programmes
  for select
  to anon, authenticated
  using (status = 'published');

create policy "programmes_staff_all"
  on public.programmes
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]))
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

-- services
create policy "services_public_select_published"
  on public.services
  for select
  to anon, authenticated
  using (status = 'published');

create policy "services_staff_all"
  on public.services
  for all
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]))
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

-- profiles
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_admin_select"
  on public.profiles
  for select
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

create policy "profiles_admin_insert"
  on public.profiles
  for insert
  to authenticated
  with check (public.has_role(array['admin']::public.user_role[]));

create policy "profiles_admin_update"
  on public.profiles
  for update
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]))
  with check (public.has_role(array['admin']::public.user_role[]));

create policy "profiles_admin_delete"
  on public.profiles
  for delete
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

create policy "profiles_update_own_full_name"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- enquiries: no public access; staff select/update; admin delete
create policy "enquiries_staff_select"
  on public.enquiries
  for select
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "enquiries_staff_update"
  on public.enquiries
  for update
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]))
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "enquiries_admin_delete"
  on public.enquiries
  for delete
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

-- enquiry_notes
create policy "enquiry_notes_staff_select"
  on public.enquiry_notes
  for select
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "enquiry_notes_staff_insert"
  on public.enquiry_notes
  for insert
  to authenticated
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "enquiry_notes_staff_update"
  on public.enquiry_notes
  for update
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]))
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "enquiry_notes_admin_delete"
  on public.enquiry_notes
  for delete
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

-- book_requests
create policy "book_requests_staff_select"
  on public.book_requests
  for select
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "book_requests_staff_update"
  on public.book_requests
  for update
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]))
  with check (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "book_requests_admin_delete"
  on public.book_requests
  for delete
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

-- site_settings: staff select; admin manage
create policy "site_settings_staff_select"
  on public.site_settings
  for select
  to authenticated
  using (public.has_role(array['admin', 'editor']::public.user_role[]));

create policy "site_settings_admin_all"
  on public.site_settings
  for all
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]))
  with check (public.has_role(array['admin']::public.user_role[]));

-- admin_audit_logs: admin select; admin insert
create policy "admin_audit_logs_admin_select"
  on public.admin_audit_logs
  for select
  to authenticated
  using (public.has_role(array['admin']::public.user_role[]));

create policy "admin_audit_logs_admin_insert"
  on public.admin_audit_logs
  for insert
  to authenticated
  with check (public.has_role(array['admin']::public.user_role[]));

-- rate_limit_events: RLS enabled, no anon/authenticated policies (service role only)

revoke all on function public.check_rate_limit(text, text, int, int) from public;
revoke all on function public.has_role(public.user_role[]) from public;
grant execute on function public.check_rate_limit(text, text, int, int) to service_role;
grant execute on function public.has_role(public.user_role[]) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'public-media',
    'public-media',
    true,
    5242880,
    array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
  ),
  (
    'private-publications',
    'private-publications',
    false,
    52428800,
    array['application/pdf', 'application/epub+zip']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- public-media policies
create policy "public_media_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'public-media');

create policy "public_media_staff_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'public-media'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  );

create policy "public_media_staff_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'public-media'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  )
  with check (
    bucket_id = 'public-media'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  );

create policy "public_media_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'public-media'
    and public.has_role(array['admin']::public.user_role[])
  );

-- private-publications policies (no anon)
create policy "private_publications_staff_select"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'private-publications'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  );

create policy "private_publications_staff_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'private-publications'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  );

create policy "private_publications_staff_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'private-publications'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  )
  with check (
    bucket_id = 'private-publications'
    and public.has_role(array['admin', 'editor']::public.user_role[])
  );

create policy "private_publications_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'private-publications'
    and public.has_role(array['admin']::public.user_role[])
  );
