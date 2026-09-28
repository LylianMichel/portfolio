import { Download, Gamepad2, GitBranch, Globe2, Palette, SquareTerminal } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const interests = [
  { icon: Globe2, label: "Développement web", detail: "Interfaces, React, TypeScript" },
  { icon: SquareTerminal, label: "Programmation", detail: "Java, Python, algorithmique" },
  { icon: SquareTerminal, label: "Données", detail: "SQL, modélisation, PostgreSQL" },
  { icon: Gamepad2, label: "Jeu vidéo", detail: "Godot, gameplay, pixel art" },
  { icon: GitBranch, label: "Travail en équipe", detail: "Git, branches, projets de groupe" },
  { icon: Palette, label: "Création numérique", detail: "UI, expérimentation, prototypage" },
] as const;

export const About = () => (
  <section id="a-propos" className="section-shell">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="02 / À propos"
          title="J'apprends l'informatique en construisant des choses concrètes."
          description="Le portfolio montre mon niveau actuel : un étudiant de BUT2 qui sait déjà mener des projets, mais qui continue d'apprendre à chaque réalisation."
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <p className="max-w-3xl text-balance text-2xl font-medium leading-[1.35] tracking-[-0.025em] text-[var(--text)] sm:text-3xl">
            Je suis en deuxième année de BUT Informatique à l'IUT de Lens. Ce qui m'intéresse surtout, c'est le moment où une idée devient un programme utilisable.
          </p>

          <div className="mt-8 grid gap-6 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
            <p className="text-sm leading-7 text-[var(--muted)]">
              Pendant ma formation, je travaille le développement web, la programmation orientée objet, les bases de données, les réseaux et l'algorithmique.
            </p>
            <p className="text-sm leading-7 text-[var(--muted)]">
              À côté, je développe AniVault et un Tower Defense. Ces projets me permettent d'aller plus loin que les exercices de cours et de tester mes propres choix techniques.
            </p>
          </div>

          <a
            href={profile.cvUrl}
            download
            className="mt-8 inline-flex items-center gap-2 bg-[var(--text)] px-4 py-3 text-sm font-semibold text-[var(--page-bg)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Download className="h-4 w-4" />
            Télécharger mon CV
          </a>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.06}>
          <div className="border-t border-[var(--border)]">
            {interests.map(({ icon: Icon, label, detail }, index) => (
              <div
                key={label}
                className="grid grid-cols-[2.5rem_2.5rem_1fr] items-center gap-3 border-b border-[var(--border)] py-4"
              >
                <span className="font-mono text-[10px] text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="h-4 w-4 text-[var(--muted)]" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">{label}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
