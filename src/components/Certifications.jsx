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
      "Awarded by the District Collector, Raipur for significant contribution to district-level government software development projects.",
    logo: "/logos/govt.png",
    link: "https://drive.google.com/file/d/11yJSaYoxW1gLrpQPCs6K-UA-pZIB3yr6/view?usp=sharing",
  },
  {
    title: "Fundamentals of Cybersecurity (EDU-102)",
    issuer: "Zscaler Training",
    year: "2026",
    description:
      "Completed the 'Fundamentals of Cybersecurity (EDU-102)' course offered by Zscaler Training.",
    logo: "/logos/zscaler.png",
    link: "https://drive.google.com/file/d/1QUQG7i1JcX7aWzXeDwGZ82Jm_kvfJ3h8/view?usp=sharing",
  },
  {
    title: " Networking for Cyber Professionals Course",
    issuer: "Zscaler Academy",
    year: "2026",
    description:
      "Completed Introduction to Networking for Cyber Professionals Course offered by Zscaler Academy",
    logo: "/logos/zscaler.png",
    link: "https://drive.google.com/file/d/1DCUrnc0FtLDMHFseKHehlR9gLcpnhlA-/view?usp=sharing",
  },
  {
    title: "Zscaler Zero Trust Associate (ZTCA) Certification",
    issuer: "Zscaler Academy",
    year: "2026",
    description:
      "Earned the Zscaler Zero Trust Associate (ZTCA) certification from Zscaler Academy by successfully clearing the certification exam, demonstrating strong understanding of Zero Trust architecture and secure access principles.",
    logo: "/logos/zscaler.png",
    link: "https://drive.google.com/file/d/1Z_xufaKBeJjILUu6mM0BDLwZ1axdE8nt/view?usp=sharing",
  }
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="min-h-screen px-6 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 text-center mb-12 sm:mb-16">
        Certifications
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

        {certData.map((cert, index) => (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: false }}
            whileHover={{ y: -6 }}
            className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 flex flex-col items-center text-center"
          >

            <img
              src={cert.logo}
              alt="logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain mb-4 bg-white rounded-lg p-2"
            />

            <h3 className="text-lg sm:text-xl font-semibold">
              {cert.title}
            </h3>

            <p className="text-cyan-300 text-xs sm:text-sm mt-1">
              {cert.issuer} • {cert.year}
            </p>

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              {cert.description}
            </p>

          </motion.a>
        ))}

      </div>
    </section>
  );
}
