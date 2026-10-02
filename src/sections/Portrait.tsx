import { profile } from "../data/profile";

export const Portrait = () => (
  <section aria-label="Mon portrait" className="content-shell portrait-section">
    <figure className="portfolio-portrait">
      <img
        src={`${import.meta.env.BASE_URL}portrait-lylian-michel.png`}
        alt={`Portrait de ${profile.name}`}
        width={941}
        height={1672}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{profile.name}</figcaption>
    </figure>
  </section>
);
