import config from '@/lib/config';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Utilitaire Supabase pour src/proxy.ts.
 * Rafraîchit la session utilisateur à chaque requête
 * et met à jour les cookies en conséquence.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    config.env.supabase.url,
    config.env.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Rafraîchit la session — ne pas supprimer cette ligne.
  // Sans ça, la session expire et l'utilisateur est déconnecté aléatoirement.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirige vers /login si l'utilisateur tente d'accéder au dashboard sans être connecté
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
