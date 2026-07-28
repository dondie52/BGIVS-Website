import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { PublicationForm } from "@/components/admin/PublicationForm";
import { createPublicationAction } from "@/lib/admin/actions/publications";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewPublicationPage({ searchParams }: Props) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;

  return (
    <div>
      <AdminHeader
        title="New publication"
        actions={
          <Link href="/admin/publications" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={error} tone="error" />
      <PublicationForm action={createPublicationAction} />
    </div>
  );
}
