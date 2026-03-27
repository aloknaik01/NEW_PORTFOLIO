import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, memo, useState, useEffect } from "react";
import Header from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { ScrollProvider } from "./context/Scrollcontext";
import { usePortfolioData } from "./hooks/usePortfolioData";
import { ReactLenis } from "lenis/react";

const PopupFundHero  = lazy(() => import("./pages/Mainpage/PopupFundHero"));
const About          = lazy(() => import("./components/About/About"));
const ProjectsSection = lazy(() => import("./components/ProjectsNexus/ProjectsSection"));
const SkillsMatrix   = lazy(() => import("./components/SkillsMatrix/SkillsMatrix"));
const Contact        = lazy(() => import("./components/findme/Contact"));
const ProjectDetail  = lazy(() => import("./pages/ProjectDetail/ProjectDetail"));
const NotFound       = lazy(() => import("./pages/notfound/NotFound"));

const PageFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <span className="w-1 h-8 bg-[#D9FF00] animate-pulse inline-block" />
  </div>
);

function App() {
  const { isLoading, isError } = usePortfolioData();
  const [forceShowUI, setForceShowUI] = useState(false);
  const location = useLocation();

  useEffect(() => {

    const timer = setTimeout(() => setForceShowUI(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const isProjectDetailPage = location.pathname.startsWith("/project/");

  const isActuallyLoading = isLoading && !forceShowUI;

  if (isActuallyLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden" style={{ perspective: '800px' }}>

        <div 
          className="absolute inset-[-100%] top-[40%] origin-top opacity-10 md:opacity-20 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(217,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(217,255,0,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(70deg)",
            animation: "gridScroll 2s linear infinite"
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 flex flex-col items-center gap-8">

          <div className="relative w-32 h-32 flex items-center justify-center">

            <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#D9FF00" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
            </svg>

            <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_3s_ease-in-out_infinite_alternate]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="80 220" opacity="0.5" />
            </svg>

            <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] animate-[spin_1.5s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#D9FF00" strokeWidth="2.5" strokeDasharray="40 260" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px #D9FF00)' }} />
            </svg>

            <span className="font-mono text-[10px] text-[#D9FF00] tracking-[0.2em] font-bold uppercase animate-pulse">
              BOOT
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="text-white font-black text-2xl md:text-3xl tracking-[0.4em] uppercase">
              ALOK<span className="text-[#D9FF00]">.DEV</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-end h-3">
                <span className="w-1 bg-[#D9FF00] animate-[eq_1s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
                <span className="w-1 bg-[#D9FF00] animate-[eq_1.2s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 bg-[#D9FF00] animate-[eq_0.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.4s' }} />
                <span className="w-1 bg-[#D9FF00] animate-[eq_1.1s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.1s' }} />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 animate-pulse">
                INITIALIZING_SYNC
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gridScroll {
            0% { background-position: 0 0; }
            100% { background-position: 0 60px; }
          }
          @keyframes eq {
            0%, 100% { height: 4px; opacity: 0.3; }
            50% { height: 12px; opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-[#D9FF00] font-mono text-2xl font-black tracking-[0.3em] uppercase">
          ALOK.DEV
        </div>
        <div className="text-center space-y-3 max-w-md">
          <p className="text-white/60 font-mono text-xs uppercase tracking-widest">
            Connection to backend lost.
          </p>
          <p className="text-white/30 font-mono text-[10px]">
            Make sure the backend server is running on{' '}
            <span className="text-[#D9FF00]/70">{import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'}</span>
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-[#D9FF00] text-black font-mono font-bold text-xs uppercase rounded-full hover:bg-[#e6ff4d] transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      <ScrollProvider>
        <div className="hero-container">
        {!isProjectDetailPage && <Header />}
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<PopupFundHero />} />

            <Route
              path="/about"
              element={
                <div className="min-h-screen pt-20">
                  <About />
                </div>
              }
            />

            <Route
              path="/workshop"
              element={
                <div className="min-h-screen pt-20">
                  <ProjectsSection />
                </div>
              }
            />

            <Route path="/project/:id" element={<ProjectDetail />} />

            <Route
              path="/skills"
              element={
                <div className="min-h-screen pt-20">
                  <SkillsMatrix />
                </div>
              }
            />

            <Route
              path="/findme"
              element={
                <div className="min-h-screen pt-20">
                  <Contact />
                </div>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </ScrollProvider>
  </ReactLenis>
  );
}

export default memo(App);