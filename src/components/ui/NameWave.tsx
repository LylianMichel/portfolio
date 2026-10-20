import { useEffect, useRef, type PointerEvent, type CSSProperties } from "react";
type Props = { text:string; className:string; light?:boolean };
export const NameWave=({text,className,light=false}:Props)=>{
 const line=useRef<HTMLSpanElement>(null);
 const frame=useRef<number|null>(null);
 const pointer=useRef<{x:number;y:number}|null>(null);
 const decoded=useRef(false);
 useEffect(()=>()=>{if(frame.current!==null)cancelAnimationFrame(frame.current)},[]);
 useEffect(()=>{
  let timer=0,step=0;
  const original=Array.from(text);
  const alphabet="ｱｲｳｴｵｶｷｸｹｺ0123456789{}<>";
  const elements=()=>Array.from(line.current?.querySelectorAll<HTMLElement>(".lm-letter")??[]);
  const resetText=()=>{elements().forEach((element,index)=>{element.textContent=original[index]??""})};
  const decode=()=>{
   window.clearInterval(timer);resetText();
   if(decoded.current||document.documentElement.dataset.theme!=="matrix"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   decoded.current=true;
   step=0;
   timer=window.setInterval(()=>{
    step++;
    elements().forEach((element,index)=>{
      const real=original[index]??"";
      element.textContent=step>=10||index<Math.floor(step/10*original.length)||real==="."?real:alphabet[Math.floor(Math.random()*alphabet.length)]??real;
    });
    if(step>=10){window.clearInterval(timer);resetText()}
   },65);
  };
  const observer=new MutationObserver(records=>{if(records.some(r=>r.attributeName==="data-theme"))decode()});
  observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  decode();
  return()=>{observer.disconnect();window.clearInterval(timer);resetText()};
 },[text]);
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