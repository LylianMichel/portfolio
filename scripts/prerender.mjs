import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.prerender/prerender.js";

const path = new URL("../dist/index.html", import.meta.url);
const html = await readFile(path, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("Conteneur React introuvable pour le prérendu.");
await writeFile(path, html.replace(marker, () => `<div id="root">${render()}</div>`));
console.log("HTML du portfolio prérendu : sections et projets disponibles sans JavaScript.");
