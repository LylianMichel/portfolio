import { ArrowDown, ArrowUpRight, Download, MoveUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const anivault = projects.find((project) => project.id === "anivault");
const worldDefence = projects.find((project) => project.id === "towerdefence");

export const Hero = () => (
  <section id="accueil" aria-labelledby="intro-title" className="content-shell hero-section impact-hero">
    <div className="mx-auto max-w-6xl">
      <div className="impact-hero-topline">
        <span>Portfolio personnel / 2026</span>
        <span className="impact-hero-location"><span aria-hidden="true" className="impact-status-dot" /> Basé dans les Hauts-de-France</span>
      </div>

      <div className="impact-hero-layout">
        <div className="impact-intro">
          <p className="impact-kicker">Développeur web & créateur de jeux vidéo</p>
          <h1 id="intro-title" className="impact-name">
            <span>Lylian</span>
            <span className="impact-name-accent">Michel<span className="impact-name-dot">.</span></span>
          </h1>

          <p className="impact-statement">
            J'aime passer <em>de l'idée à l'écran.</em>
          </p>

          <p className="impact-description">
            Étudiant en BUT Informatique à l'IUT de Lens, je construis des applications web et des jeux.
            Voici mes projets, les choix derrière leur conception et les technologies que j'utilise.
          </p>

          <div className="impact-actions">
            <a href="#projets" className="primary-action">Découvrir mes projets <ArrowDown size={17} aria-hidden="true" /></a>
            <a href="#contact" className="secondary-action">Parlons de ton projet <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>

          <nav className="impact-jump" aria-label="Accès aux rubriques du portfolio">
            <a href="#competences">Mes compétences <span>↗</span></a>
            <a href="#a-propos">À propos <span>↗</span></a>
            <a href="#parcours">Mon parcours <span>↗</span></a>
          </nav>
        </div>

        <div className="impact-hero-art" aria-label="Aperçu des créations">
          <div className="impact-art-caption"><span>À l'écran</span><span>Projets réels, captures réelles</span></div>
          {anivault?.images[0] ? (
            <a href="#anivault" className="impact-main-project" aria-label="Découvrir AniVault">
              <span className="impact-art-browser" aria-hidden="true"><i /><i /><i /><span>anivault / application web</span></span>
              <img
                src={anivault.images[0].src}
                srcSet={anivault.images[0].srcSet}
                sizes="(min-width: 1200px) 43vw, 88vw"
                width={anivault.images[0].width}
                height={anivault.images[0].height}
                alt="Aperçu de l'interface de l'application AniVault"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <span className="impact-art-name">AniVault <MoveUpRight size={20} aria-hidden="true" /></span>
              <span className="impact-art-subtitle">Application web full-stack</span>
            </a>
          ) : null}

          {worldDefence?.images[0] ? (
            <a href="#towerdefence" className="impact-mini-project" aria-label="Découvrir THE WORLD DEFENCE">
              <img
                src={worldDefence.images[0].src}
                srcSet={worldDefence.images[0].srcSet}
                sizes="(min-width: 1200px) 23vw, 66vw"
                width={worldDefence.images[0].width}
                height={worldDefence.images[0].height}
                alt="Aperçu du jeu THE WORLD DEFENCE"
                loading="lazy"
                decoding="async"
              />
              <span><strong>THE WORLD DEFENCE</strong><small>Jeu vidéo · Godot</small></span>
              <MoveUpRight size={16} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="impact-stage-line">
        <div className="impact-stage-left">
          <span className="impact-stage-label">Disponible pour un stage</span>
          <strong>8 semaines · dès le 12 avril 2027</strong>
        </div>
        <a href={profile.cvUrl} download className="impact-stage-download">Télécharger mon CV <Download size={16} aria-hidden="true" /></a>
      </div>
    </div>
  </section>
);
