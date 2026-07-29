import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { ProgrammeForm } from "@/components/admin/ProgrammeForm";
import { updateProgrammeAction } from "@/lib/admin/actions/content";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProgrammeEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data } = await supabase.from("programmes").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <AdminHeader
        title="Edit programme"
        description={data.title}
        actions={
          <Link href="/admin/programmes" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={saved ? "Programme saved." : error} tone={error ? "error" : "success"} />
      <ProgrammeForm action={updateProgrammeAction} programme={data} />
    </div>
  );
}
