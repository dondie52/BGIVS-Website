import { afterEach, describe, expect, it } from "vitest";
import { hasServiceRoleKey, hasSupabaseConfig } from "@/lib/supabase/form-config";

const KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

const snapshot: Record<string, string | undefined> = {};

afterEach(() => {
  for (const key of KEYS) {
    if (snapshot[key] === undefined) delete process.env[key];
    else process.env[key] = snapshot[key];
  }
});

function rememberEnv() {
  for (const key of KEYS) {
    snapshot[key] = process.env[key];
  }
}

describe("form supabase helpers", () => {
  it("detects missing config", () => {
    rememberEnv();
    for (const key of KEYS) delete process.env[key];
    expect(hasSupabaseConfig()).toBe(false);
    expect(hasServiceRoleKey()).toBe(false);
  });

  it("accepts publishable key without service role", () => {
    rememberEnv();
    for (const key of KEYS) delete process.env[key];
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "pub-key";
    expect(hasSupabaseConfig()).toBe(true);
    expect(hasServiceRoleKey()).toBe(false);
  });

  it("detects service role key", () => {
    rememberEnv();
    for (const key of KEYS) delete process.env[key];
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";
    expect(hasServiceRoleKey()).toBe(true);
  });
});
