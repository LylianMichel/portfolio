import {
    motion,
    useReducedMotion
} from "framer-motion";
import { useEffect, useState } from "react";

import { applications } from "../config/applications";

import type {
    AppId,
    OSWindow
} from "../types";

interface DockProps {
    windows: OSWindow[];

    onOpen: (id: AppId, title: string) => void;
}

export default function Dock({
                                 windows,
                                 onOpen
                             }: DockProps) {

    const reducedMotion = useReducedMotion();
    const [hoveredIndex, setHoveredIndex] =
        useState<number | null>(null);
    return (
        <footer className="os-dock" aria-label="Applications du dock"
            onPointerLeave={() => setHoveredIndex(null)}
            onPointerMove={event => {
                if (event.pointerType !== "mouse") return;
                const slots = event.currentTarget.querySelectorAll<HTMLElement>(".os-dock-slot");
                const first = slots[0]?.getBoundingClientRect();
                const second = slots[1]?.getBoundingClientRect();
                if (first && second) {
                    setHoveredIndex((event.clientX - first.left - first.width / 2) / (second.left - first.left));
                }
            }}>

            {applications.map((app, index) => {

                const isOpen = windows.some(
                    window => window.id === app.id
                );
                const distance = hoveredIndex === null
                    ? Infinity
                    : Math.abs(index - hoveredIndex);

                const influence = Math.max(
                    0,
                    1 - distance / 3
                );

                const scale = reducedMotion
                    ? 1
                    : 1 + influence * 0.4;

                return (
                    <DockIcon
                        key={app.id}
                        app={app}
                        isOpen={isOpen}
                        scale={scale}
                        influence={influence}
                        onOpen={onOpen}
                    />
                );
            })}

        </footer>
    );
}

function DockIcon({app, isOpen, scale, influence, onOpen}: {
    app: (typeof applications)[number];
    isOpen: boolean;
    scale: number;
    influence: number;
    onOpen: DockProps["onOpen"];
}) {
    const reducedMotion = useReducedMotion();
    const [bouncing, setBouncing] = useState(false);
    const Icon = app.icon;

    useEffect(() => {
        if (!bouncing) return;
        const timeout = window.setTimeout(() => setBouncing(false), 500);
        return () => window.clearTimeout(timeout);
    }, [bouncing]);

    return <span className="os-dock-slot">
                    <motion.button
                        type="button"
                        data-dock-app={app.id}
                        className="os-dock-icon"

                        title={app.title}
                        aria-label={app.title}

                        style={{
                            color: app.color
                        }}

                        animate={{
                            scale: scale,

                            y: reducedMotion
                                ? 0
                                : bouncing
                                    ? [0, -18, 0, -9, 0]
                                    : -influence * 12
                        }}

                        whileTap={
                            reducedMotion
                                ? undefined
                                : {
                                    scale: 0.9
                                }
                        }

                        transition={
                            bouncing
                                ? { duration: 0.5 }
                                : {
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 22
                                }
                        }

                        onClick={() => {
                            if (!reducedMotion && !isOpen) {
                                setBouncing(true);
                            }

                            onOpen(app.id, app.title);
                        }}

                    >

                        <Icon size={28} />

                        {isOpen && (
                            <span
                                className="os-dock-indicator"
                            />
                        )}

                    </motion.button>
    </span>;
}
