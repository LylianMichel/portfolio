import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="content-shell section-block pb-20">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="04 / Parcours"
        title="Mon parcours."
        description="Une vue simple de ma formation, de mes projets et de ce que je prépare pour 2027."
      />

      <div className="timeline-list">
        {timeline.map((item) => (
          <article
            key={item.period + "-" + item.title}
            className="timeline-row"
          >
            <div className="timeline-meta">
              <p>{item.period}</p>
              {item.location ? <span>{item.location}</span> : null}
            </div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="timeline-tags">{item.tags.join(" · ")}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
