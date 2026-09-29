import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="section-shell section-divider px-3 sm:px-5">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <SectionHeading
          eyebrow="04 / Parcours"
          title="Une progression construite projet après projet."
          description="Formation, projets universitaires, travail personnel et prochaine expérience professionnelle."
        />
      </Reveal>

      <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]">
        {timeline.map((item, index) => (
          <Reveal key={`${item.period}-${item.title}`} delay={index * 0.03}>
            <article className="grid gap-5 border-b border-[var(--border)] p-6 last:border-b-0 sm:p-7 md:grid-cols-[12rem_1fr_auto] md:items-start">
              <div>
                <p className="kicker text-[10px] font-semibold text-[var(--accent)]">{item.period}</p>
                {item.location ? (
                  <p className="mt-2 text-xs text-[var(--muted)]">{item.location}</p>
                ) : null}
              </div>

              <div>
                <h3 className="editorial-serif text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight className="hidden h-4 w-4 text-[var(--muted)] md:block" />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
