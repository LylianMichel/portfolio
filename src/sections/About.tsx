import { Code2, Gamepad2, GitBranch } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";

const principles = [
  {
    icon: Code2,
    title: "Web & applications complètes",
    text: "J'aime travailler sur un projet du frontend jusqu'aux données plutôt que rester uniquement sur l'interface."
  },
  {
    icon: GitBranch,
    title: "Faire évoluer un projet",
    text: "Je reviens souvent sur mon code pour corriger une idée, simplifier une partie ou améliorer l'organisation."
  },
  {
    icon: Gamepad2,
    title: "Développement de jeux",
    text: "THE WORLD DEFENCE me permet de travailler des systèmes, de l'UI et de la logique très différents du web."
  }
] as const;

export const About = () => (
  <section id="a-propos" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="03 / À propos"
        title="Quelques mots sur moi."
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <article className="info-card p-6 sm:p-7">
          <p className="text-base leading-7 text-[var(--text)]">
            Je suis Lylian Michel, étudiant en deuxième année de BUT Informatique à l'IUT de Lens.
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Je m'intéresse surtout au développement web, au développement logiciel et aux applications qui combinent frontend, backend et base de données. Mes projets personnels me servent à approfondir ce que je vois en cours et à apprendre en construisant des projets qui évoluent dans le temps.
          </p>
        </article>

        <div className="grid gap-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="info-card flex gap-4">
              <div className="icon-soft">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
