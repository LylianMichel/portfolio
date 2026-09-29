import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="01 / Projets"
        title="Mes projets principaux."
        description="AniVault et THE WORLD DEFENCE sont les deux projets sur lesquels je passe le plus de temps. Les autres me permettent de travailler dans des contextes et avec des technologies différentes."
      />
      <div className="project-layout">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} featured={index === 0} />
        ))}
      </div>
    </div>
  </section>
);
