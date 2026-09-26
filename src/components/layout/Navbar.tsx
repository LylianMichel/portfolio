import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { Theme } from "../../hooks/useTheme";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const links = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
] as const;

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => links.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/8 dark:bg-[#070914]/80">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a
          href="#accueil"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          onClick={closeMenu}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 font-mono text-sm font-bold text-cyan-600 dark:text-cyan-300">
            LM
          </span>
          <span className="hidden text-sm font-semibold text-slate-950 sm:inline dark:text-white">
            Lylian Michel
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-slate-900 text-white dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden dark:border-white/8 dark:bg-[#090c1a]"
          >
            <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/6"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
