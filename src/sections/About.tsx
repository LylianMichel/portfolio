import { Code2, Gamepad2, GitBranch } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";

const principles = [
  {
    icon: Code2,
    title: "Construire",
    text: "Faire fonctionner une idée, puis la rendre plus propre et plus fiable."
  },
  {
    icon: GitBranch,
    title: "Structurer",
    text: "Garder un projet compréhensible quand il commence à grossir."
  },
  {
    icon: Gamepad2,
    title: "Explorer",
    text: "Utiliser mes projets personnels pour apprendre au-delà des cours."
  }
] as const;

export const About = () => (
  <section id="a-propos" className="content-shell section-block">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Work / À propos"
        title="J'apprends surtout en construisant."
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <article className="info-card p-6 sm:p-7">
          <p className="text-base leading-7 text-[var(--text)]">
            Mon BUT Informatique me donne les bases en développement, algorithmique, bases de données, réseaux et travail en équipe.
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            En parallèle, je développe des projets personnels plus longs comme AniVault et THE WORLD DEFENCE. Ils m'obligent à gérer l'architecture, les tests, les données, l'UX et la maintenance dans le temps.
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
