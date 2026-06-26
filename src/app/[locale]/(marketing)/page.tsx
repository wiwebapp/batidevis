import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div>
        <h1 className="text-4xl font-semibold text-text-primary">
          BatiDevis — Setup OK
        </h1>
        <p className="max-w-md text-center text-base text-text-secondary">
          Si ce texte est en Inter, le titre en Plus Jakarta Sans, et le bouton
          ci-dessous en ambre, le design system est correctement branché.
        </p>
        <div className="flex gap-3">
          <Button variant="primary">Commencer gratuitement</Button>
          <Button variant="outline">En savoir plus</Button>
          <Button variant="ghost">Annuler</Button>
        </div>
      </div>
    </main>
  );
}
