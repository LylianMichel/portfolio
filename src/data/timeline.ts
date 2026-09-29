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
      "Développement d'AniVault et de THE WORLD DEFENCE pour approfondir React, TypeScript, les architectures web et la conception de jeux.",
    tags: ["React", "TypeScript", "Godot", "Création"]
  },
  {
    period: "À partir du 12 avril 2027",
    title: "Stage informatique",
    description:
      "Je recherche un stage de 8 semaines pour travailler sur un projet de développement dans un environnement professionnel.",
    tags: ["Stage", "Développement", "Équipe"],
    future: true
  }
];
