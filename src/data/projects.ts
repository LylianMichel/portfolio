import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "anivault",
    title: "AniVault",
    shortDescription: "Une application full-stack pour explorer, organiser et suivre des animés.",
    description:
      "Mon projet web le plus complet : une interface React connectée à une API Node.js, avec persistance via Prisma et PostgreSQL. Le projet évolue progressivement autour du catalogue, des favoris et de l'expérience utilisateur.",
    technologies: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    features: [
      "Catalogue synchronisé et recherche",
      "Gestion de favoris et de contenus",
      "Architecture client / serveur",
      "Base PostgreSQL pilotée avec Prisma"
    ],
    githubUrl: "https://github.com/LylianMichel",
    tone: "mixed",
    icon: "LibraryBig"
  },
  {
    id: "tower-defense",
    title: "Tower Defense",
    shortDescription: "Un jeu Godot construit autour de vagues, de tours évolutives et d'une direction artistique pixel art.",
    description:
      "Projet personnel de jeu développé avec Godot, pensé comme un système modulaire : ennemis, vagues, tours, améliorations et progression évoluent indépendamment.",
    technologies: ["Godot", "GDScript", "Pixel art", "Game design"],
    features: [
      "Gestion des vagues d'ennemis",
      "Système de tours et d'améliorations",
      "Progression et équilibrage",
      "Direction artistique pixel art"
    ],
    githubUrl: "https://github.com/LylianMichel",
    tone: "violet",
    icon: "Gamepad2"
  },
  {
    id: "applications-java",
    title: "Applications Java",
    shortDescription: "Des projets universitaires pour travailler la POO, les structures de données et les tests.",
    description:
      "Des exercices et applications centrés sur la programmation orientée objet, les structures de données, les tests et l'organisation d'un code lisible.",
    technologies: ["Java", "POO", "JUnit", "Git"],
    features: [
      "Programmation orientée objet",
      "Structures de données",
      "Tests et débogage",
      "Travail en équipe avec Git"
    ],
    githubUrl: "https://github.com/LylianMichel",
    tone: "blue",
    icon: "Coffee"
  },
  {
    id: "sites-web",
    title: "Sites web",
    shortDescription: "Des interfaces responsive réalisées dans le cadre de mes études et de projets personnels.",
    description:
      "Création d'interfaces web adaptées au mobile et au desktop, avec formulaires, interactions utilisateur et composants réutilisables.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    features: [
      "Interfaces responsive",
      "Formulaires et validations",
      "Interactions utilisateur",
      "Composants réutilisables"
    ],
    githubUrl: "https://github.com/LylianMichel",
    tone: "cyan",
    icon: "MonitorSmartphone"
  }
];

export const projectFilters = ["Tous", "React", "TypeScript", "Godot", "Java"] as const;
