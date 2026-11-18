import { useEffect, useReducer } from "react";
import type { AppId } from "../types";
import { windowReducer } from "../windowState";

function getWorkspaceSize() {
    const workspace = document.querySelector(".os-workspace");
    return {width:workspace?.clientWidth ?? 1000,height:workspace?.clientHeight ?? 600};
}

export function useWindowManager() {
    const [windows, dispatch] = useReducer(windowReducer, []);

    useEffect(() => {
        const workspace = document.querySelector(".os-workspace");
        if (!workspace) return;
        const observer = new ResizeObserver(() => {
            dispatch({type:"workspace",workspace:getWorkspaceSize()});
        });
        observer.observe(workspace);
        return () => observer.disconnect();
    }, []);

    return {
        windows,
        openWindow: (id:AppId,title:string) => dispatch({type:"open",id,title,workspace:getWorkspaceSize()}),
        closeWindow: (id:AppId) => dispatch({type:"close",id}),
        focusWindow: (id:AppId) => dispatch({type:"focus",id}),
        moveWindow: (id:AppId,x:number,y:number) => dispatch({type:"move",id,x,y,workspace:getWorkspaceSize()}),
        minimizeWindow: (id:AppId) => dispatch({type:"minimize",id}),
        restoreWindow: (id:AppId) => dispatch({type:"restore",id}),
        maximizeWindow: (id:AppId) => dispatch({type:"maximize",id,workspace:getWorkspaceSize()}),
        resizeWindow: (id:AppId,width:number,height:number) => dispatch({type:"resize",id,width,height,workspace:getWorkspaceSize()})
    };
}
