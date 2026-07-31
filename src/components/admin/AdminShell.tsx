"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({
  children,
  role,
  email,
  fullName,
}: {
  children: React.ReactNode;
  role: "admin" | "editor";
  email?: string;
  fullName?: string | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-off-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <AdminSidebar
        role={role}
        email={email}
        fullName={fullName}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-navy hover:bg-off-white"
            aria-label="Open sidebar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">BGIVS</p>
            <p className="text-sm font-semibold text-navy leading-none">Admin Console</p>
          </div>
        </header>

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
