import { Code2, Gamepad2, GitBranch } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const points = [
  {
    icon: Code2,
    title: "Construire",
    text: "Passer d'une idée à une application fonctionnelle, puis l'améliorer par itérations."
  },
  {
    icon: GitBranch,
    title: "Comprendre",
    text: "Travailler autant l'interface que la logique métier, les données et la structure du projet."
  },
  {
    icon: Gamepad2,
    title: "Créer",
    text: "Explorer aussi le jeu vidéo et les projets personnels pour apprendre autrement."
  }
] as const;

export const About = () => (
  <section id="a-propos" className="section-shell">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="02 / À propos"
          title="J'apprends surtout en construisant des projets complets."
          description="Mon BUT Informatique me donne les bases techniques ; mes projets personnels me permettent de les pousser plus loin et de travailler sur des problèmes concrets."
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
        <Reveal>
          <div className="max-w-2xl space-y-5 text-base leading-8 text-[var(--muted)] sm:text-lg">
            <p>
              Je suis étudiant en <strong className="font-semibold text-[var(--text)]">BUT Informatique à l'IUT de Lens</strong>. J'y travaille le développement, l'algorithmique, les bases de données, les réseaux et la conduite de projets.
            </p>
            <p>
              En parallèle, je développe des applications web et un jeu avec Godot. Ces projets me permettent de pratiquer l'architecture, les tests, la persistance des données, l'UX et la maintenance d'un projet qui évolue dans le temps.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-[var(--border)]">
          {points.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.04}>
              <div className="flex gap-4 border-b border-[var(--border)] py-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.8} />
                <div>
                  <h3 className="font-semibold text-[var(--text)]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
