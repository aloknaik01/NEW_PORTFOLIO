import { useRef, useMemo, memo } from "react";
import { useSelector } from "react-redux";
import {
  Cpu,
  Box,
  Layers,
  Terminal,
  Palette,
  GitBranch,
  Database,
  Globe,
  Zap,
  Code2,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const SP = { stiffness: 62, damping: 22, mass: 1 };

const TOOL_COLORS = {
  active: "#D9FF00",
  design: "#FF7262",
  backend: "#38BDF8",
  frontend: "#60A5FA",
  database: "#C084FC",
  cloud: "#34D399",
  security: "#FB7185",
  default: "#D9FF00"
};

const getToolColor = (tool, index) => {
  if (tool.color) return tool.color;
  const name = tool.name?.toLowerCase() || "";
  if (name.includes("figma") || name.includes("design") || name.includes("canvas")) return TOOL_COLORS.design;
  if (name.includes("node") || name.includes("api") || name.includes("java")) return TOOL_COLORS.backend;
  if (name.includes("react") || name.includes("html") || name.includes("css")) return TOOL_COLORS.frontend;
  if (name.includes("db") || name.includes("sql") || name.includes("postgre") || name.includes("mongo")) return TOOL_COLORS.database;
  if (name.includes("docker") || name.includes("aws") || name.includes("cloud") || name.includes("vercel")) return TOOL_COLORS.cloud;
  if (name.includes("git") || name.includes("auth") || name.includes("shield")) return TOOL_COLORS.security;

  const palette = [TOOL_COLORS.active, TOOL_COLORS.backend, TOOL_COLORS.database, TOOL_COLORS.cloud, TOOL_COLORS.security, TOOL_COLORS.design];
  return palette[index % palette.length];
};

const ToolCard = memo(function ToolCard({ tool, index }) {
  const isFeatured = index < 2;
  const color = getToolColor(tool, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`group relative rounded-2xl glass-card overflow-hidden cursor-default ${isFeatured ? "md:col-span-1 row-span-1" : ""
        }`}
    >

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        {tool.svgUrl && (
          <img
            src={tool.svgUrl}
            alt=""
            className="w-full h-full object-contain transition-all duration-1000 p-2 grayscale opacity-[0.08] group-hover:opacity-[0.16] group-hover:grayscale-0 scale-[1.35] group-hover:scale-[1.65] group-hover:rotate-0 -rotate-12 translate-x-[35%] translate-y-[35%] group-hover:translate-x-0 group-hover:translate-y-0"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              filter: `drop-shadow(0 0 30px ${color}15)`
            }}
          />
        )}
      </div>

      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
        style={{ background: `${color}15` }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: `1px solid ${color}40` }}
      />

      <div className="relative p-5 md:p-6 flex flex-col h-full z-10">
        <div className="flex items-start justify-between mb-8">
          <span
            className="text-[8px] font-mono uppercase tracking-[0.3em] px-2.5 py-1.5 rounded-lg opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{
              color: color,
              backgroundColor: `${color}10`,
              border: `1px solid ${color}20`,
            }}
          >
            {tool.level || "Tech Stack"}
          </span>
        </div>

        <h5
          className="text-xl font-bold tracking-tight text-foreground mb-2 transition-colors duration-300 group-hover:text-white"
        >
          {tool.name}
        </h5>

        <p className="text-[11px] text-muted-foreground font-light leading-relaxed line-clamp-2 transition-opacity duration-300">
          {tool.description || "Production grade toolkit integration."}
        </p>

        <div
          className="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-700 ease-out"
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
        />
      </div>
    </motion.div>
  );
});

export default function ApplicationsSection() {
  const { applications: apiApps, projects, skills } = useSelector((state) => state.portfolio);

  const tools = apiApps || [];

  const stats = useMemo(() => [
    { label: "Tools Mastered", value: `${apiApps?.length || 0}+`, icon: <Zap size={14} /> },
    { label: "Skills Acquired", value: `${skills?.length || 0}+`, icon: <Cpu size={14} /> },
    { label: "Projects Deployed", value: `${projects?.length || 0}+`, icon: <Globe size={14} /> },
  ], [apiApps?.length, skills?.length, projects?.length]);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [80, 0]),
    SP
  );
  const lineW = useTransform(scrollYProgress, [0.02, 0.18], [0, 48]);

  return (
    <section id="applications" ref={sectionRef} className="relative py-16 overflow-hidden bg-black text-white">

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -right-[10%] top-[20%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsla(199,89%,60%,0.04) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -left-[5%] bottom-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsla(68,100%,50%,0.03) 0%, transparent 65%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 relative">

        <motion.div style={{ opacity: titleOpacity }} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              className="h-[2px] bg-secondary rounded-full"
              style={{ width: lineW }}
            />
            <span className="text-secondary text-[10px] font-mono font-bold uppercase tracking-[0.5em]">
              System Stack
            </span>
          </div>
          <motion.h3
            style={{ y: titleY }}
            className="text-[2.8rem] md:text-[4.2rem] lg:text-[5.2rem] font-black italic tracking-tighter leading-[0.85]"
          >
            <span className="text-foreground">APP</span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px hsla(0,0%,100%,0.12)" }}
            >
              LICA
            </span>
            <span className="text-foreground">TIONS</span>
            <span className="text-secondary">_</span>
          </motion.h3>
          <motion.p
            style={{ opacity: titleOpacity }}
            className="mt-4 text-sm text-muted-foreground max-w-md font-light leading-relaxed"
          >
            The engineering toolkit powering every deployment. Carefully selected
            for maximum throughput and architectural integrity.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-4 md:p-5 text-center group hover:glow-secondary transition-all duration-500"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-secondary opacity-70 group-hover:opacity-100 transition-opacity">
                {stat.icon}
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground line-clamp-1">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name || i} tool={tool} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
