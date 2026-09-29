import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <article id={project.id} className="project-card scroll-mt-8">
    <div className="project-image-wrap">
      <img
        src={project.image}
        alt={`Capture du projet ${project.title}`}
        className="project-image"
        loading={index === 1 ? "eager" : "lazy"}
      />
    </div>

    <div className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span>{project.type}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--text)] sm:text-2xl">
            {project.title}
          </h3>
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
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

      <div className="mt-5 border-t border-[var(--border)] pt-5">
        <p className="text-xs font-medium text-[var(--muted)]">Ce que j'ai travaillé</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2.5">
              <span className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
      >
        <Github className="h-4 w-4" />
        Ouvrir le dépôt
      </a>
    </div>
  </article>
);
