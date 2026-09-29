import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => {
  const majorProjects = projects.filter((project) => project.variant === "large");
  const secondaryProjects = projects.filter((project) => project.variant === "medium");
  const compactProjects = projects.filter((project) => project.variant === "compact");

  return (
    <section id="projets" className="content-shell section-block">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 / Projets"
          title="Les projets qui représentent le mieux mon travail."
          description="AniVault et THE WORLD DEFENCE sont les deux projets sur lesquels j'ai le plus travaillé. Les autres montrent des contextes et des technologies différents."
        />

        <div className="major-projects-grid">
          {majorProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        {secondaryProjects.length > 0 ? (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={majorProjects.length + index + 1}
              />
            ))}
          </div>
        ) : null}

        {compactProjects.length > 0 ? (
          <div className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                  Projets complémentaires
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Travaux universitaires et projets plus courts.
                </p>
              </div>
            </div>

            <div className="compact-projects-grid">
              {compactProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={majorProjects.length + secondaryProjects.length + index + 1}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
