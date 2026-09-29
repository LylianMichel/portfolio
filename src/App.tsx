import { MotionConfig } from "framer-motion";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { useTheme } from "./hooks/useTheme";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Timeline } from "./sections/Timeline";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell min-h-screen text-[var(--text)]">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default App;
