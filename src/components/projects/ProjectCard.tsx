import { ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const major = project.size === "major";

  return (
    <article
      id={project.id}
      className={`project-card project-card-${project.size}`}
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
            <p className="project-index">0{index} · {project.context}</p>
            <h3
              id={`${project.id}-title`}
              className={`mt-1 font-semibold tracking-[-0.025em] text-[var(--text)] ${major ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
            >
              {project.title}
            </h3>
          </div>

          {project.repositoryPublic && project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label={`Voir ${project.title} sur GitHub`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="private-badge" title="Le code source de ce projet n'est pas public">
              <LockKeyhole className="h-3.5 w-3.5" />
              Code privé
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="tech-chip">{technology}</span>
          ))}
        </div>

        {major ? (
          <div className="project-story mt-6">
            <div className="project-story-block">
              <p className="project-story-label">Pourquoi ce projet</p>
              <p>{project.motivation}</p>
            </div>

            <div className="project-story-block">
              <p className="project-story-label">Points techniques</p>
              <ul>
                {project.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </div>

            <div className="project-story-block project-story-wide">
              <p className="project-story-label">Ce que j'en retiens</p>
              <p>{project.learning}</p>
            </div>
          </div>
        ) : (
          <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-6 text-[var(--muted)]">
            {project.learning}
          </p>
        )}

        {project.repositoryPublic && project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
          >
            <Github className="h-4 w-4" />
            Voir le dépôt
          </a>
        ) : null}
      </div>
    </article>
  );
};
