import { useSelector } from "react-redux";
import About from "../../components/About/About";
import BlurEntryHero from "../../components/Blurry/BlurEntryHero";
import Contact from "../../components/findme/Contact";
import SkillsMatrix from "../../components/SkillsMatrix/SkillsMatrix";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import ProjectsSection from "../../components/ProjectsNexus/ProjectsSection";
import ApplicationsSection from "../../components/ProjectsNexus/ApplicationsSection";
import "./Hero.css";
import { useEffect, memo } from "react";
import { useScroll } from "../../context/Scrollcontext";
export default memo(function Hero() {
  const { user } = useSelector((state) => state.portfolio);
  useEffect(() => {
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
          <div id="home" style={{ scrollMarginTop: '80px' }} className="hero-home-section">
            <div className="hero-video-bg" style={{ background: user?.heroVideoUrl ? 'transparent' : 'black' }} aria-hidden="true">
              {user?.heroVideoUrl ? (
                <video
                  className="hero-video-element"
                  src={user.heroVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : null}
              <div className="hero-video-overlay" />
              <div className="hero-video-scanlines" />
              <div className="hero-video-vignette" />
            </div>
            <div className="badges">
              <span className="badge">Eat</span>
              <span className="badge badge-primary">Code</span>
              <span className="badge badge-secondary">Sleep</span>
            </div>
            <TerminalLine />
            <h1 className="calligraphy-headline">
              I'm - <span className="tube-text">{user?.fullName || "Alok Naik"}</span>
              <BlurEntryHero />
            </h1>
            {/* Screen Reader Only SEO Anchors */}
            <span className="sr-only">Dev Alok devalok dev-alok</span>
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
          <div id="about" style={{ scrollMarginTop: '80px' }}>
            <About />
          </div>
          <div id="skills" style={{ scrollMarginTop: '80px' }}>
            <SkillsMatrix />
          </div>
          <div id="applications" style={{ scrollMarginTop: '80px' }}>
            <ApplicationsSection />
          </div>
          <div id="workshop" style={{ scrollMarginTop: '80px' }}>
            <ProjectsSection />
          </div>
          <div id="contact" style={{ scrollMarginTop: '80px' }}>
            <Contact />
          </div>
        </div>
      </div>
    </section>
  );
});