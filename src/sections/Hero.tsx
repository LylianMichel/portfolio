import { ArrowDown, Download } from "lucide-react";
import { profile } from "../data/profile";

export const Hero = () => (
  <section className="content-shell hero-section" id="accueil">
    <div className="mx-auto max-w-6xl">
      <p className="hero-intro">Étudiant en BUT Informatique · IUT de Lens</p>
      <h1 className="hero-name">{profile.name}</h1>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-description">
            Je développe des applications web et des jeux. En ce moment : AniVault, pour suivre ses animes, et THE WORLD DEFENCE, un tower defense avec Godot.
          </p>
          <div className="hero-actions">
            <a href="#projets" className="primary-action">Voir mes projets <ArrowDown size={16} /></a>
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
          <a href={profile.cvUrl} download className="hero-cv">Télécharger mon CV <Download size={15} /></a>
        </aside>
      </div>
    </div>
  </section>
);
