interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-10 max-w-4xl md:mb-14">
    <p className="kicker mb-4 text-[11px] font-semibold text-[var(--accent)]">{eyebrow}</p>
    <h2 className="editorial-serif text-balance text-4xl leading-[0.98] font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-5xl lg:text-6xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
        {description}
      </p>
    ) : null}
  </div>
);
