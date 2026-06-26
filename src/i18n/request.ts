import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Charge les messages de traduction pour chaque requête serveur.
 * Next-intl appellera cette fonction automatiquement.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Vérifie que la locale est supportée, sinon fallback sur la locale par défaut
  if (!locale || !routing.locales.includes(locale as 'fr')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
