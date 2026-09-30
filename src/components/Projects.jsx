
import "./Projects.css";

import searchEngineImage from "../assets/searchengine.png";
import samadhanImage from "../assets/samadhan.jpeg";
import dabsImage from "../assets/DABS.png";
import watchPartyImage from "../assets/watchparty.png";
import eyeGazeImage from "../assets/eyegaze.png";

const projects = [
  {
    id: "webcrawler",
    number: "01",
    title: "WebCrawler & Search Engine",
    subtitle: "C++ Systems Project",
    description:
      "A C++ web crawling and indexing project exploring webpage retrieval, browser automation, networking, and the foundations of search systems.",
    technologies: [
      "C++",
      "libcurl",
      "WebSockets",
      "Asio",
      "Chrome DevTools Protocol",
    ],
    category: "Systems Engineering",
    status: "Project",
    statusType: "project",
    image: searchEngineImage,
    imageAlt: "WebCrawler and Search Engine icon",
    repoUrl: "https://github.com/NScoded/Web-crawler",
    accent: "cyan",
  },
  {
    id: "samadhan",
    number: "02",
    title: "SAMADHAN",
    subtitle: "Government Grievance Redressal Platform",
    description:
      "A full-stack government grievance redressal platform that enables citizens to submit complaints, track grievance status, and access a structured complaint management system.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "Tailwind CSS",
      "Recharts",
    ],
    category: "Full-Stack Development",
    status: "Live",
    statusType: "live",
    image: samadhanImage,
    imageAlt: "SAMADHAN project icon",
    liveUrl: "https://samadhan.ssipmt.in/",
    repoUrl: "https://github.com/NScoded",
    repoLabel: "GitHub Profile",
    certificateUrl:
      "https://drive.google.com/file/d/11yJSaYoxW1gLrpQPCs6K-UA-pZIB3yr6/view?usp=drive_link",
    accent: "purple",
  },
  {
    id: "doctor-appointment",
    number: "03",
    title: "Doctor Appointment Booking",
    subtitle: "Healthcare Appointment Platform",
    description:
      "A responsive healthcare application designed to make doctor discovery and appointment booking more convenient through a clean, user-friendly interface.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
    ],
    category: "Web Application",
    status: "Live",
    statusType: "live",
    image: dabsImage,
    imageAlt: "Doctor Appointment Booking System icon",
    liveUrl: "https://dabs.nileshsahu.me/",
    repoUrl:
      "https://github.com/NScoded/Doctor-Appointment-Booking-System",
    accent: "blue",
  },
  {
    id: "watch-party",
    number: "04",
    title: "Watch Party",
    subtitle: "Real-Time Video Experience",
    description:
      "An ongoing project for watching videos together, featuring HLS video processing, cloud storage, room-based experiences, and real-time communication.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "WebSockets",
      "FFmpeg",
      "Cloudflare R2",
    ],
    category: "In Development",
    status: "Ongoing",
    statusType: "ongoing",
    image: watchPartyImage,
    imageAlt: "Watch Party application icon",
    repoUrl: "https://github.com/NScoded/WatchParty",
    accent: "pink",
  },
  {
    id: "eyegaze",
    number: "05",
    title: "Eye Gaze Estimation",
    subtitle: "Pilot Drowsiness Detection System",
    description:
      "A computer vision and deep learning project focused on estimating eye gaze and detecting pilot drowsiness from facial and eye movement patterns in real time.",
    technologies: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "MobileNetV2",
      "LSTM",
    ],
    category: "AI & Computer Vision",
    status: "Project",
    statusType: "project",
    image: eyeGazeImage,
    imageAlt: "Eye Gaze Estimation and Pilot Drowsiness Detection icon",
    repoUrl: "https://github.com/NScoded/Eyegaze-Estimation",
    certificateUrl:
      "https://drive.google.com/file/d/1M5YRLGpHrUM29uAiz9Qs9ZJPPs1OWee_/view?usp=sharing",
    accent: "purple",
  },
  {
    id: "npwt-monitoring",
    number: "06",
    title: "NPWT Device Monitoring System",
    subtitle: "IoT & Medical Device Monitoring",
    description:
      "An ongoing IoT-based monitoring system focused on tracking medical device operations and providing real-time visibility into device status.",
    technologies: [
      "IoT",
      "Device Monitoring",
      "Real-Time Tracking",
    ],
    category: "In Development",
    status: "Ongoing",
    statusType: "ongoing",
    accent: "green",
  },
];

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="project-button-icon"
    >
      <path
        d="M7 17 17 7M7 7h10v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="project-button-icon"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.07 3.2 1.46.1-.73.39-1.23.7-1.52-2.48-.28-5.08-1.24-5.08-5.5 0-1.22.44-2.21 1.15-2.99-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.67.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.09 5.49.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function NpwtIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="npwt-device-icon"
      aria-hidden="true"
    >
      <rect
        x="15"
        y="8"
        width="34"
        height="48"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="21"
        y="15"
        width="22"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M25 38h14M32 33v10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="49" r="1.7" fill="currentColor" />
    </svg>
  );
}

