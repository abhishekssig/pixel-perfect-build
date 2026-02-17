import { useEffect, useRef, useState } from "react";
import controllerBlack from "@/assets/controller-black.png";
import controllerWhite from "@/assets/controller-white.png";

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

  // Box expansion
  const boxWidth = 50 + expandProgress * 50;
  const boxHeight = 40 + expandProgress * 60;
  const boxRadius = Math.max(0, 24 * (1 - expandProgress));

  // Single controller fades out, dual controllers fade in
  const singleControllerOpacity = expandProgress > 0.6 ? Math.max(0, 1 - (expandProgress - 0.6) * 5) : 1;
  const gyroContentOpacity = expandProgress > 0.7 ? Math.min((expandProgress - 0.7) * 3.3, 1) : 0;
  const gyroControllerY = expandProgress > 0.7 ? Math.max(0, (1 - (expandProgress - 0.7) * 3.3) * 120) : 120;

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black rounded-t-[2rem] -mt-[100vh]"
      style={{
        boxShadow: "0 -40px 100px rgba(0,0,0,0.95)",
        minHeight: "250vh",
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

      {/* Expanding box */}
      <div className="sticky top-0 h-screen flex items-center justify-center mt-8">
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: `${boxWidth}%`,
            height: `${boxHeight}vh`,
            borderRadius: `${boxRadius}px`,
            background: "linear-gradient(180deg, #909090 0%, #b0b0b0 40%, #c0c0c0 70%, #808080 100%)",
            transform: `translateY(${imageTranslateY * 0.3}px)`,
            opacity: imageOpacity,
            transition: "width 0.05s linear, height 0.05s linear, border-radius 0.05s linear, opacity 0.1s linear",
          }}
        >
          {/* Single controller - fades out */}
          <img
            src={controllerBlack}
            alt="Gaming Controller"
            className="w-[55%] max-w-[400px] h-auto absolute z-10 drop-shadow-2xl"
            style={{ opacity: singleControllerOpacity }}
          />

          {/* Gyro content - fades in as box fully expands */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ opacity: gyroContentOpacity }}
          >
            {/* Top nav */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-10 py-5">
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

            {/* Dual controllers */}
            <div
              className="relative w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 px-8"
              style={{
                transform: `translateY(${gyroControllerY}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              <img
                src={controllerWhite}
                alt="White Controller"
                className="w-[35%] md:w-[300px] drop-shadow-2xl"
                style={{ transform: "rotate(-8deg)" }}
              />
              <img
                src={controllerBlack}
                alt="Black Controller"
                className="w-[35%] md:w-[300px] drop-shadow-2xl"
                style={{ transform: "rotate(5deg)" }}
              />
            </div>

            {/* Reflections */}
            <div
              className="relative w-full max-w-4xl flex items-start justify-center gap-8 md:gap-16 px-8 -mt-4"
              style={{
                opacity: 0.3,
                transform: "scaleY(-1)",
                filter: "blur(6px)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
              }}
            >
              <img src={controllerWhite} alt="" className="w-[35%] md:w-[300px]" style={{ transform: "rotate(-8deg)" }} />
              <img src={controllerBlack} alt="" className="w-[35%] md:w-[300px]" style={{ transform: "rotate(5deg)" }} />
            </div>

            {/* Bottom text + CTA */}
            <div className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between">
              <div className="max-w-lg">
                <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
                  Gamepad with Gyro Sensor
                </h2>
                <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">
                  Gamepad with gyro sensor enables precise motion-controlled immersive gameplay.
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
      </div>
    </section>
  );
};

export default ShowcaseSection;
