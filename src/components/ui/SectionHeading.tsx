interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="section-heading mb-8 max-w-3xl">
    <p className="section-eyebrow">{eyebrow}</p>
    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[var(--text)] sm:text-3xl">{title}</h2>
    {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">{description}</p> : null}
  </div>
);
