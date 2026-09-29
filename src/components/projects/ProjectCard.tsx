import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <article className="panel-raised group overflow-hidden rounded-[2rem]">
    <div className="project-art">
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] backdrop-blur">
            Projet {String(index).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            {project.technologies[0]}
          </span>
        </div>

        <div>
          <p className="editorial-serif text-[5.5rem] leading-none font-semibold tracking-[-0.07em] text-[var(--accent)] opacity-85 sm:text-[7rem]">
            {String(index).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            {project.id}
          </p>
        </div>
      </div>
    </div>

    <div className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h3 className="editorial-serif text-3xl font-semibold tracking-[-0.035em]">{project.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            {project.shortDescription}
          </p>
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Voir ${project.title} sur GitHub`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted)] transition group-hover:border-[var(--accent)] group-hover:text-[var(--text)]"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]"
          >
            {technology}
          </span>
        ))}
      </div>

      <ul className="mt-6 grid gap-2 border-t border-[var(--border)] pt-5 text-sm leading-6 text-[var(--muted)] sm:grid-cols-2">
        {project.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <span className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
      >
        <Github className="h-4 w-4" />
        Voir le dépôt
      </a>
    </div>
  </article>
);
