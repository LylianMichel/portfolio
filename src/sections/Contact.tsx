import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { profile } from "../data/profile";

interface ContactProps {
  onOpenWork: () => void;
}

export const Contact = ({ onOpenWork }: ContactProps) => (
  <section className="chat-view min-h-screen pt-20 sm:pt-24 lg:pt-0">
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-7 sm:px-6 lg:py-10">
      <div className="chat-header">
        <div className="flex items-center gap-3">
          <div className="assistant-avatar"><Sparkles className="h-4 w-4" /></div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Chat</p>
            <h1 className="mt-0.5 text-lg font-semibold text-[var(--text)]">Me contacter</h1>
            <p className="mt-0.5 text-xs text-[var(--muted)]">E-mail, LinkedIn, GitHub et informations sur mon stage</p>
          </div>
        </div>
        <span className="availability-badge"><span className="status-dot" />Stage 2027</span>
      </div>

      <div className="chat-thread flex-1 space-y-6 py-7">
        <div className="chat-row chat-row-assistant"><div className="assistant-avatar shrink-0">LM</div><div className="chat-answer"><p>Salut. Si tu veux me contacter ou regarder mon travail, tout est regroupé ici.</p></div></div>
        <div className="chat-row chat-row-user"><div className="user-bubble">Comment je peux te contacter ?</div></div>

        <div className="chat-row chat-row-assistant">
          <div className="assistant-avatar shrink-0">LM</div>
          <div className="chat-answer w-full">
            <p>Le plus simple est de m'envoyer un mail. Pour un échange professionnel, tu peux aussi passer par LinkedIn.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${profile.email}`} className="contact-card contact-card-primary"><Mail className="h-4 w-4" /><span><span className="block text-[11px] text-[var(--muted)]">E-mail</span><span className="mt-1 block text-sm font-medium text-[var(--text)]">{profile.email}</span></span><ExternalLink className="ml-auto h-4 w-4 text-[var(--muted)]" /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card"><Linkedin className="h-4 w-4 text-[var(--accent)]" /><span><span className="block text-[11px] text-[var(--muted)]">LinkedIn</span><span className="mt-1 block text-sm font-medium text-[var(--text)]">Lylian Michel</span></span><ExternalLink className="ml-auto h-4 w-4 text-[var(--muted)]" /></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-card"><Github className="h-4 w-4 text-[var(--accent)]" /><span><span className="block text-[11px] text-[var(--muted)]">GitHub</span><span className="mt-1 block text-sm font-medium text-[var(--text)]">LylianMichel</span></span><ExternalLink className="ml-auto h-4 w-4 text-[var(--muted)]" /></a>
              <div className="contact-card"><MapPin className="h-4 w-4 text-[var(--accent)]" /><span><span className="block text-[11px] text-[var(--muted)]">Localisation</span><span className="mt-1 block text-sm font-medium text-[var(--text)]">{profile.location}</span></span></div>
            </div>
          </div>
        </div>

        <div className="chat-row chat-row-user"><div className="user-bubble">Tu cherches quoi pour 2027 ?</div></div>
        <div className="chat-row chat-row-assistant"><div className="assistant-avatar shrink-0">LM</div><div className="chat-answer"><p>Je recherche un stage de 8 semaines à partir du 12 avril 2027, de préférence sur un projet de développement où je peux travailler avec une équipe.</p></div></div>

        <div className="chat-row chat-row-user"><div className="user-bubble">Je veux voir tes projets.</div></div>
        <div className="chat-row chat-row-assistant">
          <div className="assistant-avatar shrink-0">LM</div>
          <div className="chat-answer">
            <p>Ils sont tous dans Work avec des captures, la stack utilisée et le lien vers le dépôt.</p>
            <button type="button" onClick={onOpenWork} className="chat-action"><ArrowLeft className="h-4 w-4" />Ouvrir Work<ArrowUpRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>

      <div className="chat-shortcuts">
        <span className="text-xs text-[var(--muted)]">Liens rapides</span>
        <div className="flex flex-wrap gap-1">
          <a href={`mailto:${profile.email}`} className="chat-shortcut">E-mail</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="chat-shortcut">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="chat-shortcut">GitHub</a>
        </div>
      </div>
    </div>
  </section>
);
