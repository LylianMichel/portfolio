import { ProjectCard } from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" aria-labelledby="projects-title" className="content-shell section-block editorial-projects">
    <div className="mx-auto max-w-6xl">
      <div className="editorial-projects-heading">
        <div>
          <p className="section-eyebrow">Réalisations</p>
          <h2 id="projects-title">Mes projets</h2>
        </div>
        <p>Des applications web, un jeu vidéo et les problèmes que j'ai appris à résoudre en les développant.</p>
      </div>

      <div className="project-layout editorial-project-list">
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
