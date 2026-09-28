import { Coffee, Gamepad2, LibraryBig, MonitorSmartphone } from "lucide-react";
import type { Project } from "../../types";

const iconMap = {
  Gamepad2,
  Coffee,
  MonitorSmartphone,
  LibraryBig,
} satisfies Record<Project["icon"], typeof Gamepad2>;

interface ProjectVisualProps {
  project: Project;
  index: number;
}

export const ProjectVisual = ({ project, index }: ProjectVisualProps) => {
  const Icon = iconMap[project.icon];
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="relative min-h-52 overflow-hidden border border-[var(--border)] bg-[var(--surface-strong)] p-5" aria-hidden="true">
      <div className="absolute inset-0 project-grid text-[var(--border-strong)] opacity-30" />

      <div className="relative flex h-full min-h-44 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center border border-[var(--border)] bg-[var(--page-bg)] text-[var(--accent)]">
            <Icon className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <span className="font-mono text-5xl font-semibold tracking-[-0.08em] text-[var(--border-strong)]">{number}</span>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">/projects/{project.id}</p>
          <div className="mt-3 flex gap-2 text-[10px] text-[var(--muted)]">
            {project.technologies.slice(0, 3).map((technology) => (
              <span key={technology}>[{technology}]</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
