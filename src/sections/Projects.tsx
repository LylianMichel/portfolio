import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="01 / Projets"
        title="Mes projets."
        description="Du développement web au jeu vidéo : voici les projets sur lesquels je travaille, avec mes contributions et des captures de leurs interfaces."
      />
      <div className="project-layout">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
            variant={index === 0 ? "featured" : index === projects.length - 1 ? "compact" : "standard"}
          />
        ))}
      </div>
    </div>
  </section>
);
