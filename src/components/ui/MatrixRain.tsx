import { useEffect, useRef } from "react";
import { projects } from "../../data/projects";
import type { RainIntensity } from "../../utils/preferences";
import { rainShouldRun, rainQuality } from "../../utils/rainPolicy";

const glyphs="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ0123456789{}<>/;=#";
const words=[...new Set(projects.flatMap(project=>project.technologies))].filter(value=>["React","Prisma","Godot","TypeScript","Express"].includes(value));
const rand=(max:number)=>Math.random()*max;
type Drop={x:number;y:number;velocity:number;length:number;size:number;layer:number;glyphSeed:number};
type MatrixStats={fps:number;averageMs:number;columns:number;quality:"full"|"half"|"frozen"};
declare global {interface Window{__matrixStats?:MatrixStats}}
const palette=(pixel:boolean,accent:string)=>pixel?"#ff497d":accent;
export const MatrixRain=({intensity}:{intensity:RainIntensity})=>{
 const canvasRef=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=canvasRef.current;if(!canvas||intensity==="off")return;
  const context=canvas.getContext("2d",{alpha:true});if(!context)return;
  const ctx=context;
  const motion=matchMedia("(prefers-reduced-motion: reduce)");
  const contrast=matchMedia("(prefers-contrast: more)");
  const fine=matchMedia("(pointer: fine)").matches;
  let reduced=motion.matches||contrast.matches,live=true,raf=0,last=0,frames=0,total=0;
  let quality:"full"|"half"|"frozen"="full",drops:Drop[]=[],accent="#00ff41",waveAt=-10000,burstUntil=-10000;
  let cursor={x:-1000,y:-1000},lastSection="",measureStart=performance.now(),renderedFrames=0;
  let lastScrollY=window.scrollY,simulationTime=0,visibleHeight=window.innerHeight;
  const build=()=>{
   const w=window.innerWidth,h=window.innerHeight,dpr=Math.min(window.devicePixelRatio||1,1.5);
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);
   const layers=[{size:11,spacing:w<700?36:34,velocity:.3},{size:15,spacing:w<700?24:23,velocity:.7},{size:20,spacing:w<700?58:54,velocity:1.1}];
   drops=layers.flatMap(({size,spacing,velocity},layer)=>Array.from({length:Math.ceil(w/spacing)},(_,i)=>({
    x:i*spacing+rand(spacing),y:rand(h+size*8),velocity:velocity*(.55+rand(1.55)),
    length:9+Math.floor(rand(17)),size,layer,glyphSeed:Math.floor(rand(glyphs.length))
   })));
   if(quality==="half")drops=drops.filter((_,i)=>i%2===0);
   ctx.clearRect(0,0,w,h);
   accent=getComputedStyle(document.documentElement).getPropertyValue("--lm-accent").trim()||"#00ff41";
  };
  const draw=(now:number,advance:boolean)=>{
   const start=performance.now(),w=window.innerWidth,h=window.innerHeight;
   const heroBottom=document.getElementById("projets")?.getBoundingClientRect().top ?? h;
   visibleHeight=Math.max(0,Math.min(h,heroBottom));
   canvas.style.clipPath=`inset(0 0 ${Math.max(0,h-visibleHeight)}px 0)`;
   simulationTime=window.scrollY*3;
   ctx.clearRect(0,0,w,h);
   const selected=palette(document.documentElement.dataset.pixel==="true",accent);
   const bursting=now<burstUntil;
   ctx.textAlign="center";ctx.textBaseline="middle";
   for(const drop of drops){
    const {size,length,layer,x}=drop;
    const near=fine?Math.max(0,1-Math.hypot(x-cursor.x,drop.y-cursor.y)/160):0;
    const waveProgress=(now-waveAt)/800;
    const wave=waveProgress>=0&&waveProgress<=1?Math.max(0,1-Math.abs(x-waveProgress*w)/110):0;
    const speed=1+near*.65+wave*1.15+(bursting?.35:0);
    if(advance){
     // Absolute scroll position makes the animation reversible and deterministic.
     const track=h+length*size*2;
     const travelled=window.scrollY*drop.velocity*.55;
     drop.y=((drop.glyphSeed*31+travelled)%track+track)%track-length*size;
    }
    ctx.font=`${size}px monospace`;
    const baseAlpha=layer===0?.32:layer===1?.58:.72;
    for(let i=length-1;i>=0;i--){
     const y=drop.y-i*size;if(y<0||y>h+size)continue;
     const fade=Math.pow(1-i/length,.75);
     const head=i===0;
     // Every frame starts transparent: pixel brightness cannot accumulate between frames.
     ctx.globalAlpha=(head?.92:baseAlpha*fade)*(intensity==="soft"?.84:1);
     ctx.fillStyle=head?"#e4ffe7":selected;
     if(head && (layer===2||wave>.35)){ctx.shadowColor=selected;ctx.shadowBlur=3;}
     let glyph=glyphs[(drop.glyphSeed+i+Math.floor(simulationTime/250+i*.8))%glyphs.length]??"0";
     if(!head&&i%19===8&&layer===2&&words.length){glyph=words[(drop.glyphSeed+i)%words.length]?.slice(0,4)??glyph;}
     ctx.fillText(glyph,x,y);
     ctx.shadowBlur=0;
    }
   }
   ctx.globalAlpha=1;
   frames++;renderedFrames++;total+=performance.now()-start;
   if(frames>=60){
    const avg=total/frames;const decision=rainQuality(avg,drops.length);
    if(decision==="halve"&&quality==="full"){drops=drops.filter((_,i)=>i%2===0);quality="half"}
    // Already reduced to half density: retain motion rather than freezing the canvas.
    const elapsed=Math.max(1,now-measureStart);
    window.__matrixStats={fps:Math.round(renderedFrames*1000/elapsed),averageMs:Math.round(avg*100)/100,
      columns:drops.length,quality};
    frames=0;renderedFrames=0;total=0;measureStart=now;
   }
  };
  const canRun=()=>live&&rainShouldRun(document.hidden,reduced,quality==="frozen");
  const loop=(now:number)=>{
   if(!canRun())return;
   if(visibleHeight>0&&now-last>=33){draw(now,false);last=now}
   raf=requestAnimationFrame(loop);
  };
  const resume=()=>{cancelAnimationFrame(raf);if(canRun()){last=0;raf=requestAnimationFrame(loop)}};
  const visibility=()=>{if(document.hidden)cancelAnimationFrame(raf);else {draw(performance.now(),false);resume()}};
  const reduce=()=>{reduced=motion.matches||contrast.matches;cancelAnimationFrame(raf);if(reduced){draw(performance.now(),false)}else {draw(performance.now(),false);resume()}};
  const onScroll=()=>{
   const current=window.scrollY;
   if(current===lastScrollY)return;
   lastScrollY=current;
   draw(performance.now(),true);
  };
  const move=(event:PointerEvent)=>{if(fine)cursor={x:event.clientX,y:event.clientY}};
  const wave=()=>{waveAt=performance.now()};
  // Update the accent without remounting the Canvas; redraw when motion is reduced.
  const refreshPalette=()=>{
   accent=getComputedStyle(document.documentElement).getPropertyValue("--lm-accent").trim()||"#00ff41";
   if(reduced)draw(performance.now(),false);
  };
  const paletteObserver=new MutationObserver(records=>{
   if(records.some(record=>record.attributeName==="data-accent"||record.attributeName==="data-pixel"))refreshPalette();
  });
  paletteObserver.observe(document.documentElement,{attributes:true,attributeFilter:["data-accent","data-pixel"]});
  let lastWidth=window.innerWidth,lastHeight=window.innerHeight;
  const resize=()=>{
   const width=window.innerWidth,height=window.innerHeight;
   if(width===lastWidth&&height===lastHeight)return;
   lastWidth=width;lastHeight=height;
   build();draw(performance.now(),true);
  };
  const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(resize):null;
  const sectionObserver=typeof IntersectionObserver!=="undefined"?new IntersectionObserver(entries=>{
   if(reduced)return;
   for(const entry of entries){if(entry.isIntersecting&&entry.target.id!==lastSection){
    lastSection=entry.target.id;burstUntil=performance.now()+600;break;
   }}
  },{rootMargin:"-38% 0px -43% 0px"}):null;
  build();observer?.observe(document.documentElement);
  document.querySelectorAll("main section[id]").forEach(section=>sectionObserver?.observe(section));
  window.addEventListener("resize",resize,{passive:true});
  window.addEventListener("scroll",onScroll,{passive:true});
  document.addEventListener("visibilitychange",visibility);
  motion.addEventListener("change",reduce);contrast.addEventListener("change",reduce);
  if(fine){window.addEventListener("pointermove",move,{passive:true});window.addEventListener("matrix-wave",wave);}
  if(reduced)draw(performance.now(),false);else { draw(performance.now(),true); resume(); }
  return()=>{live=false;cancelAnimationFrame(raf);observer?.disconnect();sectionObserver?.disconnect();paletteObserver.disconnect();
   window.removeEventListener("resize",resize);window.removeEventListener("scroll",onScroll);document.removeEventListener("visibilitychange",visibility);
   motion.removeEventListener("change",reduce);contrast.removeEventListener("change",reduce);
   window.removeEventListener("pointermove",move);window.removeEventListener("matrix-wave",wave);
   ctx.clearRect(0,0,canvas.width,canvas.height);delete window.__matrixStats;
  };
 },[intensity]);
 return <canvas ref={canvasRef} className="lm-matrix-rain" data-intensity={intensity} aria-hidden="true"/>;
};
export default MatrixRain;
