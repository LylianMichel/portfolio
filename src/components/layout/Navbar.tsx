import {
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { projects } from "../../data/projects";
import { profile } from "../../data/profile";
import type { PortfolioMode, ThemeMode } from "../../types";
import { SettingsPanel } from "./SettingsPanel";

interface NavbarProps {
  mode: PortfolioMode;
  theme: ThemeMode;
  onModeChange: (mode: PortfolioMode) => void;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Navbar = ({
  mode,
  theme,
  onModeChange,
  onThemeChange,
}: NavbarProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

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
            <span>Portfolio</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange("contact")}
            className={`sidebar-nav ${mode === "contact" ? "sidebar-nav-active" : ""}`}
            aria-current={mode === "contact" ? "page" : undefined}
          >
            <Mail className="h-4 w-4" />
            <span>Contact</span>
          </button>
        </div>

        <div className="mt-7">
          <p className="sidebar-label">Projets</p>
          <div className="mt-2 grid gap-0.5">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="sidebar-project"
                aria-label={`Aller au projet ${project.title}`}
              >
                <span className="sidebar-dot" aria-hidden="true" />
                <span className="truncate">{project.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="sidebar-settings"
          >
            <Settings2 className="h-4 w-4" />
            <span>Paramètres</span>
          </button>

          <div className="mt-2 grid grid-cols-3 gap-1">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="sidebar-social" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="sidebar-social" aria-label="LinkedIn">
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
              {mode === "work" ? "Portfolio" : "Contact"}
            </span>
          </div>
        </div>

        <div className="mobile-mode-switch" aria-label="Changer de section">
          <button
            type="button"
            onClick={() => onModeChange("work")}
            className={mode === "work" ? "mobile-mode-active" : ""}
            aria-label="Ouvrir le portfolio"
            aria-pressed={mode === "work"}
          >
            <BriefcaseBusiness className="h-4 w-4" /><span>Projets</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange("contact")}
            className={mode === "contact" ? "mobile-mode-active" : ""}
            aria-label="Ouvrir les coordonnées"
            aria-pressed={mode === "contact"}
          >
            <Mail className="h-4 w-4" /><span>Contact</span>
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
        theme={theme}
        onThemeChange={onThemeChange}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};
