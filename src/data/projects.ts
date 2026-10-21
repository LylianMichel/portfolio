import type { Project } from "../types";
import imageSizes from "./projectImageSizes.json";

const projectAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}projects/${fileName}`;

const projectList: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription:
      "Application web pour découvrir des animes et gérer une bibliothèque personnelle synchronisée avec AniList.",
    description:
      "AniVault est le projet web sur lequel j'ai le plus travaillé. J'y ai construit le frontend React, l'API Express et la couche de données avec Prisma.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "AniList", "Vite"],
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
    codeAccess: "private",
    demoUrl: "https://anivault-blush.vercel.app/",
    technicalApproach:
      "J'ai séparé l'interface React/TypeScript de l'API Express et utilisé Prisma pour accéder aux données PostgreSQL.",
    images: [
      { src: projectAsset("anivault-home.webp"), alt: "Accueil de la version actuelle d'AniVault", label: "Accueil" }
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
    codeAccess: "private",
    technicalApproach:
      "J'organise les données des tours, des héros et des ennemis pour faire évoluer les systèmes de gameplay et de progression.",
    images: [
      { src: projectAsset("towerdefence-hub.webp"), alt: "Accueil du hub de THE WORLD DEFENCE", label: "Hub" },
      { src: projectAsset("towerdefence-menu.webp"), alt: "Menu de jeu de THE WORLD DEFENCE", label: "Jouer" },
      { src: projectAsset("towerdefence-personnages.webp"), alt: "Écran des héros de THE WORLD DEFENCE", label: "Héros" },
      { src: projectAsset("towerdefence-evolution.webp"), alt: "Écran de progression de THE WORLD DEFENCE", label: "Progression" },
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
    codeAccess: "private",
    technicalApproach:
      "J'ai travaillé avec Laravel sur les comptes, les réservations et le catalogue, en utilisant PHPUnit pour les tests.",
    images: [
      { src: projectAsset("le-temple-home.webp"), alt: "Page d'accueil réelle du projet Le Temple", label: "Accueil" },
      { src: projectAsset("le-temple-soins.webp"), alt: "Catalogue de soins du projet Le Temple", label: "Soins" }
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
      "Site Laravel de réparation et de reconditionnement informatique : catalogue de produits, recherche, devis et administration.",
    description:
      "Refonte en Laravel 12, Blade et Eloquent avec un catalogue dynamique, des fiches produits et un parcours de demande de devis.",
    technologies: ["Laravel", "PHP", "Blade", "Eloquent", "SQLite", "CSS", "JavaScript"],
    features: [
      "Catalogue de 21 références avec recherche, filtres et pagination",
      "Fiches produits et pages de services",
      "Formulaire de devis avec validation et consentement",
      "Administration des produits et des demandes"
    ],
    context: "Projet web · refonte Laravel",
    contribution:
      "Refonte de l'interface et intégration Laravel, des pages de catalogue et du parcours de contact.",
    challenge:
      "Moderniser le site tout en conservant les références du catalogue et en organisant les interactions côté serveur.",
    result:
      "Un site Laravel structuré avec navigation responsive, catalogue, fiches produits et demandes de devis.",
    githubUrl: "https://github.com/LylianMichel/Eco-repare",
    codeAccess: "public",
    technicalApproach:
      "Blade pour les vues, Eloquent pour les produits, contrôleurs Laravel pour le catalogue et les devis, CSS et JavaScript statiques pour l'interface.",
    images: [
      { src: projectAsset("eco-repare-home.webp"), alt: "Ancienne capture de la page d'accueil d'Eco'Répare, à remplacer par une capture Laravel récente", label: "Accueil (ancienne capture)" }
    ],
    year: "2026",
    type: "Application web Laravel",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];


export const projects: Project[] = projectList.map((project) => ({
  ...project,
  images: project.images.map((image) => {
    const fileName = image.src.split("/").at(-1) as keyof typeof imageSizes;
    const size = imageSizes[fileName];
    return size ? {
      ...image,
      width: size.width,
      height: size.height,
      srcSet: `${projectAsset(size.small)} 640w, ${image.src} ${size.width}w`,
    } : image;
  }),
}));
