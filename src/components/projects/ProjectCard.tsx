import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "spotlight" | "standard" | "compact";
}

const notesLabels = {
  featured: "Architecture et difficultés",
  spotlight: "Les défis du jeu",
  standard: "Détails de réalisation",
  compact: "En savoir plus",
} as const;

export const ProjectCard = ({ project, variant = "standard" }: ProjectCardProps) => {
  const prominent = variant === "featured" || variant === "spotlight";

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

        <div className="project-title-row">
          <h3 id={`${project.id}-title`} className="project-title">{project.title}</h3>
          {project.context ? <p className="project-context">{project.context}</p> : null}
        </div>

        <p className="project-summary">{project.shortDescription}</p>

        {prominent ? (
          <div className="project-feature-block">
            <p className="project-feature-heading">Dans ce projet</p>
            <ul className="project-feature-list">
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="project-technologies" aria-label="Technologies utilisées">
          {project.technologies.slice(0, prominent ? 4 : 3).map((technology) => (
            <span key={technology} className="tech-chip">{technology}</span>
          ))}
          {project.technologies.length > (prominent ? 4 : 3) ? (
            <span className="project-extra-tools">Également : {project.technologies.slice(prominent ? 4 : 3).join(", ")}</span>
          ) : null}
        </div>

        {prominent && project.contribution ? (
          <div className="project-contribution project-contribution-prominent">
            <span>{variant === "featured" ? "Ce que j'ai construit" : "Mon rôle sur le jeu"}</span>
            <p>{project.contribution}</p>
          </div>
        ) : null}

        {project.contribution || project.challenge || project.result ? (
          <details className="project-notes">
            <summary>{notesLabels[variant]}</summary>
            <dl className="project-details">
              {!prominent && project.contribution ? <div><dt>Ma contribution</dt><dd>{project.contribution}</dd></div> : null}
              {project.challenge ? <div><dt>Difficulté</dt><dd>{project.challenge}</dd></div> : null}
              {project.result ? <div><dt>Résultat</dt><dd>{project.result}</dd></div> : null}
            </dl>
          </details>
        ) : null}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          Voir le code <span className="sr-only">de {project.title} sur GitHub</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};
