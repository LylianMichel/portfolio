import { ArrowDown, Github, MapPin } from "lucide-react";
import { profile } from "../data/profile";

const quickLinks = [
  { label: "Voir AniVault", target: "anivault" },
  { label: "Voir THE WORLD DEFENCE", target: "towerdefence" },
  { label: "Mes compétences", target: "competences" },
  { label: "Mon parcours", target: "parcours" },
] as const;

export const Hero = () => (
  <section className="content-shell pt-24 sm:pt-28 lg:pt-16" id="accueil">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <span className="status-pill">
          <span className="status-dot" />
          BUT Informatique
        </span>
        <span className="inline-flex items-center gap-1.5 px-1">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </span>
      </div>

      <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-6xl">
        Je construis des projets web et logiciels qui vont plus loin qu'une simple démo.
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
        Je suis <strong className="font-semibold text-[var(--text)]">{profile.name}</strong>, étudiant en BUT Informatique à l'IUT de Lens. Je travaille surtout sur le web, les applications complètes et le jeu vidéo.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {quickLinks.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })}
            className="prompt-chip"
          >
            {item.label}
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
      >
        <Github className="h-4 w-4" />
        github.com/LylianMichel
      </a>
    </div>
  </section>
);
