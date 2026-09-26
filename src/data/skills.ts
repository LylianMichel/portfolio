import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces web lisibles, responsive et maintenables.",
    skills: [
      { name: "HTML", description: "Structure sémantique et accessible.", level: "Intermédiaire", icon: "Globe2" },
      { name: "CSS", description: "Responsive, layouts modernes et animations sobres.", level: "Intermédiaire", icon: "WandSparkles" },
      { name: "JavaScript", description: "Interactions, DOM et logique côté client.", level: "Intermédiaire", icon: "Code2" },
      { name: "TypeScript", description: "Typage et composants plus robustes.", level: "En progression", icon: "Code2" },
      { name: "React", description: "Composants, hooks et interfaces dynamiques.", level: "En progression", icon: "Laptop" }
    ]
  },
  {
    title: "Backend",
    description: "Logique métier, programmation objet et bases serveur.",
    skills: [
      { name: "Java", description: "POO, structures de données et projets universitaires.", level: "Intermédiaire", icon: "TerminalSquare" },
      { name: "Python", description: "Algorithmique, scripts et traitement de données.", level: "Intermédiaire", icon: "TerminalSquare" },
      { name: "API", description: "Consommation et conception de services simples.", level: "En progression", icon: "ServerCog" }
    ]
  },
  {
    title: "Bases de données",
    description: "Modélisation, requêtes et persistance des données.",
    skills: [
      { name: "SQL", description: "Requêtes, jointures, sous-requêtes et mises à jour.", level: "Intermédiaire", icon: "Database" },
      { name: "Conception BDD", description: "Schémas relationnels et organisation cohérente des données.", level: "En progression", icon: "Database" }
    ]
  },
  {
    title: "Outils",
    description: "Environnement de travail et collaboration.",
    skills: [
      { name: "Git", description: "Branches, commits, fusion et travail en équipe.", level: "Intermédiaire", icon: "GitBranch" },
      { name: "GitHub", description: "Dépôts, issues, pull requests et partage de projets.", level: "Intermédiaire", icon: "GitBranch" },
      { name: "VS Code", description: "Environnement principal pour le développement web.", level: "Intermédiaire", icon: "Laptop" },
      { name: "IntelliJ IDEA", description: "Développement et débogage de projets Java.", level: "Intermédiaire", icon: "Laptop" }
    ]
  },
  {
    title: "Création",
    description: "Jeux vidéo, prototypage et création visuelle.",
    skills: [
      { name: "Godot", description: "Gameplay, logique de vagues et systèmes de jeu.", level: "En progression", icon: "Gamepad2" },
      { name: "Pixel art", description: "Direction artistique et assets adaptés au jeu.", level: "En progression", icon: "WandSparkles" },
      { name: "Game design", description: "Boucles de gameplay, progression et lisibilité.", level: "En progression", icon: "Gamepad2" }
    ]
  }
];
