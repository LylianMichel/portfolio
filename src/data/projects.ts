import type { Project, UniversityProject } from "../types";

const projectAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}projects/${fileName}`;

export const projects: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription:
      "Application web pour découvrir des animes et gérer une bibliothèque personnelle synchronisée avec AniList.",
    description:
      "AniVault est le projet web sur lequel j'ai le plus travaillé. J'y ai construit un frontend React, une API Express et une couche de données avec Prisma.",
    context: "Projet personnel · application full-stack",
    motivation:
      "Je voulais un projet assez complet pour travailler le frontend, le backend, les données et l'expérience utilisateur dans une même application.",
    challenges: [
      "Synchroniser et exploiter proprement les données AniList",
      "Organiser le projet entre client, serveur et base de données",
      "Gérer recherche, filtres, progression et bibliothèque sans alourdir l'interface"
    ],
    learning:
      "Ce projet m'a surtout appris à faire évoluer une application complète dans le temps plutôt qu'à réaliser une simple démo.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "AniList"],
    features: [
      "Catalogue synchronisé avec AniList",
      "Recherche avancée et filtres",
      "Bibliothèque, favoris et progression",
      "Architecture frontend / backend séparée"
    ],
    repositoryPublic: false,
    images: [
      { src: projectAsset("anivault.png"), alt: "Accueil desktop d'AniVault", label: "Accueil" },
      { src: projectAsset("anivault-discovery.png"), alt: "Page découverte d'AniVault", label: "Découverte" },
      { src: projectAsset("anivault-list.png"), alt: "Bibliothèque personnelle dans AniVault", label: "Ma liste" },
      { src: projectAsset("anivault-title.png"), alt: "Fiche d'un anime dans AniVault", label: "Fiche anime" },
      { src: projectAsset("anivault-search.png"), alt: "Recherche avancée dans AniVault", label: "Recherche" }
    ],
    year: "2026",
    type: "Application full-stack",
    size: "major",
    tone: "mixed",
    icon: "LibraryBig"
  },
  {
    id: "towerdefence",
    title: "THE WORLD DEFENCE",
    shortDescription:
      "Tower defense développé avec Godot autour d'une campagne par âges, de tours évolutives, de héros et de plusieurs modes de jeu.",
    description:
      "THE WORLD DEFENCE est mon projet de jeu personnel. Je travaille autant les systèmes de gameplay que les interfaces, la progression et les outils qui me permettent de vérifier le comportement du jeu.",
    context: "Projet personnel · jeu vidéo sous Godot",
    motivation:
      "Je voulais un projet long qui m'oblige à structurer de nombreux systèmes qui interagissent entre eux.",
    challenges: [
      "Faire cohabiter tours, améliorations, héros, boss et progression",
      "Garder des interfaces lisibles malgré beaucoup de données",
      "Tester les systèmes et éviter les régressions à mesure que le jeu grandit"
    ],
    learning:
      "Le projet m'apprend surtout à découper un gros problème en systèmes indépendants et à revenir régulièrement sur l'architecture.",
    technologies: ["Godot", "GDScript", "Game design", "UI", "Pixel art"],
    features: [
      "Tours et spécialisations",
      "Héros, boss et progression",
      "Campagne organisée en plusieurs âges",
      "Modes Histoire, Infini, Challenges et Boss Rush"
    ],
    repositoryPublic: false,
    images: [
      { src: projectAsset("towerdefence.png"), alt: "Accueil du hub de THE WORLD DEFENCE", label: "Hub" },
      { src: projectAsset("towerdefence-play.png"), alt: "Menu de jeu de THE WORLD DEFENCE", label: "Jouer" },
      { src: projectAsset("towerdefence-heroes.png"), alt: "Écran des héros de THE WORLD DEFENCE", label: "Héros" },
      { src: projectAsset("towerdefence-progression.png"), alt: "Écran de progression de THE WORLD DEFENCE", label: "Progression" },
      { src: projectAsset("towerdefence-tree.png"), alt: "Arbre de progression solaire de THE WORLD DEFENCE", label: "Arbre solaire" }
    ],
    year: "2026",
    type: "Jeu vidéo",
    size: "major",
    tone: "violet",
    icon: "Gamepad2"
  },
  {
    id: "le-temple",
    title: "Le Temple",
    shortDescription:
      "Application Laravel conçue autour des besoins d'un institut : comptes, réservations, catalogue et logique métier.",
    description:
      "Ce projet m'a permis de travailler une application web côté serveur avec des besoins métier plus concrets qu'une simple page vitrine.",
    context: "Projet web · Laravel",
    motivation:
      "Mettre en pratique une architecture serveur complète avec plusieurs rôles et des données persistantes.",
    challenges: [
      "Organiser les routes, contrôleurs et règles métier",
      "Gérer réservations, comptes et catalogue",
      "Conserver un fonctionnement testable"
    ],
    learning:
      "J'ai mieux compris la séparation des responsabilités dans une application Laravel et l'intérêt des tests sur la logique métier.",
    technologies: ["Laravel", "PHP", "SQLite", "PHPUnit"],
    features: [
      "Réservations",
      "Comptes et rôles",
      "Catalogue et stocks",
      "Tests PHPUnit"
    ],
    githubUrl: "https://github.com/LylianMichel/Le_temple",
    repositoryPublic: true,
    images: [
      { src: projectAsset("le-temple.webp"), alt: "Concept de page d'accueil du projet Le Temple", label: "Accueil" },
      { src: projectAsset("le-temple-spa.webp"), alt: "Visuel principal du projet Le Temple", label: "Univers visuel" }
    ],
    year: "2026",
    type: "Application web",
    size: "medium",
    tone: "blue",
    icon: "MonitorSmartphone"
  },
  {
    id: "eco-repare",
    title: "Eco'Répare",
    shortDescription:
      "Site vitrine responsive autour du reconditionnement informatique, réalisé en HTML, CSS et JavaScript.",
    description:
      "Un projet plus compact qui m'a permis de travailler la mise en page responsive, la navigation mobile et la cohérence visuelle.",
    context: "Projet web · site vitrine",
    motivation:
      "Créer une vitrine simple à parcourir sur desktop comme sur mobile.",
    challenges: [
      "Adapter la mise en page aux petits écrans",
      "Conserver une hiérarchie claire",
      "Ajouter des interactions sans complexifier le site"
    ],
    learning:
      "J'ai surtout travaillé la qualité d'intégration et le responsive sans framework frontend.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
    features: [
      "Mise en page responsive",
      "Navigation mobile",
      "Validation côté navigateur",
      "Direction visuelle cohérente"
    ],
    repositoryPublic: false,
    images: [
      { src: projectAsset("eco-repare-preview.svg"), alt: "Aperçu du projet Eco'Répare", label: "Présentation" }
    ],
    year: "2026",
    type: "Site vitrine",
    size: "medium",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];

export const universityProjects: UniversityProject[] = [
  {
    title: "Mini-framework PHP",
    context: "BUT Informatique · développement web",
    description:
      "Travail sur un mini-framework PHP avec routage, rendu de vues, accès aux données et correction progressive des erreurs de typage.",
    technologies: ["PHP", "BladeOne", "PHPStan", "PHPUnit"],
    result:
      "Tests PHPUnit validés et amélioration de la qualité du code avec PHPStan."
  },
  {
    title: "Applications Java",
    context: "BUT Informatique · programmation objet",
    description:
      "Plusieurs travaux autour de la POO, des listes chaînées, des arbres et des tests automatisés.",
    technologies: ["Java", "POO", "JUnit", "Structures de données"],
    result:
      "Mise en pratique des structures de données et de la conception orientée objet."
  }
];
