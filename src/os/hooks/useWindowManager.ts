import { useState } from "react";
import type { OSWindow, AppId } from "../types";

export function useWindowManager() {

    const [windows, setWindows] =
        useState<OSWindow[]>([]);

    function getWorkspaceSize() {

        const workspace =
            document.querySelector(".os-workspace");

        return {
            width: workspace?.clientWidth ?? 1000,
            height: workspace?.clientHeight ?? 600
        };
    }

    function openWindow(id: AppId, title: string) {

        const workspace = getWorkspaceSize();

        setWindows(previous => {

            const maxZIndex = Math.max(
                0,
                ...previous.map(window => window.zIndex)
            );

            const existingWindow = previous.find(
                window => window.id === id
            );

            if (existingWindow) {

                return previous.map(window =>
                    window.id === id
                        ? {
                            ...window,
                            minimized: false,
                            zIndex: maxZIndex + 1
                        }
                        : window
                );
            }

            const offset = (previous.length % 5) * 30;

            const width = Math.min(700, workspace.width);
            const height = Math.min(450, workspace.height);

            const newWindow: OSWindow = {
                id,
                title,

                x: Math.min(
                    150 + offset,
                    Math.max(0, workspace.width - width)
                ),

                y: Math.min(
                    30 + offset,
                    Math.max(0, workspace.height - height)
                ),

                width,
                height,

                zIndex: maxZIndex + 1,

                minimized: false,
                maximized: false
            };

            return [...previous, newWindow];
        });
    }

    function closeWindow(id: AppId) {

        setWindows(previous =>
            previous.filter(window => window.id !== id)
        );
    }

    function focusWindow(id: AppId) {

        setWindows(previous => {

            const maxZIndex = Math.max(
                0,
                ...previous.map(window => window.zIndex)
            );

            return previous.map(window =>
                window.id === id
                    ? {
                        ...window,
                        zIndex: maxZIndex + 1
                    }
                    : window
            );
        });
    }

    function moveWindow(
        id: AppId,
        x: number,
        y: number
    ) {

        const workspace = getWorkspaceSize();

        setWindows(previous =>

            previous.map(window => {

                if (
                    window.id !== id ||
                    window.maximized
                ) {
                    return window;
                }

                const maxX = Math.max(
                    0,
                    workspace.width - window.width
                );

                const maxY = Math.max(
                    0,
                    workspace.height - window.height
                );

                return {
                    ...window,

                    x: Math.max(0, Math.min(x, maxX)),

                    y: Math.max(0, Math.min(y, maxY))
                };
            })
        );
    }

    function minimizeWindow(id: AppId) {

        setWindows(previous =>

            previous.map(window =>
                window.id === id
                    ? {
                        ...window,
                        minimized: true
                    }
                    : window
            )
        );
    }

    function restoreWindow(id: AppId) {

        setWindows(previous => {

            const maxZIndex = Math.max(
                0,
                ...previous.map(window => window.zIndex)
            );

            return previous.map(window =>
                window.id === id
                    ? {
                        ...window,
                        minimized: false,
                        zIndex: maxZIndex + 1
                    }
                    : window
            );
        });
    }

    function maximizeWindow(id: AppId) {

        const workspace = getWorkspaceSize();

        setWindows(previous =>

            previous.map(window => {

                if (window.id !== id) {
                    return window;
                }

                // Restaurer les anciennes dimensions
                if (window.maximized) {

                    return {
                        ...window,
                        ...window.previousBounds,

                        maximized: false,
                        previousBounds: undefined
                    };
                }

                // Maximiser la fenêtre
                return {
                    ...window,

                    previousBounds: {
                        x: window.x,
                        y: window.y,
                        width: window.width,
                        height: window.height
                    },

                    x: 0,
                    y: 0,

                    width: workspace.width,
                    height: workspace.height,

                    maximized: true
                };
            })
        );
    }

    function resizeWindow(
        id: AppId,
        width: number,
        height: number
    ) {

        const workspace = getWorkspaceSize();

        setWindows(previous =>

            previous.map(window => {

                if (
                    window.id !== id ||
                    window.maximized
                ) {
                    return window;
                }

                const maxWidth = Math.max(
                    0,
                    workspace.width - window.x
                );

                const maxHeight = Math.max(
                    0,
                    workspace.height - window.y
                );

                return {
                    ...window,

                    width: Math.min(
                        maxWidth,
                        Math.max(300, width)
                    ),

                    height: Math.min(
                        maxHeight,
                        Math.max(200, height)
                    )
                };
            })
        );
    }

    return {
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        moveWindow,
        minimizeWindow,
        restoreWindow,
        maximizeWindow,
        resizeWindow
    };
}