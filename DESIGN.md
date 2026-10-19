---
version: 2
name: SOURCE / PLAY — Lylian Michel
background: "#151516"
accent: "#a6e6c5"
---
# SOURCE / PLAY
Identité éditoriale sobre pour un développeur web et jeux vidéo. Les vraies captures de projets sont la preuve principale. Aucun terminal fictif, compteur inventé ou effet de glassmorphism.
## Tokens
Couleurs : `--lm-page` #151516, `--lm-ink` #f4f3ee, `--lm-sub` #b8b9b8, `--lm-panel` #1c1d1d, `--lm-rule` #424642. Accent principal `--lm-accent` menthe #a6e6c5. Variantes azur #a0caff, lavande #dec0fc et cuivre #ffc79e, ajustées selon le thème pour respecter le contraste.
Thèmes : sombre par défaut ou système au premier chargement, clair et contraste élevé; choix persistés. Ne pas coder de couleurs arbitraires dans les sections.
Typography : titre `--lm-font-display` Bahnschrift (fallback Arial Narrow), texte `--lm-font-body` Inter / Segoe UI, technique `--lm-font-mono` Cascadia Code / Consolas. Échelle titre fluide clamp(2.5rem,6vw,5.7rem), corps 15–16px.
Grille : largeur max 1320px, gouttière `clamp(20px,4vw,76px)`, sections 80–164px, espace négatif volontaire. Traits 1px. Rayons 4px actions, 10px cadres; éviter les « cards » répétées.
Motion : 180ms interaction, 420ms apparition, ease cubic-bezier(.22,1,.36,1); déplacements courts. Tout mouvement non essentiel s'arrête avec prefers-reduced-motion. Aucun loader qui retarde le LCP.
Interaction : focus 3px visible, clavier complet, aria-label précis, pas de scroll horizontal; le contenu essentiel ne dépend jamais du hover.
Les données éditoriales restent dans src/data; préserver la date 12 avril 2027 et l'accès au PDF. L'OG, la nav, le hero et les projets doivent partager cette direction.
