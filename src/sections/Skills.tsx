import { SectionHeading } from "../components/ui/SectionHeading";
import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section id="competences" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="02 / Compétences"
        title="Ce que j'utilise dans mes projets."
        description="Je préfère montrer les outils que j'ai réellement utilisés plutôt que leur donner une note ou un pourcentage."
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article key={group.title} className="skill-card">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-semibold text-[var(--text)]">{group.title}</h3>
              <span className="text-[10px] font-medium text-[var(--muted)]">0{index + 1}</span>
            </div>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{group.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill.name} className="tech-chip" title={skill.description}>
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
