import { skillGroups } from "../data/skills";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

export const Skills = () => (
  <section id="competences" className="section-shell section-tint">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="03 / Compétences"
          title="Les technologies que j'utilise réellement dans mes projets."
          description="Pas de pourcentages arbitraires : je préfère relier mes compétences à des projets concrets et continuer à les faire progresser par la pratique."
        />
      </Reveal>

      <div className="grid border-y border-[var(--border)] md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            delay={index * 0.03}
            className="border-b border-[var(--border)] py-7 md:odd:border-r md:odd:pr-8 md:even:pl-8"
          >
            <article>
              <h3 className="text-lg font-semibold text-[var(--text)]">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{group.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    title={skill.description}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text)]"
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
