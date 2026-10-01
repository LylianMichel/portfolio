import { Github } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "featured" | "standard" | "compact";
}

export const ProjectCard = ({ project, index, variant = "standard" }: ProjectCardProps) => {
  return (
    <article
      id={project.id}
      className={`project-card project-card-${variant}`}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project-media">
        <ProjectCarousel
          images={project.images}
          projectTitle={project.title}
          eager={index === 1}
        />
      </div>

      <div className="project-content">
        <div className="project-title-row flex items-start justify-between gap-5">
          <div>
            <h3
              id={`${project.id}-title`}
              className="text-xl font-semibold tracking-[-0.025em] text-[var(--text)] sm:text-2xl"
            >
              {project.title}
            </h3>
            {project.context ? <p className="project-context mt-1.5">{project.context}</p> : null}
          </div>
        </div>

        <p className="project-summary mt-3 text-sm leading-6 text-[var(--muted)]">{project.shortDescription}</p>

        <div className="project-technologies mt-5 flex flex-wrap">
          {project.technologies.slice(0, 4).map((technology) => (
            <span key={technology} className="tech-chip">
              {technology}
            </span>
          ))}
          {project.technologies.length > 4 ? <span className="project-extra-tools">Également : {project.technologies.slice(4).join(", ")}</span> : null}
        </div>

        {project.contribution ? (
          <p className="project-contribution mt-5">
            <span>Mon travail</span>
            {project.contribution}
          </p>
        ) : null}

        {project.challenge || project.result ? (
          <details className="project-notes">
            <summary>Notes de développement</summary>
            <dl className="project-details">
              {project.challenge ? <div><dt>Difficulté</dt><dd>{project.challenge}</dd></div> : null}
              {project.result ? <div><dt>Résultat</dt><dd>{project.result}</dd></div> : null}
            </dl>
          </details>
        ) : null}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          Code sur GitHub · {project.title}
        </a>
      </div>
    </article>
  );
};
