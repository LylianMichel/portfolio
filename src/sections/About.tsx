import { profile } from "../data/profile";
export const About=()=><section id="a-propos" aria-labelledby="about-title" className="lm-section lm-shell lm-about">
 <div className="lm-section-head"><div><span className="lm-kicker">03 / QUI JE SUIS</span><h2 id="about-title" className="lm-section-title"><span className="lm-title-word">Du web</span><br/><span className="lm-title-word">au jeu vidéo.</span></h2></div><p className="lm-section-summary">J’aime comprendre ce qui se passe derrière une interface : les données, les interactions et les choix qui rendent un outil agréable à utiliser. C’est ce que j’explore avec AniVault et THE WORLD DEFENCE.</p></div>
 <div className="lm-about-grid"><div className="lm-about-copy">
  <p className="lm-about-lead">Du web au jeu vidéo. J’aime construire des interfaces utiles, comprendre leur fonctionnement et améliorer chaque détail.</p>
  <p>Je suis en deuxième année de BUT Informatique à l’IUT de Lens et je vis à Barlin, dans le Pas-de-Calais. Je construis mes projets en parallèle des cours, avec l’envie de progresser en développement web et logiciel.</p>
  <p>Sérieux, autonome et rigoureux, j’apprécie le travail en équipe. En dehors de mes études, je pratique le volley et m’intéresse à la veille technologique, à l’intelligence artificielle que je suis régulièrement, ainsi qu’à la création de sites web et de jeux vidéo.</p>
  <p>Pour mon prochain stage, je souhaite participer à un vrai projet d’équipe, apprendre des retours sur mon code et prendre part aux tests comme aux améliorations de l’expérience utilisateur.</p>
  <div className="lm-interests" aria-labelledby="interests-title"><h3 id="interests-title">Ce que j’aime</h3><ul><li>Le volley</li><li>La veille technologique et l’intelligence artificielle</li><li>Créer des sites web et des jeux vidéo</li></ul></div>
  <div className="lm-seeking"><span className="lm-kicker">CE QUE JE CHERCHE</span>
   <div><span>01</span><p>Une mission de développement web ou logiciel au sein d'une équipe.</p></div>
   <div><span>02</span><p>Contribuer à des interfaces, à la logique applicative et aux tests.</p></div>
   <div><span>03</span><p>Un stage de 8 semaines à partir du 12 avril 2027.</p></div>
  </div>
 </div>
 <aside className="lm-about-aside">
  <figure className="lm-about-photo"><img src={`${import.meta.env.BASE_URL}portrait-lylian-michel.png`} alt={`Portrait illustré de ${profile.name}`} width={941} height={1672} loading="lazy" decoding="async" /><figcaption>{profile.name} — BUT Informatique, IUT de Lens</figcaption></figure>
  <dl className="lm-about-facts"><div><dt>Localisation</dt><dd>{profile.location}</dd></div><div><dt>Mobilité</dt><dd>Permis B</dd></div><div><dt>Langues</dt><dd>Français, anglais, espagnol</dd></div></dl>
 </aside></div>
 </section>;
