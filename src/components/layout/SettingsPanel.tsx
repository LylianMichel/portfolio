import { Check, Laptop, Moon, Palette, Sun, X } from "lucide-react";
import { useEffect } from "react";
import type { AccentTheme, ThemeMode } from "../../types";

interface SettingsPanelProps {
  open: boolean;
  accent: AccentTheme;
  theme: ThemeMode;
  onAccentChange: (accent: AccentTheme) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onClose: () => void;
}

const accents: { value: AccentTheme; label: string; className: string }[] = [
  { value: "green", label: "Vert", className: "accent-green" },
  { value: "blue", label: "Bleu", className: "accent-blue" },
  { value: "violet", label: "Violet", className: "accent-violet" },
  { value: "orange", label: "Orange", className: "accent-orange" },
];

const themes: { value: ThemeMode; label: string; description: string; icon: typeof Sun }[] = [
  { value: "light", label: "Clair", description: "Palette claire en conservant la DA", icon: Sun },
  { value: "dark", label: "Sombre", description: "Thème sombre actuel", icon: Moon },
  { value: "system", label: "Système", description: "Suit le réglage de l'appareil", icon: Laptop },
];

export const SettingsPanel = ({
  open,
  accent,
  theme,
  onAccentChange,
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Apparence</p>
            <h2 id="settings-title" className="mt-1 text-lg font-semibold text-[var(--text)]">Paramètres</h2>
          </div>
          <button type="button" onClick={onClose} className="settings-close" aria-label="Fermer les paramètres">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="settings-group mt-7">
          <h3 className="text-sm font-semibold text-[var(--text)]">Thème</h3>
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">Le choix est sauvegardé dans ton navigateur.</p>
          <div className="mt-4 grid gap-2">
            {themes.map((item) => {
              const selected = theme === item.value;
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onThemeChange(item.value)}
                  className={`settings-option ${selected ? "settings-option-active" : ""}`}
                  aria-pressed={selected}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-left">
                    <span className="block text-sm text-[var(--text)]">{item.label}</span>
                    <span className="mt-0.5 block text-[11px] text-[var(--muted)]">{item.description}</span>
                  </span>
                  {selected ? <Check className="ml-auto h-4 w-4 text-[var(--accent)]" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="settings-group mt-7 border-t border-[var(--border)] pt-6">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-[var(--muted)]" />
            <h3 className="text-sm font-semibold text-[var(--text)]">Couleur d'accent</h3>
          </div>
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">Les quatre accents existants restent disponibles.</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {accents.map((item) => {
              const selected = accent === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onAccentChange(item.value)}
                  className={`settings-option ${selected ? "settings-option-active" : ""}`}
                  aria-pressed={selected}
                >
                  <span className={`settings-swatch ${item.className}`} aria-hidden="true" />
                  <span>{item.label}</span>
                  {selected ? <Check className="ml-auto h-4 w-4 text-[var(--accent)]" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
