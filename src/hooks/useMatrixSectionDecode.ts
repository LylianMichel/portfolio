import { useEffect } from "react";

// Only a CSS overlay is scrambled. React and assistive technology keep the original heading.
export const useMatrixSectionDecode=()=>{
 useEffect(()=>{
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const complete=new WeakSet<HTMLElement>();
  const timers=new Set<number>();
  const symbols="ｱｶｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789#{};";
  const headings=Array.from(document.querySelectorAll<HTMLElement>(".lm-section-title .lm-title-word"));
  const observer=typeof IntersectionObserver!=="undefined"?new IntersectionObserver(entries=>{
   if(document.documentElement.dataset.theme!=="matrix"||reduced.matches)return;
   for(const entry of entries){
    const el=entry.target as HTMLElement;
    if(!entry.isIntersecting||complete.has(el))continue;
    complete.add(el);
    const original=el.textContent??"";
    let step=0;
    const timer=window.setInterval(()=>{
     step++;
     if(step>=11){window.clearInterval(timer);timers.delete(timer);delete el.dataset.decoding;delete el.dataset.scramble;return}
     const ratio=step/10;
     const count=Math.floor(original.length*ratio);
     el.dataset.decoding="true";
     el.dataset.scramble=Array.from(original).map((ch,index)=>
      /[\s.!?'·]/.test(ch)||index<count?ch:symbols[Math.floor(Math.random()*symbols.length)]??ch
     ).join("");
    },65);
    timers.add(timer);
   }
  },{threshold:.28}):null;
  const sync=()=>{
   if(!observer)return;
   headings.forEach(el=>observer.unobserve(el));
   if(document.documentElement.dataset.theme==="matrix"&&!reduced.matches){
    headings.forEach(el=>{if(!complete.has(el))observer.observe(el)});
   }else{
    headings.forEach(el=>{delete el.dataset.scramble;delete el.dataset.decoding});
   }
  };
  const mutation=new MutationObserver(records=>{
   if(records.some(record=>record.attributeName==="data-theme"))sync();
  });
  mutation.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  reduced.addEventListener("change",sync);sync();
  return()=>{observer?.disconnect();mutation.disconnect();reduced.removeEventListener("change",sync);
   timers.forEach(timer=>clearInterval(timer));headings.forEach(el=>{delete el.dataset.decoding;delete el.dataset.scramble});
  };
 },[]);
};
