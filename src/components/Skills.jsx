import React, { useMemo, useState } from "react";
import "./Skills.css";

const skills = [
  { name: "C++", group: "Programming", logo: "cplusplus", note: "Systems & problem solving", color: "#79a9ff" },
  { name: "Java", group: "Programming", logo: "java", note: "OOP & application development", color: "#ffad70" },
  { name: "JavaScript", group: "Programming", logo: "javascript", note: "Interactive web applications", color: "#f5d86a" },
  { name: "SQL", group: "Programming", logo: "azuresqldatabase", note: "Queries & relational data", color: "#76c8e9" },
  { name: "HTML5", group: "Frontend", logo: "html5", note: "Semantic page structure", color: "#ff906d" },
  { name: "CSS3", group: "Frontend", logo: "css3", note: "Responsive visual systems", color: "#78a8ff" },
  { name: "React", group: "Frontend", logo: "react", note: "Component-driven interfaces", color: "#72e2f2" },
  { name: "Vite", group: "Frontend", logo: "vitejs", note: "Modern frontend tooling", color: "#b8a0ff" },
  { name: "Tailwind CSS", group: "Frontend", logo: "tailwindcss", note: "Utility-first styling", color: "#72e2d2" },
  { name: "React Router", group: "Frontend", logo: "reactrouter", note: "Client-side navigation", color: "#f18c9b" },
  { name: "Recharts", group: "Frontend", logo: "recharts", note: "Data visualization", color: "#c6f07b" },
  { name: "Node.js", group: "Backend", logo: "nodejs", note: "Server-side JavaScript", color: "#a7e36c" },
  { name: "Express.js", group: "Backend", logo: "express", note: "REST API development", color: "#d5e0d9" },
  { name: "REST APIs", group: "Backend", logo: "fastapi", note: "Service integration", color: "#83d9bd" },
  { name: "WebSockets", group: "Backend", logo: "socketio", note: "Real-time communication", color: "#d9e5df" },
  { name: "Authentication", group: "Backend", logo: "auth0", note: "Protected application flows", color: "#d1a6ff" },
  { name: "MySQL", group: "Databases", logo: "mysql", note: "Relational database design", color: "#79b9e8" },
  { name: "SQLite", group: "Databases", logo: "sqlite", note: "Lightweight data storage", color: "#83c8f1" },
  { name: "Git", group: "Tools", logo: "git", note: "Version control workflows", color: "#ff997b" },
  { name: "GitHub", group: "Tools", logo: "github", note: "Repositories & collaboration", color: "#e4ece7" },
  { name: "CMake", group: "Systems", logo: "cmake", note: "C++ build configuration", color: "#9dc4ff" },
  { name: "GoogleTest", group: "Systems", logo: "googletest", note: "C++ unit testing", color: "#90c8a6" },
  { name: "libcurl", group: "Systems", logo: "curl", note: "HTTP & network requests", color: "#a8c7e8" },
  { name: "Boost.Asio", group: "Systems", logo: "boost", note: "Networking & asynchronous I/O", color: "#f2a7a7" },
  { name: "Web Crawling", group: "Systems", logo: "scrapy", note: "Web data collection", color: "#9dd5b5" },
  { name: "FFmpeg", group: "Media", logo: "ffmpeg", note: "Video processing pipelines", color: "#b8e3a2" },
  { name: "AWS EC2", group: "Cloud", logo: "amazonwebservices", note: "Virtual server deployment", color: "#ffbf78" },
  { name: "Ubuntu", group: "Cloud", logo: "ubuntu", note: "Linux server environment", color: "#ff9877" },
  { name: "Nginx", group: "Cloud", logo: "nginx", note: "Reverse proxy & web serving", color: "#9bd78c" },
  { name: "PM2", group: "Cloud", logo: "pm2", note: "Node process management", color: "#9ce1b5" },
  { name: "Cloudflare R2", group: "Cloud", logo: "cloudflare", note: "Object storage workflows", color: "#ffb36d" },
  { name: "Vercel", group: "Cloud", logo: "vercel", note: "Frontend deployment", color: "#e6eee9" },
  { name: "Docker", group: "Cloud", logo: "docker", note: "Container fundamentals", color: "#80c8ff" },
  { name: "ESP32", group: "IoT", logo: "espressif", note: "Connected embedded devices", color: "#ffad87" },
  { name: "Arduino", group: "IoT", logo: "arduino", note: "Microcontroller prototyping", color: "#78d6c4" },
  { name: "NodeMCU", group: "IoT", logo: "nodemcu", note: "ESP8266 IoT projects", color: "#83c9a2" },
  { name: "RFID", group: "IoT", logo: "raspberrypi", note: "Identification systems", color: "#f09dc2" },
  { name: "OpenCV", group: "AI & Vision", logo: "opencv", note: "Computer vision workflows", color: "#ff9c82" },
  { name: "MediaPipe", group: "AI & Vision", logo: "google", note: "Vision & landmark tracking", color: "#91baff" },
  { name: "MobileNetV2", group: "AI & Vision", logo: "tensorflow", note: "Efficient image models", color: "#ffb16f" },
  { name: "LSTM", group: "AI & Vision", logo: "pytorch", note: "Sequence modeling concepts", color: "#ff9b83" },
  { name: "Data Structures", group: "Core CS", logo: "thealgorithms", note: "Organizing and accessing data", color: "#bba5ff" },
  { name: "Algorithms", group: "Core CS", logo: "leetcode", note: "Structured problem solving", color: "#ffbd73" },
  { name: "Object-Oriented Design", group: "Core CS", logo: "java", note: "Reusable software structure", color: "#f5a77a" },
  { name: "API Integration", group: "Engineering", logo: "postman", note: "Connecting external services", color: "#ffad7b" },
  { name: "Debugging", group: "Engineering", logo: "vscode", note: "Tracing and resolving issues", color: "#83bfff" },
  { name: "Responsive Design", group: "Engineering", logo: "css3", note: "Mobile-to-desktop layouts", color: "#8cb6ff" },
];

