import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "featured" | "standard" | "compact";
}

export const ProjectCard = ({ project, index, variant = "standard" }: ProjectCardProps) => {
  const featured = variant === "featured" || index === 2;

  return (
    <article
      id={project.id}
      className={`project-card project-card-${variant}`}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project-image-wrap">
        <ProjectCarousel
          images={project.images}
          projectTitle={project.title}
          eager={index === 1}
        />

        <div className="project-image-overlay">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
      </div>

      <div className="project-content">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="project-index">0{index}</p>
            <h3
              id={`${project.id}-title`}
              className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[var(--text)] sm:text-2xl"
            >
              {project.title}
            </h3>
            {project.context ? <p className="project-context mt-1.5">{project.context}</p> : null}
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            aria-label={`Voir ${project.title} sur GitHub`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="tech-chip">
              {technology}
            </span>
          ))}
        </div>

        {featured ? (
          <dl className="project-details mt-6">
            {project.contribution ? (
              <div>
                <dt>Mon travail</dt>
                <dd>{project.contribution}</dd>
              </div>
            ) : null}
            {project.challenge ? (
              <div>
                <dt>Difficulté</dt>
                <dd>{project.challenge}</dd>
              </div>
            ) : null}
            {project.result ? (
              <div>
                <dt>Résultat</dt>
                <dd>{project.result}</dd>
              </div>
            ) : null}
          </dl>
        ) : project.contribution ? (
          <p className="project-contribution mt-5">
            <span>Mon travail</span>
            {project.contribution}
          </p>
        ) : null}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]"
        >
          <Github className="h-4 w-4" />
          Voir le code
        </a>
      </div>
    </article>
  );
};
