import config from '@/lib/config';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Routes qui nécessitent une authentification.
 * On vérifie le pathname SANS le préfixe de locale (ex: "/dashboard"
 * matche aussi bien "/dashboard" que "/fr/dashboard").
 */
const PROTECTED_PATHS = ['/dashboard'];

/**
 * Retire le préfixe de locale d'un pathname pour la comparaison.
 * Ex: "/fr/dashboard/secteurs" -> "/dashboard/secteurs"
 * Ex: "/dashboard/secteurs" -> "/dashboard/secteurs" (pas de préfixe = inchangé)
 */
function stripLocalePrefix(pathname: string): string {
  // Les locales supportées font 2 caractères (fr, en...) précédées d'un slash
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (match) {
    return match[2] ?? '/';
  }
  return pathname;
}

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

  const pathWithoutLocale = stripLocalePrefix(request.nextUrl.pathname);
  const isProtectedRoute = PROTECTED_PATHS.some((path) =>
    pathWithoutLocale.startsWith(path),
  );

  // Redirige vers /login si l'utilisateur tente d'accéder à une route protégée sans être connecté
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // On garde la page d'origine pour rediriger l'utilisateur dessus après connexion
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est déjà connecté et tente d'accéder à
  // /login ou /register, on le redirige directement vers /dashboard
  const isAuthRoute = ['/login', '/register'].some((path) =>
    pathWithoutLocale.startsWith(path),
  );
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
