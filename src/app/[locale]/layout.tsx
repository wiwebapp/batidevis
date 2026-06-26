import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['600'],
});

export const metadata: Metadata = {
  title: 'BatiDevis — Devis approximatifs en ligne pour les pros du bâtiment',
  description:
    'BatiDevis permet aux professionnels du bâtiment de proposer à leurs clients un outil de devis approximatif en ligne, en marque blanche.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Vérifie que la locale est supportée
  if (!routing.locales.includes(locale as 'fr')) {
    notFound();
  }

  // Charge les messages pour le provider client
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(
        'h-full antialiased',
        inter.variable,
        plusJakartaSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
