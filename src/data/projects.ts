import type { Project } from "../types";

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
    image: "https://raw.githubusercontent.com/LylianMichel/anivault/main/audit-captures/01-accueil-desktop.png",
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
    image: "https://raw.githubusercontent.com/LylianMichel/towerdefence/main/docs/screenshots/hub-home-1600x900.png",
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
    image: "https://raw.githubusercontent.com/LylianMichel/Le_temple/master/public/assets/images/concept-homepage.webp",
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
    image: "https://raw.githubusercontent.com/LylianMichel/Eco-repare/main/assets/img/hero-atelier-v28.png",
    year: "2026",
    type: "Site vitrine",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];
