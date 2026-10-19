import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import { About } from "./sections/About";
import { Portrait } from "./sections/Portrait";
import { Contact } from "./sections/Contact";
import { WorkContact } from "./sections/WorkContact";
import { Footer } from "./components/layout/Footer";
import { initialAccent, initialAppearance, type Accent, type Appearance } from "./utils/preferences";
import type { PortfolioMode } from "./types";

const readMode=():PortfolioMode=>typeof window!=="undefined"&&["#contact","#chat"].includes(window.location.hash)?"contact":"work";
const readTheme=():Appearance=>typeof window!=="undefined"?initialAppearance(window.localStorage,window.matchMedia("(prefers-color-scheme: light)").matches):"dark";
const readAccent=():Accent=>typeof window!=="undefined"?initialAccent(window.localStorage):"mint";

const App=()=>{
 const [mode,setMode]=useState<PortfolioMode>("work");
 const [theme,setTheme]=useState<Appearance>(readTheme);
 const [accent,setAccent]=useState<Accent>(readAccent);
 useEffect(()=>{
  document.documentElement.dataset.theme=theme;
  document.documentElement.style.colorScheme=theme==="light"?"light":"dark";
  try{window.localStorage.setItem("portfolio-theme",theme)}catch{/* Privacy mode */}
  const meta=document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if(meta)meta.content=theme==="light"?"#f2f1ed":theme==="contrast"?"#000000":"#151516";
 },[theme]);
 useEffect(()=>{document.documentElement.dataset.accent=accent;try{window.localStorage.setItem("portfolio-accent",accent)}catch{/* Privacy mode */}},[accent]);
 useEffect(()=>{
  const onHash=()=>{setMode(readMode());const hash=window.location.hash.slice(1);
   if(hash&&hash!=="work"&&hash!=="contact"&&hash!=="chat")window.requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
  };
  onHash();window.addEventListener("hashchange",onHash);window.addEventListener("popstate",onHash);
  return()=>{window.removeEventListener("hashchange",onHash);window.removeEventListener("popstate",onHash)};
 },[]);
 useEffect(()=>{document.title=mode==="contact"?"Lylian Michel — Contact":"Lylian Michel — Développeur & étudiant en BUT Informatique"},[mode]);
 const changeMode=(next:PortfolioMode)=>{setMode(next);window.history.pushState(null,"",next==="work"?"#work":"#contact");window.scrollTo({top:0,behavior:"instant"})};
 return <div className="portfolio-app">
  <a href="#main-content" className="skip-link" onClick={event=>{event.preventDefault();document.getElementById("main-content")?.focus()}}>Aller au contenu</a>
  <Navbar mode={mode} theme={theme} accent={accent} onModeChange={changeMode} onThemeChange={setTheme} onAccentChange={setAccent}/>
  <main id="main-content" tabIndex={-1} className="lm-main">{mode==="work"?<div className="work-view"><Hero/><Projects/><Skills/><About/><Timeline/><Portrait/><WorkContact/></div>:<Contact/>}</main>
  <Footer/>
 </div>;
};
export default App;
