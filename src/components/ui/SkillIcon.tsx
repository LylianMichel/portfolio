import {
  Code2,
  Database,
  Gamepad2,
  GitBranch,
  Globe2,
  Laptop,
  ServerCog,
  SquareTerminal,
  WandSparkles,
} from "lucide-react";
import type { IconName } from "../../types";

const iconMap = {
  Code2,
  Database,
  Gamepad2,
  GitBranch,
  Globe2,
  Laptop,
  ServerCog,
  TerminalSquare: SquareTerminal,
  WandSparkles,
} satisfies Record<IconName, typeof Code2>;

interface SkillIconProps {
  name: IconName;
}

export const SkillIcon = ({ name }: SkillIconProps) => {
  const Icon = iconMap[name];
  return <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />;
};
