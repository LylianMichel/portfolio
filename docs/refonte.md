# Audit et suivi de la refonte

## TP 01 · État initial

Le clone public fournit `main` à `4dc0a98`, `dev` à `2f7ba53`, quatre branches historiques et `feature/lylianos` à `165510f`. La branche LylianOS contient un bureau, les applications et le gestionnaire de fenêtres. Les modifications de `dev` concernent surtout les workflows, les animations et les données de compétences. La refonte part de `dev`.

Le build de référence et ses 75 tests ont réussi. La version inspectée contenait le concept Matrix, les modes SOURCE / PLAY, quatre projets, un CV PDF, des captures WebP, un prérendu de l’accueil et des configurations Vercel et Netlify. La navigation et le contenu étaient concentrés dans une seule page. Le README indexé publiquement décrivait une version plus ancienne. Les sources du clone prévalent.

La provenance des captures est documentée dans `project-captures.md`. La capture Eco’Répare précède la refonte Laravel. Celle de Yorivai montre AniVault. Les fonctionnalités attribuées aux projets privés proviennent des données historiques du portfolio. Elles demandent une confirmation indépendante avant publication définitive.

## TP 02–06 · Direction et système

La hiérarchie de présentation du [portfolio de Brittany Chiang](https://brittanychiang.com/) a servi de référence pour la lecture rapide. La navigation immersive du [portfolio de Bruno Simon](https://bruno-simon.com/) a été examinée avec Firecrawl pour comparer l’accès au contenu et la place donnée à l’interaction. Les six maquettes exploratoires ont été construites dans [Figma](https://www.figma.com/design/Noq1g5n3MpxB1iYnpTnAtk).

| Proposition | Identité | Lecture et mobile | Coût et maintenance |
| --- | --- | --- | --- |
| Éditorial | Typographie dominante, papier, terre cuite | Accès immédiat au profil, au stage et aux fiches | Faible, HTML statique |
| Bureau | Fenêtres et dock | Navigation à découvrir, espace réduit sur mobile | Élevé, focus et gestion de fenêtres |
| Architecture | Grille visible, blocs structurés | Bonne lecture, grille à replier | Faible |
| Immersion | Profondeur et plans superposés | Orientation et accessibilité plus délicates | Élevé si rendu 3D |
| Application | Barre latérale, inventaire | Fiches très faciles à parcourir, barre à replier | Modéré |
| Cinéma | Séquences et contraste narratif | Effet fort, accès ralenti si transitions longues | Modéré à élevé |

Choix éditorial. Surface papier, accent terre cuite, texte graphite, Space Grotesk variable locale et monogramme LM. Le code définit les tokens, les filtres, les liens, les grilles et les états de focus dans `src/editorial.css`. Figma contient les écrans d’accueil sur ordinateur et mobile, une fiche projet, la page CV, les variables de couleur et un composant de filtre. La bibliothèque de composants reste à compléter.

## Suivi des TP

| TP | Objectif et fichiers | Critère et état |
| --- | --- | --- |
| 01 | Audit du clone et de l’historique | 75 tests et build de référence réussis |
| 02 | Références de lecture | Brittany Chiang et Bruno Simon étudiés |
| 03 | Six directions dans Figma | Six frames créées |
| 04 | Sélection éditoriale | Comparaison documentée ci-dessus |
| 05 | Maquettes Figma | Accueils ordinateur et mobile, fiche Yorivai et CV |
| 06 | Tokens et composants | CSS et variables Figma, bibliothèque partielle |
| 07 | Architecture via `src/prerender.tsx` et `scripts/prerender.mjs` | Dix pages produites |
| 08 | Navigation via `src/App.tsx` | Ancres et URLs par page |
| 09 | Accueil via `src/App.tsx` | Formation, stage et action visibles dans le hero |
| 10 | À propos via `src/App.tsx` | Présentation intégrée au parcours |
| 11 | Index et filtres via `src/App.tsx` | Filtres de groupe et de statut |
| 12 | Études de cas via `src/App.tsx` | Sept pages, informations et captures à compléter selon les sources |
| 13 | Compétences via `src/App.tsx` | Trois domaines associés à des projets |
| 14 | Parcours via `src/App.tsx` | Formation et établissement affichés |
| 15 | CV via `src/App.tsx` et `public/cv-public.*` | Aperçu et téléchargement de la copie publique expurgée |
| 16 | Contact via `src/App.tsx` | E-mail, GitHub et LinkedIn |
| 17 | Animation via `src/editorial.css` | Entrée et survol avec réduction de mouvement |
| 18 | 3D | Explorée dans les maquettes, direction 2D retenue |
| 19 | Responsive via CSS et Playwright | Dix largeurs couvertes par le test |
| 20 | Accessibilité via CSS et Playwright | Saut au contenu, focus et axe, audit manuel complet à faire |
| 21 | SEO via `index.html` et prérendu | Titres, canoniques, sitemap, monogramme et image de partage |
| 22 | Ressources | Captures WebP responsives réutilisées, chargement différé |
| 23 | Tests unitaires | Suite Vitest existante, intégration couverte via navigateur |
| 24 | Tests navigateur | Scénarios Playwright et captures reproductibles |
| 25 | Audit | Vérifications locales, contrôles de production encore nécessaires |
| 26 | Aperçu Vercel | Accès à l’espace demandé |
| 27 | Documentation | README et ce rapport |
| 28 | Préparation à la production | Historique préservé, publication soumise à validation |

## Passes de contrôle

- Technique. Build TypeScript strict, génération statique, Vitest et navigation Playwright.
- Design. Comparaison de la hiérarchie, des espacements et de la palette avec les maquettes. Les captures réelles sont dans `docs/captures`.
- Expérience. L’accueil présente l’identité, la date de stage et les accès aux projets et au contact. Les fiches donnent les éléments techniques disponibles et un point de contact si le code est privé.
- Production. Vérifier les codes HTTP, le cache, le CV, les liens et les mesures sur l’aperçu Vercel lorsque l’accès est disponible.

Sur le build final local, les 75 tests Vitest et les 12 scénarios Playwright ont réussi. Les scénarios couvrent les dix largeurs demandées, les filtres, les fiches, le clavier, axe sur l’accueil, les routes directes et le téléchargement du CV. Le typecheck est inclus dans le build. La page 404 s’affiche sur une adresse inconnue en aperçu local. Son statut HTTP sur Vercel reste à vérifier.

| Lighthouse 26 novembre 2026 | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 100 | 100 | 100 | 100 | 0,77 s | 0 | 22 ms |
| Ordinateur | 100 | 100 | 100 | 100 | 0,35 s | 0 | 0 ms |

Rapports bruts dans `docs/lighthouse`. Ces mesures proviennent de Chrome en laboratoire sur l’accueil local. L’INP sur données réelles et la conformité WCAG complète restent à établir. Les captures de l’accueil sont disponibles à 390 et 1440 px. La revue indépendante a relevé un défaut d’hydratation sur les URL se terminant par `index.html`, corrigé et couvert par Playwright.

Le PDF original conservé dans l’historique contenait un numéro de téléphone, une adresse postale et une date de naissance. La copie distribuée est aplatie après suppression de ces informations. Elle est lisible visuellement et complétée par un résumé HTML. Le PDF lui-même ne possède pas de couche texte.

Le code de Yorivai a pu être consulté via l’accès Git local. Le lien public et le domaine de démonstration n’ont pas été confirmés. Le README public de [FractaLens](https://github.com/LylianMichel/FractaLens) documente la CLI Java et les sorties PNG/GIF. La frise de parcours utilise le brief et les expériences informatiques figurant sur le CV.

## Outils

Catalogue consulté pour les skills demandés de Build Web Apps, Product Design, Figma, Creative Production, Superpowers et Vercel. Les entrées Product Design `get-context`, `research`, `design-qa` et `share` ne figuraient pas au catalogue de cet environnement. Figma a servi à créer les maquettes et les tokens, Context7 à vérifier le prérendu Vite, Firecrawl à examiner une référence, Git à inspecter et cloner GitHub, Vercel à vérifier l’accès, Playwright à tester le site.
