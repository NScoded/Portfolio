export default function Contact() {

  const socials = [
    {
      name: "GitHub",
      desc: "Open Source & Projects",
      logo: "/logos/github.png",
      link: "https://github.com/nscoded"
    },
    {
      name: "LinkedIn",
      desc: "Professional Network",
      logo: "/logos/linkedin.png",
      link: "https://linkedin.com/in/nilesh2005"
    },
    {
      name: "LeetCode",
      desc: "Problem Solving",
      logo: "/logos/leetcode.png",
      link: "https://leetcode.com/NsCoded"
    },
    {
      name: "Instagram",
      desc: "Personal Personal",
      logo: "/logos/instagram.png",
      link: "https://instagram.com/thenileshsahu"
    },
    {
      name: "Facebook",
      desc: "Personal Profile",
      logo: "/logos/facebook.png",
      link: "https://www.facebook.com/profile.php?id=100042198312090"
    },
    {
      name: "Duolingo",
      desc: "Language Learning",
      logo: "/logos/duolingo.png",
      link: "https://www.duolingo.com/profile/Nilesh070501"
    },
    {
      
      name: "Lyfta",
      desc: "Workout Profile",
      logo: "/logos/lyfta.png",
      link: "https://lyfta.app/profile/user/6hp0d"
    }
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24"
    >
      <h2 className="text-4xl font-bold text-cyan-400 mb-4 text-center">
        Connect With Me
      </h2>

      <p className="text-gray-400 text-center max-w-xl mb-12">
        Professional & personal profiles.
      </p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">

        {socials.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex items-center gap-4
              bg-white/5 backdrop-blur-md
              px-5 py-4
              rounded-xl
              border border-white/10
              hover:border-cyan-400
              transition-all duration-300
            "
          >
            {/* Logo */}
            <img
              src={item.logo}
              alt={item.name}
              className="
                w-10 h-10
                rounded-full
                object-cover
                bg-white
                p-1
                group-hover:scale-110
                transition duration-300
              "
            />

            {/* Text */}
            <div className="flex flex-col">
              <span className="text-white font-medium group-hover:text-cyan-400 transition">
                {item.name}
              </span>
              <span className="text-gray-400 text-sm">
                {item.desc}
              </span>
            </div>

          </a>
        ))}

      </div>
    </section>
  );
}
