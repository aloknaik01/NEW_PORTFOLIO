import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Github, Linkedin, Twitter, Globe, Activity, ShieldCheck } from 'lucide-react';
import { memo, useMemo, useCallback } from 'react';

export const Footer = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.portfolio);

  const scrollTo = useCallback((id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname, navigate]);

  // Build social links dynamically from backend user data
  const socialLinks = useMemo(() => {
    return [
      { icon: <Github size={18} />,   label: 'GitHub',   url: user?.githubURL },
      { icon: <Linkedin size={18} />, label: 'LinkedIn', url: user?.linkedinURL },
      { icon: <Twitter size={18} />,  label: 'Twitter',  url: user?.twitterURL },
      { icon: <Globe size={18} />,    label: 'Portfolio', url: user?.portfolioURL },
    ].filter((s) => s.url); // only render links that exist
  }, [user?.githubURL, user?.linkedinURL, user?.twitterURL, user?.portfolioURL]);

  const handleBrandClick = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <footer className="bg-black border-t border-white/5 pt-8 lg:pt-12 pb-8 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-lime/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Grid — Hidden on Mobile and Tablet, Visible on Laptop/Desktop */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Identity */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div
              className="flex items-center gap-2 text-xl font-black tracking-tighter cursor-pointer"
              onClick={handleBrandClick}
            >
              <span className="italic uppercase text-white">
                {user?.fullName ? `${user.fullName.split(' ')[0].toUpperCase()}.DEV` : 'ALOK.DEV'}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono leading-relaxed max-w-[260px]">
              {user?.aboutMe
                ? `// ${user.aboutMe.slice(0, 90)}${user.aboutMe.length > 90 ? '...' : ''}`
                : '// Designing high-performance architectures and fluid user interfaces.'}
            </p>
          </div>

          {/* Directories */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-5">Directories</h4>
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
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-5">Social_Uplinks</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((social, idx) => (
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
                ))
              ) : (
                [0, 1, 2].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
                ))
              )}
            </div>
          </div>

          {/* Terminal Status */}
          <div className="glass p-4 rounded-2xl border border-white/5 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="text-neon-lime flex-shrink-0" size={14} />
              <span className="text-[10px] font-mono text-white uppercase tracking-widest">System Health</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-4">
                <span className="text-[9px] font-mono text-gray-600 uppercase">Latency</span>
                <span className="text-[9px] font-mono text-green-500">24ms_OK</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-[9px] font-mono text-gray-600 uppercase">Version</span>
                <span className="text-[9px] font-mono text-gray-400">v2.5.4-stable</span>
              </div>
              {user?.email && (
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[9px] font-mono text-gray-600 uppercase flex-shrink-0">Contact</span>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-[9px] font-mono text-neon-lime/70 hover:text-neon-lime transition-colors truncate"
                    title={user.email}
                  >
                    {user.email}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="lg:pt-6 lg:border-t lg:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <ShieldCheck size={12} className="text-neon-lime flex-shrink-0" />
            <span>Designed &amp; Engineered by {user?.fullName || 'Alok Naik'} © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
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
});
