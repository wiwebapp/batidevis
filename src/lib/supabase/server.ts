import config from '@/lib/config';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Client Supabase pour les Server Components et Route Handlers.
 * Lit et écrit les cookies via next/headers.
 * Ne jamais importer ce fichier dans un Client Component.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    config.env.supabase.url,
    config.env.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll appelé depuis un Server Component — ignoré intentionnellement.
            // Les cookies sont gérés par le proxy dans ce cas.
          }
        },
      },
    },
  );
}
