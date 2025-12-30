import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './HeroTextEffect.css';

const roles = ["React Maestro", "Java Enthusiast", "FullStack Alchemist"];

export default function BlurEntryHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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
    <div style={{
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
            style={{ display: "flex", fontFamily: "'Caveat', cursive", fontSize: "3rem", color: "#fff" }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{
                  display: "inline-block",
                  marginRight: letter === " " ? "0.6rem" : "0"
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
}
