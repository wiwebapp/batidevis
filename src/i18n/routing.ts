import { defineRouting } from 'next-intl/routing';

/**
 * Configuration centrale du routing i18n.
 * Une seule locale pour l'instant (fr), mais la structure
 * est prête pour ajouter d'autres langues plus tard.
 *
 * Pour ajouter l'anglais plus tard :
 * locales: ["fr", "en"],
 * defaultLocale: "en",
 */
export const routing = defineRouting({
  locales: ['fr'],
  defaultLocale: 'fr',
});
