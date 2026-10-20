import { skillGroups } from "../data/skills";
import { projects } from "../data/projects";
import { Tag } from "../components/ui/Tag";
const count=new Set(projects.flatMap(project=>project.technologies)).size;
export const Skills=()=><section id="competences" aria-labelledby="skills-title" className="lm-section lm-shell lm-skills">
 <div className="lm-section-head"><div><span className="lm-kicker">02 / SAVOIR-FAIRE</span><h2 id="skills-title" className="lm-section-title"><span className="lm-title-word">Des outils.</span><br/><span className="lm-title-word">Des usages.</span></h2></div><p className="lm-section-summary">React et TypeScript pour les interfaces, Express et Laravel côté serveur, Prisma et SQL pour les données. Java et Python complètent mon travail en BUT.</p></div>
 <div className="lm-skills-overview"><div><strong>{projects.length.toString().padStart(2,"0")}</strong><span>Projets présentés</span></div><div><strong>{count.toString().padStart(2,"0")}</strong><span>Technologies sur ces projets</span></div><div><strong>02</strong><span>Année de BUT Informatique</span></div></div>
 <div className="lm-skill-matrix">{skillGroups.map((group,index)=><article key={group.title} className="lm-skill-row">
  <div className="lm-skill-label"><span className="lm-kicker">{String(index+1).padStart(2,"0")}</span><h3>{group.title}</h3><p>{group.description}</p></div>
  <ul className="lm-skill-items">{group.skills.map(skill=>{
   const tokens=skill.name.toLowerCase().split(/\s*[\/]\s*/);
   const project=projects.find(project=>project.technologies.some(tech=>tokens.some(token=>token.length>1&&tech.toLowerCase().trim()===token.trim())));
   return <li key={skill.name} className="lm-skill-entry">
    {project ? <a className="lm-skill-link" href={`#${project.id}`} aria-label={`${skill.name} — voir le projet ${project.title}`}><Tag>{skill.name}</Tag><span className="lm-skill-project"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M1 7.5H13M8 2.5L13 7.5L8 12.5" stroke="currentColor" strokeWidth="1.5"/></svg>{project.title}</span></a> : <Tag>{skill.name}</Tag>}
    <span className="sr-only">{skill.description}</span>
   </li>;
  })}</ul>
 </article>)}</div>
 </section>;
