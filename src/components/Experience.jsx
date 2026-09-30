import { useEffect, useState } from "react";
import "./Experience.css";

// Add your actual certificate URL here when available.
const CERTIFICATE_URL = "https://drive.google.com/file/d/1kOVjD-7B8h36UrYSPVwHgFK7QeQEXClp/view?usp=drive_link";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="journey-link-icon">
      <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="journey-pin-icon">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function Experience() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const openImage = (src, alt) => setActiveImage({ src, alt });

  return (
    <section className="experience-section journey-section" id="journey" aria-labelledby="journey-title">
      <div className="experience-container journey-container">
        <header className="journey-heading">
          <div className="experience-eyebrow">
            <span className="experience-eyebrow-line" />
            A CHAPTER OF MY JOURNEY
          </div>
      
        </header>

        <div className="journey-story">
          <div className="journey-brand" aria-label="CodeQuotient">
            <img className="journey-brand-logo" src="/images/journey/logo-4-3.jpeg" alt="CodeQuotient logo icon" />
            <span className="journey-brand-name">CodeQuotient</span>
          </div>

          <div className="journey-role-line">
            <span className="journey-role">Software Developer Trainee</span>
            <span className="journey-role-at">at CodeQuotient</span>
          </div>

          <p className="journey-description">
            A meaningful chapter in my development journey—strengthening my programming fundamentals,
            learning to approach problems methodically, and gaining hands-on practice by writing,
            testing, and debugging code. It was a step toward becoming a more confident software developer.
          </p>

          <div className="journey-action-row">
            <div className="journey-location-line">
              <PinIcon />
              <span>Mohali, Chandigarh</span>
              <a href="https://maps.app.goo.gl/5zPXRHpyFjZw168TA" target="_blank" rel="noopener noreferrer">
                View location <ArrowUpRight />
              </a>
            </div>
            <a
              className={`journey-certificate-link${CERTIFICATE_URL ? "" : " is-unavailable"}`}
              href={CERTIFICATE_URL || undefined}
              target={CERTIFICATE_URL ? "_blank" : undefined}
              rel={CERTIFICATE_URL ? "noopener noreferrer" : undefined}
              aria-disabled={!CERTIFICATE_URL}
              onClick={(event) => { if (!CERTIFICATE_URL) event.preventDefault(); }}
              title={CERTIFICATE_URL ? "Open CodeQuotient certificate" : "Add your certificate URL to enable this link"}
            >
              View Certificate <ArrowUpRight />
            </a>
          </div>
        </div>

        <div
          className="journey-photo-feature journey-image-clickable"
          role="button"
          tabIndex={0}
          aria-label="Open laptop workspace photo"
          onClick={() => openImage("/images/journey/workspace.jpg", "Training room @ CodeQuotient office")}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openImage("/images/journey/workspace.jpg", "Training room CodeQuotient office"); } }}
        >
          <img
            src="/images/journey/workspace.jpg"
            alt="Training room CodeQuotient office"
            loading="lazy"
          />
          <span className="journey-image-open-hint">Click to view <ArrowUpRight /></span>
          <div className="journey-photo-feature-caption">
            <span>01 / THE EVERYDAY PROCESS</span>
            <p>Learning through practice, one line of code at a time.</p>
          </div>
        </div>

        <div className="journey-photo-pair" aria-label="More moments from my CodeQuotient journey">
          <figure className="journey-photo-secondary journey-photo-portrait">
            <button className="journey-image-trigger" type="button" onClick={() => openImage("/images/journey/office-portrait.png", "CodeQuotient office")} aria-label="Open office portrait photo">
              <img src="/images/journey/office-portrait.png" alt="CodeQuotient office" loading="lazy" />
              <span className="journey-image-open-hint">Click to view <ArrowUpRight /></span>
            </button>
            <figcaption><span>02</span> A moment from the journey</figcaption>
          </figure>
          <figure className="journey-photo-secondary journey-photo-badge">
            <button className="journey-image-trigger" type="button" onClick={() => openImage("/images/journey/trainee-badge.jpg", "CodeQuotient trainee badge")} aria-label="Open trainee badge photo">
              <img src="/images/journey/trainee-badge.jpg" alt=" CodeQuotient trainee badge" loading="lazy" />
              <span className="journey-image-open-hint">Click to view <ArrowUpRight /></span>
            </button>
            <figcaption><span>03</span> A small milestone</figcaption>
          </figure>
        </div>

        <div className="journey-closing-line">
          <span />
          <p>Every chapter adds something to the person and developer I’m becoming.</p>
        </div>
      </div>

      {activeImage && (
        <div className="journey-lightbox" role="dialog" aria-modal="true" aria-label="Expanded journey photo" onClick={() => setActiveImage(null)}>
          <button className="journey-lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image">×</button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <p>{activeImage.alt}</p>
        </div>
      )}
    </section>
  );
}

export default Experience;
