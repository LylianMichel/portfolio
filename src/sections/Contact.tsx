import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const hasEmail = Boolean(profile.email && !profile.email.includes("example.com"));
const hasLinkedIn = Boolean(profile.linkedin && !profile.linkedin.includes("ton-profil"));

export const Contact = () => (
  <section id="contact" className="section-shell">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="05 / Contact"
          title="Un projet, un stage ou simplement envie d'échanger ?"
          description="Retrouvez mes projets publics, leur code et leur historique directement sur GitHub."
        />
      </Reveal>

      <Reveal>
        <div className="flex flex-col justify-between gap-8 border-y border-[var(--border)] py-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
            Je suis toujours intéressé par les retours sur mes projets et les échanges autour du développement web, logiciel et jeu vidéo.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link">
              <Github className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {hasLinkedIn ? (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}

            {hasEmail ? (
              <a href={`mailto:${profile.email}`} className="contact-link">
                <Mail className="h-4 w-4" />
                E-mail
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
