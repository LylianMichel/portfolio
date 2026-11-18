import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { profile, socials } from "./profile";
import { projects } from "./projects";

describe("données migrées du portfolio", () => {
    it("prépare les informations vérifiées pour le TP 8", () => {
        expect(profile).toMatchObject({
            name:"Lylian Michel", school:"IUT de Lens", education:"BUT Informatique, deuxième année",
            photo:`${import.meta.env.BASE_URL}portrait-lylian-michel.png`,
            internship:{startDate:"2027-04-12",durationWeeks:8}
        });
        expect(socials.map(link => link.href)).toContain("mailto:lylianmichel@gmail.com");
    });
    it("conserve les quatre projets et des images locales existantes", () => {
        expect(projects.map(p => p.id)).toEqual(["anivault","towerdefence","le-temple","eco-repare"]);
        for(const project of projects) {
            for(const image of project.images) {
                expect(existsSync(`public/${image.src.replace(import.meta.env.BASE_URL, "")}`)).toBe(true);
            }
        }
    });
    it("conserve le PNG du CV et le véritable PDF", () => {
        expect([...readFileSync("public/cv.png").subarray(0,8)]).toEqual([137,80,78,71,13,10,26,10]);
        expect(readFileSync("public/CV-LylianMichel.pdf").subarray(0,5).toString()).toBe("%PDF-");
    });
});
