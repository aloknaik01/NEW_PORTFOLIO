// import React from 'react';
// import { Github, ArrowUpRight, Server, Globe, Database } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Workshop = () => {
//   const PROJECTS = [
//     {
//       title: "Vortex Engine",
//       subtitle: "Financial Microservices",
//       description:
//         "High-throughput transaction processor capable of handling 50k+ events/sec using Spring WebFlux and Kafka.",
//       tech: ["Java 21", "Kafka", "Postgres", "Redis"],
//       size: "lg",
//       icon: <Server className="text-[#D9FF00]" size={20} />,
//       color: "#D9FF00",
//     },
//     {
//       title: "Nexus UI",
//       subtitle: "Enterprise Dashboard",
//       description: "A real-time monitoring suite with dynamic layouts.",
//       tech: ["Next.js", "Zustand", "D3.js"],
//       size: "sm",
//       icon: <Globe className="text-blue-400" size={20} />,
//       color: "#60A5FA",
//     },
//     {
//       title: "Sentinel Auth",
//       subtitle: "Security Layer",
//       description: "Custom OAuth2 implementation for distributed systems.",
//       tech: ["Spring Security", "JWT", "OAuth2"],
//       size: "sm",
//       icon: <Database className="text-purple-400" size={20} />,
//       color: "#A78BFA",
//     },
//   ];

//   return (
//     <section id="workshop" className="py-24 px-5 md:px-10 max-w-6xl mx-auto">
//       <div className="mb-16">
//         <h2 className="text-[#D9FF00] font-bold text-[10px] uppercase tracking-[0.45em] mb-3">
//           Case Studies
//         </h2>

//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//           <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter">
//             BENTO <span className="text-gray-600"><br/>PROJECTS.</span>
//           </h3>

//           <p className="max-w-md text-gray-500 font-mono text-xs leading-relaxed border-l border-white/10 pl-5">
//             // Selected architectures demonstrating scalability and UI elegance.
//           </p>
//         </div>
//       </div>

//       {/* ⬇️ Slightly reduced row height */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[210px]">
//         {PROJECTS.map((project, idx) => (
//           <motion.div
//             key={idx}
//             whileHover={{ y: -5 }}
//             className={`group relative glass rounded-[2rem] p-6 overflow-hidden transition-all duration-500 ${
//               project.size === 'lg'
//                 ? 'md:col-span-2 md:row-span-2'
//                 : 'md:col-span-1 md:row-span-2'
//             }`}
//           >
//             {/* Background Accent */}
//             <div
//               className="absolute top-0 right-0 w-56 h-56 blur-[90px] opacity-10 group-hover:opacity-20 transition-opacity"
//               style={{ backgroundColor: project.color }}
//             ></div>

//             <div className="relative z-10 h-full flex flex-col">
//               <div className="mb-auto flex justify-between items-start">
//                 <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
//                   {project.icon}
//                 </div>

//                 <div className="flex gap-2">
//                   <a
//                     href="#"
//                     className="p-2.5 rounded-full bg-white/5 hover:bg-[#D9FF00] hover:text-black transition-all"
//                   >
//                     <Github size={16} />
//                   </a>
//                   <a
//                     href="#"
//                     className="p-2.5 rounded-full bg-[#D9FF00] text-black"
//                   >
//                     <ArrowUpRight size={16} />
//                   </a>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
//                   {project.subtitle}
//                 </div>

//                 <h4
//                   className={`font-black mb-3 ${
//                     project.size === 'lg'
//                       ? 'text-3xl md:text-4xl'
//                       : 'text-xl'
//                   }`}
//                 >
//                   {project.title}
//                 </h4>

//                 <p className="text-gray-400 text-sm mb-5 max-w-sm line-clamp-3">
//                   {project.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {project.tech.map((t) => (
//                     <span
//                       key={t}
//                       className="text-[11px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Workshop;


