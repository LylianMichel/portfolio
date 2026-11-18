# Inventaire de la migration LylianOS

Les entrées suivantes proviennent de la lecture des fichiers et de leurs imports.

## Ancienne architecture analysée

```text
src/App.tsx
src/assets/circuit-pattern.svg
src/components/layout/Navbar.tsx
src/components/projects/MetaBar.tsx
src/components/projects/ProjectCard.tsx
src/components/projects/ProjectCarousel.tsx
src/components/projects/ProjectFrame.tsx
src/components/ui/ActionButton.tsx
src/components/ui/EmailCopy.tsx
src/components/ui/MagneticAction.tsx
src/components/ui/Marquee.tsx
src/components/ui/MatrixRain.tsx
src/components/ui/Modal.tsx
src/components/ui/NameWave.tsx
src/components/ui/PixelIcon.tsx
src/components/ui/SourcePlayToggle.tsx
src/components/ui/Tag.tsx
src/data/profile.ts
src/data/projectImageSizes.json
src/data/projects.ts
src/data/skills.ts
src/data/timeline.ts
src/hooks/useActiveSection.ts
src/hooks/useMatrixSectionDecode.ts
src/hooks/useStaggerReveal.ts
src/hooks/useTheme.ts
src/main.tsx
src/os/Desktop.tsx
src/os/apps/AboutApp.tsx
src/os/apps/CVApp.tsx
src/os/components/DesktopIcon.tsx
src/os/components/Dock.tsx
src/os/components/TopBar.tsx
src/os/components/Wallpaper.tsx
src/os/components/Window.tsx
src/os/components/WindowManager.tsx
src/os/config/applications.ts
src/os/config/wallpapers.test.ts
src/os/config/wallpapers.ts
src/os/hooks/useClock.ts
src/os/hooks/useWallpaper.ts
src/os/hooks/useWindowManager.ts
src/os/os.css
src/os/types.ts
src/os/windowState.test.ts
src/os/windowState.ts
src/prerender.tsx
src/sections/About.tsx
src/sections/Contact.tsx
src/sections/Hero.tsx
src/sections/Portrait.tsx
src/sections/Projects.tsx
src/sections/Timeline.tsx
src/sections/WorkContact.tsx
src/styles.css
src/types/index.ts
src/utils/contrast.test.ts
src/utils/copyEmail.ts
src/utils/creative.ts
src/utils/filterProjects.ts
src/utils/interaction.test.ts
src/utils/keyboard.ts
src/utils/preferences.ts
src/utils/projectDecisions.ts
src/utils/rainPolicy.ts
src/vite-env.d.ts
```

## Architecture active complète

```text
src/
  App.tsx
  main.tsx
  os/
    apps/
      AboutApp.tsx
      CVApp.tsx
    components/
      DesktopIcon.tsx
      Dock.tsx
      projects/
        ProjectCarousel.tsx
      TopBar.tsx
      ui/
        Modal.tsx
        PixelIcon.tsx
      Wallpaper.tsx
      Window.tsx
    config/
      applications.ts
      wallpapers.test.ts
      wallpapers.ts
    data/
      portfolio.test.ts
      profile.ts
      projectImageSizes.json
      projects.ts
      skills.ts
      timeline.ts
    Desktop.tsx
    hooks/
      useClock.ts
      useWallpaper.ts
      useWindowManager.ts
    os.css
    portfolioTypes.ts
    types.ts
    utils/
      copyEmail.ts
      filterProjects.ts
      projectDecisions.ts
    windowState.test.ts
    windowState.ts
  prerender.tsx
  styles.css
  vite-env.d.ts
```

## Déplacements

