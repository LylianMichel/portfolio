import { ArrowDown, Github, Linkedin, MapPin, MessageCircle } from "lucide-react";
import { profile } from "../data/profile";

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero = ({ onOpenChat }: HeroProps) => (
  <section className="content-shell pt-24 sm:pt-28 lg:pt-12" id="accueil">
    <div className="mx-auto max-w-6xl">
      <div className="workspace-kicker">
        <span>Work</span>
        <span>/</span>
        <span>Portfolio 2026</span>
      </div>

      <div className="hero-grid mt-5">
        <div className="hero-copy">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span className="status-pill">
              <span className="status-dot" />
              Lylian Michel
            </span>
            <span className="inline-flex items-center gap-1.5 px-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </div>

          <h1 className="hero-title mt-7 max-w-3xl text-balance font-semibold text-[var(--text)]">
            Étudiant en BUT Informatique à l'IUT de Lens.
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
            Je développe principalement des applications web et des projets logiciels, avec un intérêt particulier pour React, TypeScript, Node.js et le développement de projets complets.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
              className="primary-action"
            >
              Voir mes projets
              <ArrowDown className="h-4 w-4" />
            </button>

            <button type="button" onClick={onOpenChat} className="secondary-action">
              Me contacter
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-7 flex flex-wrap gap-4 text-sm">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <aside className="now-card">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold text-[var(--text)]">En ce moment</p>
            <span className="live-dot" aria-hidden="true" />
          </div>

          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-[11px] text-[var(--muted)]">Formation</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text)]">
                BUT Informatique · IUT de Lens
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-[var(--muted)]">Projet principal</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text)]">
                AniVault · React / Node.js
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-[var(--muted)]">Autre projet</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text)]">
                THE WORLD DEFENCE · Godot
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-[var(--muted)]">Stage</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text)]">
                8 semaines · dès le 12 avril 2027
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  </section>
);
