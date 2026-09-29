import { CalendarDays } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="section-shell section-tint">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="04 / Parcours"
          title="Une progression construite projet après projet."
          description="Mon parcours mélange formation, projets universitaires et projets personnels afin de faire évoluer mes compétences dans des contextes différents."
        />
      </Reveal>

      <div className="relative mx-auto max-w-4xl">
        <div
          className="absolute bottom-0 left-[15px] top-0 w-px bg-[var(--border)] md:left-1/2"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {timeline.map((item, index) => {
            const right = index % 2 !== 0;

            return (
              <Reveal key={`${item.period}-${item.title}`} delay={index * 0.04}>
                <article className="relative grid items-start gap-6 pl-12 md:grid-cols-2 md:pl-0">
                  <div className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] md:left-1/2 md:-translate-x-1/2">
                    <CalendarDays className="h-3.5 w-3.5" />
                  </div>

                  <div className={`${right ? "md:col-start-2 md:pl-10" : "md:pr-10 md:text-right"}`}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                      {item.period}
                    </p>

                    <div className="glass-card p-5 text-left">
                      <h3 className="text-lg font-semibold text-[var(--text)]">{item.title}</h3>
                      {item.location ? (
                        <p className="mt-1 text-sm font-medium text-[var(--muted)]">{item.location}</p>
                      ) : null}
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-xs text-[var(--muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
