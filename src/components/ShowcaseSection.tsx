import { useEffect, useRef, useState } from "react";
import controllerBlack from "@/assets/controller-black.png";

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandProgress, setExpandProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = sectionRef.current.offsetHeight;

      // Entrance progress
      const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      setScrollProgress(progress);

      // Expand: white box grows to fill screen
      const scrolledInto = vh - rect.top;
      const expandStart = sectionH * 0.4;
      const expandEnd = sectionH * 0.85;
      const ep = Math.min(Math.max((scrolledInto - expandStart) / (expandEnd - expandStart), 0), 1);
      setExpandProgress(ep);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageTranslateY = Math.max(0, (1 - scrollProgress) * 100);
  const imageOpacity = Math.min(scrollProgress * 1.5, 1);
  const textFade = Math.max(0, 1 - expandProgress * 3);

  // White box expand: starts as small centered box, grows to full viewport
  const boxWidth = 50 + expandProgress * 50; // 50% -> 100%
  const boxHeight = 40 + expandProgress * 60; // 40vh -> 100vh
  const boxRadius = Math.max(0, 24 * (1 - expandProgress));

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black rounded-t-[2rem] -mt-[100vh]"
      style={{
        boxShadow: "0 -30px 80px rgba(0,0,0,0.8)",
        minHeight: "200vh",
      }}
    >
      {/* Text content */}
      <div
        className="px-6 md:px-16 lg:px-24 pt-16 md:pt-24"
        style={{ opacity: textFade, transition: "opacity 0.05s linear" }}
      >
        <h2 className="text-white text-3xl md:text-5xl font-light leading-tight">
          Showcasing Product
        </h2>
        <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
          Discover the standout features and design of our latest innovation. We're showcasing a product that blends performance, style, and smart functionality.
        </p>
      </div>

      {/* White box with controller - expands to full screen */}
      <div className="sticky top-0 h-screen flex items-center justify-center mt-8">
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: `${boxWidth}%`,
            height: `${boxHeight}vh`,
            borderRadius: `${boxRadius}px`,
            background: "linear-gradient(180deg, #b0b0b0 0%, #d0d0d0 40%, #e0e0e0 70%, #a0a0a0 100%)",
            transform: `translateY(${imageTranslateY * 0.3}px)`,
            opacity: imageOpacity,
            transition: "width 0.05s linear, height 0.05s linear, border-radius 0.05s linear, opacity 0.1s linear",
          }}
        >
          <img
            src={controllerBlack}
            alt="Gaming Controller"
            className="w-[55%] max-w-[400px] h-auto relative z-10 drop-shadow-2xl"
            style={{
              opacity: expandProgress > 0.8 ? Math.max(0, 1 - (expandProgress - 0.8) * 5) : 1,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
