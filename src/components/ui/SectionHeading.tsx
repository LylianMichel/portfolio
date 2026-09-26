interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-10 max-w-3xl md:mb-14">
    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-cyan-500 dark:text-cyan-300">
      {eyebrow}
    </p>
    <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 max-w-2xl text-pretty leading-7 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    ) : null}
  </div>
);
