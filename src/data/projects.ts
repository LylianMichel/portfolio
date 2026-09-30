import type { Project } from "../types";

const projectAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}projects/${fileName}`;

export const projects: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription:
      "Application web pour découvrir des animes et gérer une bibliothèque personnelle synchronisée avec AniList.",
    description:
      "AniVault est le projet web sur lequel j'ai le plus travaillé. J'y ai construit le frontend React, l'API Express et la couche de données avec Prisma.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "AniList"],
    features: [
      "Catalogue synchronisé avec AniList",
      "Recherche avancée et filtres",
      "Bibliothèque, favoris et progression",
      "Architecture frontend / backend séparée"
    ],
    context: "Projet personnel · full-stack",
    contribution:
      "Frontend React/TypeScript, API Express, modèles Prisma, synchronisation du catalogue et logique de bibliothèque.",
    challenge:
      "Faire fonctionner proprement la synchronisation AniList et la persistance des données entre le client, l'API et PostgreSQL.",
    result:
      "Une application utilisable avec catalogue, recherche, fiches anime et gestion d'une liste personnelle.",
    githubUrl: "https://github.com/LylianMichel/anivault",
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
    icon: "LibraryBig"
  },
  {
    id: "towerdefence",
    title: "THE WORLD DEFENCE",
    shortDescription:
      "Tower defense développé avec Godot autour d'une campagne par âges, de tours évolutives, de héros et de plusieurs modes de jeu.",
    description:
      "THE WORLD DEFENCE est mon projet de jeu personnel. J'y travaille les systèmes de gameplay, les interfaces, la progression et les outils de validation.",
    technologies: ["Godot", "GDScript", "Game design", "UI", "Pixel art"],
    features: [
      "Tours et spécialisations",
      "Héros, boss et progression",
      "Campagne organisée en plusieurs âges",
      "Modes Histoire, Infini, Challenges et Boss Rush"
    ],
    context: "Projet personnel · jeu vidéo",
    contribution:
      "Gameplay, progression, interfaces, équilibrage des modes et organisation des données de tours, héros et ennemis.",
    challenge:
      "Faire évoluer beaucoup de systèmes sans perdre en lisibilité dans les menus et sans rendre la progression trop complexe.",
    result:
      "Un projet jouable qui sert aussi de terrain d'expérimentation pour l'UI, les systèmes et le game design.",
    githubUrl: "https://github.com/LylianMichel/towerdefence",
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
    icon: "Gamepad2"
  },
  {
    id: "le-temple",
    title: "Le Temple",
    shortDescription:
      "Application Laravel conçue autour des besoins d'un institut : comptes, réservations, catalogue et logique métier.",
    description:
      "Ce projet m'a permis de travailler une application web côté serveur avec des besoins métier plus concrets qu'une simple page vitrine.",
    technologies: ["Laravel", "PHP", "SQLite", "PHPUnit"],
    features: [
      "Réservations",
      "Comptes et rôles",
      "Catalogue et stocks",
      "Tests PHPUnit"
    ],
    context: "Projet universitaire / métier",
    contribution:
      "Développement des écrans et de la logique Laravel autour des comptes, réservations, catalogue et tests.",
    result:
      "Une base d'application métier structurée autour de cas d'usage concrets.",
    githubUrl: "https://github.com/LylianMichel/Le_temple",
    images: [
      { src: projectAsset("le-temple.webp"), alt: "Concept de page d'accueil du projet Le Temple", label: "Accueil" },
      { src: projectAsset("le-temple-spa.webp"), alt: "Visuel principal du projet Le Temple", label: "Univers visuel" }
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
      "Site vitrine responsive autour du reconditionnement informatique, réalisé en HTML, CSS et JavaScript.",
    description:
      "Un projet plus compact qui m'a permis de travailler la mise en page responsive, la navigation mobile et la cohérence visuelle.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
    features: [
      "Mise en page responsive",
      "Navigation mobile",
      "Validation côté navigateur",
      "Direction visuelle cohérente"
    ],
    context: "Projet web · interface responsive",
    contribution:
      "Intégration HTML/CSS, responsive, navigation mobile et interactions JavaScript simples.",
    result:
      "Un site vitrine léger, lisible et adapté aux principaux formats d'écran.",
    githubUrl: "https://github.com/LylianMichel/Eco-repare",
    images: [
      { src: projectAsset("eco-repare-preview.svg"), alt: "Aperçu du projet Eco'Répare", label: "Présentation" }
    ],
    year: "2026",
    type: "Site vitrine",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];
