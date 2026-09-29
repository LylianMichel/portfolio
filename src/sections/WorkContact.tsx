import { ArrowRight, Linkedin, MessageCircle } from "lucide-react";
import { profile } from "../data/profile";

interface WorkContactProps {
  onOpenChat: () => void;
}

export const WorkContact = ({ onOpenChat }: WorkContactProps) => (
  <section className="content-shell pb-20 pt-16">
    <div className="mx-auto max-w-6xl">
      <div className="work-contact-card">
        <div>
          <p className="text-xs font-medium text-[var(--accent)]">Contact</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[var(--text)]">
            Tu veux me contacter ?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            Les liens utiles et les informations sur mon stage 2027 sont regroupés dans Chat.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onOpenChat} className="primary-action">
            <MessageCircle className="h-4 w-4" />
            Ouvrir Chat
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-action"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);
