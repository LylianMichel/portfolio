# Refonte éditoriale du portfolio

Application statique en français, construite avec React 19, TypeScript et Vite. Le dépôt de travail est une copie de l’historique d’origine. La branche de refonte part de `origin/dev`.

## Exécution

```sh
npm ci
npm test
npm run build
npm run test:e2e
npm run preview
```

Les tests de navigateur utilisent Chrome installé. Le build produit dix pages HTML, y compris sept fiches, le CV et la page 404. Les contenus initiaux sont lisibles sans JavaScript. React hydrate les filtres et les domaines de compétences. Aucun service applicatif ni variable d’environnement n’est nécessaire.

Les projets historiques et leurs captures sont documentés dans [docs/project-captures.md](docs/project-captures.md). Les fonctionnalités privées restent décrites avec la provenance disponible. Les fiches récentes sont volontairement courtes lorsque le brief ou la branche publique constituent les seules sources.

[Maquettes et design system Figma](https://www.figma.com/design/Noq1g5n3MpxB1iYnpTnAtk) · [Suivi, audit et décisions](docs/refonte.md)
