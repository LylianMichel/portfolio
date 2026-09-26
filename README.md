# Portfolio — Lylian Michel

Portfolio professionnel réalisé avec React, TypeScript, Vite, Tailwind CSS, Lucide React et Framer Motion.

## Direction artistique

Le site utilise une interface sombre par défaut inspirée des environnements de développement :
- fond bleu-noir ;
- accents cyan, violet et bleu ;
- cartes translucides très légères ;
- grilles techniques statiques ;
- fenêtres de code et micro-références au développement ;
- animations courtes avec respect de `prefers-reduced-motion`.

Un thème clair est également disponible.

## Structure

```text
portfolio-lylian-michel/
├─ public/
│  ├─ favicon.svg
│  └─ CV-Lylian-Michel-README.txt
├─ src/
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Footer.tsx
│  │  │  └─ Navbar.tsx
│  │  ├─ projects/
│  │  │  ├─ ProjectCard.tsx
│  │  │  └─ ProjectVisual.tsx
│  │  └─ ui/
│  │     ├─ Reveal.tsx
│  │     ├─ SectionHeading.tsx
│  │     └─ SkillIcon.tsx
│  ├─ data/
│  │  ├─ profile.ts
│  │  ├─ projects.ts
│  │  ├─ skills.ts
│  │  └─ timeline.ts
│  ├─ hooks/
│  │  ├─ useActiveSection.ts
│  │  └─ useTheme.ts
│  ├─ sections/
│  │  ├─ About.tsx
│  │  ├─ Contact.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Skills.tsx
│  │  └─ Timeline.tsx
│  ├─ types/
│  │  └─ index.ts
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ .env.example
├─ .gitignore
├─ index.html
├─ package.json
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Installation

Prérequis : Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse indiquée par Vite.

Build de production :

```bash
npm run build
npm run preview
```

## Données à personnaliser

### Profil et liens

Modifier `src/data/profile.ts` :
- e-mail ;
- GitHub ;
- LinkedIn ;
- localisation si nécessaire ;
- URL du CV.

### CV

Ajouter le vrai fichier ici :

```text
public/CV-Lylian-Michel.pdf
```

Le bouton « Télécharger mon CV » fonctionnera automatiquement.

### Projets

Modifier `src/data/projects.ts`.

Chaque projet accepte :
- titre ;
- descriptions ;
- technologies ;
- fonctionnalités ;
- lien GitHub ;
- lien de démo optionnel ;
- couleur visuelle.

### Compétences

Modifier `src/data/skills.ts`.

Les niveaux disponibles sont :
- `Débutant`
- `Intermédiaire`
- `En progression`

### Parcours

Modifier `src/data/timeline.ts`.

## Formulaire de contact

Le formulaire valide les champs côté client.

Il ne simule jamais l'envoi. Sans service configuré, il affiche clairement que le formulaire n'est pas connecté.

Pour Formspree :

1. Copier `.env.example` vers `.env`.
2. Ajouter votre endpoint :

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

3. Relancer Vite.

La structure peut être adaptée à EmailJS ou à votre propre API.

## Dépôt GitHub

Dépôt prévu :

```text
https://github.com/LylianMichel/portfolio.git
```

Pour publier le projet dans un dépôt vide :

```bash
git init
git branch -M main
git remote add origin https://github.com/LylianMichel/portfolio.git
git add .
git commit -m "feat: create professional portfolio"
git push -u origin main
```

Si le dépôt local possède déjà un remote `origin` :

```bash
git remote set-url origin https://github.com/LylianMichel/portfolio.git
```