| Ancien chemin | Nouveau chemin |
|---|---|
| `src/assets/circuit-pattern.svg` | `archive/portfolio-v1/assets/circuit-pattern.svg` |
| `src/components/projects/MetaBar.tsx` | `archive/portfolio-v1/components/projects/MetaBar.tsx` |
| `src/components/projects/ProjectCard.tsx` | `archive/portfolio-v1/components/projects/ProjectCard.tsx` |
| `src/components/projects/ProjectCarousel.tsx` | `src/os/components/projects/ProjectCarousel.tsx` |
| `src/components/projects/ProjectFrame.tsx` | `archive/portfolio-v1/components/projects/ProjectFrame.tsx` |
| `src/components/ui/ActionButton.tsx` | `archive/portfolio-v1/components/ui/ActionButton.tsx` |
| `src/components/ui/EmailCopy.tsx` | `archive/portfolio-v1/components/ui/EmailCopy.tsx` |
| `src/components/ui/MagneticAction.tsx` | `archive/portfolio-v1/components/ui/MagneticAction.tsx` |
| `src/components/ui/Modal.tsx` | `src/os/components/ui/Modal.tsx` |
| `src/components/ui/PixelIcon.tsx` | `src/os/components/ui/PixelIcon.tsx` |
| `src/components/ui/Tag.tsx` | `archive/portfolio-v1/components/ui/Tag.tsx` |
| `src/data/profile.ts` | `src/os/data/profile.ts` |
| `src/data/projectImageSizes.json` | `src/os/data/projectImageSizes.json` |
| `src/data/projects.ts` | `src/os/data/projects.ts` |
| `src/data/skills.ts` | `src/os/data/skills.ts` |
| `src/data/timeline.ts` | `src/os/data/timeline.ts` |
| `src/hooks/useStaggerReveal.ts` | `archive/portfolio-v1/hooks/useStaggerReveal.ts` |
| `src/sections/About.tsx` | `archive/portfolio-v1/sections/About.tsx` |
| `src/sections/Contact.tsx` | `archive/portfolio-v1/sections/Contact.tsx` |
| `src/sections/Portrait.tsx` | `archive/portfolio-v1/sections/Portrait.tsx` |
| `src/sections/Projects.tsx` | `archive/portfolio-v1/sections/Projects.tsx` |
| `src/sections/Timeline.tsx` | `archive/portfolio-v1/sections/Timeline.tsx` |
| `src/sections/WorkContact.tsx` | `archive/portfolio-v1/sections/WorkContact.tsx` |
| `src/styles.css` | `archive/portfolio-v1/styles.css` |
| `src/types/index.ts` | `src/os/portfolioTypes.ts` |
| `src/utils/contrast.test.ts` | `archive/portfolio-v1/utils/contrast.test.ts` |
| `src/utils/copyEmail.ts` | `src/os/utils/copyEmail.ts` |
| `src/utils/creative.ts` | `archive/portfolio-v1/utils/creative.ts` |
| `src/utils/filterProjects.ts` | `src/os/utils/filterProjects.ts` |
| `src/utils/interaction.test.ts` | `archive/portfolio-v1/utils/interaction.test.ts` |
| `src/utils/keyboard.ts` | `archive/portfolio-v1/utils/keyboard.ts` |
| `src/utils/preferences.ts` | `archive/portfolio-v1/utils/preferences.ts` |
| `src/utils/projectDecisions.ts` | `src/os/utils/projectDecisions.ts` |
| `src/utils/rainPolicy.ts` | `archive/portfolio-v1/utils/rainPolicy.ts` |

Déplacements complémentaires : `DESIGN.md` → `archive/portfolio-v1/DESIGN.md`, `scripts/visual-audit.mjs` → `archive/portfolio-v1/tooling/visual-audit.mjs`, `scripts/generate-og.mjs` → `archive/portfolio-v1/tooling/generate-og.mjs`. Les nouveaux DESIGN.md et visual-audit.mjs concernent LylianOS.

## Fichiers conservés à leur emplacement

- `src/App.tsx`
- `src/main.tsx`
- `src/os/apps/AboutApp.tsx`
- `src/os/apps/CVApp.tsx`
- `src/os/components/DesktopIcon.tsx`
- `src/os/components/Dock.tsx`
- `src/os/components/TopBar.tsx`
- `src/os/components/Wallpaper.tsx`
- `src/os/components/Window.tsx`
- `src/os/config/applications.ts`
- `src/os/config/wallpapers.test.ts`
- `src/os/config/wallpapers.ts`
- `src/os/Desktop.tsx`
- `src/os/hooks/useClock.ts`
- `src/os/hooks/useWallpaper.ts`
- `src/os/hooks/useWindowManager.ts`
- `src/os/os.css`
- `src/os/types.ts`
- `src/os/windowState.test.ts`
- `src/os/windowState.ts`
- `src/prerender.tsx`
- `src/vite-env.d.ts`

Tous les fichiers de `public/` sont conservés, à leur emplacement et avec les mêmes octets (voir preservation-checks.json). Les fichiers de build, de prérendu et de déploiement restent présents.

