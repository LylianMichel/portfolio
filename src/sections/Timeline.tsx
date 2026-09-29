import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="content-shell section-block pb-20">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="04 / Parcours"
        title="Mon parcours."
        description="Les étapes utiles pour comprendre ma formation et ce que je construis en parallèle."
      />

      <div className="timeline-list">
        {timeline.map((item) => (
          <article key={`${item.period}-${item.title}`} className={`timeline-row ${item.future ? "timeline-row-future" : ""}`}>
            <div>
              <p className="text-xs font-medium text-[var(--accent)]">{item.period}</p>
              {item.location ? <p className="mt-1.5 text-xs text-[var(--muted)]">{item.location}</p> : null}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="tech-chip">{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
