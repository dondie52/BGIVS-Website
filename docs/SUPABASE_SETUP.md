# Supabase setup for BGIVS

This guide covers creating the Supabase project, applying the schema, configuring Auth and Edge Functions, wiring environment variables, and promoting the first admin user.

## 1. Create a Supabase project

1. Sign in at [https://supabase.com](https://supabase.com) and create a new project.
2. Choose a strong database password and store it in a password manager.
3. Note the project URL and API keys from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Publishable / anon key → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - Service role key → `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose to the browser)

## 2. Local tooling

Install the Supabase CLI (also available via the repo `supabase` npm package):

```bash
npm install
npx supabase login
npx supabase link --project-ref <your-project-ref>
```

Useful scripts from `package.json`:

| Script | Purpose |
| --- | --- |
| `npm run supabase:start` | Start local Supabase stack |
| `npm run supabase:stop` | Stop local stack |
| `npm run supabase:reset` | Reset local DB and re-apply migrations + seed |
| `npm run supabase:push` | Push migrations to the linked remote project |
| `npm run supabase:types` | Generate TypeScript types from the local DB |

## 3. Apply migrations and seed

Schema lives in `supabase/migrations/`. Seed content (publications, programmes, services, site settings) lives in `supabase/seed.sql`.

**Local:**

```bash
npm run supabase:start
npm run supabase:reset
```

**Remote (recommended for this project):**

1. Open the Supabase Dashboard → **SQL Editor**.
2. Paste and run the full contents of:
   - `supabase/migrations/20260728190000_init_bgivs_schema.sql`
3. Then paste and run:
   - `supabase/seed.sql`
4. Confirm tables exist under **Table Editor**.

Alternatively, after `npx supabase login` and `npx supabase link --project-ref zfncqysmkdhkuzozwhys`:

```bash
npm run supabase:push
```

Then load seed data (SQL Editor or `psql` against the remote connection string):

```bash
# Example using the SQL Editor: paste contents of supabase/seed.sql
```

Confirm tables exist: `profiles`, `enquiries`, `enquiry_notes`, `publications`, `book_requests`, `programmes`, `services`, `site_settings`, `admin_audit_logs`, `rate_limit_events`.

## 4. Environment variables

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

| Variable | Where used | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Next.js + browser | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Next.js + browser | Anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Next.js server, Edge Functions | Bypasses RLS; keep secret |
| `NEXT_PUBLIC_SITE_URL` | Metadata, emails | Default `https://bgivs-website.vercel.app` |
| `ADMIN_NOTIFICATION_EMAIL` | Edge Functions | Admin inbox for enquiries / book requests |
| `RESEND_API_KEY` | Edge Functions | Optional locally; missing key marks notification failed without crashing the form |
| `RESEND_FROM_EMAIL` | Edge Functions | Optional; defaults to Resend test sender |
| `SITE_URL` | Edge Functions | Used in admin deep links; defaults to the Vercel site URL |
| `RATE_LIMIT_SECRET` | API routes | Salt for hashed IP rate-limit buckets |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client (optional) | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | API routes (optional) | Empty = verification skipped |

Also set the same secrets on the Supabase Edge Function settings for `notify-enquiry` and `notify-book-request`:

- `RESEND_API_KEY`
- `ADMIN_NOTIFICATION_EMAIL`
- `SITE_URL`
- `RESEND_FROM_EMAIL` (optional)

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically to Edge Functions.

## 5. Auth configuration

1. In Supabase Dashboard → **Authentication → Providers**, enable Email.
2. Disable public sign-ups if only staff should create accounts (invite users from the Dashboard or Auth Admin API).
3. Set the Site URL and redirect allow-list to your app origin(s), including `/admin` callback paths used by the admin login flow.
4. Staff access is gated by `public.profiles` (`role` in `admin` | `editor`, `active = true`). Auth alone is not enough.

## 6. First admin user (SQL)

Create the Auth user first (Dashboard → Authentication → Users → Add user / Invite). Do not commit passwords.

Then promote by email:

```sql
insert into public.profiles (
  id,
  full_name,
  role,
  active
)
select
  id,
  'BGIVS Administrator',
  'admin',
  true
from auth.users
where email = '<ADMIN_EMAIL>'
on conflict (id) do update set
  full_name = excluded.full_name,
  role = 'admin',
  active = true,
  updated_at = now();
```

Or promote by UUID after creating the Auth user:

```sql
insert into public.profiles (id, full_name, role, active)
values (
  '<AUTH_USER_UUID>',
  'BGIVS Administrator',
  'admin',
  true
)
on conflict (id) do update set
  full_name = excluded.full_name,
  role = 'admin',
  active = true,
  updated_at = now();
```

Verify:

```sql
select id, full_name, role, active
from public.profiles
where role = 'admin';
```

Editors use `role = 'editor'`. Deactivate access with `active = false` rather than deleting the Auth user when possible.

## 7. Row Level Security (summary)

- Public (anon) can read **published** programmes, services, and publications.
- Public inserts for enquiries / book requests are handled via the Next.js API using the service role (with validation, honeypot, rate limit, and optional Turnstile).
- Staff (`admin` / `editor`) manage content and enquiries through authenticated sessions + RLS helpers such as `has_role`.
- `site_settings` is not publicly readable; the app loads safe keys via the service role on the server only.

## 8. Edge Functions

Functions:

- `supabase/functions/notify-enquiry`
- `supabase/functions/notify-book-request`

`supabase/config.toml` sets `verify_jwt = true` for both. Deploy:

```bash
npx supabase functions deploy notify-enquiry
npx supabase functions deploy notify-book-request
```

API routes invoke these after a successful insert. If Resend is not configured, the function returns HTTP 200 with a warning and marks `notification_status = failed` so the public form still succeeds.

## 9. Storage (covers / documents)

If publication covers or documents use Supabase Storage, create the buckets referenced by your migration policies and upload assets with paths matching `cover_path` / `document_path`. Static fallback images under `/public/images/publications` remain available during migration.

## 10. Vercel / production checklist

1. Set all `NEXT_PUBLIC_*` and server secrets in the hosting environment.
2. Confirm `NEXT_PUBLIC_SITE_URL` matches the production domain.
3. Deploy Edge Functions and set function secrets.
4. Run migrations + seed on the production Supabase project.
5. Create and promote the first admin profile.
6. Submit a test enquiry and book request; confirm admin email, user confirmation, and `notification_status = sent`.

## 11. Regenerating types

```bash
npm run supabase:types
```

Review `src/types/database.generated.ts` and align `src/types/database.ts` when the schema changes.
