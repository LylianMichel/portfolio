import {
    UserRound,
    Folder,
    Layers,
    FileText,
    Mail,
    Terminal,
    Settings
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { AppId } from "../types";

interface Application {
    id: AppId;
    title: string;
    icon: LucideIcon;
    color: string;
}

export const applications: Application[] = [
    {
        id: "about",
        title: "Profil",
        icon: UserRound,
        color: "#9180c0"
    },
    {
        id: "projects",
        title: "Projets",
        icon: Folder,
        color: "#d5a45c"
    },
    {
        id: "skills",
        title: "Compétences",
        icon: Layers,
        color: "#8477c9"
    },
    {
        id: "cv",
        title: "CV",
        icon: FileText,
        color: "#658ec5"
    },
    {
        id: "contact",
        title: "Contact",
        icon: Mail,
        color: "#ce8ca7"
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: Terminal,
        color: "#34334a"
    },
    {
        id: "settings",
        title: "Réglages",
        icon: Settings,
        color: "#788797"
    }
];