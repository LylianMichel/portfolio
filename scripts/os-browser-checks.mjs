export default async (page, root = "http://127.0.0.1:4173/") => {
  const desktopContext=await page.context().browser().newContext({viewport:{width:1920,height:1080},reducedMotion:'no-preference'});
  page=await desktopContext.newPage();
  page.setDefaultTimeout(4000);
  const results = [], errors = [], network = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {if(message.type()==='error') errors.push(message.text());});
  page.on('response', response => {if(response.status()>=400) network.push({url:response.url(),status:response.status()});});
  const assert = (ok, detail) => {if(!ok) throw Error(detail);};
  const test = async (name, fn) => {try {results.push({name,status:'ok',detail:await fn()});} catch(e) {results.push({name,status:'failed',detail:String(e)});}};
  const idle = () => page.waitForTimeout(360);
  const app = id => page.locator(`[data-dock-app="${id}"]`);
  const clickDockButton = async button => {
    const slot=await button.locator('..').boundingBox();
    await page.mouse.click(slot.x+slot.width/2,slot.y+slot.height/2);
  };
  const launch = id => clickDockButton(app(id));
  const win = name => page.getByRole('region',{name,exact:true});
  const bounds = locator => locator.evaluate(el=>({x:parseFloat(el.style.left),y:parseFloat(el.style.top),width:parseFloat(el.style.width),height:parseFloat(el.style.height)}));
  const closeAll = async () => {
    for(let i=0;i<7&&await page.locator('.os-window:not([inert])').count();i++) {
      const w=page.locator('.os-window:not([inert])').last();
      const title=await w.getAttribute('aria-label');
      await clickDockButton(page.locator('.os-dock').getByRole('button',{name:title,exact:true}));
      await w.getByRole('button',{name:'Fermer',exact:true}).click();
      await idle();
    }
  };
  for(const [width,height] of [[1920,1080],[1366,768],[1280,720],[768,1024],[390,844]]) {
    await test(`${width}x${height}: bureau et sept applications`, async () => {
      await page.setViewportSize({width,height});
      await page.goto(root,{waitUntil:'networkidle'});
      assert(await page.locator('.os-icons button').count()===7,'sept icônes bureau');
      assert(await page.locator('.os-dock button').count()===7,'sept icônes dock');
      const layout = await page.evaluate(()=>{
        const rects = [...document.querySelectorAll('.os-icons button,.os-dock')].map(el=>el.getBoundingClientRect());
        return {overflow:document.documentElement.scrollWidth>innerWidth,inside:rects.every(r=>r.left>=0&&r.right<=innerWidth&&r.top>=36&&r.bottom<=innerHeight)};
      });
      assert(!layout.overflow&&layout.inside,JSON.stringify(layout));
      for(const id of ['about','projects','skills','cv','contact','terminal','settings']) {await launch(id); await page.mouse.move(width-5,height/2);}
      await idle();
      assert(await page.locator('.os-window').count()===7,'sept fenêtres');
      assert(await page.locator('.os-dock-indicator').count()===7,'sept indicateurs');
      await launch('about'); await idle();
      assert(await page.locator('.os-window').count()===7,'doublon');
      if(width>600) assert(await page.locator('.os-active-app').innerText()==='Profil','application active');
      const w = win('Profil');
      await w.getByRole('button',{name:'Maximiser',exact:true}).click();
      const space = await page.locator('.os-workspace').boundingBox();
      const b = await bounds(w);
      assert(b.width===space.width&&b.height===space.height&&b.x===0&&b.y===0,'maximisation');
      await w.getByRole('button',{name:'Minimiser',exact:true}).click(); await idle();
      assert(await page.locator('.os-window[inert]').count()===1,'inert');
      await launch('about'); await idle();
      assert(await page.locator('.os-window[inert]').count()===0,'restauration dock');
      await page.screenshot({path:`output/playwright/${width}x${height}.png`});
      await closeAll();
      assert(await page.locator('.os-dock-indicator').count()===0,'suppression indicateurs');
      return layout;
    });
  }
  await page.setViewportSize({width:1280,height:720});
  await page.goto(root,{waitUntil:'networkidle'});
  await test('déplacement, relâchement, redimensionnement et contrôles', async () => {
    await page.locator('.os-icons').getByRole('button',{name:'Profil',exact:true}).click(); await idle();
    const w=win('Profil'), header=w.locator('.os-window-header');
    const before=await bounds(w), h=await header.boundingBox();
    await page.mouse.move(h.x+120,h.y+20); await page.mouse.down(); await page.mouse.move(h.x+170,h.y+60,{steps:5}); await page.mouse.up();
    const moved=await bounds(w);
    assert(moved.x===before.x+50&&moved.y===before.y+40,JSON.stringify({before,moved}));
    await page.mouse.move(10,500);
    assert(JSON.stringify(await bounds(w))===JSON.stringify(moved),'déplacement après relâchement');
    const corner=await w.locator('.os-window-resize').boundingBox();
    await page.mouse.move(corner.x+12,corner.y+12); await page.mouse.down(); await page.mouse.move(corner.x+72,corner.y+52,{steps:5}); await page.mouse.up();
    const resized=await bounds(w);
    assert(resized.width===moved.width+60&&resized.height===moved.height+40&&resized.x===moved.x,'redimensionnement');
    await w.getByRole('button',{name:'Maximiser',exact:true}).click();
    await page.setViewportSize({width:768,height:1024}); await idle();
    assert((await bounds(w)).width===768,'maximisée après resize');
    await w.getByRole('button',{name:'Restaurer',exact:true}).click();
    assert((await bounds(w)).width===760,'dimensions sauvegardées après resize');
    await header.dblclick({position:{x:110,y:20}});
    assert(await w.getByRole('button',{name:'Restaurer',exact:true}).count()===1,'double clic');
    await closeAll();
  });
  await test('CV: PNG réel, PDF, proportions, état conservé et destination dock', async () => {
    await page.setViewportSize({width:1280,height:720});
    await launch('cv'); await page.mouse.move(1200,300); await idle();
    const w=win('CV');
    await w.locator('img').evaluate(async image => {await image.decode();image.dataset.audit='conserved';});
    const files=await page.evaluate(async()=>{
      const png=new Uint8Array(await (await fetch('./cv.png')).arrayBuffer());
      const pdf=new Uint8Array(await (await fetch('./CV-LylianMichel.pdf')).arrayBuffer());
      const img=document.querySelector('.os-cv-image');
      return {png:[...png.slice(0,8)],pdf:String.fromCharCode(...pdf.slice(0,5)),natural:[img.naturalWidth,img.naturalHeight],rendered:[img.width,img.height],iframe:document.querySelectorAll('iframe,embed,object').length};
    });
    assert(files.png.join(',')==='137,80,78,71,13,10,26,10','signature PNG');
    assert(files.pdf==='%PDF-'&&files.iframe===0,'PDF ou iframe');
    assert(Math.abs(files.natural[0]/files.natural[1]-files.rendered[0]/files.rendered[1])<0.01,'proportions CV');
    const popupPromise=page.waitForEvent('popup');
    await w.getByRole('link',{name:'Télécharger mon CV'}).click();
    const popup=await popupPromise; await popup.waitForLoadState();
    assert(popup.url().endsWith('/CV-LylianMichel.pdf'),'nouvel onglet PDF'); await popup.close();
    await w.locator('.os-window-content').evaluate(el=>el.scrollTop=100);
    await w.getByRole('button',{name:'Minimiser',exact:true}).click(); await idle();
    const hidden=page.locator('.os-window[inert]');
    const target=await app('cv').boundingBox(), actual=await hidden.boundingBox();
    assert(Math.abs(actual.x+actual.width/2-target.x-target.width/2)<2&&Math.abs(actual.y+actual.height/2-target.y-target.height/2)<2,'destination minimisation');
    await hidden.locator('a').evaluate(el=>el.focus());
    assert(!await hidden.evaluate(el=>el.contains(document.activeElement)),'focus fenêtre minimisée');
    await page.setViewportSize({width:1366,height:768}); await idle();
    const t2=await app('cv').boundingBox(), a2=await hidden.boundingBox();
    assert(Math.abs(a2.x+a2.width/2-t2.x-t2.width/2)<2,'destination après resize');
    await launch('cv'); await idle();
    assert(await w.locator('img').getAttribute('data-audit')==='conserved','contenu remonté');
    assert(await w.locator('.os-window-content').evaluate(el=>el.scrollTop)>0,'défilement perdu');
    await closeAll();
    return files;
  });
  await test('menus, recherche, accents, focus et Échap', async () => {
    for(const [button,count] of [['LylianOS',2],['Fichier',2],['Applications',7]]) {
      await page.getByRole('button',{name:button,exact:true}).click(); await idle();
      assert(await page.locator('.os-dropdown:not([inert]) .os-dropdown-item').count()===count,button);
    }
    assert(await page.locator('.os-dropdown:not([inert])').count()===1,'menus simultanés');
    await page.mouse.click(1200,400); await idle();
    assert(await page.locator('.os-dropdown').count()===0,'clic extérieur');
    const search=page.getByRole('button',{name:'Rechercher une application',exact:true});
    await search.click();
    assert(await page.getByRole('searchbox').evaluate(el=>el===document.activeElement),'autofocus');
    for(const term of ['COMPÉTENCES','competences','  compétences  ']) {
      await page.getByRole('searchbox').fill(term);
      assert(await page.locator('.os-dropdown-item').count()===1,term);
    }
    await page.getByRole('searchbox').fill('xxxxxxxx');
    assert(await page.locator('.os-search-empty').isVisible(),'aucun résultat');
    await page.getByRole('searchbox').fill('reglages');
    await page.locator('.os-dropdown-item').click(); await idle();
    assert(await win('Réglages').count()===1&&await page.locator('.os-dropdown').count()===0,'sélection recherche');
    await search.click(); await page.keyboard.press('Escape'); await idle();
    assert(await search.evaluate(el=>el===document.activeElement),'retour focus Échap');
    await closeAll();
  });
  await test('clavier: icône bureau et application active', async () => {
    const icon=page.locator('.os-icons').getByRole('button',{name:'Profil',exact:true});
    await icon.focus(); await page.keyboard.press('Enter'); await idle();
    assert(await win('Profil').count()===1,'ouverture clavier');
    await app('cv').focus(); await page.keyboard.press('Enter'); await idle();
    await win('Profil').getByRole('button',{name:'Minimiser',exact:true}).focus();
    assert(await page.locator('.os-active-app').innerText()==='Profil','focus clavier ne ramène pas devant');
    await page.keyboard.press('Enter'); await idle();
    assert(await page.locator('.os-active-app').innerText()==='CV','application minimisée active');
    await closeAll();
  });
  await test('console et réseau',async()=>{assert(errors.length===0&&network.length===0,JSON.stringify({errors,network})); return {errors,network};});
  await desktopContext.close();
  return results;
}
