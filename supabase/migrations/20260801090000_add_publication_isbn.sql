-- Add an ISBN field to publications so official ISBNs can be displayed
-- instead of the "will be displayed once officially verified" placeholder.

alter table public.publications
  add column if not exists isbn text;
