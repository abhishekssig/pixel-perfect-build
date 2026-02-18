import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "@/components/MenuButton";
import AccountButton from "@/components/AccountButton";
import controllerBlack from "@/assets/controller-black.png";
import controllerWhite from "@/assets/controller-white.png";
import controllerBlackAlt from "@/assets/controller-black-alt.png";

const ShowcaseSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandProgress, setExpandProgress] = useState(0);
  const [shrinkProgress, setShrinkProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = sectionRef.current.offsetHeight;
      const scrolledInto = vh - rect.top;

      const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      setScrollProgress(progress);

      // Phase 1: Box expands to fullscreen
      const expandStart = sectionH * 0.08;
      const expandEnd = sectionH * 0.28;
      const ep = Math.min(Math.max((scrolledInto - expandStart) / (expandEnd - expandStart), 0), 1);
      setExpandProgress(ep);

      // Phase 2: Box shrinks
      const shrinkStart = sectionH * 0.45;
      const shrinkEnd = sectionH * 0.65;
      const sp = Math.min(Math.max((scrolledInto - shrinkStart) / (shrinkEnd - shrinkStart), 0), 1);
      setShrinkProgress(sp);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageOpacity = Math.min(scrollProgress * 1.5, 1);
  const textFade = Math.max(0, 1 - expandProgress * 3);

  // Phase 1: Box expansion
  const boxWidth = 50 + expandProgress * 50;
  const boxHeight = 40 + expandProgress * 60;
  const boxRadius = Math.max(0, 24 * (1 - expandProgress));

  const singleControllerOpacity = expandProgress > 0.6 ? Math.max(0, 1 - (expandProgress - 0.6) * 5) : 1;
  const gyroContentOpacity = expandProgress > 0.7 ? Math.min((expandProgress - 0.7) * 3.3, 1) : 0;
  const gyroControllerY = expandProgress > 0.7 ? Math.max(0, (1 - (expandProgress - 0.7) * 3.3) * 200) : 200;
  const gyroScale = expandProgress > 0.7 ? 0.7 + Math.min((expandProgress - 0.7) * 3.3, 1) * 0.3 : 0.7;

  // Phase 2: Shrink
  const shrinkW = shrinkProgress > 0 ? 100 - shrinkProgress * 55 : boxWidth;
  const shrinkH = shrinkProgress > 0 ? 100 - shrinkProgress * 65 : boxHeight;
  const shrinkR = shrinkProgress > 0 ? shrinkProgress * 20 : boxRadius;
  const whiteOpacity = shrinkProgress > 0 ? Math.max(0, 1 - shrinkProgress * 2) : 1;
  const whiteX = shrinkProgress > 0 ? shrinkProgress * 150 : 0;
  const overlayFade = shrinkProgress > 0 ? Math.max(0, 1 - shrinkProgress * 3) : 1;
  const reflectionFade = shrinkProgress > 0 ? Math.max(0, 1 - shrinkProgress * 2) : 1;

  const singleBlackOpacity = shrinkProgress > 0.5 ? Math.min((shrinkProgress - 0.5) * 4, 1) : 0;
  const dualFade = shrinkProgress > 0.4 ? Math.max(0, 1 - (shrinkProgress - 0.4) * 3) : 1;

  // Clamp to 100 when nearly full
  const rawW = shrinkProgress > 0 ? shrinkW : boxWidth;
  const rawH = shrinkProgress > 0 ? shrinkH : boxHeight;
  const finalW = rawW > 85 ? 100 : rawW;
  const finalH = rawH > 85 ? 100 : rawH;
  const finalR = (finalW >= 100 && finalH >= 100) ? 0 : (shrinkProgress > 0 ? shrinkR : boxRadius);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black rounded-t-[2rem] -mt-[100vh]"
      style={{
        boxShadow: "0 -40px 100px rgba(0,0,0,0.95)",
        minHeight: "350vh",
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

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Controller box */}
        <div
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            left: `${(100 - finalW) / 2}%`,
            right: `${(100 - finalW) / 2}%`,
            top: `${(100 - finalH) / 2}%`,
            bottom: `${(100 - finalH) / 2}%`,
            borderRadius: `${finalR}px`,
            background: "linear-gradient(180deg, #909090 0%, #b0b0b0 40%, #c0c0c0 70%, #808080 100%)",
            opacity: imageOpacity,
            transition: "opacity 0.1s linear",
            zIndex: 2,
          }}
        >
          {/* Single controller - initial */}
          <img
            src={controllerBlack}
            alt="Gaming Controller"
            className="w-[55%] max-w-[400px] h-auto absolute z-10 drop-shadow-2xl"
            style={{ opacity: singleControllerOpacity }}
          />

          {/* Single black controller - appears during shrink */}
          <img
            src={controllerBlackAlt}
            alt="Black Controller"
            className="w-[55%] max-w-[350px] h-auto absolute z-10"
            style={{
              opacity: singleBlackOpacity,
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
            }}
          />

          {/* Gyro content */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ opacity: gyroContentOpacity * dualFade }}
          >
            {/* Top nav */}
            <div
              className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-10 py-5"
              style={{ opacity: overlayFade }}
            >
              <div />
              <MenuButton />
              <AccountButton />
            </div>

            {/* Dual controllers */}
            <div
              className="relative w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 px-8"
              style={{
                transform: `translateY(${gyroControllerY}px) scale(${gyroScale})`,
                transition: "transform 0.05s linear",
              }}
            >
              <img
                src={controllerWhite}
                alt="White Controller"
                className="w-[42%] md:w-[380px]"
                style={{
                  transform: `rotate(-8deg) translateX(${whiteX}px)`,
                  filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
                  opacity: whiteOpacity,
                }}
              />
              <img
                src={controllerBlackAlt}
                alt="Black Controller"
                className="w-[42%] md:w-[380px]"
                style={{
                  transform: "rotate(5deg)",
                  filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
                }}
              />
            </div>

            {/* Reflections */}
            <div
              className="relative w-full max-w-4xl flex items-start justify-center gap-8 md:gap-16 px-8 -mt-4"
              style={{
                opacity: 0.3 * reflectionFade,
                transform: "scaleY(-1)",
                filter: "blur(6px)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
              }}
            >
              <img src={controllerWhite} alt="" className="w-[42%] md:w-[380px]" style={{ transform: "rotate(-8deg)" }} />
              <img src={controllerBlack} alt="" className="w-[42%] md:w-[380px]" style={{ transform: "rotate(5deg)" }} />
            </div>

            {/* Bottom text + CTA */}
            <div
              className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between"
              style={{ opacity: overlayFade }}
            >
              <div className="max-w-lg">
                <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
                  Gamepad with Gyro Sensor
                </h2>
                <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">
                  Gamepad with gyro sensor enables precise motion-controlled immersive gameplay.
                </p>
              </div>
              <button onClick={() => navigate("/store")} className="hidden md:flex flex-col items-start gap-0 px-5 py-4 rounded-md bg-white/10 backdrop-blur-sm text-white text-sm leading-snug tracking-wide hover:bg-white/20 transition-colors relative border border-white/20">
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
