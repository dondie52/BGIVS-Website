-- Add Barotse Change: Volume I to the published books catalogue.

insert into public.publications (
  slug,
  title,
  subtitle,
  author,
  publisher,
  description,
  publication_type,
  cover_path,
  topics,
  status,
  featured,
  sort_order,
  published_at
) values (
  'barotse-change-volume-1',
  'Barotse Change',
  'A Purely Barotzish Mindset Change Advocacy for a Completely Independent Barotseland in the Transition Period and Beyond — Volume I',
  'Dr. Lindunda Wamunyima',
  'Babobiz Knowledge Press',
  'A structured advocacy for identity, justice, and self-determination that examines Barotseland''s historical and political journey, the impact of the 1964 Agreement abrogation, and the governance, identity, and nationhood questions shaping the transition period and beyond.',
  'book',
  '/images/publications/barotse-change-volume-1.jpeg',
  array[
    'Barotseland history',
    'Identity and nationhood',
    'Justice and self-determination',
    'Governance',
    '1964 Barotseland Agreement',
    'Mindset change',
    'Transition planning',
    'National renewal'
  ],
  'published',
  true,
  3,
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  author = excluded.author,
  publisher = excluded.publisher,
  description = excluded.description,
  publication_type = excluded.publication_type,
  cover_path = excluded.cover_path,
  topics = excluded.topics,
  status = excluded.status,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  published_at = coalesce(public.publications.published_at, excluded.published_at),
  updated_at = now();
