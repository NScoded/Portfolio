import { motion } from "framer-motion";

const educationData = [
  {
    year: "2020 – 2021",
    title: "Secondary School (10th)",
    institution: "Little Flower Hr Sec School, Raipur (CBSE)",
    description:
      "Completed 10th under CBSE Board with strong foundation in Mathematics and Science.",
      score:"Scored - 80%",
    logo: "/logos/littleflower.jpg",
  },
  {
    year: "2022 – 2023",
    title: "Senior Secondary (12th) – PCM + CS",
    institution: "Little Flower Hr Sec School, Raipur (CBSE)",
    description:
      "Studied Physics, Chemistry, Mathematics and Computer Science.",
      score:"Scored - 70%",
    logo: "/logos/littleflower.jpg",
  },
  {
    year: "2023 – 2027",
    title: "B.Tech – Computer Science & Engineering",
    institution: "Shri Shankaracharya Institute, Raipur",
    description:
      "Currently pursuing B.Tech with focus on Data Structures, Algorithms and Full Stack Development.",
      score:"Current CGPA - 7.63",
    logo: "/logos/ssipmt.jpg",
  },
];

export default function Education() {
  return (
    <section id="education" className="min-h-screen px-10 py-24">
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16">
        Education Journey
      </h2>

      <div className="relative border-l-2 border-cyan-400 ml-4">

        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="mb-16 ml-8"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] mt-8 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>

            {/* Card */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-400 transition flex items-start gap-6">

              {/* Logo */}
              <img
                src={edu.logo}
                alt="logo"
                className="w-16 h-16 object-contain rounded-lg bg-white p-2"
              />

              {/* Text */}
              <div>
                <span className="text-cyan-300 text-sm font-semibold">
                  {edu.year}
                </span>
                <h3 className="text-xl font-bold mt-1">
                  {edu.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {edu.institution}
                </p>
                <p className="text-gray-400 text-sm mt-3">
                  {edu.description}
                </p>
                <p className="text-gray-400 text-sm mt-3">
                  {edu.score}
                </p>
              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
