import { useRef, useState, useMemo, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import {
  Zap,
  Database,
  Layout,
  Cpu
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const SP = { stiffness: 62, damping: 22, mass: 1 };

const OrbitItem = memo(function OrbitItem({
  skill,
  angle,
  radius,
  isActive,
  onClick,
  accentColor
}) {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.button
      onClick={onClick}
      className="absolute flex items-center justify-center cursor-pointer focus:outline-none z-20"
      style={{ left: "50%", top: "50%" }}
      animate={{
        x: x - 28,
        y: y - 28,
        scale: isActive ? 1.3 : 1,
      }}
      whileHover={{ scale: 1.25 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isActive
            ? `0 0 30px ${accentColor}50, 0 0 60px ${accentColor}20`
            : `0 0 0px transparent`,
        }}
        transition={{ duration: 0.4 }}
      />
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden"
        style={{
          background: isActive ? `${accentColor}25` : "hsla(240, 6%, 10%, 0.9)",
          border: `2px solid ${isActive ? accentColor : "hsla(0,0%,100%,0.08)"}`,
          backdropFilter: "blur(8px)"
        }}
      >
        <img 
          src={skill.svgUrl} 
          alt={skill.title} 
          className="w-7 h-7 object-contain transition-all" 
          style={{ 
            filter: isActive ? `drop-shadow(0 0 8px ${accentColor})` : "grayscale(1) opacity(0.5)"
          }}
        />
      </div>
    </motion.button>
  );
});

const DetailPanel = memo(function DetailPanel({ skill, accentColor }) {
  return (
    <motion.div
      key={skill.title}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center relative flex justify-center items-center"
    >

      <div className="absolute bottom-full mb-2 md:mb-4 w-[280px] left-1/2 -translate-x-1/2 pointer-events-none">
        <h4 className="text-xl md:text-2xl font-black tracking-tight text-white mb-1 uppercase italic drop-shadow-md">
          {skill.title}
        </h4>
        <p className="text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground drop-shadow-md">
          {skill.category ? `System: ${skill.category}` : "Protocol: Operational"}
        </p>
      </div>

      <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto">
        <svg className="w-full h-full -rotate-90 overflow-visible filter drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]" viewBox="0 0 100 100">

          <circle cx="50" cy="50" r="44" fill="none" stroke="hsla(240,10%,15%,1)" strokeWidth="3" />

          <circle 
            cx="50" cy="50" r="44" fill="none" 
            stroke={accentColor} 
            strokeWidth="1" 
            className="opacity-20 animate-pulse" 
          />
          <motion.circle
            cx="50" cy="50" r="44" fill="none"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={276.46}
            initial={{ strokeDashoffset: 276.46 }}
            animate={{ strokeDashoffset: 276.46 - (276.46 * skill.proficiency) / 100 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${accentColor}90)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[10px] md:text-xs font-bold text-muted-foreground tracking-tighter mb-[-2px]">LVL</span>
          <span className="font-mono text-xl md:text-2xl font-black" style={{ color: accentColor, textShadow: `0 0 15px ${accentColor}60` }}>
            {skill.proficiency}
          </span>
        </div>
      </div>
    </motion.div>
  );
});
export default memo(function SkillsMatrix() {
  const { skills } = useSelector((state) => state.portfolio);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    { id: "All", label: "ALL_SYSTEMS", color: "#FFFFFF", icon: Cpu },
    { id: "UI / Presentation", label: "UI_SYSTEMS", color: "#D9FF00", icon: Layout },
    { id: "API / Orchestration / Backend", label: "CORE_BACKEND", color: "#60A5FA", icon: Zap },
    { id: "Database / Persistence", label: "DATA_LAYERS", color: "#C084FC", icon: Database },
  ];

  const currentCategoryObj = categories.find(c => c.id === activeCategory);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills.filter(s => s.category === activeCategory);
  }, [skills, activeCategory]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const activeSkill = filteredSkills[activeIndex] || filteredSkills[0];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.15], [80, 0]), SP);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const orbitRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), SP);

  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 640 ? 125 : window.innerWidth < 1024 ? 160 : 180);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-12 overflow-hidden bg-black" 
    >

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-40 transition-colors duration-700"
          style={{ 
            background: `radial-gradient(circle, ${currentCategoryObj?.color}08 0%, transparent 60%)`,
            filter: "blur(100px)"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 relative z-10">

        <div className="flex flex-col items-center mb-10">
          <motion.div style={{ opacity: titleOpacity }} className="text-center mb-4">
            <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.5em] mb-2 block">
              Skill Infrastructure
            </span>
            <motion.h3
              style={{ y: titleY }}
              className="text-[1.8rem] md:text-[2.8rem] lg:text-[3.4rem] font-black tracking-[-0.05em] leading-[0.85] italic text-white whitespace-nowrap"
            >
              TECHNICAL <span className="text-transparent" style={{ WebkitTextStroke: "1px hsla(0,0%,100%,0.15)" }}>ARSENAL</span>
              <span className="text-primary">.</span>
            </motion.h3>
          </motion.div>

        </div>

        <div className="flex flex-col items-center">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-2 w-full">

            <div className="hidden lg:flex flex-col gap-3">
              {filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2)).map((skill, i) => (
                <motion.button
                  key={skill.id}
                  onClick={() => setActiveIndex(i)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 glass-card group/item"
                  style={{
                    background: activeIndex === i ? "hsla(240,6%,12%,0.8)" : "transparent",
                    borderColor: activeIndex === i ? `${currentCategoryObj?.color}30` : "hsla(0,0%,100%,0.02)"
                  }}
                  whileHover={{ x: 8 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:rotate-12"
                    style={{ background: `${currentCategoryObj?.color}12`, border: `1px solid ${currentCategoryObj?.color}${activeIndex === i ? "40" : "15"}` }}
                  >
                    <img src={skill.svgUrl} alt="" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <div className={`text-sm font-black tracking-tight uppercase ${activeIndex === i ? "text-white" : "text-muted-foreground"}`}>{skill.title}</div>
                    <div className="text-[8px] text-muted-foreground/40 font-mono font-bold tracking-widest uppercase mt-1">Node: {i + 1}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="relative flex items-center justify-center py-8 px-4 lg:py-10 lg:px-6" style={{ width: "100%", height: `${radius * 2 + 80}px`, maxWidth: "420px", maxHeight: "420px", margin: "0 auto" }}>

              <div className="absolute inset-0 flex items-center justify-center">

                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    border: "1px solid",
                    borderColor: `${currentCategoryObj?.color}20`,
                    boxShadow: `inset 0 0 20px ${currentCategoryObj?.color}05, 0 0 20px ${currentCategoryObj?.color}05`,
                    rotate: orbitRotate,
                  }}
                />

                <div
                  className="absolute rounded-full"
                  style={{
                    width: radius * 2 - 100,
                    height: radius * 2 - 100,
                    border: "1px dashed",
                    borderColor: "hsla(0,0%,100%,0.08)",
                    opacity: 0.5
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="rounded-full border border-white/5 animate-pulse-slow transition-colors duration-700"
                    style={{
                      width: radius * 2 + 20,
                      height: radius * 2 + 20,
                      borderColor: `${currentCategoryObj?.color}15`
                    }}
                  />
                </div>

                <AnimatePresence>
                  {filteredSkills.map((skill, i) => (
                    <OrbitItem
                      key={skill.id}
                      skill={skill}
                      angle={(360 / Math.max(1, filteredSkills.length)) * i - 90}
                      radius={radius}
                      isActive={activeIndex === i}
                      onClick={() => setActiveIndex(i)}
                      accentColor={currentCategoryObj?.color}
                    />
                  ))}
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="w-52">
                    <AnimatePresence mode="wait">
                      {activeSkill && (
                        <DetailPanel skill={activeSkill} accentColor={currentCategoryObj?.color} />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-3">
              {filteredSkills.slice(Math.ceil(filteredSkills.length / 2)).map((skill, i) => {
                const idx = i + Math.ceil(filteredSkills.length / 2);
                return (
                  <motion.button
                    key={skill.id}
                    onClick={() => setActiveIndex(idx)}
                    className="flex items-center flex-row-reverse gap-3 px-4 py-3 rounded-xl text-right transition-all duration-300 glass-card group/item"
                    style={{
                      background: activeIndex === idx ? "hsla(240,6%,12%,0.8)" : "transparent",
                      borderColor: activeIndex === idx ? `${currentCategoryObj?.color}30` : "hsla(0,0%,100%,0.02)"
                    }}
                    whileHover={{ x: -8 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:-rotate-12"
                      style={{ background: `${currentCategoryObj?.color}12`, border: `1px solid ${currentCategoryObj?.color}${activeIndex === idx ? "40" : "15"}` }}
                    >
                      <img src={skill.svgUrl} alt="" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <div className={`text-sm font-black tracking-tight uppercase ${activeIndex === idx ? "text-white" : "text-muted-foreground"}`}>{skill.title}</div>
                      <div className="text-[8px] text-muted-foreground/40 font-mono font-bold tracking-widest uppercase mt-1">Node: {idx + 1}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden mt-8 grid grid-cols-2 gap-3 w-full">
            {filteredSkills.map((skill, i) => (
              <motion.button
                key={skill.id}
                onClick={() => setActiveIndex(i)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left glass-card"
                style={{
                  background: activeIndex === i ? "hsla(240,6%,14%,0.8)" : "hsla(240,6%,8%,0.4)",
                  borderColor: activeIndex === i ? `${currentCategoryObj?.color}40` : "hsla(0,0%,100%,0.05)"
                }}
              >
                <img
                  src={skill.svgUrl} alt=""
                  className="w-5 h-5 object-contain"
                  style={{ filter: activeIndex === i ? `drop-shadow(0 0 5px ${currentCategoryObj?.color})` : "grayscale(1) opacity(0.5)" }}
                />
                <span className={`text-[10px] font-black uppercase tracking-widest ${activeIndex === i ? "text-white" : "text-muted-foreground"}`}>
                  {skill.title}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex flex-col items-center gap-2 group transition-all duration-300 ${
                  activeCategory === cat.id ? "scale-110" : "hover:scale-105"
                }`}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 overflow-visible"
                  style={{
                    backgroundColor: activeCategory === cat.id ? cat.color : "rgba(22,22,26,0.7)",
                    border: `1px solid ${activeCategory === cat.id ? "transparent" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: activeCategory === cat.id ? `0 0 30px ${cat.color}40, 0 0 2px ${cat.color}` : "none"
                  }}
                >
                  <cat.icon
                    size={18}
                    className={`transition-colors duration-300 ${activeCategory === cat.id ? "text-black" : "text-white/40 group-hover:text-white"}`}
                  />
                  {activeCategory === cat.id && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ backgroundColor: cat.color }}
                    />
                  )}
                </div>
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.15em] transition-colors duration-300"
                  style={{ color: activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.3)" }}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
});
