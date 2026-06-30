import { LoginForm } from '@/components/marketing/LoginForm';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Colonne gauche - formulaire */}
      <div className="flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo  */}
          <Logo />

          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-semibold text-text-primary">
              Bon retour {/* 👋 */}
            </h1>
            <p className="text-sm text-text-secondary">
              Connectez-vous à votre espace professionnel
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-text-secondary">
            Pas encore de compte ?{' '}
            <Link
              href={'/register'}
              className="text-text-primary font-medium underline underline-offset-4"
            >
              Commencer gratuitement
            </Link>
          </p>
        </div>
      </div>

      {/* Colonne droite - visuel (desktop uniquement) */}
      <div className="hidden lg:flex bg-brand-dark items-center justify-center p-12">
        <div className="space-y-4 text-center">
          <p className="font-heading text-3xl font-semibold text-brand-primary">
            Vos clients méritent
            <br />
            un devis rapide.
          </p>
          <p className="text-amber-100 text-base max-w-sm">
            Créer votre outil de devis en ligne en quelques minutes et partagez
            à vos clients
          </p>
        </div>
      </div>
    </div>
  );
}
