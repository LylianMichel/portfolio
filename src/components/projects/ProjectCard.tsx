import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <article className="group grid gap-6 py-9 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-8 md:py-11">
    <span className="text-sm font-medium text-[var(--muted)]">{String(index).padStart(2, "0")}</span>

    <div className="max-w-3xl">
      <h3 className="text-2xl font-semibold tracking-tight text-[var(--text)]">{project.title}</h3>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{project.shortDescription}</p>

      <ul className="mt-5 grid gap-2 text-sm leading-6 text-[var(--muted)] sm:grid-cols-2">
        {project.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>

    <div className="flex items-start gap-2 md:justify-end">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Voir ${project.title} sur GitHub`}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <Github className="h-4 w-4" />
        GitHub
      </a>

      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Voir la démo de ${project.title}`}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--text)] px-3 py-2 text-sm font-medium text-[var(--page-bg)] transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          Démo
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  </article>
);
