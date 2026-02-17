import { useEffect, useRef, useState } from "react";
import keyboardDark from "@/assets/keyboard-dark.png";

const KeyboardSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandProgress, setExpandProgress] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = sectionRef.current.offsetHeight;
      const scrolledInto = vh - rect.top;

      // Phase 1: Box expands to fullscreen
      const expandStart = sectionH * 0.05;
      const expandEnd = sectionH * 0.3;
      const ep = Math.min(Math.max((scrolledInto - expandStart) / (expandEnd - expandStart), 0), 1);
      setExpandProgress(ep);

      // Phase 2: Keyboard slides from left to right
      const slideStart = sectionH * 0.3;
      const slideEnd = sectionH * 0.7;
      const sp = Math.min(Math.max((scrolledInto - slideStart) / (slideEnd - slideStart), 0), 1);
      setSlideProgress(sp);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Box expansion
  const boxWidth = 45 + expandProgress * 55;
  const boxHeight = 40 + expandProgress * 60;
  const boxRadius = Math.max(0, 24 * (1 - expandProgress));

  const finalW = boxWidth > 85 ? 100 : boxWidth;
  const finalH = boxHeight > 85 ? 100 : boxHeight;
  const finalR = (finalW >= 100 && finalH >= 100) ? 0 : boxRadius;

  // Keyboard lateral slide: starts left (-60%) slides to right (60%)
  const kbX = -60 + slideProgress * 120;
  const overlayOpacity = expandProgress > 0.7 ? Math.min((expandProgress - 0.7) * 3.3, 1) : 0;

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black"
      style={{ minHeight: "350vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${(100 - finalW) / 2}%`,
            right: `${(100 - finalW) / 2}%`,
            top: `${(100 - finalH) / 2}%`,
            bottom: `${(100 - finalH) / 2}%`,
            borderRadius: `${finalR}px`,
            background:
              "linear-gradient(180deg, #909090 0%, #b0b0b0 40%, #c0c0c0 70%, #808080 100%)",
            zIndex: 2,
          }}
        >
          {/* Keyboard image - huge, slides left to right */}
          <img
            src={keyboardDark}
            alt="Mechanical Keyboard"
            className="absolute"
            style={{
              height: "110%",
              width: "auto",
              top: "5%",
              left: `${kbX}%`,
              objectFit: "contain",
              transition: "left 0.05s linear",
            }}
          />

          {/* Nav overlay */}
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-10 py-5"
            style={{ opacity: overlayOpacity }}
          >
            <div />
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide">
              <span className="text-base">☰</span>
              <span>MENU</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide">
              <span className="text-base">👤</span>
              <span>Account</span>
            </button>
          </div>

          {/* Bottom text + CTA */}
          <div
            className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between"
            style={{ opacity: overlayOpacity }}
          >
            <div className="max-w-lg">
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
                Mechanical Keyboard
              </h2>
              <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">
                Premium mechanical keyboard with customizable keys and responsive feedback.
              </p>
            </div>
            <button className="hidden md:flex flex-col items-start gap-0 px-5 py-4 rounded-md bg-white/10 backdrop-blur-sm text-white text-sm leading-snug tracking-wide hover:bg-white/20 transition-colors relative border border-white/20">
              <span>Discover</span>
              <span>Our</span>
              <span>Collection</span>
              <span className="absolute bottom-2 right-2 text-white/50 text-xs">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyboardSection;
