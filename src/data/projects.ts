import type { Project } from "../types";

const projectAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}projects/${fileName}`;

export const projects: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription:
      "Une application de découverte et de suivi d'anime avec catalogue, recherche, bibliothèque personnelle, statistiques et synchronisation AniList.",
    description:
      "Projet full-stack conçu comme un vrai produit : frontend React, API Express, persistance Prisma et logique de synchronisation.",
    technologies: ["React", "Node.js", "Express", "Prisma", "SQLite"],
    features: [
      "Catalogue AniList synchronisé et paginé",
      "Recherche avancée et recommandations",
      "Bibliothèque avec progression, favoris et notes",
      "Tests backend, Playwright et PWA"
    ],
    githubUrl: "https://github.com/LylianMichel/anivault",
    images: [
      {
        src: projectAsset("anivault.png"),
        alt: "Accueil desktop d'AniVault",
        label: "Accueil"
      },
      {
        src: projectAsset("anivault-discovery.png"),
        alt: "Page découverte d'AniVault",
        label: "Découverte"
      },
      {
        src: projectAsset("anivault-list.png"),
        alt: "Bibliothèque personnelle dans AniVault",
        label: "Ma liste"
      },
      {
        src: projectAsset("anivault-title.png"),
        alt: "Fiche d'un anime dans AniVault",
        label: "Fiche anime"
      },
      {
        src: projectAsset("anivault-search.png"),
        alt: "Recherche avancée dans AniVault",
        label: "Recherche"
      }
    ],
    year: "2026",
    type: "Application full-stack",
    tone: "mixed",
    icon: "LibraryBig"
  },
  {
    id: "towerdefence",
    title: "THE WORLD DEFENCE",
    shortDescription:
      "Un tower defense sous Godot avec campagne, héros, tours, spécialisations, progression, sauvegardes et plusieurs modes de jeu.",
    description:
      "Un projet de jeu long terme qui m'a amené à travailler la structure des données, l'équilibrage, les tests et les outils de validation.",
    technologies: ["Godot", "GDScript", "Game design", "Pixel art"],
    features: [
      "Campagne de 35 chapitres sur 10 âges",
      "23 tours et plusieurs systèmes d'amélioration",
      "Modes Histoire, Infini, Challenges et Boss Rush",
      "Smoke tests et benchmarks automatisés"
    ],
    githubUrl: "https://github.com/LylianMichel/towerdefence",
    images: [
      {
        src: projectAsset("towerdefence.png"),
        alt: "Accueil du hub de THE WORLD DEFENCE",
        label: "Hub"
      },
      {
        src: projectAsset("towerdefence-play.png"),
        alt: "Menu de jeu de THE WORLD DEFENCE",
        label: "Jouer"
      },
      {
        src: projectAsset("towerdefence-heroes.png"),
        alt: "Écran des héros de THE WORLD DEFENCE",
        label: "Héros"
      },
      {
        src: projectAsset("towerdefence-progression.png"),
        alt: "Écran de progression de THE WORLD DEFENCE",
        label: "Progression"
      },
      {
        src: projectAsset("towerdefence-tree.png"),
        alt: "Arbre de progression solaire de THE WORLD DEFENCE",
        label: "Arbre solaire"
      }
    ],
    year: "2026",
    type: "Jeu vidéo",
    tone: "violet",
    icon: "Gamepad2"
  },
  {
    id: "le-temple",
    title: "Le Temple",
    shortDescription:
      "Une application Laravel pour un institut avec réservation, comptes utilisateurs, catalogue de soins et gestion métier en SQLite.",
    description:
      "Projet web complet autour d'un besoin concret : réservations, rôles, sessions, catalogue, stocks, notifications et tests.",
    technologies: ["Laravel", "PHP", "SQLite", "PHPUnit"],
    features: [
      "Réservations avec contrôle de capacité",
      "Comptes, rôles et sessions persistantes",
      "Catalogue, stocks et notifications",
      "Suite de tests PHPUnit"
    ],
    githubUrl: "https://github.com/LylianMichel/Le_temple",
    images: [
      {
        src: projectAsset("le-temple.webp"),
        alt: "Concept de page d'accueil du projet Le Temple",
        label: "Accueil"
      },
      {
        src: projectAsset("le-temple-spa.webp"),
        alt: "Visuel principal du projet Le Temple",
        label: "Univers visuel"
      }
    ],
    year: "2026",
    type: "Application web",
    tone: "blue",
    icon: "MonitorSmartphone"
  },
  {
    id: "eco-repare",
    title: "Eco'Répare",
    shortDescription:
      "Une vitrine responsive dédiée au reconditionnement informatique, avec une direction visuelle claire et des interactions légères.",
    description:
      "Site statique réalisé en HTML, CSS et JavaScript avec une attention particulière portée à la lisibilité et au responsive.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
    features: [
      "Mise en page responsive",
      "Navigation mobile accessible",
      "Formulaire avec validation côté navigateur",
      "Direction artistique cohérente"
    ],
    githubUrl: "https://github.com/LylianMichel/Eco-repare",
    images: [
      {
        src: projectAsset("eco-repare-preview.svg"),
        alt: "Aperçu du projet Eco'Répare",
        label: "Présentation"
      }
    ],
    year: "2026",
    type: "Site vitrine",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];
