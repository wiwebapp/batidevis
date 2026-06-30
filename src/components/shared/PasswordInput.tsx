'use client';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '../ui/input';

interface PasswordInputProps extends Omit<
  React.ComponentProps<'input'>,
  'type'
> {
  className?: string;
}

/**
 * Champ mot de passe avec bouton pour afficher/masquer la saisie.
 * Wrapper autour du composant Input de Shadcn.
 */
export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
        tabIndex={-1}
        aria-label={
          visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
        }
      >
        {visible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
