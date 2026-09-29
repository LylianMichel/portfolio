import { Code2, Gamepad2, GitBranch } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const principles = [
  {
    icon: Code2,
    title: "Construire",
    text: "Passer d'une idée à quelque chose de réellement utilisable, puis le faire évoluer."
  },
  {
    icon: GitBranch,
    title: "Structurer",
    text: "Garder un projet lisible et maintenable, même quand les fonctionnalités s'accumulent."
  },
  {
    icon: Gamepad2,
    title: "Explorer",
    text: "Sortir du web avec le jeu vidéo et les projets personnels pour apprendre autrement."
  }
] as const;

export const About = () => (
  <section id="a-propos" className="section-shell section-divider px-3 sm:px-5">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <SectionHeading
          eyebrow="03 / À propos"
          title="Étudiant, mais déjà habitué à faire vivre des projets qui dépassent le cadre d'un exercice."
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <article className="panel-raised h-full rounded-[2rem] p-7 sm:p-9">
            <p className="editorial-serif text-3xl leading-[1.12] font-semibold tracking-[-0.035em] sm:text-4xl">
              Mon BUT me donne les bases. Mes projets personnels m'obligent à prendre des décisions, corriger des erreurs et maintenir ce que j'ai construit.
            </p>

            <div className="mt-9 grid gap-5 border-t border-[var(--border)] pt-7 sm:grid-cols-2">
              <p className="text-sm leading-7 text-[var(--muted)]">
                À l'IUT de Lens, je travaille le développement, l'algorithmique, les bases de données, les réseaux et la conduite de projets.
              </p>
              <p className="text-sm leading-7 text-[var(--muted)]">
                En dehors des cours, je développe des applications web et un tower defense avec Godot, ce qui me pousse à aller plus loin sur l'architecture, les tests et l'UX.
              </p>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-3">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.04}>
              <article className="panel flex items-start gap-5 rounded-[1.5rem] p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
