import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import Activities from "./components/Activities";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";

import "./index.css";

function App() {
  return (
    <div className="app">

      <main className="main-content">

        {/* =====================================================
            HERO
        ===================================================== */}
        <section id="hero">
          <HeroSection />
        </section>


        {/* =====================================================
            ACTIVITIES
        ===================================================== */}
        <section id="activities">
          <Activities />
        </section>

        {/* =====================================================
            EXPERIENCE
        ===================================================== */}
        <section id="experience">
          <Experience />
        </section>

        {/* =====================================================
            PROJECTS
        ===================================================== */}
        <section id="projects">
          <Projects />
        </section>



        {/* =====================================================
            SKILLS
        ===================================================== */}
        <section id="skills">
          <Skills />
        </section>

        



        



        {/* =====================================================
            CONTACT
        ===================================================== */}
        <section id="contact">
          <Contact />
        </section>

      </main>

    </div>
  );
}

export default App;