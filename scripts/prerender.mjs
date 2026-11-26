import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { describeRoute, render, routes } from "../.prerender/prerender.js";

const dist = new URL("../dist/", import.meta.url);
const canonical = "https://portfolio-lylian-michel.vercel.app";
const template = await readFile(new URL("index.html", dist), "utf8");
const font = (await readdir(new URL("assets/", dist))).find(name => name.startsWith("space-grotesk-latin-wght-normal-"));
const escapeHtml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");

for (const route of routes) {
  const data = describeRoute(route);
  const title = escapeHtml(data.title + " — Lylian Michel");
  const description = escapeHtml(data.description);
  const url = canonical + route;
  const html = template
    .replace("<div id=\"root\"></div>", () => `<div id="root" data-route="${data.key}">${render(route)}</div>`)
    .replace("</head>", () => font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin>\n</head>` : "</head>")
    .replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`)
    .replaceAll("__PAGE_TITLE__", title)
    .replaceAll("__DESCRIPTION__", description)
    .replaceAll("__CANONICAL__", url)
    .replace("__ROBOTS__", route === "/404.html" ? "noindex" : "index, follow");
  const file = route === "/404.html" ? "404.html" : route.slice(1) + "index.html";
  const output = new URL(file, dist);
  await mkdir(new URL(".", output), { recursive: true });
  await writeFile(output, html);
}
await writeFile(new URL("sitemap.xml", dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(route => route !== "/404.html").map(route => `<url><loc>${canonical + route}</loc></url>`).join("")}</urlset>\n`);
console.log(`${routes.length} pages prérendues.`);
