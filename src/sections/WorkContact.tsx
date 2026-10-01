import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
export const WorkContact = () => (
  <section aria-labelledby="work-contact-title" className="content-shell pb-20 pt-16">
    <div className="mx-auto max-w-6xl work-contact-card">
      <div>
        <p className="section-eyebrow">Contact</p>
        <h2 id="work-contact-title" className="mt-2 text-2xl font-semibold tracking-tight">Un stage, un projet, une question ?</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Je recherche un stage de 8 semaines à partir du 12 avril 2027.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="primary-action">M’écrire<ArrowUpRight size={16} /></a>
        <a href="#contact" className="secondary-action">Mes coordonnées</a>
      </div>
    </div>
  </section>
);
