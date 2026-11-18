import {
    motion,
    useReducedMotion
} from "framer-motion";
import { useState } from "react";

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
    const [bouncingApp, setBouncingApp] =
        useState<AppId | null>(null);
    return (
        <footer className="os-dock">

            {applications.map((app, index) => {

                const Icon = app.icon;

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
                    <motion.button
                        key={app.id}
                        type="button"
                        data-dock-app={app.id}
                        className="os-dock-icon"

                        title={app.title}
                        aria-label={app.title}

                        style={{
                            color: app.color
                        }}

                        onHoverStart={() => setHoveredIndex(index)}

                        onHoverEnd={() => setHoveredIndex(null)}

                        animate={{
                            scale: scale,

                            y: reducedMotion
                                ? 0
                                : bouncingApp === app.id
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
                            bouncingApp === app.id
                                ? { duration: 0.5 }
                                : {
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 22
                                }
                        }

                        onClick={() => {
                            if (!reducedMotion && !isOpen) {
                                setBouncingApp(app.id);
                            }

                            onOpen(app.id, app.title);
                        }}

                        onAnimationComplete={() => {
                            if (bouncingApp === app.id) {
                                setBouncingApp(null);
                            }
                        }}
                    >

                        <Icon size={28} />

                        {isOpen && (
                            <span
                                className="os-dock-indicator"
                            />
                        )}

                    </motion.button>
                );
            })}

        </footer>
    );
}