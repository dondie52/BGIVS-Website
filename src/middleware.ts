import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const VERCEL_ALIAS_HOST = "bgivs-website.vercel.app";
const CANONICAL_HOST = "www.bgivs.co.bw";

export async function middleware(request: NextRequest) {
  if (request.headers.get("host") === VERCEL_ALIAS_HOST) {
    const url = new URL(request.url);
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
