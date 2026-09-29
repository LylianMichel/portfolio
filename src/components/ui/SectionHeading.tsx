interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-10 max-w-3xl md:mb-12">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{eyebrow}</p>
    <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-[var(--text)] sm:text-4xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 max-w-2xl text-pretty leading-7 text-[var(--muted)]">{description}</p>
    ) : null}
  </div>
);