## Suppressions vérifiées

- `src/components/layout/Navbar.tsx`
- `src/components/ui/NameWave.tsx`
- `src/components/ui/Marquee.tsx`
- `src/components/ui/MatrixRain.tsx`
- `src/components/ui/SourcePlayToggle.tsx`
- `src/hooks/useTheme.ts`
- `src/hooks/useMatrixSectionDecode.ts`
- `src/hooks/useActiveSection.ts`
- `src/sections/Hero.tsx`
- `src/os/components/WindowManager.tsx`

Navbar et useActiveSection dépendaient de la navigation de la page défilante ; Hero, NameWave et Marquee du précédent écran d’accueil ; MatrixRain, useMatrixSectionDecode, useTheme et SourcePlayToggle de l’ancienne personnalisation. Aucun consommateur conservé ne les importe. WindowManager.tsx était vide et sans import : le hook useWindowManager et Desktop gèrent déjà les fenêtres. SourcePlayToggle et useActiveSection avaient été restaurés temporairement depuis origin/dev pour diagnostiquer le build avant migration.

## Imports corrigés

| Fichier final | Ancien import | Nouvel import |
|---|---|---|
| `archive/portfolio-v1/components/projects/MetaBar.tsx` | `../../types` | `../../../../src/os/portfolioTypes` |
| `archive/portfolio-v1/components/projects/ProjectCard.tsx` | `../../utils/projectDecisions` | `../../../../src/os/utils/projectDecisions` |
| `archive/portfolio-v1/components/projects/ProjectCard.tsx` | `../../data/profile` | `../../../../src/os/data/profile` |
| `archive/portfolio-v1/components/projects/ProjectCard.tsx` | `./ProjectCarousel` | `../../../../src/os/components/projects/ProjectCarousel` |
| `archive/portfolio-v1/components/projects/ProjectCard.tsx` | `../../types` | `../../../../src/os/portfolioTypes` |
| `src/os/components/projects/ProjectCarousel.tsx` | `../../types` | `../../portfolioTypes` |
| `archive/portfolio-v1/components/ui/EmailCopy.tsx` | `../../utils/copyEmail` | `../../../../src/os/utils/copyEmail` |
| `archive/portfolio-v1/components/ui/EmailCopy.tsx` | `../../data/profile` | `../../../../src/os/data/profile` |
| `src/os/data/profile.ts` | `../types` | `../portfolioTypes` |
| `src/os/data/projects.ts` | `../types` | `../portfolioTypes` |
| `src/os/data/skills.ts` | `../types` | `../portfolioTypes` |
| `src/os/data/timeline.ts` | `../types` | `../portfolioTypes` |
| `src/os/apps/AboutApp.tsx` | `../../data/profile` | `../data/profile` |
| `archive/portfolio-v1/sections/About.tsx` | `../components/ui/PixelIcon` | `../../../src/os/components/ui/PixelIcon` |
| `archive/portfolio-v1/sections/About.tsx` | `../data/profile` | `../../../src/os/data/profile` |
| `archive/portfolio-v1/sections/Contact.tsx` | `../data/profile` | `../../../src/os/data/profile` |
| `archive/portfolio-v1/sections/Portrait.tsx` | `../data/profile` | `../../../src/os/data/profile` |
| `archive/portfolio-v1/sections/Projects.tsx` | `../utils/filterProjects` | `../../../src/os/utils/filterProjects` |
| `archive/portfolio-v1/sections/Projects.tsx` | `../data/projects` | `../../../src/os/data/projects` |
| `archive/portfolio-v1/sections/Timeline.tsx` | `../data/timeline` | `../../../src/os/data/timeline` |
| `archive/portfolio-v1/sections/WorkContact.tsx` | `../data/profile` | `../../../src/os/data/profile` |
| `src/os/utils/filterProjects.ts` | `../types` | `../portfolioTypes` |
| `archive/portfolio-v1/utils/interaction.test.ts` | `./filterProjects` | `../../../src/os/utils/filterProjects` |
| `archive/portfolio-v1/utils/interaction.test.ts` | `./copyEmail` | `../../../src/os/utils/copyEmail` |

CVApp utilise également `../data/profile` pour son PDF. Les chemins des scripts de synchronisation et du workflow capture-ecorepare ciblent désormais `src/os/data`. La base globale est importée une seule fois dans main, os.css par Desktop.

