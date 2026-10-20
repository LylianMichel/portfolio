import { useEffect, useRef, useState } from "react";
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
import { NotFound } from "./sections/NotFound";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { initialAccent, initialAppearance, type Accent, type Appearance } from "./utils/preferences";
import type { PortfolioMode } from "./types";
import { appendShortcut, shortcutAction } from "./utils/keyboard";
import { flushSync } from "react-dom";
import { initialExperience, experienceAnnouncement, type Experience } from "./utils/creative";

const readMode=():PortfolioMode=>typeof window!=="undefined"&&["#contact","#chat"].includes(window.location.hash)?"contact":"work";
const readTheme=():Appearance=>typeof window!=="undefined"?initialAppearance(window.localStorage,window.matchMedia("(prefers-color-scheme: light)").matches):"dark";
const readAccent=():Accent=>typeof window!=="undefined"?initialAccent(window.localStorage):"mint";

const readExperience=():Experience=>{
 if(typeof window==="undefined")return "source";
 try{return initialExperience(window.localStorage)}catch{return "source"}
};
const App=()=>{
 const [mode,setMode]=useState<PortfolioMode>("work");
 const [theme,setTheme]=useState<Appearance>(readTheme);
 const [accent,setAccent]=useState<Accent>(readAccent);
 const [experience,setExperience]=useState<Experience>(readExperience);
 const [notFound,setNotFound]=useState(false);
 const [help,setHelp]=useState(false);
 const [egg,setEgg]=useState("");
 const [pixel,setPixel]=useState(false);

 const sequence=useRef("");
 useEffect(()=>setNotFound(!["/","/index.html"].includes(window.location.pathname)),[]);
 useEffect(()=>{
  document.documentElement.dataset.theme=theme;
  document.documentElement.style.colorScheme=theme==="light"?"light":"dark";
  try{window.localStorage.setItem("portfolio-theme",theme)}catch{/* Privacy mode */}
  const meta=document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if(meta)meta.content=theme==="light"?"#f2f1ed":theme==="contrast"?"#000000":"#151516";
 },[theme]);
 useEffect(()=>{document.documentElement.dataset.experience=experience;try{window.localStorage.setItem("portfolio-experience",experience)}catch{/* Privacy mode */}},[experience]);
 const changeExperience=(next:Experience)=>{
   if(next===experience)return;
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   const documentWithTransition=document as Document & {startViewTransition?:(update:()=>void)=>unknown};
   const change=()=>flushSync(()=>setExperience(next));
   if(!reduced&&typeof documentWithTransition.startViewTransition==="function")documentWithTransition.startViewTransition(change);
   else change();
   setEgg(experienceAnnouncement(next));
 };
 useEffect(()=>{document.documentElement.dataset.accent=accent;try{window.localStorage.setItem("portfolio-accent",accent)}catch{/* Privacy mode */}},[accent]);
 useEffect(()=>{
  if(!pixel)return;
  document.documentElement.dataset.pixel="true";
  const timeout=window.setTimeout(()=>{setPixel(false);},10000);
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
   if(shortcutAction(sequence.current)==="pixel"){setPixel(true);setEgg("Variante rare débloquée pour dix secondes.");sequence.current="";}
  };
  window.addEventListener("keydown",onKey);
  return()=>window.removeEventListener("keydown",onKey);
 },[accent]);
 return <div className="portfolio-app">
  <a href="#main-content" className="skip-link" onClick={event=>{event.preventDefault();document.getElementById("main-content")?.focus()}}>Aller au contenu</a>
  <Navbar mode={mode} theme={theme} accent={accent} experience={experience} onExperienceChange={changeExperience} onModeChange={changeMode} onThemeChange={setTheme} onAccentChange={setAccent}/>
  <main id="main-content" tabIndex={-1} className="lm-main"><AnimatePresence mode="wait" initial={false}><motion.div className="lm-mode-content" key={notFound?"404":mode} initial={{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-9}} transition={{duration:.22}}>{notFound?<NotFound/>:mode==="work"?<div className="work-view"><Hero experience={experience} onExperienceChange={changeExperience}/><Projects/><Marquee/><Skills/><About/><Timeline/><WorkContact/></div>:<Contact/>}</motion.div></AnimatePresence></main>
  <Footer/>
  <span className="sr-only" role="status" aria-live="polite">{egg}</span>
  {help&&<aside className="lm-shortcuts" aria-label="Aide des raccourcis clavier"><button onClick={()=>setHelp(false)} aria-label="Fermer les raccourcis"><X size={17}/></button><h2>Raccourcis</h2><p>Aller aux projets <kbd>G puis P</kbd></p><p>Ouvrir le contact <kbd>G puis C</kbd></p><p>Afficher / fermer l’aide <kbd>?</kbd></p><p>Fermer l’aide <kbd>Échap</kbd></p></aside>}
 </div>;
};
export default App;
