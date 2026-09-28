import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github } from "lucide-react";
import { profile } from "../data/profile";

const disciplines = [
  ["01", "Web", "React / TypeScript"],
  ["02", "Logic", "Java / Python"],
  ["03", "Data", "SQL / PostgreSQL"],
  ["04", "Game", "Godot / Pixel art"],
] as const;

export const Hero = () => (
  <section id="accueil" className="relative overflow-hidden pt-16">
    <div className="absolute inset-0 tech-grid opacity-55" aria-hidden="true" />

    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-[var(--border)] py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
        <span>Portfolio étudiant / 2026</span>
        <span className="hidden sm:inline">BUT Informatique · IUT de Lens</span>
        <span className="text-[var(--accent)]">BUT.02</span>
      </div>

      <div className="grid min-h-[calc(100svh-7rem)] items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-8"
        >
          <p className="editorial-label">Développeur en formation</p>

          <h1 className="mt-7 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-[var(--text)]">
            Lylian
            <br />
            <span className="text-[var(--accent)]">Michel.</span>
          </h1>

          <div className="mt-9 grid max-w-3xl gap-6 border-t border-[var(--border)] pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
              {profile.tagline} Je construis surtout pour apprendre : comprendre le problème, coder une solution, la tester puis l'améliorer.
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href="#projets"
                className="inline-flex items-center gap-2 bg-[var(--text)] px-4 py-3 text-sm font-semibold text-[var(--page-bg)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Voir mes projets
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Contact
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          className="lg:col-span-4 lg:pl-8"
        >
          <div className="editorial-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">Now / 01</span>
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">Formation</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--text)]">BUT Informatique</p>
                <p className="mt-1 text-sm text-[var(--muted)]">2e année · IUT de Lens</p>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">Prochaine étape</p>
                <p className="mt-2 text-sm font-semibold text-[var(--text)]">Stage · 8 semaines</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">À partir du 12 avril 2027.</p>
              </div>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border-t border-[var(--border)] pt-5 text-sm font-medium text-[var(--text)]"
              >
                <span className="inline-flex items-center gap-2"><Github className="h-4 w-4" /> GitHub</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
              </a>
            </div>
          </div>
        </motion.aside>
      </div>

      <div className="grid border-y border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
        {disciplines.map(([index, label, stack]) => (
          <div key={label} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[var(--border)] py-4 sm:border-r sm:px-4 lg:border-b-0 first:pl-0 last:border-r-0">
            <span className="font-mono text-[10px] text-[var(--accent)]">{index}</span>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">{label}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{stack}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
