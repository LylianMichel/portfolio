# Portfolio — Lylian Michel

Portfolio personnel réalisé dans le cadre de mon BUT Informatique.

Il présente une sélection de mes projets, les technologies que j'utilise et mon parcours.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Projets présentés

- AniVault — application React / Node.js autour d'un catalogue d'anime
- THE WORLD DEFENCE — tower defense développé avec Godot
- Le Temple — application Laravel pour un institut
- Eco'Répare — site vitrine responsive

## Installation

Prérequis : Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

Les fichiers générés sont placés dans `dist/`.

## Structure

```text
src/
├─ components/
├─ data/
├─ hooks/
├─ sections/
├─ types/
├─ App.tsx
├─ index.css
└─ main.tsx
```

Les informations principales du portfolio sont centralisées dans `src/data/`.

## Configuration

Ce projet ne nécessite actuellement aucune variable d'environnement pour fonctionner.

Les fichiers `.env` et variantes locales sont ignorés par Git afin d'éviter de publier accidentellement des données privées.

Les liens de profil sont définis dans :

```text
src/data/profile.ts
```

Les liens vides ne sont pas affichés sur le site.

## CV

Pour afficher le bouton de téléchargement du CV :

1. ajouter le PDF dans `public/` ;
2. définir son chemin dans `src/data/profile.ts`.

Exemple :

```ts
cvUrl: "/CV-Lylian-Michel.pdf"
```

## Déploiement

Le projet est une application Vite statique. Après :

```bash
npm run build
```

le dossier `dist/` peut être déployé sur Vercel, Netlify ou tout hébergeur de fichiers statiques.

Aucune clé privée ni aucun fichier `.env` n'est nécessaire pour la version actuelle.

## Licence

Projet personnel de portfolio.
