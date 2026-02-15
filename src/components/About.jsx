import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-6 sm:mb-8">
          About Me
        </h2>

        <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-5 sm:mb-6">
          I'm a{" "}
          <span className="text-white font-semibold">
            B.Tech Computer Science
          </span>{" "}
          student passionate about building real-world digital solutions.
          I enjoy working on scalable systems and interactive web applications.
        </p>

        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
          My focus lies in{" "}
          <span className="text-cyan-400">
            Full Stack Development
          </span>
          , backend architecture and problem solving through{" "}
          <span className="text-cyan-400">
            Data Structures & Algorithms
          </span>
          . I continuously explore modern technologies and aim to
          create meaningful, efficient and impactful software.
        </p>
      </motion.div>
    </section>
  );
}
