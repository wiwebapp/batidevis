import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-sm bg-brand-dark flex items-center justify-center">
        <span className="text-brand-primary font-bold text-sm">B</span>
      </div>
      <div className="font-heading font-semibold text-text-primary">
        Bati<span className="text-brand-primary">Devis</span>
      </div>
    </Link>
  );
};
