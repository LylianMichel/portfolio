import type { AppId, OSWindow, WindowBounds } from "./types";

interface WorkspaceSize { width: number; height: number }

type WindowAction =
    | { type: "open"; id: AppId; title: string; workspace: WorkspaceSize }
    | { type: "close" | "focus" | "minimize" | "restore"; id: AppId }
    | { type: "move"; id: AppId; x: number; y: number; workspace: WorkspaceSize }
    | { type: "resize"; id: AppId; width: number; height: number; workspace: WorkspaceSize }
    | { type: "maximize"; id: AppId; workspace: WorkspaceSize }
    | { type: "workspace"; workspace: WorkspaceSize };

// Les fenêtres restent dans le bureau, même après un changement de résolution.
function fitBounds(bounds: WindowBounds, workspace: WorkspaceSize): WindowBounds {
    const width = Math.min(bounds.width, workspace.width);
    const height = Math.min(bounds.height, workspace.height);
    return {
        width, height,
        x: Math.max(0, Math.min(bounds.x, workspace.width - width)),
        y: Math.max(0, Math.min(bounds.y, workspace.height - height))
    };
}

// Des rangs de 1 à 7 évitent une croissance illimitée des z-index.
function bringToFront(windows: OSWindow[], id: AppId): OSWindow[] {
    const order = [...windows].sort((a, b) => a.zIndex - b.zIndex);
    const ids = order.filter(w => w.id !== id).map(w => w.id).concat(id);
    return windows.map(w => ({ ...w, zIndex: ids.indexOf(w.id) + 1 }));
}

export function windowReducer(windows: OSWindow[], action: WindowAction): OSWindow[] {
    if (action.type === "workspace") {
        return windows.map(w => ({
            ...w,
            ...(w.maximized ? { x: 0, y: 0, ...action.workspace } : fitBounds(w, action.workspace))
        }));
    }
    const existing = windows.find(w => w.id === action.id);
    if (action.type === "open") {
        if (existing) {
            return bringToFront(windows.map(w => w.id === action.id ? {...w, minimized:false} : w), action.id);
        }
        const offset = (windows.length % 5) * 30;
        const bounds = fitBounds({x:150 + offset,y:30 + offset,width:700,height:450}, action.workspace);
        return bringToFront([...windows, {
            ...bounds, id:action.id, title:action.title,
            minimized:false, maximized:false, zIndex:windows.length + 1
        }], action.id);
    }
    if (!existing) return windows;
    if (action.type === "close") return windows.filter(w => w.id !== action.id);
    if (action.type === "focus") return existing.minimized ? windows : bringToFront(windows, action.id);
    if (action.type === "restore") {
        return bringToFront(windows.map(w => w.id === action.id ? {...w,minimized:false} : w), action.id);
    }
    return windows.map(w => {
        if (w.id !== action.id) return w;
        switch (action.type) {
            case "minimize": return { ...w, minimized:true };
            case "move":
                return w.maximized ? w : {...w, ...fitBounds({...w,x:action.x,y:action.y},action.workspace)};
            case "resize":
                return w.maximized ? w : {
                    ...w,
                    width:Math.min(action.workspace.width - w.x, Math.max(300,action.width)),
                    height:Math.min(action.workspace.height - w.y, Math.max(200,action.height))
                };
            case "maximize":
                return w.maximized
                    ? {...w,...fitBounds(w.previousBounds ?? w,action.workspace),maximized:false,previousBounds:undefined}
                    : {...w,previousBounds:{x:w.x,y:w.y,width:w.width,height:w.height},x:0,y:0,...action.workspace,maximized:true};
            default: return w;
        }
    });
}
