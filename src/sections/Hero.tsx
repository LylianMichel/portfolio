import { motion } from "framer-motion";
import { ArrowDown, Download, Github, MapPin } from "lucide-react";
import { profile } from "../data/profile";

export const Hero = () => (
  <section id="accueil" className="pt-16">
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          <span className="inline-flex items-center gap-2 font-medium text-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            Étudiant en BUT Informatique
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </span>
        </div>

        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] text-[var(--text)] sm:text-6xl lg:text-7xl">
          Lylian Michel
        </h1>

        <p className="mt-7 max-w-3xl text-pretty text-xl leading-8 text-[var(--muted)] sm:text-2xl sm:leading-9">
          Je développe des applications web et des projets logiciels, du front-end React aux applications complètes, avec un intérêt particulier pour le jeu vidéo.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page-bg)] transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Voir mes projets
            <ArrowDown className="h-4 w-4" />
          </a>

          {profile.cvUrl ? (
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Download className="h-4 w-4" />
              Télécharger mon CV
            </a>
          ) : null}
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
        >
          <Github className="h-4 w-4" />
          github.com/LylianMichel
        </a>
      </motion.div>
    </div>
  </section>
);
