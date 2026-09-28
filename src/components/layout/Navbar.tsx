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
  { id: "accueil", label: "Accueil", index: "01" },
  { id: "a-propos", label: "À propos", index: "02" },
  { id: "competences", label: "Compétences", index: "03" },
  { id: "projets", label: "Projets", index: "04" },
  { id: "parcours", label: "Parcours", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => links.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a
          href="#accueil"
          onClick={closeMenu}
          className="group flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span className="font-mono text-xs font-bold tracking-[-0.04em] text-[var(--accent)]">LM/26</span>
          <span className="hidden text-sm font-semibold tracking-tight text-[var(--text)] sm:inline">Lylian Michel</span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => {
            const active = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`group relative py-2 text-xs font-medium transition-colors ${
                  active ? "text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="mr-1.5 font-mono text-[10px] text-[var(--accent)]">{link.index}</span>
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-[13px] h-px origin-left bg-[var(--accent)] transition-transform ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
            className="grid h-9 w-9 place-items-center border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-9 w-9 place-items-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
            <div className="mx-auto grid max-w-7xl px-5 py-3 sm:px-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  className="flex items-center gap-4 border-b border-[var(--border)] py-3 text-sm text-[var(--text)] last:border-0"
                >
                  <span className="font-mono text-[10px] text-[var(--accent)]">{link.index}</span>
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
