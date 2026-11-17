import {
    UserRound,
    Folder,
    Layers,
    FileText,
    Mail,
    Terminal,
    Settings
} from "lucide-react";

import { AnimatePresence } from "framer-motion";

import Wallpaper from "./components/Wallpaper";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import AboutApp from "./apps/AboutApp";
import CVApp from "./apps/CVApp";

import { useWindowManager } from "./hooks/useWindowManager";

import "./os.css";
export default function Desktop() {

    const {
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        moveWindow,
        minimizeWindow,
        maximizeWindow,
        resizeWindow
    } = useWindowManager();

    return (
        <main className="os-desktop">

            <Wallpaper />

            <header className="os-topbar">
                LylianOS
            </header>

            <div className="os-workspace">
                <div className="os-icons">

                    <DesktopIcon
                        label="Profil"
                        icon={UserRound}
                        onClick={() => openWindow("about", "Profil")}
                    />

                    <DesktopIcon
                        label="Projets"
                        icon={Folder}
                        onClick={() => openWindow("projects", "Projets")}
                    />

                    <DesktopIcon
                        label="Compétences"
                        icon={Layers}
                        onClick={() => openWindow("skills", "Compétences")}
                    />

                    <DesktopIcon
                        label="CV"
                        icon={FileText}
                        onClick={() => openWindow("cv", "CV")}
                    />

                    <DesktopIcon
                        label="Contact"
                        icon={Mail}
                        onClick={() => openWindow("contact", "Contact")}
                    />

                    <DesktopIcon
                        label="Terminal"
                        icon={Terminal}
                        onClick={() => openWindow("terminal", "Terminal")}
                    />

                    <DesktopIcon
                        label="Réglages"
                        icon={Settings}
                        onClick={() => openWindow("settings", "Réglages")}
                    />

                </div>
                <AnimatePresence>

                    {windows.map(window => (

                        <Window
                            key={window.id}
                            window={window}

                            onClose={() =>
                                closeWindow(window.id)
                            }

                            onFocus={() =>
                                focusWindow(window.id)
                            }

                            onMinimize={() =>
                                minimizeWindow(window.id)
                            }

                            onMaximize={() =>
                                maximizeWindow(window.id)
                            }

                            onMove={(x, y) =>
                                moveWindow(window.id, x, y)
                            }

                            onResize={(width, height) =>
                                resizeWindow(window.id, width, height)
                            }
                        >

                            {window.id === "about" && <AboutApp />}

                            {window.id === "cv" && <CVApp />}

                            {window.id === "projects" && (
                                <h1>Mes projets</h1>
                            )}

                            {window.id === "skills" && (
                                <h1>Mes compétences</h1>
                            )}

                            {window.id === "contact" && (
                                <h1>Contact</h1>
                            )}

                            {window.id === "terminal" && (
                                <h1>Terminal</h1>
                            )}

                            {window.id === "settings" && (
                                <h1>Réglages</h1>
                            )}

                        </Window>

                    ))}

                </AnimatePresence>
            </div>

            <footer className="os-dock">

            </footer>

        </main>
    );
}