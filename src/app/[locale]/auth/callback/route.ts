import config from '@/lib/config';
import { createClient } from '@/lib/supabase/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/dashboard';

  const supabase = await createClient();

  // Cas 1 — flux OAuth (Google) : ?code=...
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Connexion réussi -> redirige vers le dashboard
      return NextResponse.redirect(new URL(next, config.env.app.url));
    }
  }

  // Cas 2 — confirmation d'email ou reset password : ?token_hash=...&type=...
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (!error) {
      return NextResponse.redirect(new URL(next, config.env.app.url));
    }
  }

  // Échec -> redirige vers login avec un message d'erreur
  return NextResponse.redirect(
    new URL('/login?error=auth_callback_failed', config.env.app.url),
  );
}
