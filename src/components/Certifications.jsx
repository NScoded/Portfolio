import { motion } from "framer-motion";

const certData = [
  {
    title: "MERN Stack Web Development",
    issuer: "Vectre Consultancy Pvt Ltd",
    year: "2024",
    description:
      "Completed full stack development training covering React, Node.js and MySQL.",
    logo: "/logos/vectre.jpg",
    link: "https://drive.google.com/file/d/159kLTlF9giujN1OLb47Ig0EHMK_h2lDv/view?usp=sharing",
  },
  {
    title: "Competitive Programming",
    issuer: "DevTown",
    year: "2024",
    description:
      "Strengthened problem-solving skills and understanding of core algorithms.",
    logo: "/logos/Devtown.jpg",
    link: "https://drive.google.com/file/d/1mvqU49t9kCHzUWLkJZDeq-QYzJ8Fg3Mv/view?usp=sharing",
  },
  {
    title: "C++ Programming",
    issuer: "DevTown",
    year: "2024",
    description:
      "Built strong foundation in object-oriented programming using C++.",
    logo: "/logos/Devtown.jpg",
    link: "https://drive.google.com/file/d/1VcebEwdBlgoTyw9q8BEs8vW-9B6lIyEC/view?usp=sharing",
  },
  {
  title: "Project Completion Certificate",
  issuer: "Government of Chhattisgarh",
  year: "2025",
  description:
  "Awarded by the District Collector, Raipur (Government of Chhattisgarh) for making a significant contribution to district-level government projects through the development of software based application portal."
,logo: "/logos/govt.png",
  link: "https://drive.google.com/file/d/11yJSaYoxW1gLrpQPCs6K-UA-pZIB3yr6/view?usp=sharing",
}

];

export default function Certifications() {
  return (
    <section id="certifications" className="min-h-screen px-10 py-24">
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16">
        Certifications
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {certData.map((cert, index) => (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-cyan-400 transition flex flex-col items-center text-center"
          >
            <img
              src={cert.logo}
              alt="logo"
              className="w-16 h-16 object-contain mb-4 bg-white  rounded-lg"
            />

            <h3 className="text-xl font-semibold">
              {cert.title}
            </h3>

            <p className="text-cyan-300 text-sm mt-1">
              {cert.issuer} • {cert.year}
            </p>

            <p className="text-gray-400 text-sm mt-4">
              {cert.description}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
