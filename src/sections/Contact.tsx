import { ArrowLeft, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { ActionButton } from "../components/ui/ActionButton";
import { EmailCopy } from "../components/ui/EmailCopy";
import { MagneticAction } from "../components/ui/MagneticAction";
export const Contact=()=><section className="lm-section lm-shell lm-chat-page" aria-labelledby="contact-title">
 <a href="#work" className="lm-back"><ArrowLeft size={16} aria-hidden/> Retour au portfolio</a>
 <header className="lm-chat-title"><span className="lm-kicker">CHAT / CONTACT</span><h1 id="contact-title">Parlons<br/><em>projet.</em></h1><p>Un stage, une question technique, une idée ? Je suis joignable directement par e-mail ou LinkedIn.</p></header>
 <div className="lm-chat-grid"><div className="lm-chat-main"><h2>On peut en discuter.</h2><p>Je recherche un stage de <strong>8 semaines à partir du 12 avril 2027</strong>, en développement web ou logiciel.</p><EmailCopy/><div className="lm-chat-actions"><MagneticAction><ActionButton primary href={`mailto:${profile.email}`}><Mail size={17} aria-hidden/>M'écrire <ArrowUpRight size={17} aria-hidden/></ActionButton></MagneticAction><MagneticAction><ActionButton href={profile.cvUrl} download><Download size={17} aria-hidden/>CV · PDF ~100 Ko</ActionButton></MagneticAction></div></div>
  <aside className="lm-chat-aside"><span className="lm-kicker">COORDONNÉES</span><p>{profile.location}</p><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le profil GitHub de Lylian Michel"><Github size={18} aria-hidden/> GitHub <ArrowUpRight size={16} aria-hidden/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le profil LinkedIn de Lylian Michel"><Linkedin size={18} aria-hidden/> LinkedIn <ArrowUpRight size={16} aria-hidden/></a></aside>
 </div>
 </section>;
