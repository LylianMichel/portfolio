import { ExternalLink, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { profile } from "../data/profile";

const hasLinkedIn = Boolean(profile.linkedin);

export const Contact = () => (
  <section className="chat-view min-h-screen pt-20 sm:pt-24 lg:pt-0">
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8 flex items-center gap-3 border-b border-[var(--border)] pb-5">
        <div className="assistant-avatar">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-[var(--text)]">Chat avec le portfolio</h1>
          <p className="mt-0.5 text-xs text-[var(--muted)]">Contacts et informations rapides</p>
        </div>
      </div>

      <div className="flex-1 space-y-7">
        <div className="chat-row chat-row-assistant">
          <div className="assistant-avatar shrink-0">LM</div>
          <div className="chat-answer">
            <p>Salut. Ici tu peux trouver rapidement comment me contacter et où voir mon travail.</p>
          </div>
        </div>

        <div className="chat-row chat-row-user">
          <div className="user-bubble">Comment contacter Lylian ?</div>
        </div>

        <div className="chat-row chat-row-assistant">
          <div className="assistant-avatar shrink-0">LM</div>
          <div className="chat-answer w-full">
            <p>Le plus simple est l'e-mail. Tu peux aussi passer par GitHub pour voir mes projets et mon activité.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${profile.email}`} className="contact-card">
                <Mail className="h-4 w-4 text-[var(--accent)]" />
                <span>
                  <span className="block text-xs text-[var(--muted)]">E-mail</span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text)]">{profile.email}</span>
                </span>
                <ExternalLink className="ml-auto h-4 w-4 text-[var(--muted)]" />
              </a>

              <a href={profile.github} target="_blank" rel="noreferrer" className="contact-card">
                <Github className="h-4 w-4 text-[var(--accent)]" />
                <span>
                  <span className="block text-xs text-[var(--muted)]">GitHub</span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text)]">LylianMichel</span>
                </span>
                <ExternalLink className="ml-auto h-4 w-4 text-[var(--muted)]" />
              </a>

              {hasLinkedIn ? (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-card">
                  <Linkedin className="h-4 w-4 text-[var(--accent)]" />
                  <span>
                    <span className="block text-xs text-[var(--muted)]">LinkedIn</span>
                    <span className="mt-1 block text-sm font-medium text-[var(--text)]">Profil LinkedIn</span>
                  </span>
                  <ExternalLink className="ml-auto h-4 w-4 text-[var(--muted)]" />
                </a>
              ) : null}

              <div className="contact-card">
                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                <span>
                  <span className="block text-xs text-[var(--muted)]">Localisation</span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text)]">{profile.location}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-row chat-row-user">
          <div className="user-bubble">Quel type de profil ?</div>
        </div>

        <div className="chat-row chat-row-assistant">
          <div className="assistant-avatar shrink-0">LM</div>
          <div className="chat-answer">
            <p>
              Étudiant en BUT Informatique à l'IUT de Lens, avec des projets en React / Node.js, Laravel / PHP, SQL et Godot.
            </p>
          </div>
        </div>

        <div className="chat-row chat-row-user">
          <div className="user-bubble">Et pour voir les projets ?</div>
        </div>

        <div className="chat-row chat-row-assistant">
          <div className="assistant-avatar shrink-0">LM</div>
          <div className="chat-answer">
            <p>
              Utilise l'onglet <strong className="font-semibold text-[var(--text)]">Work</strong> dans la barre latérale. Les projets y sont présentés avec leurs vraies captures, la stack et les liens GitHub.
            </p>
          </div>
        </div>
      </div>

      <div className="chat-composer mt-10">
        <span className="text-sm text-[var(--muted)]">Portfolio statique — aucun message n'est envoyé depuis ce champ.</span>
        <Mail className="h-4 w-4 text-[var(--muted)]" />
      </div>
    </div>
  </section>
);
