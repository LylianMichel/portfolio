import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

type Filter="all"|"web"|"game";
const choices:{key:Filter;label:string}[]=[{key:"all",label:"Tous"},{key:"web",label:"Web"},{key:"game",label:"Jeu vidéo"}];
export const Projects=()=>{
 const [filter,setFilter]=useState<Filter>("all");
 const shown=useMemo(()=>projects.filter(p=>filter==="all"||(filter==="game"?p.id==="towerdefence":p.id!=="towerdefence")),[filter]);
 return <section id="projets" aria-labelledby="projects-title" className="lm-section lm-shell lm-projects">
  <div className="lm-section-head"><div><span className="lm-kicker">01 / TRAVAUX SÉLECTIONNÉS</span><h2 id="projects-title" className="lm-section-title">Concevoir.<br/>Construire.<br/><em>Livrer.</em></h2></div><p className="lm-section-summary">Des projets concrets, mes choix techniques et les difficultés rencontrées. AniVault est aussi disponible en démonstration.</p></div>
  <div className="lm-project-toolbar"><div className="lm-filters" role="group" aria-label="Filtrer les projets">{choices.map(item=><button type="button" key={item.key} className={filter===item.key?"active":""} aria-pressed={filter===item.key} onClick={()=>setFilter(item.key)}>{item.label}</button>)}</div><span className="lm-mono" role="status" aria-live="polite">{shown.length} / {projects.length} PROJETS</span></div>
  <div className="lm-project-stack"><AnimatePresence mode="popLayout" initial={false}>{shown.map((project,index)=><motion.div key={project.id} layout initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.28}}><ProjectCard project={project} featured={project.id==="anivault"||project.id==="towerdefence"} nextProject={shown[index+1]}/></motion.div>)}</AnimatePresence></div>
 </section>;
};
