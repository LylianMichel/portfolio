import { ProjectCard } from "../components/projects/ProjectCard";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="section-shell section-tint">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="01 / Projets"
          title="Quelques projets qui montrent ce que je sais construire."
          description="Je préfère présenter peu de projets, mais expliquer concrètement ce qu'ils m'ont permis de développer : architecture, interface, données, tests et logique métier."
        />
      </Reveal>

      <div className="border-y border-[var(--border)]">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            delay={index * 0.04}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <ProjectCard project={project} index={index + 1} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
