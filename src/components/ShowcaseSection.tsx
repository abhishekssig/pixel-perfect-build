import { useEffect, useRef, useState } from "react";
import controllerImg from "@/assets/controller.png";

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

      // Image entrance progress
      const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      setScrollProgress(progress);

      // Expand progress: starts when section is scrolled past ~60%, completes near bottom
      const scrolledIntoSection = vh - rect.top;
      const expandStart = sectionH * 0.45;
      const expandEnd = sectionH * 0.85;
      const ep = Math.min(Math.max((scrolledIntoSection - expandStart) / (expandEnd - expandStart), 0), 1);
      setExpandProgress(ep);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageTranslateY = Math.max(0, (1 - scrollProgress) * 120);
  const imageOpacity = Math.min(scrollProgress * 1.5, 1);
  const imageScale = 0.85 + scrollProgress * 0.15;

  // Expand: image container grows to fill the viewport
  const expandScale = 1 + expandProgress * 2.5; // scale up to ~3.5x
  const expandBorderRadius = Math.max(0, 16 * (1 - expandProgress)); // rounded corners disappear
  const textFade = Math.max(0, 1 - expandProgress * 3); // text fades out quickly
  const bgTransition = expandProgress; // background transitions from black to grey

  return (
    <section
      ref={sectionRef}
      className="relative z-20 rounded-t-[2rem] px-6 md:px-16 lg:px-24 pt-16 md:pt-24 pb-24 -mt-[100vh]"
      style={{
        boxShadow: "0 -30px 80px rgba(0,0,0,0.8)",
        minHeight: "180vh",
        background: `linear-gradient(180deg, #000 ${Math.max(0, 60 - bgTransition * 60)}%, ${bgTransition > 0.5 ? '#6b6b6b' : '#000'} 100%)`,
      }}
    >
      {/* Text content - fades out during expand */}
      <div style={{ opacity: textFade, transition: "opacity 0.05s linear" }}>
        <h2 className="text-white text-3xl md:text-5xl font-light leading-tight">
          Showcasing Product
        </h2>
        <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
          Discover the standout features and design of our latest innovation. We're showcasing a product that blends performance, style, and smart functionality.
        </p>
      </div>

      {/* Controller image - expands to fill screen */}
      <div className="flex justify-center mt-16 md:mt-24 sticky top-[10vh]">
        <div
          className="w-full max-w-2xl overflow-hidden"
          style={{
            transform: `translateY(${imageTranslateY}px) scale(${imageScale * expandScale})`,
            opacity: imageOpacity,
            borderRadius: `${expandBorderRadius}px`,
            transition: "transform 0.05s linear, opacity 0.05s linear, border-radius 0.05s linear",
          }}
        >
          <img
            src={controllerImg}
            alt="Gaming Controller"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
