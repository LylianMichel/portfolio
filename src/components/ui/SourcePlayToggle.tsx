import type { Experience } from "../../utils/creative";
export const SourcePlayToggle=({experience,onChange,variant="nav"}:{experience:Experience;onChange:(next:Experience)=>void;variant?:"nav"|"hero"})=><button
 type="button" className={`lm-sourceplay-toggle lm-sourceplay-${variant}`} aria-pressed={experience==="play"}
 aria-label={experience==="play"?"Revenir en mode SOURCE":"Activer le mode PLAY"}
 onClick={()=>onChange(experience==="play"?"source":"play")}>
 <span className={experience==="source"?"selected":""}>SOURCE</span><span aria-hidden="true" className="lm-switch-arrows">⇄</span><span className={experience==="play"?"selected":""}>PLAY</span>
 </button>;
