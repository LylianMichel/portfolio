# Portfolio — Lylian Michel

Portfolio personnel réalisé avec React, TypeScript, Vite et Tailwind CSS.

L'interface est organisée en deux espaces :

- **Work** : projets, compétences, parcours et présentation ;
- **Chat** : contacts et informations rapides.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Framer Motion

## Lancer le projet

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

## Contenu

Les informations principales sont centralisées dans :

```text
src/data/profile.ts
src/data/projects.ts
src/data/skills.ts
src/data/timeline.ts
```

Les captures de projets sont stockées dans `public/projects/`.

## Configuration

Le portfolio n'utilise actuellement aucune variable d'environnement.

Les fichiers `.env` et variantes locales sont ignorés par Git.
