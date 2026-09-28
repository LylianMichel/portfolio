import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SkillIcon } from "../components/ui/SkillIcon";
import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section id="competences" className="section-shell section-tint">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="03 / Compétences"
          title="Pas de pourcentages inventés : seulement ce que j'utilise vraiment."
          description="Les niveaux indiquent simplement mon degré d'autonomie actuel. Ils évolueront avec les projets et la suite de ma formation."
        />
      </Reveal>

      <div className="border-t border-[var(--border)]">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.03}>
            <article className="grid gap-5 border-b border-[var(--border)] py-7 md:grid-cols-[3rem_12rem_1fr] md:gap-6">
              <span className="font-mono text-[10px] text-[var(--accent)]">
                {String(groupIndex + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">{group.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{group.description}</p>
              </div>

              <div className="grid gap-x-6 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="grid grid-cols-[2rem_1fr_auto] items-start gap-3 border-t border-[var(--border)] py-4 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0"
                  >
                    <div className="mt-0.5 text-[var(--accent)]">
                      <SkillIcon name={skill.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{skill.name}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{skill.description}</p>
                    </div>
                    <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
