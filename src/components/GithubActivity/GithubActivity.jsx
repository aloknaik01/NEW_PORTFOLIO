
import { Github, Zap, GitCommit, GitPullRequest, Code2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';


const GithubActivity = () => {
    const rows = 7;
  const cols = 22;
  const activityData = Array.from({ length: rows * cols }, () => Math.floor(Math.random() * 5));

  const getIntensity = (val) => {
    if (val === 0) return 'bg-white/[0.02] border-white/5';
    if (val === 1) return 'bg-neon-lime/10 border-neon-lime/5';
    if (val === 2) return 'bg-neon-lime/30 border-neon-lime/10';
    if (val === 3) return 'bg-neon-lime/60 border-neon-lime/20';
    return 'bg-neon-lime shadow-[0_0_10px_#D9FF00] border-neon-lime';
  };
  return (
    <section id="activity" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-neon-lime font-bold text-[10px] uppercase tracking-[0.4em] mb-3">Open Source Pulse</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Source <span className="text-gray-600">Control.</span></h3>
            <a href="#" className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-neon-lime transition-colors uppercase tracking-widest border-b border-transparent hover:border-neon-lime pb-1">
              <Github size={12} /> View_Full_Registry.sh <ExternalLink size={10} />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Heatmap Card */}
          <div className="glass rounded-3xl border-white/5 p-6 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neon-lime/10 text-neon-lime">
                  <GitCommit size={18} />
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-tighter italic">Contribution Matrix</div>
                  <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Active_Node: production-branch</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 5 ? 'bg-neon-lime animate-pulse' : 'bg-white/10'}`}></div>
                ))}
              </div>
            </div>

            {/* Grid Visualization */}
            <div className="relative">
              <div className="flex gap-1.5 overflow-x-auto pb-4 scrollbar-hide">
                {Array.from({ length: cols }).map((_, cIndex) => (
                  <div key={cIndex} className="flex flex-col gap-1.5 flex-shrink-0">
                    {Array.from({ length: rows }).map((_, rIndex) => {
                      const value = activityData[cIndex * rows + rIndex];
                      return (
                        <motion.div
                          key={rIndex}
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          className={`w-3.5 h-3.5 rounded-[3px] border ${getIntensity(value)} transition-colors duration-500 cursor-help relative group/node`}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded text-[8px] font-mono text-white opacity-0 group-hover/node:opacity-100 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                             {value * 2 + 1} Commits :: Oct {cIndex + 1}, 2024
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                <motion.div 
                   animate={{ left: ['-10%', '110%'] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 bottom-0 w-[2px] bg-neon-lime shadow-[0_0_20px_#D9FF00]"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                   <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Heavy Action</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-white/10"></div>
                   <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Idling</span>
                </div>
              </div>
              <div className="text-[9px] font-mono text-gray-600 uppercase italic">
                Data_Stream: Syncing_Every_24h
              </div>
            </div>
          </div>

          {/* Side Stats */}
          <div className="space-y-4">
            <div className="glass p-5 rounded-2xl border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform">
                <Zap size={40} className="text-neon-lime" />
              </div>
              <div className="text-[9px] font-mono text-neon-lime uppercase tracking-[0.3em] mb-1">Current_Streak</div>
              <div className="text-4xl font-black text-white italic tracking-tighter uppercase">42 <span className="text-xs font-mono font-bold text-gray-600">Days</span></div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  className="h-full bg-neon-lime" 
                />
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <GitPullRequest size={20} />
              </div>
              <div>
                <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">PR Acceptance</div>
                <div className="text-lg font-black text-white italic tracking-tighter uppercase">98.4%</div>
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                <Code2 size={20} />
              </div>
              <div>
                <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Lines_Committed</div>
                <div className="text-lg font-black text-white italic tracking-tighter uppercase">124.5k</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neon-lime text-black flex items-center justify-between group cursor-pointer hover:shadow-[0_0_30px_rgba(217,255,0,0.3)] transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Source Badge</span>
              <Github size={18} className="group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GithubActivity