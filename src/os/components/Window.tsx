import { useRef } from "react";

import type {
    ReactNode,
    PointerEvent
} from "react";

import type { OSWindow } from "../types";

import {
    X,
    Minus,
    Maximize2,
    Minimize2
} from "lucide-react";

import {
    motion,
    useReducedMotion
} from "framer-motion";

interface WindowProps {

    window: OSWindow;
    children: ReactNode;

    onClose: () => void;
    onFocus: () => void;
    onMinimize: () => void;
    onMaximize: () => void;

    onMove: (x: number, y: number) => void;

    onResize: (
        width: number,
        height: number
    ) => void;
}

export default function Window({
                                   window,
                                   children,
                                   onClose,
                                   onFocus,
                                   onMinimize,
                                   onMaximize,
                                   onMove,
                                   onResize
                               }: WindowProps) {

    const reducedMotion = useReducedMotion();

    const dragStart = useRef<{
        mouseX: number;
        mouseY: number;
        windowX: number;
        windowY: number;
    } | null>(null);

    const resizeStart = useRef<{
        mouseX: number;
        mouseY: number;
        width: number;
        height: number;
    } | null>(null);


    // Début du déplacement
    function handlePointerDown(
        event: PointerEvent<HTMLElement>
    ) {

        if (event.button !== 0) {
            return;
        }

        if (
            event.target instanceof Element &&
            event.target.closest("button")
        ) {
            return;
        }

        if (window.maximized) {
            return;
        }

        dragStart.current = {
            mouseX: event.clientX,
            mouseY: event.clientY,

            windowX: window.x,
            windowY: window.y
        };

        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    }


    // Déplacement de la fenêtre
    function handlePointerMove(
        event: PointerEvent<HTMLElement>
    ) {

        if (dragStart.current === null) {
            return;
        }

        const deltaX =
            event.clientX - dragStart.current.mouseX;

        const deltaY =
            event.clientY - dragStart.current.mouseY;

        onMove(
            dragStart.current.windowX + deltaX,
            dragStart.current.windowY + deltaY
        );
    }


    // Fin du déplacement
    function handlePointerUp() {

        dragStart.current = null;
    }


    // Début du redimensionnement
    function handleResizeStart(
        event: PointerEvent<HTMLDivElement>
    ) {

        if (
            event.button !== 0 ||
            window.maximized
        ) {
            return;
        }

        event.stopPropagation();

        onFocus();

        resizeStart.current = {

            mouseX: event.clientX,
            mouseY: event.clientY,

            width: window.width,
            height: window.height
        };

        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    }


    // Redimensionnement de la fenêtre
    function handleResizeMove(
        event: PointerEvent<HTMLDivElement>
    ) {

        if (resizeStart.current === null) {
            return;
        }

        const deltaX =
            event.clientX - resizeStart.current.mouseX;

        const deltaY =
            event.clientY - resizeStart.current.mouseY;

        onResize(

            resizeStart.current.width + deltaX,

            resizeStart.current.height + deltaY
        );
    }


    // Fin du redimensionnement
    function handleResizeEnd() {

        resizeStart.current = null;
    }


    return (

        <motion.section
            className={
                window.maximized
                    ? "os-window os-window-maximized"
                    : "os-window"
            }

            onPointerDown={onFocus}

            style={{
                left: window.x,
                top: window.y,
                width: window.width,
                height: window.height,
                zIndex: window.zIndex
            }}

            initial={
                reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.92,
                        y: 20
                    }
            }

            animate={{
                opacity: window.minimized ? 0 : 1,
                scale: window.minimized ? 0.85 : 1,
                y: window.minimized ? 30 : 0
            }}

            exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.94
            }}

            transition={{
                duration: reducedMotion ? 0 : 0.22
            }}

            inert={window.minimized}

        >

            <header
                className="os-window-header"

                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handlePointerUp}

                onDoubleClick={event => {
                    if (
                        event.target instanceof Element &&
                        !event.target.closest("button")
                    ) {
                        onMaximize();
                    }
                }}
            >

                <span>{window.title}</span>

                <div className="os-window-actions">

                    <button
                        onClick={onMinimize}
                        aria-label="Minimiser"
                        title="Minimiser"
                    >
                        <Minus size={18} />
                    </button>

                    <button
                        onClick={onMaximize}

                        aria-label={
                            window.maximized
                                ? "Restaurer"
                                : "Maximiser"
                        }

                        title={
                            window.maximized
                                ? "Restaurer"
                                : "Maximiser"
                        }
                    >

                        {window.maximized
                            ? <Minimize2 size={18} />
                            : <Maximize2 size={18} />
                        }

                    </button>

                    <button
                        onClick={onClose}
                        aria-label="Fermer"
                        title="Fermer"
                        className="os-close-button"
                    >
                        <X size={18} />
                    </button>

                </div>

            </header>

            <div className="os-window-content">

                {children}

            </div>

            {!window.maximized && (

                <div
                    className="os-window-resize"

                    onPointerDown={handleResizeStart}
                    onPointerMove={handleResizeMove}
                    onPointerUp={handleResizeEnd}
                    onPointerCancel={handleResizeEnd}
                    onLostPointerCapture={handleResizeEnd}
                />

            )}

        </motion.section>
    );
}