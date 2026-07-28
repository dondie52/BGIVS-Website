# BGIVS admin guide

Operational guide for staff using the BGIVS admin area and related backends.

## Roles

| Role | Access |
| --- | --- |
| `admin` | Full staff access, including user/role-sensitive actions when implemented |
| `editor` | Content and enquiry handling for day-to-day publishing work |

Both roles require `profiles.active = true`. Inactive profiles cannot enter `/admin`.

## Signing in

1. Open `/admin/login`.
2. Sign in with the Auth email and password created in Supabase.
3. If login succeeds but you are redirected back to login, your `profiles` row is missing, inactive, or not `admin`/`editor`.

Safe post-login redirects must stay under `/admin` (see `isSafeRedirectPath`).

## Content workflow

Public pages load **published** rows from Supabase, with static TypeScript content as a fallback so the site never goes blank during migration.

### Publications

- Manage rows in `publications`.
- Set `status` to `published` and provide `published_at` when releasing.
- `cover_path` may be a site-relative path (for example `/images/publications/...`) or a storage-relative path in the `public-media` bucket (for example `covers/...`). Public pages resolve storage paths via `getPublicMediaUrl` / `resolvePublicationCover`.
- Public research pages and the footer list published books only.
- “Request a Copy” on a publication detail page links to `/research/request/[slug]`.

### Programmes and services

- Edit `programmes` and `services`.
- Only `status = published` appears on `/programmes` and `/services`.
- Slugs become HTML ids / deep links (for example `/programmes#corporate-value-alignment`).

### Site settings

Safe public keys (contact email, phone, location, names, tagline) are read server-side for the footer. Do not store secrets in `site_settings`. Retention placeholders such as `data_retention_days` stay internal until leadership approves a policy.

## Enquiries

1. Public forms POST to `/api/enquiries`.
2. Valid submissions are stored in `enquiries` with `status = new` and `notification_status = pending`.
3. The `notify-enquiry` Edge Function emails the admin inbox and sends a receipt to the visitor.
4. Successful email delivery sets `notification_status = sent`. Failures set `failed` and store `notification_error`.

Spam controls:

- Honeypot field `website` (non-empty → fake success, no insert)
- Hashed IP rate limiting
- Optional Cloudflare Turnstile when secrets are configured

Staff should update enquiry status (`new` → `in_progress` → `responded` / `closed` / `spam`) and keep notes in `enquiry_notes` where available.

## Book / publication requests

1. Public requests POST to `/api/book-requests` with a published `publicationSlug`.
2. Rows are stored in `book_requests`.
3. `notify-book-request` emails admin and requester with the publication title.

## Notifications and Resend

- Requires `RESEND_API_KEY` on the Edge Function environment.
- `ADMIN_NOTIFICATION_EMAIL` receives staff alerts.
- User confirmation subjects do **not** promise a response time.
- Brand line **From Metrics to Meaning** is included in notification copy.
- Missing Resend configuration does not break form submission; notifications are marked failed for follow-up.

## Exports and privacy

- CSV exports must use the project CSV helpers (formula-injection safe).
- Personal data is for institutional correspondence only.
- Automated deletion is **not** enabled until a retention period is approved. See `/privacy` and `docs/SUPABASE_SETUP.md`.

## Promoting staff (SQL)

```sql
insert into public.profiles (id, full_name, role, active)
values ('<AUTH_USER_UUID>', 'Staff Name', 'editor', true)
on conflict (id) do update set
  role = excluded.role,
  active = true,
  full_name = excluded.full_name,
  updated_at = now();
```

Use `role = 'admin'` for administrators. Set `active = false` to revoke admin UI access.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Form succeeds but no email | Edge Function logs; `RESEND_API_KEY`; `notification_status` / `notification_error` |
| Public page empty of content | Supabase published rows; fallback static content should still show |
| Cannot open `/admin` | Auth session + `profiles.role` + `active` |
| Rate limit responses | Wait for the window; confirm `RATE_LIMIT_SECRET` is stable in production |
| Book request rejected | Publication slug must exist and be `published` |
