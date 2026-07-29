-- Allow public form submissions without requiring the service-role key on the
-- Next.js server. Inserts remain write-only: no SELECT policies for anon.
-- Service role continues to bypass RLS for admin reads and notifications.

create policy "enquiries_anon_insert"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (consent = true);

create policy "book_requests_anon_insert"
  on public.book_requests
  for insert
  to anon, authenticated
  with check (consent = true);

-- Rate limiting from the App Router may use the publishable key when the
-- service-role key is unavailable.
grant execute on function public.check_rate_limit(text, text, int, int)
  to anon, authenticated;
