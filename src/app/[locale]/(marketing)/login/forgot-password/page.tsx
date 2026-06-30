import { ForgotPasswordForm } from '@/components/marketing/ForgotPasswordForm';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12">
      <div className="w-full max-w-sm space-y-8">
        <Logo />

        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-semibold text-text-primary">
            Mot de passe oublié
          </h1>
          <p className="text-sm text-text-secondary">
            Entrez votre email et on vous envoie un lien de réinitialisation.
          </p>
        </div>

        <ForgotPasswordForm />

        <Link
          href={'/login'}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
        >
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
