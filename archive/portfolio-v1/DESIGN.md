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
Typography : polices variables auto-hébergées Space Grotesk (titres), Inter (texte), JetBrains Mono (éléments techniques). Utiliser les fichiers CSS fournis par @fontsource-variable ; aucune police externe à l’exécution.
Grille : largeur max 1320px, gouttière `clamp(20px,4vw,76px)`, sections 80–164px, espace négatif volontaire. Traits 1px. Rayons 4px actions, 10px cadres; éviter les « cards » répétées.
Motion : 180ms interaction, 420ms apparition, ease cubic-bezier(.22,1,.36,1); déplacements courts. Tout mouvement non essentiel s'arrête avec prefers-reduced-motion. Aucun loader qui retarde le LCP.
Interaction : focus 3px visible, clavier complet, aria-label précis, pas de scroll horizontal; le contenu essentiel ne dépend jamais du hover.
Les données éditoriales restent dans src/data; préserver la date 12 avril 2027 et l'accès au PDF. L'OG, la nav, le hero et les projets doivent partager cette direction.

## Finitions et production
Logotype vectoriel LM dans la navigation et le favicon. Image Open Graph réelle 1200×630 au format PNG indexé pour une lisibilité sans téléchargement de police. Les noms et dates restent dans src/data et le contenu actuel.
La sélection et la scrollbar réutilisent `--lm-accent`. La barre de progression n'est pas un indicateur d'expérience fictif, elle reflète uniquement la progression dans la page. Shortcut g,p / g,c / ? ; le Konami code change uniquement l'accent.
Galeries : navigation flèches, Échap, bouton fermeture, swipe tactile; boîte de dialogue HTML native pour verrouiller le focus. Tilt limité à 2° et exclu du mobile et reduced-motion. Aucun effet magnétique qui compromet la cible tactile. Aucun écran de chargement bloquant.
Accessibilité : contrastes programmatiquement vérifiés dans `src/utils/contrast.test.ts`; focus 3px; pages sémantiques, texte visible sans hover, alt issus de src/data; vérifier au navigateur sur les deux thèmes. Le score Lighthouse dépend de l'environnement du test et n'est jamais garanti par les seuls tokens.
Polices : @fontsource-variable/space-grotesk, inter et jetbrains-mono, livrées avec le bundle. Aucune requête Google Fonts et fallback système.

## Consolidation CSS (Claude / revue)
Les anciennes feuilles index.css, design.css, visual-impact.css et redesign.css ont été remplacées par un seul fichier `src/styles.css`. Les variables de thème et les styles des galeries/modales sont conservés. Le Hero est resserré pour donner la priorité à l’identification et à la disponibilité de stage sans retarder le LCP.

### Arbitrage de performance
Suite aux mesures Lighthouse mobiles (89 avec trois polices, 73 avec préchargements), seule Space Grotesk reste téléchargée et auto-hébergée. Le texte et le code utilisent les polices système, afin de privilégier le LCP et la lisibilité. Les autres fontsource ont été retirées plutôt que préchargées.
