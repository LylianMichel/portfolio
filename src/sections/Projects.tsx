import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects, universityProjects } from "../data/projects";

export const Projects = () => {
  const majorProjects = projects.filter((project) => project.size === "major");
  const secondaryProjects = projects.filter((project) => project.size === "medium");

  return (
    <section id="projets" className="content-shell section-block">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 / Projets"
          title="Mes projets principaux."
          description="AniVault et THE WORLD DEFENCE sont les deux projets sur lesquels je passe le plus de temps. Les autres montrent des contextes et des technologies différentes."
        />

        <div className="project-major-list">
          {majorProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        <div className="mt-10">
          <p className="section-subtitle">Autres projets</p>
          <div className="project-secondary-grid mt-4">
            {secondaryProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={majorProjects.length + index + 1}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-subtitle">Projets universitaires</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Une sélection de travaux de BUT qui complètent mes projets personnels.
              </p>
            </div>
            <span className="text-xs text-[var(--muted)]">IUT de Lens</span>
          </div>

          <div className="university-grid mt-5">
            {universityProjects.map((project) => (
              <article key={project.title} className="university-card">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                  {project.context}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="tech-chip">{technology}</span>
                  ))}
                </div>
                <p className="mt-4 border-t border-[var(--border)] pt-4 text-xs leading-5 text-[var(--muted)]">
                  {project.result}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
