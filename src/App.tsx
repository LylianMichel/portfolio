import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import { WorkContact } from "./sections/WorkContact";
import { Portrait } from "./sections/Portrait";
import type { PortfolioMode, ThemeMode } from "./types";

const readModeFromLocation = (): PortfolioMode =>
  typeof window !== "undefined" && ["#contact", "#chat"].includes(window.location.hash) ? "contact" : "work";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  let saved: string | null = null;
  try { saved = window.localStorage.getItem("portfolio-theme"); } catch { /* Storage may be disabled. */ }
  return saved === "light" || saved === "medium" ? saved : "dark";
};

const App = () => {
  const [mode, setMode] = useState<PortfolioMode>("work");
  const [hash, setHash] = useState("");
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
    try { window.localStorage.setItem("portfolio-theme", theme); } catch { /* The theme still works without persistence. */ }

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "light" ? "#f2f1ed" : theme === "medium" ? "#555c58" : "#151516";
    }
  }, [theme]);

  useEffect(() => {
    const syncMode = () => { setMode(readModeFromLocation()); setHash(window.location.hash); };
    syncMode();
    window.addEventListener("hashchange", syncMode);
    window.addEventListener("popstate", syncMode);

    return () => {
      window.removeEventListener("hashchange", syncMode);
      window.removeEventListener("popstate", syncMode);
    };
  }, []);

  useEffect(() => {
    document.title = mode === "contact" ? "Lylian Michel — Contact" : "Lylian Michel — Développeur & étudiant en BUT Informatique";
  }, [mode]);

  useEffect(() => {
    if (!hash && window.location.hash) return;
    const targetId = hash.slice(1);
    const frame = requestAnimationFrame(() => {
      if (["contact", "chat", "work", ""].includes(targetId)) window.scrollTo({ top: 0, behavior: "instant" });
      else document.getElementById(targetId)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, mode]);

  const changeMode = (nextMode: PortfolioMode) => {
    setMode(nextMode);
    const nextHash = nextMode === "contact" ? "#contact" : "#work";

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }

    setHash(nextHash);
  };

  return (
    <div className="portfolio-app min-h-screen">
      <a href="#main-content" className="skip-link" onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Aller au contenu</a>

      <Navbar
        mode={mode}
        theme={theme}
        onModeChange={changeMode}
        onThemeChange={setTheme}
      />

      <main id="main-content" tabIndex={-1} className="min-h-screen lg:pl-[252px]">
        {mode === "work" ? (
          <div className="work-view">
            <Hero />
            <Projects />
            <Skills />
            <About />
            <Timeline />
            <Portrait />
            <WorkContact />
          </div>
        ) : (
          <Contact />
        )}
      </main>
    </div>
  );
};

export default App;
