import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const anivault = projects.find((project) => project.id === "anivault");
const worldDefence = projects.find((project) => project.id === "towerdefence");

export const Hero = () => (
  <section id="accueil" aria-labelledby="intro-title" className="content-shell hero-section editorial-hero">
    <div className="mx-auto max-w-6xl">
      <div className="editorial-headingline">
        <span>Portfolio de Lylian Michel</span>
        <span>BUT Informatique · IUT de Lens</span>
      </div>

      <div className="editorial-hero-grid">
        <div className="editorial-intro">
          <p className="editorial-intro-label">Bienvenue, moi c'est</p>
          <h1 id="intro-title" className="editorial-name">Lylian Michel<span>.</span></h1>

          <p className="editorial-lead">Je développe des applications web et des jeux vidéo.</p>

          <p className="editorial-description">
            Je suis étudiant en deuxième année de BUT Informatique à Lens.
            En dehors des cours, je travaille notamment sur AniVault, une application web,
            et sur mon jeu de tower defense réalisé avec Godot.
          </p>

          <div className="editorial-actions">
            <a href="#projets" className="primary-action">Voir mes projets <ArrowDown size={16} aria-hidden="true" /></a>
            <a href="#contact" className="editorial-text-action">Me contacter <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>

          <div className="editorial-availability">
            <span aria-hidden="true" className="editorial-availability-dot" />
            <p><strong>Je recherche un stage</strong> de 8 semaines, à partir du 12 avril 2027.</p>
          </div>
        </div>

        <div className="editorial-preview">
          <div className="editorial-preview-heading">
            <span>Projet en avant</span>
            <span>Développement web</span>
          </div>
          {anivault?.images[0] ? (
            <a href="#anivault" className="editorial-preview-main" aria-label="Découvrir AniVault">
              <img
                src={anivault.images[0].src}
                srcSet={anivault.images[0].srcSet}
                sizes="(min-width: 1200px) 42vw, (min-width: 768px) 75vw, 90vw"
                width={anivault.images[0].width}
                height={anivault.images[0].height}
                alt="Capture de l'interface de l'application AniVault"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <span className="editorial-preview-title">
                <span><strong>AniVault</strong><small>React, Express, PostgreSQL</small></span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </a>
          ) : null}
          {worldDefence ? (
            <a href="#towerdefence" className="editorial-preview-next">
              <span><small>Également en développement</small><strong>THE WORLD DEFENCE</strong></span>
              <span>Jeu vidéo · Godot <ArrowUpRight size={16} aria-hidden="true" /></span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="editorial-footnote">
        <span>Web · Programmation · Game design</span>
        <a href={profile.cvUrl} download>Télécharger mon CV <Download size={16} aria-hidden="true" /></a>
      </div>
    </div>
  </section>
);
