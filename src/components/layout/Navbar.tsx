import {
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { projects } from "../../data/projects";
import { profile } from "../../data/profile";
import type { AccentTheme, ColorMode, PortfolioMode } from "../../types";
import { SettingsPanel } from "./SettingsPanel";

interface NavbarProps {
  mode: PortfolioMode;
  accent: AccentTheme;
  colorMode: ColorMode;
  onModeChange: (mode: PortfolioMode) => void;
  onAccentChange: (accent: AccentTheme) => void;
  onColorModeChange: (mode: ColorMode) => void;
}

export const Navbar = ({
  mode,
  accent,
  colorMode,
  onModeChange,
  onAccentChange,
  onColorModeChange,
}: NavbarProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigationProjects = projects.filter((project) => project.variant !== "compact");

  return (
    <>
      <aside className="sidebar hidden lg:flex" aria-label="Navigation du portfolio">
        <div className="sidebar-profile">
          <div className="avatar-mark" aria-hidden="true">LM</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--text)]">{profile.name}</p>
            <p className="mt-0.5 truncate text-[11px] text-[var(--muted)]">BUT Informatique</p>
          </div>
        </div>

        <div className="mt-5 grid gap-1">
          <button
            type="button"
            onClick={() => onModeChange("work")}
            className={`sidebar-nav ${mode === "work" ? "sidebar-nav-active" : ""}`}
            aria-current={mode === "work" ? "page" : undefined}
          >
            <BriefcaseBusiness className="h-4 w-4" />
            <span>Work</span>
            <span className="ml-auto text-[10px] text-[var(--muted)]">01</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange("chat")}
            className={`sidebar-nav ${mode === "chat" ? "sidebar-nav-active" : ""}`}
            aria-current={mode === "chat" ? "page" : undefined}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat</span>
            <span className="ml-auto text-[10px] text-[var(--muted)]">02</span>
          </button>
        </div>

        <div className="mt-7">
          <p className="sidebar-label">Projets principaux</p>
          <div className="mt-2 grid gap-0.5">
            {navigationProjects.map((project) => (
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
                aria-label={`Aller au projet ${project.title}`}
              >
                <span className="sidebar-dot" aria-hidden="true" />
                <span className="truncate">{project.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-stage-card mt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Stage 2027
            </p>
            <span className="text-[10px] text-[var(--muted)]">8 semaines</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
            Dès le 12 avril · développement informatique
          </p>
        </div>

        <div className="mt-auto">
          <button type="button" onClick={() => setSettingsOpen(true)} className="sidebar-settings">
            <Settings2 className="h-4 w-4" />
            <span>Paramètres</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          </button>

          <div className="mt-2 grid grid-cols-3 gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-social"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-social"
              aria-label="LinkedIn"
            >
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
          <div className="avatar-mark h-8 w-8 text-[10px]" aria-hidden="true">LM</div>
          <div>
            <span className="block text-sm font-semibold leading-none">{profile.name}</span>
            <span className="mt-1 block text-[10px] text-[var(--muted)]">
              {mode === "work" ? "Work" : "Chat"}
            </span>
          </div>
        </div>

        <div className="mobile-mode-switch" aria-label="Changer de section">
          <button
            type="button"
            onClick={() => onModeChange("work")}
            className={mode === "work" ? "mobile-mode-active" : ""}
            aria-label="Ouvrir Work"
            aria-pressed={mode === "work"}
          >
            <BriefcaseBusiness className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onModeChange("chat")}
            className={mode === "chat" ? "mobile-mode-active" : ""}
            aria-label="Ouvrir Chat"
            aria-pressed={mode === "chat"}
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="mobile-social"
          aria-label="Ouvrir les paramètres"
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </header>

      <SettingsPanel
        open={settingsOpen}
        accent={accent}
        colorMode={colorMode}
        onAccentChange={onAccentChange}
        onColorModeChange={onColorModeChange}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};
