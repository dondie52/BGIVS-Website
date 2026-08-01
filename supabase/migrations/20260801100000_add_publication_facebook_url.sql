-- Add a Facebook page URL field to publications so a confirmed official
-- social channel can be linked from a publication's page.

alter table public.publications
  add column if not exists facebook_url text;
