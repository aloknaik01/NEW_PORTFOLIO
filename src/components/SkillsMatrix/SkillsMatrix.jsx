import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, Database, Layout, GitBranch } from "lucide-react";

// const skillPreviews = {
//   "React 19":        { img: "https://imgs.search.brave.com/9YXToISgCGCzjKcFgNGQAYEodjqtAgMyf97BncckfqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvUmVh/Y3QtTG9nby5wbmc", glow: "#61DAFB" },
//   "Next.js":         { img: "https://imgs.search.brave.com/IwfTdFwBLgB-VAx2smLF-o8VVEKwAxyF-VL8X90tuQU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LmxvZ3JvY2tldC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDkvZmVhdHVy/ZWQtaW1hZ2UtaW1h/Z2UtY29tcG9uZW50/LnBuZw", glow: "#ffffff" },
//   "Tailwind CSS":    { img: "https://imgs.search.brave.com/BjNdIs12LvCKO1EJGQn_hHXwQ5YqtQNpr7MHLvWNAUs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzM1LzIvdGFpbHdp/bmQtY3NzLWxvZ28t/cG5nX3NlZWtsb2dv/LTM1NDY3NS5wbmc", glow: "#38BDF8" },
//   "Framer Motion":   { img: "https://imgs.search.brave.com/kvyxD6h0zPVwwjz45oUu-ZnlwuaOKG3spwtLchNNhjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQwLzEvZnJhbWVy/LWxvZ28tcG5nX3Nl/ZWtsb2dvLTQwNTA1/Ny5wbmc", glow: "#FF0080" },
//   "Three.js":        { img: "https://imgs.search.brave.com/j4P3fkadZkJUrtKqC4Z7ajnYDm7eDFPnCwtCAH36LK8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mYmku/Y3VsdHMzZC5jb20v/dXBsb2FkZXJzLzI2/NzM1NjYzL2lsbHVz/dHJhdGlvbi1maWxl/L2VjNzA0MjNkLTQw/MDUtNDcxNi05ZWQ4/LTRkOTI0MGVlNDYy/OC90aHJlZWpzMS5w/bmc", glow: "#049EF4" },
//   "Spring Boot":     { img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=240&fit=crop", glow: "#6DB33F" },
//   "GraphQL":         { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop", glow: "#E535AB" },
//   "WebFlux":         { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop", glow: "#6DB33F" },
//   "RESTful Design":  { img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=240&fit=crop", glow: "#F59E0B" },
//   "Node.js":         { img: "https://images.unsplash.com/photo-1627398242454-45a1465196b3?w=400&h=240&fit=crop", glow: "#68A063" },
//   "PostgreSQL":      { img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=240&fit=crop", glow: "#336791" },
//   "MongoDB":         { img: "https://images.unsplash.com/photo-1603322327561-7a08b9d0430d?w=400&h=240&fit=crop", glow: "#47A248" },
//   "Redis":           { img: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400&h=240&fit=crop", glow: "#FF4438" },
//   "Kafka Streams":   { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop", glow: "#FFF" },
//   "Elasticsearch":   { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop", glow: "#FEC514" },
//   "AWS / GCP":       { img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=240&fit=crop", glow: "#FF9900" },
//   "Docker":          { img: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=240&fit=crop", glow: "#2496ED" },
//   "Kubernetes":      { img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=240&fit=crop", glow: "#326CE5" },
//   "Terraform":       { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop", glow: "#7B42BC" },
//   "CI/CD Pipelines": { img: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=240&fit=crop", glow: "#FC6D26" },
// };


