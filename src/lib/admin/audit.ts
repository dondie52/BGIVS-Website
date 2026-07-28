import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { createErrorId } from "@/lib/errors";

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export async function writeAuditLog(options: {
  actorId: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  oldValues?: Json | null;
  newValues?: Json | null;
}): Promise<void> {
  const safeId = createErrorId();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("admin_audit_logs").insert({
      actor_id: options.actorId,
      action: options.action,
      entity_type: options.entityType ?? null,
      entity_id: options.entityId ?? null,
      old_values: options.oldValues ?? null,
      new_values: options.newValues ?? null,
    });

    if (error) {
      console.error("[audit] insert failed", {
        errorId: safeId,
        message: error.message,
      });
    }
  } catch (error) {
    console.error("[audit] unexpected failure", {
      errorId: safeId,
      message: error instanceof Error ? error.message : "unknown",
    });
  }
}
