import type { SocialLink } from "../types";

export const profile = {
  name: "Lylian Michel",
  role: "Étudiant en BUT Informatique",
  tagline: "Je développe des applications web, des outils logiciels et des jeux.",
  location: "Hauts-de-France, France",
  email: "lylianmichel@gmail.com",
  github: "https://github.com/LylianMichel",
  linkedin: "https://www.linkedin.com/in/lylian-michel-bb960a3ab/",
  cvUrl: "",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "E-mail", href: `mailto:${profile.email}` },
];
