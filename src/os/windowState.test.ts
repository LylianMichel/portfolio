import { describe, expect, it } from "vitest";
import { windowReducer } from "./windowState";
import type { OSWindow } from "./types";

const workspace = { width: 1280, height: 594 };
const open = (state: OSWindow[] = [], id: OSWindow["id"] = "about") =>
    windowReducer(state, { type: "open", id, title: id, workspace });

describe("règles du gestionnaire de fenêtres", () => {
    it("ouvre, décale et ferme sans modifier l'état précédent", () => {
        const first = open();
        const snapshot = structuredClone(first);
        const second = open(first, "cv");
        expect(first).toEqual(snapshot);
        expect(second).toHaveLength(2);
        expect(second[1]?.x).toBe(180);
        expect(second[1]?.y).toBe(60);
        expect(windowReducer(second, { type: "close", id: "about" }).map(w => w.id)).toEqual(["cv"]);
    });
    it("rouvre une application existante sans doublon et la place devant", () => {
        const state = open(open(), "cv");
        const focused = open(state);
        expect(focused).toHaveLength(2);
        expect(focused.find(w => w.id === "about")?.zIndex).toBe(2);
    });
    it("borne les z-index même après 1200 changements de focus", () => {
        let state = open(open(), "cv");
        for (let i = 0; i < 1200; i++) {
            state = windowReducer(state, {type:"focus", id: i % 2 ? "about" : "cv"});
        }
        expect(state.map(w => w.zIndex).sort()).toEqual([1, 2]);
    });
    it("conserve la fenêtre minimisée et refuse son focus", () => {
        const state = windowReducer(open(), { type:"minimize", id:"about" });
        expect(state[0]?.minimized).toBe(true);
        expect(windowReducer(state, {type:"focus", id:"about"})).toEqual(state);
        expect(windowReducer(state, {type:"restore", id:"about"})[0]?.minimized).toBe(false);
        expect(open(state)[0]?.minimized).toBe(false);
    });
    it("borne le déplacement et respecte les dimensions minimales", () => {
        let state = windowReducer(open(), {type:"move", id:"about", x:9999, y:-50, workspace});
        expect(state[0]?.x).toBe(580);
        expect(state[0]?.y).toBe(0);
        state = windowReducer(state, {type:"resize", id:"about", width:10, height:10, workspace});
        expect(state[0]?.width).toBe(300);
        expect(state[0]?.height).toBe(200);
        state = windowReducer(state, {type:"resize", id:"about", width:9999, height:9999, workspace});
        expect(state[0]?.width).toBe(700);
        expect(state[0]?.height).toBe(594);
    });
    it("maximise, interdit déplacement/redimensionnement, puis restitue les dimensions", () => {
        const original = open();
        const maximized = windowReducer(original, {type:"maximize", id:"about", workspace});
        expect(maximized[0]).toMatchObject({x:0,y:0,width:1280,height:594,maximized:true});
        expect(windowReducer(maximized, {type:"move", id:"about", x:40, y:50, workspace})).toEqual(maximized);
        expect(windowReducer(maximized, {type:"resize", id:"about", width:350,height:250,workspace})).toEqual(maximized);
        const restored = windowReducer(maximized, {type:"maximize", id:"about", workspace});
        expect(restored[0]).toMatchObject({x:150,y:30,width:700,height:450,maximized:false});
    });
    it("recalcule les fenêtres normales, minimisées et maximisées au changement de taille", () => {
        let state = open(open(), "cv");
        state = windowReducer(state, {type:"maximize", id:"cv", workspace});
        state = windowReducer(state, {type:"minimize", id:"about"});
        state = windowReducer(state, {type:"workspace", workspace:{width:390,height:718}});
        expect(state[0]).toMatchObject({x:0,width:390,minimized:true});
        expect(state[1]).toMatchObject({x:0,y:0,width:390,height:718,maximized:true});
        state = windowReducer(state, {type:"maximize",id:"cv",workspace:{width:390,height:718}});
        expect(state[1]).toMatchObject({x:0,width:390,height:450,maximized:false});
    });
    it("adapte les minima à un workspace plus petit", () => {
        const state = windowReducer([], {type:"open",id:"cv",title:"CV",workspace:{width:250,height:150}});
        expect(state[0]).toMatchObject({x:0,y:0,width:250,height:150});
    });
});
