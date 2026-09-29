import {
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Palette,
} from "lucide-react";
import { projects } from "../../data/projects";
import { profile } from "../../data/profile";
import type { AccentTheme, PortfolioMode } from "../../types";

interface NavbarProps {
  mode: PortfolioMode;
  accent: AccentTheme;
  onModeChange: (mode: PortfolioMode) => void;
  onAccentChange: (accent: AccentTheme) => void;
}

const accents: { value: AccentTheme; label: string }[] = [
  { value: "green", label: "Vert" },
  { value: "blue", label: "Bleu" },
  { value: "violet", label: "Violet" },
  { value: "orange", label: "Orange" },
];

export const Navbar = ({
  mode,
  accent,
  onModeChange,
  onAccentChange,
}: NavbarProps) => (
  <>
    <aside className="sidebar hidden lg:flex">
      <div className="sidebar-profile">
        <div className="avatar-mark">LM</div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{profile.name}</p>
          <p className="mt-0.5 truncate text-[11px] text-[var(--muted)]">BUT Informatique · Portfolio</p>
        </div>
      </div>

      <div className="mt-5 grid gap-1">
        <button
          type="button"
          onClick={() => onModeChange("work")}
          className={`sidebar-nav ${mode === "work" ? "sidebar-nav-active" : ""}`}
        >
          <BriefcaseBusiness className="h-4 w-4" />
          <span>Work</span>
          <span className="ml-auto text-[10px] text-[var(--muted)]">01</span>
        </button>

        <button
          type="button"
          onClick={() => onModeChange("chat")}
          className={`sidebar-nav ${mode === "chat" ? "sidebar-nav-active" : ""}`}
        >
          <MessageCircle className="h-4 w-4" />
          <span>Chat</span>
          <span className="ml-auto text-[10px] text-[var(--muted)]">02</span>
        </button>
      </div>

      <div className="mt-7">
        <p className="sidebar-label">Projets</p>
        <div className="mt-2 grid gap-0.5">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                onModeChange("work");
                window.setTimeout(() => {
                  document.getElementById(project.id)?.scrollIntoView({ behavior: "smooth" });
                }, 80);
              }}
              className="sidebar-project"
            >
              <span className="sidebar-dot" />
              <span className="truncate">{project.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-stage-card mt-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Stage 2027</p>
        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
          Je recherche un stage de 8 semaines à partir d'avril 2027 en développement informatique.
        </p>
      </div>

      <div className="mt-auto">
        <div className="border-t border-[var(--border)] pt-4">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <Palette className="h-3.5 w-3.5" />
            Accent
          </div>

          <div className="mt-2 flex gap-2">
            {accents.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => onAccentChange(item.value)}
                className={`accent-dot accent-${item.value} ${accent === item.value ? "accent-dot-active" : ""}`}
                aria-label={`Utiliser l'accent ${item.label}`}
                title={item.label}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1">
          <a href={profile.github} target="_blank" rel="noreferrer" className="sidebar-social" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="sidebar-social" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${profile.email}`} className="sidebar-social" aria-label="E-mail">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>

    <header className="mobile-header lg:hidden">
      <div className="flex items-center gap-2">
        <div className="avatar-mark h-8 w-8 text-[10px]">LM</div>
        <div>
          <span className="block text-sm font-semibold leading-none">{profile.name}</span>
          <span className="mt-1 block text-[10px] text-[var(--muted)]">{mode === "work" ? "Work" : "Chat"}</span>
        </div>
      </div>

      <div className="mobile-mode-switch">
        <button
          type="button"
          onClick={() => onModeChange("work")}
          className={mode === "work" ? "mobile-mode-active" : ""}
          aria-label="Ouvrir Work"
        >
          <BriefcaseBusiness className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onModeChange("chat")}
          className={mode === "chat" ? "mobile-mode-active" : ""}
          aria-label="Ouvrir Chat"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      </div>

      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mobile-social" aria-label="LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
    </header>
  </>
);
