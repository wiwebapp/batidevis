'use client';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PasswordInput } from '../shared/PasswordInput';
import { Button } from '../ui/button';
import { GoogleIcon } from '../ui/google-icon';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Page de destination après connexion (par défaut /dashboard)
  const next = searchParams.get('next') ?? '/dashboard';

  // Connexion email/password
  const handleEmailLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  };

  // Connexion Google OAuth
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setError('Erreur lors de la connexion avec google.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bouton Google  */}
      <Button
        variant={'outline'}
        size={'lg'}
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <GoogleIcon />
        Continuer avec Google
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-text-primary">ou</span>
        <Separator className="flex-1"></Separator>
      </div>

      {/* Formulaire email/password */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-1 5">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="space-1 5">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Mot de passe</label>
            <Link
              href={'/login/forgot-password'}
              className="text-xs text-text-secondary hover:text-text-primary underline underline-offset-4"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Message d'erreur  */}
        {error && <p className="text-sm text-status-error">{error}</p>}

        <Button
          type="submit"
          variant={'primary'}
          size={'lg'}
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
};
