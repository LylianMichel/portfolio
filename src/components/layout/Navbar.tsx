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
  { id: "projets", label: "Projets" },
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
] as const;

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => links.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--page-bg)]">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a
          href="#accueil"
          className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          onClick={closeMenu}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-bold text-[var(--text)]">
            LM
          </span>
          <span className="hidden text-sm font-semibold text-[var(--text)] sm:inline">Lylian Michel</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--surface)] text-[var(--text)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
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
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden"
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
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--page-bg)] lg:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-1 px-5 py-4 sm:px-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
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
