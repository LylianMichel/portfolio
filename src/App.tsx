import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import { WorkContact } from "./sections/WorkContact";
import type { PortfolioMode } from "./types";

const readModeFromLocation = (): PortfolioMode =>
  typeof window !== "undefined" && window.location.hash === "#chat" ? "chat" : "work";

const getInitialBrightness = () => {
  if (typeof window === "undefined") return 100;

  const saved = Number(window.localStorage.getItem("portfolio-brightness"));
  const allowed = [80, 90, 100, 110, 120];

  return allowed.includes(saved) ? saved : 100;
};

const App = () => {
  const [mode, setMode] = useState<PortfolioMode>(readModeFromLocation);
  const [brightness, setBrightness] = useState(getInitialBrightness);

  useEffect(() => {
    document.documentElement.dataset.brightness = String(brightness);
    window.localStorage.setItem("portfolio-brightness", String(brightness));
  }, [brightness]);

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
        brightness={brightness}
        onModeChange={changeMode}
        onBrightnessChange={setBrightness}
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
