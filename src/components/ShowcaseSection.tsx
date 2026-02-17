import { useEffect, useRef, useState } from "react";
import controllerBlack from "@/assets/controller-black.png";
import controllerWhite from "@/assets/controller-white.png";
import keyboard from "@/assets/keyboard.png";

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

      const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      setScrollProgress(progress);

      const scrolledInto = vh - rect.top;
      const expandStart = sectionH * 0.3;
      const expandEnd = sectionH * 0.75;
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

  // Box expansion - top box stays smaller
  const boxWidth = 45 + expandProgress * 20;
  const boxHeight = 30 + expandProgress * 15;
  const boxRadius = Math.max(0, 24 * (1 - expandProgress));

  // Second box (keyboard) appears as we scroll
  const keyboardBoxOpacity = expandProgress > 0.4 ? Math.min((expandProgress - 0.4) * 2.5, 1) : 0;
  const keyboardBoxY = expandProgress > 0.4 ? Math.max(0, (1 - (expandProgress - 0.4) * 2.5) * 80) : 80;

  // Single controller fades out, dual controllers fade in
  const singleControllerOpacity = expandProgress > 0.3 ? Math.max(0, 1 - (expandProgress - 0.3) * 4) : 1;

  // After expand, white controller slides down behind black one
  const whiteControllerY = expandProgress > 0.5 ? Math.min((expandProgress - 0.5) * 4, 1) * 60 : 0;
  const whiteControllerScale = expandProgress > 0.5 ? 1 - Math.min((expandProgress - 0.5) * 2, 1) * 0.15 : 1;
  const blackControllerZ = expandProgress > 0.5 ? 20 : 10;

  // Box shrinks as keyboard appears
  const topBoxScale = expandProgress > 0.6 ? 1 - Math.min((expandProgress - 0.6) * 1.5, 1) * 0.1 : 1;

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black rounded-t-[2rem] -mt-[100vh]"
      style={{
        boxShadow: "0 -40px 100px rgba(0,0,0,0.95)",
        minHeight: "300vh",
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

      {/* Sticky container for both boxes */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-6 mt-8">
        {/* Top box - controller */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: `${boxWidth}%`,
            height: `${boxHeight}vh`,
            borderRadius: `${boxRadius}px`,
            background: "linear-gradient(180deg, #909090 0%, #b0b0b0 40%, #c0c0c0 70%, #808080 100%)",
            transform: `translateY(${imageTranslateY * 0.3}px) scale(${topBoxScale})`,
            opacity: imageOpacity,
            transition: "width 0.05s linear, height 0.05s linear, border-radius 0.05s linear, opacity 0.1s linear, transform 0.05s linear",
          }}
        >
          {/* Single controller - initial state */}
          <img
            src={controllerBlack}
            alt="Gaming Controller"
            className="w-[50%] max-w-[350px] h-auto absolute z-10 drop-shadow-2xl"
            style={{
              opacity: singleControllerOpacity,
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
            }}
          />

          {/* White controller - slides behind black */}
          <img
            src={controllerWhite}
            alt="White Controller"
            className="w-[45%] max-w-[320px] h-auto absolute"
            style={{
              opacity: expandProgress > 0.3 ? Math.min((expandProgress - 0.3) * 3, 1) : 0,
              zIndex: blackControllerZ - 5,
              transform: `translateY(${whiteControllerY}px) scale(${whiteControllerScale})`,
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
              transition: "transform 0.05s linear, opacity 0.1s linear",
            }}
          />

          {/* Black controller on top */}
          <img
            src={controllerBlack}
            alt="Black Controller"
            className="w-[50%] max-w-[350px] h-auto absolute"
            style={{
              opacity: expandProgress > 0.3 ? Math.min((expandProgress - 0.3) * 3, 1) : 0,
              zIndex: blackControllerZ,
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
              transition: "opacity 0.1s linear",
            }}
          />

          {/* Reflection */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-end justify-center"
            style={{
              opacity: 0.25,
              transform: "scaleY(-1) translateY(-10px)",
              filter: "blur(6px)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
              height: "40%",
            }}
          >
            <img
              src={controllerBlack}
              alt=""
              className="w-[50%] max-w-[350px] h-auto"
            />
          </div>
        </div>

        {/* Bottom box - keyboard */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: `${boxWidth}%`,
            height: `${boxHeight}vh`,
            borderRadius: `${boxRadius}px`,
            background: "linear-gradient(180deg, #909090 0%, #b0b0b0 40%, #c0c0c0 70%, #808080 100%)",
            opacity: keyboardBoxOpacity,
            transform: `translateY(${keyboardBoxY}px)`,
            transition: "width 0.05s linear, height 0.05s linear, border-radius 0.05s linear, opacity 0.15s linear, transform 0.1s linear",
          }}
        >
          <img
            src={keyboard}
            alt="Mechanical Keyboard"
            className="w-[60%] max-w-[400px] h-auto"
            style={{
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
              transform: "translateY(10%) rotate(2deg)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
