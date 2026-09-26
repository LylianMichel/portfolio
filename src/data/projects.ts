import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "tower-defense",
    title: "Tower Defense",
    shortDescription: "Un jeu de stratégie construit autour de vagues, de tours évolutives et d'une direction artistique pixel art.",
    description:
      "Projet de jeu développé avec Godot, pensé comme un système modulaire : ennemis, vagues, tours, améliorations et progression peuvent évoluer indépendamment.",
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
    shortDescription: "Une sélection de projets universitaires orientés objet réalisés en BUT Informatique.",
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
    shortDescription: "Interfaces responsive avec une attention particulière portée à l'ergonomie et à la clarté.",
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
  },
  {
    id: "anivault",
    title: "AniVault",
    shortDescription: "Une application moderne pour organiser, explorer et suivre ses animés.",
    description:
      "Projet évolutif full-stack avec catalogue, gestion de contenu et favoris. L'objectif est de proposer une expérience claire autour d'une collection d'animés.",
    technologies: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    features: [
      "Catalogue d'animés",
      "Gestion de favoris",
      "Interface moderne",
      "Architecture client / serveur évolutive"
    ],
    githubUrl: "https://github.com/LylianMichel",
    tone: "mixed",
    icon: "LibraryBig"
  }
];

export const projectFilters = ["Tous", "Godot", "Java", "React", "TypeScript"] as const;
