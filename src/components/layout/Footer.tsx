import { Github, Linkedin } from "lucide-react";
import { profile } from "../../data/profile";

const hasLinkedIn = Boolean(profile.linkedin);

export const Footer = () => (
  <footer className="px-3 pb-8 sm:px-5">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-[var(--border)] py-7 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold text-[var(--text)]">{profile.name} · {new Date().getFullYear()}</p>
        <p className="mt-1 text-xs">React · TypeScript · Vite · Tailwind CSS</p>
      </div>

      <div className="flex items-center gap-4">
        <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link" aria-label="GitHub">
          <Github className="h-4 w-4" />
          GitHub
        </a>
        {hasLinkedIn ? (
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        ) : null}
      </div>
    </div>
  </footer>
);
