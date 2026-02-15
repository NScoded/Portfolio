import { motion } from "framer-motion";
import { useState } from "react";

export default function Projects() {

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const projects = [
  {
    title: "Doctor Appointment Booking System",
    desc:
      "A full-featured appointment management platform where users can book doctor appointments and admins can manage hospitals and doctors efficiently.",
    link: "https://doctor-appointment-booking-system-lilac.vercel.app/",
    logo: "/logos/DABS.png"
  },
  {
    title: "Samadhan – Government Complaint Management System",
    desc:
      "A centralized grievance monitoring dashboard developed for the Government of Chhattisgarh to track public complaints.",
    link: "https://samadhan.ssipmt.in",
    logo: "/logos/samadhan.jpeg"
  },
  {
    title: "Lyfta Fitness Analytics Dashboard",
    desc:
  "Built a modern fitness dashboard using Lyfta API to display my workouts and track my streak progress.",
    link: "https://lyfta-pi.vercel.app/",
    logo: "/logos/lyfta.png"
  },
  {
    title: "NPWT Device Monitoring System",
    desc:
      "An IoT-based monitoring system for managing medical device operations with real-time tracking.",
    status: "in-progress"
  }
];

  return (
    <section id="projects" className="min-h-screen px-10 py-24 relative">
      
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
        Projects
      </h2>

      {/* Cursor Follower */}
      
      <div className="grid md:grid-cols-3 gap-10">

        {projects.map((project, i) => {

          const isInProgress = project.status === "in-progress";
          const Wrapper = !isInProgress ? motion.a : motion.div;

          return (
            <Wrapper
  key={i}
  {...(!isInProgress
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer"
      }
    : {})}
  onMouseMove={(e) => {
    if (!isInProgress) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
  }}
  onMouseEnter={() => {
    if (!isInProgress) setActive(true);
  }}
  onMouseLeave={() => setActive(false)}
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: i * 0.2 }}
  viewport={{ once: true }}
  whileHover={!isInProgress ? { y: -6 } : {}}
  className={`
    group
    bg-white/5 backdrop-blur-md
    p-8 rounded-2xl
    border border-white/10
    transition-all duration-300
    flex flex-col items-center text-center
    ${!isInProgress 
      ? "hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 cursor-pointer" 
      : ""
    }
  `}
>


              {!isInProgress && (
                <img
                  src={project.logo}
                  alt="logo"
                  className="w-16 h-16 object-contain mb-6 bg-white rounded-lg p-2"
                />
              )}

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {project.desc}
              </p>

              {isInProgress && (
                <span
                  className="
                    mt-8 inline-block
                    text-xs
                    bg-cyan-400/20 text-cyan-300
                    px-4 py-1.5 rounded-full
                    border border-cyan-400/30
                    transition-all duration-300
                    group-hover:bg-red-300
                    group-hover:text-black
                    group-hover:scale-105
                  "
                >
                  IN PROGRESS...
                </span>
              )}

            </Wrapper>
          );
        })}

      </div>
    </section>
  );
}
