import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import { WorkContact } from "./sections/WorkContact";
import type { PortfolioMode, ThemeMode } from "./types";

const readModeFromLocation = (): PortfolioMode =>
  typeof window !== "undefined" && window.location.hash === "#chat" ? "chat" : "work";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem("portfolio-theme");
  return saved === "light" ? "light" : "dark";
};

const App = () => {
  const [mode, setMode] = useState<PortfolioMode>(readModeFromLocation);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "light" ? "#f2f1ed" : "#191919";
    }
  }, [theme]);

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
    document.title = mode === "chat" ? "Lylian Michel — Contact" : "Lylian Michel — Portfolio";
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
      <a href="#main-content" className="skip-link">Aller au contenu</a>

      <Navbar
        mode={mode}
        theme={theme}
        onModeChange={changeMode}
        onThemeChange={setTheme}
      />

      <main id="main-content" className="min-h-screen lg:pl-[252px]">
        {mode === "work" ? (
          <div className="work-view">
            <Hero />
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
