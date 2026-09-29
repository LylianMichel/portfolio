import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces web lisibles, responsive et maintenables.",
    skills: [
      { name: "HTML", description: "Structure sémantique et accessible.", level: "Intermédiaire", icon: "Globe2" },
      { name: "CSS / Tailwind", description: "Responsive, layouts modernes et styles cohérents.", level: "Intermédiaire", icon: "WandSparkles" },
      { name: "JavaScript", description: "Interactions, logique côté client et composants.", level: "Intermédiaire", icon: "Code2" },
      { name: "TypeScript", description: "Typage et composants plus robustes.", level: "En progression", icon: "Code2" },
      { name: "React", description: "Composants, hooks et interfaces dynamiques.", level: "En progression", icon: "Laptop" }
    ]
  },
  {
    title: "Backend & applications",
    description: "Logique métier, API, programmation objet et applications serveur.",
    skills: [
      { name: "Java", description: "POO, structures de données et projets universitaires.", level: "Intermédiaire", icon: "TerminalSquare" },
      { name: "Node.js / Express", description: "API et logique serveur pour des applications web.", level: "En progression", icon: "ServerCog" },
      { name: "PHP / Laravel", description: "Applications web, routes, contrôleurs et logique métier.", level: "En progression", icon: "ServerCog" },
      { name: "Python", description: "Algorithmique, scripts et traitement de données.", level: "Intermédiaire", icon: "TerminalSquare" }
    ]
  },
  {
    title: "Données & qualité",
    description: "Modélisation, persistance, requêtes et validation du code.",
    skills: [
      { name: "SQL", description: "Requêtes, jointures, sous-requêtes et mises à jour.", level: "Intermédiaire", icon: "Database" },
      { name: "SQLite", description: "Persistance locale et schémas relationnels.", level: "Intermédiaire", icon: "Database" },
      { name: "Prisma", description: "Accès aux données et modélisation côté Node.js.", level: "En progression", icon: "Database" },
      { name: "Tests", description: "JUnit, PHPUnit, tests backend et tests end-to-end.", level: "En progression", icon: "Code2" }
    ]
  },
  {
    title: "Outils & création",
    description: "Environnement de développement, versionnement et création de jeux.",
    skills: [
      { name: "Git / GitHub", description: "Branches, commits, fusion et partage de projets.", level: "Intermédiaire", icon: "GitBranch" },
      { name: "Vite", description: "Outil de développement et de build pour le web moderne.", level: "Intermédiaire", icon: "Laptop" },
      { name: "Godot", description: "Gameplay, systèmes de jeu et outils de validation.", level: "En progression", icon: "Gamepad2" },
      { name: "Game design", description: "Boucles de gameplay, progression et lisibilité.", level: "En progression", icon: "Gamepad2" }
    ]
  }
];
