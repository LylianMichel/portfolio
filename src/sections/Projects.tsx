import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projectFilters, projects } from "../data/projects";

type ProjectFilter = (typeof projectFilters)[number];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("Tous");

  const visibleProjects =
    activeFilter === "Tous"
      ? projects
      : projects.filter((project) => project.technologies.includes(activeFilter));

  return (
    <section id="projets" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Projets"
            title="Des projets pour apprendre, expérimenter et construire."
            description="Universitaire ou personnel, chaque projet me permet de travailler un problème concret et d'améliorer ma manière de développer."
          />
        </Reveal>

        <Reveal className="mb-7 flex flex-wrap gap-2">
          {projectFilters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={active}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  active
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "border border-slate-200 bg-white/70 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:bg-white/8"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
