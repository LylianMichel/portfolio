export type AppId =
    | "about"
    | "projects"
    | "skills"
    | "cv"
    | "contact"
    | "terminal"
    | "settings";

export interface WindowBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface OSWindow extends WindowBounds {
    id: AppId;
    title: string;

    zIndex: number;

    minimized: boolean;
    maximized: boolean;

    previousBounds?: WindowBounds;
}