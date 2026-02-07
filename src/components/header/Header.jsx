import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { ChevronDown, Download, Eye } from 'lucide-react';

export default function Header() {
  const [activeLink, setActiveLink] = useState(0);
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Update active link based on scroll position or route
  useEffect(() => {
    if (location.pathname !== '/') {
      // If not on home page, don't track scroll
      return;
    }

    const handleScroll = () => {
      const sections = ['workshop', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      // Check if at top of page
      if (window.scrollY < 300) {
        setActiveLink(0);
        return;
      }

      // Check each section
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(i + 1);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowResumeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (index, sectionId) => {
    setActiveLink(index);
    
    // Navigate to home if not already there
    if (location.pathname !== '/') {
      navigate('/');
    }
    
    // Scroll to section
    setTimeout(() => {
      if (sectionId === null) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, location.pathname !== '/' ? 100 : 0);
  };

  const navItems = [
    { name: 'Home', icon: '✦', sectionId: null },
    { name: "Who Am I", icon: null, sectionId: 'about' },
    { name: 'Work Shop', icon: null, sectionId: 'workshop' },
    { name: 'Chat Now', icon: null, sectionId: 'contact' }
  ];

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <div 
            className="logo headline" 
            onClick={() => handleNavClick(0, null)}
            style={{ cursor: 'pointer' }}
          >
            ALOK.DEV
          </div>

          <div className="nav-links">
            <div
              className="nav-link-bg"
              data-active-index={activeLink}
            />
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`nav-link ${activeLink === index ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(index, item.sectionId);
                }}
              >
                {item.icon && <span className="nav-link-icon">{item.icon}</span>}
                {item.name}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <Link target='_blank' to="https://github.com/aloknaik01" className="icon-btn">
              <FaGithub size={23} />
            </Link>
            <button className="icon-btn">
              <FaLinkedinIn target='_blank'  to="https://www.linkedin.com/in/alok-kumar-naik-a18b4b365/" size={25} />
            </button>
            
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