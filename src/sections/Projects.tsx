import { ProjectCard } from "../components/projects/ProjectCard";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="section-shell px-3 sm:px-5">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <SectionHeading
          eyebrow="01 / Projets"
          title="Des projets assez complets pour raconter autre chose qu'une liste de technologies."
          description="Web, application full-stack ou jeu vidéo : chaque projet montre une partie différente de ma manière de concevoir, structurer et faire évoluer un produit."
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.04}>
            <ProjectCard project={project} index={index + 1} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
