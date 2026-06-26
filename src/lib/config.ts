
/**
 * Configuration centrale de l'application.
 * Toutes les variables d'environnement passent par ici.
 *
 * Mode lazy : les variables ne sont lues qu'au moment de leur utilisation,
 * pas au démarrage. Ça permet de développer sans avoir toutes les clés
 * configurées (Stripe, Resend...).
 *
 * Avant le lancement en production, on passera en mode strict.
 */
function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Variable d'environnement manquante : ${key}\n` +
        `Vérifie ton fichier .env.local`,
    );
  }
  return value;
}

const config = {
  env: {
    supabase: {
      get url() {
        return getEnv('NEXT_PUBLIC_SUPABASE_URL');
      },
      get anonKey() {
        return getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
      },
      get serviceRoleKey() {
        return getEnv('SUPABASE_SERVICE_ROLE_KEY');
      },
    },
    resend: {
      get apiKey() {
        return getEnv('RESEND_API_KEY');
      },
    },
    stripe: {
      get secretKey() {
        return getEnv('STRIPE_SECRET_KEY');
      },
      get webhookSecret() {
        return getEnv('STRIPE_WEBHOOK_SECRET');
      },
      get publishableKey() {
        return getEnv('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
      },
    },
    app: {
      get url() {
        return getEnv('NEXT_PUBLIC_APP_URL');
      },
    },
  },
} as const; // "as const" → TypeScript traite les valeurs comme des libéraux immuables

export default config;
