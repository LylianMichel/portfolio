import { ArrowUpRight, Github, LockKeyhole } from "lucide-react";
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

        {project.technicalApproach ? (
          <div className="project-proof">
            <p className="project-proof-label">Un choix technique</p>
            <p>{project.technicalApproach}</p>
          </div>
        ) : null}

        <ul className="project-tech-list" aria-label="Technologies utilisées">
          {project.technologies.slice(0, isPrimary ? 5 : 4).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {(project.challenge || project.result || (!isPrimary && project.contribution)) ? (
          <details className="project-notes">
            <summary>Difficultés et résultats</summary>
            <dl className="project-details">
              {!isPrimary && project.contribution ? <div><dt>Mon travail</dt><dd>{project.contribution}</dd></div> : null}
              {project.challenge ? <div><dt>Une difficulté</dt><dd>{project.challenge}</dd></div> : null}
              {project.result ? <div><dt>Résultat</dt><dd>{project.result}</dd></div> : null}
            </dl>
          </details>
        ) : null}

        <div className="project-actions">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-demo-link"
              aria-label={`Tester ${project.title} en ligne (nouvel onglet)`}
            >
              Tester l'application
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : null}

          {project.codeAccess === "public" ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <Github size={16} aria-hidden="true" />
              Voir le code sur GitHub
              <span className="sr-only">— {project.title}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : project.id === "anivault" ? (
            <div className="project-private-code">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Dépôt GitHub privé d'AniVault (accès réservé)">
                <Github size={16} aria-hidden="true" />
                GitHub d'AniVault (privé)
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <span className="project-repo-note">
                <LockKeyhole size={14} aria-hidden="true" />
                Accès réservé aux collaborateurs
              </span>
            </div>
          ) : (
            <span className="project-repo-note">
              <LockKeyhole size={14} aria-hidden="true" />
              Code privé · présentation sur demande
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
