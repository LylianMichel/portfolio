import { useEffect, useRef } from "react";
import { projects } from "../../data/projects";
const list=[...new Set(projects.flatMap(project=>project.technologies))].filter(item=>["React","TypeScript","Express","Prisma","PostgreSQL","Godot","Laravel","PHP","Vite","JavaScript"].includes(item));
export const Marquee=()=>{
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let lastY=window.scrollY,lastTime=performance.now(),raf=0;
  const update=()=>{
   raf=0;
   if(!host.current)return;
   const view=host.current.getBoundingClientRect();
   if(view.top>innerHeight||view.bottom<0)return;
   const now=performance.now();
   const dt=Math.max(now-lastTime,16);
   const velocity=Math.abs(window.scrollY-lastY)/dt;
   const rate=Math.min(1.45,Math.max(1,1+velocity*.15));
   host.current.querySelectorAll<HTMLElement>(".lm-marquee-track").forEach(track=>
    track.getAnimations().forEach(animation=>{animation.playbackRate=rate})
   );
   lastY=window.scrollY;lastTime=now;
  };
  const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
  window.addEventListener("scroll",onScroll,{passive:true});
  return()=>{window.removeEventListener("scroll",onScroll);if(raf)cancelAnimationFrame(raf)};
 },[]);
 return <div className="lm-marquee lm-marquee-duo" ref={host} tabIndex={0}>
  <span className="sr-only">{`Technologies employées : ${list.join(", ")}`}</span>
  {[0,1].map((row)=><div className={`lm-marquee-row ${row?"lm-marquee-reverse":""}`} key={row} aria-hidden="true">
   <div className="lm-marquee-track">{[0,1].map(copy=><div className="lm-marquee-group" key={copy}>
    {list.map(name=><span key={name}>{name}<span className="lm-marquee-sep">·</span></span>)}
   </div>)}</div>
  </div>)}
 </div>;
};