import { profile } from "../data/profile";

export const Portrait = () => (
  <section aria-labelledby="presentation-title" className="content-shell portrait-section">
    <div className="portrait-layout mx-auto max-w-6xl">
      <div className="portrait-copy">
        <p className="section-eyebrow">Présentation</p>
        <h2 id="presentation-title">{profile.name}</h2>
        <p>Étudiant en deuxième année de BUT Informatique à l’IUT de Lens, je vis à Barlin, dans le Pas-de-Calais. Je recherche un stage de 8 semaines à partir du 12 avril 2027 pour progresser en développement informatique, en maintenance et en assistance aux utilisateurs.</p>
        <p>Sérieux, autonome et rigoureux, j’apprécie le travail en équipe. En dehors de mes études, je pratique le volley et m’intéresse à la veille technologique ainsi qu’à la création de sites web et de jeux vidéo.</p>
        <dl className="portrait-details">
          <div><dt>Mobilité</dt><dd>Permis B</dd></div>
          <div><dt>Langues</dt><dd>Français, anglais, espagnol</dd></div>
        </dl>
      </div>
      <figure className="portfolio-portrait">
      <img
        src={`${import.meta.env.BASE_URL}portrait-lylian-michel.png`}
        alt={`Portrait de ${profile.name}`}
        width={941}
        height={1672}
        loading="lazy"
        decoding="async"
      />
      </figure>
    </div>
  </section>
);
