import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Github, MapPin } from "lucide-react";
import { profile } from "../data/profile";

const hasCv = Boolean(profile.cvUrl);

export const Hero = () => (
  <section id="accueil" className="px-3 pb-10 pt-28 sm:px-5 sm:pb-16 sm:pt-32">
    <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-stretch gap-5 lg:grid-cols-[1.35fr_.65fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="panel-raised relative flex overflow-hidden rounded-[2rem] p-6 sm:p-9 lg:p-11"
      >
        <div className="relative z-10 flex w-full flex-col justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Portfolio développeur
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </div>

          <div className="my-14 sm:my-16 lg:my-10">
            <p className="kicker mb-5 text-[11px] font-semibold text-[var(--accent)]">
              Étudiant en BUT Informatique
            </p>
            <h1 className="editorial-serif max-w-5xl text-balance text-[clamp(3.7rem,8.2vw,8rem)] leading-[0.84] font-semibold tracking-[-0.065em]">
              Je construis des interfaces et des applications qui vont au-delà du prototype.
            </h1>

            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
              Je suis Lylian Michel. Je travaille sur des projets web, logiciels et jeu vidéo avec une attention particulière portée à la structure, à l'expérience utilisateur et à la qualité du code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projets"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page-bg)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              Voir mes projets
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              GitHub
              <Github className="h-4 w-4" />
            </a>

            {hasCv ? (
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                <Download className="h-4 w-4" />
                CV
              </a>
            ) : null}
          </div>
        </div>

        <div
          className="pointer-events-none absolute -right-16 top-[22%] h-64 w-64 rounded-full border border-[var(--border)] opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-4 top-[30%] h-40 w-40 rounded-full border border-[rgba(var(--accent-rgb),0.35)]"
          aria-hidden="true"
        />
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        className="panel flex rounded-[2rem] p-6 sm:p-8"
      >
        <div className="flex w-full flex-col">
          <div>
            <p className="kicker text-[11px] font-semibold text-[var(--accent)]">Profil rapide</p>
            <p className="editorial-serif mt-4 text-3xl leading-tight font-semibold tracking-[-0.035em]">
              Lylian Michel
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{profile.role}</p>
          </div>

          <dl className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <div className="py-5">
              <dt className="text-xs text-[var(--muted)]">Formation</dt>
              <dd className="mt-1.5 font-semibold">BUT Informatique · IUT de Lens</dd>
            </div>
            <div className="py-5">
              <dt className="text-xs text-[var(--muted)]">Focus</dt>
              <dd className="mt-1.5 font-semibold">React · Web · Applications</dd>
            </div>
            <div className="py-5">
              <dt className="text-xs text-[var(--muted)]">Création</dt>
              <dd className="mt-1.5 font-semibold">Godot · Game design</dd>
            </div>
            <div className="py-5">
              <dt className="text-xs text-[var(--muted)]">Prochaine étape</dt>
              <dd className="mt-1.5 font-semibold">Stage informatique · 2027</dd>
            </div>
          </dl>

          <a
            href="#contact"
            className="mt-auto inline-flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm font-semibold"
          >
            Me contacter
            <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
          </a>
        </div>
      </motion.aside>
    </div>
  </section>
);
