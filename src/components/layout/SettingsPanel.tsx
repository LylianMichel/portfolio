import { Check, Moon, Sun, X } from "lucide-react";
import { useEffect } from "react";
import type { ThemeMode } from "../../types";

interface SettingsPanelProps {
  open: boolean;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onClose: () => void;
}

const themes: {
  value: ThemeMode;
  label: string;
  description: string;
  icon: typeof Moon;
}[] = [
  {
    value: "dark",
    label: "Sombre",
    description: "Fond sombre et contrastes doux",
    icon: Moon,
  },
  {
    value: "light",
    label: "Clair",
    description: "Fond clair avec la même identité visuelle",
    icon: Sun,
  },
];

export const SettingsPanel = ({
  open,
  theme,
  onThemeChange,
  onClose,
}: SettingsPanelProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="settings-overlay" onMouseDown={onClose}>
      <section
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="settings-panel-header">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Apparence
            </p>
            <h2 id="settings-title" className="mt-1 text-lg font-semibold text-[var(--text)]">
              Paramètres
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="settings-close"
            aria-label="Fermer les paramètres"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[var(--text)]">Thème</h3>
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
            Choisis le mode d'affichage du portfolio. Le choix est enregistré automatiquement.
          </p>

          <div className="mt-4 grid gap-2">
            {themes.map((item) => {
              const selected = theme === item.value;
              const Icon = item.icon;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onThemeChange(item.value)}
                  className={`theme-option ${selected ? "theme-option-active" : ""}`}
                  aria-pressed={selected}
                >
                  <span className="theme-option-icon">
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-medium text-[var(--text)]">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-[var(--muted)]">{item.description}</span>
                  </span>

                  {selected ? <Check className="ml-auto h-4 w-4 shrink-0 text-[var(--accent)]" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
