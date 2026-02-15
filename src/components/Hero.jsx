import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-between px-4 sm:px-6 md:px-12 pt-28 md:pt-40 gap-6">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold leading-tight">
          Hi, I'm <br />
          <span className="text-cyan-400">Nilesh Sahu</span>
        </h2>

        <p className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-lg">
          Full Stack Developer passionate about building scalable web applications and impactful digital solutions.
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex gap-4 sm:gap-6 mt-6 text-gray-400">
          <a
            href="https://github.com/nscoded"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <Github size={20} />
          </a>

          <a
            href="https://linkedin.com/in/nilesh2005"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://leetcode.com/NsCoded"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M13.483 0a1.5 1.5 0 00-1.06.44l-9.9 9.9a1.5 1.5 0 000 2.12l9.9 9.9a1.5 1.5 0 002.12-2.12L6.663 12l7.84-7.84A1.5 1.5 0 0013.483 0z"/>
            </svg>
          </a>

          <a
            href="mailto:nileshsahu2005@gmail.com"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <Mail size={20} />
          </a>
        </div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-end"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-30"></div>

          <img
            src="/images/Nilesh.jpg"
            alt="Nilesh"
            className="relative 
              w-28 h-28 
              sm:w-40 sm:h-40 
              md:w-80 md:h-80 
              object-cover rounded-full border-4 border-cyan-400 shadow-2xl"
          />
        </div>
      </motion.div>

    </section>
  );
}
