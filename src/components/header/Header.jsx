import { useEffect, useRef, useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { useScroll } from '../../context/Scrollcontext';

export default memo(function Header() {
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { activeSection, scrollToSection } = useScroll();
  const { user } = useSelector((state) => state.portfolio);

  const navRefs = useRef([]);
  const [bgStyle, setBgStyle] = useState({ opacity: 0 });

  const navItems = [
    { name: 'Home', icon: '✦', sectionId: 'home' },
    { name: 'Who Am I', icon: null, sectionId: 'about' },
    { name: 'Expertise', icon: null, sectionId: 'skills' },
    { name: 'Work Shop', icon: null, sectionId: 'workshop' },
  ];

  const getActiveIndex = () => {
    const index = navItems.findIndex((item) => item.sectionId === activeSection);
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

  useEffect(() => {
    const updateBg = () => {
      const index = getActiveIndex();
      const activeRef = navRefs.current[index];
      if (activeRef) {
        setBgStyle({
          width: `${activeRef.offsetWidth}px`,
          transform: `translateX(${activeRef.offsetLeft}px)`,
          opacity: 1
        });
      }
    };

    updateBg();

    window.addEventListener('resize', updateBg);

    const timer = setTimeout(updateBg, 100);

    return () => {
      window.removeEventListener('resize', updateBg);
      clearTimeout(timer);
    };
  }, [activeSection, location.pathname]);

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = '/';
      localStorage.setItem('scrollToSection', sectionId);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handlePreview = () => {
    if (user?.resumeUrl) {
      window.open(user.resumeUrl, '_blank', 'noopener noreferrer');
    }
    setShowResumeMenu(false);
  };

  const handleDownload = () => {
    if (user?.resumeUrl) {

      const downloadUrl = user.resumeUrl.replace('/upload/', '/upload/fl_attachment/');
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${user.fullName || 'resume'}_resume.pdf`;
      a.rel = 'noopener noreferrer';
      a.click();
    }
    setShowResumeMenu(false);
  };

  const githubUrl = user?.githubURL || 'https://github.com/aloknaik01';
  const linkedinUrl = user?.linkedinURL || 'https://www.linkedin.com/in/alok-kumar-naik-107bab263/';

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
              style={bgStyle}
            />
            {navItems.map((item, index) => (
              <button
                key={index}
                ref={(el) => (navRefs.current[index] = el)}
                className={`nav-link ${activeSection === item.sectionId ? 'active' : ''}`}
                onClick={() => handleNavClick(item.sectionId)}
              >
                {item.icon && <span className="nav-link-icon">{item.icon}</span>}
                {item.name}
              </button>
            ))}
          </div>

          <div className="nav-actions">

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
            >
              <FaGithub size={23} />
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
            >
              <FaLinkedinIn size={25} />
            </a>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowResumeMenu(!showResumeMenu)}
                disabled={!user?.resumeUrl}
                className="bg-[#d9ff00] text-black text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#e6ff4d] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(217,255,0,0.2)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                title={!user?.resumeUrl ? 'Resume not uploaded yet' : 'Resume options'}
              >
                Sync Resume
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${showResumeMenu ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 ease-out z-50 ${showResumeMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
              >
                <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl p-1.5">
                  <button
                    onClick={handlePreview}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Eye size={16} className="text-[#d9ff00]" />
                    Preview
                  </button>
                  <div className="h-[1px] bg-white/5 mx-2 my-1" />
                  <button
                    onClick={handleDownload}
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
});