import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const root = process.env.AUDIT_URL ?? "http://127.0.0.1:4173/";
const output = "artifacts/visual";
await mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true,args:process.env.CI?["--no-sandbox"]:[]});
const all = [];
let failures = 0;
async function record(page, label, name, target) {
  try {
    await page.evaluate(()=>{const element=document.activeElement;if(element instanceof HTMLElement)element.blur();});
    await target.screenshot({path:`${output}/${label}-${name}.png`,animations:"disabled",timeout:20000});
  } catch (error) {all.push({view:label,task:`capture ${name}`,error:String(error)});failures++;}
}
async function task(label, name, fn) {
  try {const result = await fn();all.push({view:label,task:name,status:"ok",result:result??null});}
  catch(error){all.push({view:label,task:name,status:"failed",error:String(error)});failures++;}
}
for (const width of [390,768,1024,1440]) {
  const label=String(width);
  const context=await browser.newContext({viewport:{width,height:width===390?844:900},deviceScaleFactor:1,reducedMotion:"reduce",colorScheme:"dark"});
  const page=await context.newPage();
  page.setDefaultTimeout(12000);
  await task(label,"home",async()=>{await page.goto(root,{waitUntil:"networkidle"}); await page.locator("#intro-title").waitFor();});
  await task(label,"hero capture",async()=>await record(page,label,"hero",page.locator(".lm-hero")));
  await task(label,"hiérarchie de la carte jeu",async()=>{
    const card=page.locator(".lm-hero-secondary");
    const positions=await card.evaluate(el=>{
      const label=el.querySelector(".lm-kicker")?.getBoundingClientRect();
      const title=el.querySelector("strong")?.getBoundingClientRect();
      return {labelBottom:label?.bottom,titleTop:title?.top};
    });
    if(positions.labelBottom===undefined||positions.titleTop===undefined||positions.titleTop<positions.labelBottom-1)throw new Error("Titre de jeu chevauche son libellé");
  });
  await task(label,"reduced motion statique",async()=>{
    const animated=await page.evaluate(()=>{
      const name=document.querySelector(".lm-name-first");
      const glow=document.querySelector(".lm-hero");
      if(!name||!glow)return "missing nodes";
      return {name:getComputedStyle(name).animationName,glow:getComputedStyle(glow,"::before").animationName,tracks:Array.from(document.querySelectorAll(".lm-marquee-track")).map(el=>getComputedStyle(el).animationName)};
    });
    if(typeof animated==="string"||animated.name!=="none"||animated.glow!=="none"||animated.tracks.some(x=>x!=="none"))throw new Error(JSON.stringify(animated));
  });
  await task(label,"horizontal overflow",async()=>{
    const dimensions=await page.evaluate(()=>({page:document.documentElement.scrollWidth,screen:window.innerWidth}));
    if(dimensions.page>dimensions.screen+1)throw new Error(JSON.stringify(dimensions));
    return dimensions;
  });
  if(width===390||width===1440){
    await task(label,"SOURCE PLAY × 4 thèmes × 4 accents axe AA",async()=>{
      await page.getByRole("button",{name:"Personnaliser l'apparence"}).click();
      const themes=[["dark","Sombre"],["light","Clair"],["contrast","Contraste +"],["matrix","Matrix"]];
      const chroma=[["mint","Menthe"],["blue","Azur"],["violet","Lavande"],["orange","Cuivre"]];
      for(const experience of ["source","play"]){
        const current=await page.evaluate(()=>document.documentElement.dataset.experience);
        if(current!==experience){
          await page.getByRole("button",{name:/SOURCE.*PLAY/}).first().click();
          await page.waitForTimeout(700);
        }
        for(const [theme,labelTheme] of themes){
          await page.getByRole("button",{name:labelTheme,exact:true}).click();
          for(const [accent,labelAccent] of chroma){
            await page.getByRole("button",{name:labelAccent,exact:true}).click();
            const data=await page.evaluate(()=>({theme:document.documentElement.dataset.theme,accent:document.documentElement.dataset.accent,experience:document.documentElement.dataset.experience}));
            if(data.theme!==theme||data.accent!==accent||data.experience!==experience)throw Error(JSON.stringify(data));
            const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
            if(results.violations.length)throw Error(`axe ${experience}/${theme}/${accent}: ${results.violations.map(v=>v.id).join(",")}`);
            if((theme==="dark"||theme==="light")&&accent==="mint"){
              await record(page,label,`${experience}-${theme}-hero`,page.locator(".lm-hero"));
              await record(page,label,`${experience}-${theme}-project`,page.locator("#anivault"));
              await record(page,label,`${experience}-${theme}-skills`,page.locator("#competences"));
            }
          }
        }
      }
      await page.getByRole("button",{name:"Sombre",exact:true}).click();
      await page.getByRole("button",{name:"Menthe",exact:true}).click();
      await page.getByRole("button",{name:/SOURCE.*PLAY/}).first().click();
      await page.getByRole("button",{name:"Personnaliser l'apparence"}).click();
    });
    await task(label,"Matrix × accents captures réelles",async()=>{
      const themes=["mint","blue","violet","orange"];
      for(const accent of themes){
        const contextM=await browser.newContext({viewport:{width,height:width===390?844:900},colorScheme:"dark",reducedMotion:"reduce"});
        await contextM.addInitScript((a)=>{localStorage.setItem("portfolio-theme","matrix");localStorage.setItem("portfolio-accent",a);localStorage.setItem("portfolio-matrix-rain","soft")},accent);
        const matrixPage=await contextM.newPage();
        matrixPage.setDefaultTimeout(12000);
        try{
          await matrixPage.goto(root,{waitUntil:"networkidle"});
          await matrixPage.locator("html[data-theme='matrix']").waitFor();
          await matrixPage.locator(".lm-matrix-rain").waitFor();
          await matrixPage.waitForTimeout(550);
          await record(matrixPage,label,`matrix-${accent}-hero`,matrixPage.locator(".lm-hero"));
          await record(matrixPage,label,`matrix-${accent}-project`,matrixPage.locator("#anivault"));
          await matrixPage.getByRole("button",{name:/Chat/}).click();
          await matrixPage.locator(".lm-chat-page").waitFor();
          await record(matrixPage,label,`matrix-${accent}-contact`,matrixPage.locator(".lm-chat-page"));
          await matrixPage.getByRole("button",{name:"Personnaliser l'apparence"}).click();
          await matrixPage.getByRole("button",{name:"Sombre",exact:true}).click();
          if(await matrixPage.locator(".lm-matrix-rain").count()!==0)throw Error("Canvas Matrix encore monté après changement de thème");
        }finally{await contextM.close()}
      }
    });
  }
  await task(label,"navigation contrast themes",async()=>{
    await page.getByRole("button",{name:"Personnaliser l'apparence"}).click();
    await page.getByRole("button",{name:"Clair",exact:true}).click();
    const light=await page.evaluate(()=>document.documentElement.dataset.theme);
    await page.getByRole("button",{name:"Contraste +"}).click();
    const contrast=await page.evaluate(()=>document.documentElement.dataset.theme);
    await page.getByRole("button",{name:"Menthe",exact:true}).click();
    await page.getByRole("button",{name:"Azur",exact:true}).click();
    const accent=await page.evaluate(()=>document.documentElement.dataset.accent);
    if(light!=="light"||contrast!=="contrast"||accent!=="blue")throw new Error(`Theme ${light}/${contrast}, accent ${accent}`);
    await page.getByRole("button",{name:"Sombre",exact:true}).click();
    await page.getByRole("button",{name:"Personnaliser l'apparence"}).click();
  });
  if(width===390||width===1440){
    await task(label,"12 combinaisons thème/accent",async()=>{
      await page.getByRole("button",{name:"Personnaliser l'apparence"}).click();
      const theming=[["dark","Sombre"],["light","Clair"],["contrast","Contraste +"]];
      const chroma=[["mint","Menthe"],["blue","Azur"],["violet","Lavande"],["orange","Cuivre"]];
      for(const [theme,themeLabel] of theming){
        await page.getByRole("button",{name:themeLabel,exact:true}).click();
        for(const [accent,accentLabel] of chroma){
          await page.getByRole("button",{name:accentLabel,exact:true}).click();
          const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
          if(result.violations.length)throw new Error(`WCAG ${theme}/${accent}: ${result.violations.map(v=>v.id).join(",")}`);
          const info=await page.evaluate(()=>({theme:document.documentElement.dataset.theme,accent:document.documentElement.dataset.accent,scroll:document.documentElement.scrollWidth,width:innerWidth}));
          if(info.theme!==theme||info.accent!==accent||info.scroll>info.width+1)throw new Error(JSON.stringify(info));
          if(theme==="light"&&accent==="mint"){
            await record(page,label,"light-hero",page.locator(".lm-hero"));
            await record(page,label,"light-project",page.locator("#anivault"));
            await record(page,label,"light-skills",page.locator("#competences"));
          }
        }
      }
      await page.getByRole("button",{name:"Menthe",exact:true}).click();
      await page.getByRole("button",{name:"Sombre",exact:true}).click();
      await page.getByRole("button",{name:"Personnaliser l'apparence"}).click();
    });
  }
  if(width===390){
    await task(label,"Konami réel active le mode pixel",async()=>{
      const actual=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
      await page.evaluate(()=>{const current=document.activeElement;if(current instanceof HTMLElement)current.blur()});
      for(const key of actual)await page.keyboard.press(key);
      await page.locator("html[data-pixel='true']").waitFor();
      const contrast=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
      if(contrast.violations.length)throw new Error("Pixel mode accessibility: "+contrast.violations.map(v=>v.id).join(","));
      await page.waitForTimeout(10100);
      const pixel=await page.evaluate(()=>document.documentElement.dataset.pixel??"");
      if(pixel)throw new Error("Pixel mode did not expire after 10 seconds");
    });
  }
  await task(label,"axe WCAG A/AA home",async()=>{
    const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
    const violations=results.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,help:v.help}));
    await writeFile(`${output}/${label}-axe-home.json`,JSON.stringify({violations},null,2));
    if(violations.some(v=>v.impact==="critical"||v.impact==="serious"))throw new Error(JSON.stringify(violations));
    return {violations};
  });
  await task(label,"filters",async()=>{
    await page.getByRole("button",{name:"Jeu vidéo",exact:true}).click();
    await page.locator("#anivault").waitFor({state:"hidden"});
    if(await page.locator("#towerdefence:visible").count()!==1)throw new Error("Game filter mismatch");
    await page.getByRole("button",{name:"Web",exact:true}).click();
    await page.locator("#towerdefence").waitFor({state:"hidden"});
    if(await page.locator("#anivault:visible").count()!==1)throw new Error("Web filter mismatch");
    await page.getByRole("button",{name:"Tous",exact:true}).click();
    await page.locator("#anivault").waitFor({state:"visible"});
    await page.waitForTimeout(500);
  });
  await task(label,"project capture",async()=>await record(page,label,"project",page.locator("#anivault")));
  await task(label,"skills capture",async()=>await record(page,label,"skills",page.locator("#competences")));
  if(width===1440){
    await task(label,"infobulles compétences sans déplacement",async()=>{
      const entries=page.locator(".lm-skill-entry");
      const before=await entries.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height]}));
      await page.locator(".lm-skill-link").first().hover();
      await page.waitForTimeout(230);
      const after=await entries.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height]}));
      if(before.some((b,i)=>b.some((value,j)=>Math.abs(value-after[i][j])>1)))throw new Error("Technologies shifted on hover");
    });
  }
  await task(label,"no invented skills links",async()=>{
    const cssLink=await page.locator(".lm-skill-entry").filter({hasText:"Tailwind CSS"}).locator("a").count();
    const prisma=page.getByRole("link",{name:/Prisma.*AniVault/i});
    if(cssLink!==0||await prisma.count()!==1)throw new Error("Skill links are not grounded in project data");
  });
  await task(label,"gallery Escape closes lightbox",async()=>{
    await page.locator("#towerdefence .gallery-expand").click();
    const dialog=page.locator("dialog[open]");
    await dialog.waitFor();
    await page.keyboard.press("Escape");
    await dialog.waitFor({state:"hidden"});
  });
  await task(label,"contact view",async()=>{
    await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
    await page.waitForTimeout(420);
    await page.getByRole("button",{name:/Chat/}).click();
    await page.locator(".lm-chat-page").waitFor();
    await record(page,label,"contact",page.locator(".lm-chat-page"));
    if(width===390||width===1440){
      await page.getByRole("button",{name:"Personnaliser l\'apparence"}).click();
      await page.getByRole("button",{name:"Clair",exact:true}).click();
      await record(page,label,"light-contact",page.locator(".lm-chat-page"));
      await page.getByRole("button",{name:"Sombre",exact:true}).click();
      await page.getByRole("button",{name:"Personnaliser l\'apparence"}).click();
    }
  });
  await task(label,"axe WCAG A/AA contact",async()=>{
    const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
    const violations=results.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,help:v.help}));
    await writeFile(`${output}/${label}-axe-contact.json`,JSON.stringify({violations},null,2));
    if(violations.some(v=>v.impact==="critical"||v.impact==="serious"))throw new Error(JSON.stringify(violations));
    return {violations};
  });
  await task(label,"404 view",async()=>{
    await page.goto(new URL("/cette-page-nexiste-pas",root).href,{waitUntil:"networkidle"});
    await page.getByRole("heading",{name:/404/}).waitFor();
  });
  await context.close();
  const before=await browser.newPage({viewport:{width,height:width===390?844:900},deviceScaleFactor:1});
  before.setDefaultTimeout(10000);
  try {
    await before.goto("https://portfolio-lylian-michel.vercel.app/",{waitUntil:"domcontentloaded",timeout:20000});
    await record(before,label,"before-hero",before.locator(".editorial-hero"));
    await record(before,label,"before-project",before.locator("#anivault"));
    await record(before,label,"before-skills",before.locator("#competences"));
    await before.goto("https://portfolio-lylian-michel.vercel.app/#contact",{waitUntil:"domcontentloaded",timeout:20000});
    await record(before,label,"before-contact",before.locator(".contact-page"));
  } catch(error){all.push({view:label,task:"before comparisons",status:"unavailable",reason:String(error)});}
  await before.close();
  if(width===390||width===1440){
    const beforeLight=await browser.newPage({viewport:{width,height:width===390?844:900},deviceScaleFactor:1,colorScheme:"light"});
    beforeLight.setDefaultTimeout(12000);
    await beforeLight.addInitScript(()=>{try{window.localStorage.setItem("portfolio-theme","light")}catch{/* no storage */}});
    try{
      await beforeLight.goto("https://portfolio-lylian-michel.vercel.app/",{waitUntil:"domcontentloaded",timeout:20000});
      await beforeLight.waitForTimeout(350);
      const theme=await beforeLight.evaluate(()=>document.documentElement.dataset.theme);
      if(theme!=="light")throw new Error("Production light theme not verified: "+theme);
      await record(beforeLight,label,"before-light-hero",beforeLight.locator(".editorial-hero"));
      await record(beforeLight,label,"before-light-project",beforeLight.locator("#anivault"));
      await record(beforeLight,label,"before-light-skills",beforeLight.locator("#competences"));
      await beforeLight.goto("https://portfolio-lylian-michel.vercel.app/#contact",{waitUntil:"domcontentloaded",timeout:20000});
      await record(beforeLight,label,"before-light-contact",beforeLight.locator(".contact-page"));
    }catch(error){all.push({view:label,task:"before light comparisons",status:"unavailable",reason:String(error)})}
    await beforeLight.close();
  }
}
await browser.close();
await writeFile(`${output}/audit.json`,JSON.stringify({root,failures,checks:all},null,2));
for(const item of all){if(item.status==="failed")console.error("[FAIL]",item.view,item.task,item.error);else console.log("[OK]",item.view,item.task,item.status??"");}
console.log(`VISUAL_AUDIT_FAILED_CHECKS=${failures}`);
if(failures) process.exitCode=1;
