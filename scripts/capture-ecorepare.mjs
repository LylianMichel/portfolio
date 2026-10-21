import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const base=process.env.ECOREPARE_URL || "http://127.0.0.1:8000";
const out=join(process.cwd(),"public/projects");
const screens=[
 ["home","/"],
 ["catalogue","/catalogue"],
 ["services","/services"],
 ["contact","/contact"],
];
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:"reduce",colorScheme:"light"});
 for(const [name,path] of screens){
   const response=await page.goto(new URL(path,base).href,{waitUntil:"networkidle",timeout:45000});
   if(!response?.ok())throw Error(`${path} returned HTTP ${response?.status()}`);
   await page.locator("body").waitFor({state:"visible"});
   await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:join(out,`eco-repare-${name}.png`),animations:"disabled"});
   const png=join(out,`eco-repare-${name}.png`);
   await sharp(png).webp({quality:84,effort:5}).toFile(join(out,`eco-repare-${name}.webp`));
   await sharp(png).resize({width:640}).webp({quality:78,effort:5}).toFile(join(out,`eco-repare-${name}-640.webp`));
   console.log(`Capture Laravel: ${path} -> eco-repare-${name}.webp`);
 }
} finally {await browser.close();}
