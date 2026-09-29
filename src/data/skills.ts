import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Technologies utilisées pour mes interfaces web.",
    skills: [
      { name: "React", description: "Utilisé sur AniVault et ce portfolio.", level: "En progression", icon: "Laptop" },
      { name: "TypeScript", description: "Utilisé pour typer les composants et les données du portfolio.", level: "En progression", icon: "Code2" },
      { name: "JavaScript", description: "Utilisé sur mes projets web et Eco'Répare.", level: "Intermédiaire", icon: "Code2" },
      { name: "HTML / CSS", description: "Base de mes interfaces web et du responsive.", level: "Intermédiaire", icon: "Globe2" },
      { name: "Tailwind CSS", description: "Utilisé pour construire l'interface de ce portfolio.", level: "Intermédiaire", icon: "WandSparkles" }
    ]
  },
  {
    title: "Backend",
    description: "API, logique serveur et applications web côté serveur.",
    skills: [
      { name: "Node.js / Express", description: "API backend d'AniVault.", level: "En progression", icon: "ServerCog" },
      { name: "PHP / Laravel", description: "Utilisé sur Le Temple et mes travaux web en BUT.", level: "En progression", icon: "ServerCog" },
      { name: "Java", description: "POO, structures de données et projets universitaires.", level: "Intermédiaire", icon: "TerminalSquare" },
      { name: "Python", description: "Algorithmique et scripts réalisés pendant le BUT.", level: "Intermédiaire", icon: "TerminalSquare" }
    ]
  },
  {
    title: "Bases de données",
    description: "Modélisation, requêtes et persistance de données.",
    skills: [
      { name: "PostgreSQL", description: "Base de données actuelle d'AniVault.", level: "En progression", icon: "Database" },
      { name: "Prisma", description: "Couche d'accès aux données utilisée dans AniVault.", level: "En progression", icon: "Database" },
      { name: "SQLite", description: "Utilisé notamment dans Le Temple et plusieurs exercices.", level: "Intermédiaire", icon: "Database" },
      { name: "SQL", description: "Requêtes, fonctions, jointures et travail sur bases relationnelles.", level: "Intermédiaire", icon: "Database" }
    ]
  },
  {
    title: "Outils",
    description: "Outils que j'utilise pour développer, tester et versionner mes projets.",
    skills: [
      { name: "Git / GitHub", description: "Branches, commits, pull requests et organisation des dépôts.", level: "Intermédiaire", icon: "GitBranch" },
      { name: "Linux", description: "Environnement utilisé pendant ma formation et pour les outils en ligne de commande.", level: "En progression", icon: "TerminalSquare" },
      { name: "Vite", description: "Serveur de développement et build du portfolio et d'AniVault.", level: "Intermédiaire", icon: "Laptop" },
      { name: "VS Code", description: "Un de mes environnements principaux pour le développement web.", level: "Intermédiaire", icon: "Code2" }
    ]
  },
  {
    title: "Jeu vidéo",
    description: "Compétences travaillées avec THE WORLD DEFENCE.",
    skills: [
      { name: "Godot", description: "Moteur utilisé pour développer THE WORLD DEFENCE.", level: "En progression", icon: "Gamepad2" },
      { name: "GDScript", description: "Gameplay, interfaces et systèmes du jeu.", level: "En progression", icon: "Code2" },
      { name: "Game design", description: "Progression, tours, héros, boss et modes de jeu.", level: "En progression", icon: "Gamepad2" }
    ]
  }
];
