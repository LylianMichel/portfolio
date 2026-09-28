import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../types";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => (
  <motion.article
    layout
    whileHover={{ y: -3 }}
    transition={{ duration: 0.18 }}
    className={`group grid h-full overflow-hidden border-t border-[var(--border)] py-5 ${
      featured ? "gap-6 md:grid-cols-[1.15fr_.85fr] md:col-span-2" : "gap-5"
    }`}
  >
    <ProjectVisual project={project} index={index} />

    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
            Projet {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[var(--text)]">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
      </div>

      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
        {featured ? project.description : project.shortDescription}
      </p>

      <ul className="mt-5 grid gap-2 text-xs text-[var(--muted)]">
        {project.features.slice(0, featured ? 4 : 2).map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 bg-[var(--accent)]" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] underline decoration-[var(--border-strong)] underline-offset-4 transition hover:decoration-[var(--accent)]"
        >
          <Github className="h-4 w-4" />
          Code source
        </a>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]"
          >
            Voir la démo <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  </motion.article>
);
