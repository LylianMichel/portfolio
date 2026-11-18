# LylianOS — portfolio de Lylian Michel

Portfolio réalisé avec React, TypeScript, Vite, Tailwind CSS, Framer Motion et
Lucide React. Le bureau, les fenêtres, le dock et la barre système correspondent
aux TP 1 à 7. L'application Profil reste à développer par l'auteur au TP 8.

## Développement

Node.js 22 et npm sont recommandés.

```bash
npm install
npm run dev
```

Vite affiche l'adresse locale, généralement http://localhost:5173/.

## Vérifications

```bash
npx tsc -b
npm run test
npm run build
npm run preview
```

Le build génère le site dans dist/ et son HTML initial prérendu. Le développement
utilise createRoot ; le site construit utilise hydrateRoot. Aucun script lint
n'est actuellement défini.

Les scénarios navigateur sont dans scripts/os-browser-checks.mjs,
scripts/os-interaction-checks.mjs et scripts/os-time-checks.mjs. Le workflow
visual-audit installe temporairement Playwright, axe et Lighthouse pour les
exécuter ; ces outils ne sont pas ajoutés aux dépendances de l'application.
Les captures et journaux locaux sont dans output/playwright/ (ignoré par Git).

## Reprendre le TP 8

- Application : src/os/apps/AboutApp.tsx.
- Données et exports profile, socials : src/os/data/profile.ts.
- Types métier dont Profile : src/os/portfolioTypes.ts.
- Types du système AppId, OSWindow et WindowBounds : src/os/types.ts.
- Projets, compétences et parcours : src/os/data/.
- CSS du bureau : src/os/os.css ; base globale minimale : src/styles.css.
- Portrait : public/portrait-lylian-michel.png, référencé par profile.photo.

La spécialité de formation est facultative tant que son intitulé n'a pas été
confirmé. Le stage commence le 12 avril 2027 et dure huit semaines.

Les modèles utiles de l'ancien rendu sont temporairement conservés dans
archive/portfolio-v1/, hors du code exécuté par le bureau. Leurs anciens tests
restent exécutés et leurs fichiers TypeScript restent vérifiés.

L'inventaire complet est dans docs/MIGRATION-LYLIANOS.md et le rapport de
vérification dans docs/AUDIT-TP1-7.md. Les données et les fichiers publics
originaux sont conservés ; aucune future application n'est implémentée ici.

## Déploiement

Vercel : preset Vite, commande npm run build, sortie dist/. Netlify et Vercel
conservent leurs fichiers de configuration. Le projet utilise une base Vite
relative et peut être publié dans un sous-dossier. Les ressources publiques
restent à leur emplacement et sont préfixées avec import.meta.env.BASE_URL.

L'image Open Graph existante est copiée par Vite depuis public/ ; l'ancien
générateur SOURCE / PLAY ne remplace plus cette image pendant le build.

Aucune variable d'environnement ni clé secrète n'est nécessaire. Les fichiers
.env, node_modules, dist, les caches et les journaux restent ignorés par Git.

Les informations codeAccess des projets sont conservées. Leur confidentialité
ne doit pas être modifiée automatiquement pour afficher des liens publics.
