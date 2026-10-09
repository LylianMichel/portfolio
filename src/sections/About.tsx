export const About = () => (
  <section id="a-propos" aria-labelledby="about-title" className="content-shell section-block">
    <div className="about-section mx-auto max-w-6xl">
      <div className="about-copy">
        <p className="section-eyebrow">À propos</p>
        <h2 id="about-title">Du web au jeu vidéo.</h2>
        <p className="about-lead">J’aime comprendre ce qui se passe derrière une interface : les données, les interactions et les choix qui rendent un outil agréable à utiliser. C’est ce que j’explore avec AniVault et THE WORLD DEFENCE.</p>
        <p>Pour mon prochain stage, je souhaite participer à un vrai projet d’équipe, apprendre des retours sur mon code et prendre part aux tests comme aux améliorations de l’expérience utilisateur.</p>
      </div>
      <div className="about-notes">
        <article className="about-note"><div><h3>De l’interface aux données</h3><p>Sur AniVault, je travaille sur le frontend React, l’API Express et les modèles Prisma.</p></div></article>
        <article className="about-note"><div><h3>Un autre terrain avec Godot</h3><p>THE WORLD DEFENCE me permet de travailler la logique du jeu, les interfaces et la progression.</p></div></article>
      </div>
    </div>
  </section>
);
