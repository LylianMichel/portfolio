import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { ActionButton } from "../components/ui/ActionButton";

const anivault = projects.find((project) => project.id === "anivault");
const tower = projects.find((project) => project.id === "towerdefence");
const words = ["applications web", "jeux vidéo", "interfaces"];
const deadline = new Date("2027-04-12T00:00:00+02:00").getTime();
export const daysUntilStage = (today: number): number => Math.max(0, Math.ceil((deadline - today) / 86_400_000));

export const Hero = () => {
  const [word, setWord] = useState(0);
  const [days, setDays] = useState<number | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const images = anivault?.images ?? [];
  useEffect(() => {
    const update = () => setDays(daysUntilStage(Date.now()));
    update();
    const dayTimer = window.setInterval(update, 60_000);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return () => window.clearInterval(dayTimer);
    const wordTimer = window.setInterval(() => setWord((index) => (index + 1) % words.length), 3_400);
    return () => { window.clearInterval(dayTimer); window.clearInterval(wordTimer); };
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
    <div className="lm-topline"><span>PORTFOLIO — 2026</span><span>BUT Informatique · IUT de Lens</span></div>
    <div className="lm-hero-layout">
      <div className="lm-hero-copy" ref={spotlightRef} onPointerMove={onPointerMove}>
        <p className="lm-kicker">Développeur web & jeux vidéo</p>
        <h1 id="intro-title" className="lm-name"><span className="lm-name-first">Lylian</span><span className="lm-name-last">Michel<span className="lm-name-period">.</span></span></h1>
        <p className="lm-hero-pitch">Je développe des <span className="lm-word" key={word}>{words[word]}<span className="lm-period">.</span></span></p>
        <p className="lm-hero-static">Je développe des applications web et des jeux vidéo.</p>
        <p className="lm-hero-description">Je suis étudiant en deuxième année de BUT Informatique à Lens. En dehors des cours, je travaille notamment sur AniVault, une application web, et sur mon jeu de tower defense réalisé avec Godot.</p>
        <div className="lm-hero-actions"><ActionButton primary href="#projets">Voir mes projets <ArrowDown size={18} aria-hidden /></ActionButton><ActionButton href={profile.cvUrl} download>Télécharger mon CV <Download size={17} aria-hidden /></ActionButton></div>
        <p className="lm-hero-mobile-stage">STAGE · 8 SEMAINES · 12/04/2027 · {profile.location}</p>
      </div>
      <div className="lm-hero-feature" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
        <div className="lm-feature-label"><span>01 / EN DÉVELOPPEMENT</span><span>WEB + GAME</span></div>
        {images[0] && <a href="#anivault" className="lm-hero-image">
          <span className="lm-frame-top"><span aria-hidden="true">● ● ●</span> ANIVAULT / APPLICATION WEB <ArrowUpRight size={15} aria-hidden /></span>
          <span className="lm-hero-image-stage">
            <img src={images[frameIndex]?.src ?? images[0].src} srcSet={images[frameIndex]?.srcSet} width={images[frameIndex]?.width} height={images[frameIndex]?.height} sizes="(min-width: 980px) 43vw, 90vw" alt={images[frameIndex]?.alt ?? images[0].alt} fetchPriority={frameIndex === 0 ? "high" : "auto"} loading={frameIndex === 0 ? "eager" : "lazy"} decoding="async" />
            {images.length > 1 && <span className="lm-image-count" aria-live="off">{frameIndex+1} / {images.length}</span>}
          </span>
          <span className="lm-feature-caption"><strong>ANIVAULT</strong><span>React · Express · Prisma</span></span>
        </a>}
        {tower && <a href="#towerdefence" className="lm-hero-secondary"><span><span className="lm-kicker">02 / PROJET JEU</span><strong>THE WORLD DEFENCE</strong></span><span className="lm-mono">GODOT <ArrowUpRight size={15} aria-hidden /></span></a>}
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
