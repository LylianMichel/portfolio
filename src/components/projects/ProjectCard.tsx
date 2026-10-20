import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import type { Project } from "../../types";
import { ProjectCarousel } from "./ProjectCarousel";
import { ProjectFrame } from "./ProjectFrame";
import { Tag } from "../ui/Tag";
import { profile } from "../../data/profile";
import { MetaBar } from "./MetaBar";
import { projectDecisions } from "../../utils/projectDecisions";

export const ProjectCard=({project,nextProject,featured,index}:{project:Project;nextProject?:Project;featured:boolean;index:number})=>{
 const game=project.id==="towerdefence";
 const [beat,setBeat]=useState(0);
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  if(!game||typeof IntersectionObserver==="undefined"||window.innerWidth<=1080||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const beats=root.current?.querySelectorAll<HTMLElement>(".lm-case-decisions>div");
  if(!beats?.length)return;
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries)if(entry.isIntersecting){
    const next=Array.from(beats).indexOf(entry.target as HTMLElement);
    if(next>=0)setBeat(next);
   }
  },{threshold:.08,rootMargin:"-18% 0px -51% 0px"});
  beats.forEach(el=>observer.observe(el));
  return()=>observer.disconnect();
 },[game]);

 return <article ref={root} data-active-beat={beat} id={project.id} className={`lm-case ${featured?"lm-case-featured":"lm-case-compact"}`} aria-labelledby={`${project.id}-title`}>
 <div className="lm-case-top"><span className="lm-kicker">{project.type}</span><span className="lm-mono">{project.year}</span></div>
 <div className="lm-case-grid">
  <div className="lm-case-media">
   <ProjectFrame game={game} title={project.title}><ProjectCarousel images={project.images} projectTitle={project.title} sceneIndex={game?beat:undefined}/></ProjectFrame>
   {project.features.length>0&&<aside className="lm-case-evidence" aria-label={`Fonctionnalités de ${project.title}`}>
    <div className="lm-evidence-head"><span>FONCTIONNALITÉS</span><span aria-hidden="true">↗</span></div>
    <ul>{project.features.slice(0,3).map((feature,i)=><li key={feature}><span aria-hidden="true">{String(i+1).padStart(2,"0")}</span>{feature}</li>)}</ul>
   </aside>}
  </div>
  <div className="lm-case-story" data-case-number={String(index+1).padStart(2,"0")}>
   <div className="lm-case-overline"><span className="lm-kicker">{featured?"ÉTUDE DE CAS":"RÉALISATION"}</span><span className="lm-mono">{project.context??project.type}</span></div>
   <h3 id={`${project.id}-title`} data-case-number={String(index+1).padStart(2,"0")}>{project.title}</h3>
   <p className="lm-case-description">{project.shortDescription}</p>
   <MetaBar project={project}/>
   <div className="lm-case-tags">{project.technologies.map(tag=><Tag key={tag}>{tag}</Tag>)}</div>
   <div className="lm-case-decisions">
    {projectDecisions(project).map(({label,value,number})=>
      <div key={label}><span><strong>{number}</strong> {label}</span><p>{value}</p></div>)}
   </div>
   <div className="lm-case-actions">
    {project.demoUrl&&<a className="lm-button lm-button--primary" href={project.demoUrl} rel="noopener noreferrer" target="_blank" aria-label={`Tester l’application — ${project.title} (nouvel onglet)`}>{project.id==="anivault"?"Tester la démo":"Tester l’application"} <ArrowUpRight size={16} aria-hidden /></a>}
    {project.codeAccess==="public"?<a className="lm-button" target="_blank" rel="noopener noreferrer" href={project.githubUrl}><Github size={16} aria-hidden/>Voir le code</a>:<a href={`mailto:${profile.email}?subject=${encodeURIComponent("Demande d'accès au code — "+project.title)}`} className="lm-button" aria-label={`Code sur demande — ${project.title} (par e-mail)`}><LockKeyhole size={15} aria-hidden/>Code sur demande <ArrowUpRight size={16} aria-hidden/></a>}
   </div>
  </div>
 </div>
 {nextProject&&<a className="lm-next-project" href={`#${nextProject.id}`}><span className="lm-kicker">PROJET SUIVANT</span><strong>{nextProject.title}</strong><ArrowDownRight size={20} aria-hidden /></a>}
 </article>
};
