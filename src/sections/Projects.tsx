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
            eyebrow="04 / Projets"
            title="Le code est plus parlant quand il résout quelque chose."
            description="Une sélection de projets personnels et universitaires. Je montre ce que j'ai construit, les choix techniques et ce que chaque projet m'a appris."
          />
        </Reveal>

        <Reveal className="mb-9 flex flex-wrap items-center gap-x-1 gap-y-2 border-y border-[var(--border)] py-3">
          <span className="mr-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">Filtrer :</span>
          {projectFilters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={active}
                className={`px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  active
                    ? "bg-[var(--text)] text-[var(--page-bg)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="grid gap-x-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className={activeFilter === "Tous" && index === 0 ? "md:col-span-2" : ""}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  featured={activeFilter === "Tous" && index === 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
