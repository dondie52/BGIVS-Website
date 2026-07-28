import Image from "next/image";
import { notFound } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { resolvePublicationCover } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PublicationPreviewPage({ params }: Props) {
  await requireAdminUser();
  const { slug } = await params;

  const supabase = await createClient();
  const { data: publication } = await supabase
    .from("publications")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!publication) notFound();

  const coverUrl = resolvePublicationCover(publication.cover_path);

  return (
    <div className="min-h-screen bg-off-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl rounded-lg border border-border bg-white p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Draft preview · {publication.status}
        </p>
        <h1 className="mt-3 text-3xl text-navy">{publication.title}</h1>
        {publication.subtitle ? (
          <p className="mt-2 text-lg text-muted">{publication.subtitle}</p>
        ) : null}
        <p className="mt-2 text-sm text-muted">
          {[publication.author, publication.publisher].filter(Boolean).join(" · ")}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr]">
          <div className="overflow-hidden rounded-md border border-border bg-off-white">
            <Image
              src={coverUrl}
              alt=""
              width={400}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
          <div>
            <p className="whitespace-pre-wrap text-muted">{publication.description}</p>
            {publication.topics.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {publication.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-border bg-off-white px-3 py-1 text-sm text-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
