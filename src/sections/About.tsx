export const About = () => (
  <section id="a-propos" aria-labelledby="about-title" className="content-shell section-block">
    <div className="about-section mx-auto max-w-6xl">
      <div className="about-copy">
        <p className="section-eyebrow">À propos</p>
        <h2 id="about-title">Du web au jeu vidéo.</h2>
        <p className="about-lead">Je suis Lylian Michel, étudiant en deuxième année de BUT Informatique à l’IUT de Lens. Je développe des applications en cours et sur mon temps libre, notamment AniVault et THE WORLD DEFENCE.</p>
        <p>Pour mon stage, je souhaite contribuer à une application web ou logicielle, travailler avec une équipe et progresser sur la qualité du code et les tests.</p>
      </div>
      <div className="about-notes">
        <article className="about-note"><div><h3>De l’interface aux données</h3><p>Sur AniVault, je travaille sur le frontend React, l’API Express et les modèles Prisma.</p></div></article>
        <article className="about-note"><div><h3>Un autre terrain avec Godot</h3><p>THE WORLD DEFENCE me permet de travailler la logique du jeu, les interfaces et la progression.</p></div></article>
      </div>
    </div>
  </section>
);
