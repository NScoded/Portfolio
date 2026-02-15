import { useState, useRef, useEffect } from "react";

export default function Skills() {

  const categories = {
    "Web Development": ["React", "Node.js", "Express", "MySQL"],
    "DSA": ["C++", "Java"],
    "3D Modelling": ["Onshape"]
  };

  const skillsList = [
    "React", "Node.js", "Express", "MySQL",
    "C++", "Java", "Onshape"
  ];

  const containerRef = useRef(null);
  const categoryRefs = useRef({});
  const velocityRef = useRef({});

  const [positions, setPositions] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryCenter, setCategoryCenter] = useState({ x: 0, y: 0 });

  // Initialize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const initialPos = {};
    const initialVel = {};

    skillsList.forEach(skill => {
      initialPos[skill] = {
        x: Math.random() * (rect.width - 100),
        y: Math.random() * (rect.height - 100)
      };

      initialVel[skill] = {
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      };
    });

    velocityRef.current = initialVel;
    setPositions(initialPos);
  }, []);

  // Animation Loop
  useEffect(() => {
    let animationFrame;

    const animate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      setPositions(prev => {
        const updated = { ...prev };

        if (!activeCategory) {
          Object.keys(updated).forEach(skill => {
            let { x, y } = updated[skill];
            let { vx, vy } = velocityRef.current[skill];

            x += vx * 2;
            y += vy * 2;

            // Bounce on boundary
            if (x <= 0 || x >= rect.width - 90) vx *= -1;
            if (y <= 0 || y >= rect.height - 90) vy *= -1;

            velocityRef.current[skill] = { vx, vy };

            x = Math.max(0, Math.min(x, rect.width - 90));
            y = Math.max(0, Math.min(y, rect.height - 90));

            updated[skill] = { x, y };
          });
        }

        return updated;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [activeCategory]);

  const handleHover = (cat) => {
    setActiveCategory(cat);

    const rect = categoryRefs.current[cat].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setCategoryCenter({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height
    });
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-10 py-20"
    >
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-20">
        Skills
      </h2>

      {/* Categories */}
      <div className="flex justify-center gap-24 mb-24 relative z-20">
        {Object.keys(categories).map((cat, i) => (
          <div
            key={i}
            ref={(el) => (categoryRefs.current[cat] = el)}
            onMouseEnter={() => handleHover(cat)}
            onMouseLeave={() => setActiveCategory(null)}
            className="w-48 h-48 rounded-full bg-cyan-500/20 border border-red-200 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition duration-300"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Skill Bubbles */}
      {skillsList.map((skill, i) => {

        const isActive =
          activeCategory &&
          categories[activeCategory]?.includes(skill);

        let style = {
          left: positions[skill]?.x || 0,
          top: positions[skill]?.y || 0
        };

        if (isActive) {
          const index = categories[activeCategory].indexOf(skill);

          style = {
            left: categoryCenter.x - 80 + index * 90,
            top: categoryCenter.y + 20
          };
        }

        return (
          <div
            key={i}
            className={`absolute w-20 h-20 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
              isActive
                ? "bg-cyan-400 text-black scale-110"
                : "bg-white/10 text-gray-300"
            }`}
            style={style}
          >
            {skill}
          </div>
        );
      })}
    </section>
  );
}
