import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { profile } from "../../data/profile";

export const Footer = () => (
  <footer className="border-t border-[var(--border)] py-8">
    <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">Portfolio / BUT2</p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--text)]">{profile.name}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {new Date().getFullYear()} · React + TypeScript · IUT de Lens
        </p>
      </div>

      <div className="flex gap-5 text-sm">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--muted)] transition hover:text-[var(--text)]"
        >
          <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3 w-3" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--muted)] transition hover:text-[var(--text)]"
        >
          <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  </footer>
);
