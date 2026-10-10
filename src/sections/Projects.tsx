import { ArrowDownRight } from "lucide-react";
import { ProjectCard } from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" aria-labelledby="projects-title" className="content-shell section-block impact-projects">
    <div className="mx-auto max-w-6xl">
      <div className="impact-projects-intro">
        <div className="impact-projects-overline">
          <p className="section-eyebrow">Mes réalisations</p>
          <span>Applications web / Jeu vidéo</span>
        </div>
        <div className="impact-projects-intro-grid">
          <h2 id="projects-title">Du code.<span>Du concret.</span></h2>
          <div>
            <p>Quatre projets pour découvrir ce que je sais construire, du frontend aux systèmes de jeu.</p>
            <ArrowDownRight size={36} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="project-layout impact-project-list">
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
