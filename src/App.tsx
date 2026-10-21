import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { WorkContact } from "./sections/WorkContact";
import { Footer } from "./components/layout/Footer";
import { Marquee } from "./components/ui/Marquee";
import { KineticDivider } from "./components/ui/KineticDivider";
import { NotFound } from "./sections/NotFound";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { initialAccent, initialRain, type Accent, type Appearance, type RainIntensity } from "./utils/preferences";
import type { PortfolioMode } from "./types";
import { appendShortcut, shortcutAction } from "./utils/keyboard";
import { flushSync } from "react-dom";
import { initialExperience, experienceAnnouncement, type Experience } from "./utils/creative";
import { useMatrixSectionDecode } from "./hooks/useMatrixSectionDecode";

const readMode=():PortfolioMode=>typeof window!=="undefined"&&["#contact","#chat"].includes(window.location.hash)?"contact":"work";
const readAccent=():Accent=>typeof window!=="undefined"?initialAccent(window.localStorage):"mint";

const readExperience=():Experience=>{
 if(typeof window==="undefined")return "source";
 try{return initialExperience(window.localStorage)}catch{return "source"}
};
const MatrixRain=lazy(()=>import("./components/ui/MatrixRain"));
const readRain=():RainIntensity=>{
 if(typeof window==="undefined")return "soft";
 const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
 if(window.matchMedia("(prefers-contrast: more)").matches)return "off";
 try{return initialRain(window.localStorage,Boolean(connection?.saveData))}catch{return connection?.saveData?"off":"soft"}
};
const App=()=>{
 useMatrixSectionDecode();
 const [mode,setMode]=useState<PortfolioMode>("work");
 const reducedMotion=useReducedMotion();
 const [mounted,setMounted]=useState(false);
 const [rainReady,setRainReady]=useState(false);
 const theme:Appearance="matrix";
 const [accent,setAccent]=useState<Accent>("mint");
 const [experience,setExperience]=useState<Experience>("source");
 const [rainIntensity,setRainIntensity]=useState<RainIntensity>("soft");
 const [notFound,setNotFound]=useState(false);
 const [help,setHelp]=useState(false);
 const [egg,setEgg]=useState("");
 const [pixel,setPixel]=useState(false);

 const sequence=useRef("");
 useEffect(()=>{
   setAccent(readAccent());setExperience(readExperience());setRainIntensity(readRain());setMounted(true);
 },[]);
 useEffect(()=>setNotFound(!["/","/index.html"].includes(window.location.pathname)),[]);
 useEffect(()=>{
  if(!mounted)return;
  document.documentElement.dataset.theme=theme;
  document.documentElement.style.colorScheme="dark";
  try{window.localStorage.setItem("portfolio-theme",theme)}catch{/* Privacy mode */}
  const meta=document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if(meta)meta.content="#020a05";
 },[mounted]);
 useEffect(()=>{if(!mounted)return;document.documentElement.dataset.experience=experience;try{window.localStorage.setItem("portfolio-experience",experience)}catch{/* Privacy mode */}},[experience,mounted]);
 useEffect(()=>{
  if(!mounted||theme!=="matrix"||rainIntensity==="off"){setRainReady(false);return;}
  let cancelled=false,queued=false,raf=0,idle=0,fallback=0;
  const scheduler=window as Window & {
    requestIdleCallback?:(callback:()=>void,options?:{timeout:number})=>number;
    cancelIdleCallback?:(id:number)=>void;
  };
  const reveal=()=>{
    if(cancelled||queued)return;
    queued=true;
    // An intentional choice should react in the next frame, not after a multi-second delay.
    const apply=()=>{if(!cancelled)setRainReady(true)};
    if(scheduler.requestIdleCallback){
      idle=scheduler.requestIdleCallback(apply,{timeout:350});
    }else{
      fallback=window.setTimeout(apply,0);
    }
  };
  // On a cold visit, wait until the initial document has loaded so that
  // the lazily imported Canvas does not compete with the hero's LCP.
  if(document.readyState==="complete")reveal();
  else window.addEventListener("load",reveal,{once:true});
  // Browsers/extensions sometimes defer load indefinitely: recover after the LCP budget.
  const watchdog=window.setTimeout(reveal,3600);
  return()=>{
    cancelled=true;
    window.removeEventListener("load",reveal);
    window.clearTimeout(watchdog);
    window.clearTimeout(fallback);
    window.cancelAnimationFrame(raf);
    if(idle)scheduler.cancelIdleCallback?.(idle);
  };
 },[mounted,rainIntensity]);
 const changeExperience=(next:Experience)=>{
   if(next===experience)return;
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   const documentWithTransition=document as Document & {startViewTransition?:(update:()=>void)=>unknown};
   const change=()=>flushSync(()=>setExperience(next));
   if(!reduced&&typeof documentWithTransition.startViewTransition==="function")documentWithTransition.startViewTransition(change);
   else change();
   setEgg(experienceAnnouncement(next));
 };
 useEffect(()=>{if(!mounted)return;try{window.localStorage.setItem("portfolio-matrix-rain",rainIntensity)}catch{/* navigateur privé */}},[rainIntensity,mounted]);
 useEffect(()=>{if(!mounted)return;document.documentElement.dataset.accent=accent;try{window.localStorage.setItem("portfolio-accent",accent)}catch{/* Privacy mode */}},[accent,mounted]);
 useEffect(()=>{
  if(!pixel)return;
  document.documentElement.dataset.pixel="true";
  const timeout=window.setTimeout(()=>{setPixel(false);},8000);
  return()=>{window.clearTimeout(timeout);delete document.documentElement.dataset.pixel;};
 },[pixel]);
 useEffect(()=>{
  const onHash=()=>{setMode(readMode());const hash=window.location.hash.slice(1);
   if(hash&&hash!=="work"&&hash!=="contact"&&hash!=="chat")window.requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
  };
  onHash();window.addEventListener("hashchange",onHash);window.addEventListener("popstate",onHash);
  return()=>{window.removeEventListener("hashchange",onHash);window.removeEventListener("popstate",onHash)};
 },[]);
 useEffect(()=>{document.title=mode==="contact"?"Lylian Michel — Contact":"Lylian Michel — Développeur & étudiant en BUT Informatique"},[mode]);
 const changeMode=(next:PortfolioMode)=>{setMode(next);window.history.pushState(null,"",next==="work"?"#work":"#contact");window.scrollTo({top:0,behavior:"instant"})};
 
 useEffect(()=>{
  const onKey=(event:KeyboardEvent)=>{
   const target=event.target;
   if(event.ctrlKey||event.metaKey||event.altKey||event.repeat||target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement||(target instanceof HTMLElement&&target.isContentEditable))return;
   if(event.key==="Escape"){setHelp(false);sequence.current="";return;}
   if(event.key==="?"){setHelp(state=>!state);return;}
   const key=event.key.toLowerCase();
   if(!/^[a-z]$/.test(key)&&!["arrowup","arrowdown","arrowleft","arrowright"].includes(key))return;
   sequence.current=appendShortcut(sequence.current,key);
   if(shortcutAction(sequence.current)==="projects"){setMode("work");window.history.pushState(null,"","#projets");window.requestAnimationFrame(()=>document.getElementById("projets")?.scrollIntoView());sequence.current="";}
   if(shortcutAction(sequence.current)==="contact"){setMode("contact");window.history.pushState(null,"","#contact");window.scrollTo(0,0);sequence.current="";}
   if(shortcutAction(sequence.current)==="pixel"){setPixel(true);setEgg(theme==="matrix"?"Mode Neo activé pour huit secondes.":"Variante rare débloquée pour huit secondes.");sequence.current="";}
  };
  window.addEventListener("keydown",onKey);
  return()=>window.removeEventListener("keydown",onKey);
 },[accent]);
 return <div className="portfolio-app">
  {mounted&&rainReady&&theme==="matrix"&&rainIntensity!=="off"&&<Suspense fallback={null}><MatrixRain intensity={rainIntensity}/></Suspense>}
  <a href="#main-content" className="skip-link" onClick={event=>{event.preventDefault();document.getElementById("main-content")?.focus()}}>Aller au contenu</a>
  <Navbar mode={mode} theme={theme} accent={accent} rainIntensity={rainIntensity} onRainChange={setRainIntensity} experience={experience} onExperienceChange={changeExperience} onModeChange={changeMode} onAccentChange={setAccent}/>
  <main id="main-content" tabIndex={-1} className="lm-main"><AnimatePresence mode="wait" initial={false}><motion.div className="lm-mode-content" key={notFound?"404":mode} initial={false} animate={{opacity:1,y:0}} exit={reducedMotion?{opacity:1,y:0}:{opacity:0,y:-9}} transition={{duration:reducedMotion?0:.22}}>{notFound?<NotFound/>:mode==="work"?<div className="work-view"><Hero/><Projects/><Marquee/><Skills/><KineticDivider/><About/><Timeline/><WorkContact/></div>:<Contact/>}</motion.div></AnimatePresence></main>
  <Footer/>
  {pixel&&theme==="matrix"&&<div className="lm-neo-message" aria-hidden="true">NEO // SYSTEM OVERRIDE</div>}
  <span className="sr-only" role="status" aria-live="polite">{egg}</span>
  {help&&<aside className="lm-shortcuts" aria-label="Aide des raccourcis clavier"><button onClick={()=>setHelp(false)} aria-label="Fermer les raccourcis"><X size={17}/></button><h2>Raccourcis</h2><p>Aller aux projets <kbd>G puis P</kbd></p><p>Ouvrir le contact <kbd>G puis C</kbd></p><p>Afficher / fermer l’aide <kbd>?</kbd></p><p>Fermer l’aide <kbd>Échap</kbd></p></aside>}
 </div>;
};
export default App;
