import { Check, Monitor, Moon, Palette, Sun, X } from "lucide-react";
import { useEffect } from "react";
import type { AccentTheme, ColorMode } from "../../types";

interface SettingsPanelProps {
  open: boolean;
  accent: AccentTheme;
  colorMode: ColorMode;
  onAccentChange: (accent: AccentTheme) => void;
  onColorModeChange: (mode: ColorMode) => void;
  onClose: () => void;
}

const accents: { value: AccentTheme; label: string; className: string }[] = [
  { value: "green", label: "Vert", className: "accent-green" },
  { value: "blue", label: "Bleu", className: "accent-blue" },
  { value: "violet", label: "Violet", className: "accent-violet" },
  { value: "orange", label: "Orange", className: "accent-orange" },
];

const modes: { value: ColorMode; label: string; description: string; icon: typeof Sun }[] = [
  { value: "light", label: "Clair", description: "Toujours utiliser le thème clair.", icon: Sun },
  { value: "dark", label: "Sombre", description: "Toujours utiliser le thème sombre.", icon: Moon },
  { value: "system", label: "Système", description: "Suivre le réglage de ton appareil.", icon: Monitor },
];

export const SettingsPanel = ({
  open,
  accent,
  colorMode,
  onAccentChange,
  onColorModeChange,
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

        <div className="settings-group mt-7">
          <h3 className="text-sm font-semibold text-[var(--text)]">Thème</h3>
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
            Le mode choisi est sauvegardé sur cet appareil.
          </p>

          <div className="mt-4 grid gap-2">
            {modes.map(({ value, label, description, icon: Icon }) => {
              const selected = colorMode === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onColorModeChange(value)}
                  className={`settings-theme-option ${selected ? "settings-option-active" : ""}`}
                  aria-pressed={selected}
                >
                  <div className="icon-soft">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-medium text-[var(--text)]">{label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-[var(--muted)]">
                      {description}
                    </span>
                  </span>
                  {selected ? <Check className="ml-auto h-4 w-4 shrink-0 text-[var(--accent)]" /> : null}
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
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
            Les couleurs existantes restent disponibles quel que soit le thème.
          </p>

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
