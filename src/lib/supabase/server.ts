import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import type { SupabaseClientType } from "./client-types";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function createClient(): Promise<SupabaseClientType> {
  const cookieStore = await cookies();

  return createServerClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (_error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  ) as SupabaseClientType;
}

// User-context client that enforces RLS policies.
export const getServerClient = cache(async (): Promise<SupabaseClientType> => {
  return await createClient();
});

export function createAdminClient(): SupabaseClientType {
  return createServerClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("SUPABASE_SECRET_KEY"),
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No cookie handling for service role client
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  ) as SupabaseClientType;
}

// Service-role client for server-only operations that must bypass RLS.
export const getAdminClient = cache((): SupabaseClientType => {
  return createAdminClient();
});

export async function getUser() {
  const supabase = await getServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { supabase, user: null, error };
  }

  return { supabase, user, error: null };
}

export async function requireUser() {
  const { supabase, user, error } = await getUser();
  if (!user || error) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}
