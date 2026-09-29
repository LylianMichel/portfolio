import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription:
      "Une application locale de découverte et de suivi d'anime, pensée comme un vrai produit avec catalogue, recherche, bibliothèque personnelle et statistiques.",
    description:
      "Projet full-stack autour d'un catalogue AniList synchronisé, avec une API Express, une persistance Prisma et une interface React responsive.",
    technologies: ["React", "Node.js", "Express", "Prisma", "SQLite"],
    features: [
      "Catalogue AniList synchronisé et paginé",
      "Recherche avancée et recommandations",
      "Bibliothèque avec progression, favoris et notes",
      "Tests backend, Playwright et PWA"
    ],
    githubUrl: "https://github.com/LylianMichel/anivault",
    tone: "mixed",
    icon: "LibraryBig"
  },
  {
    id: "towerdefence",
    title: "THE WORLD DEFENCE",
    shortDescription:
      "Un tower defense développé avec Godot autour d'une campagne temporelle, de systèmes de progression et d'un contenu fortement piloté par les données.",
    description:
      "Projet de jeu structuré autour des vagues, tours, héros, sauvegardes, modes de jeu, tests techniques et outils de validation.",
    technologies: ["Godot", "GDScript", "Game design", "Pixel art"],
    features: [
      "Campagne de 35 chapitres sur 10 âges",
      "23 tours, héros et systèmes d'amélioration",
      "Plusieurs modes de jeu et sauvegarde versionnée",
      "Smoke tests et benchmarks automatisés"
    ],
    githubUrl: "https://github.com/LylianMichel/towerdefence",
    tone: "violet",
    icon: "Gamepad2"
  },
  {
    id: "le-temple",
    title: "Le Temple",
    shortDescription:
      "Un site et une API Laravel pour un institut, avec réservation, comptes utilisateurs, catalogue de soins et logique métier persistée en SQLite.",
    description:
      "Application web PHP/Laravel avec gestion des réservations, sessions, rôles, catalogue, stocks et tests automatisés.",
    technologies: ["Laravel", "PHP", "SQLite", "PHPUnit"],
    features: [
      "Réservations avec contrôle de capacité",
      "Comptes, rôles et sessions persistantes",
      "Catalogue, stocks et notifications",
      "Suite de tests PHPUnit"
    ],
    githubUrl: "https://github.com/LylianMichel/Le_temple",
    tone: "blue",
    icon: "MonitorSmartphone"
  },
  {
    id: "eco-repare",
    title: "Eco'Répare",
    shortDescription:
      "Une vitrine responsive consacrée au reconditionnement informatique, avec une direction visuelle sobre et une attention portée à la lisibilité.",
    description:
      "Site statique construit en HTML, CSS et JavaScript avec navigation mobile, formulaire côté navigateur et micro-interactions légères.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
    features: [
      "Mise en page responsive",
      "Navigation mobile accessible",
      "Formulaire avec validation côté navigateur",
      "Direction artistique cohérente et légère"
    ],
    githubUrl: "https://github.com/LylianMichel/Eco-repare",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];
