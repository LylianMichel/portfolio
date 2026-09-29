import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../data/profile";

const quickLinks = [
  { label: "AniVault", target: "anivault" },
  { label: "THE WORLD DEFENCE", target: "towerdefence" },
  { label: "Compétences", target: "competences" },
  { label: "Parcours", target: "parcours" },
] as const;

export const Hero = () => (
  <section className="content-shell pt-24 sm:pt-28 lg:pt-12" id="accueil">
    <div className="mx-auto max-w-6xl">
      <div className="workspace-kicker"><span>Work</span><span>/</span><span>Portfolio 2026</span></div>

      <div className="hero-grid mt-5">
        <div className="hero-copy">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span className="status-pill"><span className="status-dot" />BUT Informatique</span>
            <span className="inline-flex items-center gap-1.5 px-1"><MapPin className="h-3.5 w-3.5" />{profile.location}</span>
          </div>

          <h1 className="hero-title mt-7 max-w-3xl text-balance font-semibold text-[var(--text)]">
            Je développe des applications web et des jeux.
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
            Je m'appelle <strong className="font-semibold text-[var(--text)]">{profile.name}</strong> et je suis en BUT Informatique à l'IUT de Lens. Ici, je présente les projets sur lesquels j'ai le plus travaillé.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <button type="button" onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })} className="primary-action">
              Voir mes projets <ArrowDown className="h-4 w-4" />
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="secondary-action">
              LinkedIn <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {quickLinks.map((item) => (
              <button key={item.target} type="button" onClick={() => document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })} className="prompt-chip">
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="now-card">
          <div className="flex items-center justify-between gap-4"><p className="text-xs font-semibold text-[var(--text)]">En ce moment</p><span className="live-dot" aria-hidden="true" /></div>
          <dl className="mt-5 space-y-4">
            <div><dt className="text-[11px] text-[var(--muted)]">Formation</dt><dd className="mt-1 text-sm font-medium text-[var(--text)]">BUT Informatique · IUT de Lens</dd></div>
            <div><dt className="text-[11px] text-[var(--muted)]">Projet principal</dt><dd className="mt-1 text-sm font-medium text-[var(--text)]">AniVault · React / Node.js</dd></div>
            <div><dt className="text-[11px] text-[var(--muted)]">Stage</dt><dd className="mt-1 text-sm font-medium text-[var(--text)]">8 semaines · dès le 12 avril 2027</dd></div>
          </dl>
          <div className="mt-5 border-t border-[var(--border)] pt-4">
            <div className="grid grid-cols-2 gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mini-link-card"><Github className="h-4 w-4" />GitHub<ArrowUpRight className="ml-auto h-3.5 w-3.5" /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mini-link-card"><Linkedin className="h-4 w-4" />LinkedIn<ArrowUpRight className="ml-auto h-3.5 w-3.5" /></a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
);
