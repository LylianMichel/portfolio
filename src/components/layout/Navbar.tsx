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
  { id: "competences", label: "Compétences" },
  { id: "a-propos", label: "À propos" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
] as const;

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => links.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className="panel mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-3 backdrop-blur-xl sm:px-4"
        aria-label="Navigation principale"
      >
        <a
          href="#accueil"
          className="flex items-center gap-3 rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          onClick={closeMenu}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] text-xs font-bold tracking-[0.18em] text-[var(--accent)]">
            LM
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold leading-none">Lylian Michel</span>
            <span className="mt-1 block text-[11px] text-[var(--muted)]">BUT Informatique</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const active = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  active
                    ? "bg-[var(--text)] text-[var(--page-bg)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
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
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="panel mx-auto mt-2 max-w-7xl rounded-2xl p-2 backdrop-blur-xl xl:hidden"
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
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
