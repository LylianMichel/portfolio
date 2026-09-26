import type { TimelineItem } from "../types";

export const timeline: TimelineItem[] = [
  {
    period: "2025 — aujourd'hui",
    title: "BUT Informatique",
    location: "IUT de Lens",
    description:
      "Formation orientée développement, algorithmique, bases de données, réseaux, web et conduite de projets.",
    tags: ["Java", "Web", "SQL", "Python", "Git"]
  },
  {
    period: "Pendant le BUT",
    title: "Projets universitaires",
    description:
      "Mise en pratique des compétences techniques à travers des applications, travaux en équipe, tests et livrables structurés.",
    tags: ["POO", "Équipe", "Tests", "Méthodes"]
  },
  {
    period: "Projets personnels",
    title: "Web & jeu vidéo",
    description:
      "Développement d'AniVault et d'un Tower Defense pour approfondir React, TypeScript, les architectures web et la conception de jeux.",
    tags: ["React", "TypeScript", "Godot", "Création"]
  },
  {
    period: "2027",
    title: "Prochaine étape : expérience professionnelle",
    description:
      "Une entrée prévue dans un contexte professionnel afin de consolider les compétences acquises et participer à des projets réels.",
    tags: ["Stage", "Développement", "Équipe"],
    future: true
  }
];
