import { useEffect, useRef, type PointerEvent, type CSSProperties } from "react";
type Props = { text:string; className:string; light?:boolean };
export const NameWave=({text,className,light=false}:Props)=>{
 const line=useRef<HTMLSpanElement>(null);
 const frame=useRef<number|null>(null);
 const pointer=useRef<{x:number;y:number}|null>(null);
 useEffect(()=>()=>{if(frame.current!==null)cancelAnimationFrame(frame.current)},[]);
 const draw=()=>{
  frame.current=null;
  if(!line.current||!pointer.current)return;
  const pos=pointer.current;
  line.current.querySelectorAll<HTMLElement>(".lm-letter").forEach(letter=>{
   const box=letter.getBoundingClientRect();
   const energy=Math.max(0,1-Math.hypot(pos.x-box.left-box.width/2,pos.y-box.top-box.height/2)/145);
   letter.style.setProperty("--letter-weight",String(Math.round((light?320:620)+energy*(light?420:180))));
   letter.style.setProperty("--letter-rise",`${(-3*energy).toFixed(2)}px`);
  });
 };
 const move=(event:PointerEvent<HTMLSpanElement>)=>{
  if(event.pointerType!=="mouse"||!window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)").matches)return;
  pointer.current={x:event.clientX,y:event.clientY};
  if(frame.current===null)frame.current=requestAnimationFrame(draw);
 };
 const reset=()=>{
  pointer.current=null;
  if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null}
  line.current?.querySelectorAll<HTMLElement>(".lm-letter").forEach(letter=>{
   letter.style.removeProperty("--letter-weight");letter.style.removeProperty("--letter-rise");
  });
 };
 return <span ref={line} className={`lm-name-line ${className}`} aria-hidden="true" onPointerMove={move} onPointerLeave={reset}>
  {Array.from(text).map((letter,index)=><span key={index} className={letter==="."?"lm-letter lm-name-period":"lm-letter"} style={{"--letter-index":index} as CSSProperties}>{letter}</span>)}
 </span>;
};