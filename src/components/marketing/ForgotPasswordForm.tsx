'use client';
import { createClient } from '@/lib/supabase/client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const ForgotPasswordForm = () => {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/parametres`,
    });

    if (error) {
      setError('Une erreur est survenue. Vérifiez votre email');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  // État succès — email envoyé
  if (success) {
    return (
      <div className="space-y-4 text-center py-4">
        <div className="w-12 h-12 rounded-full bg-status-success-bg flex items-center justify-center mx-auto">
          <span className="text-2xl">✉️</span>
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">
            Email envoyé
          </h2>
          <p className="text-sm text-text-secondary">
            On a envoyé un lien de réinitialisation à{' '}
            <span className="font-medium text-text-primary">{email}</span>. Le
            lien est valable 24 heures.
          </p>
        </div>
        <p className="text-xs text-text-tertiary">
          {' '}
          Vous ne trouvez pas l&apos;email ? Vérifiez vos spams.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
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

      {error && <p className="text-sm text-status-error">{error}</p>}

      <Button
        type="submit"
        variant={'primary'}
        size={'lg'}
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Envoie en cours...' : 'Envoyer le lien'}
      </Button>
    </form>
  );
};
