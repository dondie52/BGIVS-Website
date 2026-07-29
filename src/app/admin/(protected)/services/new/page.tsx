import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { createServiceAction } from "@/lib/admin/actions/content";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewServicePage({ searchParams }: Props) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;

  return (
    <div>
      <AdminHeader
        title="New service"
        actions={
          <Link href="/admin/services" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={error} tone="error" />
      <ServiceForm action={createServiceAction} />
    </div>
  );
}