import React, { useState } from 'react';
import { Github, ArrowUpRight, Server, Globe, Database, Cpu, Layout, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    title: "Vortex Engine",
    subtitle: "Financial Microservices",
    description: "High-throughput transaction processor capable of handling 50k+ events/sec using Spring WebFlux and Kafka.",
    tech: ["Java 21", "Kafka", "Postgres", "Redis"],
    size: "lg",
    icon: <Server className="text-[#D9FF00]" />,
    color: "#D9FF00",
    category: "BACKEND"
  },
  {
    title: "Nexus UI",
    subtitle: "Enterprise Dashboard",
    description: "A real-time monitoring suite with dynamic layouts and high-performance visualizations.",
    tech: ["Next.js", "Zustand", "D3.js"],
    size: "sm",
    icon: <Globe className="text-blue-400" />,
    color: "#60A5FA",
    category: "FRONTEND"
  },
  {
    title: "Sentinel Auth",
    subtitle: "Security Layer",
    description: "Custom OAuth2 implementation for distributed systems with multi-tenant support.",
    tech: ["Spring Security", "JWT", "OAuth2"],
    size: "sm",
    icon: <Database className="text-purple-400" />,
    color: "#A78BFA",
    category: "FULLSTACK"
  },
  {
    title: "Holo-Design System",
    subtitle: "UI Component Library",
    description: "A comprehensive design system built for high-scale enterprise applications.",
    tech: ["React", "Storybook", "Tailwind"],
    size: "sm",
    icon: <Layout className="text-pink-400" />,
    color: "#F472B6",
    category: "FRONTEND"
  },
  {
    title: "Synapse Bridge",
    subtitle: "API Gateway",
    description: "Intelligent routing layer with built-in rate limiting and telemetry.",
    tech: ["Go", "gRPC", "Envoy"],
    size: "sm",
    icon: <Layers className="text-cyan-400" />,
    color: "#22D3EE",
    category: "BACKEND"
  }
];

const Workshop = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const MotionDiv = motion.div;

  const filteredProjects =
    activeFilter === 'ALL'
      ? PROJECTS
      : PROJECTS.filter(p => p.category === activeFilter);

  const filters = [
    { id: 'ALL', label: 'ALL_SYSTEMS' },
    { id: 'FRONTEND', label: 'UI_MODULES' },
    { id: 'BACKEND', label: 'CORE_ENGINE' },
    { id: 'FULLSTACK', label: 'END_TO_END' },
  ];

  return (
    <section id="workshop" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-[#D9FF00] font-bold text-[10px] uppercase tracking-[0.4em] mb-3">
          Case Studies
        </h2>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
             <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter">
             BENTO <span className="text-gray-600"><br/>PROJECTS.</span>
           </h3>
          </div>

          {/* Cyberpunk Filter Selector */}
          <div className="flex flex-wrap gap-2 p-1.5 glass rounded-2xl border-white/5 bg-black/40">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-[9px] font-mono font-bold uppercase tracking-widest transition-all relative overflow-hidden group ${
                  activeFilter === filter.id
                    ? 'text-black bg-[#D9FF00]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{filter.label}</span>

                {activeFilter === filter.id && (
                  <MotionDiv
                    layoutId="filter-active"
                    className="absolute inset-0 bg-[#D9FF00] -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <MotionDiv layout className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <MotionDiv
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              whileHover={{ y: -4 }}
              className={`group relative glass rounded-3xl p-6 overflow-hidden bento-card transition-all duration-500 ${
                project.size === 'lg'
                  ? 'md:col-span-2 md:row-span-2'
                  : 'md:col-span-1 md:row-span-2'
              }`}
            >
              {/* Background Accent */}
              <div
                className="absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ backgroundColor: project.color }}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-auto flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(project.icon, { size: 20 })}
                  </div>

                  <div className="flex gap-1.5">
                    <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-[#D9FF00] hover:text-black transition-all">
                      <Github size={16} />
                    </a>
                    <a href="#" className="p-2.5 rounded-full bg-[#D9FF00] text-black">
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[8px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-500 uppercase border border-white/5">
                      {project.category}
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                      {project.subtitle}
                    </div>
                  </div>

                  <h4
                    className={`font-black mb-2 tracking-tighter uppercase transition-colors group-hover:text-[#D9FF00] ${
                      project.size === 'lg'
                        ? 'text-3xl md:text-4xl'
                        : 'text-xl'
                    }`}
                  >
                    {project.title}
                  </h4>

                  <p className="text-gray-400 text-xs mb-4 max-w-sm line-clamp-2 font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="text-[9px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 group-hover:text-gray-200 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D9FF00]/10 to-transparent group-hover:via-[#D9FF00]/40 transition-all" />
            </MotionDiv>
          ))}
        </AnimatePresence>
      </MotionDiv>

      {filteredProjects.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 flex flex-col items-center justify-center border border-white/5 rounded-3xl glass mt-8"
        >
          <Cpu size={48} className="text-gray-700 mb-4 animate-pulse" />
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">
            No modules matching this frequency...
          </p>
        </MotionDiv>
      )}
    </section>
  );
};

export default Workshop;



