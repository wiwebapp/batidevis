import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Double sécurité: si jamais le proxy ne l'a pas déjà fait,
  // On bloque l'accès au dashboard ici aussi.
  if (!user) {
    redirect('/login');
  }
  return <>{children}</>;
}
