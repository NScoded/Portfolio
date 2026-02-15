import { motion } from "framer-motion";

export default function CurrentlyLearning() {

  const learning = [
    {
      title: "Zero Trust Cyber Associate (ZTCA)",
      issuer: "Zscaler Cyber Academy",
      year: "2025",
      desc:
        "Engaged in the Zero Trust Cyber Associate program focusing on modern security practices and understanding zero trust principles in evolving cybersecurity environments.",
      logo: "/logos/zscaler.png",
      link: "https://www.zscaler.com/zscaler-cyber-academy/ztca-zero-trust-cyber-associate"
    },
    {
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      year: "2025",
      desc:
        "Currently enrolled in the AWS Academy Cloud Foundations course, gaining a foundational understanding of cloud computing concepts including cloud principles, AWS core services, security, architecture and support.",
      logo: "/logos/awscloud.png",
      link: "https://www.aws.training/Academy"
    }
  ];

  return (
    <section id="currently-learning" className="min-h-screen px-10 py-24">

      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-16">
        Currently Exploring
      </h2>

      <div className="grid md:grid-cols-2 gap-12">

        {learning.map((item, i) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="
              group relative
              bg-white/5 backdrop-blur-md
              border border-white/10
              p-8 rounded-2xl
              transition-all duration-300
              flex gap-6 items-start
              cursor-pointer
            "
          >

            {/* In Progress Badge */}
            <span
              className="
                absolute top-4 right-4 text-xs 
                bg-cyan-400/20 text-cyan-300 
                px-3 py-1 rounded-full 
                border border-cyan-400/40 
                transition-all duration-300
                group-hover:scale-110
                group-hover:bg-red-300
                group-hover:text-black
              "
            >
              IN PROGRESS
            </span>

            {/* Logo */}
            <img
              src={item.logo}
              alt="logo"
              className="w-16 h-16 object-contain bg-white rounded-lg"
            />

            {/* Content */}
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {item.issuer} • {item.year}
              </p>

              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                {item.desc}
              </p>
            </div>

          </motion.a>
        ))}

      </div>

    </section>
  );
}
