import { describe, expect, it, vi } from "vitest";
import { accents, appearances, initialAccent, initialAppearance } from "./preferences";
import { copyEmail } from "./copyEmail";
import { filterProjects } from "./filterProjects";

describe("personnalisation",()=>{
 it("retient le thème sauvegardé",()=>expect(initialAppearance({getItem:()=> "contrast"},false)).toBe("contrast"));
 it("respecte le système au premier affichage",()=>expect(initialAppearance({getItem:()=>null},true)).toBe("light"));
 it("retient un accent valide et rejette les valeurs inconnues",()=>{expect(initialAccent({getItem:()=> "blue"})).toBe("blue");expect(initialAccent({getItem:()=> "unknown"})).toBe("mint");});
 it("déclare toutes les combinaisons",()=>{expect(appearances).toHaveLength(4);expect(accents).toHaveLength(4);});
});
describe("copie d'email",()=>{
 it("copie une adresse avec succès",async()=>{const writeText=vi.fn().mockResolvedValue(undefined);expect(await copyEmail("bonjour@example.fr",{writeText})).toBe(true);expect(writeText).toHaveBeenCalledWith("bonjour@example.fr");});
 it("échoue sans API et reste sûre en cas d'erreur",async()=>{expect(await copyEmail("x",undefined)).toBe(false);expect(await copyEmail("x",{writeText:()=>Promise.reject(new Error("Denied"))})).toBe(false);});
});
describe("filtres projets",()=>{
 const items=[{id:"anivault"},{id:"towerdefence"},{id:"le-temple"},{id:"eco-repare"}];
 it("conserve tous les projets avec Tous",()=>expect(filterProjects(items,"all")).toHaveLength(4));
 it("filtre Web sans cacher de projet web",()=>expect(filterProjects(items,"web").map(p=>p.id)).toEqual(["anivault","le-temple","eco-repare"]));
 it("isole le jeu vidéo",()=>expect(filterProjects(items,"game").map(p=>p.id)).toEqual(["towerdefence"]));
});

import { appendShortcut, shortcutAction } from "./keyboard";
describe("raccourcis clavier",()=>{
 it("GP ouvre les projets",()=>expect(shortcutAction(appendShortcut("g","p"))).toBe("projects"));
 it("GC ouvre le contact",()=>expect(shortcutAction(appendShortcut("g","c"))).toBe("contact"));
 it("déclenche le mode pixel avec les 10 véritables touches ↑↑↓↓←→←→BA",()=>{
  const keys = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const input = keys.reduce((acc, key)=>appendShortcut(acc,key),"");
  expect(shortcutAction(input)).toBe("pixel");
});
it("ne déclenche pas le pixel si la seconde touche gauche est oubliée",()=>{
  const wrong = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowRight","b","a"];
  expect(shortcutAction(wrong.reduce((acc,key)=>appendShortcut(acc,key),""))).toBeNull();
});
 it("séquences non définies ignorées",()=>expect(shortcutAction("abc")).toBeNull());
 it("les touches non pertinentes n'altèrent pas la séquence",()=>expect(appendShortcut("g","Enter")).toBe("g"));
});
describe("robustesse des préférences et du presse-papiers",()=>{
 it("thème système désactivé = sombre",()=>expect(initialAppearance({getItem:()=>null},false)).toBe("dark"));
 it("accent orange est restauré",()=>expect(initialAccent({getItem:()=> "orange"})).toBe("orange"));
 it("absence d'accès à Storage",()=>expect(initialAccent({getItem:()=>{throw new Error("Denied")}})).toBe("mint"));
 it("copie avec promesse rejetée",async()=>expect(await copyEmail("x@x.fr",{writeText:async()=>{throw new Error("Denied")}})).toBe(false));
});

import {initialExperience,experienceAnnouncement} from "./creative";
describe("SOURCE / PLAY",()=>{
 it("démarre en SOURCE sans préférence",()=>expect(initialExperience({getItem:()=>null})).toBe("source"));
 it("restaure PLAY",()=>expect(initialExperience({getItem:()=> "play"})).toBe("play"));
 it("ignore un choix invalide",()=>expect(initialExperience({getItem:()=> "bogus"})).toBe("source"));
 it("protège du stockage bloqué",()=>expect(initialExperience({getItem:()=>{throw Error("Denied")}})).toBe("source"));
 it("annonce les deux modes",()=>{expect(experienceAnnouncement("play")).toMatch(/PLAY activé/);expect(experienceAnnouncement("source")).toMatch(/SOURCE activé/)});
});

import {initialRain} from "./preferences";
describe("thème Matrix et persistance",()=>{
 it("restaure Matrix depuis Storage",()=>expect(initialAppearance({getItem:()=> "matrix"},false)).toBe("matrix"));
 it("désactive la pluie par défaut avec économie de données",()=>expect(initialRain({getItem:()=>null},true)).toBe("off"));
 it("conserve explicitement l'intensité choisie",()=>expect(initialRain({getItem:()=> "intense"},true)).toBe("intense"));
 it("choisit douce hors économie",()=>expect(initialRain({getItem:()=>null},false)).toBe("soft"));
 it("protège contre le stockage bloqué",()=>expect(initialRain({getItem:()=>{throw Error("Denied")}},false)).toBe("soft"));
});

import {rainShouldRun,rainQuality} from "./rainPolicy";
describe("cycle de vie du Canvas Matrix",()=>{
 it("suspend la boucle quand l'onglet est masqué",()=>expect(rainShouldRun(true,false,false)).toBe(false));
 it("réduit l'animation à une image statique en mouvement réduit",()=>expect(rainShouldRun(false,true,false)).toBe(false));
 it("ne relance pas un moteur auto-figé",()=>expect(rainShouldRun(false,false,true)).toBe(false));
 it("autorise l'animation dans un onglet visible",()=>expect(rainShouldRun(false,false,false)).toBe(true));
 it("divise les colonnes sur surcharge",()=>expect(rainQuality(14,30)).toBe("halve"));
 it("fige le Canvas si les colonnes sont déjà réduites",()=>expect(rainQuality(14,6)).toBe("freeze"));
 it("conserve la qualité sous le budget",()=>expect(rainQuality(9,20)).toBe("keep"));
});
