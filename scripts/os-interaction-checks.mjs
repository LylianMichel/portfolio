export default async (page, root = "http://127.0.0.1:4173/") => {
  const desktopContext=await page.context().browser().newContext({viewport:{width:1280,height:720},reducedMotion:'no-preference'});
  page=await desktopContext.newPage();
  const results=[];
  const assert=(ok,msg)=>{if(!ok)throw Error(msg);};
  const test=async(name,fn)=>{try{results.push({name,status:'ok',detail:await fn()});}catch(e){results.push({name,status:'failed',detail:String(e)});}};
  await page.goto(root,{waitUntil:'networkidle'});
  await page.setViewportSize({width:1280,height:720});
  await test('dock: grossissement progressif et emplacements stables',async()=>{
    const slots=await page.locator('.os-dock-slot').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().x));
    const center=await page.locator('.os-dock-slot').nth(3).boundingBox();
    await page.mouse.move(0,100);
    await page.mouse.move(center.x+center.width/2,center.y+center.height/2);
    await page.waitForTimeout(750);
    const scales=await page.locator('.os-dock-icon').evaluateAll(els=>els.map(el=>new DOMMatrix(getComputedStyle(el).transform).a));
    assert(scales[3]>scales[2]&&scales[2]>scales[1]&&scales[1]>scales[0],JSON.stringify(scales));
    const after=await page.locator('.os-dock-slot').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().x));
    assert(JSON.stringify(slots)===JSON.stringify(after),'dock tremble');
    await page.mouse.move(1200,300);await page.waitForTimeout(600);
    assert(await page.locator('.os-dock-icon').evaluateAll(els=>els.every(el=>Math.abs(new DOMMatrix(getComputedStyle(el).transform).a-1)<0.01)),'retour normal');
    return scales;
  });
  await test('lancements rapides et rebonds indépendants',async()=>{
    for(const index of [0,1,2]) {
      const slot=await page.locator('.os-dock-slot').nth(index).boundingBox();
      await page.mouse.click(slot.x+slot.width/2,slot.y+slot.height/2);
    }
    await page.mouse.move(1200,300);await page.waitForTimeout(1100);
    assert(await page.locator('.os-window').count()===3,'lancements');
    assert(await page.locator('.os-dock-icon').evaluateAll(els=>els.every(el=>Math.abs(new DOMMatrix(getComputedStyle(el).transform).f)<0.1)),'rebond bloqué');
  });
  await test('tactile: ouverture, minimisation et restauration à 390x844',async()=>{
    const context=await page.context().browser().newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
    const p=await context.newPage();
    try{
      await p.goto(root,{waitUntil:'networkidle'});
      await p.locator('.os-icons').getByRole('button',{name:'Profil',exact:true}).tap();
      await p.waitForTimeout(350);
      assert(await p.locator('.os-window:not([inert])').count()===1,'ouverture tactile');
      await p.getByRole('button',{name:'Minimiser',exact:true}).tap();await p.waitForTimeout(350);
      assert(await p.locator('.os-window[inert]').count()===1,'minimisation tactile');
      await p.locator('[data-dock-app="about"]').tap();await p.waitForTimeout(350);
      assert(await p.locator('.os-window:not([inert])').count()===1,'restauration tactile');
      await p.screenshot({path:'output/playwright/touch.png'});
    }finally{await context.close();}
  });
  await desktopContext.close();
  return results;
}
