import { ArrowLeft, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";

export const Contact = () => (
  <section className="content-shell contact-page pt-24 pb-16 sm:pt-28 lg:pt-12">
    <div className="mx-auto max-w-3xl">
      <a href="#work" className="contact-back"><ArrowLeft size={16} />Retour au portfolio</a>
      <header className="conversation-header mt-8">
        <div><p className="section-eyebrow">Contact</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Une question ? Parlons-en.</h1></div>
        <a href={`mailto:${profile.email}`} className="secondary-action"><Mail size={16} />M’écrire</a>
      </header>
      <div className="contact-conversation mt-8" aria-label="Informations de contact sous forme de conversation">
        <div className="conversation-message"><span className="conversation-author">Lylian</span><p>Bonjour ! Je suis étudiant en BUT Informatique à l’IUT de Lens. Voici mes coordonnées et les informations utiles pour mon stage.</p></div>
        <div className="conversation-question"><p>Comment vous contacter ?</p></div>
        <div className="conversation-message"><span className="conversation-author">Lylian</span><p>Le plus simple est de m’envoyer un mail. Vous pouvez aussi me retrouver sur LinkedIn.</p>
          <div className="conversation-links mt-4">
            <a href={`mailto:${profile.email}`} className="contact-card"><Mail size={18} /><span><span className="block text-xs text-[var(--muted)]">E-mail</span><span className="block mt-1">{profile.email}</span></span><ArrowUpRight size={16} /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card"><Linkedin size={18} /><span>LinkedIn · Lylian Michel</span><ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="conversation-question"><p>Quel stage recherchez-vous ?</p></div>
        <div className="conversation-message"><span className="conversation-author">Lylian</span><p>Je recherche un stage de <strong>8 semaines à partir du 12 avril 2027</strong>, en développement web ou logiciel. J’aimerais rejoindre une équipe et contribuer à une application.</p><p className="mt-3 text-[var(--muted)]">{profile.location}</p></div>
        <div className="conversation-question"><p>Où trouver votre CV et vos projets ?</p></div>
        <div className="conversation-message"><span className="conversation-author">Lylian</span><p>Mon CV est disponible ici. Mes réalisations sont présentées dans le portfolio, avec les captures et le code sur GitHub.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {profile.cvUrl ? <a href={profile.cvUrl} download className="primary-action"><Download size={16} />Télécharger mon CV</a> : null}
            <a href="#projets" className="secondary-action">Voir mes projets<ArrowUpRight size={16} /></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="secondary-action"><Github size={16} />GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
