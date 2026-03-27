import { useState, useMemo, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";

const getCategoryColor = (category) => {
  switch (category) {
    case "UI Modules": return "72 100% 50%";
    case "API Driven": return "213 94% 68%";
    case "Full Stack": return "270 70% 75%";
    default: return "72 100% 50%";
  }
};

export default memo(function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const accentHsl = useMemo(() => getCategoryColor(project.category), [project.category]);
  const accent = useMemo(() => `hsl(${accentHsl})`, [accentHsl]);

  const handleCardClick = useCallback(() => {
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="relative grid lg:grid-cols-[1fr_280px] border border-white/10 hover:border-[#D9FF00]/30 bg-[#0A0A0A] transition-colors duration-500 overflow-hidden rounded-sm">

        <div className="relative h-48 lg:h-[260px] overflow-hidden">
          <motion.img
            src={project.bannerUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: isHovered ? "grayscale(0)" : "grayscale(0.8)",
              opacity: isHovered ? 1 : 0.5,
              scale: isHovered ? 1.05 : 1,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="absolute top-6 left-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
            <span className="font-mono text-[10px] text-white/40 tracking-[0.4em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-xl lg:text-3xl font-bold tracking-tight leading-none text-white italic">
              {project.title.toUpperCase()}
            </h3>
          </div>

        </div>

        <div className="p-5 flex flex-col justify-between bg-white/[0.02]">
          <div className="space-y-4">

            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase block mb-1">Sector</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                  {project.category}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase block mb-1">Status</span>
                <span className="text-xs font-bold text-white">
                  {project.deployed === "Yes" ? "DEPLOYED" : "IN_DEV"}
                </span>
              </div>
            </div>

            <p className="text-[13px] text-white/60 font-light leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies?.split(",").map((t) => (
                <span
                  key={t.trim()}
                  className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-white/40 group-hover:text-white/80 group-hover:border-[#D9FF00]/20 transition-all"
                >
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3 group/view">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#D9FF00] group-hover:shadow-[0_0_15px_rgba(217,255,0,0.3)] transition-all">
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-[#D9FF00] transition-colors" />
              </div>
            </div>

            <div className="flex gap-2">
              {project.gitLink && (
                <a
                  href={project.gitLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#D9FF00]/50 transition-colors"
                >
                  <Github size={14} className="text-white/40 hover:text-white" />
                </a>
              )}
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#D9FF00]/50 transition-colors"
                >
                  <Globe size={14} className="text-white/40 hover:text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
