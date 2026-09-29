import { Code2, Gamepad2, Layers3 } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";

const interests = [
  {
    icon: Code2,
    title: "Développement web",
    text: "J'aime travailler sur des applications complètes, de l'interface jusqu'aux données."
  },
  {
    icon: Layers3,
    title: "Développement logiciel",
    text: "Le BUT me fait aussi travailler Java, les structures de données, les tests et la conception."
  },
  {
    icon: Gamepad2,
    title: "Développement de jeux",
    text: "THE WORLD DEFENCE me permet d'aborder des problèmes très différents du web."
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
            Je m'intéresse surtout au développement web, aux applications frontend/backend et au développement logiciel. Mes projets personnels me servent à aller plus loin que les exercices de cours et à voir comment une application évolue quand elle commence à prendre de l'ampleur.
          </p>
        </article>

        <div className="grid gap-3">
          {interests.map(({ icon: Icon, title, text }) => (
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
