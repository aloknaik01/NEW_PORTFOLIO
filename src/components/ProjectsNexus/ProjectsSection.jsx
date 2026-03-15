import { useRef, memo } from "react";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Activity, Terminal } from "lucide-react";
import ProjectCard from "./ProjectCard";

const SP = { stiffness: 80, damping: 30, mass: 1 };

export default memo(function ProjectsSection() {
  const { projects = [] } = useSelector((state) => state.portfolio);
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useSpring(useTransform(scrollYProgress, [0, 0.15], [60, 0]), SP);
  const lineW = useSpring(useTransform(scrollYProgress, [0.02, 0.12], [0, 100]), SP);

  return (
    <section id="workshop" ref={sectionRef} className="relative py-20 overflow-hidden bg-black text-white">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex justify-around opacity-[0.04]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-px h-full bg-white" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-10">
            <motion.div style={{ width: lineW }} className="h-px bg-[#D9FF00]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-[#D9FF00]">
              Project Archive
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.div style={{ y: headerY }} className="flex-shrink-0">
              <h2 className="text-[2.2rem] md:text-[3.5rem] lg:text-[4.2rem] font-bold tracking-[-0.06em] leading-[0.8] uppercase italic whitespace-nowrap">
                Selected <span className="text-[#D9FF00]">Works.</span>
              </h2>
            </motion.div>

          </div>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-sm">
            <Terminal size={36} className="text-white/20 mb-6" />
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em]">
              No projects found in the archive
            </p>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            <AnimatePresence>
              {projects.map((project, idx) => (
                <ProjectCard key={project.id || idx} project={project} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer coordinates */}
        <div className="mt-20 flex justify-between items-center text-white/20 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>Archive v4.2_NEXUS</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </section>
  );
});
