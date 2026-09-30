import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section id="competences" className="content-shell section-block">
    <div className="skills-section mx-auto max-w-6xl">
      <div className="skills-intro">
        <p className="section-eyebrow">02 / Compétences</p>
        <h2>Ce que j'utilise vraiment dans mes projets.</h2>
        <p>
          Pas de pourcentages de maîtrise : je préfère montrer les technologies que j'utilise en cours et dans mes projets personnels.
        </p>
      </div>

      <div className="skills-list">
        {skillGroups.map((group, index) => (
          <article key={group.title} className="skill-group-row">
            <div className="skill-group-heading">
              <span>0{index + 1}</span>
              <div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
            </div>

            <div className="skill-group-items">
              {group.skills.map((skill) => (
                <span key={skill.name} className="skill-inline" title={skill.description}>
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
