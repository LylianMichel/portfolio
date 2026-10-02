import { skillGroups } from "../data/skills";

export const Skills = () => (
  <section aria-labelledby="skills-title" id="competences" className="content-shell section-block">
    <div className="skills-section mx-auto max-w-6xl">
      <div className="skills-intro">
        <p className="section-eyebrow">Compétences</p>
        <h2 id="skills-title">Mes outils de travail.</h2>
        <p>
          Laravel pour Le Temple, Godot pour le jeu. J’utilise aussi Java, Python et SQL en BUT.
        </p>
      </div>

      <div className="skills-list">
        {skillGroups.map((group) => (
          <article key={group.title} className="skill-group-row">
            <div className="skill-group-heading">
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
