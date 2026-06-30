'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="font-heading text-2xl font-semibold text-text-primary">
        Dashboard
      </h1>
      <p className="text-text-secondary">
        Connecté en tant que : <strong>{user?.email}</strong>
      </p>
      <Button variant={'outline'} onClick={handleLogout}>
        Se déconnecter
      </Button>
    </div>
  );
}
