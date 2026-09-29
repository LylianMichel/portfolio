import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="content-shell section-block pb-20">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Work / Parcours"
        title="Une progression simple à lire."
      />

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {timeline.map((item) => (
          <article
            key={`${item.period}-${item.title}`}
            className="grid gap-4 border-b border-[var(--border)] p-5 last:border-b-0 sm:grid-cols-[11rem_1fr]"
          >
            <div>
              <p className="text-xs font-medium text-[var(--accent)]">{item.period}</p>
              {item.location ? (
                <p className="mt-1.5 text-xs text-[var(--muted)]">{item.location}</p>
              ) : null}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="tech-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
