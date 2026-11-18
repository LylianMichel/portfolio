import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import checkWindows from "./os-browser-checks.mjs";
import checkTime from "./os-time-checks.mjs";
import checkInteractions from "./os-interaction-checks.mjs";

// Ces outils sont installés temporairement par le workflow, pas dans le site.
const root = process.env.AUDIT_URL ?? "http://127.0.0.1:4173/";
await mkdir("output/playwright", {recursive:true});
const browser = await chromium.launch({headless:true,args:process.env.CI ? ["--no-sandbox"] : []});
const checks = [];
try {
    const page = await browser.newPage({timezoneId:"Europe/Paris"});
    for (const check of [checkWindows, checkInteractions, checkTime]) {
        checks.push(...await check(page, root));
    }
    await page.goto(root, {waitUntil:"networkidle"});
    const accessibility = await new AxeBuilder({page}).analyze();
    checks.push({name:"axe: bureau",status:accessibility.violations.length ? "failed" : "ok",detail:accessibility.violations});
} finally {
    await browser.close();
}
await writeFile("output/playwright/audit.json", JSON.stringify({root,checks},null,2));
for (const check of checks) console.log(check.status.toUpperCase(), check.name, JSON.stringify(check.detail ?? null));
if (checks.some(check => check.status === "failed")) process.exitCode = 1;