## Références temporaires hors de src

```text
archive/portfolio-v1/
  assets/
    circuit-pattern.svg
  components/
    projects/
      MetaBar.tsx
      ProjectCard.tsx
      ProjectFrame.tsx
    ui/
      ActionButton.tsx
      EmailCopy.tsx
      MagneticAction.tsx
      Tag.tsx
  DESIGN.md
  hooks/
    useStaggerReveal.ts
  README-original.md
  README.md
  sections/
    About.tsx
    Contact.tsx
    Portrait.tsx
    Projects.tsx
    Timeline.tsx
    WorkContact.tsx
  styles.css
  tooling/
    generate-og.mjs
    visual-audit.mjs
  utils/
    contrast.test.ts
    creative.ts
    interaction.test.ts
    keyboard.ts
    preferences.ts
    rainPolicy.ts
```

Ces modèles ne sont pas importés par LylianOS. Ils conservent les textes de présentation, contact, parcours et projets pour les prochains TP. Ils dépendent encore des classes lm-* historiques et demandent une adaptation avant réutilisation. Les tests historiques restent exécutés et les TS/TSX archivés restent compilés : aucune exclusion ne masque leurs erreurs. Les effets Matrix ne sont pas transférés à os ; seuls leurs anciens utilitaires de test restent archivés.

## Reprendre le TP 8

L’inventaire ci-dessus a été établi juste avant la migration, après les premières corrections de l’audit.

Le composant à développer reste `src/os/apps/AboutApp.tsx`. Son unique changement est l’import de la nouvelle source de données. Les types système restent dans `src/os/types.ts`, les types métier dans `src/os/portfolioTypes.ts`.

Importer les données avec `import { profile, socials } from "../data/profile";` depuis une application. Le fichier n’a pas d’export default. `speciality?: string` est prévu dans le type Profile et absent des données tant que son intitulé n’est pas confirmé.

### Structure exacte et exports de profile.ts

```ts
import type { Profile, SocialLink } from "../portfolioTypes";

export const profile: Profile = {
  name: "Lylian Michel",
  role: "Étudiant en BUT Informatique",
  tagline: "Je développe des applications web, des outils logiciels et des jeux.",
  location: "Hauts-de-France, France",
  email: "lylianmichel@gmail.com",
  github: "https://github.com/LylianMichel",
  linkedin: "https://www.linkedin.com/in/lylian-michel-bb960a3ab/",
  cvUrl: `${import.meta.env.BASE_URL}CV-LylianMichel.pdf`,
  photo: `${import.meta.env.BASE_URL}portrait-lylian-michel.png`,
  education: "BUT Informatique, deuxième année",
  school: "IUT de Lens",
  // La spécialité reste facultative : aucun intitulé de parcours n'a été confirmé.
  description: "Je suis en deuxième année de BUT Informatique à l’IUT de Lens et je vis à Barlin, dans le Pas-de-Calais. Je construis mes projets en parallèle des cours, avec l’envie de progresser en développement web et logiciel.",
  internship: {
    startDate: "2027-04-12",
    durationWeeks: 8,
  },
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "E-mail", href: `mailto:${profile.email}` },
];

```

### Fichiers du dépôt modifiés, supprimés ou ajoutés

Le statut D suivi d’un nouveau chemin dans le tableau de migration correspond à un déplacement ; aucune donnée publique n’est supprimée. Cette liste inclut aussi les modifications locales du TP 7 déjà présentes au départ. Les fichiers de capture ignorés ne sont pas destinés au commit.

