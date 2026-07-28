import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { PublicationForm } from "@/components/admin/PublicationForm";
import { updatePublicationAction } from "@/lib/admin/actions/publications";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EditPublicationPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data } = await supabase.from("publications").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <AdminHeader
        title="Edit publication"
        description={data.title}
        actions={
          <div className="flex gap-3">
            <Link
              href={
                data.status === "published"
                  ? `/research/${data.slug}`
                  : `/admin/preview/publications/${data.slug}`
              }
              className="text-sm font-semibold text-blue hover:underline"
              target="_blank"
            >
              Preview
            </Link>
            <Link href="/admin/publications" className="text-sm font-semibold text-blue hover:underline">
              Back to list
            </Link>
          </div>
        }
      />
      <FlashMessage
        message={saved ? "Publication saved." : error}
        tone={error ? "error" : "success"}
      />
      <PublicationForm action={updatePublicationAction} publication={data} />
    </div>
  );
}
