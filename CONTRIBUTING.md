# Contribuer au portfolio

`main` contient la version stable en production. Seul le propriétaire autorise explicitement une intégration vers `main` et le déploiement de production qui en découle.

`dev` sert à intégrer et à valider les changements. Créez toute nouvelle branche de travail à partir de `dev` à jour. Les branches permanentes sont les suivantes.

- `feature/design` pour les styles, les thèmes et l’interface.
- `feature/code` pour l’architecture, les corrections, les dépendances et les tests.
- `feature/animations` pour les transitions, les effets et les interactions.
- `feature/content` pour les projets, les compétences, le CV et les médias.

Ouvrez une pull request vers `dev` pour chaque changement à intégrer. Indiquez les vérifications réalisées et attendez la réussite des contrôles avant de fusionner. Pour valider localement avec Node.js 22, exécutez `npm ci`, `npm test` et `npm run build`. Le build inclut la vérification TypeScript.
