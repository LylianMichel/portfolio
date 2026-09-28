interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-12 grid gap-5 border-t border-[var(--border)] pt-5 md:mb-16 md:grid-cols-[10rem_1fr]">
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
      {eyebrow}
    </p>
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)] lg:items-end">
      <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-pretty text-sm leading-6 text-[var(--muted)] lg:justify-self-end">
          {description}
        </p>
      ) : null}
    </div>
  </div>
);
