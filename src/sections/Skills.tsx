import { SectionHeading } from "../components/ui/SectionHeading";
import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section id="competences" className="content-shell section-block">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Work / Compétences"
        title="Les outils que j'utilise vraiment."
        description="Pas de pourcentages : seulement des technologies reliées à des projets concrets."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {skillGroups.map((group) => (
          <article key={group.title} className="info-card">
            <h3 className="text-sm font-semibold text-[var(--text)]">{group.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
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
