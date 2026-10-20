import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "../../data/profile";
import { copyEmail } from "../../utils/copyEmail";
const pieces = Array.from(profile.email);
export const EmailCopy=()=>{
 const [message,setMessage]=useState("");
 const [success,setSuccess]=useState(false);
 const [burst,setBurst]=useState(0);
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=root.current;
  if(!node||typeof IntersectionObserver==="undefined")return;
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){node.classList.add("lm-email-visible");observer.disconnect()}
  },{threshold:.15});
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 const handleCopy=async()=>{
  const copied=await copyEmail(profile.email,typeof navigator!=="undefined"?navigator.clipboard:undefined);
  setSuccess(copied);
  if(copied)setBurst(n=>n+1);
  setMessage(copied?"Adresse e-mail copiée.":"Copie impossible. Utilisez le lien e-mail.");
 };
 return <div className="lm-email-copy" ref={root}>
  <a className="lm-email-address" href={`mailto:${profile.email}`} aria-label={profile.email}>
   <span aria-hidden="true">{pieces.map((char,index)=><span key={index} className="lm-email-letter" style={{"--letter-delay":`${index*17}ms`} as CSSProperties}>{char}</span>)}</span>
  </a>
  <span className="lm-copy-action">
   <button type="button" onClick={handleCopy} aria-label="Copier l'adresse e-mail">{success?<Check size={17} aria-hidden/>:<Copy size={17} aria-hidden/>}Copier</button>
   {burst>0&&<svg key={burst} className="lm-copy-confetti" viewBox="0 0 80 80" aria-hidden="true" focusable="false">
    {Array.from({length:12},(_,i)=>{const angle=i*Math.PI/6;return <circle key={i} cx="40" cy="40" r={i%3===0?2.2:1.5} fill={i%2?"var(--lm-pair)":"var(--lm-accent)"} style={{"--dx":`${Math.round(Math.cos(angle)*32)}px`,"--dy":`${Math.round(Math.sin(angle)*32)}px`,"--delay":`${i*14}ms`} as CSSProperties}/>})}
   </svg>}
  </span>
  <span className="lm-copy-feedback" role="status" aria-live="polite">{message}</span>
 </div>;
};