import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../../types";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <motion.article
    layout
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/8 dark:bg-white/[0.035] dark:shadow-none"
  >
    <ProjectVisual project={project} />

    <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
      <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {project.shortDescription}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-white/8 dark:bg-white/[0.035] dark:text-slate-400"
          >
            {technology}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
        {project.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500 dark:bg-cyan-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 pt-6">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/6"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Démo
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  </motion.article>
);
