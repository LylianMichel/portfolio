import type { LucideIcon } from "lucide-react";

import {
    motion,
    useReducedMotion
} from "framer-motion";

interface Props {
    label: string;
    icon: LucideIcon;
    color: string;
    onClick: () => void;
}

export default function DesktopIcon({
                                        label,
                                        icon: Icon,
                                        color,
                                        onClick
                                    }: Props) {

    const reducedMotion = useReducedMotion();

    return (
        <motion.button
            type="button"
            className="os-desktop-icon"
            transition={{ duration: 0.15 }}

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
                <Icon size={32} color={color} />
            </div>

            <span>{label}</span>

        </motion.button>
    );
}
