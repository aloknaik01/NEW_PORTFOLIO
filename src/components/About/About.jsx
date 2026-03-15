import { useRef, memo } from "react";
import { useSelector } from "react-redux";
import { MapPin, Briefcase, Fingerprint } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const SP = { stiffness: 62, damping: 22, mass: 1 };

export default memo(function About() {
  const { user } = useSelector((state) => state.portfolio);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sp = (v) => useSpring(v, SP);

  const bgY = sp(useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]));
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);


  const titleY = sp(
    useTransform(scrollYProgress, [0.04, 0.3, 0.7, 0.92], [60, 0, -20, -40])
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.24, 0.68, 0.9],
    [0, 1, 1, 0]
  );
  const titleBlur = useTransform(scrollYProgress, [0.04, 0.24], [10, 0]);

  const cardX = sp(
    useTransform(scrollYProgress, [0.1, 0.42, 0.7, 0.92], [-100, 0, 0, -20])
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.38, 0.7, 0.92],
    [0, 1, 1, 0]
  );
  const cardBlur = useTransform(scrollYProgress, [0.1, 0.38], [8, 0]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0.1, 0.48],
    [
      "0 8px 24px rgba(0,0,0,0.2)",
      "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
    ]
  );


  const p1O = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const p1B = useTransform(scrollYProgress, [0.22, 0.42], [10, 0]);
  const p2O = useTransform(scrollYProgress, [0.29, 0.49], [0, 1]);
  const p2B = useTransform(scrollYProgress, [0.29, 0.49], [10, 0]);
  const p3O = useTransform(scrollYProgress, [0.36, 0.54], [0, 1]);

  const imgX = sp(
    useTransform(scrollYProgress, [0.14, 0.45, 0.72, 0.94], [80, 0, 0, 20])
  );
  const imgY = sp(
    useTransform(scrollYProgress, [0.14, 0.52, 0.94], [40, -12, -35])
  );
  const imgScale = sp(
    useTransform(scrollYProgress, [0.14, 0.45, 0.72, 0.94], [0.9, 1.05, 1.05, 0.98])
  );
  const imgOpacity = useTransform(
    scrollYProgress,
    [0.14, 0.42, 0.72, 0.94],
    [0, 1, 1, 0]
  );

  const i1Y = sp(useTransform(scrollYProgress, [0.34, 0.56], [50, 0]));
  const i1O = useTransform(scrollYProgress, [0.3, 0.5, 0.85, 0.96], [0, 1, 1, 0]);
  const i2Y = sp(useTransform(scrollYProgress, [0.41, 0.62], [50, 0]));
  const i2O = useTransform(scrollYProgress, [0.35, 0.55, 0.85, 0.96], [0, 1, 1, 0]);

  /* ── Accent line grows as title reveals ── */
  const lineW = useTransform(scrollYProgress, [0.04, 0.26], [0, 32]);

  return (


    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[82vh] mt-10"
      style={{ scrollMarginTop: "80px" }}
    >


      <motion.div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ opacity: bgOpacity }}
        aria-hidden="true"
      >

        <motion.div
          className="absolute -left-[6%] top-[8%] w-[560px] h-[560px] rounded-full"
          style={{
            y: bgY,
            background:
              "radial-gradient(circle, rgba(217,255,0,0.065) 0%, rgba(217,255,0,0.018) 48%, transparent 70%)",
          }}
        />

        <motion.div
          className="absolute -right-[4%] top-[32%] w-[380px] h-[380px] rounded-full"
          style={{

            y: useSpring(
              useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]),
              { stiffness: 34, damping: 18, mass: 1.3 }
            ),
            background:
              "radial-gradient(circle, rgba(56,189,248,0.045) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.038]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </motion.div>


      <div
        className="sticky top-0 h-[82vh] flex flex-col justify-center"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        <div className="max-w-4xl mx-auto w-full px-6 md:px-10 lg:px-14">


          <motion.div
            className="mb-4"
            style={{
              y: titleY,
              opacity: titleOpacity,
              filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
              transform: "perspective(1200px) translateZ(-20px)",
              willChange: "transform, opacity, filter",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="h-[1.5px] bg-[#D9FF00]"
                style={{ width: lineW }}
              />
              <span className="text-[#D9FF00] text-[10px] font-mono font-bold uppercase tracking-[0.5em]">
                Core Identity
              </span>
            </div>

            <h3 className="text-[2.8rem] md:text-[4.2rem] lg:text-[5.2rem] font-black italic tracking-tighter leading-[0.88] text-white">
              THE{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.12)" }}
              >
                ARCHITECT
              </span>
              <span className="text-[#D9FF00]">.</span>
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-4 items-start">


            <div className="space-y-3">


              <motion.div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  x: cardX,
                  opacity: cardOpacity,
                  filter: useTransform(cardBlur, (v) => `blur(${v}px)`),
                  boxShadow: cardShadow,
                  transform: "perspective(1200px) translateZ(0px)",
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Neon left accent bar */}
                <div className="absolute top-0 left-0 w-[2.5px] h-full bg-gradient-to-b from-[#D9FF00] via-[#D9FF00]/45 to-transparent" />

                {/* Chrome top bar */}
                <div
                  className="flex items-center justify-between px-7 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-[6px] h-[6px] rounded-full bg-[#D9FF00]"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-[9px] font-mono text-white/28 uppercase tracking-[0.35em]">
                      mission_parameters.md
                    </span>
                  </div>
                  <div className="flex gap-[6px]">
                    {[
                      "rgba(255,95,86,0.5)",
                      "rgba(255,189,46,0.5)",
                      "rgba(39,201,63,0.5)",
                    ].map((bg, i) => (
                      <div
                        key={i}
                        className="w-[9px] h-[9px] rounded-full"
                        style={{ background: bg }}
                      />
                    ))}
                  </div>
                </div>

                <div className="px-6 py-6 space-y-4">
                  <h4 className="text-[0.9rem] font-black uppercase tracking-[0.15em] text-white/88 italic">
                    Mission Parameters
                  </h4>

                  {/* PLANE Z3 · Para 1 — staggered blur reveal */}
                  <motion.p
                    className="text-[0.875rem] text-white/46 font-light leading-[1.8]"
                    style={{
                      opacity: p1O,
                      filter: useTransform(p1B, (v) => `blur(${v}px)`),
                    }}
                  >
                    {user?.aboutMe || "I don't just write code — I engineer solutions that bridge complex backend logic with precise, intuitive interfaces."}
                  </motion.p>

                  {/* PLANE Z3 · Para 2 */}
                  <motion.p
                    className="text-[0.875rem] text-white/46 font-light leading-[1.8]"
                    style={{
                      opacity: p2O,
                      filter: useTransform(p2B, (v) => `blur(${v}px)`),
                    }}
                  >
                    Built on a foundation of{" "}
                    <span className="text-white/76 font-semibold">
                      Java systems engineering
                    </span>{" "}
                    and deep command of the{" "}
                    <span className="text-[#D9FF00]/90 font-semibold">
                      React ecosystem
                    </span>
                    . High-availability architectures that stay
                    performant under real load.
                  </motion.p>

                  {/* PLANE Z3 · Signature */}
                  <motion.div
                    className="pt-1 flex items-end justify-between"
                    style={{ opacity: p3O }}
                  >
                    <p className="font-handwriting text-[1.85rem] text-white/46 italic -rotate-[1.5deg]">
                      {user?.fullName || "Alok Naik"}
                    </p>
                    <div className="space-y-[3px]">
                      <div className="w-[52px] h-px bg-[#D9FF00]/26" />
                      <div className="w-[34px] h-px bg-[#D9FF00]/13" />
                    </div>
                  </motion.div>
                </div>

                {/* Corner circuit mark */}
                <div className="absolute bottom-3 right-3 opacity-[0.07]">
                  <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                    <path d="M0 40 L0 0 L40 0" stroke="#D9FF00" strokeWidth="2" />
                    <circle cx="1" cy="1" r="3" fill="#D9FF00" />
                  </svg>
                </div>
              </motion.div>


              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="group relative p-5 rounded-xl overflow-hidden cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transform: "perspective(1200px) translateZ(10px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "rgba(217,255,0,0.028)" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "rgba(217,255,0,0.36)" }}
                  />
                  <MapPin size={15} className="text-[#D9FF00] mb-3 opacity-75" />
                  <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] mb-1">
                    Base Location
                  </div>
                  <div className="text-[0.78rem] font-bold text-white/90 uppercase tracking-tight">
                    Aska,Odisha, IN
                  </div>
                </motion.div>

                <motion.div
                  className="group relative p-5 rounded-xl overflow-hidden cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transform: "perspective(1200px) translateZ(10px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "rgba(56,189,248,0.028)" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "rgba(56,189,248,0.36)" }}
                  />
                  <Briefcase size={15} className="text-sky-400 mb-3 opacity-75" />
                  <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] mb-1">
                    Status
                  </div>
                  <div className="text-[0.78rem] font-bold text-white/90 uppercase tracking-tight italic">
                    Open to Sync
                  </div>
                </motion.div>
              </div>
            </div>


            <motion.div
              className="relative group"
              style={{
                x: imgX,
                y: imgY,
                scale: imgScale,
                opacity: imgOpacity,
                transform: "perspective(1200px) translateZ(40px)",
                transformOrigin: "right center",
                willChange: "transform, opacity",
              }}
            >
              {/* Measurement frame */}
              <div
                className="absolute -inset-[14px] rounded-[1.8rem] pointer-events-none"
                style={{ border: "1px solid rgba(217,255,0,0.08)" }}
              />

              {/* Engineering corner brackets */}
              <div className="absolute -top-[18px] -left-[18px] w-8 h-8 border-t border-l border-[#D9FF00]/52" />
              <div className="absolute -bottom-[18px] -right-[18px] w-8 h-8 border-b border-r border-[#D9FF00]/52" />

              {/* Hover glow */}
              <div
                className="absolute -inset-8 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "rgba(217,255,0,0.04)" }}
              />

              {/* VIDEO CARD */}
              <div
                className="relative aspect-[4/5] rounded-[1.6rem] overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow:
                    "0 50px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {user?.avatarType === "video" ? (
                  <video
                    src={user.avatarUrl}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{ filter: "grayscale(100%) brightness(0.82)" }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onMouseEnter={(e) =>
                      (e.target.style.filter = "grayscale(0%) brightness(1)")
                    }
                    onMouseLeave={(e) =>
                    (e.target.style.filter =
                      "grayscale(100%) brightness(0.82)")
                    }
                  />
                ) : (
                  <img
                    src={user?.avatarUrl || ""}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{ filter: "grayscale(100%) brightness(0.82)" }}
                    onMouseEnter={(e) =>
                      (e.target.style.filter = "grayscale(0%) brightness(1)")
                    }
                    onMouseLeave={(e) =>
                    (e.target.style.filter =
                      "grayscale(100%) brightness(0.82)")
                    }
                  />
                )}

                {/* Scanline sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute left-0 w-full h-[1.5px]"
                    animate={{ top: ["-2%", "102%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2.5,
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(217,255,0,0.22) 35%, rgba(217,255,0,0.5) 50%, rgba(217,255,0,0.22) 65%, transparent)",
                    }}
                  />
                </div>

                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
                  }}
                />

                {/* Identity badge */}
                <div className="absolute top-3 left-3">
                  <div
                    className="flex items-center gap-[7px] px-[10px] py-[5px] rounded-md"
                    style={{
                      background: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <motion.div
                      className="w-[5px] h-[5px] rounded-full bg-[#D9FF00]"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-[8px] font-mono text-white/62 tracking-[0.3em] uppercase">
                      Identity Verified
                    </span>
                  </div>
                </div>

                {/* Fingerprint reveal */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                  <div
                    className="p-[6px] rounded-md"
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(217,255,0,0.22)",
                    }}
                  >
                    <Fingerprint size={15} className="text-[#D9FF00]" />
                  </div>
                </div>
              </div>

              {/* Meta strip */}
              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-[8px] font-mono text-white/18 uppercase tracking-[0.38em]">
                  Subject_ID: AN-001
                </span>
                <div className="flex items-center gap-[7px]">
                  <motion.div
                    className="w-[5px] h-[5px] rounded-full bg-[#D9FF00]/55"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
                  />
                  <span className="text-[8px] font-mono text-white/18 uppercase tracking-[0.38em]">
                    Class: ARCHITECT
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom structural rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
});