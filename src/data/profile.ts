import type { SocialLink } from "../types";

export const profile = {
  name: "Lylian Michel",
  role: "Étudiant en BUT Informatique",
  tagline: "Je conçois des applications web, des jeux et des expériences numériques.",
  location: "Hauts-de-France, France",
  email: "email@example.com",
  github: "https://github.com/LylianMichel",
  linkedin: "https://linkedin.com/in/ton-profil",
  cvUrl: "/CV-Lylian-Michel.pdf",
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
];
