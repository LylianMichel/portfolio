import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="section-shell section-tint">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="05 / Parcours"
          title="Un parcours encore court, mais déjà rempli de projets."
          description="Formation, projets universitaires, projets personnels et prochaine expérience professionnelle : la timeline reste factuelle et évoluera avec mon parcours."
        />
      </Reveal>

      <div className="border-t border-[var(--border)]">
        {timeline.map((item, index) => (
          <Reveal key={`${item.period}-${item.title}`} delay={index * 0.035}>
            <article className="group grid gap-4 border-b border-[var(--border)] py-6 sm:grid-cols-[3rem_10rem_1fr_auto] sm:items-start">
              <span className="font-mono text-[10px] text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-[var(--muted)]">{item.period}</p>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">{item.title}</h3>
                  {item.future ? (
                    <span className="border border-[var(--accent)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--accent)]">
                      À venir
                    </span>
                  ) : null}
                </div>
                {item.location ? <p className="mt-1 text-xs text-[var(--muted)]">{item.location}</p> : null}
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-[var(--muted)]">#{tag}</span>
                  ))}
                </div>
              </div>

              <ArrowUpRight className="hidden h-4 w-4 text-[var(--border-strong)] transition group-hover:text-[var(--accent)] sm:block" />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
