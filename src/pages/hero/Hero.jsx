import About from "../../components/About/About";
import BlurEntryHero from "../../components/Blurry/BlurEntryHero";
import Contact from "../../components/findme/Contact";
import GithubActivity from "../../components/GithubActivity/GithubActivity";
import  SkillsMatrix  from "../../components/SkillsMatrix/SkillsMatrix";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import Workshop from "../../components/Workshop/Workshop";
import "./Hero.css";
import { useEffect } from "react";
import { useScroll } from "../../context/Scrollcontext";

export default function Hero() {
  const { scrollToSection } = useScroll();

  useEffect(() => {
    // Check if there's a pending scroll from navigation
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        localStorage.removeItem('scrollToSection');
      }, 100);
    }
  }, []);

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-inner">
          {/* ── Hero Section with ID ── */}
          <div id="home" style={{ scrollMarginTop: '80px' }} className="hero-home-section">

            {/* ══════════════════════════════════════
                BACKGROUND VIDEO LAYER
                Sits behind everything in #home only
            ══════════════════════════════════════ */}
            <div className="hero-video-bg" aria-hidden="true">
              <video
                className="hero-video-element"
                // src="https://cdn.pixabay.com/video/2022/08/21/128646-741704858_large.mp4"
                src="/d.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Dark overlay so text stays legible */}
              <div className="hero-video-overlay" />
              {/* Scanline effect for that cyberpunk look */}
              <div className="hero-video-scanlines" />
              {/* Radial vignette — darkens edges */}
              <div className="hero-video-vignette" />
            </div>
            {/* ══════════════════════════════════════ */}

            <div className="badges">
              <span className="badge">Eat</span>
              <span className="badge badge-primary">Code</span>
              <span className="badge badge-secondary">Sleep</span>
            </div>

            <TerminalLine />

            <div className="calligraphy-headline">
              I'm - <span className="tube-text">Alok Naik</span>
              <BlurEntryHero />
            </div>

            {/* Scroll Indicator */}
            <div className="mt-40 flex flex-col items-center justify-center space-y-4 opacity-40 hover:opacity-100 transition-opacity">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">
                Scroll to explore
              </span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#d9ff00] animate-[scroll-reveal_2s_infinite]"></div>
              </div>
            </div>
            <style>{`
        @keyframes scroll-reveal {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
          </div>

          {/* All sections below the hero with proper IDs and scroll margin */}
          <div id="about" style={{ scrollMarginTop: '80px' }}>
            <About />
          </div>
          
          <div id="activity" style={{ scrollMarginTop: '80px' }}>
            <GithubActivity />
          </div>
          
          <div id="skills" style={{ scrollMarginTop: '80px' }}>
            <SkillsMatrix />
          </div>
          
          <div id="workshop" style={{ scrollMarginTop: '80px' }}>
            <Workshop />
          </div>
          
          <div id="contact" style={{ scrollMarginTop: '80px' }}>
            <Contact />
          </div>
        </div>
      </div>
    </section>
  );
}