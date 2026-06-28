# BatiDevis

SaaS en marque blanche permettant aux professionnels du bâtiment de proposer un outil de devis approximatif en ligne à leurs clients.

## Stack technique

- **Frontend** : Next.js 16 (App Router) + Tailwind CSS v4 + Shadcn/ui
- **Auth + BDD + Storage** : Supabase
- **Emails** : Resend
- **PDF** : React PDF
- **Paiements** : Stripe
- **Déploiement** : Vercel
- **i18n** : next-intl (français au lancement)

## Démarrage en local

### Prérequis

- Node.js 18+
- npm
- Un projet Supabase créé sur [supabase.com](https://supabase.com)

### Installation

```bash
git clone https://github.com/TON_USERNAME/batidevis.git
cd batidevis
npm install
```

### Variables d'environnement

```bash
cp .env.example .env.local
```

Remplis les valeurs dans `.env.local` — voir `.env.example` pour la liste complète.

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Structure du projet

src/

├── app/

│   └── [locale]

│       ├── (marketing)

├── app/

│   └── [locale]/

│       ├── (marketing)/     # Pages publiques (accueil, pricing, login...)

│       ├── (dashboard)/     # Espace privé du pro (auth requise)

│       └── [slug]/          # Espace client public du pro

├── components/

│   ├── ui/                  # Composants Shadcn/ui

│   ├── marketing/           # Composants pages marketing

│   ├── dashboard/           # Composants dashboard

│   ├── client/              # Composants espace client [slug]

│   └── shared/              # Composants partagés

├── lib/

│   ├── supabase/            # Clients Supabase (browser, server, middleware)

│   ├── config.ts            # Variables d'environnement centralisées

│   ├── constants.ts         # Constantes métier

│   └── utils.ts             # Utilitaires (cn...)

├── hooks/                   # Hooks React custom

├── i18n/                    # Configuration next-intl

├── types/                   # Types TypeScript globaux

## Commandes disponibles

| Commande        | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Serveur de développement (Turbopack) |
| `npm run build` | Build de production                  |
| `npm run start` | Serveur de production                |
| `npm run lint`  | Vérification ESLint                  |

### Conventions

- Fichiers, dossiers, variables, fonctions → **anglais**
- Contenu affiché à l'utilisateur → **français**
- Commentaires dans le code → **français**
- Pages et layouts Next.js → `export default function`
- Composants réutilisables → `const X = () =>`

## Roadmap

Voir la documentation complète du projet dans `generer_devis_approximatif.md`.
