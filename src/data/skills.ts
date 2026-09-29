import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Technologies utilisées pour construire les interfaces de mes projets.",
    skills: [
      { name: "React", description: "Utilisé sur AniVault et ce portfolio.", level: "En progression", icon: "Laptop" },
      { name: "TypeScript", description: "Utilisé sur AniVault et ce portfolio pour mieux typer les composants et les données.", level: "En progression", icon: "Code2" },
      { name: "JavaScript", description: "Utilisé sur plusieurs projets web, notamment Eco'Répare.", level: "Intermédiaire", icon: "Code2" },
      { name: "HTML / CSS", description: "Base de mes projets web et de leur responsive.", level: "Intermédiaire", icon: "Globe2" },
      { name: "Tailwind CSS", description: "Utilisé pour construire et maintenir l'interface de ce portfolio.", level: "En progression", icon: "WandSparkles" }
    ]
  },
  {
    title: "Backend & applications",
    description: "Technologies utilisées côté serveur et pour la logique métier.",
    skills: [
      { name: "Node.js / Express", description: "API et logique serveur d'AniVault.", level: "En progression", icon: "ServerCog" },
      { name: "PHP / Laravel", description: "Utilisé sur Le Temple et mes travaux web en BUT.", level: "En progression", icon: "ServerCog" },
      { name: "Java", description: "Utilisé en BUT pour la POO, les structures de données et les tests.", level: "Intermédiaire", icon: "TerminalSquare" },
      { name: "Python", description: "Utilisé en BUT pour l'algorithmique et les scripts.", level: "Intermédiaire", icon: "TerminalSquare" }
    ]
  },
  {
    title: "Données & qualité",
    description: "Technologies utilisées pour stocker, interroger et valider les données.",
    skills: [
      { name: "PostgreSQL", description: "Base de données utilisée sur AniVault.", level: "En progression", icon: "Database" },
      { name: "SQLite", description: "Utilisé sur des projets locaux et sur Le Temple.", level: "Intermédiaire", icon: "Database" },
      { name: "Prisma", description: "Accès aux données et modèles côté Node.js sur AniVault.", level: "En progression", icon: "Database" },
      { name: "SQL", description: "Requêtes, jointures, fonctions et travail relationnel en BUT.", level: "Intermédiaire", icon: "Database" },
      { name: "Tests", description: "JUnit, PHPUnit, tests backend et tests end-to-end.", level: "En progression", icon: "Code2" }
    ]
  },
  {
    title: "Outils & création",
    description: "Outils qui accompagnent mon développement au quotidien.",
    skills: [
      { name: "Git / GitHub", description: "Branches, commits et organisation de mes dépôts.", level: "Intermédiaire", icon: "GitBranch" },
      { name: "Linux", description: "Utilisé en cours et dans mon environnement de développement.", level: "En progression", icon: "TerminalSquare" },
      { name: "Vite", description: "Utilisé sur AniVault et ce portfolio.", level: "Intermédiaire", icon: "Laptop" },
      { name: "Godot", description: "Moteur utilisé pour développer THE WORLD DEFENCE.", level: "En progression", icon: "Gamepad2" }
    ]
  }
];
