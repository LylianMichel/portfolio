import { CalendarDays } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { timeline } from "../data/timeline";

export const Timeline = () => (
  <section id="parcours" className="section-shell section-tint">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="04 / Parcours"
          title="Une progression construite projet après projet."
          description="Une timeline volontairement simple, pensée pour rester lisible sur mobile comme sur ordinateur."
        />
      </Reveal>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-0 left-[15px] top-0 w-px bg-slate-200 md:left-1/2 dark:bg-white/8" aria-hidden="true" />

        <div className="space-y-8">
          {timeline.map((item, index) => {
            const right = index % 2 !== 0;
            return (
              <Reveal key={`${item.period}-${item.title}`} delay={index * 0.04}>
                <article className={`relative grid items-start gap-6 pl-12 md:grid-cols-2 md:pl-0 ${right ? "" : ""}`}>
                  <div
                    className={`absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border bg-white md:left-1/2 md:-translate-x-1/2 dark:bg-[#090c1a] ${
                      item.future
                        ? "border-violet-400/50 text-violet-600 dark:text-violet-300"
                        : "border-cyan-400/50 text-cyan-600 dark:text-cyan-300"
                    }`}
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                  </div>

                  <div className={`${right ? "md:col-start-2 md:pl-10" : "md:pr-10"} ${right ? "" : "md:text-right"}`}>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                      {item.period}
                    </p>
                    <div className="glass-card p-5 text-left">
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                      {item.location ? (
                        <p className="mt-1 text-sm font-medium text-slate-500">{item.location}</p>
                      ) : null}
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-white/6 dark:text-slate-400">
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
