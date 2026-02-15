import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Education from "./components/Education";
import StarBackground from "./components/StarBackground";
import Certifications from "./components/Certifications";
import CurrentlyLearning from "./components/CurrentlyLearning";
import Footer from "./components/Footer";


export default function App() {
  return (
    <div className="relative text-white">
      <StarBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Education />  
        <Skills />
        <Projects />
        <Certifications/>
        <CurrentlyLearning/>
        <Contact />
        <Footer/>
      </div>
    </div>
  );
}
