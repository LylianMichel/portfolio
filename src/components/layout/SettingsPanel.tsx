import { Moon, RotateCcw, SunMedium, X } from "lucide-react";
import { useEffect } from "react";

interface SettingsPanelProps {
  open: boolean;
  brightness: number;
  onBrightnessChange: (brightness: number) => void;
  onClose: () => void;
}

export const SettingsPanel = ({
  open,
  brightness,
  onBrightnessChange,
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
          <div className="flex items-center gap-2">
            <SunMedium className="h-4 w-4 text-[var(--muted)]" />
            <h3 className="text-sm font-semibold text-[var(--text)]">Luminosité</h3>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
            Ajuste la luminosité de l'interface sans changer sa couleur.
          </p>

          <div className="brightness-control mt-5">
            <div className="brightness-scale" aria-hidden="true">
              <Moon className="h-4 w-4" />
              <span>{brightness}%</span>
              <SunMedium className="h-4 w-4" />
            </div>

            <input
              className="brightness-range"
              type="range"
              min="80"
              max="120"
              step="10"
              value={brightness}
              onChange={(event) => onBrightnessChange(Number(event.target.value))}
              aria-label="Luminosité de l'interface"
              aria-valuetext={`${brightness} pour cent`}
            />

            <div className="brightness-labels" aria-hidden="true">
              <span>Plus sombre</span>
              <span>Normal</span>
              <span>Plus clair</span>
            </div>
          </div>

          <button
            type="button"
            className="settings-reset mt-5"
            onClick={() => onBrightnessChange(100)}
            disabled={brightness === 100}
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </button>
        </div>
      </section>
    </div>
  );
};
