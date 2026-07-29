import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { updateServiceAction } from "@/lib/admin/actions/content";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ServiceEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <AdminHeader
        title="Edit service"
        description={data.title}
        actions={
          <Link href="/admin/services" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={saved ? "Service saved." : error} tone={error ? "error" : "success"} />
      <ServiceForm action={updateServiceAction} service={data} />
    </div>
  );
}
