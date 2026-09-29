import { Github, Linkedin } from "lucide-react";
import { profile } from "../../data/profile";

const hasLinkedIn = Boolean(profile.linkedin && !profile.linkedin.includes("ton-profil"));

export const Footer = () => (
  <footer className="border-t border-[var(--border)] py-8">
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 text-sm text-[var(--muted)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <p className="font-semibold text-[var(--text)]">{profile.name} · {new Date().getFullYear()}</p>
        <p className="mt-1">Portfolio développé avec React, TypeScript, Vite et Tailwind CSS.</p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="Profil GitHub de Lylian Michel"
          className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] transition hover:text-[var(--text)]"
        >
          <Github className="h-4 w-4" />
        </a>

        {hasLinkedIn ? (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Profil LinkedIn de Lylian Michel"
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] transition hover:text-[var(--text)]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  </footer>
);
