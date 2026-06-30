'use client';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useState } from 'react';
import { PasswordInput } from '../shared/PasswordInput';
import { Button } from '../ui/button';
import { GoogleIcon } from '../ui/google-icon';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

export const RegisterForm = () => {
  const supabase = createClient();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Inscription email/password
  const handleEmailRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error(error);
      setError('Une erreur est survenue. Vérifiez vos informations.');
      setLoading(false);
      return;
    }

    // Supabase envoie un email de confirmation
    // On affiche un message de succès au lieu de rediriger
    setSuccess(true);
    setLoading(false);
  };

  // Inscription Google OAuth
  const handleGoogleRegister = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError('Erreur lors de la connexion avec Google.');
      setLoading(false);
    }
  };

  // État succès — email de confirmation envoyé
  if (success) {
    return (
      <div className="space-y-4 text-center py-4">
        <div className="w-12 h-12 rounded-full bg-status-success-bg flex items-center justify-center mx-auto">
          <span className="text-2xl">✉️</span>
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">
            Vérifiez votre email
          </h2>
          <p className="text-sm text-text-secondary">
            On a envoyé un lien de confirmation à{' '}
            <span className="font-medium text-text-primary">{email}</span>.
            Cliquer sur le lien pour activer votre compte.
          </p>
        </div>
        <p className="text-xs text-text-tertiary">
          Vous ne trouvez pas l&apos;email ? Vérifiez vos spams.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bouton Google  */}
      <Button
        variant={'outline'}
        size={'lg'}
        className="w-full"
        onClick={handleGoogleRegister}
        disabled={loading}
      >
        <GoogleIcon />
        Continuer avec Google
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-text-tertiary">ou</span>
        <Separator className="flex-1" />
      </div>

      {/* Formulaire email/password  */}
      <form onSubmit={handleEmailRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={8}
          />
          <p className="text-xs text-text-tertiary">Minimum 8 caractères</p>
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
          {loading ? 'Création en cours...' : 'Créer mon compte gratuit'}
        </Button>

        <p className="text-xs text-text-tertiary text-center">
          En créant un compte, vous acceptez nos{' '}
          <Link href={'/cgu'} className="underline underline-offset-4">
            CGU
          </Link>{' '}
          et notre{' '}
          <Link
            href={'/politique-de-confidentialite'}
            className="underline underline-offset-4"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </form>
    </div>
  );
};
