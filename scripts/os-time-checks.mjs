export default async (page, root = "http://127.0.0.1:4173/") => {
  const context=await page.context().browser().newContext({viewport:{width:1280,height:720},timezoneId:'Europe/Paris'});
  const p=await context.newPage();
  p.setDefaultTimeout(6000);
  const results=[],errors=[];
  const assert=(ok,message)=>{if(!ok)throw Error(message);};
  p.on('pageerror',e=>errors.push(e.message));
  p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  const test=async(name,fn)=>{try{results.push({name,status:'ok',detail:await fn()});}catch(e){results.push({name,status:'failed',detail:String(e)});}};
  await p.goto(root,{waitUntil:'networkidle'});
  await test('production: prérendu et hydratation',async()=>{
    assert(await p.locator('.os-icons button').count()===7,'bureau');
    assert(errors.length===0,JSON.stringify(errors));
    return {errors};
  });
  await test('quatre WebP et portrait: téléchargement et décodage',async()=>{
    return await p.evaluate(async()=>{
      const assets=['wallpapers/alpine-sunrise.webp','wallpapers/alpine-day.webp','wallpapers/alpine-sunset.webp','wallpapers/alpine-night.webp','portrait-lylian-michel.png'];
      const result=[];
      for(const file of assets){
        const response=await fetch('./'+file);
        if(!response.ok)throw Error(file+': '+response.status);
        const buffer=await response.arrayBuffer();
        const bytes=new Uint8Array(buffer);
        const format=String.fromCharCode(...bytes.slice(8,12))==='WEBP'?'WebP':bytes[0]===137&&bytes[1]===80?'PNG':'autre';
        const bitmap=await createImageBitmap(new Blob([buffer]));
        result.push({file,format,bytes:buffer.byteLength,width:bitmap.width,height:bitmap.height});
        bitmap.close();
      }
      return result;
    });
  });
  await test('horloge: changement de jour et format français',async()=>{
    await p.clock.install({time:new Date('2026-11-18T23:59:59+01:00')});
    await p.reload({waitUntil:'networkidle'});
    await p.clock.runFor(1000);
    const text=await p.locator('.os-clock').innerText();
    assert(text.includes('19 nov.')&&text.includes('00:00'),text);
    return text;
  });
  await test('fonds: limites horaires et transition sans écran vide',async()=>{
    const checked=[];
    for(const [time,name] of [['00:00:00','night'],['05:59:00','night'],['06:00:00','sunrise'],['10:00:00','day'],['17:00:00','sunset'],['21:00:00','night']]){
      await p.clock.setSystemTime(new Date(`2026-11-19T${time}+01:00`));
      await p.clock.runFor(1100);
      // Le décodage reste asynchrone même quand l'horloge JS est simulée.
      for(let i=0;i<12;i++){
        if(await p.locator('.os-wallpaper').last().evaluate((el,name)=>el.style.backgroundImage.includes(`alpine-${name}.webp`),name))break;
        await new Promise(r=>setTimeout(r,250));
      }
      assert(await p.locator('.os-wallpaper').last().evaluate((el,name)=>el.style.backgroundImage.includes(`alpine-${name}.webp`),name),'fond '+time);
      assert(await p.locator('.os-wallpaper').first().evaluate(el=>getComputedStyle(el).opacity==='1'),'couche précédente opaque');
      await p.clock.runFor(2200);
      checked.push({time,name});
    }
    return checked;
  });
  await test('mouvement réduit: dock et fenêtres restent sans transformation',async()=>{
    await p.emulateMedia({reducedMotion:'reduce'});
    await p.locator('[data-dock-app="cv"]').click();
    await p.clock.runFor(1000);
    const transform=await p.locator('.os-window').evaluate(el=>getComputedStyle(el).transform);
    assert(transform==='none',transform);
    return transform;
  });
  await p.screenshot({path:'output/playwright/production.png'});
  await context.close();
  return results;
}
