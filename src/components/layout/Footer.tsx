import { Github, Linkedin } from "lucide-react";
import { profile } from "../../data/profile";

export const Footer = () => (
  <footer className="border-t border-slate-200 py-8 dark:border-white/8">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 dark:text-slate-500">
      <div>
        <p className="font-semibold text-slate-800 dark:text-slate-200">
          {profile.name} · {new Date().getFullYear()}
        </p>
        <p className="mt-1">Conçu et développé avec React et TypeScript.</p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="Profil GitHub de Lylian Michel"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 transition hover:text-slate-950 dark:border-white/10 dark:hover:text-white"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="Profil LinkedIn de Lylian Michel"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 transition hover:text-slate-950 dark:border-white/10 dark:hover:text-white"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);
