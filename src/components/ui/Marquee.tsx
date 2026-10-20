import { projects } from "../../data/projects";
const technologies = [...new Set(projects.flatMap((project) => project.technologies))].filter((item) => ["React","TypeScript","Express","Prisma","PostgreSQL","Godot","Laravel","PHP","Vite","JavaScript"].includes(item));
export const Marquee = () => (
  <div className="lm-marquee" aria-label={`Technologies employées : ${technologies.join(", ")}`} tabIndex={0}>
    <div className="lm-marquee-track" aria-hidden="true">
      {[0, 1].map((row) => (
        <div className="lm-marquee-group" key={row}>
          {technologies.map((name) => <span key={name}>{name}<span className="lm-marquee-sep" aria-hidden="true">·</span></span>)}
        </div>
      ))}
    </div>
  </div>
);
