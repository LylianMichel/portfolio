import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Vite fingerprints bundled local fonts. Resolve names from the actual output:
// no hardcoded hashes, no Google Fonts, and no duplicate font downloads.
const dist = new URL("../dist/", import.meta.url);
const assets = new URL("assets/", dist);
const names = await readdir(assets);
const priorities = ["space-grotesk-latin-wght-normal-", "inter-latin-wght-normal-"];
const files = priorities.map(prefix=>names.find(name=>name.startsWith(prefix)&&name.endsWith(".woff2"))).filter(Boolean);
if(files.length!==priorities.length) {
 console.warn("Fonts: expected latin subsets not all found; skipping preloads.");
 process.exit(0);
}
const htmlPath=new URL("index.html",dist);
let html=await readFile(htmlPath,"utf8");
const css=html.match(/href="([^"]*assets\/[^"]+\.css)"/);
const base=css?.[1]?.split("assets/")[0]??"/";
const tags=files.map(name=>`<link rel="preload" href="${base}assets/${name}" as="font" type="font/woff2" crossorigin>`).join("\n");
if(!html.includes("</head>")) throw new Error("Missing </head> in Vite output");
html=html.replace("</head>",tags+"\n</head>");
await writeFile(htmlPath,html);
console.log("Locally hosted font preloads:",files.join(", "));
