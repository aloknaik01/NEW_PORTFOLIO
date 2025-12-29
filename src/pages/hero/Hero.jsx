import About from '../../components/About/About'
import BlurEntryHero from '../../components/Blurry/BlurEntryHero'
import EngineeringPhilosophy from '../../components/EngineeringPhilosophy/EngineeringPhilosophy'
import GithubActivity from '../../components/GithubActivity/GithubActivity'
import { SkillsMatrix } from '../../components/SkillsMatrix/SkillsMatrix'
import TerminalLine from '../../components/TerminalLine/TerminalLine'
import Workshop from '../../components/Workshop/Workshop'
import './Hero.css'

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
            I'm  -  <span className='tube-text'>Alok Naik</span>
            <BlurEntryHero />
          </div>

 <EngineeringPhilosophy/>
 {/* Sroll Indicator */}
            <div class="scroll-indicator">
            <span class="scroll-text">Scroll to explore</span>
            <div class="scroll-line"></div>
          </div>
          <About/>
          <GithubActivity/>
          <SkillsMatrix />
          <Workshop />
        </div>
      </div>
    </section>
  )
}