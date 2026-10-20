import { useEffect, useState } from "react";
import { timeline } from "../data/timeline";
export const Timeline=()=>{
 const [active,setActive]=useState(0);
 useEffect(()=>{
  if(typeof IntersectionObserver==="undefined")return;
  const items=document.querySelectorAll<HTMLElement>(".lm-journey-item");
  const observer=new IntersectionObserver(()=>{
   const marker=window.innerHeight*.5;
   let nearest=0,closest=Number.POSITIVE_INFINITY;
   items.forEach((item,index)=>{
    const distance=Math.abs(item.getBoundingClientRect().top-marker);
    if(distance<closest){closest=distance;nearest=index;}
   });
   setActive(nearest);
  },{rootMargin:"-18% 0px -50% 0px",threshold:0});
  items.forEach(item=>observer.observe(item));
  return()=>observer.disconnect();
 },[]);
 return <section id="parcours" aria-labelledby="timeline-title" className="lm-section lm-shell lm-journey">
 <div className="lm-section-head"><div><span className="lm-kicker">04 / PARCOURS</span><h2 id="timeline-title" className="lm-section-title"><span className="lm-title-word">Mes étapes,</span><br/><span className="lm-title-word">mes projets.</span></h2></div><p className="lm-section-summary">De la formation aux projets personnels, et bientôt une première expérience en stage.</p></div>
 <div className="lm-journey-line" tabIndex={0} role="region" aria-label="Parcours, défilement horizontal sur grand écran">{timeline.map((item,index)=><article key={item.period+item.title} className={`lm-journey-item ${item.future?"lm-journey-future":""} ${index===active?"lm-journey-active":""}`} data-step={index}>
  <div className="lm-journey-date"><span className="lm-journey-node" aria-hidden/><span className="lm-kicker">{String(index+1).padStart(2,"0")} / {item.period}</span><small>{item.location}</small></div>
  <div><h3>{item.title}</h3><p>{item.description}</p><p className="lm-mono lm-journey-tags">{item.tags.join(" · ")}</p></div>
 </article>)}</div>
 </section>;
};
