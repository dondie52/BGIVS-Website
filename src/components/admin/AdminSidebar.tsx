"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/visitors", label: "Visitors" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/book-requests", label: "Book requests" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/programmes", label: "Programmes" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/users", label: "Users", adminOnly: true },
  { href: "/admin/audit-log", label: "Audit log", adminOnly: true },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({
  role,
  email,
  fullName,
  open = false,
  onClose,
}: {
  role: "admin" | "editor";
  email?: string;
  fullName?: string | null;
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const items = navItems.filter((item) => !("adminOnly" in item && item.adminOnly) || role === "admin");

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col bg-navy text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">BGIVS</p>
            <p className="mt-1 text-sm font-semibold">Admin Console</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-2 truncate text-xs text-white/70">
          {fullName || email || "Staff"}
          <span className="ml-1 capitalize text-gold/90">· {role}</span>
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4" aria-label="Admin">
        {items.map((item) => {
          const active = isActive(pathname, item.href, "exact" in item ? item.exact : false);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block border-l-4 px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "border-gold bg-white/10 text-white"
                  : "border-transparent text-white/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md border border-white/20 px-3 py-2 text-center text-sm text-white/90 hover:bg-white/10"
        >
          View website
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
