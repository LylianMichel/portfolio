import { skillGroups } from "../data/skills";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SkillIcon } from "../components/ui/SkillIcon";

const levelWidth = {
  Débutant: "w-1/3",
  Intermédiaire: "w-2/3",
  "En progression": "w-1/2",
} as const;

export const Skills = () => (
  <section id="competences" className="section-shell section-tint">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="02 / Compétences"
          title="Des compétences que je développe par la pratique."
          description="Les niveaux restent volontairement simples : ils indiquent où j'en suis sans transformer mon portfolio en faux tableau de statistiques."
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.04}>
            <article className="glass-card h-full p-5 sm:p-6">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{group.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{group.description}</p>
              </div>

              <div className="space-y-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 dark:border-white/7 dark:bg-white/[0.025]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                        <SkillIcon name={skill.icon} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{skill.name}</p>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{skill.level}</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{skill.description}</p>
                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/8" aria-hidden="true">
                          <div className={`h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 ${levelWidth[skill.level]}`} />
                        </div>
                      </div>
                    </div>
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
