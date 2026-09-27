
import "./Projects.css";

function Projects() {
  return (
    <section className="projects-section">
      <div className="projects-header">
        <div>
          <p className="section-label">MY WORK</p>
          <h1>Featured Projects</h1>
          <p className="section-description">
            A collection of projects I have built while
            learning and exploring new technologies.
          </p>
        </div>
      </div>

      <div className="projects-grid">
        <div className="project-card">
          <h2>Watch Party</h2>
          <p>
            A video streaming platform to watch videos
            together with friends.
          </p>

          <div className="project-tags">
            <span>React</span>
            <span>Node.js</span>
            <span>MySQL</span>
          </div>
        </div>

        <div className="project-card">
          <h2>Doctor Appointment Booking</h2>
          <p>
            A modern appointment booking system with
            a clean and responsive interface.
          </p>

          <div className="project-tags">
            <span>React</span>
            <span>Tailwind</span>
            <span>Node.js</span>
          </div>
        </div>

        <div className="project-card">
          <h2>WebCrawler / Search Engine</h2>
          <p>
            A C++ web crawler and search engine with
            custom indexing and browser automation.
          </p>

          <div className="project-tags">
            <span>C++</span>
            <span>libcurl</span>
            <span>WebSocket</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;