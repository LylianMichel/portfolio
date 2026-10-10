import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/profile";

export const Hero = () => (
  <section aria-labelledby="intro-title" className="content-shell hero-section" id="accueil">
    <div className="mx-auto max-w-6xl">
      <p className="hero-intro">Étudiant en BUT Informatique · IUT de Lens</p>
      <h1 id="intro-title" className="hero-name">{profile.name}</h1>
      <p className="hero-specialty">Développement web <span>&</span> jeux vidéo.</p>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-description">
            Je conçois des applications web et des jeux, du premier écran jusqu'aux fonctionnalités qui les font tourner.
            Mes projets me permettent d'explorer aussi bien le frontend que la logique métier et le game design.
          </p>
          <div className="hero-actions">
            <a href="#projets" className="primary-action">Voir mes projets <ArrowDown size={16} aria-hidden="true" /></a>
            <a href="#contact" className="secondary-action">Me contacter</a>
          </div>
          <nav className="hero-quick-links" aria-label="Accès rapides">
            <a href="#competences">Compétences</a>
            <a href="#a-propos">À propos</a>
            <a href="#parcours">Parcours</a>
          </nav>
        </div>
        <aside className="hero-stage" aria-label="Recherche de stage">
          <p>Recherche de stage</p>
          <p className="hero-stage-date">À partir du 12 avril 2027</p>
          <p>8 semaines · développement web ou logiciel</p>
          <a href={profile.cvUrl} download className="hero-cv">Télécharger mon CV <Download size={15} aria-hidden="true" /></a>
        </aside>
      </div>

      <div className="hero-current" aria-label="Mes projets du moment">
        <p className="hero-current-label">En ce moment</p>
        <div className="hero-current-grid">
          <a href="#anivault" className="hero-current-link">
            <span className="hero-current-index">WEB</span>
            <span className="hero-current-text">
              <strong>AniVault</strong>
              <span>Une bibliothèque d'animes, du frontend aux données.</span>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="#towerdefence" className="hero-current-link">
            <span className="hero-current-index">JEU</span>
            <span className="hero-current-text">
              <strong>THE WORLD DEFENCE</strong>
              <span>Un tower defense où je développe gameplay et interfaces.</span>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
);
