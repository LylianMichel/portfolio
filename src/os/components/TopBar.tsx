import {
    useState,
    useEffect,
    useRef,
    type ReactNode
} from "react";

import {
    Command,
    Search,
    Settings
} from "lucide-react";

import {
    AnimatePresence,
    motion,
    useIsPresent,
    useReducedMotion
} from "framer-motion";

import { useClock } from "../hooks/useClock";
import { applications } from "../config/applications";

import type {
    AppId,
    OSWindow
} from "../types";

type MenuId =
    | "system"
    | "file"
    | "apps"
    | "search";

// AnimatePresence garde le panneau monté pendant sa fermeture.
// Le rendre inerte empêche tout clic ou focus durant ces 180 ms.
function MenuPanel({children, className, reducedMotion}: {
    children: ReactNode;
    className: string;
    reducedMotion: boolean | null;
}) {
    const isPresent = useIsPresent();
    return <motion.div className={className} inert={!isPresent}
        initial={reducedMotion ? false : {opacity:0,y:-6,scale:0.97}}
        animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:reducedMotion ? 0 : -6}}
        transition={{duration:reducedMotion ? 0 : 0.18}}>
        {children}
    </motion.div>;
}

interface TopBarProps {

    windows: OSWindow[];

    onOpen: (id: AppId, title: string) => void;
}

export default function TopBar({
                                   windows,
                                   onOpen
                               }: TopBarProps) {

    const date = useClock();

    const reducedMotion = useReducedMotion();

    const [menu, setMenu] =
        useState<MenuId | null>(null);

    const [search, setSearch] = useState("");

    const topBarRef = useRef<HTMLElement>(null);

    const searchRef = useRef<HTMLInputElement>(null);

    const triggerRef =
        useRef<HTMLButtonElement | null>(null);


    // Récupération de l'heure

    const time = date
        ? date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        })
        : "--:--";


    // Récupération de la date

    const formattedDate = date
        ? date.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short"
        })
        : "";


    // Récupération de la fenêtre au premier plan

    const activeWindow = windows
        .filter(window => !window.minimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0];


    // Ouvrir ou fermer un menu

    function toggleMenu(
        id: MenuId,
        trigger: HTMLButtonElement
    ) {

        triggerRef.current = trigger;

        setMenu(previous =>
            previous === id ? null : id
        );

        setSearch("");
    }


    // Ouvrir une application depuis un menu

    function openApplication(
        id: AppId,
        title: string
    ) {

        setMenu(null);
        setSearch("");

        onOpen(id, title);
    }


    // Fermer le menu en cliquant à l'extérieur

    useEffect(() => {

        if (menu === null) {
            return;
        }

        function handleOutsideClick(
            event: PointerEvent
        ) {

            if (
                event.target instanceof Node &&
                !topBarRef.current?.contains(event.target)
            ) {
                setMenu(null);
            }
        }

        function handleKeyDown(
            event: KeyboardEvent
        ) {

            if (event.key === "Escape") {

                setMenu(null);

                triggerRef.current?.focus();
            }
        }

        document.addEventListener(
            "pointerdown",
            handleOutsideClick
        );

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "pointerdown",
                handleOutsideClick
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [menu]);


    // Placer le curseur dans la recherche

    useEffect(() => {

        if (menu === "search") {
            searchRef.current?.focus();
        }

    }, [menu]);


    // Filtrer les applications selon le menu

    const visibleApplications = applications.filter(app => {

        if (menu === "system") {
            return ["about", "settings"].includes(app.id);
        }

        if (menu === "file") {
            return ["cv", "contact"].includes(app.id);
        }

        if (menu === "search") {

            return app.title
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                .includes(search.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
        }

        return true;
    });


    return (

        <header
            className="os-topbar"
            ref={topBarRef}
        >

            <div className="os-topbar-left">

                <button
                    type="button"
                    className="os-topbar-brand"

                    aria-expanded={menu === "system"}

                    onClick={event =>
                        toggleMenu(
                            "system",
                            event.currentTarget
                        )
                    }
                >
                    <Command size={18} />

                    <strong>LylianOS</strong>
                </button>


                <button
                    type="button"
                    className="os-menu-button os-file-menu"

                    aria-expanded={menu === "file"}

                    onClick={event =>
                        toggleMenu(
                            "file",
                            event.currentTarget
                        )
                    }
                >
                    Fichier
                </button>


                <button
                    type="button"
                    className="os-menu-button"

                    aria-expanded={menu === "apps"}

                    onClick={event =>
                        toggleMenu(
                            "apps",
                            event.currentTarget
                        )
                    }
                >
                    Applications
                </button>


                {activeWindow && (

                    <span className="os-active-app">
                        {activeWindow.title}
                    </span>

                )}

            </div>


            <div className="os-topbar-right">

                <button
                    type="button"
                    className="os-system-button"

                    aria-label="Rechercher une application"
                    aria-expanded={menu === "search"}

                    title="Rechercher"

                    onClick={event =>
                        toggleMenu(
                            "search",
                            event.currentTarget
                        )
                    }
                >
                    <Search size={17} />
                </button>


                <button
                    type="button"
                    className="os-system-button"

                    aria-label="Ouvrir les réglages"
                    title="Réglages"

                    onClick={() =>
                        openApplication(
                            "settings",
                            "Réglages"
                        )
                    }
                >
                    <Settings size={17} />
                </button>


                <time
                    className="os-clock"
                    dateTime={date?.toISOString()}
                >
                    <span className="os-clock-date">
                        {formattedDate}
                    </span>

                    <span>
                        {time}
                    </span>
                </time>

            </div>


            <AnimatePresence>

                {menu !== null && (

                    <MenuPanel
                        key={menu}
                        reducedMotion={reducedMotion}

                        className={
                            menu === "search"
                                ? "os-dropdown os-search-menu"
                                : `os-dropdown os-dropdown-${menu}`
                        }

                    >

                        {menu === "search" && (

                            <div className="os-search-input">

                                <Search size={18} />

                                <input
                                    ref={searchRef}

                                    type="search"

                                    aria-label="Rechercher une application"

                                    placeholder="Rechercher..."

                                    value={search}

                                    onChange={event =>
                                        setSearch(event.target.value)
                                    }
                                />

                            </div>

                        )}


                        {visibleApplications.map(app => {

                            const Icon = app.icon;

                            return (

                                <button
                                    key={app.id}
                                    type="button"

                                    className="os-dropdown-item"

                                    onClick={() =>
                                        openApplication(
                                            app.id,
                                            app.title
                                        )
                                    }
                                >

                                    <Icon
                                        size={19}
                                        color={app.color}
                                    />

                                    <span>{app.title}</span>

                                </button>
                            );
                        })}


                        {visibleApplications.length === 0 && (

                            <p className="os-search-empty">
                                Aucune application trouvée.
                            </p>

                        )}

                    </MenuPanel>

                )}

            </AnimatePresence>

        </header>
    );
}
