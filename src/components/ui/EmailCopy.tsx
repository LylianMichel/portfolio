import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "../../data/profile";
import { copyEmail } from "../../utils/copyEmail";
export const EmailCopy=()=>{
 const [message,setMessage]=useState("");
 const [success,setSuccess]=useState(false);
 const handleCopy=async()=>{
  const copied=await copyEmail(profile.email,typeof navigator!=="undefined"?navigator.clipboard:undefined);
  setSuccess(copied);
  setMessage(copied?"Adresse e-mail copiée.":"Copie impossible. Utilisez le lien e-mail.");
 };
 return <div className="lm-email-copy"><a className="lm-email-address" href={`mailto:${profile.email}`}>{profile.email}</a>
  <button type="button" onClick={handleCopy} aria-label="Copier l'adresse e-mail">{success?<Check size={17} aria-hidden/>:<Copy size={17} aria-hidden/>}Copier</button>
  <span className="lm-copy-feedback" role="status" aria-live="polite">{message}</span>
 </div>;
};
