import { Check, Moon, Palette, X } from "lucide-react";
import { useEffect } from "react";
import type { AccentTheme } from "../../types";

interface SettingsPanelProps {
  open: boolean;
  accent: AccentTheme;
  onAccentChange: (accent: AccentTheme) => void;
  onClose: () => void;
}

const accents: { value: AccentTheme; label: string; className: string }[] = [
  { value: "green", label: "Vert", className: "accent-green" },
  { value: "blue", label: "Bleu", className: "accent-blue" },
  { value: "violet", label: "Violet", className: "accent-violet" },
  { value: "orange", label: "Orange", className: "accent-orange" },
];

export const SettingsPanel = ({ open, accent, onAccentChange, onClose }: SettingsPanelProps) => {
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
          <button type="button" onClick={onClose} className="settings-close" aria-label="Fermer les paramètres">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-7">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-[var(--muted)]" />
            <h3 className="text-sm font-semibold text-[var(--text)]">Couleur d'accent</h3>
          </div>
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
            Ton choix est enregistré automatiquement sur cet appareil.
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

        <div className="settings-static-row mt-6">
          <div className="flex items-center gap-3">
            <div className="icon-soft"><Moon className="h-4 w-4" /></div>
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Interface sombre</p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">Thème principal du portfolio</p>
            </div>
          </div>
          <span className="settings-badge">Actif</span>
        </div>
      </section>
    </div>
  );
};
