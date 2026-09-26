import { Download, Gamepad2, GitBranch, Globe2, Palette, SquareTerminal } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const interests = [
  { icon: Globe2, label: "Développement web" },
  { icon: SquareTerminal, label: "Java & Python" },
  { icon: SquareTerminal, label: "Bases de données" },
  { icon: Gamepad2, label: "Développement de jeux" },
  { icon: GitBranch, label: "Git & collaboration" },
  { icon: Palette, label: "Création numérique" },
] as const;

export const About = () => (
  <section id="a-propos" className="section-shell">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="01 / À propos"
          title="Un profil technique avec une vraie place pour la création."
          description="Mon parcours en BUT Informatique me permet de développer des bases solides tout en construisant des projets personnels qui me ressemblent."
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal className="glass-card p-6 sm:p-8">
          <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
            Je suis étudiant en <strong className="font-semibold text-slate-950 dark:text-white">BUT Informatique à l'IUT de Lens</strong>.
            J'apprends principalement en pratiquant : développement web, programmation orientée objet, bases de données, algorithmique et travail en équipe.
          </p>
          <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
            En dehors des projets universitaires, je développe aussi des idées plus personnelles autour des jeux vidéo et des applications web. Cette double approche me permet de travailler autant la qualité technique que l'expérience proposée à l'utilisateur.
          </p>

          <a
            href={profile.cvUrl}
            download
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            Télécharger mon CV
          </a>
          <p className="mt-3 text-xs text-slate-400">
            Remplace simplement <code className="font-mono">public/CV-Lylian-Michel.pdf</code> par ton CV.
          </p>
        </Reveal>

        <Reveal className="grid gap-3 sm:grid-cols-2" delay={0.08}>
          {interests.map(({ icon: Icon, label }) => (
            <div key={label} className="glass-card flex min-h-28 flex-col justify-between p-5">
              <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-300" strokeWidth={1.8} />
              <span className="mt-5 text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);
