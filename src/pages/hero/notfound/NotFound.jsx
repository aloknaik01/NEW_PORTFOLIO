import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, ArrowLeft, Cpu, Activity } from 'lucide-react';

const NotFound = () => {
  const [logs, setLogs] = useState([]);

 
  const MotionDiv = motion.div;
  const MotionSpan = motion.span;

  useEffect(() => {
    const errorLogs = [
      'CRITICAL: Resource_Address_Invalid',
      'Scanning memory segments...',
      'No matching sector found in /root/portfolio/',
      'Error_Code: 0x404_PAGE_MISSING',
      'Attempting emergency recovery...',
      'Uplink unstable. Please return to master node.'
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < errorLogs.length) {
        setLogs((prev) => [...prev, errorLogs[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono selection:bg-[#D9FF00] selection:text-black">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#D9FF00 1px, transparent 1px), linear-gradient(90deg, #D9FF00 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Blob */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D9FF00]/5 rounded-full blur-[150px] animate-pulse" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 */}
        <div className="relative mb-8">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[12rem] md:text-[18rem] font-black italic tracking-tighter leading-none text-white/5 select-none"
          >
            404
          </MotionDiv>

          <div className="absolute inset-0 flex items-center justify-center">
            <MotionDiv
              animate={{
                x: [-2, 2, -2, 0],
                y: [1, -1, 1, 0],
                filter: [
                  'hue-rotate(0deg) brightness(1)',
                  'hue-rotate(90deg) brightness(1.2)',
                  'hue-rotate(-90deg) brightness(0.8)',
                  'hue-rotate(0deg) brightness(1)'
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
              className="text-7xl md:text-9xl font-black italic tracking-tighter text-[#D9FF00] drop-shadow-[0_0_30px_#D9FF00]"
            >
              LOST.
            </MotionDiv>
          </div>
        </div>

        {/* Diagnostics */}
        <div className="glass border-white/5 bg-white/[0.02] p-8 rounded-[2.5rem] mb-12 text-left relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <ShieldAlert size={18} className="text-[#D9FF00] animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">
              System_Diagnostic_Report
            </span>
          </div>

          <div className="space-y-2 h-32 overflow-hidden">
            {logs.map((log, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] flex gap-3 text-gray-400"
              >
                <span className="text-[#D9FF00]/30">[{i}]</span>
                <span>{log}</span>
              </MotionDiv>
            ))}

            <MotionSpan
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-3 bg-[#D9FF00] align-middle ml-1"
            />
          </div>

          <div className="absolute top-0 right-0 p-4">
            <Cpu size={14} className="text-gray-800" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={goHome}
            className="group px-10 py-4 bg-[#D9FF00] text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(217,255,0,0.2)]"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Recalibrate Uplink
          </button>

          <div className="flex items-center gap-4 px-8 py-4 glass border-white/5 rounded-full text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            <Activity size={14} className="text-[#D9FF00] animate-pulse" />
            Status: Connection_Stable
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 flex items-center gap-3 opacity-20 group">
        <Terminal size={14} className="text-[#D9FF00]" />
        <span className="text-[10px] font-bold tracking-[0.5em] text-white">
          ALOK.DEV // SECURITY_OVERRIDE
        </span>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
