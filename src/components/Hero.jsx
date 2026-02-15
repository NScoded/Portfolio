import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 pt-40">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Hi, I'm <br />
          <span className="text-cyan-400">Nilesh Sahu</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-lg text-lg">
          Full Stack Developer passionate about building scalable web applications and impactful digital solutions.
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex gap-6 mt-8 text-2xl text-gray-400">

          <a
            href="https://github.com/nscoded"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <Github />
          </a>

          <a
            href="https://linkedin.com/in/nilesh2005"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <Linkedin />
          </a>

          <a
            href="https://leetcode.com/NsCoded"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            {/* Simple LeetCode SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M13.483 0a1.5 1.5 0 00-1.06.44l-9.9 9.9a1.5 1.5 0 000 2.12l9.9 9.9a1.5 1.5 0 002.12-2.12L6.663 12l7.84-7.84A1.5 1.5 0 0013.483 0z"/>
            </svg>
          </a>

          <a
            href="mailto:nileshsahu2005@gmail.com"
            className="hover:text-cyan-400 transition hover:scale-110"
          >
            <Mail />
          </a>

        </div>

      

      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center mt-10 md:mt-0"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-30"></div>

          <img
            src="/images/Nilesh.jpg"
            alt="Nilesh"
            className="relative w-80 h-80 object-cover rounded-full border-4 border-cyan-400 shadow-2xl"
          />
        </div>
      </motion.div>

    </section>
  );
}
