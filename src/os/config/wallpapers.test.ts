import { describe, expect, it } from "vitest";
import { getWallpaper } from "./wallpapers";

describe("fond selon l'heure locale", () => {
    it.each([
        [0, "night"], [5 + 59 / 60, "night"], [6, "sunrise"],
        [9 + 59 / 60, "sunrise"], [10, "day"], [16 + 59 / 60, "day"],
        [17, "sunset"], [20 + 59 / 60, "sunset"], [21, "night"], [23, "night"]
    ])("%s h utilise %s", (hour, name) => {
        expect(getWallpaper(Number(hour))).toBe(`${import.meta.env.BASE_URL}wallpapers/alpine-${name}.webp`);
    });
});
