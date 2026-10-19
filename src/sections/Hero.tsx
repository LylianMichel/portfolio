import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { ActionButton } from "../components/ui/ActionButton";

const anivault = projects.find(project => project.id === "anivault");
const tower = projects.find(project => project.id === "towerdefence");
const words = ["applications web", "jeux vidéo", "interfaces"];
const deadline = new Date("2027-04-12T00:00:00+02:00").getTime();

export const Hero = () => {
 const [word, setWord] = useState(0);
 const [days, setDays] = useState<number | null>(null);
 useEffect(() => {
   const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   setDays(Math.max(0,Math.ceil((deadline-Date.now())/86400000)));
   if (reduced) return;
   const timer=window.setInterval(()=>setWord(index=>(index+1)%words.length),3400);
   return ()=>window.clearInterval(timer);
 },[]);
 return <section id="accueil" aria-labelledby="intro-title" className="lm-hero lm-shell">
   <div className="lm-topline"><span>PORTFOLIO — 2026</span><span>BUT Informatique · IUT de Lens</span></div>
   <div className="lm-hero-layout">
    <div className="lm-hero-copy">
      <p className="lm-kicker">Développeur web & jeux vidéo</p>
      <h1 id="intro-title" className="lm-name"><span className="lm-name-first">Lylian</span><span className="lm-name-last">Michel<span className="lm-name-period">.</span></span></h1>
      <p className="lm-hero-pitch">Je développe des <span className="lm-word" key={word}>{words[word]}<span className="lm-period">.</span></span></p>
      <p className="lm-hero-static">Je développe des applications web et des jeux vidéo.</p>
      <p className="lm-hero-description">Je suis étudiant en deuxième année de BUT Informatique à Lens. En dehors des cours, je travaille notamment sur AniVault, une application web, et sur mon jeu de tower defense réalisé avec Godot.</p>
      <div className="lm-hero-actions"><ActionButton primary href="#projets">Voir mes projets <ArrowDown size={18} aria-hidden /></ActionButton><ActionButton href={profile.cvUrl} download>Télécharger mon CV <Download size={17} aria-hidden /></ActionButton></div>
      <div className="lm-availability" aria-label="Disponibilité pour un stage"><span className="lm-status-dot" aria-hidden/><div><strong>Disponible pour un stage</strong><p>8 semaines dès le 12 avril 2027 {days!==null&&days>0?<span>· J–{days}</span>:null}</p></div></div>
    </div>
    <div className="lm-hero-feature">
      <div className="lm-feature-label"><span>01 / EN DÉVELOPPEMENT</span><span>WEB + GAME</span></div>
      {anivault?.images[0]&& <a href="#anivault" className="lm-hero-image">
       <span className="lm-frame-top"><span aria-hidden="true">● ● ●</span> ANIVAULT / APPLICATION WEB <ArrowUpRight size={15} aria-hidden /></span>
       <img src={anivault.images[0].src} srcSet={anivault.images[0].srcSet} width={anivault.images[0].width} height={anivault.images[0].height} sizes="(min-width: 980px) 43vw, 90vw" alt={anivault.images[0].alt} fetchPriority="high" loading="eager" decoding="async" />
       <span className="lm-feature-caption"><strong>ANIVAULT</strong><span>React · Express · Prisma</span></span>
      </a>}
      {tower&&<a href="#towerdefence" className="lm-hero-secondary"><span><span className="lm-kicker">02 / PROJET JEU</span><strong>THE WORLD DEFENCE</strong></span><span className="lm-mono">GODOT <ArrowUpRight size={15} aria-hidden /></span></a>}
    </div>
   </div>
   <a className="lm-scroll-note" href="#projets">DÉFILER POUR EXPLORER <ArrowDown size={14} aria-hidden /></a>
 </section>;
};
