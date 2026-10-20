import { useEffect, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Download, Mail, Menu, Settings2, X } from "lucide-react";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { PortfolioMode } from "../../types";
import type { Accent, Appearance } from "../../utils/preferences";
import type { Experience } from "../../utils/creative";
import { SourcePlayToggle } from "../ui/SourcePlayToggle";

interface NavbarProps {
 mode:PortfolioMode; theme:Appearance; accent:Accent; experience:Experience;
 onExperienceChange:(mode:Experience)=>void;
 onModeChange:(mode:PortfolioMode)=>void;
 onThemeChange:(theme:Appearance)=>void;
 onAccentChange:(accent:Accent)=>void;
}
const sections = [{id:"accueil",title:"Accueil"},{id:"projets",title:"Projets"},{id:"competences",title:"Compétences"},{id:"a-propos",title:"À propos"},{id:"parcours",title:"Parcours"}];
const sectionIds=sections.map(s=>s.id);
const colorLabels:Record<Accent,string>={mint:"Menthe",blue:"Azur",violet:"Lavande",orange:"Cuivre"};
export const Navbar=({mode,theme,accent,experience,onExperienceChange,onModeChange,onThemeChange,onAccentChange}:NavbarProps)=>{
 const [menu,setMenu]=useState(false);
 const [compact,setCompact]=useState(false);
 const [progress,setProgress]=useState(0);
 const [settings,setSettings]=useState(false);
 const active=useActiveSection(sectionIds,mode==="work");
 useEffect(()=>{
  let last=window.scrollY;
  const onScroll=()=>{
   const y=window.scrollY;
   setCompact(y>180&&y>last+3&&!menu&&!settings);
   if(y<last-3||y<100)setCompact(false);
   last=y;
   const height=document.documentElement.scrollHeight-window.innerHeight;
   setProgress(height>0?Math.min(100,y/height*100):0);
  };
  window.addEventListener("scroll",onScroll,{passive:true});
  return ()=>window.removeEventListener("scroll",onScroll);
 },[menu,settings]);
 useEffect(()=>{
  if(!menu&&!settings)return;
  const handleEscape=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMenu(false);setSettings(false);}};
  window.addEventListener("keydown",handleEscape);
  return()=>window.removeEventListener("keydown",handleEscape);
 },[menu,settings]);
 const change=(next:PortfolioMode)=>{onModeChange(next);setMenu(false);setCompact(false)};
 return <>
 <div className="lm-progress" style={{width:`${progress}%`}} aria-hidden />
 <header className={`lm-nav-wrap ${compact?"lm-nav-away":""}`}>
 <nav aria-label="Navigation principale" className="lm-nav">
  <a className="lm-logo" href="#work" onClick={event=>{event.preventDefault();change("work")}} aria-label="Lylian Michel — Accueil">
    <svg width="35" height="35" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="9" fill="currentColor" opacity=".10"/><path d="M11 15v35h18v-8H20V15zM33 50V15h7l7 13 7-13h2v35h-8V30l-7 12-7-12v20z" fill="currentColor"/></svg>
  </a>
  <div className="lm-nav-modes" role="group" aria-label="Choisir un espace">
    <button className={mode==="work"?"selected":""} aria-pressed={mode==="work"} onClick={()=>change("work")}><BriefcaseBusiness size={14} aria-hidden />Work</button>
    <button className={mode==="contact"?"selected":""} aria-pressed={mode==="contact"} onClick={()=>change("contact")}><Mail size={14} aria-hidden />Chat</button>
  </div>
  <SourcePlayToggle experience={experience} onChange={onExperienceChange}/>
  {experience==="play"&&<span className="lm-score" aria-hidden="true">SCORE {String(Math.round(progress)).padStart(3,"0")}</span>}
  <div className="lm-desktop-links">{mode==="work"?sections.slice(1,4).map(item=><a key={item.id} href={`#${item.id}`} aria-current={active===item.id?"location":undefined}>{item.title}</a>):<span className="lm-mono">CONTACT / DISCUSSION</span>}</div>
  <a className="lm-nav-cv" href={profile.cvUrl} download>CV <Download size={14} aria-hidden /><span className="sr-only">PDF, environ 100 Ko</span></a>
  <button className="lm-nav-icon" onClick={()=>setSettings(!settings)} aria-label="Personnaliser l'apparence" aria-expanded={settings}><Settings2 size={18} aria-hidden /></button>
  <button className="lm-nav-icon lm-nav-menu" onClick={()=>setMenu(!menu)} aria-label={menu?"Fermer le menu":"Ouvrir le menu"} aria-expanded={menu}>{menu?<X size={19}/>:<Menu size={19}/>}</button>
 </nav>
 {menu&&<div className="lm-mobile-menu"><div className="lm-mobile-list">{sections.map(item=><a key={item.id} href={`#${item.id}`} onClick={()=>{change("work");window.requestAnimationFrame(()=>document.getElementById(item.id)?.scrollIntoView())}}>{item.title}<ArrowUpRight size={15} aria-hidden /></a>)}</div><a href={profile.cvUrl} download>CV · PDF ~100 Ko</a></div>}
 {settings&&<section className="lm-quick-settings" aria-label="Personnalisation">
  <div className="lm-settings-head"><span>APPARENCE</span><button onClick={()=>setSettings(false)} aria-label="Fermer l'apparence"><X size={17}/></button></div>
  <div role="group" aria-label="Thème" className="lm-settings-choice">{(["dark","light","contrast"] as Appearance[]).map(t=><button key={t} aria-pressed={theme===t} onClick={()=>onThemeChange(t)}>{({dark:"Sombre",light:"Clair",contrast:"Contraste +"})[t]}</button>)}</div>
  <p className="lm-kicker">ACCENT</p><div className="lm-accent-choice" role="group" aria-label="Couleur d'accent">{(["mint","blue","violet","orange"] as Accent[]).map(a=><button key={a} data-swatch={a} aria-label={colorLabels[a]} aria-pressed={accent===a} onClick={()=>onAccentChange(a)}><span/></button>)}</div>
 </section>}
 </header>
 </>;
};
