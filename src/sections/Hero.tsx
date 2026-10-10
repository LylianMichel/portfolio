import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const webProject = projects.find((project) => project.id === "anivault");
const gameProject = projects.find((project) => project.id === "towerdefence");

export const Hero = () => (
  <section aria-labelledby="intro-title" className="content-shell hero-section" id="accueil">
    <div className="mx-auto max-w-6xl">
      <p className="hero-intro">Étudiant en BUT Informatique · IUT de Lens</p>
      <h1 id="intro-title" className="hero-name">{profile.name}</h1>
      <p className="hero-specialty">Développement web <span>&</span> jeux vidéo.</p>

      <div className="hero-grid hero-grid-visual">
        <div className="hero-copy">
          <p className="hero-description">
            Je développe des applications web et des jeux, de l'interface aux données.
            Ici, je montre mes réalisations, les outils que j'utilise et ce que j'ai appris en les construisant.
          </p>

          <div className="hero-actions">
            <a href="#projets" className="primary-action">Explorer mes projets <ArrowDown size={16} aria-hidden="true" /></a>
            <a href="#contact" className="secondary-action">Me contacter</a>
          </div>

          <nav className="hero-quick-links" aria-label="Accès rapides">
            <a href="#competences">Compétences</a>
            <a href="#a-propos">À propos</a>
            <a href="#parcours">Parcours</a>
          </nav>

          <aside className="hero-stage hero-stage-compact" aria-label="Recherche de stage">
            <p>Recherche de stage</p>
            <p className="hero-stage-date">À partir du 12 avril 2027</p>
            <p>8 semaines · développement web ou logiciel</p>
            <a href={profile.cvUrl} download className="hero-cv">Télécharger mon CV <Download size={15} aria-hidden="true" /></a>
          </aside>
        </div>

        <div className="hero-showcase" aria-label="Aperçu de mes projets">
          <div className="hero-showcase-heading">
            <span>Projets récents</span>
            <span>Web / Jeu vidéo</span>
          </div>

          {webProject?.images[0] ? (
            <a className="hero-showcase-feature" href="#anivault" aria-label="Découvrir le projet AniVault">
              <img
                src={webProject.images[0].src}
                srcSet={webProject.images[0].srcSet}
                sizes="(min-width: 1180px) 40vw, (min-width: 768px) 70vw, 90vw"
                width={webProject.images[0].width}
                height={webProject.images[0].height}
                alt="Capture de l'interface AniVault"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <span className="hero-showcase-caption">
                <span><small>Application web</small><strong>AniVault</strong></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>
          ) : null}

          {gameProject?.images[0] ? (
            <a className="hero-showcase-game" href="#towerdefence" aria-label="Découvrir le jeu THE WORLD DEFENCE">
              <img
                src={gameProject.images[0].src}
                srcSet={gameProject.images[0].srcSet}
                sizes="(min-width: 1180px) 30vw, (min-width: 768px) 53vw, 70vw"
                width={gameProject.images[0].width}
                height={gameProject.images[0].height}
                alt="Capture de l'interface de THE WORLD DEFENCE"
                loading="lazy"
                decoding="async"
              />
              <span className="hero-showcase-caption">
                <span><small>Jeu Godot</small><strong>THE WORLD DEFENCE</strong></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);
