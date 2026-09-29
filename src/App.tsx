import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";
import type { AccentTheme, PortfolioMode } from "./types";

const getInitialMode = (): PortfolioMode =>
  typeof window !== "undefined" && window.location.hash === "#chat" ? "chat" : "work";

const getInitialAccent = (): AccentTheme => {
  if (typeof window === "undefined") return "green";
  const saved = window.localStorage.getItem("portfolio-accent");
  return saved === "blue" || saved === "violet" || saved === "orange" || saved === "green"
    ? saved
    : "green";
};

const App = () => {
  const [mode, setMode] = useState<PortfolioMode>(getInitialMode);
  const [accent, setAccent] = useState<AccentTheme>(getInitialAccent);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    window.localStorage.setItem("portfolio-accent", accent);
  }, [accent]);

  const changeMode = (nextMode: PortfolioMode) => {
    setMode(nextMode);
    window.history.replaceState(null, "", nextMode === "chat" ? "#chat" : "#work");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-app min-h-screen">
        <Navbar
          mode={mode}
          accent={accent}
          onModeChange={changeMode}
          onAccentChange={setAccent}
        />

        <main className="min-h-screen lg:pl-[276px]">
          {mode === "work" ? (
            <div className="work-view">
              <Hero />
              <Projects />
              <Skills />
              <About />
              <Timeline />
            </div>
          ) : (
            <Contact onOpenWork={() => changeMode("work")} />
          )}
        </main>
      </div>
    </MotionConfig>
  );
};

export default App;
