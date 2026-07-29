import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { ProgrammeForm } from "@/components/admin/ProgrammeForm";
import { createProgrammeAction } from "@/lib/admin/actions/content";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewProgrammePage({ searchParams }: Props) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;

  return (
    <div>
      <AdminHeader
        title="New programme"
        actions={
          <Link href="/admin/programmes" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={error} tone="error" />
      <ProgrammeForm action={createProgrammeAction} />
    </div>
  );
}
