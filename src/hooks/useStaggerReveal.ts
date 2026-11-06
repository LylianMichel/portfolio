import { useEffect, type RefObject } from "react";

/**
 * Fait apparaître en cascade (une seule fois) les éléments situés sous la ligne de flottaison.
 * - Ne cache rien avant l'hydratation : le contenu reste visible sans JS et au premier rendu.
 * - Ignore les éléments déjà visibles, pour ne pas retarder le LCP.
 * - Désactivé avec prefers-reduced-motion.
 */
export const useStaggerReveal = (root: RefObject<HTMLElement | null>, selector: string) => {
  useEffect(() => {
    const host = root.current;
    if (!host || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(host.querySelectorAll<HTMLElement>(selector)).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    if (!items.length) return;
    items.forEach((el) => el.classList.add("lm-stagger"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const position = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
        el.style.transitionDelay = `${Math.min(position, 6) * 70}ms`;
        el.classList.add("lm-stagger-in");
        observer.unobserve(el);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      items.forEach((el) => { el.classList.remove("lm-stagger", "lm-stagger-in"); el.style.removeProperty("transition-delay"); });
    };
  }, [root, selector]);
};
