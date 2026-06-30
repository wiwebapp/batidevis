'use client';

import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
}

/**
 * Hook pour accéder à l'utilisateur connecté côté client.
 * Écoute les changements de session (connexion, déconnexion, refresh token).
 *
 * Usage :
 * const { user, loading } = useAuth();
 * if (loading) return <Spinner />
 * if (!user) returnp>Non connecté</p>;
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Récupère la session actuelle au montage du composant
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Écoute les changements de session (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Nettoyage à la destruction du composant
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