const skillPreviews = {
  "React 19":        { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/react/react-original.svg",              glow: "#61DAFB" },
  "Next.js":         { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nextjs/nextjs-original.svg",            glow: "#ffffff" },
  "Tailwind CSS":    { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/tailwindcss/tailwindcss-plain.svg",     glow: "#38BDF8" },
  "Framer Motion":   { img: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",                                  glow: "#FF0080" },
  "Three.js":        { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/threejs/threejs-original.svg",          glow: "#049EF4" },
  "Spring Boot":     { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/spring/spring-original.svg",            glow: "#6DB33F" },
  "GraphQL":         { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/graphql/graphql-plain.svg",             glow: "#E535AB" },
  "WebFlux":         { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/spring/spring-original.svg",            glow: "#6DB33F" },
  "RESTful Design":  { img: "https://cdn.worldvectorlogo.com/logos/rest-api-1.svg",                                     glow: "#F59E0B" },
  "Node.js":         { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nodejs/nodejs-original.svg",            glow: "#68A063" },
  "PostgreSQL":      { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/postgresql/postgresql-original.svg",    glow: "#336791" },
  "MongoDB":         { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/mongodb/mongodb-original.svg",          glow: "#47A248" },
  "Redis":           { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/redis/redis-original.svg",              glow: "#FF4438" },
  "Kafka Streams":   { img: "https://cdn.worldvectorlogo.com/logos/kafka-1.svg",                                        glow: "#fff" },
  "Elasticsearch":   { img: "https://cdn.worldvectorlogo.com/logos/elasticsearch.svg",                                  glow: "#FEC514" },
  "AWS / GCP":       { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/amazonwebservices/amazonwebservices-original.svg", glow: "#FF9900" },
  "Docker":          { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/docker/docker-original.svg",            glow: "#2496ED" },
  "Kubernetes":      { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/kubernetes/kubernetes-plain.svg",       glow: "#326CE5" },
  "Terraform":       { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/terraform/terraform-original.svg",      glow: "#7B42BC" },
  "CI/CD Pipelines": { img: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/github/github-original.svg",           glow: "#FC6D26" },
};
const stacks = [
  { level: "Layer 01", title: "UI / Presentation",    icon: Layout,    accentColor: "#D9FF00", skills: ["React 19","Next.js","Tailwind CSS","Framer Motion","Three.js"] },
  { level: "Layer 02", title: "API / Orchestration",  icon: Zap,       accentColor: "#60a5fa", skills: ["Spring Boot","GraphQL","WebFlux","RESTful Design","Node.js"] },
  { level: "Layer 03", title: "Persistence / Data",   icon: Database,  accentColor: "#c084fc", skills: ["PostgreSQL","MongoDB","Redis","Kafka Streams","Elasticsearch"] },
  { level: "Layer 04", title: "Ops / Infrastructure", icon: GitBranch, accentColor: "#f472b6", skills: ["AWS / GCP","Docker","Kubernetes","Terraform","CI/CD Pipelines"] },
];

// Card 3D entry styles — each card has a unique cinematic entry
const cardEntries = [
  // Card 1: flips in from the left on Y axis
  {
    initial:    { opacity: 0, rotateY: -65, x: -120, z: -200, transformOrigin: "left center" },
    animate:    { opacity: 1, rotateY: 0,   x: 0,    z: 0    },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  // Card 2: rises through the floor, rotating forward on X
  {
    initial:    { opacity: 0, rotateX: 70, y: 140, z: -180, transformOrigin: "bottom center" },
    animate:    { opacity: 1, rotateX: 0,  y: 0,   z: 0    },
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
  // Card 3: corkscrews in — rotates on Z while scaling up
  {
    initial:    { opacity: 0, rotate: -18, scale: 0.5, z: -300 },
    animate:    { opacity: 1, rotate: 0,   scale: 1,   z: 0    },
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
  // Card 4: flips in from the right on Y axis
  {
    initial:    { opacity: 0, rotateY: 65, x: 120, z: -200, transformOrigin: "right center" },
    animate:    { opacity: 1, rotateY: 0,  x: 0,   z: 0    },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
];

// ── Floating image preview ────────────────────────────────────────────────────
function SkillPreview({ skill, mouseX, mouseY }) {
  const preview = skillPreviews[skill];
  if (!preview) return null;

  const W = 160, H = 160, offset = 22;
  let left = mouseX + offset;
  let top  = mouseY - H / 2;
  if (left + W > window.innerWidth  - 16) left = mouseX - W - offset;
  if (top       < 8)                      top  = 8;
  if (top  + H  > window.innerHeight - 8) top  = window.innerHeight - H - 8;

  const cx    = left + W / 2;
  const cy    = top  + H / 2;
  const tiltX =  ((mouseY - cy) / H) * 16;
  const tiltY = -((mouseX - cx) / W) * 16;

  return (
    <motion.div
      key={skill}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1,  scale: 1, rotateX: tiltX, rotateY: tiltY }}
      exit={{    opacity: 0,  scale: 0.82 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{
        position: "fixed", left, top,
        width: W, height: H,
        zIndex: 9999, pointerEvents: "none",
        transformStyle: "preserve-3d", perspective: 800,
      }}
    >
      {/* Outer glow halo */}
      <div style={{
        position: "absolute", inset: -24, borderRadius: "50%",
        background: `radial-gradient(circle, ${preview.glow}50 0%, transparent 65%)`,
        filter: "blur(18px)", zIndex: -1,
      }} />

      {/* Dark pill container */}
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "1.5rem",
        background: "rgba(8,8,10,0.95)",
        border: `1px solid ${preview.glow}40`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 28px 56px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(20px)",
      }}>
        <img
          src={preview.img}
          alt={skill}
          style={{
            width: 88, height: 88,
            objectFit: "contain",
            filter: "drop-shadow(0 0 16px " + preview.glow + "80)",
          }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Skill name tag below */}
      <div style={{
        position: "absolute", bottom: -32, left: "50%", transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        fontSize: "0.65rem", fontFamily: "monospace", fontWeight: 700,
        color: preview.glow, letterSpacing: "0.12em", textTransform: "uppercase",
        opacity: 0.9,
      }}>
        {skill}
      </div>
    </motion.div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ stack, index, scrollYProgress, onSkillHover, onSkillLeave }) {
  const Icon   = stack.icon;
  const entry  = cardEntries[index];
  const start  = 0.08 + index * 0.08;
  const end    = start + 0.28;

  // Drive the card entry entirely from scroll
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  const opacity  = useTransform(progress, [0, 0.3, 1], [0, 0.6, 1]);
  const rotateY  = useTransform(progress, [0, 1], [entry.initial.rotateY  ?? 0, 0]);
  const rotateX  = useTransform(progress, [0, 1], [entry.initial.rotateX  ?? 0, 0]);
  const rotate   = useTransform(progress, [0, 1], [entry.initial.rotate   ?? 0, 0]);
  const x        = useTransform(progress, [0, 1], [entry.initial.x        ?? 0, 0]);
  const y        = useTransform(progress, [0, 1], [entry.initial.y        ?? 0, 0]);
  const scale    = useTransform(progress, [0, 1], [entry.initial.scale    ?? 1, 1]);

  return (
    <motion.div
      style={{ opacity, rotateY, rotateX, rotate, x, y, scale, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative rounded-[2rem] p-8 border border-white/5 overflow-hidden cursor-default"
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div className="absolute inset-0 rounded-[2rem]"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(14px)" }} />
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${stack.accentColor}45` }} />
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${stack.accentColor}18, transparent 70%)` }} />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black font-mono"
              style={{ background: `${stack.accentColor}18`, border: `1px solid ${stack.accentColor}40`, color: stack.accentColor }}>
              0{index + 1}
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">{stack.level}</span>
          </div>
          <div className="p-3 rounded-xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            style={{ background: `${stack.accentColor}14` }}>
            <Icon size={18} style={{ color: stack.accentColor }} />
          </div>
        </div>

        <h4 className="text-xl font-black uppercase tracking-tighter text-white mb-6"
          style={{ textShadow: `0 0 30px ${stack.accentColor}25` }}>
          {stack.title}
        </h4>

        <ul className="space-y-3">
          {stack.skills.map((skill) => (
            <motion.li
              key={skill}
              className="flex items-center gap-3 text-sm font-mono text-gray-500 cursor-default select-none"
              onMouseEnter={(e) => onSkillHover(skill, e)}
              onMouseLeave={onSkillLeave}
              whileHover={{ x: 5, color: "#e5e7eb", transition: { duration: 0.15 } }}
            >
              <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: stack.accentColor }}
                whileHover={{ scale: 2 }} />
              {skill}
            </motion.li>
          ))}
        </ul>

        <motion.div className="mt-7 h-px rounded-full"
          style={{
            scaleX: useTransform(scrollYProgress, [start, end + 0.05], [0, 1]),
            transformOrigin: "left",
            background: `linear-gradient(to right, ${stack.accentColor}80, ${stack.accentColor}08)`,
          }} />
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SkillsMatrix() {
  const sectionRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 });

  const { scrollYProgress: raw } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.3"],
  });
  const scrollYProgress = useSpring(raw, { stiffness: 80, damping: 22, restDelta: 0.001 });

  const handleMouseMove  = useCallback((e) => setMousePos({ x: e.clientX, y: e.clientY }), []);
  const handleSkillHover = useCallback((skill, e) => { setMousePos({ x: e.clientX, y: e.clientY }); setActiveSkill(skill); }, []);
  const handleSkillLeave = useCallback(() => setActiveSkill(null), []);

  const titleWords = [
    { text: "THE",     color: "white",   s: 0.00, e: 0.12 },
    { text: "SYSTEM",  color: "white",   s: 0.04, e: 0.16 },
    { text: "LAYERS.", color: "#374151", s: 0.08, e: 0.20 },
  ];

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden" style={{ minHeight: "100vh" }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%,transparent 40%,rgba(0,0,0,0.7) 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20">
          <motion.p className="text-xs font-mono font-bold uppercase tracking-[0.5em] mb-5"
            style={{ color: "#D9FF00", opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}>
            Technical Backbone
          </motion.p>
          <h2 className="font-black italic tracking-tighter"
            style={{ fontSize: "clamp(2.8rem,8vw,7rem)", lineHeight: 1, perspective: "900px" }}>
            {titleWords.map(({ text, color, s, e }) => (
              <motion.span key={text} style={{
                display: "inline-block", color,
                marginRight: text === "LAYERS." ? 0 : "0.2em",
                opacity:  useTransform(scrollYProgress, [s, e], [0, 1]),
                y:        useTransform(scrollYProgress, [s, e], [80, 0]),
                rotateX:  useTransform(scrollYProgress, [s, e], [60, 0]),
                transformOrigin: "bottom center",
              }}>{text}</motion.span>
            ))}
          </h2>
          <div className="mt-6 mx-auto max-w-xs h-px relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div className="absolute inset-0"
              style={{ scaleX: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]), transformOrigin: "left",
                background: "linear-gradient(to right,#D9FF00,#60a5fa,#c084fc,#f472b6)" }} />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: "1200px" }}>
          {stacks.map((stack, i) => (
            <Card key={i} stack={stack} index={i} scrollYProgress={scrollYProgress}
              onSkillHover={handleSkillHover} onSkillLeave={handleSkillLeave} />
          ))}
        </div>

        {/* Footer */}
       <motion.div
  className="mt-16 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
  style={{
    opacity: useTransform(scrollYProgress, [0.72, 0.92], [0, 1]),
    y: useTransform(scrollYProgress, [0.72, 0.92], [40, 0]),
    border: "1px solid rgba(217,255,0,0.12)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
  }}
>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background:"rgba(217,255,0,0.1)", border:"1px solid rgba(217,255,0,0.2)" }}>
              <ShieldCheck color="#D9FF00" size={32} />
            </div>
            <div>
              <div className="text-lg font-bold text-white uppercase tracking-tighter italic">Enterprise Ready</div>
              <div className="text-sm font-mono text-gray-500">Compliant with Spring Security & OWASP Top 10</div>
            </div>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-white/10" />
          <div className="text-center md:text-right">
            <div className="text-xs font-mono text-gray-500 uppercase mb-2">Total System Mastery</div>
            <div className="text-3xl font-black tracking-tighter" style={{ color: "#D9FF00" }}>
              99.99% <span className="text-white">UPTIME</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating image preview */}
      <AnimatePresence>
        {activeSkill && (
          <SkillPreview skill={activeSkill} mouseX={mousePos.x} mouseY={mousePos.y} />
        )}
      </AnimatePresence>
    </section>
  );
}