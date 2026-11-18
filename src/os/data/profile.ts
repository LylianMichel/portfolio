import type { Profile, SocialLink } from "../portfolioTypes";

export const profile: Profile = {
  name: "Lylian Michel",
  role: "Étudiant en BUT Informatique",
  tagline: "Je développe des applications web, des outils logiciels et des jeux.",
  location: "Hauts-de-France, France",
  email: "lylianmichel@gmail.com",
  github: "https://github.com/LylianMichel",
  linkedin: "https://www.linkedin.com/in/lylian-michel-bb960a3ab/",
  cvUrl: `${import.meta.env.BASE_URL}CV-LylianMichel.pdf`,
  photo: `${import.meta.env.BASE_URL}portrait-lylian-michel.png`,
  education: "BUT Informatique, deuxième année",
  school: "IUT de Lens",
  // La spécialité reste facultative : aucun intitulé de parcours n'a été confirmé.
  description: "Je suis en deuxième année de BUT Informatique à l’IUT de Lens et je vis à Barlin, dans le Pas-de-Calais. Je construis mes projets en parallèle des cours, avec l’envie de progresser en développement web et logiciel.",
  internship: {
    startDate: "2027-04-12",
    durationWeeks: 8,
  },
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "E-mail", href: `mailto:${profile.email}` },
];
