# BGIVS Website

Institutional website for **Babobiz Global Institute of Value Systems (BGIVS)** — *From Metrics to Meaning*.

BGIVS developed the BVSDQ–CSRDQ Framework to help institutions align their internal values and measurable performance with external responsibility, transparency, sustainability, and meaningful societal impact.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres, Auth, RLS, Edge Functions)
- Zod validation, Vitest
- Resend (enquiry / book-request notifications)

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill Supabase and optional Resend / Turnstile values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a full local backend:

```bash
npm run supabase:start
npm run supabase:reset
npm run dev
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` / `npm run test:watch` | Vitest |
| `npm run supabase:start` / `stop` | Local Supabase stack |
| `npm run supabase:reset` | Reset DB, apply migrations + seed |
| `npm run supabase:push` | Push migrations to linked remote |
| `npm run supabase:types` | Generate DB types from local Supabase |

## Architecture overview

- **Public site** — `src/app/(site)/` (research, programmes, services, contact, privacy, etc.)
- **Admin** — `src/app/admin/` (staff-only; requires Supabase Auth + `profiles`)
- **API** — `src/app/api/enquiries`, `src/app/api/book-requests` (validate, rate-limit, persist, invoke Edge Functions)
- **Content helpers** — `src/lib/content/*` load published Supabase rows and fall back to `src/content/*` static data
- **Edge Functions** — `supabase/functions/notify-enquiry`, `notify-book-request`

## Environment

See `.env.example` and [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) for the complete list. Minimum for local UI with static fallbacks: leave Supabase empty only if you accept fallback-only content; API routes that write to Supabase need the service role key.

## Content and publishing

Published programmes, services, and publications are read from Supabase with a **60s revalidate** on public pages. If Supabase is unavailable or returns no published rows, static TypeScript content is used so the site never blanks during migration.

## Forms

- Contact / enquiry → `POST /api/enquiries` → `notify-enquiry`
- Publication copy request → `POST /api/book-requests` → `notify-book-request`
- Honeypot field: `website`
- Optional Turnstile when secrets are set
- Rate limits hash IP + endpoint (raw IP is never stored)

## Documentation

- [Supabase setup](docs/SUPABASE_SETUP.md) — project, migrations, env, Edge Functions, **first admin SQL**
- [Admin guide](docs/ADMIN_GUIDE.md) — roles, content workflow, enquiries, notifications

## Content notes

- Mission and vision statements are used exactly as approved.
- Only approved publications are listed; other categories use honest empty states.
- Governance leadership names and founder portrait remain placeholders until official assets are provided.
- ISBN numbers are displayed on a publication once entered in the admin panel; publications without a verified ISBN show a pending notice instead.
- Privacy retention: no automated deletion until BGIVS approves a retention period.
