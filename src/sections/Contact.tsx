import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

interface ContactFields {
  name: string;
  email: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const initialFields: ContactFields = {
  name: "",
  email: "",
  message: "",
};

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
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
            eyebrow="05 / Contact"
            title="Un projet, un stage ou simplement envie d'échanger ?"
            description="Tu peux me contacter directement ou connecter ce formulaire à Formspree en ajoutant une seule variable d'environnement."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
          <Reveal className="glass-card p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Mes coordonnées</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Les liens ci-dessous sont centralisés dans <code className="font-mono text-xs">src/data/profile.ts</code>.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="contact-link"
              >
                <Mail className="h-4 w-4" />
                <span className="truncate">{profile.email}</span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/6 p-4">
              <p className="font-mono text-xs text-cyan-800 dark:text-cyan-300">
                contact.status = "open"
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Le formulaire n'affiche jamais un faux succès : il confirme uniquement après une vraie réponse du service configuré.
              </p>
            </div>
          </Reveal>

          <Reveal className="glass-card p-6 sm:p-7" delay={0.06}>
            <form onSubmit={handleSubmit} noValidate>
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  <Send className="h-4 w-4" />
                  {status === "sending" ? "Envoi..." : "Envoyer le message"}
                </button>

                <div className="min-h-6 text-sm" aria-live="polite">
                  {status === "success" ? <span className="text-emerald-600 dark:text-emerald-300">Message envoyé.</span> : null}
                  {status === "config" ? <span className="text-amber-600 dark:text-amber-300">Formulaire non connecté : configure VITE_FORMSPREE_ENDPOINT.</span> : null}
                  {status === "error" ? <span className="text-rose-600 dark:text-rose-300">Échec de l'envoi. Réessaie ou utilise l'e-mail direct.</span> : null}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
