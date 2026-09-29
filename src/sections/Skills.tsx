import { SectionHeading } from "../components/ui/SectionHeading";
import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section id="competences" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="02 / Compétences"
        title="Les outils que j'utilise réellement."
        description="Je préfère montrer où j'utilise une technologie plutôt que lui attribuer un pourcentage."
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article key={group.title} className="skill-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[var(--text)]">{group.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">{group.description}</p>
              </div>
              <span className="text-[10px] font-medium text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="skill-list mt-5">
              {group.skills.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <p className="text-sm font-medium text-[var(--text)]">{skill.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{skill.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
