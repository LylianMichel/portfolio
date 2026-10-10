import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section aria-labelledby="projects-title" id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        id="projects-title"
        eyebrow="Réalisations"
        title="Des projets que je construis."
        description="Applications web, interfaces et jeu vidéo : voici ce que j'ai réalisé et la manière dont j'y ai contribué."
      />
      <div className="project-layout">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant={index === 0 ? "featured" : index === 1 ? "spotlight" : index === projects.length - 1 ? "compact" : "standard"}
          />
        ))}
      </div>
    </div>
  </section>
);
