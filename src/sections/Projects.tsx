import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section aria-labelledby="projects-title" id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        id="projects-title"
        eyebrow="Réalisations"
        title="Projets sélectionnés."
        description="Du web au jeu vidéo : quatre projets, avec des contraintes et des approches différentes."
      />
      <div className="project-layout">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
            variant={index === 0 ? "featured" : index === 1 ? "spotlight" : index === projects.length - 1 ? "compact" : "standard"}
          />
        ))}
      </div>
    </div>
  </section>
);
