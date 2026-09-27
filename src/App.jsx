import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import Activities from "./components/Activities";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Blog from "./components/Blog";
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
            PROJECTS
        ===================================================== */}
        <section id="projects">
          <Projects />
        </section>

        {/* =====================================================
            ABOUT
        ===================================================== */}
        <section id="about">
          <About />
        </section>


        {/* =====================================================
            SKILLS
        ===================================================== */}
        <section id="skills">
          <Skills />
        </section>


        {/* =====================================================
            EXPERIENCE
        ===================================================== */}
        <section id="experience">
          <Experience />
        </section>


        {/* =====================================================
            ACHIEVEMENTS
        ===================================================== */}
        <section id="achievements">
          <Achievements />
        </section>


        {/* =====================================================
            BLOG
        ===================================================== */}
        <section id="blog">
          <Blog />
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