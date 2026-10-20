import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { ActionButton } from "../components/ui/ActionButton";
import { NameWave } from "../components/ui/NameWave";
import { SourcePlayToggle } from "../components/ui/SourcePlayToggle";
import type { Experience } from "../utils/creative";

const anivault = projects.find((project) => project.id === "anivault");
const tower = projects.find((project) => project.id === "towerdefence");
const words = ["applications web", "jeux vidéo", "interfaces"];
const deadline = new Date("2027-04-12T00:00:00+02:00").getTime();
export const daysUntilStage = (today: number): number => Math.max(0, Math.ceil((deadline - today) / 86_400_000));

export const Hero = ({experience,onExperienceChange}:{experience:Experience;onExperienceChange:(mode:Experience)=>void}) => {
  const [word, setWord] = useState(0);
  const [days, setDays] = useState<number | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const images = anivault?.images ?? [];
  useEffect(() => {
    const update = () => setDays(daysUntilStage(Date.now()));
    update();
    const dayTimer = window.setInterval(update, 60_000);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return () => window.clearInterval(dayTimer);
    const updateWord = () => {
      const hero = document.getElementById("accueil");
      if (!hero) return;
      const distance = Math.max(0, Math.min(hero.offsetHeight, window.scrollY));
      setWord(Math.min(words.length - 1, Math.floor(distance / Math.max(1, hero.offsetHeight / words.length))));
    };
    updateWord();
    window.addEventListener("scroll", updateWord, { passive: true });
    window.addEventListener("resize", updateWord);
    return () => { window.clearInterval(dayTimer); window.removeEventListener("scroll", updateWord); window.removeEventListener("resize", updateWord); };
  }, []);
  useEffect(() => {
    if (images.length < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setFrameIndex((index) => (index + 1) % images.length), 4_000);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer:fine)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    spotlightRef.current?.style.setProperty("--hero-x", `${x}%`);
    spotlightRef.current?.style.setProperty("--hero-y", `${y}%`);
  };
  return <section id="accueil" aria-labelledby="intro-title" className="lm-hero lm-shell">
    <div className="lm-topline"><span>PORTFOLIO — {new Date().getFullYear()}</span><span>BUT Informatique · IUT de Lens</span></div>
    <div className="lm-hero-layout">
      <div className="lm-hero-copy" ref={spotlightRef} onPointerMove={onPointerMove}>
        <div className="lm-hero-eyebrow"><p className="lm-kicker">Développeur web & jeux vidéo</p><span className="lm-stage-badge"><span aria-hidden="true" className="lm-stage-indicator"/>STAGE · 8 SEMAINES · 12/04/2027</span></div>
        <h1 id="intro-title" className="lm-name" aria-label={profile.name}><NameWave text="Lylian" className="lm-name-first" />{" "}<NameWave text="Michel" className="lm-name-last" light /></h1>
        <p className="lm-hero-pitch">Je développe des <span className="lm-word-window"><span className="lm-word" key={word}>{words[word]}<span className="lm-period">.</span></span></span></p>
        <p className="lm-hero-static">Je développe des applications web et des jeux vidéo.</p>
        <p className="lm-hero-description">Étudiant en deuxième année de BUT Informatique à Lens, je développe AniVault pour le web et THE WORLD DEFENCE avec Godot, en parallèle des cours.</p>
        <div className="lm-hero-actions"><ActionButton primary href="#projets"><span className="lm-action-long">Voir mes projets</span><span className="lm-action-short">Projets</span> <ArrowDown size={18} aria-hidden /></ActionButton><ActionButton href={profile.cvUrl} download><span className="lm-action-long">Télécharger mon CV</span><span className="lm-action-short">Mon CV</span> <Download size={17} aria-hidden /></ActionButton></div>
        <div className="lm-hero-experience"><span className="lm-kicker">CHOISIR UNE EXPÉRIENCE</span><SourcePlayToggle variant="hero" experience={experience} onChange={onExperienceChange}/></div>
        <p className="lm-hero-mobile-stage"><span>{days === null ? "STAGE À PARTIR DU 12 AVRIL 2027" : days > 0 ? `J–${days} AVANT LE STAGE` : "DATE DE DÉBUT ATTEINTE"}</span><span>{profile.location}</span></p>
      </div>
      <div className="lm-hero-feature" ref={sceneRef}
        onPointerMove={event=>{
          if(event.pointerType!=="mouse"||!window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)").matches)return;
          const box=event.currentTarget.getBoundingClientRect();
          const x=(event.clientX-box.left)/box.width-.5;
          const y=(event.clientY-box.top)/box.height-.5;
          event.currentTarget.style.setProperty("--scene-x",`${(x*14).toFixed(2)}px`);
          event.currentTarget.style.setProperty("--scene-y",`${(y*14).toFixed(2)}px`);
        }}
        onPointerLeave={event=>{
          event.currentTarget.style.removeProperty("--scene-x");
          event.currentTarget.style.removeProperty("--scene-y");
          setPaused(false);
        }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
        <div className="lm-feature-label"><span>01 / EN DÉVELOPPEMENT</span><span>WEB + GAME</span></div>
        {images[0] && <a href="#anivault" className="lm-hero-image"
 onPointerMove={event=>{
  if(event.pointerType!=="mouse"||!window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)").matches)return;
  const bounds=event.currentTarget.getBoundingClientRect();
  const nx=(event.clientX-bounds.left)/bounds.width-.5;
  const ny=(event.clientY-bounds.top)/bounds.height-.5;
  event.currentTarget.style.setProperty("--tilt-y",`${(nx*5).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--tilt-x",`${(-ny*5).toFixed(2)}deg`);
 }}
 onPointerLeave={event=>{event.currentTarget.style.removeProperty("--tilt-x");event.currentTarget.style.removeProperty("--tilt-y")}}>
          <span className="lm-frame-top"><span aria-hidden="true">● ● ●</span> ANIVAULT / APPLICATION WEB <ArrowUpRight size={15} aria-hidden /></span>
          <span className="lm-hero-image-stage">
            <img src={images[frameIndex]?.src ?? images[0].src} srcSet={images[frameIndex]?.srcSet} width={images[frameIndex]?.width} height={images[frameIndex]?.height} sizes="(min-width: 980px) 43vw, 90vw" alt={images[frameIndex]?.alt ?? images[0].alt} fetchPriority={frameIndex === 0 ? "high" : "auto"} loading={frameIndex === 0 ? "eager" : "lazy"} decoding="async" />
            {images.length > 1 && <span className="lm-image-count" aria-live="off">{frameIndex+1} / {images.length}</span>}
          </span>
          <span className="lm-feature-caption"><strong>ANIVAULT</strong><span>React · Express · Prisma</span></span>
        </a>}
        {anivault && <div className="lm-scene-tech" aria-hidden="true">{anivault.technologies.filter(t=>["React","Express","Prisma"].includes(t)).map(t=><span key={t}>{t}</span>)}</div>}
        {tower && <a href="#towerdefence" className="lm-hero-secondary">{tower.images[0] && <img src={tower.images[0].src} srcSet={tower.images[0].srcSet} sizes="110px" width={110} height={70} loading="lazy" decoding="async" alt="" aria-hidden="true"/>}<span><span className="lm-kicker">02 / PROJET JEU</span><strong>THE WORLD DEFENCE</strong></span><span className="lm-mono">GODOT <ArrowUpRight size={15} aria-hidden /></span></a>}
      </div>
    </div>
    <div className="lm-hero-status" aria-label="Disponibilité pour un stage">
      <span><span className="lm-status-dot" aria-hidden="true"/>STAGE · 8 SEMAINES · 12/04/2027</span>
      <span>{days === null ? "DISPONIBILITÉ 2027" : days > 0 ? `J–${days} AVANT LE STAGE` : "DATE DE DÉBUT ATTEINTE"}</span>
      <span>{profile.location.toUpperCase()}</span>
    </div>
    <a className="lm-scroll-note" href="#projets">DÉFILER POUR EXPLORER <ArrowDown size={14} aria-hidden /></a>
  </section>;
};
