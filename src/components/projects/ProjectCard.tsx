import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "spotlight" | "standard" | "compact";
}

export const ProjectCard = ({ project, variant = "standard" }: ProjectCardProps) => {
  const isPrimary = variant === "featured" || variant === "spotlight";

  return (
    <article
      id={project.id}
      className={`project-card project-card-${variant}`}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project-media">
        <ProjectCarousel images={project.images} projectTitle={project.title} />
      </div>

      <div className="project-content">
        <div className="project-overline">
          <span className="project-category">{project.type}</span>
          <span>{project.year}</span>
        </div>

        <h3 id={`${project.id}-title`} className="project-title">{project.title}</h3>
        <p className="project-summary">{project.shortDescription}</p>

        {isPrimary && project.contribution ? (
          <div className="project-work">
            <p>Mon travail</p>
            <p>{project.contribution}</p>
          </div>
        ) : null}

        <ul className="project-tech-list" aria-label="Technologies utilisées">
          {project.technologies.slice(0, isPrimary ? 5 : 4).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {(project.challenge || project.result || (!isPrimary && project.contribution)) ? (
          <details className="project-notes">
            <summary>En savoir plus sur le projet</summary>
            <dl className="project-details">
              {!isPrimary && project.contribution ? <div><dt>Mon travail</dt><dd>{project.contribution}</dd></div> : null}
              {project.challenge ? <div><dt>Une difficulté</dt><dd>{project.challenge}</dd></div> : null}
              {project.result ? <div><dt>Résultat</dt><dd>{project.result}</dd></div> : null}
            </dl>
          </details>
        ) : null}

        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
          <Github size={16} aria-hidden="true" />
          Voir le code sur GitHub
          <span className="sr-only">— {project.title}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};
