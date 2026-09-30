
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Code2,
  Globe,
  MessageCircle,
} from "lucide-react";

import "./Contact.css";

const EMAIL = "nileshsahu2005@gmail.com";

const contactLinks = [
  {
    name: "LinkedIn",
    detail: "Professional network",
    handle: "linkedin.com/in/nilesh2005",
    href: "https://www.linkedin.com/in/nilesh2005/",
    icon: Globe,
    accent: "linkedin",
  },
  {
    name: "GitHub",
    detail: "Code, projects & contributions",
    handle: "github.com/nscoded",
    href: "https://github.com/nscoded",
    icon: Code2,
    accent: "github",
  },
  {
    name: "LeetCode",
    detail: "Problem solving & DSA",
    handle: "leetcode.com/u/nscoded",
    href: "https://leetcode.com/u/nscoded/",
    icon: Code2,
    accent: "leetcode",
  },
];

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="contact-page" id="contact">
      <div className="contact-orb contact-orb-one" aria-hidden="true" />
      <div className="contact-orb contact-orb-two" aria-hidden="true" />

      <header className="contact-header">
        <span className="contact-eyebrow">
          <span className="contact-eyebrow-dot" />
          GET IN TOUCH
        </span>

        <h1>
          Let's make something <span>meaningful.</span>
        </h1>

        <p>
          Have an idea, an opportunity, or just want to talk tech? I'm always
          open to connecting with people who enjoy building useful things.
        </p>
      </header>

      <div className="contact-layout">
        <div className="contact-intro">
          <div className="contact-intro-mark">
            <MessageCircle size={24} strokeWidth={1.8} />
          </div>

          <p className="contact-kicker">
            A GOOD CONVERSATION STARTS HERE
          </p>

          <h2>Have a project in mind?</h2>

          <p className="contact-intro-copy">
            Whether it's full-stack development, a collaboration, or a new
            opportunity, feel free to reach out. I'll get back to you as soon
            as I can.
          </p>

          <div className="contact-email-box">
            <div className="contact-email-icon">
              <Mail size={19} />
            </div>

            <div className="contact-email-text">
              <span>Email me at</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>

            <button
              type="button"
              className="contact-copy-button"
              onClick={copyEmail}
              aria-label="Copy email address"
              title={copied ? "Copied" : "Copy email"}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>

          {copied && (
            <span className="contact-copied-note">Email copied</span>
          )}

          <a className="contact-primary-button" href={`mailto:${EMAIL}`}>
            <Mail size={17} />
            <span>Send an email</span>
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="contact-links-section">
          <div className="contact-links-heading">
            <div>
              <span className="contact-kicker">FIND ME ONLINE</span>
              <h2>Professional profiles</h2>
            </div>
            <Globe size={21} strokeWidth={1.7} />
          </div>

          <div className="contact-links-list">
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  className={`contact-link-item contact-link-${item.accent}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.name}
                >
                  <span className="contact-link-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>

                  <span className="contact-link-copy">
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                    <small>{item.handle}</small>
                  </span>

                  <ArrowUpRight
                    className="contact-link-arrow"
                    size={19}
                  />
                </a>
              );
            })}
          </div>

          <div className="contact-bottom-note">
            <span className="contact-status-dot" />
            <span>
              Open to professional connections and opportunities
            </span>
          </div>
        </div>
      </div>

      <footer className="contact-footer">
        <div className="contact-footer-inner">
          <a className="contact-footer-brand" href="#contact">
            <span className="contact-footer-mark">N</span>
            <span>Nilesh Sahu</span>
          </a>

          <p>
            Designed &amp; built by Nilesh
            <span className="contact-footer-separator">·</span>
            <span>© {new Date().getFullYear()}</span>
          </p>

          <a
            className="contact-footer-email"
            href={`mailto:${EMAIL}`}
            aria-label="Email Nilesh"
          >
            <Mail size={15} />
            <span>Get in touch</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Contact;