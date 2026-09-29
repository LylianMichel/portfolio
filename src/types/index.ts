export type IconName =
  | "Code2"
  | "Database"
  | "Gamepad2"
  | "GitBranch"
  | "Globe2"
  | "Laptop"
  | "ServerCog"
  | "TerminalSquare"
  | "WandSparkles";

export type SkillLevel = "Débutant" | "Intermédiaire" | "En progression";

export interface Skill {
  name: string;
  description: string;
  level: SkillLevel;
  icon: IconName;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: Skill[];
}

export type ProjectTone = "cyan" | "violet" | "blue" | "mixed";
export type ProjectSize = "major" | "medium";

export interface ProjectImage {
  src: string;
  alt: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  context: string;
  motivation: string;
  challenges: string[];
  learning: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  repositoryPublic?: boolean;
  demoUrl?: string;
  images: ProjectImage[];
  year: string;
  type: string;
  size: ProjectSize;
  tone: ProjectTone;
  icon: "Gamepad2" | "Coffee" | "MonitorSmartphone" | "LibraryBig";
}

export interface UniversityProject {
  title: string;
  context: string;
  description: string;
  technologies: string[];
  result: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  location?: string;
  description: string;
  tags: string[];
  future?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

export type PortfolioMode = "work" | "chat";
export type AccentTheme = "green" | "blue" | "violet" | "orange";
export type ThemeMode = "light" | "dark" | "system";
