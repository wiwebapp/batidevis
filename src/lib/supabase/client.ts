import { createBrowserClient } from '@supabase/ssr';
import config from "@/lib/config";

/**
 * Client Supabase pour les Client Components (navigateur).
 * Utilise la clé anon publique.
 * À utiliser uniquement dans les fichiers avec "use client".
 */
export function createClient() {
  return createBrowserClient(config.env.supabase.url, config.env.supabase.anonKey);
}