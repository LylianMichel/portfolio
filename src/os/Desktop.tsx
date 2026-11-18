import { applications } from "./config/applications";
import { AnimatePresence } from "framer-motion";
import Dock from "./components/Dock";
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

                    {applications.map(app => (

                        <DesktopIcon
                            key={app.id}
                            label={app.title}
                            icon={app.icon}
                            onClick={() =>
                                openWindow(app.id, app.title)
                            }
                        />

                    ))}

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

                <Dock
                    windows={windows}
                    onOpen={openWindow}
                />

        </main>
    );
}