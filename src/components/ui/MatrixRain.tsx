import { useEffect, useRef } from "react";
import { projects } from "../../data/projects";
import type { RainIntensity } from "../../utils/preferences";
import {rainShouldRun,rainQuality} from "../../utils/rainPolicy";
const chars="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ0123456789{}<>/;=#";
const technologies=[...new Set(projects.flatMap(p=>p.technologies))].filter(s=>["React","Prisma","Godot","TypeScript","Express"].includes(s));
const number=(max:number)=>Math.random()*max;
export const MatrixRain=({intensity}:{intensity:RainIntensity})=>{
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas||intensity==="off")return;
  const ctx=canvas.getContext("2d",{alpha:true});if(!ctx)return;
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  let reduced=preference.matches;
  const fine=matchMedia("(pointer:fine)").matches;
  let running=true,raf=0,timer=0,last=0,frames=0,total=0,columns=0,spacing=18,frozen=false;
  let positions:number[]=[],speeds:number[]=[],mouse={x:-1000,y:-1000},wave=-2000;
  const size=()=>{
   const width=innerWidth,height=innerHeight;
   const dpr=Math.min(devicePixelRatio||1,1.5);
   canvas.width=Math.ceil(width*dpr);canvas.height=Math.ceil(height*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);
   spacing=width<700?36:18;
   columns=Math.max(2,Math.floor(width/spacing));
   positions=Array.from({length:columns},()=>-number(height));
   speeds=Array.from({length:columns},()=>.5+number(1.4));
   ctx.clearRect(0,0,width,height);
  };
  const draw=(now:number)=>{
   const start=performance.now(),width=innerWidth,height=innerHeight;
   ctx.fillStyle="rgba(2,10,5,.26)";ctx.fillRect(0,0,width,height);
   const accent=getComputedStyle(document.documentElement).getPropertyValue("--lm-accent").trim()||"#00ff41";
   ctx.font="14px monospace";ctx.textAlign="center";
   for(let i=0;i<columns;i++){
    const x=i*spacing+spacing/2,y=positions[i]??0;
    const near=fine?Math.max(0,1-Math.abs(x-mouse.x)/140):0;
    const pulse=now-wave<900&&now-wave>=0?Math.max(0,1-Math.abs(x-(now-wave)*width/900)/70):0;
    const force=1+near*.7+pulse*.6;
    const glyph=Math.random()<.006&&technologies.length?technologies[Math.floor(number(technologies.length))]??"#":chars[Math.floor(number(chars.length))]??"0";
    ctx.globalAlpha=.48+near*.16;
    ctx.fillStyle=accent;ctx.fillText(glyph,x,y);
    ctx.globalAlpha=Math.min(.94,.73+near*.12+pulse*.12);
    ctx.fillStyle="#effff0";ctx.fillText(chars[Math.floor(number(chars.length))]??"1",x,y-16);
    positions[i]=(y+(speeds[i]??1)*6.3*force)>height+number(6)?-number(90):y+(speeds[i]??1)*6.3*force;
   }
   ctx.globalAlpha=1;
   frames++;total+=performance.now()-start;
   if(frames>=60){if(rainQuality(total/frames,columns)!=="keep"){if(rainQuality(total/frames,columns)==="halve"){columns=Math.ceil(columns/2);spacing=width/columns;positions=positions.filter((_,i)=>i%2===0);speeds=speeds.filter((_,i)=>i%2===0)}else frozen=true}frames=0;total=0}
  };
  const loop=(now:number)=>{if(!running||!rainShouldRun(document.hidden,reduced,frozen))return;if(now-last>=34){draw(now);last=now}raf=requestAnimationFrame(loop)};
  const resume=()=>{cancelAnimationFrame(raf);if(running&&rainShouldRun(document.hidden,reduced,frozen)){last=0;raf=requestAnimationFrame(loop)}};
  const visibility=()=>{if(document.hidden)cancelAnimationFrame(raf);else resume()};
  const onReduce=()=>{reduced=preference.matches;cancelAnimationFrame(raf);if(reduced){size();draw(0)}else resume()};
  const pointer=(event:MouseEvent)=>{if(fine)mouse={x:event.clientX,y:event.clientY}};
  const changeWave=()=>{wave=performance.now()};
  const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(()=>{size();if(reduced)draw(0)}):null;
  const init=()=>{if(!running)return;size();observer?.observe(document.documentElement);
   addEventListener("resize",size);document.addEventListener("visibilitychange",visibility);preference.addEventListener("change",onReduce);
   if(fine){window.addEventListener("pointermove",pointer,{passive:true});window.addEventListener("matrix-wave",changeWave)}
   if(reduced)draw(0);else resume();
  };
  const deferred=()=>{timer=window.setTimeout(init,350)};
  if(document.readyState==="complete")deferred();else window.addEventListener("load",deferred,{once:true});
  return()=>{running=false;clearTimeout(timer);cancelAnimationFrame(raf);observer?.disconnect();
   window.removeEventListener("load",deferred);window.removeEventListener("resize",size);
   document.removeEventListener("visibilitychange",visibility);preference.removeEventListener("change",onReduce);
   window.removeEventListener("pointermove",pointer);window.removeEventListener("matrix-wave",changeWave);
   ctx.clearRect(0,0,canvas.width,canvas.height);
  };
 },[intensity]);
 return <canvas ref={ref} className="lm-matrix-rain" data-intensity={intensity} aria-hidden="true"/>;
};
export default MatrixRain;
