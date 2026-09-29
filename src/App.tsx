import { useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import { WorkContact } from "./sections/WorkContact";
import type { AccentTheme, ColorMode, PortfolioMode } from "./types";

const readModeFromLocation = (): PortfolioMode =>
  typeof window !== "undefined" && window.location.hash === "#chat" ? "chat" : "work";

const getInitialAccent = (): AccentTheme => {
  if (typeof window === "undefined") return "green";
  const saved = window.localStorage.getItem("portfolio-accent");

  return saved === "blue" || saved === "violet" || saved === "orange" || saved === "green"
    ? saved
    : "green";
};

const getInitialColorMode = (): ColorMode => {
  if (typeof window === "undefined") return "system";
  const saved = window.localStorage.getItem("portfolio-color-mode");

  return saved === "light" || saved === "dark" || saved === "system"
    ? saved
    : "system";
};

const App = () => {
  const [mode, setMode] = useState<PortfolioMode>(readModeFromLocation);
  const [accent, setAccent] = useState<AccentTheme>(getInitialAccent);
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);
  const mediaQuery = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null),
    []
  );

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    window.localStorage.setItem("portfolio-accent", accent);
  }, [accent]);

  useEffect(() => {
    const applyTheme = () => {
      const resolvedTheme =
        colorMode === "system"
          ? mediaQuery?.matches
            ? "dark"
            : "light"
          : colorMode;

      document.documentElement.dataset.theme = resolvedTheme;
      window.localStorage.setItem("portfolio-color-mode", colorMode);

      const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (themeColor) {
        themeColor.content = resolvedTheme === "dark" ? "#191919" : "#f4f5f7";
      }
    };

    applyTheme();

    if (colorMode !== "system" || !mediaQuery) return undefined;

    mediaQuery.addEventListener("change", applyTheme);
    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [colorMode, mediaQuery]);

  useEffect(() => {
    const syncMode = () => setMode(readModeFromLocation());

    window.addEventListener("hashchange", syncMode);
    window.addEventListener("popstate", syncMode);

    return () => {
      window.removeEventListener("hashchange", syncMode);
      window.removeEventListener("popstate", syncMode);
    };
  }, []);

  useEffect(() => {
    document.title =
      mode === "chat"
        ? "Lylian Michel — Contact"
        : "Lylian Michel — Développeur & étudiant en BUT Informatique";
  }, [mode]);

  const changeMode = (nextMode: PortfolioMode) => {
    setMode(nextMode);

    const nextHash = nextMode === "chat" ? "#chat" : "#work";
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="portfolio-app min-h-screen">
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>

      <Navbar
        mode={mode}
        accent={accent}
        colorMode={colorMode}
        onModeChange={changeMode}
        onAccentChange={setAccent}
        onColorModeChange={setColorMode}
      />

      <main id="main-content" className="min-h-screen lg:pl-[252px]">
        {mode === "work" ? (
          <div className="work-view">
            <Hero onOpenChat={() => changeMode("chat")} />
            <Projects />
            <Skills />
            <About />
            <Timeline />
            <WorkContact onOpenChat={() => changeMode("chat")} />
          </div>
        ) : (
          <Contact onOpenWork={() => changeMode("work")} />
        )}
      </main>
    </div>
  );
};

export default App;
