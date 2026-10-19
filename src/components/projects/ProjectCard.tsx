import { ArrowDownRight, ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";
import { ProjectFrame } from "./ProjectFrame";
import { Tag } from "../ui/Tag";
import { profile } from "../../data/profile";

export const ProjectCard=({project,nextProject,featured}:{project:Project;nextProject?:Project;featured:boolean})=>{
 const game=project.id==="towerdefence";
 return <article id={project.id} className={`lm-case ${featured?"lm-case-featured":"lm-case-compact"}`} aria-labelledby={`${project.id}-title`}>
 <div className="lm-case-top"><span className="lm-kicker">{project.type}</span><span className="lm-mono">{project.year}</span></div>
 <div className="lm-case-grid">
  <div className="lm-case-media"><ProjectFrame game={game} title={project.title}><ProjectCarousel images={project.images} projectTitle={project.title}/></ProjectFrame></div>
  <div className="lm-case-story">
   <div className="lm-case-overline"><span className="lm-kicker">{featured?"ÉTUDE DE CAS":"RÉALISATION"}</span><span className="lm-mono">{project.context??project.type}</span></div>
   <h3 id={`${project.id}-title`}>{project.title}</h3>
   <p className="lm-case-description">{project.shortDescription}</p>
   <dl className="lm-case-facts">
    <div><dt>Rôle</dt><dd>{project.contribution??project.context??project.type}</dd></div>
    <div><dt>Stack</dt><dd>{project.technologies.join(" · ")}</dd></div>
    <div><dt>Statut</dt><dd>{project.demoUrl?"Démo en ligne":"Projet présenté en portfolio"}</dd></div>
   </dl>
   <div className="lm-case-tags">{project.technologies.slice(0,5).map(tag=><Tag key={tag}>{tag}</Tag>)}</div>
   <div className="lm-case-decisions">
    {project.challenge&&<div><span>01 / DIFFICULTÉ</span><p>{project.challenge}</p></div>}
    {project.technicalApproach&&<div><span>02 / CHOIX TECHNIQUE</span><p>{project.technicalApproach}</p></div>}
    {project.result&&<div><span>03 / RÉSULTAT</span><p>{project.result}</p></div>}
   </div>
   <div className="lm-case-actions">
    {project.demoUrl&&<a className="lm-button lm-button--primary" href={project.demoUrl} rel="noopener noreferrer" target="_blank" aria-label={`Tester ${project.title} dans un nouvel onglet`}>Tester l'application <ArrowUpRight size={16} aria-hidden /></a>}
    {project.codeAccess==="public"?<a className="lm-button" target="_blank" rel="noopener noreferrer" href={project.githubUrl}><Github size={16} aria-hidden/>Voir le code</a>:<a href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande d'accès au code — "+project.title)}`} className="lm-button" aria-label={`Demander le code de ${project.title} par e-mail`}><LockKeyhole size={15} aria-hidden/>Code sur demande <ArrowUpRight size={16} aria-hidden/></a>}
   </div>
  </div>
 </div>
 {nextProject&&<a className="lm-next-project" href={`#${nextProject.id}`}><span className="lm-kicker">PROJET SUIVANT</span><strong>{nextProject.title}</strong><ArrowDownRight size={20} aria-hidden /></a>}
 </article>
};
