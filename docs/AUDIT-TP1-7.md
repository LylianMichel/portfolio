# Audit et migration de LylianOS — 18 novembre 2026

Le travail a été effectué dans `C:/Users/lylia/Desktop/PORTFOLIOV2/portfolio`,
le dossier `D:/zakgh/portfolio` n'étant pas présent. La branche est restée
`feature/lylianos`. Aucun commit, push, reset, changement de branche ou intervention
sur main n'a été réalisé. Les modifications locales du TP 7 ont été conservées.

La demande initiale d'audit a été complétée par la préparation de l'architecture
du TP 8. AboutApp n'a reçu qu'une correction d'import : son contenu et son rendu
restent à développer personnellement. Aucune application des TP suivants n'a été
développée.

## Bilan par TP

Les notes sont des appréciations techniques sur ce périmètre, pas des scores
Lighthouse. L'achèvement est estimé par rapport aux exigences des TP 1 à 7 ; les
contenus provisoires des futures applications ne sont pas pénalisés.

| TP | État initial | Problèmes détectés | Corrections | État final | Note /20 | Achèvement estimé |
|---|---|---|---|---|---|---|
| 1 | Architecture OS présente, build bloqué | Imports historiques cassés, hydratation d'un conteneur vide en dev, initialisation Matrix dans index.html, deux emplacements de données | Données/types/utilitaires migrés, références historiques isolées, démarrage React adapté au HTML présent, script Matrix retiré | TypeScript, tests, build et prérendu passent ; archive temporaire documentée | 18 | 98 % |
| 2 | Plages horaires correctes | Nouvelle image affichée sans attendre son décodage ; disparition simultanée des deux paysages ; extensions WebP trompeuses et images lourdes | Préchargement/décodage avant fondu ; couche précédente maintenue opaque | Six limites horaires validées en navigateur ; fichiers laissés intacts ; poids à améliorer ultérieurement | 17 | 95 % |
| 3 | Sept boutons natifs, animations Motion | Couleur unique sur le bureau malgré la configuration ; focus non défini ; icônes inférieures coupées sur écran peu haut | Couleurs de configuration transmises, focus visible, disposition avec retour en colonne | Ouvertures, clavier, tactile et cinq résolutions vérifiés | 19 | 100 % |
| 4 | Ouverture, fermeture et unicité déjà présentes | Fenêtres en cours de fermeture encore interactives ; focus clavier ne changeant pas la superposition | inert pendant la sortie ; focus clavier pris en compte ; ouverture/fermeture à 220 ms | Sept fenêtres distinctes et contenus attendus vérifiés ; aucune mutation directe | 19 | 100 % |
| 5 | Déplacement, taille, min/max disponibles | Taille maximisée périmée après resize ; anciennes fenêtres hors du bureau ; z-index croissants ; focus possible via l'API sur une fenêtre minimisée | Règles immuables testables, ResizeObserver nettoyé, recalage des limites, rangs bornés, refus de focus si minimisée | Huit méthodes appelées directement, combinaisons et dimensions restaurées vérifiées | 18,5 | 98 % |
| 6 | Dock présent, animation vers son icône | Animation coupée par le workspace ; cible périmée après resize ; grossissement par indices ; un seul rebond partagé | Workspace non coupant, cible recalculée, emplacements stables et distance continue, rebonds indépendants | Grossissement 1 / 1,133 / 1,267 / 1,4 ; min/restauration et état conservé vérifiés | 18,5 | 98 % |
| 7 | Barre, horloge et menus en modifications locales | Accents dans la recherche, panneau de recherche sans styles propres, anciens menus encore interactifs pendant la fermeture | Normalisation des accents, panneau contraint à l'écran, panneaux sortants inertes | Menus, sélection, clic extérieur, Échap, autofocus, application active et passage de minuit vérifiés | 18,5 | 100 % |

Appréciations globales : **qualité du code 18/20**, **fluidité des animations
18/20**, **stabilité fonctionnelle 19/20**. La fluidité a été observée et contrôlée
dans Chromium headless ; elle ne constitue pas une mesure de FPS sur téléphone.

## Principales corrections et explications

