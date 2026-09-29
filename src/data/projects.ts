import type { Project } from "../types";

const projectAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}projects/${fileName}`;

export const projects: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription:
      "Application web de découverte et de suivi d'animes avec catalogue AniList, recherche, bibliothèque personnelle et progression.",
    description:
      "Je l'ai créée pour centraliser une collection d'animes et récupérer automatiquement les informations utiles depuis AniList.",
    technologies: ["React", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "AniList"],
    features: [
      "Catalogue AniList synchronisé",
      "Recherche et filtres avancés",
      "Bibliothèque avec progression, favoris et notes",
      "Client React séparé de l'API Express"
    ],
    repositoryVisibility: "private",
    images: [
      { src: projectAsset("anivault.png"), alt: "Accueil desktop d'AniVault", label: "Accueil" },
      { src: projectAsset("anivault-discovery.png"), alt: "Page découverte d'AniVault", label: "Découverte" },
      { src: projectAsset("anivault-list.png"), alt: "Bibliothèque personnelle dans AniVault", label: "Ma liste" },
      { src: projectAsset("anivault-title.png"), alt: "Fiche d'un anime dans AniVault", label: "Fiche anime" },
      { src: projectAsset("anivault-search.png"), alt: "Recherche avancée dans AniVault", label: "Recherche" }
    ],
    year: "2026",
    type: "Application full-stack",
    tone: "mixed",
    variant: "large",
    icon: "LibraryBig",
    caseStudy: {
      why:
        "Je voulais une application qui me permette de gérer ma liste tout en évitant de saisir manuellement les informations de chaque anime.",
      built: [
        "Interface React et TypeScript",
        "API Express",
        "Modèle de données Prisma / PostgreSQL",
        "Synchronisation du catalogue avec AniList"
      ],
      challenge:
        "Le passage de SQLite à PostgreSQL et la synchronisation du catalogue m'ont obligé à revoir la configuration de la base et le flux de données.",
      solution:
        "J'ai séparé clairement le client et l'API, utilisé Prisma pour la couche de données et ajouté une synchronisation AniList en arrière-plan.",
      learned:
        "Ce projet m'a surtout appris à faire évoluer une application full-stack sans traiter le frontend, l'API et la base de données comme trois projets isolés."
    }
  },
  {
    id: "towerdefence",
    title: "THE WORLD DEFENCE",
    shortDescription:
      "Tower defense développé avec Godot autour d'une campagne qui traverse plusieurs âges, avec tours, héros, boss et modes de jeu.",
    description:
      "C'est mon projet personnel de jeu le plus important. Je l'utilise pour travailler autant le gameplay que les interfaces et les outils de validation.",
    technologies: ["Godot", "GDScript", "Game design", "Pixel art"],
    features: [
      "Tours, améliorations et spécialisations",
      "Héros, boss et progression",
      "Campagne sur plusieurs âges",
      "Modes Histoire, Infini, Challenges et Boss Rush"
    ],
    repositoryVisibility: "private",
    images: [
      { src: projectAsset("towerdefence.png"), alt: "Accueil du hub de THE WORLD DEFENCE", label: "Hub" },
      { src: projectAsset("towerdefence-play.png"), alt: "Menu de jeu de THE WORLD DEFENCE", label: "Jouer" },
      { src: projectAsset("towerdefence-heroes.png"), alt: "Écran des héros de THE WORLD DEFENCE", label: "Héros" },
      { src: projectAsset("towerdefence-progression.png"), alt: "Écran de progression de THE WORLD DEFENCE", label: "Progression" },
      { src: projectAsset("towerdefence-tree.png"), alt: "Arbre de progression solaire de THE WORLD DEFENCE", label: "Arbre solaire" }
    ],
    year: "2026",
    type: "Jeu vidéo",
    tone: "violet",
    variant: "large",
    icon: "Gamepad2",
    caseStudy: {
      why:
        "Je voulais construire un tower defense assez long pour pouvoir travailler de vrais systèmes de progression plutôt qu'un simple prototype.",
      built: [
        "Gameplay des tours et des vagues",
        "Héros et boss",
        "Progression et spécialisations",
        "Interfaces, cartes et plusieurs modes de jeu"
      ],
      solution:
        "J'ai ajouté des outils de validation et des smoke tests pour vérifier progressivement les systèmes au fur et à mesure que le projet grossit.",
      learned:
        "Le projet me fait surtout progresser sur l'organisation de systèmes de jeu nombreux, la lisibilité de l'interface et l'équilibrage."
    }
  },
  {
    id: "le-temple",
    title: "Le Temple",
    shortDescription:
      "Application Laravel pour un institut avec réservation, comptes utilisateurs, catalogue de soins et gestion métier.",
    description:
      "Le projet m'a permis de travailler une application web serveur avec des besoins concrets de réservation et de gestion.",
    technologies: ["Laravel", "PHP", "SQLite", "PHPUnit"],
    features: [
      "Réservations avec contrôle de capacité",
      "Comptes, rôles et sessions",
      "Catalogue et gestion métier",
      "Tests PHPUnit"
    ],
    githubUrl: "https://github.com/LylianMichel/Le_temple",
    repositoryVisibility: "public",
    images: [
      { src: projectAsset("le-temple.webp"), alt: "Concept de page d'accueil du projet Le Temple", label: "Accueil" },
      { src: projectAsset("le-temple-spa.webp"), alt: "Visuel principal du projet Le Temple", label: "Univers visuel" }
    ],
    year: "2026",
    type: "Application web",
    tone: "blue",
    variant: "medium",
    icon: "MonitorSmartphone"
  },
  {
    id: "php-framework",
    title: "Mini-framework PHP",
    shortDescription:
      "Projet de BUT autour d'un mini-framework web avec routage, rendu BladeOne, accès aux données et tests automatisés.",
    description:
      "Un projet universitaire utilisé pour travailler la structure d'une application PHP et la qualité du code.",
    technologies: ["PHP", "BladeOne", "PHPStan", "PHPUnit"],
    features: [
      "Routage HTTP",
      "Mapping des données",
      "Analyse statique avec PHPStan",
      "8 tests et 21 assertions"
    ],
    images: [
      { src: projectAsset("php-framework.svg"), alt: "Aperçu du projet universitaire mini-framework PHP", label: "Projet BUT" }
    ],
    year: "2026",
    type: "Projet universitaire",
    tone: "blue",
    variant: "compact",
    icon: "Code2"
  },
  {
    id: "java-structures",
    title: "Structures de données en Java",
    shortDescription:
      "Travaux de BUT autour des listes chaînées, arbres et tests unitaires en Java.",
    description:
      "Ces exercices m'ont permis de travailler la manipulation de structures de données plutôt que seulement l'utilisation de collections existantes.",
    technologies: ["Java", "POO", "JUnit"],
    features: [
      "Listes simplement chaînées",
      "Parcours et manipulation d'arbres",
      "Insertion, recherche et suppression",
      "Tests unitaires"
    ],
    images: [
      { src: projectAsset("java-structures.svg"), alt: "Aperçu des travaux Java sur les structures de données", label: "Projet BUT" }
    ],
    year: "2026",
    type: "Projet universitaire",
    tone: "cyan",
    variant: "compact",
    icon: "Coffee"
  },
  {
    id: "eco-repare",
    title: "Eco'Répare",
    shortDescription:
      "Site vitrine responsive consacré au reconditionnement informatique.",
    description:
      "Un projet plus petit centré sur la mise en page responsive, la lisibilité et les interactions côté navigateur.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
    features: [
      "Mise en page responsive",
      "Navigation mobile",
      "Validation côté navigateur",
      "Direction visuelle cohérente"
    ],
    repositoryVisibility: "private",
    images: [
      { src: projectAsset("eco-repare-preview.svg"), alt: "Aperçu du projet Eco'Répare", label: "Présentation" }
    ],
    year: "2026",
    type: "Site vitrine",
    tone: "cyan",
    variant: "compact",
    icon: "MonitorSmartphone"
  }
];
