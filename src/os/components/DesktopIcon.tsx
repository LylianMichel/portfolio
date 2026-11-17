import type { LucideIcon } from "lucide-react";

import {
    motion,
    useReducedMotion
} from "framer-motion";

interface Props {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}

export default function DesktopIcon({
                                        label,
                                        icon: Icon,
                                        onClick
                                    }: Props) {

    const reducedMotion = useReducedMotion();

    return (
        <motion.button
            className="os-desktop-icon"

            whileHover={
                reducedMotion
                    ? undefined
                    : { scale: 1.08, y: -4 }
            }

            whileTap={
                reducedMotion
                    ? undefined
                    : { scale: 0.92 }
            }

            onClick={onClick}
        >
            <div className="os-icon-image">
                <Icon size={32} />
            </div>

            <span>{label}</span>

        </motion.button>
    );
}