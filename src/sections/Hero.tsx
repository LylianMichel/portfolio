import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces, Code2, Github } from "lucide-react";
import { profile } from "../data/profile";

export const Hero = () => (
  <section id="accueil" className="relative overflow-hidden pt-16">
    <div className="hero-orb hero-orb-one" aria-hidden="true" />
    <div className="hero-orb hero-orb-two" aria-hidden="true" />
    <div className="absolute inset-0 tech-grid opacity-30 dark:opacity-35" aria-hidden="true" />

    <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/22 bg-cyan-500/8 px-3 py-1.5 font-mono text-xs text-cyan-700 dark:text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300" />
          Disponible pour de nouveaux projets
        </div>

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Bonjour, je suis
        </p>

        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
          Lylian <span className="text-gradient">Michel</span>
        </h1>

        <p className="mt-5 text-xl font-medium text-slate-700 sm:text-2xl dark:text-slate-300">
          {profile.role}
        </p>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
          {profile.tagline} J'aime transformer une idée en projet concret, avec une interface claire et une base technique solide.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Voir mes projets
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Me contacter
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950 dark:text-slate-500 dark:hover:text-white"
        >
          <Github className="h-4 w-4" />
          github.com/LylianMichel
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        className="mx-auto w-full max-w-xl lg:mx-0"
      >
        <div className="relative rounded-[1.75rem] border border-slate-200 bg-white/75 p-3 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_40px_120px_-60px_rgba(34,211,238,0.2)]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfcff] dark:border-white/8 dark:bg-[#080b18]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/8">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[11px] text-slate-400">portfolio.tsx</span>
              <Braces className="h-4 w-4 text-slate-400" />
            </div>

            <div className="space-y-1 overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6">
              <p><span className="text-violet-600 dark:text-violet-300">const</span> <span className="text-blue-600 dark:text-blue-300">developer</span> = &#123;</p>
              <p className="pl-5"><span className="text-cyan-700 dark:text-cyan-300">name</span>: <span className="text-emerald-700 dark:text-emerald-300">"Lylian Michel"</span>,</p>
              <p className="pl-5"><span className="text-cyan-700 dark:text-cyan-300">focus</span>: [</p>
              <p className="pl-10"><span className="text-emerald-700 dark:text-emerald-300">"Web"</span>, <span className="text-emerald-700 dark:text-emerald-300">"Java"</span>, <span className="text-emerald-700 dark:text-emerald-300">"Game Dev"</span>,</p>
              <p className="pl-5">],</p>
              <p className="pl-5"><span className="text-cyan-700 dark:text-cyan-300">mindset</span>: <span className="text-emerald-700 dark:text-emerald-300">"build → test → improve"</span>,</p>
              <p>&#125;;</p>
              <p className="pt-3 text-slate-400">// apprendre en construisant</p>
              <p><span className="text-violet-600 dark:text-violet-300">export default</span> developer;</p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex dark:border-white/10 dark:bg-[#0b1022]">
            <Code2 className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Code propre</p>
              <p className="text-[11px] text-slate-500">Typé · modulaire · maintenable</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
