import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

interface ContactFields {
  name: string;
  email: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const initialFields: ContactFields = { name: "", email: "", message: "" };

const validate = (fields: ContactFields): ContactErrors => {
  const errors: ContactErrors = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Indique au moins 2 caractères.";
  }

  if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) {
    errors.email = "Entre une adresse e-mail valide.";
  }

  if (fields.message.trim().length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères.";
  }

  return errors;
};

export const Contact = () => {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "config" | "error">("idle");

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
    if (!endpoint) {
      setStatus("config");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error("Formspree a retourné une erreur.");
      }

      setFields(initialFields);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="06 / Contact"
            title="Une question, un stage, un projet ? Écrivez-moi."
            description="Le formulaire peut être relié à Formspree. Sans endpoint configuré, le site l'indique clairement au lieu de simuler un envoi."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">Contact direct</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex max-w-full items-center gap-2 break-all text-2xl font-semibold tracking-[-0.03em] text-[var(--text)] underline decoration-[var(--accent)] decoration-1 underline-offset-8 sm:text-3xl"
            >
              {profile.email}
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            </a>

            <div className="mt-10 border-t border-[var(--border)]">
              <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link">
                <span className="inline-flex items-center gap-3"><Github className="h-4 w-4" /> GitHub</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                <span className="inline-flex items-center gap-3"><Linkedin className="h-4 w-4" /> LinkedIn</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${profile.email}`} className="contact-link">
                <span className="inline-flex items-center gap-3"><Mail className="h-4 w-4" /> E-mail</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-7 max-w-sm text-sm leading-6 text-[var(--muted)]">
              Je recherche notamment un stage de 8 semaines à partir du 12 avril 2027 dans le développement informatique.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <form onSubmit={handleSubmit} noValidate className="editorial-card p-5 sm:p-7">
              <div className="mb-7 flex items-center justify-between border-b border-[var(--border)] pb-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent)]">message.new</p>
                <span className="font-mono text-[10px] text-[var(--muted)]">01 / 01</span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-field">
                  <span>Nom</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Votre nom"
                  />
                  {errors.name ? <small id="name-error">{errors.name}</small> : null}
                </label>

                <label className="form-field">
                  <span>Adresse e-mail</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updateField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="vous@exemple.fr"
                  />
                  {errors.email ? <small id="email-error">{errors.email}</small> : null}
                </label>
              </div>

              <label className="form-field mt-5">
                <span>Message</span>
                <textarea
                  rows={7}
                  value={fields.message}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Parlez-moi de votre projet ou de votre besoin..."
                />
                {errors.message ? <small id="message-error">{errors.message}</small> : null}
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page-bg)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Send className="h-4 w-4" />
                  {status === "sending" ? "Envoi..." : "Envoyer le message"}
                </button>

                <div className="min-h-6 text-xs text-[var(--muted)]" aria-live="polite">
                  {status === "success" ? <span>Message envoyé.</span> : null}
                  {status === "config" ? <span>Formulaire non connecté : configure VITE_FORMSPREE_ENDPOINT.</span> : null}
                  {status === "error" ? <span>Échec de l'envoi. Utilise l'e-mail direct.</span> : null}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
