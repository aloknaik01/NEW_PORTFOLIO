
import React from 'react';
import { Layers, Zap, ShieldCheck, Database, Layout, GitBranch } from 'lucide-react';

export const SkillsMatrix = () => {
  const stacks = [
    {
      level: "Layer 01",
      title: "UI / Presentation",
      icon: <Layout className="text-[#D9FF00]" />,
      skills: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      level: "Layer 02",
      title: "API / Orchestration",
      icon: <Zap className="text-blue-400" />,
      skills: ["Spring Boot", "GraphQL", "WebFlux", "RESTful Design", "Node.js"]
    },
    {
      level: "Layer 03",
      title: "Persistence / Data",
      icon: <Database className="text-purple-400" />,
      skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka Streams", "Elasticsearch"]
    },
    {
      level: "Layer 04",
      title: "Ops / Infrastructure",
      icon: <GitBranch className="text-pink-400" />,
      skills: ["AWS / GCP", "Docker", "Kubernetes", "Terraform", "CI/CD Pipelines"]
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-[#D9FF00] font-bold text-xs uppercase tracking-[0.5em] mb-4">Technical Backbone</h2>
          <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter">THE SYSTEM <span className="text-gray-600">LAYERS.</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stacks.map((stack, i) => (
            <div key={i} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-[#D9FF00]/30 transition-all group">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">{stack.level}</span>
                <div className="p-3 rounded-xl bg-white/5 group-hover:rotate-12 transition-transform duration-500">
                  {stack.icon}
                </div>
              </div>
              
              <h4 className="text-xl font-black mb-6 uppercase tracking-tighter">{stack.title}</h4>
              
              <ul className="space-y-4">
                {stack.skills.map((skill, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-mono text-gray-500 group-hover:text-gray-300">
                    <span className="w-1 h-1 bg-[#D9FF00] rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 glass rounded-3xl border border-[#D9FF00]/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#D9FF00]/10 flex items-center justify-center border border-[#D9FF00]/20">
              <ShieldCheck className="text-[#D9FF00]" size={32} />
            </div>
            <div>
              <div className="text-lg font-bold text-white uppercase tracking-tighter italic">Enterprise Ready</div>
              <div className="text-sm text-gray-500 font-mono">Compliant with Spring Security & OWASP Top 10</div>
            </div>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-white/10"></div>
          <div className="text-center md:text-right">
            <div className="text-xs font-mono text-gray-500 uppercase mb-2">Total System Mastery</div>
            <div className="text-3xl font-black text-[#D9FF00] tracking-tighter">99.99% <span className="text-white">UPTIME</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

