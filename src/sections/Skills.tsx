import { skillGroups } from "../data/skills";
import { projects } from "../data/projects";
import { Tag } from "../components/ui/Tag";
const count=new Set(projects.flatMap(project=>project.technologies)).size;
export const Skills=()=><section id="competences" aria-labelledby="skills-title" className="lm-section lm-shell lm-skills">
 <div className="lm-section-head"><div><span className="lm-kicker">02 / SAVOIR-FAIRE</span><h2 id="skills-title" className="lm-section-title">Des outils.<br/>Des usages.</h2></div><p className="lm-section-summary">React et TypeScript pour les interfaces, Express et Laravel côté serveur, Prisma et SQL pour les données. Java et Python complètent mon travail en BUT.</p></div>
 <div className="lm-skills-overview"><div><strong>{projects.length.toString().padStart(2,"0")}</strong><span>Projets présentés</span></div><div><strong>{count.toString().padStart(2,"0")}</strong><span>Technologies sur ces projets</span></div><div><strong>02</strong><span>Année de BUT Informatique</span></div></div>
 <div className="lm-skill-matrix">{skillGroups.map((group,index)=><article key={group.title} className="lm-skill-row">
  <div className="lm-skill-label"><span className="lm-kicker">{String(index+1).padStart(2,"0")}</span><h3>{group.title}</h3><p>{group.description}</p></div>
  <ul className="lm-skill-items">{group.skills.map(skill=><li key={skill.name}><Tag>{skill.name}</Tag><span className="sr-only">{skill.description}</span></li>)}</ul>
 </article>)}</div>
 </section>;
