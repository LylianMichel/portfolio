# Portfolio — Lylian Michel

Portfolio personnel réalisé avec React, TypeScript, Vite et Tailwind CSS.

L'interface est organisée en deux espaces :

- **Work** : projets, compétences, parcours et présentation ;
- **Chat** : contact, GitHub, LinkedIn et informations sur mon stage 2027.

## Prérequis

- Node.js 22 recommandé
- npm

## Installation

```bash
npm install
npm run dev
```

Le serveur local est généralement disponible sur :

```text
http://localhost:5173/
```

## Vérifier la version de production

```bash
npm run build
npm run preview
```

Le build final est généré dans `dist/`.

Pour tester le site depuis un téléphone ou un autre appareil du réseau local :

```bash
npm run preview:network
```

## Déploiement

Le projet est une application Vite statique et ne nécessite aucune variable d'environnement.

### Vercel

1. importer le dépôt GitHub ;
2. Framework Preset : **Vite** ;
3. Build Command : `npm run build` ;
4. Output Directory : `dist`.

Le fichier `vercel.json` contient déjà les réglages principaux.

### Netlify

Le fichier `netlify.toml` configure automatiquement :

- la commande de build ;
- le dossier `dist` ;
- Node.js 22 ;
- quelques en-têtes de sécurité.

### GitHub Pages

Le projet utilise une base relative dans Vite, il peut donc être publié dans un sous-dossier comme `/portfolio/`.

Il suffit de construire le site puis de publier le contenu de `dist/` avec GitHub Pages ou une action dédiée.

## Structure utile

```text
src/
├─ components/
├─ data/
├─ sections/
├─ types/
├─ App.tsx
└─ index.css

public/
├─ projects/
├─ favicon.svg
├─ project-fallback.svg
└─ robots.txt
```

Les informations du portfolio sont principalement dans :

```text
src/data/profile.ts
src/data/projects.ts
src/data/skills.ts
src/data/timeline.ts
```

## Sécurité et configuration

Les fichiers suivants ne doivent pas être versionnés et sont déjà ignorés :

- `.env`
- `.env.*`
- `node_modules/`
- `dist/`
- fichiers IDE et logs

Le portfolio actuel n'a besoin d'aucun secret ni d'aucune clé API.

## Avant de publier

Vérifier simplement :

```bash
npm install
npm run build
npm run preview
```

Puis tester Work, Chat, GitHub, LinkedIn, e-mail et les quatre couleurs d'accent.
