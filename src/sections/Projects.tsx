import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Work / Projets sélectionnés"
        title="Quatre projets qui montrent des compétences différentes."
        description="Je mets les projets avant le reste : ils montrent mieux mon niveau réel qu'une liste de technologies."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>
    </div>
  </section>
);