```text
 M .github/workflows/capture-ecorepare.yml
 M .github/workflows/visual-audit.yml
 M .gitignore
 M DESIGN.md
 M README.md
 M index.html
 M package.json
 D scripts/generate-og.mjs
 M scripts/prerender.mjs
 M scripts/sync-ecorepare-screens.mjs
 M scripts/verify-performance.mjs
 M scripts/visual-audit.mjs
 D src/assets/circuit-pattern.svg
 D src/components/layout/Navbar.tsx
 D src/components/projects/MetaBar.tsx
 D src/components/projects/ProjectCard.tsx
 D src/components/ui/ActionButton.tsx
 D src/components/ui/MagneticAction.tsx
 D src/components/ui/Marquee.tsx
 D src/components/ui/MatrixRain.tsx
 D src/components/ui/NameWave.tsx
 D src/components/ui/PixelIcon.tsx
 D src/data/profile.ts
 D src/data/projectImageSizes.json
 D src/data/projects.ts
 D src/data/skills.ts
 D src/data/timeline.ts
 D src/hooks/useMatrixSectionDecode.ts
 D src/hooks/useStaggerReveal.ts
 D src/hooks/useTheme.ts
 M src/main.tsx
 M src/os/Desktop.tsx
 M src/os/apps/AboutApp.tsx
 M src/os/apps/CVApp.tsx
 M src/os/components/DesktopIcon.tsx
 M src/os/components/Dock.tsx
RM src/os/TopBar.tsx -> src/os/components/TopBar.tsx
 M src/os/components/Wallpaper.tsx
 M src/os/components/Window.tsx
 D src/os/components/WindowManager.tsx
AM src/os/hooks/useClock.ts
 M src/os/hooks/useWindowManager.ts
 M src/os/os.css
 D src/sections/About.tsx
 D src/sections/Contact.tsx
 D src/sections/Hero.tsx
 D src/sections/Portrait.tsx
 D src/sections/Projects.tsx
 D src/sections/Timeline.tsx
 D src/sections/WorkContact.tsx
 M src/styles.css
 D src/types/index.ts
 D src/utils/contrast.test.ts
 D src/utils/creative.ts
 D src/utils/filterProjects.ts
 D src/utils/interaction.test.ts
 D src/utils/preferences.ts
 D src/utils/projectDecisions.ts
 M tsconfig.app.json
?? archive/portfolio-v1/DESIGN.md
?? archive/portfolio-v1/README-original.md
?? archive/portfolio-v1/README.md
?? archive/portfolio-v1/assets/circuit-pattern.svg
?? archive/portfolio-v1/components/projects/MetaBar.tsx
?? archive/portfolio-v1/components/projects/ProjectCard.tsx
?? archive/portfolio-v1/components/projects/ProjectFrame.tsx
?? archive/portfolio-v1/components/ui/ActionButton.tsx
?? archive/portfolio-v1/components/ui/EmailCopy.tsx
?? archive/portfolio-v1/components/ui/MagneticAction.tsx
?? archive/portfolio-v1/components/ui/Tag.tsx
?? archive/portfolio-v1/hooks/useStaggerReveal.ts
?? archive/portfolio-v1/sections/About.tsx
?? archive/portfolio-v1/sections/Contact.tsx
?? archive/portfolio-v1/sections/Portrait.tsx
?? archive/portfolio-v1/sections/Projects.tsx
?? archive/portfolio-v1/sections/Timeline.tsx
?? archive/portfolio-v1/sections/WorkContact.tsx
?? archive/portfolio-v1/styles.css
?? archive/portfolio-v1/tooling/generate-og.mjs
?? archive/portfolio-v1/tooling/visual-audit.mjs
?? archive/portfolio-v1/utils/contrast.test.ts
?? archive/portfolio-v1/utils/creative.ts
?? archive/portfolio-v1/utils/interaction.test.ts
?? archive/portfolio-v1/utils/keyboard.ts
?? archive/portfolio-v1/utils/preferences.ts
?? archive/portfolio-v1/utils/rainPolicy.ts
?? docs/AUDIT-TP1-7.md
?? docs/MIGRATION-LYLIANOS.md
?? docs/browser-results.json
?? docs/migration-inventory.json
?? docs/preservation-checks.json
?? scripts/os-browser-checks.mjs
?? scripts/os-interaction-checks.mjs
?? scripts/os-time-checks.mjs
?? src/os/components/projects/ProjectCarousel.tsx
?? src/os/components/ui/Modal.tsx
?? src/os/components/ui/PixelIcon.tsx
?? src/os/config/wallpapers.test.ts
?? src/os/data/portfolio.test.ts
?? src/os/data/profile.ts
?? src/os/data/projectImageSizes.json
?? src/os/data/projects.ts
?? src/os/data/skills.ts
?? src/os/data/timeline.ts
?? src/os/portfolioTypes.ts
?? src/os/utils/copyEmail.ts
?? src/os/utils/filterProjects.ts
?? src/os/utils/projectDecisions.ts
?? src/os/windowState.test.ts
?? src/os/windowState.ts
```
