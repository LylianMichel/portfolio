import { describe, expect, it, vi } from "vitest";
import { accents, appearances, initialAccent, initialAppearance } from "./preferences";
import { copyEmail } from "./copyEmail";
import { filterProjects } from "./filterProjects";

describe("personnalisation",()=>{
 it("retient le thème sauvegardé",()=>expect(initialAppearance({getItem:()=> "contrast"},false)).toBe("contrast"));
 it("respecte le système au premier affichage",()=>expect(initialAppearance({getItem:()=>null},true)).toBe("light"));
 it("retient un accent valide et rejette les valeurs inconnues",()=>{expect(initialAccent({getItem:()=> "blue"})).toBe("blue");expect(initialAccent({getItem:()=> "unknown"})).toBe("mint");});
 it("déclare toutes les combinaisons",()=>{expect(appearances).toHaveLength(3);expect(accents).toHaveLength(4);});
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
