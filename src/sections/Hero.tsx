import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile } from "../data/profile";

const quickLinks = [
  { label: "Compétences", target: "competences" },
  { label: "Parcours", target: "parcours" },
] as const;

export const Hero = () => (
  <section className="content-shell pt-24 sm:pt-28 lg:pt-12" id="accueil">
    <div className="mx-auto max-w-6xl">
      <div className="workspace-kicker"><span>Portfolio</span><span>/</span><span>2026</span></div>

      <div className="hero-grid mt-5">
        <div className="hero-copy">
          <div className="hero-meta">
            <span><span className="status-dot" aria-hidden="true" />2e année de BUT Informatique</span>
            <span><MapPin className="h-3.5 w-3.5" />IUT de Lens</span>
          </div>

          <h1 className="hero-name mt-7 text-[var(--text)]">{profile.name}</h1>
          <p className="hero-role mt-2">Étudiant en BUT Informatique · Développeur</p>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
            Je construis AniVault, une application pour suivre ses animes, avec React, TypeScript et Node.js. Je développe aussi THE WORLD DEFENCE avec Godot.
          </p>

          <p className="hero-availability mt-5">Stage de 8 semaines · dès le 12 avril 2027</p>

          <div className="mt-7 flex flex-wrap gap-2">
            <a href="#projets" className="primary-action">
              Voir mes projets <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#contact" className="secondary-action">Me contacter</a>
            {profile.cvUrl ? <a href={profile.cvUrl} download className="secondary-action">Mon CV <Download className="h-4 w-4" /></a> : null}
          </div>

          <nav className="hero-quick-links mt-7" aria-label="Accès rapides">
            {quickLinks.map((item) => (
              <a key={item.target} href={`#${item.target}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <aside className="hero-note" aria-label="Projet en cours">
          <p className="hero-note-label">Projet en cours</p>
          <a href="#anivault" className="hero-note-title">AniVault <ArrowUpRight size={18} /></a>
          <p>Du frontend React à l’API Express, je travaille sur une bibliothèque pour suivre ses animes.</p>
          <a href="#anivault" className="hero-note-link">Découvrir le projet</a>
        </aside>
      </div>
    </div>
  </section>
);
