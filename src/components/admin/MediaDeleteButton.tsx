"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteMediaAction } from "@/lib/admin/actions/settings";

export function MediaDeleteButton({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirm() {
    setLoading(true);
    const formData = new FormData();
    formData.set("path", path);
    await deleteMediaAction(formData);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-semibold text-red-700 hover:underline"
      >
        Delete
      </button>
      <ConfirmDialog
        open={open}
        title="Delete media file?"
        description={`This will permanently remove ${path} from public-media.`}
        confirmLabel="Delete"
        loading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={confirm}
      />
    </>
  );
}