const filters = ["All skills", "Programming", "Frontend", "Backend", "Databases", "Systems", "Cloud", "IoT", "AI & Vision", "Core CS", "Engineering", "Tools", "Media"];

function DevIcon({ logo, name }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="skill-fallback" aria-hidden="true">{name.slice(0, 2).toUpperCase()}</span>;
  return (
    <img
      className="skill-logo"
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${logo}/${logo}-original.svg`}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Skills() {
  const [activeFilter, setActiveFilter] = useState("All skills");
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const visibleSkills = useMemo(() => {
    const query = search.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesFilter = activeFilter === "All skills" || skill.group === activeFilter || (activeFilter === "Systems" && skill.group === "Systems");
      const matchesSearch = !query || `${skill.name} ${skill.group} ${skill.note}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <section className="skills-showcase" id="skills">
      <div className="skills-orb skills-orb-one" />
      <div className="skills-orb skills-orb-two" />
      <div className="skills-shell">
        <header className="skills-hero">
          <div className="skills-eyebrow"><span className="eyebrow-pulse" /> THE TOOLKIT / 2026</div>
          <div className="skills-heading-row">
            <div>
              <h2>Things I <span>build with.</span></h2>
              <p className="skills-intro">A visual inventory of the languages, frameworks, tools, and concepts I explore while building software.</p>
            </div>
            <div className="skills-total"><strong>{skills.length.toString().padStart(2, "0")}</strong><span>TOOLS<br />& SKILLS</span></div>
          </div>
          <div className="skills-hero-bottom"><span>CURIOUS BY DEFAULT</span><span className="hero-line" /><span>BUILT THROUGH PROJECTS</span></div>
        </header>

        <div className="skills-controls">
          <div className="skills-filter-list" aria-label="Filter skills">
            {filters.map((filter) => (
              <button key={filter} type="button" className={`skills-filter ${activeFilter === filter ? "is-active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
          </div>
          <label className="skills-search">
            <span className="search-glyph">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a technology..." aria-label="Search skills" />
            <span className="search-shortcut">/</span>
          </label>
        </div>

        <div className="skills-results-line"><span>EXPLORING THE STACK</span><span>{visibleSkills.length.toString().padStart(2, "0")} RESULTS</span></div>

        <div className="skills-wall">
          {visibleSkills.map((skill, index) => (
            <button
              className={`skill-tile ${selectedSkill?.name === skill.name ? "skill-tile-selected" : ""}`}
              key={skill.name}
              type="button"
              style={{ "--skill-accent": skill.color, "--tile-delay": `${Math.min(index * 18, 260)}ms` }}
              onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
              aria-pressed={selectedSkill?.name === skill.name}
            >
              <span className="tile-topline"><span className="tile-dot" /><span>{skill.group.toUpperCase()}</span><span className="tile-arrow">↗</span></span>
              <span className="tile-logo-wrap"><DevIcon logo={skill.logo} name={skill.name} /></span>
              <span className="tile-name">{skill.name}</span>
              <span className="tile-note">{skill.note}</span>
              <span className="tile-bottomline"><span className="tile-accent-line" /><span className="tile-index">{String(skills.indexOf(skill) + 1).padStart(2, "0")}</span></span>
            </button>
          ))}
        </div>

        {visibleSkills.length === 0 && <div className="skills-empty"><span>⌕</span><h3>No matches found</h3><p>Try another keyword or choose a different filter.</p><button type="button" onClick={() => { setSearch(""); setActiveFilter("All skills"); }}>Reset filters</button></div>}

        <footer className="skills-footer">
          <div className="footer-mark">&lt; / &gt;</div>
          <div><span className="footer-kicker">CURRENT APPROACH</span><p>Learn the fundamentals. Build something real. Repeat.</p></div>
          <span className="footer-status"><i /> ALWAYS LEARNING</span>
        </footer>
      </div>
    </section>
  );
}

export default Skills;
