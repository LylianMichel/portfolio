interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-7 max-w-3xl">
    <p className="text-xs font-medium text-[var(--muted)]">{eyebrow}</p>
    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[var(--text)] sm:text-3xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
        {description}
      </p>
    ) : null}
  </div>
);
