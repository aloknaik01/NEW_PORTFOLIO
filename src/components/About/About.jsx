import React from 'react';
import { MapPin, Briefcase, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
// import me from"./me.jpeg"
const About = () => {
  return (
    <section id="about" className="py-24 px-5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-neon-lime/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-neon-lime font-bold text-[10px] uppercase tracking-[0.45em] mb-3">
            Core Identity
          </h2>
          <h3 className="text-4xl md:text-7xl font-black italic tracking-tighter">
            THE <span className="text-gray-600">ARCHITECT.</span>
          </h3>
        </div>

        {/* ⬇️ ONLY CHANGE: right column reduced */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          
          {/* LEFT COLUMN (UNCHANGED) */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2rem] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-lime"></div>

              <h4 className="text-xl font-black uppercase tracking-tighter mb-5 italic">
                Mission Parameters
              </h4>

              <div className="space-y-5 text-gray-400 font-light leading-relaxed text-base">
                <p>
                  I don't just write code; I{' '}
                  <span className="text-white font-medium italic underline decoration-neon-lime decoration-2 underline-offset-4">
                    engineer solutions
                  </span>{' '}
                  that bridge the gap between complex backend logic and intuitive user experiences.
                </p>

                <p>
                  With a foundation in <span className="text-white font-bold">Java systems</span> and a passion for the{' '}
                  <span className="text-neon-lime font-bold">React ecosystem</span>, my focus is on building high-availability
                  architectures that remain fluid and performant under heavy load.
                </p>

                <p className="font-handwriting text-2xl text-white/80 transform -rotate-2 mt-6">
                  Alok Naik
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-neon-lime mb-2">
                  <MapPin size={18} />
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                  Base Location
                </div>
                <div className="font-bold text-white uppercase tracking-tighter">
                  Bangalore, IN
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-blue-400 mb-2">
                  <Briefcase size={18} />
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                  Status
                </div>
                <div className="font-bold text-white uppercase tracking-tighter italic">
                  Open to Sync
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (SCALED DOWN ONLY) */}
          <div className="relative group scale-[0.95] origin-top">
            <div className="absolute -inset-3 border border-neon-lime/20 rounded-[2rem] group-hover:border-neon-lime/50 transition-colors duration-700"></div>

            <div className="absolute -top-5 -left-5 w-10 h-10 border-t-2 border-l-2 border-neon-lime"></div>
            <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-2 border-r-2 border-neon-lime"></div>

            <div className="relative aspect-[4/5]  rounded-[1.75rem] overflow-hidden">
              <img
                src='./me.jpeg'
                alt="Alok Naik"
                className="w-full h-full object-cover scale-[0.96] grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Scanline */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 w-full h-[1px] bg-neon-lime shadow-[0_0_6px_#D9FF00] opacity-40"
                />
              </div>

              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse"></div>
                  <span className="text-[8px] font-mono text-white tracking-widest uppercase">
                    Identity Verified
                  </span>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Fingerprint className="text-neon-lime" size={22} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between px-1">
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                Subject_ID: AN-001
              </div>
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                Class: ARCHITECT
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
