import { useNavigate, useLocation } from 'react-router-dom';
import { Github, Linkedin, Twitter, Globe, Activity, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    // If we're on home page, scroll to section
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-black/60 border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-lime/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-4">
            <div 
              className="flex items-center gap-2 text-xl font-black tracking-tighter group cursor-pointer" 
              onClick={() => {
                navigate('/');
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
            >
              <span className="italic uppercase">ALOK.DEV</span>
            </div>
            <p className="text-xs text-gray-500 font-mono leading-relaxed max-w-[240px]">
              // Designing high-performance architectures and fluid user interfaces.
            </p>
          </div>

          {/* Directories */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Directories</h4>
            <ul className="space-y-3">
              {['workshop', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollTo(item)}
                    className="text-xs font-mono text-gray-500 hover:text-neon-lime transition-colors uppercase tracking-wider flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-neon-lime transition-opacity">{'>'}</span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Uplinks */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Social_Uplinks</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Github size={18} />, label: 'GitHub', url: 'https://github.com/yourusername' },
                { icon: <Linkedin size={18} />, label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
                { icon: <Twitter size={18} />, label: 'Twitter', url: 'https://twitter.com/yourusername' },
                { icon: <Globe size={18} />, label: 'Dev.to', url: 'https://dev.to/yourusername' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-500 hover:text-neon-lime hover:border-neon-lime/30 transition-all"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Terminal Status */}
          <div className="glass p-5 rounded-2xl border-white/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="text-neon-lime" size={16} />
              <span className="text-[10px] font-mono text-white uppercase tracking-widest">System Health</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-gray-600 uppercase">Latency</span>
                <span className="text-[9px] font-mono text-green-500">24ms_Optimal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-gray-600 uppercase">Version</span>
                <span className="text-[9px] font-mono text-gray-400">v2.5.4-stable</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <ShieldCheck size={12} className="text-neon-lime" />
            Designed & Engineered by Alok Naik © {new Date().getFullYear()}
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-mono text-gray-700 uppercase animate-pulse">Connection: Secure_TLS</span>
            <div className="flex gap-4">
              <a href="#" className="text-[9px] font-mono text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
              <a href="#" className="text-[9px] font-mono text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}