import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { toCsv } from "@/lib/csv";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/types/database";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const status = searchParams.get("status") as EnquiryStatus | null;
  const orgCategory = searchParams.get("org_category")?.trim() ?? "";
  const programme = searchParams.get("programme")?.trim() ?? "";
  const dateFrom = searchParams.get("date_from")?.trim() ?? "";
  const dateTo = searchParams.get("date_to")?.trim() ?? "";

  const supabase = await createClient();
  let query = supabase
    .from("enquiries")
    .select(
      "submitted_at, full_name, email, phone, organization, organization_category, country, programme_or_service, status, message, source_page",
    )
    .order("submitted_at", { ascending: false })
    .limit(5000);

  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,email.ilike.%${q}%,organization.ilike.%${q}%`,
    );
  }
  if (status) query = query.eq("status", status);
  if (orgCategory) query = query.eq("organization_category", orgCategory);
  if (programme) query = query.ilike("programme_or_service", `%${programme}%`);
  if (dateFrom) query = query.gte("submitted_at", `${dateFrom}T00:00:00.000Z`);
  if (dateTo) query = query.lte("submitted_at", `${dateTo}T23:59:59.999Z`);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const csv = toCsv(
    [
      "submitted_at",
      "full_name",
      "email",
      "phone",
      "organization",
      "organization_category",
      "country",
      "programme_or_service",
      "status",
      "message",
      "source_page",
    ],
    (data ?? []).map((row) => [
      row.submitted_at,
      row.full_name,
      row.email,
      row.phone,
      row.organization,
      row.organization_category,
      row.country,
      row.programme_or_service,
      row.status,
      row.message,
      row.source_page,
    ]),
  );

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bgivs-enquiries.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
