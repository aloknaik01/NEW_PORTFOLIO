import { Routes, Route } from "react-router-dom";
import PopupFundHero from "./pages/claude/PopupFundHero";
import About from "./components/About/About";
import Workshop from "./components/Workshop/Workshop";
import GithubActivity from "./components/GithubActivity/GithubActivity";
import { SkillsMatrix } from "./components/SkillsMatrix/SkillsMatrix";
import Header from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import NotFound from "./pages/hero/notfound/NotFound";

function App() {
  return (
    <div className="hero-container">
      <Header />
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
              <Workshop />
            </div>
          }
        />

        <Route
          path="/activity"
          element={
            <div className="min-h-screen pt-20">
              <GithubActivity />
            </div>
          }
        />

        <Route
          path="/skills"
          element={
            <div className="min-h-screen pt-20">
              <SkillsMatrix />
            </div>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
