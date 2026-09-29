import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal } from "../components/ui/Reveal";

const hasEmail = Boolean(profile.email);
const hasLinkedIn = Boolean(profile.linkedin);

export const Contact = () => (
  <section id="contact" className="px-3 py-10 sm:px-5 sm:py-16">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="panel-raised relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="kicker text-[11px] font-semibold text-[var(--accent)]">05 / Contact</p>
              <h2 className="editorial-serif mt-5 max-w-4xl text-balance text-4xl leading-[0.98] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Un projet, un stage ou simplement envie d'échanger ?
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
                Mes projets sont publics sur GitHub. Je suis également ouvert aux échanges autour du développement web, logiciel et jeu vidéo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page-bg)] transition hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {hasLinkedIn ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              ) : null}

              {hasEmail ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold"
                >
                  <Mail className="h-4 w-4" />
                  E-mail
                </a>
              ) : null}
            </div>
          </div>

          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[rgba(var(--accent-rgb),0.35)]"
            aria-hidden="true"
          />
        </div>
      </Reveal>
    </div>
  </section>
);