function ProjectCard({ project }) {
  const hasLiveLink = Boolean(project.liveUrl);
  const hasRepoLink = Boolean(project.repoUrl);
  const hasCertificateLink = Boolean(project.certificateUrl);

  return (
    <article className={`project-card project-card--${project.accent}`}>
      <div className="project-card-top">
        <div className="project-identity">
          <span className="project-number">{project.number}</span>
          <span className="project-category">{project.category}</span>
        </div>

        <span
          className={`project-status project-status--${project.statusType}`}
        >
          <span className="project-status-dot" />
          {project.status}
        </span>
      </div>

      <div className="project-heading">
        <div className="project-icon-wrap">
          {project.image ? (
            <img
              className="project-icon-image"
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
            />
          ) : (
            <NpwtIcon />
          )}

          <span className="project-icon-glow" />
        </div>

        <div className="project-heading-text">
          <p className="project-subtitle">{project.subtitle}</p>
          <h3>{project.title}</h3>
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-technologies" aria-label="Technologies used">
        {project.technologies.map((technology) => (
          <span className="project-tech-tag" key={technology}>
            {technology}
          </span>
        ))}
      </div>

      {hasLiveLink || hasRepoLink || hasCertificateLink ? (
        <div className="project-actions">
          {hasLiveLink && (
            <a
              className="project-button project-button--primary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live ${project.title} project`}
            >
              <span>Live Demo</span>
              <ArrowUpRight />
            </a>
          )}

          {hasRepoLink && (
            <a
              className="project-button project-button--secondary"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub for ${project.title}`}
            >
              <GithubIcon />
              <span>{project.repoLabel || "Source Code"}</span>
            </a>
          )}

          {hasCertificateLink && (
            <a
              className="project-button project-button--secondary"
              href={project.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View certificate for ${project.title}`}
            >
              <span>View Certificate</span>
              <ArrowUpRight />
            </a>
          )}
        </div>
      ) : (
        <div className="project-development-note">
          <span className="project-development-line" />
          <span>Research &amp; development in progress</span>
        </div>
      )}

      <span className="project-card-glow" aria-hidden="true" />
    </article>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <header className="projects-header">
          <div className="projects-heading-content">
            <div className="projects-eyebrow">
              <span className="projects-eyebrow-line" />
              SELECTED WORK
              <span className="projects-eyebrow-line" />
            </div>

            <h2 className="projects-title">
              Ideas into <span>reality.</span>
            </h2>

            <p className="projects-description">
              A selection of applications, engineering experiments, and
              ongoing projects built through curiosity, problem-solving, and
              hands-on development.
            </p>
          </div>

          <a
            className="projects-github-link"
            href="https://github.com/NScoded"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span>See more projects</span>
            <ArrowUpRight />
          </a>
        </header>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;