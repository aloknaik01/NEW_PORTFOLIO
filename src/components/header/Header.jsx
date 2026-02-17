import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { useScroll } from '../../context/Scrollcontext';

export default function Header() {
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { activeSection, scrollToSection } = useScroll();

  const navItems = [
    { name: 'Home', icon: '✦', sectionId: 'home' },
    { name: "Who Am I", icon: null, sectionId: 'about' },
    { name: 'Work Shop', icon: null, sectionId: 'workshop' },
    { name: 'Chat Now', icon: null, sectionId: 'contact' }
  ];

  // Map section IDs to nav item indices
  const getActiveIndex = () => {
    const index = navItems.findIndex(item => item.sectionId === activeSection);
    return index !== -1 ? index : 0;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowResumeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId) => {
    // Always ensure we're on the home page
    if (location.pathname !== '/') {
      window.location.href = '/';
      // Store the section to scroll to after navigation
      localStorage.setItem('scrollToSection', sectionId);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <div 
            className="logo headline" 
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer' }}
          >
            ALOK.DEV
          </div>

          <div className="nav-links">
            <div
              className="nav-link-bg"
              data-active-index={getActiveIndex()}
            />
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`nav-link ${activeSection === item.sectionId ? 'active' : ''}`}
                onClick={() => handleNavClick(item.sectionId)}
              >
                {item.icon && <span className="nav-link-icon">{item.icon}</span>}
                {item.name}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <Link target='_blank' to="https://github.com/aloknaik01" className="icon-btn">
              <FaGithub size={23} />
            </Link>
            <Link className="icon-btn" target='_blank'  to="https://www.linkedin.com/in/alok-kumar-naik-107bab263/" >
              <FaLinkedinIn size={25} />
            </Link>
            
            {/* Sync Resume with Click Menu */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowResumeMenu(!showResumeMenu)}
                className="bg-[#d9ff00] text-black text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#e6ff4d] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(217,255,0,0.2)] active:scale-95"
              >
                Sync Resume
                <ChevronDown size={14} className={`transition-transform duration-300 ${showResumeMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 ease-out z-50 ${showResumeMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl p-1.5">
                  <button 
                    onClick={() => setShowResumeMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Eye size={16} className="text-[#d9ff00]" />
                    Preview
                  </button>
                  <div className="h-[1px] bg-white/5 mx-2 my-1"></div>
                  <button 
                    onClick={() => setShowResumeMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Download size={16} className="text-[#50e3c2]" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}