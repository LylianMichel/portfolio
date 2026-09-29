import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section id="competences" className="section-shell section-divider px-3 sm:px-5">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <SectionHeading
          eyebrow="02 / Compétences"
          title="Une stack qui s'élargit au fil des projets."
          description="Je préfère montrer les outils que j'utilise réellement plutôt que des barres de niveau arbitraires."
        />
      </Reveal>

      <div className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            delay={index * 0.035}
            className="border-b border-[var(--border)] bg-[var(--surface)] p-6 last:border-b-0 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0 sm:p-8"
          >
            <article className="h-full">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="kicker text-[10px] font-semibold text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="editorial-serif mt-3 text-3xl font-semibold tracking-[-0.035em]">
                    {group.title}
                  </h3>
                </div>
                <span className="text-xs text-[var(--muted)]">{group.skills.length} outils</span>
              </div>

              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">{group.description}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    title={skill.description}
                    className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-3 py-1.5 text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
