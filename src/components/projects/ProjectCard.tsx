import { ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isLarge = project.variant === "large";
  const isCompact = project.variant === "compact";

  return (
    <article
      id={project.id}
      className={`project-card project-card-${project.variant}`}
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
            <p className="project-index">{String(index).padStart(2, "0")}</p>
            <h3
              id={`${project.id}-title`}
              className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[var(--text)] sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label={`Voir ${project.title} sur GitHub`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : project.repositoryVisibility === "private" ? (
            <span className="private-code-badge" title="Le dépôt source est privé">
              <LockKeyhole className="h-3.5 w-3.5" />
              Code privé
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.shortDescription}</p>

        {!isCompact ? (
          <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">{project.description}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="tech-chip">
              {technology}
            </span>
          ))}
        </div>

        {isLarge && project.caseStudy ? (
          <div className="project-case-study mt-6 border-t border-[var(--border)] pt-5">
            <div className="project-case-study-intro">
              <p className="project-detail-label">Pourquoi</p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                {project.caseStudy.why}
              </p>
            </div>

            <div>
              <p className="project-detail-label">Ce que j'ai développé</p>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--muted)] sm:grid-cols-2">
                {project.caseStudy.built.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.caseStudy.challenge ? (
              <div>
                <p className="project-detail-label">Problème rencontré</p>
                <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                  {project.caseStudy.challenge}
                </p>
              </div>
            ) : null}

            {project.caseStudy.solution ? (
              <div>
                <p className="project-detail-label">Solution mise en place</p>
                <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                  {project.caseStudy.solution}
                </p>
              </div>
            ) : null}

            <div>
              <p className="project-detail-label">Ce que j'ai appris</p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                {project.caseStudy.learned}
              </p>
            </div>
          </div>
        ) : !isCompact ? (
          <div className="mt-5 border-t border-[var(--border)] pt-4">
            <ul className="grid gap-2 text-sm leading-6 text-[var(--muted)]">
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <span className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.githubUrl ? (
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
