import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Gère le routing i18n (locale dans l'URL)
  const i18nResponse = handleI18nRouting(request);

  // 2. Si next-intl a fait une redirection, on la respecte
  if (i18nResponse.status !== 200) {
    return i18nResponse;
  }

  // 3. Sinon on laisse Supabase gérer la session
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Intercepte toutes les routes sauf :
     * - les fichiers statiques Next.js (_next/static, _next/image)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};