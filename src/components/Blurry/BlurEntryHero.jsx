import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './HeroTextEffect.css';

const roles = ["React Maestro", "Java Enthusiast", "FullStack Alchemist"];

export default memo(function BlurEntryHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 800);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const letters = roles[roleIndex].split("");

  return (
    <div className="relative" style={{
      height: "auto",
      lineHeight: "1.1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      marginTop: "-0.2rem"
    }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={roleIndex}
            initial={false}
            className="relative flex items-center justify-center"
            style={{ 
              fontFamily: "'Caveat', cursive", 
              fontSize: isMobile ? "2rem" : "3rem", 
              color: "#fff",
              position: "relative" 
            }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: isMobile ? "blur(4px)" : "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: isMobile ? "blur(4px)" : "blur(10px)" }}
                transition={{ duration: 0.5, delay: isMobile ? index * 0.04 : index * 0.08 }}
                style={{
                  display: "inline-block",
                  marginRight: letter === " " ? "0.6rem" : "0",
                  position: "relative",
                  willChange: "filter, opacity",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                  WebkitTransform: "translateZ(0)"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
