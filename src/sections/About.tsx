import { Code2, Gamepad2, GitBranch } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";

const principles = [
  {
    icon: Code2,
    title: "Construire",
    text: "J'aime partir d'une idée simple et arriver à quelque chose que je peux vraiment utiliser."
  },
  {
    icon: GitBranch,
    title: "Reprendre mon code",
    text: "Je reviens souvent sur mes projets pour corriger, simplifier ou mieux organiser ce que j'ai fait."
  },
  {
    icon: Gamepad2,
    title: "Tester autre chose",
    text: "Le jeu vidéo me permet de travailler des problèmes très différents du développement web."
  }
] as const;

export const About = () => (
  <section id="a-propos" className="content-shell section-block">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Work / À propos"
        title="Ce que j'aime dans le développement."
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <article className="info-card p-6 sm:p-7">
          <p className="text-base leading-7 text-[var(--text)]">
            Le BUT me donne les bases en développement, algorithmique, bases de données, réseaux et travail en équipe.
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Mes projets personnels me servent surtout à aller plus loin : je peux tester une idée, me tromper, revenir sur le code et voir comment le projet tient quand il commence à grossir.
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
