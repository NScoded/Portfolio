import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">

      {/* Background Glow */}
      <div className="hero-bg-glow"></div>

      {/* Left Content */}
      <div className="hero-content">

        <p className="hero-welcome">
          Welcome back,
        </p>

        <h1 className="hero-title">
          Nilesh Sahu <span className="wave">👋</span>
        </h1>

        <p className="hero-role">
          B.Tech CSE <span>|</span> Developer <span>|</span> Problem Solver
        </p>

        <p className="hero-description">
          I build real-world projects, explore new technologies,
          and constantly learn to become a better developer.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">

          <button
            className="hero-btn hero-btn-primary"
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View My Work
            <span className="btn-arrow">→</span>
          </button>

          <a
            href="/resume.pdf"
            download
            className="hero-btn hero-btn-secondary"
          >
            <span className="download-icon">↓</span>
            Download CV
          </a>

        </div>

        {/* Quote */}
        <p className="hero-quote">
          "Turn ideas into reality through code."
        </p>

        {/* Statistics */}
        <div className="hero-stats">

          <div className="hero-stat">
            <h3>7+</h3>
            <p>Projects</p>
          </div>

          <div className="hero-stat">
            <h3>6th</h3>
            <p>Semester</p>
          </div>

          <div className="hero-stat">
            <h3>10+</h3>
            <p>Technologies</p>
          </div>

          <div className="hero-stat">
            <h3>∞</h3>
            <p>Learning</p>
          </div>

        </div>

      </div>

      {/* Right Portrait */}
      <div className="hero-portrait">

        {/* Dot Grid Backdrop */}
        <div className="portrait-grid"></div>

        {/* Purple Glow Behind Image */}
        <div className="portrait-glow"></div>
        <div className="portrait-glow portrait-glow-secondary"></div>

        {/* Rotating Gradient Ring + Glass Frame */}
        <div className="portrait-frame">
          <div className="portrait-ring"></div>

          {/* Profile Image */}
          <img
            src="/profile.png"
            alt="Nilesh Sahu"
            className="hero-profile-image"
          />
        </div>

        {/* Floating Tech Chips */}
        <div className="floating-chip chip-1">⚛️ React</div>
        <div className="floating-chip chip-2">🟢 Node.js</div>
        <div className="floating-chip chip-3">🐍 Python</div>

        {/* Handwritten Text */}
        <div className="hero-handwritten">
          <span>Build</span>
          <span>Learn</span>
          <span>Improve</span>
          <span>Repeat</span>
          <div className="handwritten-line"></div>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;