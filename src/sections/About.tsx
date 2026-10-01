import { Code2, Gamepad2, GitBranch } from "lucide-react";

const principles = [
  {
    icon: Code2,
    title: "Web & applications complètes",
    text: "J'aime comprendre tout le chemin d'une fonctionnalité, de l'interface jusqu'aux données."
  },
  {
    icon: GitBranch,
    title: "Faire évoluer un projet",
    text: "Je reviens régulièrement sur mon code pour simplifier une partie, corriger un choix ou mieux organiser le projet."
  },
  {
    icon: Gamepad2,
    title: "Développement de jeux",
    text: "THE WORLD DEFENCE me permet de travailler des systèmes, de l'UI et de la logique très différents du web."
  }
] as const;

export const About = () => (
  <section id="a-propos" className="content-shell section-block">
    <div className="about-section mx-auto max-w-6xl">
      <div className="about-copy">
        <p className="section-eyebrow">À propos</p>
        <h2>Du web au jeu vidéo.</h2>
        <p className="about-lead">
          Je suis Lylian Michel, étudiant en deuxième année de BUT Informatique à l'IUT de Lens.
        </p>
        <p>
          Je m'intéresse surtout au développement web, au développement logiciel et aux projets où je peux toucher à plusieurs parties : interface, logique, données et organisation du code. Mes projets personnels me servent à aller plus loin que les exercices de cours et à revenir sur mes choix quand quelque chose peut être amélioré.
        </p>
      </div>

      <div className="about-notes">
        {principles.map(({ icon: Icon, title, text }) => (
          <article key={title} className="about-note">
            <Icon className="h-4 w-4" aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
