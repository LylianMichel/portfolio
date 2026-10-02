---
version: alpha
name: Portfolio Lylian Michel
description: Portfolio de développeur, circuits verts sur charbon et réalisations au premier plan.
colors:
  background: "#151516"
  panel: "#191d1b"
  border: "#303b35"
  primary: "#8cdbad"
  text: "#f2f2f2"
  muted: "#b9b9b9"
typography:
  display:
    fontFamily: 'Bahnschrift, Segoe UI, system-ui, sans-serif'
  sans:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
  mono:
    fontFamily: 'Cascadia Code, Consolas, ui-monospace, monospace'
rounded:
  panel: 14px
  control: 8px
spacing:
  section-gap: 52px
  page-max: 72rem
components:
  button: {}
  project: {}
  dialog: {}
---

# Portfolio Lylian Michel Design System

## Overview

Portfolio personnel en français destiné aux recruteurs et aux visiteurs souhaitant
consulter les projets et contacter Lylian. Registre : site de présentation, pas un
tableau de bord. La recherche de stage, les dates et les descriptions viennent des
sections existantes. La demande du 2 octobre 2026 autorise le fond fourni et
l'amélioration du design avec Frontend Design Premium.

Signature : le circuit imprimé fourni par l'utilisateur, atténué par un voile
sombre à 68 % pour préserver la lecture. Les captures réelles restent prioritaires.
Éviter le terminal fictif, les statistiques inventées et les animations ambiantes.

Source canonique : variables CSS de `src/index.css`, puis `src/design.css`, importées
dans cet ordre par `src/main.tsx`. Ce document reflète les valeurs ; il ne génère
pas de code. `src/assets/circuit-pattern.svg` conserve le motif original.

## Colors

`background` → `--page-bg`; `panel` → `--panel-bg`; `border` → `--panel-border`;
`primary` → `--accent`; `text` → `--text`; `muted` → `--muted-strong`.
Les composants partagés consomment ces variables. Actions primaires vertes avec
texte `--accent-ink` (#102319), survol `--accent-hover` (#b1e9c7).
Le thème clair conserve son fond #f2f1ed sans motif, ses panneaux #fafbf8,
ses bordures #d4ddd4 et son accent #267a53 avec texte blanc.

## Typography

Titres : `--font-display`, famille locale sans téléchargement, graisse 600.
Texte courant : pile existante, 15–16 px avec interligne 1.7–1.8.
Libellés courts et technologies : `--font-utility`, 11–12 px.
Le nom utilise une taille fluide ; aucune fonte distante ne provoque de décalage.

## Layout

Navigation latérale existante de 252 px à partir de 1024 px ; en dessous,
en-tête mobile. Contenu limité à 72rem. Hero avec texte et encadré stage de 280 px
à partir de 1100 px ; empilement en dessous. Projets en cartes avec image et texte,
empilés sous 768 px. La présentation précède le contact final.
Les images réservent leur ratio. La gouttière de défilement reste stable.

## Elevation & Depth

Le circuit est le seul fond décoratif. Cartes projets, stage et contact opaques,
bordures sobres, sans halos. Les modales utilisent le composant Modal existant
et la couche native dialog. Navigation latérale opaque.

## Shapes

Panneaux `--radius-panel` de 14 px ; boutons et images `--radius-control` de 8 px.
Le premier projet reçoit un filet d'accent : sa position et son traitement
signalent une réalisation à découvrir en priorité.

## Components

Les boutons primaires, secondaires, cartes et liens partagent leurs styles entre
Portfolio et Contact. Survol visible, focus vert de 2 px, déplacement pressé de
1 px pour les boutons principaux. Les liens restent des liens et les actions
des boutons. Les icônes Lucide accompagnent des libellés ou des noms accessibles.
Galeries, disclosures de projet et paramètres conservent leurs interactions.
Les modales doivent fermer avec Échap et restituer le focus au déclencheur.

Le défilement utilise `--scroll-thumb`, `--scroll-hover`, `--scroll-active` et
`--page-bg`. Les couleurs forcées reviennent au défilement natif et suppriment
le motif. Le mouvement réduit désactive transitions et animations décoratives.

## Do's and Don'ts

- Garder les projets et la disponibilité de stage immédiatement compréhensibles.
- Vérifier les thèmes sombre et clair ainsi qu'une largeur mobile après modification.
- Garder le SVG fourni intact ; ajuster la discrétion via le voile CSS.
- Ne pas transformer toutes les sections en panneaux ni ajouter de faux indicateurs.
- Ne pas publier le site ou prétendre avoir utilisé Themely sans outil disponible.
