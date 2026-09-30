
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import "./HeroSection.css";

const EASE = [0.16, 1, 0.3, 1];
const ROLES = [
  "Full-Stack Developer",
  "Problem Solver",
  "Software Engineering Trainee",
];
const NAV = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

const RESUME_URL =
  "https://drive.google.com/uc?export=download&id=1vkzs8uXN7cXppPg1zTEyWRNYkY54oL1I";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@nscoded",
    href: "https://github.com/nscoded",
    icon: (
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55v-2c-3.16.69-3.83-1.36-3.83-1.36-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.94.1-.73.4-1.24.72-1.52-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.16a10.8 10.8 0 0 1 5.7 0c2.17-1.47 3.13-1.16 3.13-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.36.77 1.06.77 2.14v3.17c0 .3.21.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    ),
  },
  {
    label: "LinkedIn",
    handle: "Nilesh Sahu",
    href: "https://linkedin.com/in/nilesh2005",
    icon: (
      <>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 8.98h4.9V23H.5V8.98ZM8.34 8.98h4.7v1.92h.07c.65-1.18 2.25-2.43 4.63-2.43 4.95 0 5.86 3.16 5.86 7.27V23h-4.9v-6.36c0-1.52-.03-3.48-2.14-3.48-2.15 0-2.48 1.65-2.48 3.37V23h-4.9V8.98Z" />
      </>
    ),
  },
  {
    label: "LeetCode",
    handle: "NsCoded",
    href: "https://leetcode.com/u/NsCoded/",
    icon: (
      <path d="m13.98 2.5-8.62 8.85a2.5 2.5 0 0 0 0 3.5l5.6 5.72a2.35 2.35 0 0 0 3.38 0l2.3-2.35a1.2 1.2 0 0 0-1.72-1.68l-2.1 2.14a.58.58 0 0 1-.83 0l-5.13-5.24a.62.62 0 0 1 0-.87l7.93-8.13a1.2 1.2 0 1 0-1.8-1.6Zm-1.4 7.9a1.2 1.2 0 0 0 0 2.4h8.3a1.2 1.2 0 0 0 0-2.4h-8.3Zm-1.27 5.3a1.2 1.2 0 0 0-.94 1.95l2.5 2.98a2.6 2.6 0 0 0 3.68.27l1.55-1.35a1.2 1.2 0 0 0-1.58-1.8l-1.55 1.34a.2.2 0 0 1-.28-.02l-2.5-2.98a1.2 1.2 0 0 0-.88-.4Z" />
    ),
  },
];

/* ================= 3D SCENE ================= */

function Rig({ children }) {
  const { viewport } = useThree();
  const wide = viewport.width > viewport.height * 1.15;

  return (
    <group
      position={
        wide
          ? [-viewport.width * 0.25, 0.1, 0]
          : [0, -viewport.height * 0.18, 0]
      }
      scale={wide ? 1 : 0.8}
    >
      {children}
    </group>
  );
}

function Orb() {
  const ref = useRef();

  useFrame(({ pointer, clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.15 + pointer.x * 0.6;
    ref.current.rotation.x = pointer.y * 0.4;
  });

  return (
    <Float speed={1.6} floatIntensity={1.2} rotationIntensity={0.3}>
      <mesh ref={ref} scale={1.65}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#5b3df5"
          distort={0.45}
          speed={2}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
}

function Knot() {
  const ref = useRef();

  useFrame((_, d) => {
    ref.current.rotation.x += d * 0.12;
    ref.current.rotation.y -= d * 0.2;
  });

  return (
    <mesh ref={ref} scale={2.3}>
      <torusKnotGeometry args={[1, 0.27, 180, 16, 2, 3]} />
      <meshBasicMaterial
        color="#3de8ff"
        wireframe
        transparent
        opacity={0.13}
      />
    </mesh>
  );
}

function Stars() {
  const ref = useRef();

  const pos = useMemo(() => {
    const a = new Float32Array(1300 * 3);
    for (let i = 0; i < a.length; i++) {
      a[i] = (Math.random() - 0.5) * 18;
    }
    return a;
  }, []);

  useFrame((s, d) => {
    ref.current.rotation.y += d * 0.02;
    ref.current.position.x +=
      (s.pointer.x * 0.4 - ref.current.position.x) * 0.03;
    ref.current.position.y +=
      (s.pointer.y * 0.4 - ref.current.position.y) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#b9adff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ source }) {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      dpr={[1, 1.75]}
      eventSource={source}
      eventPrefix="client"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#3de8ff" />
      <pointLight position={[-4, -2, 3]} intensity={50} color="#ffb86b" />
      <Stars />
      <Rig>
        <Knot />
        <Orb />
      </Rig>
    </Canvas>
  );
}

/* ================= LOADER ================= */

function Loader({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.9,
      ease: "easeInOut",
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 350),
    });

    return () => c.stop();
  }, [onDone]);

  const curtain = { duration: 0.9, ease: [0.76, 0, 0.24, 1] };

  return (
    <motion.div className="hl" exit={{ pointerEvents: "none" }} transition={{ delay: 1 }}>
      <motion.i
        className="hl-curtain hl-top"
        exit={{ y: "-100%" }}
        transition={curtain}
      />
      <motion.i
        className="hl-curtain hl-bottom"
        exit={{ y: "100%" }}
        transition={curtain}
      />
      <motion.div
        className="hl-core"
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.4 }}
      >
        <span className="hl-count">{String(n).padStart(3, "0")}</span>
        <span className="hl-bar">
          <i style={{ transform: `scaleX(${n / 100})` }} />
        </span>
        <span className="hl-name">NILESH SAHU</span>
      </motion.div>
    </motion.div>
  );
}

