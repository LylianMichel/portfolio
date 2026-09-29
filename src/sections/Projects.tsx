import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Work / Projets"
        title="Les projets sur lesquels j'ai le plus travaillé."
        description="Ils ne sont pas tous terminés, mais chacun m'a permis de travailler des choses différentes : interface, backend, données, tests ou game design."
      />

      <div className="project-layout">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
            featured={index === 0}
          />
        ))}
      </div>
    </div>
  </section>
);
