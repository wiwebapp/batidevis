
/**
 * Configuration centrale de l'application.
 * Toutes les variables d'environnement passent par ici.
 */

const config = {
  env: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY!,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY!,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    },
    app: {
      url: process.env.NEXT_PUBLIC_APP_URL!,
    },
  },
}

export default config;
