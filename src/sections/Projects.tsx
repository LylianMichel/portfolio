import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects } from "../data/projects";

export const Projects = () => (
  <section id="projets" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="01 / Projets"
        title="Des projets que je fais réellement évoluer."
        description="AniVault est mon projet web principal. THE WORLD DEFENCE me sert de terrain d'expérimentation côté jeu et UI. Les projets plus courts restent présents, mais prennent volontairement moins de place."
      />
      <div className="project-layout">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
            variant={index === 0 ? "featured" : index === projects.length - 1 ? "compact" : "standard"}
          />
        ))}
      </div>
    </div>
  </section>
);