| Fichier | Cause et correction ciblée | Vérification |
|---|---|---|
| main.tsx | hydrateRoot attend du HTML serveur. En dev, le conteneur est vide : createRoot est utilisé. Le build conserve hydrateRoot. | Console dev puis production, bureau interactif |
| index.html | Un ancien script initialisait encore Matrix et la colorimétrie sombre. Il ne correspondait plus au bureau clair. | Plus de script Matrix actif ; rendu existant conservé |
| components/Wallpaper.tsx | Une URL CSS peut être animée avant le téléchargement. Image.decode attend un fichier utilisable ; la couche précédente ne disparaît pas avant la fin du fondu. Un échec conserve le fond courant. | Horloge simulée aux limites ; couches opaques ; décodage réel des quatre images |
| components/DesktopIcon.tsx, Desktop.tsx | La propriété color existait dans la configuration mais n'était pas transmise au bureau. | Sept applications et couleurs de configuration |
| windowState.ts, hooks/useWindowManager.ts | Les mêmes limites étaient recopiées dans plusieurs méthodes. Les décisions sont désormais regroupées dans un reducer pur : état précédent + action → nouvel état. Le hook conserve les huit méthodes publiques. | Huit tests unitaires de règles, huit appels de méthodes en navigateur |
| hooks/useWindowManager.ts | Le workspace change avec la fenêtre du navigateur. Un ResizeObserver actualise les limites et se déconnecte au démontage. | Fenêtres normales/maximisées/minimisées après resize |
| components/Window.tsx | Le dock peut bouger même si la fenêtre conserve sa taille. La cible dépend du workspace et des rectangles réels ; le listener resize n'existe que pendant la minimisation et est nettoyé. | Centre fenêtre/centre icône à moins de 2 px avant et après resize |
| components/Window.tsx | Cacher par opacité ne retire pas les descendants de la navigation clavier. inert interdit les interactions sans démonter le contenu. | Focus refusé, même image DOM et défilement restaurés |
| components/Dock.tsx | Les éléments agrandis ne doivent pas servir à calculer leur propre agrandissement. Les emplacements fixes donnent des centres stables. Chaque icône conserve son rebond, limité par un timer nettoyé. | Progression des échelles, emplacements inchangés, clics rapides et retour au repos |
| components/TopBar.tsx | La casse ne suffit pas à normaliser « compétences »/« competences ». NFD et retrait des accents rendent la recherche cohérente. Les panneaux sortants sont rendus inertes. | Accents, majuscules, espaces, aucun résultat, Échap et sélection |
| os.css et styles.css | Le reset historique n'était plus chargé et des règles de fenêtre se contredisaient. La base globale est minimale ; les règles OS dupliquées ont été regroupées. | Pas de débordement dans les cinq résolutions ; dock horizontal |

Les chemins des composants dans ce tableau sont relatifs à `src/os`, sauf main.tsx,
index.html et styles.css. Aucune dépendance n'a été ajoutée ; aucun any, contournement
TypeScript ou retrait de test historique n'a été utilisé.

## Migration réalisée

L'inventaire exhaustif des anciens et nouveaux chemins, des imports et des
fichiers retirés est dans [MIGRATION-LYLIANOS.md](MIGRATION-LYLIANOS.md).
Le graphe d'imports analysé est conservé dans migration-inventory.json.

- Données uniques : `src/os/data/{profile,projects,skills,timeline}.ts` et
  `projectImageSizes.json`.
- Types métier : `src/os/portfolioTypes.ts`. Les types système restent dans
  `src/os/types.ts`, avec les mêmes noms exportés.
- Réutilisables : `os/utils/{copyEmail,filterProjects,projectDecisions}.ts`,
  `os/components/projects/ProjectCarousel.tsx` et `os/components/ui/{Modal,PixelIcon}.tsx`.
  La galerie et la modale ne sont pas branchées aux applications provisoires :
  leur intégration et l'adaptation de leurs styles restent pour les prochains TP.
- Références temporaires : `archive/portfolio-v1`, sans point d'entrée et sans
  import depuis l'application active. Les classes historiques demandent une
  adaptation avant réutilisation. L'archive reste vérifiée par TypeScript et
  ses tests restent exécutés.
- Les scripts de synchronisation Eco'Répare et le workflow associé utilisent
  les nouveaux chemins. Le workflow d'audit vise le bureau et non les anciens
  modes Matrix. Les anciens scripts restent archivés comme références.
- Vite copie l'Open Graph existant de public ; l'ancien générateur ne le remplace
  plus par une image SOURCE / PLAY à chaque build.

## Données et ressources vérifiées

Les **45 fichiers publics ont les mêmes SHA-256 avant/après**. Aucun paysage,
CV, portrait, favicon, Open Graph ou capture de projet n'a été modifié ou supprimé.
Les données de projets, compétences, parcours et dimensions d'images sont
identiques en dehors des imports (voir preservation-checks.json).

