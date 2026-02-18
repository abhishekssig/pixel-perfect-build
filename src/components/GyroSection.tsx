import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "@/components/MenuButton";
import controllerBlack from "@/assets/controller-black.png";
import controllerWhite from "@/assets/controller-white.png";

const GyroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - rect.top) / (vh * 1.2), 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Controllers animate from below
  const controllerY = Math.max(0, (1 - progress) * 200);
  const controllerOpacity = Math.min(progress * 2, 1);
  const textOpacity = Math.min(Math.max((progress - 0.4) * 2.5, 0), 1);
  const textY = Math.max(0, (1 - Math.min(Math.max((progress - 0.4) * 2.5, 0), 1)) * 30);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #b0b0b0 0%, #d0d0d0 40%, #e0e0e0 70%, #a0a0a0 100%)",
      }}
    >
      {/* Top nav */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-10 py-5">
        <div />
        <MenuButton className="border-white/30 bg-white/10" />
        <button onClick={() => navigate("/signup")} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm tracking-wide">
          <span className="text-base">👤</span>
          <span>Account</span>
        </button>
      </div>

      {/* Controllers */}
      <div
        className="relative w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 px-8"
        style={{
          transform: `translateY(${controllerY}px)`,
          opacity: controllerOpacity,
          transition: "transform 0.05s linear, opacity 0.05s linear",
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
          opacity: controllerOpacity * 0.3,
          transform: `translateY(${controllerY}px) scaleY(-1)`,
          filter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
        }}
      >
        <img
          src={controllerWhite}
          alt=""
          className="w-[35%] md:w-[300px]"
          style={{ transform: "rotate(-8deg)" }}
        />
        <img
          src={controllerBlack}
          alt=""
          className="w-[35%] md:w-[300px]"
          style={{ transform: "rotate(5deg)" }}
        />
      </div>

      {/* Bottom text + CTA */}
      <div
        className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          transition: "transform 0.05s linear, opacity 0.05s linear",
        }}
      >
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
    </section>
  );
};

export default GyroSection;
