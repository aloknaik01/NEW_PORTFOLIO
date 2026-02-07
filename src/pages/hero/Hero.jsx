import About from "../../components/About/About";
import BlurEntryHero from "../../components/Blurry/BlurEntryHero";
import GithubActivity from "../../components/GithubActivity/GithubActivity";
import { SkillsMatrix } from "../../components/SkillsMatrix/SkillsMatrix";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import Workshop from "../../components/Workshop/Workshop";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-inner">
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

          {/* Sroll Indicator */}

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

          {/* Sroll Indicator */}

          <About />
          <GithubActivity />
          <SkillsMatrix />
          <Workshop />
        </div>
      </div>
    </section>
  );
}
