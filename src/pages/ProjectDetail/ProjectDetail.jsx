import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Globe, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { getProjectById } from "../../api/portfolioApi";

export default function ProjectDetail() {
  const { id } = useParams();
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });

  const screenshots = useMemo(() => {
    if (!project?.screenshots) return [];
    try {
      return typeof project.screenshots === 'string' ? JSON.parse(project.screenshots) : project.screenshots;
    } catch (e) {
      console.error("Error parsing screenshots:", e);
      return [];
    }
  }, [project?.screenshots]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={32} className="text-[#D9FF00] animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-white/40 uppercase tracking-widest">Project not found</p>
        <Link to="/workshop" className="text-[#D9FF00] font-mono text-sm hover:underline">← Back to Archive</Link>
      </div>
    );
  }

  const techs = project.technologies?.split(",").map((t) => t.trim()) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-14 h-16 flex items-center justify-between">
          <Link to="/workshop" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Back to Archive</span>
          </Link>
          <div className="flex gap-3">
            {project.gitLink && (
              <a href={project.gitLink} target="_blank" rel="noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#D9FF00]/50 transition-colors rounded-sm">
                <Github size={16} className="text-white/40 hover:text-white" />
              </a>
            )}
            {project.projectLink && (
              <a href={project.projectLink} target="_blank" rel="noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#D9FF00]/50 transition-colors rounded-sm">
                <ExternalLink size={16} className="text-white/40 hover:text-white" />
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[30vh] lg:h-[40vh] overflow-hidden"
        >
          <img
            src={project.bannerUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {/* Title on banner */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#D9FF00] shadow-[0_0_12px_#D9FF00]" />
                <span className="font-mono text-[10px] text-[#D9FF00] uppercase tracking-[0.4em]">{project.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.8] uppercase italic">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-8 lg:py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
            
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-10"
            >
              {/* Description */}
              <div>
                <h2 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-4">Dossier_Overview</h2>
                <p className="text-base text-white/80 font-normal leading-relaxed">{project.description}</p>
              </div>

              {/* Screenshots Gallery */}
              {screenshots.length > 0 && (
                <div>
                  <h2 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-4">Visual_Data</h2>
                  
                  {/* Main screenshot */}
                  <div className="relative border border-white/10 overflow-hidden mb-3 rounded-sm bg-black">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeScreenshot}
                        src={screenshots[activeScreenshot]?.url}
                        alt={`Screenshot ${activeScreenshot + 1}`}
                        className="w-full h-64 md:h-[350px] object-contain bg-black/40"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>

                    {screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveScreenshot((p) => (p === 0 ? screenshots.length - 1 : p - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-[#D9FF00]/50 transition-colors text-white"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={() => setActiveScreenshot((p) => (p === screenshots.length - 1 ? 0 : p + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-[#D9FF00]/50 transition-colors text-white"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {screenshots.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {screenshots.map((ss, i) => (
                        <button
                          key={ss.public_id || i}
                          onClick={() => setActiveScreenshot(i)}
                          className={`flex-shrink-0 w-24 h-16 border transition-all rounded-sm overflow-hidden ${
                            i === activeScreenshot ? "border-[#D9FF00] shadow-[0_0_12px_rgba(217,255,0,0.3)]" : "border-white/10 opacity-40 hover:opacity-80"
                          }`}
                        >
                          <img src={ss.url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Meta card */}
              <div className="border border-white/10 p-5 space-y-5 bg-white/[0.02] rounded-sm">
                <div>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] block mb-1">Stack_Architecture</span>
                  <span className="text-[13px] font-bold text-white uppercase tracking-widest">{project.stack}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] block mb-1">System_Integrity</span>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${project.deployed === "Yes" ? "bg-[#D9FF00] shadow-[0_0_10px_#D9FF00]" : "bg-white/20"}`} />
                    <span className="text-sm font-bold text-white uppercase tracking-widest">
                      {project.deployed === "Yes" ? "Live Deployment" : "Internal Build"}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] block mb-1">Timestamp</span>
                  <span className="text-[13px] text-white/60 font-mono">
                    {new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Technologies */}
              <div className="border border-white/10 p-5 bg-white/[0.02] rounded-sm">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] block mb-3">Encryption_Layer / Stack</span>
                <div className="flex flex-wrap gap-2">
                  {techs.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 font-mono text-[10px] text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="grid gap-3">
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full px-6 py-4 bg-[#D9FF00] text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#e6ff4d] transition-all"
                  >
                    <span>Execute Live Deployment</span>
                    <Globe size={16} />
                  </a>
                )}
                {project.gitLink && (
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full px-6 py-4 border border-white/10 font-bold text-xs uppercase tracking-[0.2em] text-white hover:border-[#D9FF00]/50 transition-all"
                  >
                    <span>Fetch Source Code</span>
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
}
