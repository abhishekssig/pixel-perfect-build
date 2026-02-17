import { useEffect, useRef, useState } from "react";
import controllerImg from "@/assets/controller.png";

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress from 0 (section just entering) to 1 (fully in view)
      const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageTranslateY = Math.max(0, (1 - scrollProgress) * 120);
  const imageOpacity = Math.min(scrollProgress * 1.5, 1);
  const imageScale = 0.85 + scrollProgress * 0.15;

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black rounded-t-[2rem] min-h-screen px-6 md:px-16 lg:px-24 pt-16 md:pt-24 pb-24 -mt-[100vh]"
      style={{
        boxShadow: "0 -30px 80px rgba(0,0,0,0.8)",
      }}
    >
      <h2 className="text-white text-3xl md:text-5xl font-light leading-tight">
        Showcasing Product
      </h2>
      <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
        Discover the standout features and design of our latest innovation. We're showcasing a product that blends performance, style, and smart functionality.
      </p>

      {/* Controller image with scroll-driven animation */}
      <div className="flex justify-center mt-16 md:mt-24">
        <div
          className="w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            transform: `translateY(${imageTranslateY}px) scale(${imageScale})`,
            opacity: imageOpacity,
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
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
