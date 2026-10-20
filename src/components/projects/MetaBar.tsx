import type { Project } from "../../types";
export const MetaBar = ({ project }: { project: Project }) => (
 <dl className="lm-meta-bar" aria-label={`Fiche de projet — ${project.title}`}>
  <div><dt>Année</dt><dd>{project.year}</dd></div>
  <div><dt>Mon rôle</dt><dd>{project.contribution ?? project.context ?? project.type}</dd></div>
  <div><dt>Statut</dt><dd>{project.demoUrl ? "Démo en ligne" : "Projet présenté en portfolio"}</dd></div>
 </dl>
);
