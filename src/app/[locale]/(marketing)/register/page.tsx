import { RegisterForm } from '@/components/marketing/RegisterForm';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Colonne gauche - formulaire  */}
      <div className="flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo  */}
          <Logo />

          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-semibold text-text-primary">
              Créer votre compte {/* 🚀 */}
            </h1>
            <p className="text-sm text-text-secondary">
              14 jours d&apos;accès complet . Sans carte bancaire
            </p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-text-secondary">
            Déjà un compte ?{' '}
            <Link
              href={'/login'}
              className="text-text-primary font-medium underline underline-offset-4"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Colonne droite - visuel (desktop uniquement) */}
      <div className="hidden lg:flex bg-brand-dark items-center justify-center p-12">
        <div className="space-y-4 text-center">
          <p className="font-heading text-3xl font-semibold text-brand-primary">
            Prêt en quelques minutes.
            <br />
            Gratuit pour toujours.
          </p>
          <p className="text-amber-100 text-base max-w-sm">
            Rejoignez les pros du bâtiment qui proposent déjà des devis en ligne
            à leurs clients
          </p>
        </div>
      </div>
    </div>
  );
}
