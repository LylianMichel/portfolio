import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { profile } from "../data/profile";
import { ActionButton } from "../components/ui/ActionButton";
import { EmailCopy } from "../components/ui/EmailCopy";
import { MagneticAction } from "../components/ui/MagneticAction";
export const WorkContact=()=><section id="ecrire" aria-labelledby="work-contact-title" className="lm-section lm-shell lm-contact-final">
 <div className="lm-section-head"><div><span className="lm-kicker">05 / LA SUITE</span><h2 id="work-contact-title" className="lm-section-title"><span className="lm-title-word">On peut en</span><br/><em><span className="lm-title-word">discuter.</span></em></h2></div><p className="lm-section-summary">Je cherche un stage en développement de 8 semaines à partir du 12 avril 2027. Tu peux aussi m'écrire au sujet d'un de mes projets.</p></div>
 <div className="lm-final-body"><EmailCopy/><div className="lm-final-links"><ActionButton primary href={`mailto:${profile.email}`}>M'écrire <ArrowUpRight size={18} aria-hidden/></ActionButton><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Consulter GitHub de Lylian Michel"><Github size={18} aria-hidden/> GitHub <ArrowUpRight size={15} aria-hidden/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Consulter LinkedIn de Lylian Michel"><Linkedin size={18} aria-hidden/> LinkedIn <ArrowUpRight size={15} aria-hidden/></a></div></div>
 </section>;
