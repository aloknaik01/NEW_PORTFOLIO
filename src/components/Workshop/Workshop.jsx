import React from 'react';
import { Github, ArrowUpRight, Server, Globe, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const Workshop = () => {
  const PROJECTS = [
    {
      title: "Vortex Engine",
      subtitle: "Financial Microservices",
      description:
        "High-throughput transaction processor capable of handling 50k+ events/sec using Spring WebFlux and Kafka.",
      tech: ["Java 21", "Kafka", "Postgres", "Redis"],
      size: "lg",
      icon: <Server className="text-[#D9FF00]" size={20} />,
      color: "#D9FF00",
    },
    {
      title: "Nexus UI",
      subtitle: "Enterprise Dashboard",
      description: "A real-time monitoring suite with dynamic layouts.",
      tech: ["Next.js", "Zustand", "D3.js"],
      size: "sm",
      icon: <Globe className="text-blue-400" size={20} />,
      color: "#60A5FA",
    },
    {
      title: "Sentinel Auth",
      subtitle: "Security Layer",
      description: "Custom OAuth2 implementation for distributed systems.",
      tech: ["Spring Security", "JWT", "OAuth2"],
      size: "sm",
      icon: <Database className="text-purple-400" size={20} />,
      color: "#A78BFA",
    },
  ];

  return (
    <section id="workshop" className="py-24 px-5 md:px-10 max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-[#D9FF00] font-bold text-[10px] uppercase tracking-[0.45em] mb-3">
          Case Studies
        </h2>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter">
            BENTO <span className="text-gray-600"><br/>PROJECTS.</span>
          </h3>

          <p className="max-w-md text-gray-500 font-mono text-xs leading-relaxed border-l border-white/10 pl-5">
            // Selected architectures demonstrating scalability and UI elegance.
          </p>
        </div>
      </div>

      {/* ⬇️ Slightly reduced row height */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[210px]">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className={`group relative glass rounded-[2rem] p-6 overflow-hidden transition-all duration-500 ${
              project.size === 'lg'
                ? 'md:col-span-2 md:row-span-2'
                : 'md:col-span-1 md:row-span-2'
            }`}
          >
            {/* Background Accent */}
            <div
              className="absolute top-0 right-0 w-56 h-56 blur-[90px] opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: project.color }}
            ></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-auto flex justify-between items-start">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {project.icon}
                </div>

                <div className="flex gap-2">
                  <a
                    href="#"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[#D9FF00] hover:text-black transition-all"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="#"
                    className="p-2.5 rounded-full bg-[#D9FF00] text-black"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
                  {project.subtitle}
                </div>

                <h4
                  className={`font-black mb-3 ${
                    project.size === 'lg'
                      ? 'text-3xl md:text-4xl'
                      : 'text-xl'
                  }`}
                >
                  {project.title}
                </h4>

                <p className="text-gray-400 text-sm mb-5 max-w-sm line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Workshop;