/* ================= HELPERS ================= */

const rise = (go, delay) => ({
  initial: { opacity: 0, y: 26 },
  animate: go ? { opacity: 1, y: 0 } : {},
  transition: { delay, duration: 0.8, ease: EASE },
});

function SplitText({ text, delay, go }) {
  return (
    <span className="split" aria-label={text}>
      {[...text].map((c, i) => (
        <span className="split-mask" key={i} aria-hidden="true">
          <motion.span
            initial={{ y: "115%", rotate: 8 }}
            animate={go ? { y: 0, rotate: 0 } : {}}
            transition={{
              delay: delay + i * 0.05,
              duration: 0.85,
              ease: EASE,
            }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Roles() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % ROLES.length);
    }, 2600);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="roles">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 22, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -22, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45 }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Stat({ to, suffix = "", label, go }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!go) return;

    const c = animate(0, to, {
      duration: 1.6,
      delay: 1.5,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });

    return () => c.stop();
  }, [go, to]);

  return (
    <div className="stat">
      <strong>
        {v}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

/* ================= HERO ================= */

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const root = useRef(null);
  const done = useMemo(() => () => setReady(true), []);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), {
    stiffness: 120,
    damping: 14,
  });

  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), {
    stiffness: 120,
    damping: 14,
  });

  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const untilt = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader onDone={done} />}</AnimatePresence>

      <section className="hero" id="home" ref={root}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        {ready && <Scene source={root} />}

        <nav className="hero-nav">
          <motion.span className="logo" {...rise(ready, 0.2)}>
            NS<i>.</i>
          </motion.span>

          <motion.div className="nav-right" {...rise(ready, 0.3)}>
            <div className="nav-links">
              {NAV.map(([l, h]) => (
                <a key={l} href={h}>
                  {l}
                </a>
              ))}
            </div>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="nav-cv"
            >
              Resume
            </a>
          </motion.div>
        </nav>

        <div className="hero-inner">
          <div className="hero-copy">
            <motion.p className="status" {...rise(ready, 0.45)}>
              <span className="pulse" /> Open to opportunities <em /> India
            </motion.p>

            <h1 className="hero-title">
              <SplitText text="Nilesh" delay={0.55} go={ready} />
              <SplitText text="Sahu" delay={0.85} go={ready} />
            </h1>

            <motion.div {...rise(ready, 1.15)}>
              <Roles />
            </motion.div>

            <motion.p className="hero-desc" {...rise(ready, 1.3)}>
              I build real-world digital products and turn ideas into working
              systems, from REST APIs and real-time apps to a C++ search engine.
            </motion.p>

            <motion.div className="hero-cta" {...rise(ready, 1.45)}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={scrollToProjects}
              >
                Explore my work <b aria-hidden="true">↗</b>
              </button>

              <a href={RESUME_URL} className="btn btn-ghost">
                Download CV
              </a>
            </motion.div>

            <motion.div className="stats" {...rise(ready, 1.6)}>
              <Stat to={7} suffix="+" label="Projects" go={ready} />
              
              <Stat to={10} suffix="+" label="Technologies" go={ready} />
            </motion.div>

            <motion.div className="socials" {...rise(ready, 1.75)}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                  <span>
                    <b>{s.label}</b>
                    <em>{s.handle}</em>
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          <div
            className="photo-stage"
            onMouseMove={tilt}
            onMouseLeave={untilt}
          >
            <div className="photo-wrap">
              <motion.div
                className="photo-frame"
                style={{ rotateX: rx, rotateY: ry }}
                initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                animate={
                  ready
                    ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
                    : {}
                }
                transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
              >
                <img src="/profile.png" alt="Nilesh Sahu" />
                <span className="photo-shine" />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div className="scroll-hint" {...rise(ready, 2.2)}>
          <i /> Scroll
        </motion.div>
      </section>
    </MotionConfig>
  );
}