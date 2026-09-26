import { Coffee, Gamepad2, LibraryBig, MonitorSmartphone } from "lucide-react";
import type { Project } from "../../types";

const iconMap = {
  Gamepad2,
  Coffee,
  MonitorSmartphone,
  LibraryBig,
} satisfies Record<Project["icon"], typeof Gamepad2>;

const toneClasses: Record<Project["tone"], string> = {
  cyan: "from-cyan-500/25 via-cyan-500/5 to-transparent text-cyan-600 dark:text-cyan-300",
  violet: "from-violet-500/25 via-violet-500/5 to-transparent text-violet-600 dark:text-violet-300",
  blue: "from-blue-500/25 via-blue-500/5 to-transparent text-blue-600 dark:text-blue-300",
  mixed: "from-cyan-500/20 via-violet-500/10 to-blue-500/5 text-violet-600 dark:text-violet-300",
};

interface ProjectVisualProps {
  project: Project;
}

export const ProjectVisual = ({ project }: ProjectVisualProps) => {
  const Icon = iconMap[project.icon];

  return (
    <div
      className={`relative h-44 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${toneClasses[project.tone]} dark:border-white/8`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 project-grid opacity-45" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-current/15" />
      <div className="absolute -right-2 top-8 h-24 w-24 rounded-full border border-current/10" />
      <div className="absolute bottom-5 left-5 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-current/20 bg-white/65 shadow-sm backdrop-blur dark:bg-[#0b1022]/70">
          <Icon className="h-6 w-6" strokeWidth={1.7} />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
          project://{project.id}
        </div>
      </div>
    </div>
  );
};
