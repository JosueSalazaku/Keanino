"use server";
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return await Promise.resolve(cookieStore.getAll());
        },
        async setAll(cookiesToSet) {
          try {
            await Promise.all(
              cookiesToSet.map(({ name, value, options }: { name: string, value: string, options?: CookieOptions }) =>
                cookieStore.set(name, value, options)
              )
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