| Ressource | Format réel | Dimensions | Taille |
|---|---|---|---|
| alpine-sunrise.webp | PNG | 3840 × 2160 | 15 602 234 octets |
| alpine-day.webp | PNG | 1920 × 842 | 4 192 412 octets |
| alpine-sunset.webp | PNG | 6000 × 3375 | 29 677 454 octets |
| alpine-night.webp | PNG | 5120 × 2880 | 21 227 279 octets |
| portrait-lylian-michel.png | PNG, portrait illustré | 1227 × 1281 | 996 553 octets |
| cv.png | PNG, signature vérifiée | 1819 × 2573 | 1 850 899 octets |
| CV-LylianMichel.pdf | PDF, signature %PDF- vérifiée | Sans modification | 863 923 octets |

Le CV est affiché uniquement en image, avec proportions conservées et défilement
dans la fenêtre. Le lien ouvre le véritable PDF dans un autre onglet. Aucune
iframe, visionneuse, barre PDF ou commande de zoom n'a été ajoutée.

## Vérifications exécutées

| Vérification | Résultat |
|---|---|
| git status avant, pendant et après | Branche feature/lylianos, modifications visibles et non commitées |
| État initial : npx tsc -b | Échec : 11 imports historiques manquants |
| État initial : npm run test | 36 tests réussis, une suite en échec d'import |
| État initial : npm run build | Échec sur TypeScript |
| npx tsc -b après migration | Réussite, archive incluse |
| npm run test après migration | **93 tests réussis**, 5 fichiers ; les 72 cas historiques restent présents |
| npm run build après migration | Réussite : client, bundle SSR et insertion du HTML |
| npm ls --depth=0 | Aucune dépendance manquante ou invalide signalée |
| git diff --check | Réussite ; avertissements de conversion LF/CRLF uniquement |
| node --check sur les quatre scripts navigateur | Réussite |
| scripts/bundle-budget.mjs | Réussite : JS gzip 117 545 octets, CSS gzip 2 013 octets |
| npm run dev | Démarré sur 127.0.0.1:5173 ; interactions réellement exécutées |
| npm run preview | Build testé sur 127.0.0.1:4173 |
| Playwright | **18 scénarios réussis sur le build de production** : cinq résolutions, fenêtres, CV, menus, clavier, tactile, animations et heure simulée ; détails dans browser-results.json |
| Hydratation avec mouvement réduit dès le chargement | Réussite sur un contexte neuf à 390 × 844, aucune erreur et CV ouvert |
| Méthodes du hook | open, close, focus, move, minimize, restore, maximize et resize appelées directement |
| Cycle de vie en StrictMode | Deux intervalles actifs, zéro après démontage du composant de test |
| Lint | Aucun script ni configuration de lint présent : non exécuté |
| Lighthouse et axe locaux | Outils absents des dépendances locales : non exécutés ; workflow adapté, exécution distante non déclenchée |

Les 21 nouveaux cas unitaires couvrent dix limites horaires, huit règles du
gestionnaire et trois contrôles des données/ressources. Les scénarios navigateur
comparent les dimensions et positions réelles, les signatures de fichiers, les
interactions et le DOM conservé ; ils ne se limitent pas à la compilation.

## Limites et points restants

1. Les quatre paysages portent une extension WebP mais contiennent du PNG. Ils
   sont décodés correctement par Chromium. Leur poids est important pour une
   connexion mobile. Ils n'ont pas été convertis, conformément à la consigne de
   ne pas modifier les fonds.
2. Les références archivées et la police Space Grotesk historique sont encore
   conservées pour la migration progressive. Aucun de ces anciens styles n'est
   chargé dans le bureau ; ne pas réimporter globalement la feuille historique.
3. L'Open Graph et le favicon existants restent inchangés. Leur éventuelle
   adaptation graphique à LylianOS relève d'une décision ultérieure.
4. Firefox, Safari, un téléphone physique, Lighthouse, axe et les workflows GitHub
   distants n'ont pas été exécutés localement. Aucun score pour ces outils n'est
   revendiqué ; les budgets Lighthouse existants restent susceptibles d'échouer
   avec les paysages lourds. Les tests locaux ne garantissent pas leur réussite.
5. La véritable interface mobile reste le travail du TP 17. À 390 × 844, les
   contrôles restent accessibles et aucun débordement global bloquant n'a été observé.

Les vérifications exécutées ne montrent **aucune régression majeure bloquant le
TP 8**. Il est possible de reprendre l'application Profil sur cette base. La
spécialité n'est pas inventée : la propriété est facultative dans Profile.

Proposition de commit, à créer uniquement après validation :

`refactor(os): migrate portfolio data and stabilize TP1-7`

Des captures locales sont disponibles dans output/playwright, notamment les
cinq résolutions, production.png et touch.png. Les résultats JSON versionnables
sont dans docs/browser-results.json ; les captures ne sont pas ajoutées à Git.
